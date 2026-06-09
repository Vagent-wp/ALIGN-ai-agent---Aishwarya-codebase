# ALIGN Agent Labs — Frontend Architecture

> **Scope:** Frontend, UI/UX, design system, PWA only. Backend and WhatsApp agent are isolated and untouched.

## 1. Architecture Plan

The frontend lives in `/frontend` as a **standalone Vite + React 18 + TypeScript** application. It shares the monorepo root but has **zero imports** from `/src` (agent backend).

| Layer | Technology |
|-------|------------|
| Build | Vite 5 |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 + CSS variables (HSL tokens from design-system-audit.md) |
| Routing | React Router 6 |
| Icons | Lucide React |
| Forms (framework) | react-hook-form + zod (validation scaffold) |
| Motion | CSS keyframes + optional Framer Motion later |
| PWA | Web manifest + service worker scaffold |

**Deployment model (current):** Frontend builds to `frontend/dist/`. Serve via separate static host (Vercel, Netlify, Cloudflare Pages) or add static middleware to Express in a future PR — **not modified in this phase**.

---

## 2. Component Hierarchy

```
App
├── PublicLayout
│   ├── SiteHeader (glass sticky)
│   ├── Outlet (pages)
│   └── SiteFooter
├── EarlyAccessLayout (wizard shell)
│   ├── StepIndicator
│   ├── StepContent (injected later)
│   └── WizardFooter
└── DashboardLayout (future-ready shell — placeholder only)

Shared
├── AlignBrand
├── Button, Card, Input, Label, Badge, Textarea
├── LoadingSpinner, EmptyState
├── SectionTitle, GlassCard
└── PageShell

Landing Sections
├── HeroSection
├── AboutAishwaryaSection
├── WhoIsItForSection
├── BenefitsSection
├── HowItWorksSection
├── CommunityVisionSection
└── EarlyAccessCTASection
```

---

## 3. Page Hierarchy

| Route | Page | Status |
|-------|------|--------|
| `/` | Landing | Implemented |
| `/about` | About | Implemented |
| `/privacy` | Privacy Policy | Implemented |
| `/terms` | Terms & Conditions | Implemented |
| `/contact` | Contact | Implemented |
| `/early-access` | Early Access Registration | Framework only |
| `/thank-you` | Thank You | Implemented |
| `*` | 404 | Implemented |

**Future-ready routes (shell only, not linked in nav):**

| Route | Purpose |
|-------|---------|
| `/dashboard` | User dashboard |
| `/profile` | Profile management |
| `/admin` | Admin panel |
| `/notifications` | Notifications |
| `/messages` | Messaging |
| `/opportunities` | Opportunities |
| `/search` | AI Search |

---

## 4. Routing Plan

```
/                    → LandingPage
/about               → AboutPage
/privacy             → PrivacyPage
/terms               → TermsPage
/contact             → ContactPage
/early-access        → EarlyAccessPage (multi-step)
/thank-you           → ThankYouPage
/dashboard/*         → DashboardLayout (placeholder)
*                    → NotFoundPage
```

React Router `BrowserRouter` with lazy-loaded future routes when implemented.

---

## 5. Design System Mapping (design-system-audit.md → ALIGN)

| Audit Token | ALIGN Usage |
|-------------|-------------|
| `--primary` `221 83% 53%` | CTAs, links, brand accent |
| `--background` `210 17% 97%` | Page canvas |
| `--foreground` | Body text |
| `--radius: 0.75rem` | Base radius; cards use `rounded-2xl` |
| Inter (sans) | All UI text |
| Sora (brand) | "ALIGN" wordmark only |
| `.glass` / `.glass-card` | Header, footer nav, hero panels |
| `.touch-target` | 44px min mobile targets |
| `animate-fade-in-up` | Section entrances |
| `cubic-bezier(0.16, 1, 0.3, 1)` | Brand motion curve |
| Mobile-first breakpoints | `md:768`, `lg:1024`, `xl:1280` |

**Brand overlay:**

- Company: ALIGN Agent Labs
- Full form: AI-powered Lead Intelligence & Growth Network
- Product: Aishwarya AI
- Taglines: Discover. Connect. Grow. / Where Opportunities Find People.

---

## 6. Responsive Strategy

**Mobile-first** — primary users arrive from WhatsApp and mobile communities.

| Breakpoint | Layout |
|------------|--------|
| `< md` (default) | Single column, `px-4`, hamburger nav, full-width CTAs, `pb-safe` |
| `md` | `px-8`, 2-column grids, glass card forms |
| `lg` | `px-10`, wider max-width (`max-w-5xl`), desktop nav |
| `xl` | `max-w-6xl` marketing content |

Touch: 44px minimum targets, `active:scale-95`, safe-area insets on fixed chrome.

---

## 7. PWA Strategy

| Requirement | Implementation |
|-------------|----------------|
| Installable | `manifest.json` with icons, `display: standalone` |
| Responsive | Mobile-first CSS, viewport-fit=cover |
| Offline-ready structure | Service worker caches app shell (HTML, CSS, JS) |
| Icons | `/public/icons/` — 192, 512 PNG placeholders + SVG mask |
| Mobile app feel | theme-color `#2563eb`, apple-mobile-web-app meta |
| Touch-friendly | touch-target utility, no hover-only interactions |

Full offline data sync is **not** in scope — shell caching only.

---

## 8. Folder Structure

```
frontend/
├── FRONTEND-ARCHITECTURE.md    ← this file
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── index.html
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css               ← design tokens + utilities
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validation.ts       ← zod schemas (placeholder)
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── components/
│   │   ├── ui/                 ← Button, Card, Input, Label, Badge
│   │   ├── brand/              ← AlignBrand
│   │   ├── layout/             ← SiteHeader, SiteFooter, PublicLayout
│   │   ├── sections/           ← landing page sections
│   │   ├── registration/       ← multi-step framework
│   │   └── shared/             ← LoadingSpinner, EmptyState, SectionTitle
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── EarlyAccessLayout.tsx
│   │   └── DashboardLayout.tsx ← future shell
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── EarlyAccessPage.tsx
│   │   ├── ThankYouPage.tsx
│   │   └── NotFoundPage.tsx
│   └── routes/
│       └── index.tsx
```

---

## 9. Isolation Rules

**Never modify in this phase:**

- `/src/index.js`, webhook handlers, WhatsApp, Gemini, AI logic
- `/config/`, Supabase utils, lead matching, notifications
- `/railway.json`, agent scripts

**Safe to modify:** Everything under `/frontend/`
