# Somniation

Website for Somniation, an IT services company. Built with Angular v22.

A multi-page marketing site with light/dark theming and fully static, prerendered output.

## Pages

- **Home** — hero, services overview, stats, differentiators, process, testimonials, technology partners, CTA
- **Services** — detailed sections for all six practices (anchor-linkable, e.g. `/services#cybersecurity`)
- **About** — mission, values, leadership team, company timeline
- **Contact** — validated contact form, contact info, FAQ accordion
- **404** — not-found page

## Tech notes

- Angular v22: standalone components, signals, built-in control flow, lazy-loaded routes
- Static prerendering (`outputMode: "static"`) — deploy `dist/somniation/browser` to any static host
- Light theme by default with a dark-mode toggle; the choice persists in `localStorage` and falls back to the OS preference. An inline script in `index.html` applies the theme before first paint.
- No runtime dependencies beyond Angular; icons are an inline SVG sprite, styles are hand-rolled SCSS design tokens
- Site content (services, testimonials, team, FAQs) lives in `src/app/core/data.ts`
- The contact form has no backend yet — submissions show a local success state

## Development

```bash
npm install
npm start          # dev server on http://localhost:4200
npm test           # unit tests (vitest)
npm run build      # production build → dist/somniation/browser
```

