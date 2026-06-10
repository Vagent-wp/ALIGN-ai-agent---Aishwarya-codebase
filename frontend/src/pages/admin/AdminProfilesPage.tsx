import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProfiles, ProfileSummary } from '@/lib/admin/api';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<ProfileSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProfiles({ page, search, source })
      .then((data) => {
        setProfiles(data.profiles);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page, search, source]);

  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-poppins text-2xl font-bold">All Profiles</h1>
        <p className="text-sm text-muted-foreground">{total} registrations total</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          touch
          placeholder="Search name, tagline, city…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="sm:max-w-xs"
        />
        <select
          className="h-12 rounded-xl border-2 border-border/60 bg-background px-4 text-sm sm:max-w-[180px]"
          value={source}
          onChange={(e) => { setSource(e.target.value); setPage(1); }}
        >
          <option value="">All sources</option>
          <option value="web">Web onboarding</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : profiles.length === 0 ? (
        <div className="dashboard-panel p-8 text-center text-muted-foreground">No profiles found</div>
      ) : (
        <div className="space-y-3">
          {profiles.map((p) => (
            <Link
              key={p.id}
              to={`/admin/profiles/${p.id}`}
              className="dashboard-panel block p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-poppins text-lg font-bold">{p.display_name || p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.profile_type || p.category} · {p.location_city || 'No city'}{p.location_country ? `, ${p.location_country}` : ''}</p>
                  {p.tagline && <p className="mt-1 text-sm">{p.tagline}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{p.profile_completeness ?? 0}% complete</Badge>
                  {p.web_onboarded && <Badge>Web</Badge>}
                  {p.whatsapp_onboarded && <Badge>WhatsApp</Badge>}
                  {p.onboarding_completed && <Badge className="bg-green-600">Completed</Badge>}
                  {p.is_active ? <Badge className="bg-primary">Active</Badge> : <Badge variant="outline">Pending</Badge>}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Registered {new Date(p.created_at).toLocaleString()} · Step {p.onboarding_step ?? 0}
              </p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
