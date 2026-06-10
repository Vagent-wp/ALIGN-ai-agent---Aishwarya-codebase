const API_BASE = '/api/onboarding';

export interface OnboardingFormData {
  display_name?: string;
  profile_type?: string;
  profile_sub_types?: string[];
  tagline?: string;
  description?: string;
  bio?: string;
  avatar_url?: string;
  city?: string;
  state?: string;
  country?: string;
  pin_code?: string;
  timezone?: string;
  is_remote_friendly?: boolean;
  availability_status?: string;
  hours_per_week?: number | string;
  headline?: string;
  professional_summary?: string;
  years_of_experience?: number | string;
  current_role?: string;
  current_organization?: string;
  domain_expertise?: string[];
  skills?: string[];
  tools_and_technologies?: string[];
  industries_worked_in?: string[];
  languages_spoken?: string[];
  services_offered?: string[];
  problems_you_solve?: string[];
  products_offered?: string[];
  engagement_types?: string[];
  pricing_model?: string;
  pricing_min?: number | string;
  pricing_max?: number | string;
  pricing_currency?: string;
  seeking?: string[];
  ideal_collaboration?: string;
  ideal_client_profile?: string;
  open_to_hiring?: boolean;
  open_to_investment?: boolean;
  open_to_mentorship?: boolean;
  open_to_cofounder?: boolean;
  opportunity_types?: string[];
  company_name?: string;
  company_description?: string;
  founding_year?: number | string;
  team_size?: string;
  funding_stage?: string;
  annual_revenue?: string;
  business_model?: string[];
  target_market?: string;
  usp?: string;
  product_stage?: string;
  looking_for_from_ecosystem?: string[];
  investor_type?: string;
  investment_thesis?: string;
  preferred_stages?: string[];
  preferred_sectors?: string[];
  check_size_min?: number | string;
  check_size_max?: number | string;
  portfolio_companies?: string[];
  investment_geography?: string[];
  education_level?: string;
  field_of_study?: string;
  current_institution?: string;
  graduation_year?: number | string;
  seeking_role_type?: string[];
  preferred_roles?: string[];
  preferred_locations?: string[];
  notice_period?: string;
  expected_ctc?: number | string;
  resume_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  behance_url?: string;
  dribbble_url?: string;
  personal_website?: string;
  portfolio_urls?: string[];
  search_keywords?: string[];
  unique_about_me?: string;
  strengths?: string[];
  achievements?: string[];
  collaboration_style?: string;
  not_looking_for?: string[];
  onboarding_step?: number;
  onboarding_completed?: boolean;
}

export async function saveProfile(profileId: string | null, form: OnboardingFormData) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId, form }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save profile');
  }
  return res.json() as Promise<{ profile: { id: string }; completeness: number }>;
}

export async function submitProfile(profileId: string, form: OnboardingFormData) {
  const res = await fetch(`${API_BASE}/profile/${profileId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form: { ...form, onboarding_completed: true } }),
  });
  if (!res.ok) throw new Error('Failed to submit profile');
  return res.json() as Promise<{ profile: { id: string }; completeness: number }>;
}

export async function fetchCompleteness(profileId: string) {
  const res = await fetch(`${API_BASE}/profile/${profileId}/completeness`);
  if (!res.ok) throw new Error('Failed to fetch completeness');
  const data = await res.json();
  return data.score as number;
}

export async function searchSkills(query: string) {
  const res = await fetch(`${API_BASE}/skills?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json() as Promise<{ name: string; category: string }[]>;
}

export async function getCloudinarySignature(folder = 'align-network/profiles') {
  const res = await fetch(`${API_BASE}/cloudinary/sign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });
  if (!res.ok) throw new Error('Failed to get upload signature');
  return res.json() as Promise<{
    cloudName: string;
    apiKey: string;
    timestamp: number;
    folder: string;
    signature: string;
  }>;
}

export async function uploadToCloudinary(file: File, folder = 'align-network/profiles') {
  const sig = await getCloudinarySignature(folder);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', sig.apiKey);
  formData.append('timestamp', String(sig.timestamp));
  formData.append('folder', sig.folder);
  formData.append('signature', sig.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url as string;
}
