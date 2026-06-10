# Master Prompt — Ellure NexHire Full UI/UX Audit

Copy everything inside the block below and paste it into **Cursor chat** while your **Ellure NexHire** project is open as the workspace.

---

```
You are a Senior Product Designer, UX Architect, Frontend Engineer, Motion Designer, and Design Systems Documentarian.

Your job is NOT to change any code.

Your job is to produce the most complete, implementation-ready UI/UX specification of the Ellure NexHire website (https://ellurenexhire.vercel.app/) by inspecting BOTH:
1. The live deployed site behavior (describe from codebase + any preview)
2. The entire frontend codebase (components, styles, animations, assets, layouts)

This document will be used by another team to recreate the same visual quality, interaction quality, and responsive behavior on a different product (ALIGN Network). Accuracy and depth matter more than brevity.

DO NOT summarize at a high level only.
DO NOT skip "small" details — hover states, transition durations, z-index layering, and mobile differences must be documented.
DO NOT invent features that do not exist in the codebase or on the site.

If something cannot be verified from code or assets, mark it as [UNVERIFIED — needs screenshot].

---

## PHASE 1 — PROJECT & STACK DISCOVERY

Inspect and report:

1. Framework (Next.js / Vite / React version, etc.)
2. Styling system (Tailwind, CSS modules, styled-components, shadcn, etc.)
3. Animation libraries (Framer Motion, GSAP, CSS only, typed.js, react-type-animation, etc.)
4. 3D libraries if any (Three.js, Spline, R3F, Lottie, static PNG/SVG mockups labeled as 3D)
5. Icon library (Lucide, Heroicons, custom SVG)
6. Font families, weights, and where loaded
7. Color token system (CSS variables, Tailwind config, hex/hsl values)
8. Breakpoints and mobile-first strategy
9. Folder structure for pages, components, sections, hooks, assets

List the primary entry files and routing map for the landing/marketing site.

---

## PHASE 2 — GLOBAL DESIGN LANGUAGE

Document the full visual identity:

### Colors
- Primary, secondary, accent, background, foreground, muted, border, card surfaces
- Gradient usage (exact classes or CSS — direction, stops, opacity)
- Dark/light mode if present
- Semantic colors (success, warning, error)
- Glass/frosted surfaces (backdrop-blur values, opacity, border)

### Typography
- Font stacks for headings, body, brand
- Type scale (hero H1, H2, section titles, body, captions, micro labels)
- Letter-spacing, line-height, font-weight patterns
- Uppercase/tracking patterns for section overlines

### Spacing & Layout
- Page max-widths per breakpoint
- Section vertical padding rhythm
- Grid systems (columns, gaps)
- Container padding (px values mobile → desktop)

### Shape & Depth
- Border radius tokens (buttons, cards, inputs, images)
- Shadow system (sm/md/lg, colored shadows)
- Border opacity patterns (border/40, border/60, etc.)

---

## PHASE 3 — NAVBAR / HEADER (DEEP DIVE)

Document in extreme detail:

1. **Structure**
   - Logo placement and size (desktop vs mobile)
   - Nav link items and order
   - CTA buttons (primary/secondary)
   - Mobile menu trigger (hamburger) behavior

2. **Scroll behavior**
   - Sticky / fixed / transparent → solid on scroll?
   - Background change on scroll (blur, opacity, shadow, height shrink)
   - Transition duration and easing

3. **Hover & active states (every interactive element)**
   - Nav links: default, hover, active/current page
   - Buttons: hover, active, focus-visible
   - Exact CSS/Tailwind classes or CSS properties
   - Underline animations, color shifts, scale, background pills

4. **Dropdowns / mega menus** (if any)
   - Trigger, animation in/out, positioning

5. **Mobile navigation**
   - Full-screen drawer vs dropdown
   - Open/close animation (slide, fade, scale)
   - Body scroll lock?
   - Safe area handling

6. **Z-index stacking** relative to hero and modals

Provide file paths and line references for navbar implementation.

---

## PHASE 4 — HERO SECTION (DEEP DIVE)

Document:

1. Layout (single column mobile, split desktop, etc.)
2. Headline treatment — including **typewriter / animated text** if present:
   - Library used
   - Strings rotated
   - Speed, cursor style, delete animation, loop behavior
   - Mobile vs desktop text differences
3. Subheadline and supporting copy styling
4. Primary & secondary CTA buttons (size, radius, hover, shadow)
5. Trust bullets / badge row below CTAs
6. **Hero visual / mockup / 3D element:**
   - Is it true 3D (WebGL/Three/Spline) or illustrated PNG/SVG?
   - Asset file paths
   - Positioning, parallax, float animation, rotation, shadow
   - Responsive scaling and crop behavior on mobile
7. Background effects (gradients, mesh, blobs, grid, noise, radial glow)
8. Entrance animations (fade-in-up, stagger, delay per element)

---

## PHASE 5 — 3D MOCKUPS, ILLUSTRATIONS & "CARTOON" ASSETS

Search the codebase for ALL non-photo visual assets:

For EACH asset or component group, document:

| Asset/Section | Type (3D render / 2D illustration / Lottie / CSS-only) | File path | Dimensions | Animation | Placement |
|---------------|--------------------------------------------------------|-----------|------------|-----------|-----------|

Include:
- Dashboard mockup cards
- Applicant profile preview cards
- Analytics/chart mockups
- Character/mascot illustrations (if any)
- Floating UI cards in hero or feature sections
- Device frames (phone/laptop bezels)
- Hover tilt / 3D transform (transform: perspective, rotateX/Y)
- Box-shadow layering for depth

Describe how "3D" is achieved — real 3D library vs layered 2D with shadow and perspective CSS.

---

## PHASE 6 — SECTION-BY-SECTION PAGE INVENTORY

Walk the homepage top to bottom. For EVERY section provide:

### Section template (repeat for each):

**Section name:**
**Purpose:**
**Layout:** (grid/flex, columns per breakpoint)
**Background:** (solid, gradient, muted band, full-bleed image)
**Heading hierarchy:** (overline, title, subtitle classes)
**Content blocks:** (cards, lists, tabs, carousels)
**Interactive elements:** (tabs, accordions, sliders, steppers)
**Animations on scroll:** (Intersection Observer, whileInView, fade/slide)
**Mobile differences:**
**Key files:** (component paths)

Sections to cover at minimum:
- Hero
- Trust / logo marquee
- Feature highlights with mockups
- Platform tools / bento grid
- Analytics / dashboard preview
- AI search showcase
- Client workspace
- Industry tabs / verticals
- Why choose us
- Stats / metrics band
- Testimonials
- How it works (stepper)
- Pricing
- FAQ accordion
- Final CTA
- Footer

---

## PHASE 7 — CARDS & COLORED SURFACE SYSTEM

Document all card variants:

1. **Default white/card surface** — padding, radius, border, shadow
2. **Colored tint cards** — (blue/green/purple/amber backgrounds, opacity values)
3. **Glass cards** — blur, border, transparency
4. **Feature cards with icon tiles** — icon container size, background color, radius
5. **Profile/applicant preview cards** — avatar, badges, progress bars, tags
6. **Stat cards** — large numbers, tabular nums, labels
7. **Testimonial cards** — quote, avatar, role, border accent
8. **Pricing cards** — highlighted plan, badge "popular", feature list

For each card type document:
- Default, hover (if any), active/selected states
- Internal spacing
- Typography inside card

---

## PHASE 8 — MOTION & INTERACTION CATALOG

Create a complete catalog of every animation/effect:

| Effect name | Where used | Implementation | Duration | Easing | Trigger | Mobile behavior |
|-------------|------------|----------------|----------|--------|---------|-----------------|

Must include (if present):
- Typewriter / rotating headline text
- Fade-in-up on scroll
- Stagger children animations
- Logo marquee infinite scroll
- Tab switch transitions
- Accordion expand/collapse
- Stepper / "How it works" auto-play
- Button press scale (active:scale-*)
- Link underline slide
- Card hover lift (translateY, shadow increase)
- Counter / number count-up on scroll
- Floating mockup loop (translateY oscillation)
- Parallax on scroll
- Gradient animation
- Skeleton/loading states
- Page load sequence (hero first, etc.)

Also document:
- `prefers-reduced-motion` handling (if any)
- Framer Motion variants (name them and paste key values)

---

## PHASE 9 — RESPONSIVE BEHAVIOR MATRIX

Build a table:

| Section/Component | Mobile (<640) | Tablet (640–1024) | Desktop (>1024) |
|-------------------|---------------|-------------------|-----------------|

Include:
- Navigation pattern changes
- Grid column changes
- Font size changes
- Hidden/shown elements
- Mockup placement (above/below text, scaled down, cropped)
- Touch target sizes
- Horizontal scroll carousels on mobile

---

## PHASE 10 — FOOTER

Document:
- Column layout
- Link groups
- Social icons
- Newsletter if present
- Legal links
- Bottom bar (copyright)
- Hover states on links

---

## PHASE 11 — REUSABLE PATTERNS TO CLONE

Extract **copy-paste-ready pattern recipes** another developer can implement:

1. Navbar with scroll glass effect — exact class stack
2. Typewriter hero headline — code pattern summary
3. Infinite logo marquee — structure + animation CSS
4. Feature section with left copy + right mockup — layout classes
5. Colored icon tile card — markup structure
6. Stats band — grid + typography
7. Testimonial carousel/grid
8. Stepper with auto-play
9. FAQ accordion
10. Final CTA band

For each recipe include: HTML/JSX structure outline, Tailwind/CSS classes, animation config, and responsive overrides.

---

## PHASE 12 — ASSET MANIFEST

List ALL image/SVG/Lottie/3D assets used on the marketing site:

| File path | Used in | Approx size role | Format |

---

## PHASE 13 — DESIGN TOKENS EXPORT

Produce a JSON-ready token block:

```json
{
  "colors": {},
  "fonts": {},
  "radius": {},
  "shadows": {},
  "breakpoints": {},
  "animation": {}
}
```

Fill with actual values from the codebase.

---

## OUTPUT FORMAT

Deliver ONE markdown file structured as:

# Ellure NexHire — Complete UI/UX Specification

(with all phases above filled in)

End with:

## Implementation Priority for Clone Project

Rank which sections/patterns to build first for maximum visual impact:
1. ...
2. ...

## Files to Read First (in Ellure codebase)

List the 10 most important files for understanding the design system.

---

RULES:
- Cite file paths for every major claim
- Include exact Tailwind classes or CSS where possible
- Separate "visual design" from "interaction design"
- Note anything that is image-based vs code-based
- Do not modify any source files — read-only audit only
- Be exhaustive — this spec should be 3000+ words if the site is rich enough

Begin the audit now. Start by listing the tech stack and homepage section order, then proceed phase by phase without skipping.
```

---

## After you get the output

1. Save the response as:
   `frontend/design-reference/inspiration/ellure-nexhire-uiux-spec.md`
2. Add screenshots to `frontend/design-reference/inspiration/` for anything marked [UNVERIFIED].
3. Open the **ALIGN** project in Cursor and say:

> Read `frontend/design-reference/inspiration/ellure-nexhire-uiux-spec.md` and implement the same UI/UX quality on our ALIGN landing page using our brand (`design-system-audit.md` + `src/lib/brand.ts`). Frontend only — do not touch agent backend.

---

## Optional follow-up prompts (Ellure project)

**Screenshot gap fill:**
```
Compare your UI/UX spec against these screenshots in [folder path]. Fill in all [UNVERIFIED] items with exact values.
```

**Navbar only:**
```
Extract ONLY the navbar: every class, scroll listener, hover state, mobile menu animation, with code citations.
```

**Motion only:**
```
Extract ONLY the motion catalog with Framer Motion variant objects and CSS keyframes copied from the codebase.
```

**Mobile only:**
```
Document mobile-specific UI for every homepage section with breakpoint classes and layout changes.
```
