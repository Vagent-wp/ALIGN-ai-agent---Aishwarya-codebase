import { BRAND } from '@/lib/brand';

/** Dark Linear-style product UI mockup for hero & feature sections */
export function LinearHeroMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`linear-card p-3 sm:p-4 ${className}`}>
      <div className="mb-3 flex items-center gap-2 border-b border-[var(--color-graphite)] pb-3">
        <span className="h-2 w-2 rounded-full bg-[var(--color-crimson)]" />
        <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-emerald)]" />
        <span className="linear-mono ml-2 text-[var(--color-fog)]">{BRAND.platform}</span>
      </div>

      <div className="space-y-2">
        {[
          { id: 'ALN-2401', title: 'Match founders with AI agents', status: 'In Progress', dot: 'var(--color-crimson)' },
          { id: 'ALN-2398', title: 'Onboard service providers', status: 'Done', dot: 'var(--color-emerald)' },
          { id: 'ALN-2395', title: 'Semantic profile search', status: 'Backlog', dot: 'var(--color-slate)' },
        ].map((row) => (
          <div
            key={row.id}
            className="linear-card-deep flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="linear-mono text-[var(--color-fog)]">{row.id}</p>
              <p className="mt-1 text-sm font-[510] text-[var(--color-snow)]">{row.title}</p>
            </div>
            <span className="linear-status-pill shrink-0 self-start sm:self-center">
              <span className="linear-status-dot" style={{ background: row.dot }} />
              {row.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md bg-[var(--color-obsidian)] px-3 py-2 shadow-[inset_0_0_0_1px_var(--color-graphite)]">
        <p className="linear-mono text-[var(--color-slate)]">Describe who you need to find…</p>
      </div>
    </div>
  );
}
