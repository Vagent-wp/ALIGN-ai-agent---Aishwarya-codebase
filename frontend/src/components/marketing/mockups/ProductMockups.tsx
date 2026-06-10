import { BRAND } from '@/lib/brand';

export function NetworkDashboardMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect width="480" height="320" rx="16" fill="#F8FAFC" />
      <rect x="16" y="16" width="448" height="40" rx="10" fill="#E2E8F0" />
      <circle cx="36" cy="36" r="6" fill="#EF4444" />
      <circle cx="54" cy="36" r="6" fill="#F59E0B" />
      <circle cx="72" cy="36" r="6" fill="#22C55E" />
      <text x="90" y="40" fill="#64748B" fontSize="12" fontFamily="Inter, sans-serif">{BRAND.platform}</text>
      <rect x="16" y="68" width="120" height="236" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="28" y="84" width="96" height="10" rx="4" fill="#2563EB" fillOpacity="0.2" />
      <rect x="28" y="104" width="80" height="8" rx="4" fill="#CBD5E1" />
      <rect x="28" y="122" width="88" height="8" rx="4" fill="#CBD5E1" />
      <rect x="28" y="140" width="72" height="8" rx="4" fill="#CBD5E1" />
      <rect x="148" y="68" width="316" height="110" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="164" y="84" width="120" height="12" rx="4" fill="#1E293B" />
      <rect x="164" y="108" width="200" height="8" rx="4" fill="#94A3B8" />
      <rect x="164" y="130" width="140" height="32" rx="8" fill="#2563EB" />
      <rect x="148" y="190" width="150" height="114" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="162" y="206" width="80" height="10" rx="4" fill="#334155" />
      <rect x="162" y="226" width="110" height="6" rx="3" fill="#CBD5E1" />
      <rect x="162" y="240" width="100" height="6" rx="3" fill="#CBD5E1" />
      <rect x="162" y="254" width="90" height="6" rx="3" fill="#CBD5E1" />
      <rect x="314" y="190" width="150" height="114" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="328" y="206" width="80" height="10" rx="4" fill="#334155" />
      <rect x="328" y="226" width="110" height="6" rx="3" fill="#CBD5E1" />
      <rect x="328" y="240" width="100" height="6" rx="3" fill="#CBD5E1" />
      <rect x="328" y="254" width="90" height="6" rx="3" fill="#CBD5E1" />
    </svg>
  );
}

export function AishwaryaChatMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect width="400" height="300" rx="16" fill="#F1F5F9" />
      <rect x="16" y="16" width="368" height="48" rx="12" fill="#2563EB" />
      <text x="32" y="46" fill="#FFFFFF" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">{BRAND.assistant} AI</text>
      <rect x="16" y="80" width="260" height="56" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
      <text x="32" y="104" fill="#334155" fontSize="11" fontFamily="Inter, sans-serif">I need a React developer in Pune.</text>
      <rect x="124" y="152" width="260" height="80" rx="14" fill="#2563EB" fillOpacity="0.1" stroke="#2563EB" strokeOpacity="0.2" />
      <text x="140" y="176" fill="#1E40AF" fontSize="11" fontFamily="Inter, sans-serif">Found 8 developers, 3 agencies,</text>
      <text x="140" y="194" fill="#1E40AF" fontSize="11" fontFamily="Inter, sans-serif">and 2 startups matching your need.</text>
      <rect x="16" y="252" width="368" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" />
      <text x="32" y="272" fill="#94A3B8" fontSize="11" fontFamily="Inter, sans-serif">Describe what you need...</text>
    </svg>
  );
}
