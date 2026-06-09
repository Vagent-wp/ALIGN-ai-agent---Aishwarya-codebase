import { supabase } from '../utils/supabase.js';
import { logger } from '../utils/logger.js';
import { sendWhatsAppMessage } from '../notifications/whatsapp.js';
import { Messages } from '../ai/responseGenerator.js';
import { config } from '../../config/index.js';

// ============================================================
// LEAD MANAGER
// Creates leads, notifies providers, tracks responses
// ============================================================

export async function createLead({
  seekerPhoneHash,
  seekerUserId,
  intent,
  requirementText,
  slots,
  allMatches,
  shownMatches,
}) {
  try {
    const matchedIds = allMatches.map(m => m.id);
    const shownIds = shownMatches.map(m => m.id);
    const similarityScores = {};
    allMatches.forEach(m => { similarityScores[m.id] = m.composite_score; });

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        seeker_phone_hash: seekerPhoneHash,
        seeker_user_id: seekerUserId || null,
        intent,
        requirement_text: requirementText,
        slots,
        matched_profile_ids: matchedIds,
        shown_profile_ids: shownIds,
        similarity_scores: similarityScores,
        status: 'new',
        expires_at: new Date(Date.now() + config.agent.leadExpiryHours * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (error) {
      logger.error('Lead creation failed', { error: error.message });
      return null;
    }

    logger.info('Lead created', { leadId: lead.id, intent, matchedCount: matchedIds.length });

    // Log analytics event
    await supabase.from('analytics_events').insert({
      event_type: 'lead_created',
      lead_id: lead.id,
      metadata: { intent, matched_count: matchedIds.length },
    });

    return lead;
  } catch (err) {
    logger.error('createLead error', { error: err.message });
    return null;
  }
}

// ============================================================
// NOTIFY PROVIDERS
// Sends WhatsApp notification to matched providers who have credits
// ============================================================

export async function notifyProviders(lead, shownProfiles) {
  const notified = [];

  for (const profile of shownProfiles) {
    try {
      // Check subscription credits
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('id, credits_remaining, plan')
        .eq('profile_id', profile.id)
        .eq('is_active', true)
        .single();

      if (!sub || sub.credits_remaining <= 0) {
        logger.info('Provider skipped — no credits', { profileId: profile.id });
        continue;
      }

      // Check availability
      if (profile.availability === 'not_available') {
        logger.info('Provider skipped — not available', { profileId: profile.id });
        continue;
      }

      // Get provider's WhatsApp number
      const { data: user } = await supabase
        .from('users')
        .select('phone_number')
        .eq('id', profile.user_id)
        .single();

      if (!user?.phone_number) continue;

      // Decrypt phone (it's stored encrypted)
      const { decryptPhone } = await import('../utils/crypto.js');
      const providerPhone = decryptPhone(user.phone_number);

      // Send notification
      const message = Messages.leadNotificationToProvider(lead, lead.requirement_text);
      await sendWhatsAppMessage(providerPhone, message);

      // Record lead response entry
      await supabase.from('lead_responses').insert({
        lead_id: lead.id,
        profile_id: profile.id,
        notified_at: new Date().toISOString(),
      });

      // Deduct credit
      await supabase
        .from('subscriptions')
        .update({ credits_remaining: sub.credits_remaining - 1 })
        .eq('id', sub.id);

      // Log credit transaction
      await supabase.from('credit_transactions').insert({
        subscription_id: sub.id,
        profile_id: profile.id,
        amount: -1,
        reason: 'lead_notification',
        lead_id: lead.id,
        balance_after: sub.credits_remaining - 1,
      });

      notified.push(profile.id);
      logger.info('Provider notified', { profileId: profile.id, leadId: lead.id });
    } catch (err) {
      logger.error('Provider notification failed', { profileId: profile.id, error: err.message });
    }
  }

  // Update lead status to notified
  if (notified.length > 0) {
    await supabase
      .from('leads')
      .update({ status: 'notified', notified_count: notified.length })
      .eq('id', lead.id);
  }

  return notified;
}

// ============================================================
// HANDLE PROVIDER RESPONSE (ACCEPT / PASS)
// ============================================================

export async function handleProviderResponse(providerPhone, action) {
  try {
    // Find the provider's profile
    const { hashPhone } = await import('../utils/crypto.js');
    const phoneHash = hashPhone(providerPhone);

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('phone_hash', phoneHash)
      .single();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (!profile) return null;

    // Find the most recent pending lead response for this provider
    const { data: leadResponse } = await supabase
      .from('lead_responses')
      .select('id, lead_id, action')
      .eq('profile_id', profile.id)
      .is('action', null)
      .order('notified_at', { ascending: false })
      .limit(1)
      .single();

    if (!leadResponse) return null;

    const responseAction = action.toLowerCase().includes('accept') ? 'accepted' : 'passed';

    // Record the response
    await supabase
      .from('lead_responses')
      .update({
        action: responseAction,
        responded_at: new Date().toISOString(),
      })
      .eq('id', leadResponse.id);

    if (responseAction === 'accepted') {
      // Update lead accepted count
      await supabase.rpc('increment_lead_accepted', { lead_id: leadResponse.lead_id });

      // Fetch lead to get seeker info
      const { data: lead } = await supabase
        .from('leads')
        .select('seeker_user_id, requirement_text')
        .eq('id', leadResponse.lead_id)
        .single();

      logger.info('Provider accepted lead', { profileId: profile.id, leadId: leadResponse.lead_id });
      return { action: 'accepted', profile, lead };
    }

    logger.info('Provider passed on lead', { profileId: profile.id, leadId: leadResponse.lead_id });
    return { action: 'passed', profile };
  } catch (err) {
    logger.error('handleProviderResponse error', { error: err.message });
    return null;
  }
}

// ============================================================
// CONNECT SEEKER WITH PROVIDER
// Called after provider accepts — shares contact with seeker
// ============================================================

export async function connectSeekerWithProvider(lead, profile, seekerPhone) {
  try {
    // Get provider's phone for sharing
    const { data: providerUser } = await supabase
      .from('users')
      .select('phone_number')
      .eq('id', profile.user_id)
      .single();

    const { decryptPhone } = await import('../utils/crypto.js');
    const providerPhone = decryptPhone(providerUser.phone_number);

    // Notify seeker
    const seekerMsg = Messages.connectConfirmed(profile.name, providerPhone);
    await sendWhatsAppMessage(seekerPhone, seekerMsg);

    // Notify provider with seeker's contact
    const providerMsg = Messages.providerNotifyConnect(seekerPhone);
    await sendWhatsAppMessage(providerPhone, providerMsg);

    // Update lead status
    await supabase
      .from('leads')
      .update({ status: 'accepted' })
      .eq('id', lead.id);

    // Log analytics
    await supabase.from('analytics_events').insert({
      event_type: 'lead_accepted',
      lead_id: lead.id,
      profile_id: profile.id,
      metadata: { profile_name: profile.name },
    });

    logger.info('Seeker-provider connected', { leadId: lead.id, profileId: profile.id });
  } catch (err) {
    logger.error('connectSeekerWithProvider error', { error: err.message });
  }
}
