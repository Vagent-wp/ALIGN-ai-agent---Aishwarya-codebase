# MakTree SFA — UI/UX Design System Audit

> **Purpose:** This document captures the complete visual language, interaction patterns, and UX architecture of the MakTree SFA frontend so another product can reproduce the same design quality without copying business functionality.
>
> **Stack reference (for context only):** Vite + React 18, Tailwind CSS 3.4, shadcn/ui (Radix primitives), Lucide icons, Framer Motion (selective), Sonner toasts, Recharts.
>
> **Scope:** UI, UX, frontend design language only. No business logic, backend, database, or API documentation.

---

## Table of Contents

1. [Phase 1 — Visual Identity Analysis](#phase-1--visual-identity-analysis)
2. [Phase 2 — Typography System](#phase-2--typography-system)
3. [Phase 3 — Spacing System](#phase-3--spacing-system)
4. [Phase 4 — Component Inventory](#phase-4--component-inventory)
5. [Phase 5 — Form Design System](#phase-5--form-design-system)
6. [Phase 6 — Responsive Design Analysis](#phase-6--responsive-design-analysis)
7. [Phase 7 — Animation System](#phase-7--animation-system)
8. [Phase 8 — UX Patterns](#phase-8--ux-patterns)
9. [Phase 9 — Design Language Summary](#phase-9--design-language-summary)
10. [Phase 10 — Migration Guide](#phase-10--how-to-recreate-this-uiux-in-another-project)

---

## Phase 1 — Visual Identity Analysis

### Design Token Architecture

Colors are defined as **HSL CSS custom properties** without the `hsl()` wrapper in `:root`, consumed as `hsl(var(--token))` in Tailwind. This enables theme switching via a `.dark` class on `<html>`.

**Base radius token:** `--radius: 0.75rem` (12px)

Derived radii:
| Token | Formula | Value |
|-------|---------|-------|
| `rounded-sm` | `--radius - 4px` | 8px |
| `rounded-md` | `--radius - 2px` | 10px |
| `rounded-lg` | `--radius` | 12px |
| `rounded-xl` | `--radius + 4px` | 16px |

The product **extends beyond shadcn defaults** with larger corner radii (`rounded-xl`, `rounded-2xl`) on cards, buttons, and panels for a softer, mobile-native feel.

---

### Light Mode — Core Palette

| Token | HSL | Approx. Hex | Usage |
|-------|-----|-------------|-------|
| `--background` | `210 17% 97%` | `#F5F7F9` | Page canvas, app shell |
| `--foreground` | `220 20% 14%` | `#1C2029` | Primary text, icons |
| `--card` | `0 0% 100%` | `#FFFFFF` | Cards, panels, elevated surfaces |
| `--card-foreground` | `220 20% 14%` | `#1C2029` | Text on cards |
| `--popover` | `0 0% 100%` | `#FFFFFF` | Dropdowns, tooltips, selects |
| `--primary` | `221 83% 53%` | `#2563EB` | CTAs, active nav, links, focus rings |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on primary buttons |
| `--secondary` | `220 14% 96%` | `#F3F4F6` | Secondary buttons, muted fills |
| `--secondary-foreground` | `220 20% 14%` | `#1C2029` | Text on secondary |
| `--muted` | `220 14% 96%` | `#F3F4F6` | Skeleton, progress track, tab list bg |
| `--muted-foreground` | `220 9% 46%` | `#6B7280` | Labels, captions, placeholders |
| `--accent` | `220 14% 96%` | `#F3F4F6` | Hover backgrounds (ghost buttons) |
| `--accent-foreground` | `221 83% 40%` | `#1D4ED8` | Accent text, sidebar active text |
| `--destructive` | `0 84% 60%` | `#EF4444` | Errors, delete, strike, alerts |
| `--destructive-foreground` | `0 0% 100%` | `#FFFFFF` | Text on destructive buttons |
| `--border` | `214 20% 90%` | `#E2E8F0` | Card borders, dividers, inputs |
| `--input` | `214 20% 90%` | `#E2E8F0` | Input borders (same as border) |
| `--ring` | `221 83% 53%` | `#2563EB` | Focus ring color |

**Theme color (PWA/meta):** `#2563eb` — matches primary.

---

### Dark Mode — Core Palette

| Token | HSL | Approx. Hex | Usage |
|-------|-----|-------------|-------|
| `--background` | `224 20% 8%` | `#101318` | Page canvas |
| `--foreground` | `210 20% 92%` | `#E8ECF0` | Primary text |
| `--card` | `224 18% 11%` | `#161A22` | Elevated surfaces |
| `--primary` | `221 70% 60%` | `#5B8DEF` | CTAs (slightly lighter for contrast) |
| `--muted-foreground` | `215 12% 55%` | `#8494A7` | Secondary text |
| `--destructive` | `0 72% 55%` | `#E05252` | Errors |
| `--border` | `220 12% 18%` | `#282D36` | Borders |

Dark mode is **user-toggleable** (light default). Legacy `system` preference is migrated to light.

---

### Sidebar Tokens

| Token (Light) | HSL | Usage |
|---------------|-----|-------|
| `--sidebar-background` | `0 0% 98%` | Admin desktop sidebar |
| `--sidebar-primary` | `221 83% 53%` | Active item accent |
| `--sidebar-accent` | `221 60% 96%` | Hover/active background tint |
| `--sidebar-accent-foreground` | `221 83% 40%` | Active link text |
| `--sidebar-border` | `220 13% 91%` | Sidebar divider |

---

### Glass / Frosted Surface Tokens

Custom utilities beyond the semantic palette:

| Token | Light | Dark |
|-------|-------|------|
| `--glass-bg` | `rgba(255,255,255,0.72)` | `rgba(18,22,30,0.75)` |
| `--glass-border` | `rgba(255,255,255,0.45)` | `rgba(255,255,255,0.08)` |
| `--glass-shadow` | `0 2px 16px rgba(0,0,0,0.04)` | `0 2px 20px rgba(0,0,0,0.25)` |

**Usage:** Sticky headers (`PageHeader`), bottom navigation, login card on tablet+, stat cards. Backdrop blur: 12–20px with saturation boost (160–180%).

---

### Semantic Status Colors (Tailwind Direct — Not CSS Variables)

These are applied via Tailwind utility classes for status communication:

| Role | Light Classes | Dark Adjustments | Usage |
|------|---------------|------------------|-------|
| **Success** | `emerald-500`, `emerald-600`, `emerald-800` | `dark:text-emerald-300/400` | Done states, approvals, positive deltas |
| **Success surface** | `bg-emerald-500/5`, `border-emerald-500/15–30` | Same opacity pattern | Success info panels |
| **Success CTA** | `bg-emerald-600 hover:bg-emerald-700 text-white` | — | Approve actions |
| **Warning** | `amber-500`, `amber-600`, `amber-700`, `amber-800` | `dark:text-amber-400` | Draft, locked, pending, holidays |
| **Warning surface** | `bg-amber-500/5–10`, `border-amber-500/20–30` | — | Alert cards, incomplete profile |
| **Error** | `destructive` token + `text-destructive` | — | Pending/overdue, strike |
| **Info** | `sky-500`, `border-sky-500/35`, `bg-sky-500/10` | — | Sunday DCR prompts |
| **Import/Special** | `violet-500/600`, `bg-violet-500/15` | `dark:text-violet-400` | Import-ready status |
| **Secondary stat** | `blue-500/600`, `bg-blue-500/10` | `dark:text-blue-400` | Alternate stat card color |

**Progress bar thresholds:**
- \>80% → `bg-emerald-500`
- 50–80% → `bg-amber-500`
- \<50% → `bg-destructive`

---

### Gradients

| Pattern | Classes | Usage |
|---------|---------|-------|
| Primary hero | `bg-gradient-to-br from-primary/10 via-primary/5 to-background` | Dashboard CTAs, profile header band |
| Primary border accent | `border border-primary/10` or `border-primary/15` | Highlight panels |
| Avatar fallback | `bg-gradient-to-br from-primary/20 to-primary/5` | Initials avatars |
| Profile cover | `bg-gradient-to-br from-primary/15 via-primary/5 to-background` | Profile summary card header |
| Chart fill | Linear gradient primary → transparent (Recharts SVG) | Area charts |
| Activity ring | Diagonal linear gradient per ring segment | Apple-style activity rings |

Gradients are **subtle and desaturated** — never full-saturation brand fills except on primary buttons.

---

### Chart Palette

| Token | Light | Usage |
|-------|-------|-------|
| `--chart-1` | `hsl(221 83% 53%)` | Primary series |
| `--chart-2` | `hsl(199 89% 48%)` | Cyan secondary |
| `--chart-3` | `hsl(150 62% 36%)` | Green |
| `--chart-4` | `hsl(37 90% 55%)` | Amber |
| `--chart-5` | `hsl(262 83% 58%)` | Purple |

---

### Color Usage Principles

1. **Primary blue** = action, navigation active state, links, focus, brand accent word ("SFA").
2. **White/card surfaces** float on a cool gray background — creates depth without heavy shadows.
3. **Semantic colors never replace primary** for main CTAs; emerald is reserved for approve/complete.
4. **Opacity-based tints** (`primary/10`, `amber-500/5`) create status panels without harsh solid blocks.
5. **Borders use reduced opacity** (`border-border/40`, `border-border/60`, `border-border/80`) for layered UI.
6. **Foreground at 5% opacity** (`hover:bg-foreground/5`) for subtle icon button hover.

---

## Phase 2 — Typography System

### Font Families

| Role | Stack | Weights Loaded | Usage |
|------|-------|----------------|-------|
| **Sans (UI)** | `Inter`, `system-ui`, `sans-serif` | 400, 500, 600, 700, 800 | Body, labels, buttons, data |
| **Brand** | `Sora`, `Inter`, `system-ui`, `sans-serif` | 400, 500, 600 | Logo wordmark only ("Maktree SFA") |

Google Fonts import: `Inter` + `Sora`.

---

### Base Settings

| Property | Value |
|----------|-------|
| Root font size | `16px` |
| Body font | `font-sans antialiased` |
| Body letter-spacing | `-0.011em` |
| Heading letter-spacing | `-0.025em` (h1–h4) |
| Brand letter-spacing | `-0.02em` to `-0.03em` |
| Font smoothing | `-webkit-font-smoothing: antialiased` |
| Inheritance | `input, textarea, select, button { font-family: inherit }` |

---

### Type Scale (As Used in Product)

| Element | Mobile | Tablet+ | Weight | Color | Notes |
|---------|--------|---------|--------|-------|-------|
| Brand login title | `text-2xl` (24px) | `text-3xl` (30px) | 600 (brand) | foreground + primary split | "Maktree" + " SFA" |
| Brand header | `text-lg` (18px) | `text-xl` (20px) | 600 (brand) | foreground + primary | Compact header |
| Page title (back mode) | `text-[15px]` | same | 700 | foreground | PageHeader h1 |
| Section title (DashboardSection) | `text-sm` (14px) | `text-base` (16px) | 600 | foreground | `tracking-tight` |
| Card title (shadcn) | `text-2xl` | same | 600 | card-foreground | Default CardTitle |
| Card title (dashboard) | `text-base` | same | 600 | foreground | ActivityStatsCard |
| Stat value (large) | `text-2xl` / `text-[22px]` | `text-3xl` / `text-4xl` | 600–800 | foreground | `tabular-nums`, `tracking-tight` |
| Body / default | `text-sm` (14px) | same | 400–500 | foreground | Most UI text |
| Login input | `text-[15px]` | same | 500 | foreground | Touch-optimized |
| Label (form default) | `text-sm` | same | 500 | foreground | shadcn Label |
| Label (login) | `text-xs` (12px) | same | 600 | foreground | Denser forms |
| Caption / meta | `text-xs` (12px) | same | 400–500 | muted-foreground | Helper text |
| Micro label | `text-[11px]` | same | 500–600 | muted-foreground | Stat labels, timestamps |
| Nano label | `text-[10px]` | `text-[9px]` on mobile | 600 | muted-foreground | Section labels, step labels |
| Section overline | `text-[11px]` | same | 600 | muted-foreground | `.section-title`: **uppercase**, `tracking-widest` |
| Field overline | `text-[10px]` | same | 500 | muted-foreground | **uppercase**, `tracking-wider` |
| Status value | `text-[10px]` | same | 700 | varies | **uppercase**, `tracking-wide` |
| 404 hero | `text-4xl` | same | 700 | foreground | Error page |

---

### Heading Hierarchy

| Level | Typical Classes | Context |
|-------|-----------------|---------|
| H1 (page) | `text-[15px] font-bold tracking-tight truncate` | Sticky header with back button |
| H2 (section) | `text-sm md:text-base font-semibold tracking-tight` | Dashboard sections |
| H3 (card) | `text-base font-semibold` or `text-lg font-semibold` | Cards, dialogs |
| H5 (alert) | `font-medium leading-none tracking-tight` | Alert titles |

No dramatic display typography — hierarchy is **size + weight + color**, not decorative fonts.

---

### Line Heights

| Context | Value |
|---------|-------|
| Tight stats | `leading-none` |
| Headings | `leading-none` or `leading-snug` |
| Body relaxed | `leading-relaxed` |
| Default | Tailwind defaults for text-sm/base |

---

### Numeric Typography

- **`tabular-nums`** on all metrics, percentages, dates in dashboards
- **`tracking-tight`** on large numbers for compact display
- **`font-extrabold` (800)** on hero stat values (StatCard)

---

## Phase 3 — Spacing System

### Base Unit

**4px** — Tailwind default spacing scale. All spacing derives from multiples of 4px.

Common values: `1` (4px), `1.5` (6px), `2` (8px), `2.5` (10px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px).

---

### Page Layout Spacing

#### Dashboard Page Shell (`dashboardPageClass`)

| Breakpoint | Horizontal Padding | Vertical Padding | Section Gap | Max Width |
|------------|-------------------|------------------|-------------|-----------|
| Mobile (default) | `px-4` (16px) | `py-5` (20px) | `space-y-5` (20px) | `max-w-lg` (512px) |
| Tablet (`md:`) | `px-8` (32px) | `py-6` (24px) | `space-y-6` (24px) | `max-w-3xl` (768px) |
| Laptop (`lg:`) | `px-10` (40px) | `py-6` | `space-y-6` | `max-w-5xl` (1024px) |
| Desktop (`xl:`) | inherits lg | inherits | inherits | `max-w-6xl` (1152px) |

#### Standard Page Wrapper (MR/Manager)

| Property | Value |
|----------|-------|
| Min height | `min-h-screen` |
| Background | `bg-background` |
| Bottom padding (mobile nav clearance) | `pb-24` (96px) or `pb-20` (80px) |

---

### Grid Systems

| Utility | Columns | Gap |
|---------|---------|-----|
| `dashboardTablet2Col` | 1 → 2 at md | 20px → 24px at lg |
| `dashboardTablet3Col` | 1 → 2 at md → 3 at lg | 16px → 20px at lg |
| Stat link cards (3-col) | 3 even on mobile (`max-md:!grid-cols-3`) | `gap-2` mobile, `gap-3–4` desktop |
| Profile stats grid | `grid-cols-2 gap-2.5` | Inline stat tiles |

---

### Container Widths

| Context | Max Width |
|---------|-----------|
| Login form | `max-w-sm` (384px) → `md:max-w-md` (448px) |
| Profile page | `max-w-md` → `md:max-w-xl` → `lg:max-w-2xl` |
| Wizard content | `max-w-lg` → `md:max-w-2xl` → `lg:max-w-3xl` |
| Bottom nav inner | `max-w-lg` → `md:max-w-2xl` → `lg:max-w-3xl` |
| shadcn container | centered, `padding: 1rem`, `2xl: 1400px` |
| Admin sidebar | fixed `lg:w-60` (240px) |
| Dialog | `max-w-lg`; confirm dialog `max-w-[340px]` |

---

### Component Internal Spacing

| Component | Padding | Internal Gap |
|-----------|---------|--------------|
| Card (default) | `p-6` header/content | `space-y-1.5` header |
| Dashboard panel | inherits + `rounded-2xl` | — |
| Glass card / StatCard | `p-4` | icon → value: `mt-2.5`, value → label: `mt-1` |
| Form item (shadcn) | — | `space-y-2` |
| Login form | — | `space-y-5` between fields |
| Profile edit form | `p-4` | `space-y-3` fields, `space-y-1` label-input |
| Collapsible section | trigger `px-4 py-3.5`, content `px-4 pb-4 pt-0 space-y-3` | — |
| Alert | `p-4` | — |
| Toast | `p-6 pr-8` | — |
| Bottom nav item | `pt-2 pb-1.5`, gap `3px` icon-label | — |
| Page header | `px-4 md:px-8 lg:px-10`, min-height `4rem + safe-area` | `gap-3` |

---

### Touch Target System

Utility class: **`.touch-target`** = `min-h-[44px] min-w-[44px]`

Applied to: login inputs, wizard footer buttons, confirm dialog actions, admin hamburger, primary mobile CTAs.

Additional patterns:
- Login button: `h-13` (52px)
- Wizard buttons: `min-h-11` (44px)
- Icon buttons: `h-10 w-10` (40px) with active scale feedback

---

### Vertical Rhythm Strategy

1. **Mobile-first tight rhythm** — smaller gaps (`gap-2`, `space-y-3`) on phone
2. **Progressive loosening** at `md:` and `lg:` — more breathing room
3. **Section → content gap** consistently `space-y-3 md:space-y-4`
4. **Fixed bottom chrome** (nav + footer) dictates `pb-24` content padding

---

## Phase 4 — Component Inventory

### Buttons

**Base (shadcn):** `inline-flex`, `rounded-md`, `text-sm`, `font-semibold`, `gap-2`, focus ring `ring-2 ring-ring ring-offset-2`, icons `size-4`.

| Variant | Appearance | Hover | Usage |
|---------|------------|-------|-------|
| `default` | `bg-primary text-primary-foreground` | `hover:bg-primary/90` | Primary actions |
| `destructive` | `bg-destructive` | `hover:bg-destructive/90` | Delete, reject |
| `outline` | `border border-input bg-background` | `hover:bg-accent` | Secondary actions, wizard Back |
| `secondary` | `bg-secondary` | `hover:bg-secondary/80` | Tertiary |
| `ghost` | transparent | `hover:bg-accent` | Icon actions, toolbar |
| `link` | `text-primary underline-offset-4` | `hover:underline` | Inline links |

| Size | Dimensions |
|------|------------|
| `default` | `h-10 px-4` |
| `sm` | `h-9 px-3 text-xs sm:text-sm` |
| `lg` | `h-11 px-8` |
| `icon` | `h-10 w-10` |

**Product overrides (common):**
- `rounded-xl` or `rounded-2xl` on mobile CTAs
- `active:scale-[0.97]` or `active:scale-95` on primary buttons
- `shadow-lg shadow-primary/20` on login submit
- `font-bold` on hero CTAs
- Emerald override: `bg-emerald-600 hover:bg-emerald-700 text-white` for approvals

| State | Behavior |
|-------|----------|
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Loading | Text swap ("Signing in...", "Sending…") — no spinner in button |
| Mobile | Full-width (`w-full`) common on forms |

---

### Cards

**shadcn base:** `rounded-lg border bg-card shadow-sm`

**Product panel (`dashboardPanelClass`):** `rounded-2xl border border-border/80 bg-card shadow-sm`

| Sub-component | Spacing |
|---------------|---------|
| CardHeader | `p-6`, `space-y-1.5` |
| CardTitle | `text-2xl font-semibold leading-none tracking-tight` |
| CardDescription | `text-sm text-muted-foreground` |
| CardContent | `p-6 pt-0` |
| CardFooter | `p-6 pt-0`, flex row |

**Glass card variant:** frosted background + `rounded-2xl` — used for StatCard, collapsible sections, profile detail lists.

---

### Inputs

**Default:** `h-10`, `rounded-md`, `border border-input`, `px-3 py-2`, `text-base md:text-sm`, placeholder `text-muted-foreground`.

**Login / mobile enhanced:**
- `h-12`, `rounded-xl`, `border-2 border-border/60`, `text-[15px] font-medium`
- Focus: `focus:border-primary` (border color shift, not just ring)

| State | Styling |
|-------|---------|
| Focus | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| Disabled | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Error | Via FormLabel → `text-destructive`; FormMessage below |

---

### Textareas

`min-h-[80px]`, same border/focus/disabled as Input. Used in profile edit, unlock requests, DCR notes.

---

### Select / Dropdown

**Select trigger:** matches Input height/styling + chevron icon.

**Select content:** popover surface, `shadow-md`, enter/exit zoom + slide animations.

**Dropdown menu:** same popover pattern, items `rounded-sm px-2 py-1.5 text-sm`, focus `bg-accent`.

**Mobile:** native `<select>` not used — Radix select with full-width triggers.

---

### Checkbox

`h-4 w-4`, `rounded-sm`, `border-primary`, checked: `bg-primary text-primary-foreground`, Check icon indicator.

---

### Radio Buttons

`h-4 w-4 rounded-full border-primary`, filled circle indicator `h-2.5 w-2.5`.

---

### Switch

`h-6 w-11`, pill shape, checked `bg-primary`, unchecked `bg-input`, thumb `h-5 w-5` with translate animation.

---

### Navigation

#### Bottom Navigation (MR / Manager / Admin mobile)

- Fixed bottom, `z-40`, **glass** background, top border
- 5 equal tabs, icon + micro label
- Active: `text-primary` + 2.5px top indicator bar (`w-5 rounded-full bg-primary`)
- Inactive: `text-muted-foreground/70`
- Icons: `h-5 w-5 md:h-6 md:w-6`, active gets `stroke-[2.5]`
- Labels: `text-[10px] md:text-[11px] font-semibold`
- Safe area: `paddingBottom: env(safe-area-inset-bottom)`

#### Page Header (MR/Manager)

- Sticky top, `z-30`, glass, `border-b border-border/40`
- Back button: `h-10 w-10 rounded-xl hover:bg-foreground/5 active:scale-95`
- Profile avatar: `h-9 w-9 rounded-full` with ring
- Safe area top inset

#### Admin Desktop Sidebar

- Fixed `lg:w-60`, `bg-card`, border-right
- Nav items: `rounded-lg px-3 py-2.5 text-sm font-medium`
- Active: `bg-primary/10 text-primary`
- Hover: `hover:bg-muted hover:text-foreground`
- Mobile: slide-in drawer `w-64`, overlay `bg-foreground/30 backdrop-blur-sm`, `animate-slide-in-left`

#### Admin Header

- `bg-card shadow-sm border-b`, search input with icon, logout button, avatar

**No traditional footer** — bottom nav serves as primary navigation on mobile.

---

### Tables

- Wrapper: horizontal scroll, `min-w-[640px]` table
- Text: `text-xs sm:text-sm`
- Header cells: `h-10 sm:h-12`, `px-2 sm:px-4`, `text-muted-foreground font-medium`
- Body cells: `p-2 sm:p-4`
- Rows: `border-b`, `hover:bg-muted/50`, selected `data-[state=selected]:bg-muted`
- Footer: `bg-muted/50`

---

### Modals / Dialogs

**Dialog overlay:** `bg-black/80 backdrop-blur-sm`, fade in/out.

**Dialog content:** centered, `max-w-lg`, `p-6`, `shadow-lg`, zoom + slide enter (200ms).

**Alert dialog:** same pattern, `z-[250]`, used for confirmations.

**Confirm dialog product pattern:** `max-w-[340px] rounded-xl`, Cancel + Confirm footer, destructive confirm option.

---

### Drawers / Sheets

**Drawer (Vaul):** bottom sheet default, `rounded-t-[10px]`, drag handle `h-2 w-[100px] rounded-full bg-muted`, overlay `bg-black/80`.

**Sheet:** side panels (right default `w-3/4 sm:max-w-sm`), slide animations 300–500ms.

Used for: doctor visit forms, strike/holiday actions, admin mobile nav alternative.

---

### Badges / Tags

`rounded-full`, `px-2.5 py-0.5`, `text-xs font-semibold`.

| Variant | Style |
|---------|-------|
| default | `bg-primary text-primary-foreground` |
| secondary | `bg-secondary` |
| destructive | `bg-destructive` |
| outline | border only |

**Status badges (custom):**
- Approved: `bg-emerald-600/10 text-emerald-800 border-emerald-600/30`
- Pending: `bg-amber-500/10 text-amber-900 border-amber-500/30`
- Role pill: `rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary`

---

### Avatars

| Size | Usage |
|------|-------|
| `h-8 w-8` | Admin header |
| `h-9 w-9` | Page header |
| `h-10 w-10` | shadcn default |
| `h-20 w-20` | Profile card (with `border-4 border-card`) |
| `h-24 w-24` | Welcome splash |

Fallback: gradient or `bg-primary/10` + bold initials in `text-primary`. Photo: `object-cover rounded-full ring-2 ring-foreground/[0.06]` or `ring-primary/15`.

---

### Tooltips

`rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md`, fade + zoom animation, `sideOffset: 4`.

Provider default delay: `0` in sidebar context.

---

### Alerts

`rounded-lg border p-4`, icon positioned absolute left.

| Variant | Style |
|---------|-------|
| default | `bg-background` |
| destructive | `border-destructive/50 text-destructive` |

---

### Toasts (Sonner — primary toast system)

Position: Sonner default with theme sync.

Styling:
- Toast: `bg-background text-foreground border-border shadow-lg`
- Description: `text-muted-foreground`
- Action: `bg-primary text-primary-foreground`
- Success/error via Sonner API (`toast.success`, `toast.error`)

Legacy Radix toast also exists but Sonner is the active pattern.

---

### Loading States

| Pattern | Implementation |
|---------|----------------|
| Full-page | Centered `LoadingSpinner` in `min-h-screen` or `min-h-[200px]` container |
| Spinner | Lucide `Loader2` `h-8 w-8 animate-spin text-primary` |
| Welcome splash | Avatar + greeting + spinner, `animate-fade-in-up` |
| Button loading | Text replacement, disabled state |
| Deferred content | 250ms delay before secondary queries (perceived performance) |

---

### Skeleton Loaders

`animate-pulse rounded-md bg-muted`

**StatCardSkeleton:** glass-card layout with `h-9 w-9`, `h-7 w-16`, `h-3 w-24` skeleton blocks.

---

### Empty States

Centered column, `py-16`, `animate-fade-in-up`:
- Icon container: `h-16 w-16 rounded-2xl bg-muted` with Inbox icon `h-8 w-8 text-muted-foreground`
- Message: `text-sm text-muted-foreground max-w-[240px]`
- Optional action slot below

---

### Tabs

List: `h-10 rounded-md bg-muted p-1`. Trigger: `rounded-sm px-3 py-1.5 text-sm font-medium`, active: `bg-background shadow-sm`.

---

### Accordion

Border-bottom items, trigger `py-4 font-medium`, chevron rotates 180° on open, content animates `accordion-down/up` (200ms ease-out).

---

### Progress

Track: `h-4 rounded-full bg-secondary` (or `h-2` in profile). Indicator: `bg-primary transition-all`.

Custom progress bars: `h-full rounded-full` with semantic colors (emerald/amber/destructive).

---

### Collapsible (Dashboard)

Glass card wrapper, trigger with hover `bg-muted/30`, chevron rotation, content separated by `border-t border-border/50`.

---

### Specialized Dashboard Components

| Component | Purpose |
|-----------|---------|
| `StatCard` | Metric with icon tile, large value, micro label |
| `DashboardStatLinkCards` | Linked metric cards with footer CTA |
| `ActivityStatsCard` | Metric + change indicator + animated bar chart |
| `ProfileSummaryCard` | Cover gradient + avatar overlap + completion bar |
| `DashboardTodayCard` | Today's task status with state icons |
| `LeaderboardCard` | Podium + rankings list |
| `DashboardCollapsibleSection` | Expandable dashboard block |
| `DashboardSection` | Titled section with optional action slot |

---

## Phase 5 — Form Design System

### Form Architecture

- **react-hook-form** + **zod** validation (via `@hookform/resolvers`)
- **shadcn Form** primitives: `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`
- Many screens use **controlled local state** with manual validation + Sonner toasts (login, profile)

---

### Label Styles

| Context | Classes |
|---------|---------|
| Default (shadcn) | `text-sm font-medium leading-none` |
| Login | `text-xs font-semibold` |
| Profile edit | `text-xs` |
| Error state | Label turns `text-destructive` automatically via FormLabel |

---

### Input Styling Tiers

| Tier | When | Key Classes |
|------|------|-------------|
| Standard | Desktop admin, default shadcn | `h-10 rounded-md border border-input` |
| Touch | Login, mobile wizards | `h-12 rounded-xl border-2 border-border/60 touch-target text-[15px]` |
| Inline | Search bars | `h-9 rounded-lg pl-9` with icon |

---

### Validation & Error States

| Element | Error styling |
|---------|---------------|
| Label | `text-destructive` |
| Message | `text-sm font-medium text-destructive` below field |
| Input | No red border by default — message carries error (can extend with `aria-invalid`) |
| FormControl | Sets `aria-invalid={!!error}` |
| Toast | `toast.error('...')` for form-level / submit errors |
| Alert panels | `border-destructive/30 bg-destructive/5` for blocking states |

**No inline success checkmarks on fields** — success communicated via toast after submit.

---

### Focus States

Universal pattern:
```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

Login adds: `focus:border-primary` (2px border color change).

---

### Helper Text

`text-sm text-muted-foreground` via FormDescription.

Micro hints: `text-[11px] text-muted-foreground text-center`.

---

### Form Spacing

| Pattern | Spacing |
|---------|---------|
| FormItem | `space-y-2` (label → input → message) |
| Login form | `space-y-5` between groups |
| Profile edit | `space-y-3` between fields, `space-y-1` within field |
| Drawer forms | `space-y-4` |
| Inline label+input | `space-y-1` or `space-y-1.5` |

---

### Multi-Step Form Pattern (Wizard)

**Example:** New Daily Report wizard.

**Layout:**
- Full viewport height: `h-[100dvh] overflow-hidden flex flex-col`
- Sticky PageHeader at top
- Step indicator below header
- Scrollable content area: `flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y`
- Fixed/docked footer with Back + Next

**Step indicator:**
- Horizontal bars: `h-[5px] rounded-full` per step
- Active/completed: `bg-primary`; future: `bg-muted`
- Labels: `text-[10px] font-semibold tracking-wide`
- Active label: `text-primary`; completed: `text-primary/60`; future: `text-muted-foreground/50`

**Footer (`ReportStepFooter`):**
- Fixed above bottom nav: `bottom: calc(4.25rem + safe-area-inset-bottom)`
- Background: `bg-background/95 backdrop-blur-md`
- Border top + upward shadow: `shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.12)]`
- Buttons: equal width flex, `min-h-11 rounded-lg touch-target`
- Back: `variant="outline"`; Next: primary with `border border-primary/60 shadow-sm`

**Docked variant:** sticky bottom within wizard shell (no fixed positioning).

**Content padding when footer present:** `pb-28 md:pb-32`

---

### Selectable Lists / Toggle Chips

Pattern for date multi-select, report type:
- Rounded chips: `rounded-lg border px-3 py-2`
- Selected: `bg-primary/10 border-primary text-primary`
- Submitted/disabled: `bg-emerald-600/15 text-emerald-800`

---

### Password Field Pattern

Relative wrapper, toggle button `absolute inset-y-0 right-0 w-12`, Eye/EyeOff icons, `pr-12` on input.

---

## Phase 6 — Responsive Design Analysis

### Breakpoints (Tailwind Defaults)

| Name | Min Width | Role in Product |
|------|-----------|-----------------|
| default | 0 | Mobile phones (primary design target) |
| `sm` | 640px | Minor text/layout tweaks |
| `md` | 768px | **Primary tablet breakpoint** — wider canvas, 2-col grids |
| `lg` | 1024px | Laptop — admin sidebar visible, 3-col grids, full dashboard width |
| `xl` | 1280px | Wider dashboard (`max-w-6xl`) |
| `2xl` | 1400px | Container max (shadcn config) |

**Mobile detection hook:** `useIsMobile()` → `< 768px` (matches `md` breakpoint).

---

### Layout Behavior by Viewport

#### Mobile (< 768px)

- Single column layouts
- Bottom navigation always visible (MR/Manager/Admin)
- Page header with compact brand or back + title
- Content `px-4`, bottom padding `pb-24` for nav clearance
- Stat cards forced into 3-column micro grid
- Wizard footer fixed above bottom nav
- Drawers preferred over dialogs for forms
- Typography shrinks (`text-[9px]`, `text-[10px]` labels)
- Touch targets enforced (44px minimum)

#### Tablet (768px – 1023px)

- Dashboard expands to `max-w-3xl`, padding `px-8`
- 2-column grid sections activate
- Login form gets glass card wrapper `md:glass-card md:p-8`
- Bottom nav icons/labels slightly larger
- Wizard max-width `md:max-w-2xl`

#### Laptop/Desktop (≥ 1024px)

- Admin: fixed left sidebar replaces hamburger, bottom nav hidden
- Dashboard `max-w-5xl`, 3-column grids
- Content padding `px-10`
- Manager/MR still use bottom nav pattern on smaller laptops if < lg (role-dependent layouts)

---

### Responsive Navigation Strategy

| Role | Mobile | Desktop (lg+) |
|------|--------|---------------|
| MR / Manager | Bottom nav (5 tabs) + top header | Same bottom nav (no sidebar) — **mobile-first app on all sizes** |
| Admin | Bottom nav + hamburger drawer | Fixed sidebar + top search bar |

---

### Responsive Containers Summary

```
Mobile:   px-4, max-w-lg, 1 col
Tablet:   px-8, max-w-3xl, 2 col
Laptop:   px-10, max-w-5xl, 2-3 col
Desktop:  max-w-6xl
```

---

### Touch Interactions

| Pattern | Class/Behavior |
|---------|----------------|
| Touch target minimum | `.touch-target` (44×44px) |
| Touch manipulation | `touch-manipulation` on back/profile buttons |
| Active press feedback | `active:scale-90` or `active:scale-95` |
| Scroll | `overflow-y-auto overscroll-contain touch-pan-y`, `-webkit-overflow-scrolling: touch` |
| Safe areas | `env(safe-area-inset-top/bottom)` on header, nav, wizard footer |
| Viewport | `viewport-fit=cover`, `maximum-scale=5.0, user-scalable=yes` |

---

### Mobile-First Strategy

1. All layouts designed for phone first (field sales use case)
2. Enhancement layers added at `md:` and `lg:` — never desktop-first degradation
3. `max-md:` overrides used to **compress** UI further on small screens (smaller text, tighter gaps, reorder with `max-md:order-[n]`)
4. PWA-ready: install prompt, standalone detection, theme-color meta

---

## Phase 7 — Animation System

### CSS Keyframe Animations (tailwind.config.ts)

| Name | Duration | Easing | Motion |
|------|----------|--------|--------|
| `fade-in-up` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | opacity 0→1, translateY 16px→0 |
| `fade-in` | 300ms | same bezier | opacity 0→1, translateY 8px→0 |
| `slide-up` | 300ms | same bezier | translateY 100%→0 |
| `slide-in-left` | 300ms | same bezier | translateX -100%→0 |
| `accordion-down/up` | 200ms | `ease-out` | height 0 ↔ content height |

**Easing signature:** `cubic-bezier(0.16, 1, 0.3, 1)` — smooth deceleration (similar to ease-out-expo). This is the **brand motion curve**.

---

### Tailwind Animate Plugin (tailwindcss-animate)

Used for Radix state transitions:
- `animate-in` / `animate-out`
- `fade-in-0` / `fade-out-0`
- `zoom-in-95` / `zoom-out-95`
- `slide-in-from-*` / `slide-out-to-*`

Applied to: dialogs, dropdowns, tooltips, toasts, sheets.

---

### Framer Motion (Selective)

Used in:
- `ActivityStatsCard` — staggered bar chart entrance (spring: stiffness 320, damping 26)
- `apple-activity-ring` — ring progress animations
- `BookPageFlip` — e-detailing page flip

**Not used for page transitions** — route changes are instant.

---

### Micro-Interactions

| Element | Animation |
|---------|-----------|
| Buttons (mobile) | `active:scale-[0.97]` or `active:scale-95` |
| Profile/edit chevron | `transition-transform rotate-90` when expanded |
| Collapsible chevron | `rotate-180` when open |
| Progress bars | `transition-all duration-700 ease-out` (profile completion) |
| Step indicator bars | `transition-colors duration-300` |
| Hover (desktop) | `transition-colors` on nav, buttons, table rows |
| Loading spinner | `animate-spin` on Loader2 icon |
| Skeleton | `animate-pulse` |

---

### Motion Philosophy

1. **Functional, not decorative** — motion confirms state change or draws attention to new content
2. **Fast on interaction, gentle on entrance** — 200–300ms for UI chrome, 500ms for content reveal
3. **Spring physics only for data visualization** — bar charts feel "alive"
4. **No route transition animations** — prioritizes speed for field users
5. **Reduced motion:** no explicit `prefers-reduced-motion` overrides (opportunity for migration)
6. **Backdrop blur accompanies overlays** — glass aesthetic reinforces depth

---

## Phase 8 — UX Patterns

### Application Structure

```
Login → Role-based Dashboard → Feature pages → Detail/Form flows
                ↓
         Bottom Nav (persistent on MR/Manager)
                ↓
         Profile (avatar tap, universal)
```

Three role experiences (MR, Manager, Admin) share visual language but differ in navigation density.

---

### Navigation Patterns

1. **Hub-and-spoke:** Dashboard is home; bottom nav returns to major sections
2. **Drill-down:** Back button in PageHeader (not browser back — custom `performAppBack`)
3. **Deep links via stat cards:** Dashboard metrics link to detail pages ("View more →")
4. **Wizard isolation:** Full-viewport report flow with step indicator, exits via back

---

### Information Hierarchy

**Dashboard priority order (MR example):**
1. Today's status (most urgent — DCR/expense completion)
2. Primary CTA (Start/Continue DCR) — gradient hero card
3. Alerts and warnings (amber/destructive panels)
4. Quick action grid (Tour, Expense, Strike, Holiday)
5. Targets progress
6. Secondary stats and collapsible sections

**Visual hierarchy tools:**
- Size (stat numbers largest)
- Color (primary for action, amber for attention, muted for context)
- Position (sticky header + fixed nav frame content)
- Gradient panels elevate primary CTAs above flat cards

---

### CTA Placement

| Pattern | Placement |
|---------|-----------|
| Primary action | Full-width button below relevant content block |
| Dashboard hero CTA | Inside gradient `rounded-2xl` panel, `h-12 font-bold rounded-2xl` |
| Wizard next | Fixed footer, right-weighted (flex-1 each with Back + Next) |
| Secondary action | Outline button adjacent to primary |
| Destructive | Red button, often in confirm dialog |

---

### Status Communication UX

Consistent **state icon language** across dashboard:
- Done = emerald circle + check
- Locked/Draft = amber circle + lock/dot
- Pending/Alert = red circle + X
- Import = violet circle + download

Users learn status by **color + icon + uppercase micro-label** triple encoding.

---

### Trust & Professionalism Elements

- Branded login with logo, tagline ("Caring Beyond Drugs")
- Profile completion meter — encourages data quality
- Masked sensitive data (Aadhaar: `XXXX-XXXX-1234`)
- Confirmation dialogs for destructive actions
- Toast feedback on every mutation
- Welcome splash with user's name on load
- Admin search bar — enterprise control surface

---

### Content Hierarchy within Cards

1. Icon tile (colored background circle/square, `rounded-xl`)
2. Primary metric (large, bold, tabular)
3. Label (micro, muted)
4. Optional footer link or action

---

### Empty & Error UX

- Empty: centered illustration-style icon block + helpful message
- 404: minimal centered text + primary link home
- Blocked account: destructive-bordered card with explanation
- Loading: never blank — spinner or skeleton always shown

---

### Why the UX Works

1. **Mobile-native first** — field reps use phones; every pattern optimized for one-thumb operation
2. **Persistent orientation** — bottom nav + sticky header prevent wayfinding loss
3. **Progressive disclosure** — collapsible sections and wizards chunk complex tasks
4. **Immediate feedback** — toasts, status icons, and progress bars close the action loop
5. **Visual consistency** — glass cards, rounded-2xl, and primary blue create recognizable rhythm
6. **Role-appropriate density** — admin gets sidebar + search; MR gets simplified 5-tab nav

---

## Phase 9 — Design Language Summary

### Overall Style

**Modern Mobile-First SaaS** with **Enterprise Field Operations** sensibility.

Blend of:
- **Modern SaaS** — shadcn/Radix component quality, CSS token theming
- **Enterprise** — data tables, admin sidebar, role-based access surfaces
- **Startup** — friendly gradients, glass effects, animated stats
- **NOT luxury/minimal** — information-dense dashboards with many status indicators

---

### Personality

| Trait | Expression |
|-------|------------|
| **Professional** | Inter typography, structured grids, tabular numbers |
| **Approachable** | Rounded corners (12–16px), soft gradients, friendly welcome splash |
| **Trustworthy** | Blue primary (healthcare/corporate association), confirmation patterns |
| **Efficient** | Bottom nav, fixed footers, deferred loading, compact micro-labels |
| **Caring** | Brand tagline, birthday celebrations, warm profile treatment |

---

### Visual Tone

- **Cool neutral canvas** (blue-gray background) with **vivid blue accents**
- **Soft elevation** — borders + light shadows, not heavy drop shadows (except login CTA)
- **Frosted glass** on floating chrome (header, nav) — contemporary iOS-adjacent feel
- **Semantic color coding** disciplined across statuses (emerald/amber/red/violet)

---

### Brand Feeling

**"Capable field companion"** — not a consumer social app, not a stark ERP. Feels like a well-designed internal tool that respects mobile users. The Maktree brand appears through logo, primary blue, Sora wordmark, and gradient hero panels — not through decorative illustration.

---

### Iconography

- **Lucide React** exclusively
- Stroke icons, default 4px grid (`h-4 w-4`, `h-5 w-5`)
- Active nav: heavier stroke (`stroke-[2.5]`)
- Icons always paired with text labels on mobile nav (never icon-only primary nav)

---

## Phase 10 — How to Recreate This UI/UX In Another Project

### 1. Color System Setup

```css
/* Copy exact HSL tokens from Phase 1 into :root and .dark */
:root {
  --background: 210 17% 97%;
  --foreground: 220 20% 14%;
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --accent: 220 14% 96%;
  --accent-foreground: 221 83% 40%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 20% 90%;
  --input: 214 20% 90%;
  --ring: 221 83% 53%;
  --radius: 0.75rem;
  /* + glass tokens, chart tokens, sidebar tokens */
}
```

**Also define semantic Tailwind usage conventions:**
- Success = emerald-500/600 family with `/5`, `/10`, `/15` opacity backgrounds
- Warning = amber-500/600 family
- Info = sky-500 family
- Never invent new status colors — reuse this quartet

**Theme color meta:** `#2563eb`

---

### 2. Typography System Setup

1. Import **Inter** (400–800) and **Sora** (400–600) from Google Fonts
2. Set `font-sans: Inter`, `font-brand: Sora`
3. Apply body: `antialiased`, `letter-spacing: -0.011em`
4. Use the type scale table from Phase 2 — especially micro sizes (`10px`, `11px`, `15px`)
5. Apply `tabular-nums` on all numeric displays
6. Use `.section-title` pattern: `11px semibold uppercase tracking-widest muted`

---

### 3. Spacing System Setup

1. Use Tailwind 4px grid
2. Implement three layout utility functions matching:
   - `dashboardPageClass` — responsive page shell
   - `dashboardPanelClass` — card chrome
   - `dashboardTablet2Col` / `dashboardTablet3Col` — grids
3. Standard mobile page: `min-h-screen bg-background pb-24`
4. Always account for safe-area-inset on fixed elements
5. Enforce `.touch-target` (44px) on mobile interactive elements

---

### 4. Component System Setup

**Foundation:** shadcn/ui with `baseColor: slate`, CSS variables enabled.

**Customize every component with product overrides:**

| Component | Key Override |
|-----------|--------------|
| Buttons | Add `rounded-xl/2xl`, `active:scale-*`, mobile `w-full` |
| Cards | Prefer `rounded-2xl border-border/80` over default `rounded-lg` |
| Inputs (mobile) | `h-12 rounded-xl border-2` |
| Dialogs | Keep zoom animation; use `rounded-xl` for confirm variants |
| Drawers | Bottom sheet with drag handle for mobile forms |

**Build 8 composite components:**
1. Glass card utility (`.glass`, `.glass-card`)
2. StatCard
3. PageHeader (sticky glass)
4. BottomNav (5-tab glass)
5. EmptyState
6. LoadingSpinner
7. ConfirmDialog
8. DashboardSection

---

### 5. Animation System Setup

**tailwind.config.ts keyframes:**
```js
"fade-in-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } }
// + fade-in, slide-up, slide-in-left
```

**Animation classes:**
- Content entrance: `animate-fade-in-up`
- Edit form reveal: `animate-fade-in`
- Mobile drawer: `animate-slide-in-left`

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for all custom animations.

**Micro-interactions:**
- `transition-colors` on interactive elements
- `active:scale-95` on mobile buttons
- `animate-spin` for loading
- `animate-pulse` for skeletons

**Optional:** Framer Motion for chart/stat animations only (spring: 320/26).

Install: `tailwindcss-animate` plugin.

---

### 6. Responsiveness System Setup

| Breakpoint | Layout |
|------------|--------|
| `< md` | 1 col, bottom nav, px-4, max-w-lg |
| `md–lg` | 2 col, px-8, max-w-3xl |
| `≥ lg` | 3 col optional, px-10, max-w-5xl; admin sidebar at lg |

**Mobile hook:** `< 768px` for conditional sidebar/drawer behavior.

**Fixed chrome math:**
- Bottom nav height ≈ 4.25rem + safe-area
- Content padding-bottom: 6rem (pb-24)
- Wizard footer sits above nav: `bottom: calc(4.25rem + safe-area-inset-bottom)`

---

### 7. UX Principles to Replicate

1. **Design mobile-first for field users** — thumb zones, 44px targets, bottom nav
2. **One primary CTA per screen section** — gradient panel draws the eye
3. **Triple-encode status** — color + icon + uppercase label
4. **Toast everything** — success and error feedback on all mutations
5. **Confirm destructive actions** — alert dialog with touch-target buttons
6. **Sticky header + fixed nav** — content scrolls, chrome stays
7. **Progressive disclosure** — collapsible sections, multi-step wizards with bar indicator
8. **Glass/frost on floating UI** — header and nav feel layered over content
9. **Deferred secondary content** — show shell fast, load stats after 250ms
10. **Safe area awareness** — mandatory for iOS PWA quality

---

### 8. Implementation Checklist

- [ ] CSS variables (light + dark) in global stylesheet
- [ ] Inter + Sora fonts loaded
- [ ] Tailwind config with extended keyframes and font families
- [ ] shadcn/ui initialized with slate base
- [ ] Glass utility classes
- [ ] `.touch-target` utility
- [ ] `.section-title` utility
- [ ] `cn()` helper (clsx + tailwind-merge)
- [ ] Sonner toaster with themed classNames
- [ ] ThemeProvider (light default, localStorage persistence)
- [ ] PageHeader + BottomNav composite components
- [ ] Dashboard shell utilities (page, panel, grid classes)
- [ ] EmptyState + LoadingSpinner
- [ ] ConfirmDialog wrapper
- [ ] Form pattern: react-hook-form + shadcn Form OR controlled + toast validation
- [ ] Wizard pattern: step bars + fixed footer + scrollable content
- [ ] PWA meta tags (theme-color, viewport-fit, apple-mobile-web-app)
- [ ] Safe-area-inset on all fixed positioned elements

---

### 9. File Reference Map (Source of Truth)

| Concern | Primary File(s) |
|---------|-----------------|
| Color tokens | `src/index.css` |
| Tailwind theme | `tailwind.config.ts` |
| shadcn config | `components.json` |
| Dashboard layout | `src/components/dashboard/dashboard-shell.tsx` |
| Glass effects | `src/index.css` (utilities layer) |
| Buttons/Inputs/Cards | `src/components/ui/*.tsx` |
| Mobile nav | `src/components/shared/BottomNav.tsx` |
| Page header | `src/components/shared/PageHeader.tsx` |
| Brand | `src/components/shared/MaktreeBrand.tsx` |
| Login form UX | `src/pages/auth/Login.tsx` |
| Wizard UX | `src/pages/mr/NewReport.tsx`, `src/components/mr/ReportStepFooter.tsx` |
| Status patterns | `src/components/shared/DashboardTodayCard.tsx` |
| Stat cards | `src/components/shared/StatCard.tsx` |
| Toasts | `src/components/ui/sonner.tsx` |
| Theme toggle | `src/hooks/useTheme.tsx` |
| Mobile detection | `src/hooks/use-mobile.tsx` |

---

*Document generated from full frontend audit of MakTree SFA (maktree-field-hub). No code was modified during this analysis.*
