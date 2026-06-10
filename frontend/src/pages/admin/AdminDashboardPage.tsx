import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchByType,
  fetchCompletenessBuckets,
  fetchLeadsAnalytics,
  fetchOverview,
  fetchTimeline,
  OverviewStats,
} from '@/lib/admin/api';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="dashboard-panel p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-poppins text-3xl font-bold tabular-nums text-primary">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function BarList({ title, items }: { title: string; items: { name: string; count: number }[] }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="dashboard-panel p-5">
      <p className="section-title text-left">{title}</p>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No data yet</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="tabular-nums text-muted-foreground">{item.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AdminDashboardPage() {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [byType, setByType] = useState<{ name: string; count: number }[]>([]);
  const [buckets, setBuckets] = useState<{ label: string; count: number }[]>([]);
  const [timeline, setTimeline] = useState<{ date: string; total: number; web: number; whatsapp: number; completed: number }[]>([]);
  const [leadsByIntent, setLeadsByIntent] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchOverview(),
      fetchByType(),
      fetchCompletenessBuckets(),
      fetchTimeline(30),
      fetchLeadsAnalytics(),
    ])
      .then(([ov, types, comp, time, leads]) => {
        setOverview(ov);
        setByType(types.byProfileType);
        setBuckets(comp.buckets);
        setTimeline(time.timeline);
        setLeadsByIntent(leads.byIntent);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-bold">Analytics Overview</h1>
          <p className="text-sm text-muted-foreground">Track onboarding, registrations, and platform activity</p>
        </div>
        <Link
          to="/admin/profiles"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          View all profiles
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total profiles" value={overview?.totalProfiles ?? 0} />
        <StatCard label="Web onboarded" value={overview?.webOnboarded ?? 0} sub="Via website form" />
        <StatCard label="WhatsApp onboarded" value={overview?.whatsappOnboarded ?? 0} sub="Via Aishwarya" />
        <StatCard label="Completed onboarding" value={overview?.completedOnboarding ?? 0} />
        <StatCard label="Active profiles" value={overview?.activeProfiles ?? 0} />
        <StatCard label="Total users" value={overview?.totalUsers ?? 0} />
        <StatCard label="Total leads" value={overview?.totalLeads ?? 0} />
        <StatCard label="Avg completeness" value={`${overview?.averageCompleteness ?? 0}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarList title="Registrations by profile type" items={byType} />
        <BarList title="Profile completeness distribution" items={buckets.map((b) => ({ name: b.label, count: b.count }))} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarList title="Leads by intent" items={leadsByIntent} />
        <div className="dashboard-panel p-5">
          <p className="section-title text-left">Registrations timeline (30 days)</p>
          {timeline.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No registrations in the last 30 days</p>
          ) : (
            <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
              {timeline.map((day) => (
                <li key={day.date} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 text-sm">
                  <span className="font-medium">{day.date}</span>
                  <span className="text-muted-foreground">
                    {day.total} total · {day.web} web · {day.whatsapp} WA · {day.completed} done
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
