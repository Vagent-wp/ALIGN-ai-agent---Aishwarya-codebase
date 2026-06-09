import { generateEmbedding } from '../ai/aishwarya.js';
import { supabase } from '../utils/supabase.js';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

// ============================================================
// EMBEDDING TEXT BUILDER
// The quality of this text directly determines search quality.
// ============================================================

export function buildQueryEmbeddingText(slots, intent, requirementSummary) {
  const parts = [];

  if (requirementSummary) parts.push(requirementSummary);
  if (slots.role) parts.push(`Role needed: ${slots.role}`);
  if (slots.skill) parts.push(`Skills needed: ${slots.skill}`);
  if (slots.service_type) parts.push(`Service: ${slots.service_type}`);
  if (slots.domain) parts.push(`Domain: ${slots.domain}`);
  if (slots.industry) parts.push(`Industry: ${slots.industry}`);
  if (slots.experience_years) parts.push(`Experience: ${slots.experience_years} years`);
  if (slots.engagement_type) parts.push(`Engagement: ${slots.engagement_type}`);
  if (slots.additional_context) parts.push(slots.additional_context);

  return parts.join('. ');
}

export function buildProfileEmbeddingText(profile) {
  const parts = [
    `${profile.name} is a ${profile.category}.`,
  ];
  if (profile.tagline) parts.push(profile.tagline);
  if (profile.description) parts.push(profile.description);
  if (profile.services?.length) parts.push(`Services: ${profile.services.join(', ')}.`);
  if (profile.problems_solved?.length) parts.push(`Problems solved: ${profile.problems_solved.join(', ')}.`);
  if (profile.industries_served?.length) parts.push(`Industries: ${profile.industries_served.join(', ')}.`);
  if (profile.keywords?.length) parts.push(`Keywords: ${profile.keywords.join(', ')}.`);

  return parts.join(' ');
}

// ============================================================
// COMPOSITE SCORING
// Combines vector similarity with metadata signals
// ============================================================

function computeCompositeScore(profile, vectorSimilarity) {
  let score = 0;

  // 40% — vector similarity (0 to 1)
  score += vectorSimilarity * 0.40;

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
    // Build and embed the query
    const queryText = buildQueryEmbeddingText(slots, intent, requirementSummary);
    logger.debug('Embedding query text', { queryText });

    const queryEmbedding = await generateEmbedding(queryText);

    // Call the search_profiles() Supabase function
    const { data: rawResults, error } = await supabase.rpc('search_profiles', {
      query_embedding: `[${queryEmbedding.join(',')}]`,
      filter_categories: categoryFilter?.length ? categoryFilter : null,
      filter_city: location || null,
      filter_available: null,
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

    // Apply composite scoring and sort
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
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', item.profile_id)
        .single();

      if (!profile) {
        await supabase.from('embedding_queue').delete().eq('profile_id', item.profile_id);
        continue;
      }

      // Generate embedding
      const embeddingText = buildProfileEmbeddingText(profile);
      const embedding = await generateEmbedding(embeddingText);

      // Store embedding
      await supabase
        .from('profiles')
        .update({
          embedding: `[${embedding.join(',')}]`,
          embedding_text: embeddingText,
          embedding_updated_at: new Date().toISOString(),
        })
        .eq('id', item.profile_id);

      // Remove from queue
      await supabase.from('embedding_queue').delete().eq('profile_id', item.profile_id);
      processed++;
    } catch (err) {
      logger.error('Embedding failed for profile', { profileId: item.profile_id, error: err.message });
      // Increment attempts, mark error
      await supabase
        .from('embedding_queue')
        .update({ attempts: item.attempts + 1, last_error: err.message })
        .eq('profile_id', item.profile_id);
      failed++;
    }
  }

  return { processed, failed };
}
