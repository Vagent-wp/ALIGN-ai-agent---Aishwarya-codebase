import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchProfileDetail } from '@/lib/admin/api';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Badge } from '@/components/ui/badge';

const SECTIONS: { title: string; keys: string[] }[] = [
  {
    title: 'Identity',
    keys: ['display_name', 'name', 'profile_type', 'profile_sub_types', 'tagline', 'description', 'headline', 'professional_summary', 'avatar_url'],
  },
  {
    title: 'Location & availability',
    keys: ['location_city', 'state', 'location_country', 'pin_code', 'timezone', 'is_remote_friendly', 'availability', 'hours_per_week'],
  },
  {
    title: 'Professional',
    keys: ['years_of_experience', 'current_role', 'current_organization', 'domain_expertise', 'services', 'tools_and_technologies', 'industries_served', 'languages_spoken', 'problems_solved'],
  },
  {
    title: 'Offer & pricing',
    keys: ['products_offered', 'engagement_types', 'pricing_model', 'pricing_min', 'pricing_max', 'pricing_currency'],
  },
  {
    title: 'Seeking',
    keys: ['seeking', 'ideal_collaboration', 'ideal_client_profile', 'open_to_hiring', 'open_to_investment', 'open_to_mentorship', 'open_to_cofounder', 'opportunity_types'],
  },
  {
    title: 'Startup / business',
    keys: ['company_name', 'company_description', 'founding_year', 'team_size', 'funding_stage', 'annual_revenue', 'business_model', 'target_market', 'usp', 'product_stage', 'looking_for_from_ecosystem'],
  },
  {
    title: 'Investor',
    keys: ['investor_type', 'investment_thesis', 'preferred_stages', 'preferred_sectors', 'check_size_min', 'check_size_max', 'portfolio_companies', 'investment_geography'],
  },
  {
    title: 'Job seeker / student',
    keys: ['education_level', 'field_of_study', 'current_institution', 'graduation_year', 'seeking_role_type', 'preferred_roles', 'preferred_locations', 'notice_period', 'expected_ctc', 'resume_url'],
  },
  {
    title: 'Links',
    keys: ['linkedin_url', 'twitter_url', 'github_url', 'instagram_url', 'youtube_url', 'behance_url', 'dribbble_url', 'website', 'portfolio_urls'],
  },
  {
    title: 'AI discovery',
    keys: ['search_keywords', 'unique_about_me', 'strengths', 'achievements', 'collaboration_style', 'not_looking_for'],
  },
  {
    title: 'Status',
    keys: ['profile_completeness', 'onboarding_completed', 'onboarding_step', 'web_onboarded', 'whatsapp_onboarded', 'is_active', 'verification_tier', 'created_at', 'updated_at'],
  },
];

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function AdminProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProfileDetail(id)
      .then((data) => {
        setProfile(data.profile);
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
  }

  if (!profile) {
    return <p className="text-muted-foreground">Profile not found</p>;
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/profiles" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Back to profiles
      </Link>

      <div className="dashboard-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-bold">{String(profile.display_name || profile.name)}</h1>
            <p className="text-muted-foreground">{String(profile.profile_type || profile.category)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{String(profile.profile_completeness ?? 0)}% complete</Badge>
            {!!profile.web_onboarded && <Badge>Web</Badge>}
            {!!profile.whatsapp_onboarded && <Badge>WhatsApp</Badge>}
            {profile.is_active ? <Badge className="bg-primary">Active</Badge> : <Badge variant="outline">Pending review</Badge>}
          </div>
        </div>
      </div>

      {user && (
        <div className="dashboard-panel p-5">
          <p className="section-title text-left">Linked user</p>
          <p className="mt-2 text-sm">Role: {String(user.role)} · Created {new Date(String(user.created_at)).toLocaleString()}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {SECTIONS.map((section) => {
          const fields = section.keys.filter((k) => {
            const v = profile[k];
            return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
          });
          if (fields.length === 0) return null;
          return (
            <div key={section.title} className="dashboard-panel p-5">
              <p className="section-title text-left">{section.title}</p>
              <dl className="mt-4 space-y-3">
                {fields.map((key) => (
                  <div key={key}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{key.replace(/_/g, ' ')}</dt>
                    <dd className="mt-0.5 text-sm break-words">{formatValue(profile[key])}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
