export function CartoonEcosystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <ellipse cx="160" cy="240" rx="100" ry="18" fill="#000" fillOpacity="0.08" />
      <rect x="90" y="130" width="140" height="90" rx="20" fill="#2563EB" />
      <rect x="105" y="145" width="110" height="55" rx="10" fill="#1E40AF" />
      <circle cx="160" cy="95" r="42" fill="#FBBF24" />
      <circle cx="148" cy="88" r="5" fill="#1F2937" />
      <circle cx="172" cy="88" r="5" fill="#1F2937" />
      <path d="M148 104 Q160 114 172 104" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="55" y="160" width="36" height="36" rx="10" fill="#34D399" transform="rotate(-12 73 178)" />
      <rect x="229" y="155" width="36" height="36" rx="10" fill="#A78BFA" transform="rotate(12 247 173)" />
      <circle cx="70" cy="130" r="14" fill="#60A5FA" />
      <circle cx="250" cy="125" r="14" fill="#F472B6" />
    </svg>
  );
}

export function CartoonRobot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <ellipse cx="140" cy="268" rx="80" ry="14" fill="#000" fillOpacity="0.08" />
      <rect x="85" y="60" width="110" height="90" rx="24" fill="#6366F1" />
      <rect x="100" y="78" width="80" height="50" rx="12" fill="#312E81" />
      <circle cx="120" cy="100" r="8" fill="#22D3EE" />
      <circle cx="160" cy="100" r="8" fill="#22D3EE" />
      <rect x="125" y="118" width="30" height="4" rx="2" fill="#22D3EE" />
      <rect x="110" y="150" width="60" height="70" rx="16" fill="#4F46E5" />
      <rect x="70" y="165" width="28" height="50" rx="12" fill="#818CF8" />
      <rect x="182" y="165" width="28" height="50" rx="12" fill="#818CF8" />
      <rect x="115" y="220" width="22" height="40" rx="10" fill="#4338CA" />
      <rect x="143" y="220" width="22" height="40" rx="10" fill="#4338CA" />
      <rect x="118" y="38" width="44" height="16" rx="8" fill="#A5B4FC" />
      <circle cx="140" cy="30" r="8" fill="#FBBF24" />
    </svg>
  );
}
