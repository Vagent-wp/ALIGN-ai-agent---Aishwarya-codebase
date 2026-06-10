import { supabase } from '../utils/supabase.js';
import { hashPhone, encryptPhone } from '../utils/crypto.js';
import { logger } from '../utils/logger.js';

// ============================================================
// PROFILE MANAGER
// ============================================================

const PROFILE_TYPE_TO_CATEGORY = {
  founder_startup: 'startup',
  freelancer: 'freelancer',
  agency: 'agency',
  developer: 'freelancer',
  designer: 'freelancer',
  consultant: 'consultant',
  mentor: 'mentor',
  investor: 'investor',
  job_seeker: 'service_provider',
  student: 'service_provider',
  service_provider: 'service_provider',
  manufacturer: 'vendor',
  creator: 'creator',
  recruiter: 'recruiter',
  other: 'service_provider',
};

function mapProfileTypeToCategory(profileType) {
  return PROFILE_TYPE_TO_CATEGORY[profileType] || 'service_provider';
}

function parseCommaList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

function parsePricing(pricingStr) {
  const numbers = pricingStr.replace(/[₹,\s]/g, '').match(/\d+/g);
  if (!numbers) return [null, null];
  if (numbers.length === 1) return [parseInt(numbers[0]), null];
  return [parseInt(numbers[0]), parseInt(numbers[1])];
}

// Get or create a user record by phone number
export async function getOrCreateUser(rawPhone, role = 'seeker', language = null) {
  const phoneHash = hashPhone(rawPhone);

  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('phone_hash', phoneHash)
    .single();

  if (existing) {
    if (language && existing.metadata?.language !== language) {
      await supabase
        .from('users')
        .update({ metadata: { ...existing.metadata, language } })
        .eq('id', existing.id);
    }
    return existing;
  }

  const encryptedPhone = encryptPhone(rawPhone);
  const metadata = language ? { language } : {};
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      phone_number: encryptedPhone,
      phone_hash: phoneHash,
      role,
      metadata,
    })
    .select()
    .single();

  if (error) {
    logger.error('getOrCreateUser failed', { error: error.message });
    return null;
  }

  logger.info('New user created', { userId: newUser.id, role });
  return newUser;
}

export async function getUserByPhone(rawPhone) {
  const phoneHash = hashPhone(rawPhone);
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('phone_hash', phoneHash)
    .single();
  return data || null;
}

export async function createProfile(userId, slots) {
  const profileType = slots.reg_profile_type || slots.reg_category || 'freelancer';
  const category = mapProfileTypeToCategory(profileType);
  const services = slots.reg_services
    ? parseCommaList(slots.reg_services)
    : [];
  const industries = slots.reg_industries
    ? parseCommaList(slots.reg_industries)
    : [];
  const seeking = slots.reg_seeking
    ? parseCommaList(slots.reg_seeking)
    : [];
  const preferredRoles = slots.reg_preferred_roles
    ? parseCommaList(slots.reg_preferred_roles)
    : [];
  const preferredSectors = slots.reg_preferred_sectors
    ? parseCommaList(slots.reg_preferred_sectors)
    : [];
  const lookingFor = slots.reg_looking_for
    ? parseCommaList(slots.reg_looking_for)
    : [];
  const problemsSolved = slots.reg_problems_solved
    ? parseCommaList(slots.reg_problems_solved)
    : [];

  const [pricingMin, pricingMax] = parsePricing(slots.reg_pricing || '');

  const name = slots.reg_name;
  const payload = {
    user_id: userId,
    name,
    display_name: name,
    category,
    profile_type: profileType,
    tagline: slots.reg_tagline,
    description: slots.reg_description || slots.reg_tagline || 'Profile created via WhatsApp onboarding.',
    services,
    problems_solved: problemsSolved,
    industries_served: industries,
    pricing_min: pricingMin,
    pricing_max: pricingMax,
    website: slots.reg_website !== 'skip' ? slots.reg_website : null,
    location_city: slots.reg_location || null,
    company_name: slots.reg_company_name || null,
    company_description: slots.reg_company_description || null,
    funding_stage: slots.reg_funding_stage || null,
    looking_for_from_ecosystem: lookingFor,
    investment_thesis: slots.reg_investment_thesis || null,
    preferred_sectors: preferredSectors,
    preferred_roles: preferredRoles,
    graduation_year: slots.reg_graduation_year ? parseInt(slots.reg_graduation_year, 10) : null,
    field_of_study: slots.reg_field_of_study || null,
    notice_period: slots.reg_notice_period || null,
    expected_ctc: slots.reg_pricing && profileType === 'job_seeker'
      ? parsePricing(slots.reg_pricing)[0]
      : null,
    seeking,
    whatsapp_onboarded: true,
    is_active: false,
  };

  const { data: profile, error } = await supabase
    .from('profiles')
    .insert(payload)
    .select()
    .single();

  if (error) {
    logger.error('createProfile failed', { error: error.message });
    return null;
  }

  await supabase.rpc('calculate_profile_completeness', { p_profile_id: profile.id });

  await supabase.from('embedding_queue').upsert(
    { profile_id: profile.id },
    { onConflict: 'profile_id' }
  );

  await supabase.from('users').update({ role: 'provider' }).eq('id', userId);

  logger.info('Profile created (pending review)', { profileId: profile.id, name: profile.name });
  return profile;
}

export async function updateProfile(profileId, fields) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', profileId)
    .select()
    .single();

  if (error) {
    logger.error('updateProfile failed', { error: error.message, profileId });
    return null;
  }

  await supabase.rpc('calculate_profile_completeness', { p_profile_id: profileId });

  await supabase.from('embedding_queue').upsert(
    { profile_id: profileId },
    { onConflict: 'profile_id' }
  );

  return data;
}

export async function getProfileByUserId(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();
  return data || null;
}

export async function getProfileById(profileId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();
  return data || null;
}
