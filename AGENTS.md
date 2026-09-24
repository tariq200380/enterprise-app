<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Layout Standards: Mobile "Desktop Site" (980px Viewport) Preservation
- Mobile browsers in "Desktop site" mode use ~980px virtual viewport width (`768px <= 980px < 1024px`).
- Never gate two-column, multi-column grids or side-by-side flex layouts behind `lg:` (1024px+).
- Always activate desktop multi-column layouts using `md:` (`768px+`) breakpoints (`md:grid-cols-*`, `md:flex-row`, `md:col-span-*`).
- Preserve these breakpoints across Home, Knowledge Center, Portfolio, About, and Contact pages so mobile desktop site mode never falls back to stacked mobile single-column layouts.
