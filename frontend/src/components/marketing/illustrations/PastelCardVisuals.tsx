/** 3D-style cartoon: professional with tablet + floating tool icons */
export function CartoonAIProfessional({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <ellipse cx="180" cy="268" rx="90" ry="14" fill="#0F172A" fillOpacity="0.08" />

      {/* floating icons */}
      <g transform="translate(48, 42)">
        <circle cx="0" cy="0" r="22" fill="#DBEAFE" />
        <circle cx="0" cy="0" r="14" stroke="#2563EB" strokeWidth="3" fill="none" />
        <line x1="8" y1="8" x2="16" y2="16" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(290, 58)">
        <rect x="-20" y="-16" width="40" height="32" rx="10" fill="#EDE9FE" />
        <rect x="-12" y="-8" width="24" height="4" rx="2" fill="#7C3AED" />
        <rect x="-12" y="2" width="18" height="4" rx="2" fill="#A78BFA" />
        <rect x="-12" y="12" width="20" height="4" rx="2" fill="#C4B5FD" />
      </g>
      <g transform="translate(72, 210)">
        <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#FEE2E2" />
        <rect x="-10" y="4" width="6" height="12" rx="2" fill="#EF4444" />
        <rect x="-2" y="-2" width="6" height="18" rx="2" fill="#22C55E" />
        <rect x="6" y="2" width="6" height="14" rx="2" fill="#3B82F6" />
      </g>
      <g transform="translate(300, 190)">
        <rect x="-18" y="-14" width="36" height="28" rx="8" fill="#E0E7FF" />
        <path d="M-8 -2 Q0 -10 8 -2 L8 6 Q0 14 -8 6 Z" fill="#6366F1" />
      </g>

      {/* dashed connectors */}
      <path d="M70 64 Q110 90 130 120" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M270 76 Q230 100 210 130" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* character body */}
      <ellipse cx="180" cy="118" rx="38" ry="42" fill="#F97316" />
      <ellipse cx="180" cy="108" rx="34" ry="36" fill="#FFEDD5" />
      <path d="M148 98 C152 78 168 68 180 68 C192 68 208 78 212 98 C206 92 194 88 180 88 C166 88 154 92 148 98Z" fill="#EA580C" />
      <circle cx="168" cy="108" r="4" fill="#1E293B" />
      <circle cx="192" cy="108" r="4" fill="#1E293B" />
      <path d="M172 122 Q180 128 188 122" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M142 148 C142 132 158 124 180 124 C202 124 218 132 218 148 L218 178 C218 188 208 196 180 196 C152 196 142 188 142 178 Z" fill="#FACC15" />
      <path d="M152 196 L152 248 C152 256 160 262 168 262 L192 262 C200 262 208 256 208 248 L208 196" fill="#2563EB" />
      <rect x="164" y="206" width="32" height="6" rx="3" fill="#1D4ED8" opacity="0.5" />

      {/* arms + tablet */}
      <ellipse cx="132" cy="168" rx="14" ry="22" fill="#FFEDD5" transform="rotate(20 132 168)" />
      <ellipse cx="228" cy="168" rx="14" ry="22" fill="#FFEDD5" transform="rotate(-20 228 168)" />
      <rect x="198" y="148" width="52" height="68" rx="8" fill="#334155" />
      <rect x="204" y="154" width="40" height="52" rx="4" fill="#1E293B" />
      <rect x="210" y="162" width="28" height="4" rx="2" fill="#60A5FA" />
      <rect x="210" y="172" width="22" height="4" rx="2" fill="#475569" />
      <rect x="210" y="182" width="26" height="4" rx="2" fill="#475569" />
    </svg>
  );
}

/** 3D-style dashboard mockup for workflow card */
export function WorkflowDashboardMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="screenBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#EEF2FF" />
        </linearGradient>
      </defs>

      {/* 3D base shadow */}
      <ellipse cx="180" cy="258" rx="110" ry="12" fill="#0F172A" fillOpacity="0.1" />

      {/* tilted app window */}
      <g transform="translate(180 140) rotate(-4) translate(-180 -140)">
        <rect x="48" y="36" width="264" height="196" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <rect x="48" y="36" width="264" height="28" rx="16" fill="#F1F5F9" />
        <rect x="48" y="52" width="264" height="12" fill="#F1F5F9" />
        <circle cx="64" cy="50" r="4" fill="#EF4444" />
        <circle cx="76" cy="50" r="4" fill="#FBBF24" />
        <circle cx="88" cy="50" r="4" fill="#22C55E" />

        {/* sidebar */}
        <rect x="48" y="64" width="56" height="168" fill="#F8FAFC" />
        <rect x="58" y="78" width="36" height="6" rx="3" fill="#2563EB" fillOpacity="0.35" />
        <rect x="58" y="92" width="28" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="58" y="104" width="32" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="58" y="116" width="24" height="5" rx="2.5" fill="#CBD5E1" />

        {/* main content */}
        <text x="118" y="88" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
          Business Operations Hub
        </text>
        <rect x="118" y="98" width="120" height="6" rx="3" fill="#94A3B8" fillOpacity="0.5" />

        {/* status pills */}
        <rect x="118" y="116" width="42" height="16" rx="8" fill="#DCFCE7" />
        <rect x="124" y="122" width="30" height="4" rx="2" fill="#16A34A" />
        <rect x="166" y="116" width="42" height="16" rx="8" fill="#FEF9C3" />
        <rect x="172" y="122" width="30" height="4" rx="2" fill="#CA8A04" />
        <rect x="214" y="116" width="42" height="16" rx="8" fill="#FEE2E2" />
        <rect x="220" y="122" width="30" height="4" rx="2" fill="#DC2626" />

        {/* cards row */}
        <rect x="118" y="142" width="88" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="128" y="152" width="48" height="6" rx="3" fill="#334155" />
        <rect x="128" y="164" width="64" height="4" rx="2" fill="#CBD5E1" />
        <rect x="128" y="174" width="56" height="4" rx="2" fill="#CBD5E1" />
        <rect x="128" y="184" width="40" height="4" rx="2" fill="#CBD5E1" />

        <rect x="214" y="142" width="88" height="72" rx="10" fill="#2563EB" fillOpacity="0.12" stroke="#2563EB" strokeOpacity="0.2" />
        <rect x="224" y="152" width="48" height="6" rx="3" fill="#1D4ED8" />
        <rect x="224" y="164" width="64" height="4" rx="2" fill="#93C5FD" />
        <rect x="224" y="174" width="56" height="4" rx="2" fill="#93C5FD" />
        <rect x="224" y="184" width="40" height="4" rx="2" fill="#93C5FD" />
      </g>
    </svg>
  );
}
