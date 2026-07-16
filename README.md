# Roberto Capah — Portfolio

A public career portfolio focused on AI-assisted engineering work. Built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), fully
static, deployed to Vercel.

## Stack

- **Astro** content collections (fully static output)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Geist** + **Geist Mono** (self-hosted via Fontsource)
- Dark/light theme follows the OS preference — no toggle
- Zero client-side JS except the tag filter on `/projects`

## Content model — "Obsidian behind the scenes"

Case studies live as markdown in `src/content/projects/`. `src/content/` can be
opened directly as an Obsidian vault ("Open folder as vault"). Only standard
markdown is rendered to the site; set `draft: true` in a note's frontmatter to keep
it out of the build.

Case study template: **Context → Problem → Approach → What I built → Impact → What I learned**

Frontmatter schema is enforced at build time (`src/content.config.ts`) — an invalid
case study fails the build before it can deploy.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # static build to dist/ (this is the CI gate)
npm run preview   # preview the production build
npm run check     # type-check frontmatter + templates
```

## Structure

```
src/
  content/projects/   case studies (markdown + frontmatter) — also an Obsidian vault
  content.config.ts   content-collection schema (zod)
  layouts/            Base + shared page shell
  components/         Header, Footer, BaseHead, ProjectCard
  pages/              index, projects/, projects/[slug], ai, about, 404
  styles/global.css   design tokens (Tailwind v4 @theme) + prose styles
public/               favicon, OG image, static assets
```

## Deploy

Auto-deploys to Vercel on push to `main`. The `site` URL in `astro.config.mjs`
only affects sitemap/canonical URLs — update it when a custom domain is attached.
