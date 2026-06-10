import { generateEmbedding } from '../ai/aishwarya.js';
import { supabase } from '../utils/supabase.js';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

// ============================================================
// EMBEDDING TEXT BUILDER
// The quality of this text directly determines search quality.
// ============================================================

function joinNonEmpty(parts, separator = ' ') {
  return parts.filter(Boolean).join(separator);
}

function formatArray(arr) {
  return arr?.length ? arr.join(', ') : null;
}

function buildTier(parts) {
  const text = joinNonEmpty(parts);
  return text || null;
}

export function buildQueryEmbeddingText(slots, intent, requirementSummary) {
  const parts = [];

  if (requirementSummary) parts.push(requirementSummary);
  if (slots.role) parts.push(`Role needed: ${slots.role}`);
  if (slots.skill) parts.push(`Skills needed: ${slots.skill}`);
  if (slots.service_type) parts.push(`Service: ${slots.service_type}`);
  if (slots.domain) parts.push(`Domain: ${slots.domain}`);
  if (slots.industry) parts.push(`Industry: ${slots.industry}`);
  if (slots.experience_years) parts.push(`Experience: ${slots.experience_years} years`);
  if (slots.experience_level) parts.push(`Experience level: ${slots.experience_level}`);
  if (slots.engagement_type) parts.push(`Engagement: ${slots.engagement_type}`);
  if (slots.funding_stage) parts.push(`Funding stage: ${slots.funding_stage}`);
  if (slots.open_to) parts.push(`Open to: ${slots.open_to}`);
  if (slots.state) parts.push(`State: ${slots.state}`);
  if (slots.location) parts.push(`Location: ${slots.location}`);
  if (slots.seeking) parts.push(`Seeking: ${Array.isArray(slots.seeking) ? slots.seeking.join(', ') : slots.seeking}`);
  if (slots.preferred_roles) parts.push(`Preferred roles: ${Array.isArray(slots.preferred_roles) ? slots.preferred_roles.join(', ') : slots.preferred_roles}`);
  if (slots.additional_context) parts.push(slots.additional_context);

  return parts.join('. ');
}

export function buildProfileEmbeddingText(profile) {
  const displayName = profile.display_name || profile.name;
  const profileType = profile.profile_type || profile.category;
  const locationParts = [
    profile.location_city,
    profile.state || profile.location_state,
    profile.location_country,
  ].filter(Boolean);

  const tiers = [];

  // Tier 1 — Core identity
  tiers.push(buildTier([
    displayName && profileType ? `${displayName} is a ${profileType}${locationParts.length ? ` based in ${locationParts.join(', ')}` : ''}.` : displayName,
    profile.tagline,
    profile.headline,
    profile.description,
    profile.professional_summary,
  ]));

  // Tier 2 — Professional signals
  tiers.push(buildTier([
    formatArray(profile.domain_expertise) && `Domain expertise: ${formatArray(profile.domain_expertise)}.`,
    formatArray(profile.services) && `Services: ${formatArray(profile.services)}.`,
    formatArray(profile.tools_and_technologies) && `Tools and technologies: ${formatArray(profile.tools_and_technologies)}.`,
    formatArray(profile.problems_solved) && `Problems solved: ${formatArray(profile.problems_solved)}.`,
    formatArray(profile.industries_served) && `Industries served: ${formatArray(profile.industries_served)}.`,
    profile.years_of_experience != null && `Years of experience: ${profile.years_of_experience}.`,
    profile.current_role && `Current role: ${profile.current_role}.`,
  ]));

  // Tier 3 — Opportunity signals
  tiers.push(buildTier([
    formatArray(profile.seeking) && `Seeking: ${formatArray(profile.seeking)}.`,
    profile.ideal_collaboration && `Ideal collaboration: ${profile.ideal_collaboration}`,
    profile.ideal_client_profile && `Ideal client profile: ${profile.ideal_client_profile}`,
    formatArray(profile.opportunity_types) && `Opportunity types: ${formatArray(profile.opportunity_types)}.`,
    formatArray(profile.preferred_roles) && `Preferred roles: ${formatArray(profile.preferred_roles)}.`,
    formatArray(profile.looking_for_from_ecosystem) && `Looking for from ecosystem: ${formatArray(profile.looking_for_from_ecosystem)}.`,
  ]));

  // Tier 4 — Business / startup context
  tiers.push(buildTier([
    profile.company_name && `Company: ${profile.company_name}.`,
    profile.company_description,
    profile.target_market && `Target market: ${profile.target_market}`,
    profile.usp && `USP: ${profile.usp}`,
    profile.investment_thesis && `Investment thesis: ${profile.investment_thesis}`,
    formatArray(profile.preferred_sectors) && `Preferred sectors: ${formatArray(profile.preferred_sectors)}.`,
    formatArray(profile.business_model) && `Business model: ${formatArray(profile.business_model)}.`,
    profile.product_stage && `Product stage: ${profile.product_stage}.`,
    profile.funding_stage && `Funding stage: ${profile.funding_stage}.`,
  ]));

  // Tier 5 — AI discovery optimization
  const notLookingFor = formatArray(profile.not_looking_for);
  tiers.push(buildTier([
    formatArray(profile.search_keywords) && `Keywords: ${formatArray(profile.search_keywords)}.`,
    profile.unique_about_me && `Unique: ${profile.unique_about_me}`,
    formatArray(profile.strengths) && `Strengths: ${formatArray(profile.strengths)}.`,
    formatArray(profile.achievements) && `Achievements: ${formatArray(profile.achievements)}.`,
    profile.collaboration_style && `Collaboration style: ${profile.collaboration_style}`,
    notLookingFor && `Not looking for: ${notLookingFor}.`,
  ]));

  return tiers.filter(Boolean).join('\n\n');
}

// ============================================================
// COMPOSITE SCORING
// Combines vector similarity with metadata signals
// ============================================================

function computeCompositeScore(profile, vectorSimilarity) {
  let score = 0;

  // 35% — vector similarity (0 to 1)
  score += vectorSimilarity * 0.35;

  // 10% — profile completeness
  const completenessScore = profile.profile_completeness
    ? Math.min(profile.profile_completeness / 100, 1.0)
    : 0.3;
  score += completenessScore * 0.10;

  // 15% — verification tier
  const tierScore = {
    identity_verified: 1.0,
    phone_verified: 0.6,
    unverified: 0.2,
  }[profile.verification_tier] || 0.2;
  score += tierScore * 0.15;

  // 10% — recency / activity (based on acceptance rate proxy)
  const activityScore = profile.acceptance_rate
    ? Math.min(profile.acceptance_rate / 100, 1.0)
    : 0.3;
  score += activityScore * 0.10;

  // 8% — rating
  const ratingScore = profile.average_rating ? profile.average_rating / 5 : 0.5;
  score += ratingScore * 0.08;

  // 5% — availability
  if (profile.availability === 'available') score += 0.05;
  else if (profile.availability === 'busy') score += 0.02;

  // 2% — premium boost (capped, not dominant)
  if (profile.is_premium) score += 0.02;

  // 2% — featured boost
  if (profile.is_featured) {
    const featuredValid = !profile.featured_until || new Date(profile.featured_until) > new Date();
    if (featuredValid) score += 0.02;
  }

  return Math.min(score, 1.0);
}

// ============================================================
// MAIN SEARCH FUNCTION
// ============================================================

export async function semanticSearch({ slots, intent, categoryFilter, requirementSummary, location }) {
  try {
    const queryText = buildQueryEmbeddingText(slots, intent, requirementSummary);
    logger.debug('Embedding query text', { queryText });

    const queryEmbedding = await generateEmbedding(queryText);

    const { data: rawResults, error } = await supabase.rpc('search_profiles', {
      query_embedding: `[${queryEmbedding.join(',')}]`,
      filter_categories: categoryFilter?.length ? categoryFilter : null,
      filter_city: location || slots?.location || null,
      filter_state: slots?.state || null,
      filter_available: null,
      filter_open_to: slots?.open_to || null,
      filter_funding_stage: slots?.funding_stage || null,
      min_completeness: slots?.min_completeness ?? 30,
      result_limit: config.agent.maxSearchResults,
    });

    if (error) {
      logger.error('Supabase search error', { error: error.message });
      return [];
    }

    if (!rawResults || rawResults.length === 0) {
      logger.info('No search results', { intent, categoryFilter });
      return [];
    }

    const scored = rawResults.map(profile => ({
      ...profile,
      composite_score: computeCompositeScore(profile, profile.similarity),
    })).sort((a, b) => b.composite_score - a.composite_score);

    logger.info('Search complete', {
      intent,
      total: scored.length,
      topScore: scored[0]?.composite_score?.toFixed(3),
    });

    return scored;
  } catch (err) {
    logger.error('Semantic search failed', { error: err.message });
    return [];
  }
}

// ============================================================
// EMBEDDING QUEUE PROCESSOR
// Called by background job / cron — not per-request
// ============================================================

export async function processEmbeddingQueue(batchSize = 10) {
  const { data: queue, error } = await supabase
    .from('embedding_queue')
    .select('profile_id, attempts')
    .order('queued_at', { ascending: true })
    .limit(batchSize);

  if (error || !queue?.length) return { processed: 0, failed: 0 };

  let processed = 0;
  let failed = 0;

  for (const item of queue) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', item.profile_id)
        .single();

      if (!profile) {
        await supabase.from('embedding_queue').delete().eq('profile_id', item.profile_id);
        continue;
      }

      const embeddingText = buildProfileEmbeddingText(profile);
      const embedding = await generateEmbedding(embeddingText);

      await supabase
        .from('profiles')
        .update({
          embedding: `[${embedding.join(',')}]`,
          embedding_text: embeddingText,
          embedding_updated_at: new Date().toISOString(),
        })
        .eq('id', item.profile_id);

      await supabase.from('embedding_queue').delete().eq('profile_id', item.profile_id);
      processed++;
    } catch (err) {
      logger.error('Embedding failed for profile', { profileId: item.profile_id, error: err.message });
      await supabase
        .from('embedding_queue')
        .update({ attempts: item.attempts + 1, last_error: err.message })
        .eq('profile_id', item.profile_id);
      failed++;
    }
  }

  return { processed, failed };
}
