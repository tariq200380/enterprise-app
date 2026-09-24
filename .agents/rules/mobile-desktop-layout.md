# Mobile "Desktop Site" (980px Viewport) Layout Standard

## Context & Requirement
Mobile devices (Android Chrome, iOS Safari) feature a "Desktop site" toggle that assigns a virtual viewport width of ~980px.
In Tailwind CSS:
- `md` breakpoint is `768px`
- `lg` breakpoint is `1024px`

Because `980px < 1024px`:
If two-column or multi-column grids and side-by-side flex layouts are gated behind `lg:` (e.g. `lg:grid-cols-2`, `lg:flex-row`), mobile devices in "Desktop site" mode fall back to single-column stacked mobile layouts, while the desktop navbar renders in full desktop mode. This creates an unappealing, broken mobile-desktop experience.

## Mandatory Rule
1. **Never gate core two-column or multi-column page layouts strictly behind `lg:`.**
2. Always activate desktop multi-column layouts at the `md:` breakpoint (`md:grid-cols-*`, `md:flex-row`, `md:col-span-*`) so that the 980px viewport renders the balanced desktop view.
3. This applies to:
   - Header, TopBanner, and Navigation
   - Homepage sections (Hero, Value propositions, Delivery steps, Focus matrix, Pillars, Security, Knowledge preview, Discussion/CTA)
   - Knowledge Center (Hero, Latest news, Tech wires, Regional ecosystem, Overview grid, Article reader)
   - Portfolio (Hero, Standards & Invariants, Case studies zigzag grid)
   - About page (Hero console, Manifesto, Philosophy, Services, Global centers, Leadership, Metrics)
   - Contact page (Hero stats, Scoping form & Direct channels two-column grid, Onboarding steps, FAQ)
4. Do NOT revert or overwrite these `md:` layout breakpoints back to `lg:`.
