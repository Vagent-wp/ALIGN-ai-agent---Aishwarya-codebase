import { clearAdminSession, getAdminToken } from './auth';

const API_BASE = '/api/admin';

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearAdminSession();
    window.location.href = '/admin';
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed');
  }
  return res.json() as Promise<{ token: string; email: string }>;
}

export async function verifyAdminSession() {
  return adminFetch<{ email: string }>('/me');
}

export interface OverviewStats {
  totalProfiles: number;
  totalUsers: number;
  totalLeads: number;
  totalConversations: number;
  completedOnboarding: number;
  activeProfiles: number;
  webOnboarded: number;
  whatsappOnboarded: number;
  averageCompleteness: number;
}

export async function fetchOverview() {
  return adminFetch<OverviewStats>('/analytics/overview');
}

export async function fetchByType() {
  return adminFetch<{ byProfileType: { name: string; count: number }[]; byCategory: { name: string; count: number }[] }>('/analytics/by-type');
}

export async function fetchCompletenessBuckets() {
  return adminFetch<{ buckets: { label: string; count: number }[] }>('/analytics/completeness');
}

export async function fetchTimeline(days = 30) {
  return adminFetch<{ timeline: { date: string; total: number; web: number; whatsapp: number; completed: number }[] }>(`/analytics/timeline?days=${days}`);
}

export async function fetchLeadsAnalytics() {
  return adminFetch<{ recent: unknown[]; byIntent: { name: string; count: number }[]; byStatus: { name: string; count: number }[] }>('/analytics/leads');
}

export interface ProfileSummary {
  id: string;
  name: string;
  display_name: string | null;
  profile_type: string | null;
  category: string;
  tagline: string | null;
  location_city: string | null;
  location_country: string | null;
  profile_completeness: number | null;
  onboarding_completed: boolean | null;
  onboarding_step: number | null;
  web_onboarded: boolean | null;
  whatsapp_onboarded: boolean | null;
  is_active: boolean;
  verification_tier: string;
  created_at: string;
  updated_at: string;
}

export async function fetchProfiles(params: { page?: number; search?: string; type?: string; source?: string }) {
  const q = new URLSearchParams();
  if (params.page) q.set('page', String(params.page));
  if (params.search) q.set('search', params.search);
  if (params.type) q.set('type', params.type);
  if (params.source) q.set('source', params.source);
  return adminFetch<{ profiles: ProfileSummary[]; total: number; page: number; limit: number }>(`/profiles?${q}`);
}

export async function fetchProfileDetail(id: string) {
  return adminFetch<{ profile: Record<string, unknown>; user: Record<string, unknown> | null }>(`/profiles/${id}`);
}

export async function fetchActivity() {
  return adminFetch<{
    recentProfiles: ProfileSummary[];
    recentLeads: { id: string; intent: string; requirement_text: string; status: string; created_at: string }[];
    analyticsEvents: { id: string; event_type: string; created_at: string; metadata: Record<string, unknown> }[];
  }>('/activity');
}
