import crypto from 'crypto';
import { Router } from 'express';
import { config } from '../../config/index.js';
import { supabase } from '../utils/supabase.js';
import { logger } from '../utils/logger.js';
import { updateProfile, getProfileById } from '../profiles/profileManager.js';

const router = Router();

const FOUNDER_TYPES = new Set(['founder', 'startup founder', 'co-founder', 'solo founder', 'founder / startup', 'business owner', 'company']);
const INVESTOR_TYPES = new Set(['investor', 'angel investor', 'vc', 'fund', 'angel', 'vc fund']);
const TALENT_TYPES = new Set(['job seeker', 'student', 'intern', 'student / intern']);

function normalizeType(value) {
  return (value || '').toLowerCase().trim();
}

function mapFormToDbFields(form) {
  const skills = form.skills || [];
  const servicesOffered = form.services_offered || [];
  const mergedServices = [...new Set([...servicesOffered, ...skills])];

  return {
    display_name: form.display_name || null,
    name: form.display_name || form.name || 'Unnamed Profile',
    profile_type: form.profile_type || null,
    profile_sub_types: form.profile_sub_types || [],
    tagline: form.tagline || null,
    description: form.description || form.bio || null,
    avatar_url: form.avatar_url || null,
    location_city: form.city || null,
    state: form.state || null,
    location_state: form.state || null,
    location_country: form.country || 'India',
    pin_code: form.pin_code || null,
    timezone: form.timezone || 'Asia/Kolkata',
    is_remote_friendly: form.is_remote_friendly ?? true,
    availability: form.availability_status || 'available',
    hours_per_week: form.hours_per_week ? parseInt(form.hours_per_week, 10) : null,
    headline: form.headline || null,
    professional_summary: form.professional_summary || null,
    years_of_experience: form.years_of_experience ? parseInt(form.years_of_experience, 10) : null,
    current_role: form.current_role || null,
    current_organization: form.current_organization || null,
    domain_expertise: form.domain_expertise || [],
    services: mergedServices,
    tools_and_technologies: form.tools_and_technologies || [],
    industries_served: form.industries_worked_in || [],
    languages_spoken: form.languages_spoken || [],
    problems_solved: form.problems_you_solve || [],
    products_offered: form.products_offered || [],
    engagement_types: form.engagement_types || [],
    pricing_model: form.pricing_model || null,
    pricing_min: form.pricing_min ? Number(form.pricing_min) : null,
    pricing_max: form.pricing_max ? Number(form.pricing_max) : null,
    pricing_currency: form.pricing_currency || 'INR',
    seeking: form.seeking || [],
    ideal_collaboration: form.ideal_collaboration || null,
    ideal_client_profile: form.ideal_client_profile || null,
    open_to_hiring: form.open_to_hiring ?? false,
    open_to_investment: form.open_to_investment ?? false,
    open_to_mentorship: form.open_to_mentorship ?? false,
    open_to_cofounder: form.open_to_cofounder ?? false,
    opportunity_types: form.opportunity_types || [],
    company_name: form.company_name || null,
    company_description: form.company_description || null,
    founding_year: form.founding_year ? parseInt(form.founding_year, 10) : null,
    team_size: form.team_size || null,
    funding_stage: form.funding_stage || null,
    annual_revenue: form.annual_revenue || null,
    business_model: form.business_model || [],
    target_market: form.target_market || null,
    usp: form.usp || null,
    product_stage: form.product_stage || null,
    looking_for_from_ecosystem: form.looking_for_from_ecosystem || [],
    investor_type: form.investor_type || null,
    investment_thesis: form.investment_thesis || null,
    preferred_stages: form.preferred_stages || [],
    preferred_sectors: form.preferred_sectors || [],
    check_size_min: form.check_size_min ? Number(form.check_size_min) : null,
    check_size_max: form.check_size_max ? Number(form.check_size_max) : null,
    portfolio_companies: form.portfolio_companies || [],
    investment_geography: form.investment_geography || [],
    education_level: form.education_level || null,
    field_of_study: form.field_of_study || null,
    current_institution: form.current_institution || null,
    graduation_year: form.graduation_year ? parseInt(form.graduation_year, 10) : null,
    seeking_role_type: form.seeking_role_type || [],
    preferred_roles: form.preferred_roles || [],
    preferred_locations: form.preferred_locations || [],
    notice_period: form.notice_period || null,
    expected_ctc: form.expected_ctc ? Number(form.expected_ctc) : null,
    resume_url: form.resume_url || null,
    linkedin_url: form.linkedin_url || null,
    twitter_url: form.twitter_url || null,
    github_url: form.github_url || null,
    instagram_url: form.instagram_url || null,
    youtube_url: form.youtube_url || null,
    behance_url: form.behance_url || null,
    dribbble_url: form.dribbble_url || null,
    website: form.personal_website || null,
    portfolio_urls: form.portfolio_urls || [],
    search_keywords: form.search_keywords || [],
    unique_about_me: form.unique_about_me || null,
    strengths: form.strengths || [],
    achievements: form.achievements || [],
    collaboration_style: form.collaboration_style || null,
    not_looking_for: form.not_looking_for || [],
    onboarding_step: form.onboarding_step ?? 0,
    web_onboarded: true,
    onboarding_completed: form.onboarding_completed ?? false,
  };
}

async function createWebOnboardingUser() {
  const syntheticId = crypto.randomUUID();
  const phoneHash = crypto.createHash('sha256').update(`web-onboarding-${syntheticId}`).digest('hex');
  const { data, error } = await supabase
    .from('users')
    .insert({
      phone_number: `web:${syntheticId}`,
      phone_hash: phoneHash,
      role: 'provider',
      metadata: { source: 'web_onboarding' },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

router.get('/skills', async (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim();
    let query = supabase.from('skills_master').select('name, category, slug').eq('is_active', true).limit(20);
    if (q) query = query.ilike('name', `%${q}%`);
    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    logger.error('Skills fetch failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

router.post('/cloudinary/sign', (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary not configured' });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = req.body?.folder || 'align-network/profiles';
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + apiSecret)
    .digest('hex');

  res.json({ cloudName, apiKey, timestamp, folder, signature });
});

router.get('/profile/:id', async (req, res) => {
  const profile = await getProfileById(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

router.get('/profile/:id/completeness', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('calculate_profile_completeness', {
      p_profile_id: req.params.id,
    });
    if (error) throw error;
    res.json({ score: data });
  } catch (err) {
    logger.error('Completeness fetch failed', { error: err.message });
    res.status(500).json({ error: 'Failed to calculate completeness' });
  }
});

router.post('/profile', async (req, res) => {
  try {
    const { profileId, form } = req.body;
    const dbFields = mapFormToDbFields(form || {});

    if (profileId) {
      const updated = await updateProfile(profileId, dbFields);
      if (!updated) return res.status(404).json({ error: 'Profile not found' });
      const { data: score } = await supabase.rpc('calculate_profile_completeness', { p_profile_id: profileId });
      return res.json({ profile: updated, completeness: score });
    }

    const user = await createWebOnboardingUser();
    const profileType = normalizeType(form?.profile_type);
    const categoryMap = {
      founder: 'startup',
      investor: 'investor',
      freelancer: 'freelancer',
      agency: 'agency',
      consultant: 'consultant',
      mentor: 'mentor',
      manufacturer: 'vendor',
      creator: 'creator',
      recruiter: 'recruiter',
    };
    const categoryKey = Object.keys(categoryMap).find(k => profileType.includes(k)) || 'service_provider';

    const { data: profile, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        category: categoryMap[categoryKey] || 'service_provider',
        is_active: false,
        ...dbFields,
      })
      .select()
      .single();

    if (error) throw error;

    const { data: score } = await supabase.rpc('calculate_profile_completeness', { p_profile_id: profile.id });

    await supabase.from('embedding_queue').upsert(
      { profile_id: profile.id },
      { onConflict: 'profile_id' }
    );

    res.json({ profile, completeness: score });
  } catch (err) {
    logger.error('Onboarding save failed', { error: err.message });
    res.status(500).json({ error: err.message || 'Failed to save profile' });
  }
});

router.post('/profile/:id/submit', async (req, res) => {
  try {
    const updated = await updateProfile(req.params.id, {
      ...mapFormToDbFields(req.body.form || {}),
      onboarding_completed: true,
      web_onboarded: true,
    });
    if (!updated) return res.status(404).json({ error: 'Profile not found' });

    const { data: score } = await supabase.rpc('calculate_profile_completeness', { p_profile_id: req.params.id });
    res.json({ profile: updated, completeness: score });
  } catch (err) {
    logger.error('Onboarding submit failed', { error: err.message });
    res.status(500).json({ error: 'Failed to submit profile' });
  }
});

export { FOUNDER_TYPES, INVESTOR_TYPES, TALENT_TYPES, normalizeType };
export default router;
