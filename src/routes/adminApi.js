import { Router } from 'express';
import { supabase } from '../utils/supabase.js';
import { logger } from '../utils/logger.js';
import {
  createAdminToken,
  validateAdminCredentials,
  requireAdmin,
  verifyAdminToken,
} from '../utils/adminAuth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = createAdminToken(email);
  return res.json({ token, email });
});

router.get('/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const session = verifyAdminToken(token);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  return res.json({ email: session.email });
});

router.get('/analytics/overview', requireAdmin, async (req, res) => {
  try {
    const [
      profilesRes,
      usersRes,
      leadsRes,
      conversationsRes,
      completedRes,
      activeRes,
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('id', { count: 'exact', head: true }),
      supabase.from('conversations').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('onboarding_completed', true),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_active', true),
    ]);

    const { data: webProfiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('web_onboarded', true);
    const { data: waProfiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('whatsapp_onboarded', true);

    const { data: avgCompleteness } = await supabase
      .from('profiles')
      .select('profile_completeness');

    const scores = (avgCompleteness || []).map((p) => p.profile_completeness || 0);
    const avgScore = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    res.json({
      totalProfiles: profilesRes.count || 0,
      totalUsers: usersRes.count || 0,
      totalLeads: leadsRes.count || 0,
      totalConversations: conversationsRes.count || 0,
      completedOnboarding: completedRes.count || 0,
      activeProfiles: activeRes.count || 0,
      webOnboarded: webProfiles?.length || 0,
      whatsappOnboarded: waProfiles?.length || 0,
      averageCompleteness: avgScore,
    });
  } catch (err) {
    logger.error('Admin overview failed', { error: err.message });
    res.status(500).json({ error: 'Failed to load analytics' });
  }
});

router.get('/analytics/by-type', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_type, category');
    if (error) throw error;

    const byType = {};
    const byCategory = {};
    for (const row of data || []) {
      const type = row.profile_type || 'Unknown';
      const cat = row.category || 'unknown';
      byType[type] = (byType[type] || 0) + 1;
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    }

    res.json({
      byProfileType: Object.entries(byType)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      byCategory: Object.entries(byCategory)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    });
  } catch (err) {
    logger.error('Admin by-type failed', { error: err.message });
    res.status(500).json({ error: 'Failed to load type breakdown' });
  }
});

router.get('/analytics/completeness', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('profile_completeness');
    if (error) throw error;

    const buckets = { incomplete: 0, basic: 0, good: 0, excellent: 0 };
    for (const row of data || []) {
      const s = row.profile_completeness || 0;
      if (s <= 30) buckets.incomplete++;
      else if (s <= 60) buckets.basic++;
      else if (s <= 80) buckets.good++;
      else buckets.excellent++;
    }

    res.json({
      buckets: [
        { label: 'Incomplete (0-30)', count: buckets.incomplete },
        { label: 'Basic (31-60)', count: buckets.basic },
        { label: 'Good (61-80)', count: buckets.good },
        { label: 'Excellent (81-100)', count: buckets.excellent },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load completeness data' });
  }
});

router.get('/analytics/timeline', requireAdmin, async (req, res) => {
  try {
    const days = parseInt(req.query.days || '30', 10);
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await supabase
      .from('profiles')
      .select('created_at, web_onboarded, whatsapp_onboarded, onboarding_completed')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: true });
    if (error) throw error;

    const byDay = {};
    for (const row of data || []) {
      const day = row.created_at.slice(0, 10);
      if (!byDay[day]) {
        byDay[day] = { date: day, total: 0, web: 0, whatsapp: 0, completed: 0 };
      }
      byDay[day].total++;
      if (row.web_onboarded) byDay[day].web++;
      if (row.whatsapp_onboarded) byDay[day].whatsapp++;
      if (row.onboarding_completed) byDay[day].completed++;
    }

    res.json({ timeline: Object.values(byDay) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load timeline' });
  }
});

router.get('/analytics/leads', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('intent, status, created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;

    const byIntent = {};
    const byStatus = {};
    for (const row of data || []) {
      byIntent[row.intent] = (byIntent[row.intent] || 0) + 1;
      byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    }

    res.json({
      recent: data || [],
      byIntent: Object.entries(byIntent).map(([name, count]) => ({ name, count })),
      byStatus: Object.entries(byStatus).map(([name, count]) => ({ name, count })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leads analytics' });
  }
});

router.get('/profiles', requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(50, parseInt(req.query.limit || '20', 10));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const type = (req.query.type || '').trim();
    const source = (req.query.source || '').trim();

    let query = supabase
      .from('profiles')
      .select(
        'id, name, display_name, profile_type, category, tagline, location_city, location_country, profile_completeness, onboarding_completed, onboarding_step, web_onboarded, whatsapp_onboarded, is_active, verification_tier, created_at, updated_at',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,display_name.ilike.%${search}%,tagline.ilike.%${search}%,location_city.ilike.%${search}%`
      );
    }
    if (type) query = query.eq('profile_type', type);
    if (source === 'web') query = query.eq('web_onboarded', true);
    if (source === 'whatsapp') query = query.eq('whatsapp_onboarded', true);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ profiles: data || [], total: count || 0, page, limit });
  } catch (err) {
    logger.error('Admin profiles list failed', { error: err.message });
    res.status(500).json({ error: 'Failed to load profiles' });
  }
});

router.get('/profiles/:id', requireAdmin, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error || !profile) return res.status(404).json({ error: 'Profile not found' });

    const { data: user } = await supabase
      .from('users')
      .select('id, role, metadata, created_at')
      .eq('id', profile.user_id)
      .single();

    res.json({ profile, user: user || null });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

router.get('/activity', requireAdmin, async (req, res) => {
  try {
    const { data: recentProfiles } = await supabase
      .from('profiles')
      .select('id, display_name, name, profile_type, created_at, updated_at, onboarding_completed, web_onboarded, whatsapp_onboarded')
      .order('updated_at', { ascending: false })
      .limit(20);

    const { data: recentLeads } = await supabase
      .from('leads')
      .select('id, intent, requirement_text, status, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: events } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    res.json({
      recentProfiles: recentProfiles || [],
      recentLeads: recentLeads || [],
      analyticsEvents: events || [],
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load activity' });
  }
});

export default router;
