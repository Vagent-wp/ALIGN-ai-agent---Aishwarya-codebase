import { BRAND } from '@/lib/brand';

/** Dark Linear-style product UI mockup for hero & feature sections */
export function LinearHeroMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`linear-card p-3 sm:p-4 ${className}`}>
      <div className="mb-3 flex items-center gap-2 border-b border-[#23252a] pb-3">
        <span className="h-2 w-2 rounded-full bg-[#eb5757]" />
        <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
        <span className="h-2 w-2 rounded-full bg-[#27a644]" />
        <span className="linear-mono ml-2 text-[#8a8f98]">{BRAND.platform}</span>
      </div>

      <div className="space-y-2">
        {[
          { id: 'ALN-2401', title: 'Match founders with AI agents', status: 'In Progress', dot: '#eb5757' },
          { id: 'ALN-2398', title: 'Onboard service providers', status: 'Done', dot: '#27a644' },
          { id: 'ALN-2395', title: 'Semantic profile search', status: 'Backlog', dot: '#62666d' },
        ].map((row) => (
          <div
            key={row.id}
            className="linear-card-deep flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="linear-mono text-[#8a8f98]">{row.id}</p>
              <p className="mt-1 text-sm font-[510] text-[#f7f8f8]">{row.title}</p>
            </div>
            <span className="linear-status-pill shrink-0 self-start sm:self-center">
              <span className="linear-status-dot" style={{ background: row.dot }} />
              {row.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md bg-[#383b3f] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]">
        <p className="linear-mono text-[#62666d]">Describe who you need to find…</p>
      </div>
    </div>
  );
}
