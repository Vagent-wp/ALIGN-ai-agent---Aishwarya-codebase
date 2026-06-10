import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchActivity } from '@/lib/admin/api';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export function AdminActivityPage() {
  const [activity, setActivity] = useState<Awaited<ReturnType<typeof fetchActivity>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity()
      .then(setActivity)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-poppins text-2xl font-bold">Activity Feed</h1>
        <p className="text-sm text-muted-foreground">Recent registrations, leads, and platform events</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-panel p-5">
          <p className="section-title text-left">Recent profile updates</p>
          <ul className="mt-4 space-y-3">
            {(activity?.recentProfiles || []).map((p) => (
              <li key={p.id} className="rounded-xl border border-border/50 p-3">
                <Link to={`/admin/profiles/${p.id}`} className="font-medium text-primary hover:underline">
                  {p.display_name || p.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {p.profile_type} · Updated {new Date(p.updated_at).toLocaleString()}
                  {p.onboarding_completed ? ' · Completed' : ''}
                </p>
              </li>
            ))}
            {!activity?.recentProfiles?.length && (
              <li className="text-sm text-muted-foreground">No profile activity yet</li>
            )}
          </ul>
        </div>

        <div className="dashboard-panel p-5">
          <p className="section-title text-left">Recent leads</p>
          <ul className="mt-4 space-y-3">
            {(activity?.recentLeads || []).map((l) => (
              <li key={l.id} className="rounded-xl border border-border/50 p-3">
                <p className="text-sm font-medium">{l.intent}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{l.requirement_text}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {l.status} · {new Date(l.created_at).toLocaleString()}
                </p>
              </li>
            ))}
            {!activity?.recentLeads?.length && (
              <li className="text-sm text-muted-foreground">No leads yet</li>
            )}
          </ul>
        </div>
      </div>

      <div className="dashboard-panel p-5">
        <p className="section-title text-left">Analytics events</p>
        <ul className="mt-4 space-y-2">
          {(activity?.analyticsEvents || []).map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-lg border border-border/40 px-3 py-2 text-sm">
              <span className="font-medium">{e.event_type}</span>
              <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</span>
            </li>
          ))}
          {!activity?.analyticsEvents?.length && (
            <li className="text-sm text-muted-foreground">No analytics events recorded</li>
          )}
        </ul>
      </div>
    </div>
  );
}
