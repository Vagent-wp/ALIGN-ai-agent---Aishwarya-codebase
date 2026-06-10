import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlignBrand } from '@/components/brand/AlignBrand';
import { CloudinaryUpload } from '@/components/onboarding/CloudinaryUpload';
import { FormField } from '@/components/onboarding/FormField';
import { TagInput } from '@/components/onboarding/TagInput';
import { StepIndicator } from '@/components/registration/StepIndicator';
import { WizardFooter } from '@/components/registration/WizardFooter';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  fetchCompleteness,
  OnboardingFormData,
  saveProfile,
  searchSkills,
  submitProfile,
} from '@/lib/onboarding/api';
import {
  ALL_PROFILE_TYPES,
  isFounderType,
  isInvestorType,
  isTalentType,
  PROFILE_TYPE_GROUPS,
} from '@/lib/onboarding/profileTypes';

const STEP_LABELS = [
  'Identity',
  'Location',
  'Professional',
  'Offer',
  'Seeking',
  'Startup',
  'Investor',
  'Talent',
  'Links',
  'AI Discovery',
  'Review',
];

const STORAGE_KEY = 'align_onboarding_profile_id';

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
            value.includes(opt)
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:border-primary/40'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border/60 px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-primary" />
    </label>
  );
}

function completenessHint(score: number) {
  if (score < 31) return 'Complete more sections to appear in search results (need 31+).';
  if (score < 61) return 'Good start — reach 61+ for full visibility without the incomplete label.';
  if (score < 81) return 'Strong profile — reach 81+ for featured placement eligibility.';
  return 'Excellent profile completeness!';
}

export function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [form, setForm] = useState<OnboardingFormData>({
    country: 'India',
    timezone: 'Asia/Kolkata',
    is_remote_friendly: true,
    availability_status: 'available',
    pricing_currency: 'INR',
    profile_sub_types: [],
    domain_expertise: [],
    skills: [],
    tools_and_technologies: [],
    industries_worked_in: [],
    languages_spoken: [],
    services_offered: [],
    problems_you_solve: [],
    products_offered: [],
    engagement_types: [],
    seeking: [],
    opportunity_types: [],
    business_model: [],
    looking_for_from_ecosystem: [],
    preferred_stages: [],
    preferred_sectors: [],
    portfolio_companies: [],
    investment_geography: [],
    seeking_role_type: [],
    preferred_roles: [],
    preferred_locations: [],
    portfolio_urls: [],
    search_keywords: [],
    strengths: [],
    achievements: [],
    not_looking_for: [],
  });
  const [profileId, setProfileId] = useState<string | null>(localStorage.getItem(STORAGE_KEY));
  const [completeness, setCompleteness] = useState<number | null>(null);
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profileType = form.profile_type || '';

  const visibleStepIndices = useMemo(() => {
    const indices = [0, 1, 2, 3, 4];
    if (isFounderType(profileType)) indices.push(5);
    if (isInvestorType(profileType)) indices.push(6);
    if (isTalentType(profileType)) indices.push(7);
    indices.push(8, 9, 10);
    return indices;
  }, [profileType]);

  const visibleLabels = visibleStepIndices.map((i) => STEP_LABELS[i]);
  const currentLogicalStep = visibleStepIndices[currentStepIndex] ?? 0;

  const patch = (fields: Partial<OnboardingFormData>) => setForm((prev) => ({ ...prev, ...fields }));

  const refreshCompleteness = useCallback(async (id: string) => {
    try {
      const score = await fetchCompleteness(id);
      setCompleteness(score);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback(async (step: number) => {
    setIsSaving(true);
    setError(null);
    try {
      const payload = { ...form, onboarding_step: step };
      const result = await saveProfile(profileId, payload);
      if (!profileId) {
        setProfileId(result.profile.id);
        localStorage.setItem(STORAGE_KEY, result.profile.id);
      }
      setCompleteness(result.completeness);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  }, [form, profileId]);

  useEffect(() => {
    if (profileId) refreshCompleteness(profileId);
  }, [profileId, refreshCompleteness]);

  useEffect(() => {
    searchSkills('').then((rows) => setSkillSuggestions(rows.map((r) => r.name)));
  }, []);

  const handleNext = async () => {
    await persist(currentLogicalStep);
    if (currentStepIndex < visibleStepIndices.length - 1) {
      setCurrentStepIndex((s) => s + 1);
      return;
    }
    if (!profileId) return;
    setIsSaving(true);
    try {
      const result = await submitProfile(profileId, { ...form, onboarding_completed: true });
      setCompleteness(result.completeness);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => setCurrentStepIndex((s) => Math.max(0, s - 1));

  const renderStep = () => {
    switch (currentLogicalStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-poppins text-xl font-bold">Who are you?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tell the network who you are and what you do.</p>
            </div>
            <FormField label="Display name *">
              <Input touch value={form.display_name || ''} onChange={(e) => patch({ display_name: e.target.value })} />
            </FormField>
            <FormField label="Profile type *">
              <select
                className="h-12 w-full rounded-xl border-2 border-border/60 bg-background px-4 text-[15px]"
                value={form.profile_type || ''}
                onChange={(e) => patch({ profile_type: e.target.value })}
              >
                <option value="">Select your primary type</option>
                {PROFILE_TYPE_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.types.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </FormField>
            <FormField label="Secondary roles (optional)">
              <MultiSelect
                options={ALL_PROFILE_TYPES.map((t) => t.label)}
                value={form.profile_sub_types || []}
                onChange={(v) => patch({ profile_sub_types: v })}
              />
            </FormField>
            <FormField label="Tagline *" hint="One-line pitch — heavily used for matching">
              <Input touch value={form.tagline || ''} onChange={(e) => patch({ tagline: e.target.value })} />
            </FormField>
            <FormField label="Bio / description *">
              <Textarea value={form.description || ''} onChange={(e) => patch({ description: e.target.value })} rows={5} />
            </FormField>
            <FormField label="Avatar">
              <CloudinaryUpload label="Upload avatar" value={form.avatar_url} onChange={(url) => patch({ avatar_url: url })} folder="align-network/avatars" />
            </FormField>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-poppins text-xl font-bold">Where are you?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Location and availability signals.</p>
            </div>
            <FormField label="City *"><Input touch value={form.city || ''} onChange={(e) => patch({ city: e.target.value })} /></FormField>
            <FormField label="State"><Input touch value={form.state || ''} onChange={(e) => patch({ state: e.target.value })} /></FormField>
            <FormField label="Country *"><Input touch value={form.country || 'India'} onChange={(e) => patch({ country: e.target.value })} /></FormField>
            <FormField label="PIN code"><Input touch value={form.pin_code || ''} onChange={(e) => patch({ pin_code: e.target.value })} /></FormField>
            <FormField label="Timezone"><Input touch value={form.timezone || 'Asia/Kolkata'} onChange={(e) => patch({ timezone: e.target.value })} /></FormField>
            <Toggle label="Remote friendly" checked={form.is_remote_friendly ?? true} onChange={(v) => patch({ is_remote_friendly: v })} />
            <FormField label="Availability">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.availability_status || 'available'} onChange={(e) => patch({ availability_status: e.target.value })}>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="not_available">Not available</option>
              </select>
            </FormField>
            <FormField label="Hours per week"><Input touch type="number" value={form.hours_per_week || ''} onChange={(e) => patch({ hours_per_week: e.target.value })} /></FormField>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">Your professional identity</h2></div>
            <FormField label="Headline *"><Input touch value={form.headline || ''} onChange={(e) => patch({ headline: e.target.value })} /></FormField>
            <FormField label="Professional summary *"><Textarea value={form.professional_summary || ''} onChange={(e) => patch({ professional_summary: e.target.value })} rows={4} /></FormField>
            <FormField label="Years of experience"><Input touch type="number" value={form.years_of_experience || ''} onChange={(e) => patch({ years_of_experience: e.target.value })} /></FormField>
            <FormField label="Current role"><Input touch value={form.current_role || ''} onChange={(e) => patch({ current_role: e.target.value })} /></FormField>
            <FormField label="Current organization"><Input touch value={form.current_organization || ''} onChange={(e) => patch({ current_organization: e.target.value })} /></FormField>
            <FormField label="Domain expertise *"><TagInput value={form.domain_expertise || []} onChange={(v) => patch({ domain_expertise: v })} /></FormField>
            <FormField label="Skills *"><TagInput value={form.skills || []} onChange={(v) => patch({ skills: v })} suggestions={skillSuggestions} /></FormField>
            <FormField label="Tools & technologies"><TagInput value={form.tools_and_technologies || []} onChange={(v) => patch({ tools_and_technologies: v })} /></FormField>
            <FormField label="Industries worked in *"><TagInput value={form.industries_worked_in || []} onChange={(v) => patch({ industries_worked_in: v })} /></FormField>
            <FormField label="Languages spoken"><MultiSelect options={['English', 'Hindi', 'Hinglish', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Kannada', 'Gujarati', 'Punjabi']} value={form.languages_spoken || []} onChange={(v) => patch({ languages_spoken: v })} /></FormField>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">What you offer</h2></div>
            <FormField label="Services offered"><TagInput value={form.services_offered || []} onChange={(v) => patch({ services_offered: v })} /></FormField>
            <FormField label="What problems do you solve for your clients?"><TagInput value={form.problems_you_solve || []} onChange={(v) => patch({ problems_you_solve: v })} /></FormField>
            <FormField label="Products offered"><TagInput value={form.products_offered || []} onChange={(v) => patch({ products_offered: v })} /></FormField>
            <FormField label="Engagement types"><MultiSelect options={['Project', 'Retainer', 'Full-time', 'Advisory', 'Hourly']} value={form.engagement_types || []} onChange={(v) => patch({ engagement_types: v })} /></FormField>
            <FormField label="Pricing model">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.pricing_model || ''} onChange={(e) => patch({ pricing_model: e.target.value })}>
                <option value="">Select</option>
                {['hourly', 'project', 'monthly', 'equity', 'retainer', 'custom'].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Pricing min"><Input touch type="number" value={form.pricing_min || ''} onChange={(e) => patch({ pricing_min: e.target.value })} /></FormField>
              <FormField label="Pricing max"><Input touch type="number" value={form.pricing_max || ''} onChange={(e) => patch({ pricing_max: e.target.value })} /></FormField>
            </div>
            <FormField label="Currency"><Input touch value={form.pricing_currency || 'INR'} onChange={(e) => patch({ pricing_currency: e.target.value })} /></FormField>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">What you&apos;re looking for</h2></div>
            <FormField label="Seeking *"><MultiSelect options={['Clients', 'Co-founder', 'Job', 'Investment', 'Mentor', 'Partnerships', 'Collaborators', 'Community']} value={form.seeking || []} onChange={(v) => patch({ seeking: v })} /></FormField>
            <FormField label="Ideal collaboration"><Textarea value={form.ideal_collaboration || ''} onChange={(e) => patch({ ideal_collaboration: e.target.value })} rows={3} /></FormField>
            <FormField label="Ideal client profile"><Textarea value={form.ideal_client_profile || ''} onChange={(e) => patch({ ideal_client_profile: e.target.value })} rows={3} /></FormField>
            <Toggle label="Open to hiring" checked={form.open_to_hiring ?? false} onChange={(v) => patch({ open_to_hiring: v })} />
            <Toggle label="Open to investment" checked={form.open_to_investment ?? false} onChange={(v) => patch({ open_to_investment: v })} />
            <Toggle label="Open to mentorship" checked={form.open_to_mentorship ?? false} onChange={(v) => patch({ open_to_mentorship: v })} />
            <Toggle label="Open to co-founder" checked={form.open_to_cofounder ?? false} onChange={(v) => patch({ open_to_cofounder: v })} />
            <FormField label="Opportunity types"><MultiSelect options={['freelance', 'fulltime', 'advisory', 'partnership']} value={form.opportunity_types || []} onChange={(v) => patch({ opportunity_types: v })} /></FormField>
          </div>
        );
      case 5:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">Business / Startup info</h2></div>
            <FormField label="Company name"><Input touch value={form.company_name || ''} onChange={(e) => patch({ company_name: e.target.value })} /></FormField>
            <FormField label="Company description"><Textarea value={form.company_description || ''} onChange={(e) => patch({ company_description: e.target.value })} rows={4} /></FormField>
            <FormField label="Founding year"><Input touch type="number" value={form.founding_year || ''} onChange={(e) => patch({ founding_year: e.target.value })} /></FormField>
            <FormField label="Team size">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.team_size || ''} onChange={(e) => patch({ team_size: e.target.value })}>
                <option value="">Select</option>
                {['Solo', '2-10', '11-50', '51-200', '200+'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Funding stage">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.funding_stage || ''} onChange={(e) => patch({ funding_stage: e.target.value })}>
                <option value="">Select</option>
                {['Bootstrapped', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Annual revenue">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.annual_revenue || ''} onChange={(e) => patch({ annual_revenue: e.target.value })}>
                <option value="">Select</option>
                {['Pre-revenue', '< 10L', '10L-1Cr', '1Cr-10Cr', '10Cr+'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Business model"><MultiSelect options={['B2B', 'B2C', 'SaaS', 'Marketplace', 'D2C', 'Service', 'Hardware']} value={form.business_model || []} onChange={(v) => patch({ business_model: v })} /></FormField>
            <FormField label="Target market"><Textarea value={form.target_market || ''} onChange={(e) => patch({ target_market: e.target.value })} rows={3} /></FormField>
            <FormField label="USP"><Textarea value={form.usp || ''} onChange={(e) => patch({ usp: e.target.value })} rows={3} /></FormField>
            <FormField label="Product stage">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.product_stage || ''} onChange={(e) => patch({ product_stage: e.target.value })}>
                <option value="">Select</option>
                {['Idea', 'MVP', 'Launched', 'Scaling'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Looking for from ecosystem"><TagInput value={form.looking_for_from_ecosystem || []} onChange={(v) => patch({ looking_for_from_ecosystem: v })} /></FormField>
          </div>
        );
      case 6:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">Investor info</h2></div>
            <FormField label="Investor type">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.investor_type || ''} onChange={(e) => patch({ investor_type: e.target.value })}>
                <option value="">Select</option>
                {['angel', 'vc', 'family-office', 'corporate', 'govt'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Investment thesis"><Textarea value={form.investment_thesis || ''} onChange={(e) => patch({ investment_thesis: e.target.value })} rows={4} /></FormField>
            <FormField label="Preferred stages"><MultiSelect options={['Pre-seed', 'Seed', 'Series A', 'Series B']} value={form.preferred_stages || []} onChange={(v) => patch({ preferred_stages: v })} /></FormField>
            <FormField label="Preferred sectors"><TagInput value={form.preferred_sectors || []} onChange={(v) => patch({ preferred_sectors: v })} /></FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Check size min"><Input touch type="number" value={form.check_size_min || ''} onChange={(e) => patch({ check_size_min: e.target.value })} /></FormField>
              <FormField label="Check size max"><Input touch type="number" value={form.check_size_max || ''} onChange={(e) => patch({ check_size_max: e.target.value })} /></FormField>
            </div>
            <FormField label="Portfolio companies"><TagInput value={form.portfolio_companies || []} onChange={(v) => patch({ portfolio_companies: v })} /></FormField>
            <FormField label="Investment geography"><MultiSelect options={['India', 'Southeast Asia', 'US', 'Europe', 'Global']} value={form.investment_geography || []} onChange={(v) => patch({ investment_geography: v })} /></FormField>
          </div>
        );
      case 7:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">Job seeker / Student info</h2></div>
            <FormField label="Education level">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.education_level || ''} onChange={(e) => patch({ education_level: e.target.value })}>
                <option value="">Select</option>
                {['high-school', 'bachelors', 'masters', 'phd'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Field of study"><Input touch value={form.field_of_study || ''} onChange={(e) => patch({ field_of_study: e.target.value })} /></FormField>
            <FormField label="Current institution"><Input touch value={form.current_institution || ''} onChange={(e) => patch({ current_institution: e.target.value })} /></FormField>
            <FormField label="Graduation year"><Input touch type="number" value={form.graduation_year || ''} onChange={(e) => patch({ graduation_year: e.target.value })} /></FormField>
            <FormField label="Seeking role type"><MultiSelect options={['Internship', 'Full-time', 'Part-time', 'Contract']} value={form.seeking_role_type || []} onChange={(v) => patch({ seeking_role_type: v })} /></FormField>
            <FormField label="Preferred roles"><TagInput value={form.preferred_roles || []} onChange={(v) => patch({ preferred_roles: v })} /></FormField>
            <FormField label="Preferred locations"><TagInput value={form.preferred_locations || []} onChange={(v) => patch({ preferred_locations: v })} /></FormField>
            <FormField label="Notice period">
              <select className="h-12 w-full rounded-xl border-2 border-border/60 px-4" value={form.notice_period || ''} onChange={(e) => patch({ notice_period: e.target.value })}>
                <option value="">Select</option>
                {['Immediate', '1 month', '2 months', '3 months'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Expected CTC"><Input touch type="number" value={form.expected_ctc || ''} onChange={(e) => patch({ expected_ctc: e.target.value })} /></FormField>
            <FormField label="Resume"><CloudinaryUpload label="Upload resume (PDF)" value={form.resume_url} onChange={(url) => patch({ resume_url: url })} accept="application/pdf" folder="align-network/resumes" /></FormField>
          </div>
        );
      case 8:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">Links & Portfolio</h2></div>
            {[
              ['linkedin_url', 'LinkedIn'],
              ['twitter_url', 'Twitter / X'],
              ['github_url', 'GitHub'],
              ['instagram_url', 'Instagram'],
              ['youtube_url', 'YouTube'],
              ['behance_url', 'Behance'],
              ['dribbble_url', 'Dribbble'],
              ['personal_website', 'Personal website'],
            ].map(([key, label]) => (
              <FormField key={key} label={label}>
                <Input touch value={(form as Record<string, string>)[key] || ''} onChange={(e) => patch({ [key]: e.target.value } as Partial<OnboardingFormData>)} />
              </FormField>
            ))}
            <FormField label="Portfolio URLs"><TagInput value={form.portfolio_urls || []} onChange={(v) => patch({ portfolio_urls: v })} placeholder="Add portfolio links" /></FormField>
          </div>
        );
      case 9:
        return (
          <div className="space-y-5">
            <div><h2 className="font-poppins text-xl font-bold">AI Discovery</h2></div>
            <FormField label="Keywords people might search to find you"><TagInput value={form.search_keywords || []} onChange={(v) => patch({ search_keywords: v })} /></FormField>
            <FormField label="What makes you different from others in your field?"><Textarea value={form.unique_about_me || ''} onChange={(e) => patch({ unique_about_me: e.target.value })} rows={4} /></FormField>
            <FormField label="Strengths"><TagInput value={form.strengths || []} onChange={(v) => patch({ strengths: v })} /></FormField>
            <FormField label="Achievements"><TagInput value={form.achievements || []} onChange={(v) => patch({ achievements: v })} /></FormField>
            <FormField label="Collaboration style"><Textarea value={form.collaboration_style || ''} onChange={(e) => patch({ collaboration_style: e.target.value })} rows={3} /></FormField>
            <FormField label="What are you NOT looking for?"><TagInput value={form.not_looking_for || []} onChange={(v) => patch({ not_looking_for: v })} /></FormField>
          </div>
        );
      case 10:
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-poppins text-xl font-bold">Review & Submit</h2>
              <p className="mt-1 text-sm text-muted-foreground">Confirm your details before going live.</p>
            </div>
            {completeness != null && (
              <div className="dashboard-panel p-5">
                <p className="text-sm font-semibold">Profile completeness</p>
                <p className="mt-1 font-poppins text-3xl font-bold text-primary">{completeness}%</p>
                <p className="mt-2 text-sm text-muted-foreground">{completenessHint(completeness)}</p>
              </div>
            )}
            <div className="dashboard-panel divide-y divide-border/60 p-5 text-sm">
              <p><span className="font-semibold">Name:</span> {form.display_name || '—'}</p>
              <p className="pt-3"><span className="font-semibold">Type:</span> {form.profile_type || '—'}</p>
              <p className="pt-3"><span className="font-semibold">Tagline:</span> {form.tagline || '—'}</p>
              <p className="pt-3"><span className="font-semibold">Location:</span> {[form.city, form.state, form.country].filter(Boolean).join(', ') || '—'}</p>
              <p className="pt-3"><span className="font-semibold">Headline:</span> {form.headline || '—'}</p>
              <p className="pt-3"><span className="font-semibold">Seeking:</span> {form.seeking?.join(', ') || '—'}</p>
            </div>
            <p className="text-xs text-muted-foreground">Use Back to edit any section before submitting.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="dashboard-panel max-w-md p-8 text-center">
          <h1 className="font-poppins text-2xl font-bold">Profile submitted!</h1>
          <p className="mt-3 text-muted-foreground">
            Your ALIGN Network profile is saved and pending review.
          </p>
          {completeness != null && (
            <p className="mt-4 font-poppins text-4xl font-bold text-primary">{completeness}%</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">{completeness != null ? completenessHint(completeness) : ''}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <header className="glass shrink-0 border-b border-border/40 pt-safe">
        <div className="flex min-h-14 items-center justify-between px-4">
          <AlignBrand variant="full" size="md" linkToHome />
          {completeness != null && (
            <span className="text-xs font-semibold text-primary">{completeness}% complete</span>
          )}
        </div>
        <StepIndicator steps={visibleLabels} currentStep={currentStepIndex} />
        <p className="pb-3 text-center text-xs text-muted-foreground">
          Step {currentStepIndex + 1} of {visibleStepIndices.length}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain pb-28">
        <div className="page-shell py-6">
          {error && <p className="mb-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
          {renderStep()}
        </div>
      </div>

      <WizardFooter
        onBack={handleBack}
        onNext={handleNext}
        isFirstStep={currentStepIndex === 0}
        isLastStep={currentStepIndex === visibleStepIndices.length - 1}
        isSubmitting={isSaving}
      />
    </div>
  );
}
