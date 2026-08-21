<design_guidelines>
# Design Overview

This repository hosts both the MindQuantum website (Astro) and the documentation portal (Jupyter Book) to ensure a cohesive, maintainable user experience.

## Goals

- Single deployment to GitHub Pages for site + docs
- Consistent branding via shared design tokens
- Clear separation of concerns for easier maintenance
- Ability to source tutorials from MindSpore docs without a hard dependency

## Architecture

- Astro site at repo root. Static output in `dist/`.
- Two Jupyter Book projects in `docs/en` and `docs/zh`. Build outputs are centralized under `docs/_build/books/{lang}` and copied to `public/docs/{lang}`, which Astro serves at `/docs/{lang}/`.
- API (Sphinx) builds as two projects in `docs/api-en` and `docs/api-zh`. Outputs are centralized under `docs/_build/api/{lang}` and copied to `public/docs/api/{lang}`.
- GitHub Actions builds docs (Jupyter Book + Sphinx) first, then Astro, and deploys the combined `dist/`.
- The Jupyter Book `_config.yml` files keep a `{year}` placeholder in their `copyright` field (YAML cannot compute the current year). `scripts/update-copyright.mjs` substitutes the build year for the duration of `build:docs` and restores the placeholder afterwards, so the committed configs stay self-documenting and the working tree stays clean. The Astro footer and the Sphinx API configs compute the year dynamically.
- MathJax is self-hosted: `scripts/prepare-mathjax.mjs` vendors the npm `mathjax` package (combined `tex-mml-chtml.js`, CHTML woff fonts, and the autoload TeX extensions) into the gitignored `docs/_static/mathjax/` during `build:docs`, and every Sphinx/Jupyter Book config sets `mathjax_path: mathjax/tex-mml-chtml.js`. Sphinx's default jsdelivr CDN is unreachable for part of the audience, which would leave all formulas unrendered.

## Frontend Stack

- **Astro 5** is the static site generator and the default rendering mode (`output: 'static'`). Every marketing/page route is pre-rendered at build time.
- **Tailwind CSS v3** (via `@astrojs/tailwind`, `applyBaseStyles: false`) provides the utility layer. Tailwind reads HSL design tokens from CSS variables declared in `src/styles/tokens.css` so the two token systems never drift.
- **React islands** (via `@astrojs/react`) are available but currently unused on any shipped page; the surface stays in place for future interactive widgets.
- **Web Components / vanilla JS** power the Quantum Circuit Composer (`mq-circuit-builder` custom element) and the homepage hero carousel. This keeps JS payload small on the landing page.
- **lucide-react**, **clsx**, and **tailwind-merge** are opt-in runtime dependencies consumed only where needed. Recharts remains an installed dependency for future dashboards but is no longer imported by any page.

## Site Structure & Page Inventory

The redesigned site ships the following top-level routes, each with EN and ZH variants (ZH lives under `/zh/…`):

| Route | Purpose | Implementation |
| --- | --- | --- |
| `/` · `/zh/` | Marketing home page with hero carousel, architecture diagram, features, research, learning pillars, CTA banner | `src/components/home/*` (Astro sections) |
| `/composer/` | Interactive quantum circuit builder | `src/components/pages/ComposerPage.astro` wrapping the existing `mq-circuit-builder` web component |
| `/learning/` | Learning landing page (sidebar + course cards) | `src/components/pages/LearningPage.astro` |
| `/documentation/` | Documentation landing page (sections + sidebar) | `src/components/pages/DocumentationPage.astro` |
| `/benchmark/` | Benchmark page comparing MindQuantum with other frameworks (paper-derived static figures) | `src/components/pages/BenchmarkPage.astro` + `src/components/pages/BenchmarkSection.astro` + assets in `src/assets/benchmark/` |
| `/community/` | Community hub (mirrors + contribution/competition/resources sections) | `src/components/pages/CommunityPage.astro` |
| `/docs/{lang}/` | Jupyter Book tutorials (iframe wrapper, unchanged) | `src/pages/docs/[lang]/index.astro` |
| `/api/{lang}/` | Sphinx API reference (iframe wrapper, unchanged) | `src/pages/api/[lang]/index.astro` |
| `/courses/` | Chinese course notebooks (iframe wrapper, unchanged) | `src/pages/courses/index.astro` |

All page routes share `src/layouts/BaseLayout.astro`, which renders the site-wide `Header` (`src/components/layout/Header.astro`) and `Footer` (`src/components/layout/Footer.astro`).

## i18n & Routing

- Default language is English (`en`); the root (`/`) renders English content.
- Non-default languages use a path prefix (`/zh/…`). Every primary page exists as both `src/pages/{page}/index.astro` (default lang) and `src/pages/[lang]/{page}/index.astro` (other langs via `getStaticPaths`).
- Docs and API landing routes are language-aware via lightweight redirect pages:
  - `src/pages/docs/[lang]/index.astro` resolves a language-specific start page using `src/config/i18n.ts`.
  - `src/pages/api/[lang]/index.astro` forwards to the respective API index.
- Localized copy lives in typed modules under `src/locales/`: `nav.ts`, `home.ts`, `footer.ts`, `composer.ts`, `benchmark.ts`, `learning.ts`, `documentation.ts`, `community.ts`. Each module exports a `Record<Lang, …>` keyed by language.
- Site-wide external URLs (AtomGit / GitHub / Gitee mirrors, MindSpore, evangelists) live in `src/config/site.ts` (including `CODE_MIRRORS` used by the header "Code" dropdown).
- `src/layouts/BaseLayout.astro` accepts a `lang` prop, sets the document `lang` attribute, and emits canonical + `hreflang` alternates.
- Routing helpers in `src/config/urls.ts` (`withBase`, `pathForLang`, `stripBase`, `detectLang`, `altLang`) keep the language switcher and nav links consistent across redesigned pages.

## Theming Strategy

- `src/styles/tokens.css` maintains two parallel token systems:
  - **HSL tokens** (`--primary`, `--background`, `--brand-orange`, …) consumed by Tailwind's `theme.extend.colors` in `tailwind.config.mjs`.
  - **Legacy `--mq-*` tokens** (OKLCH) consumed by the Jupyter Book theme via `scripts/prepare-tokens.mjs`, which syncs the file into `docs/_static/mq-variables.css`. Do not remove these tokens without updating `docs/_static/mq-theme.css`.
- `src/styles/global.css` imports Tailwind layers and defines shared component classes (`mq-container`, `mq-btn-*`, `mq-card`, `mq-section-title`, `mq-link-arrow`) plus gradient utilities (`bg-cta-gradient`, `bg-hero-gradient`).
- `docs/_static/mq-theme.css` applies light overrides on top of `sphinx_book_theme` to reflect the brand without forking the upstream theme.

This dual-token approach lets the homepage and Astro chrome move to a modern Tailwind/utility stack while preserving visual parity with the Jupyter Book theme and keeping the docs upgrade path simple.

## Content Sourcing

- The build does not depend on external repositories.
- Tutorials: `scripts/sync_mindquantum_from_msdocs.py` copies MindQuantum tutorial sources from a local `mindspore/docs` clone (`docs/mindquantum/docs/source_en` and `source_zh_cn`) into `docs/en/src` and `docs/zh/src`.
- API: `scripts/sync_mindquantum_api.py` copies API `.rst` sources from a local `mindquantum` clone (`docs/api_python_en` and `docs/api_python`) into the language-specific `src/` folders.
- Courses: the notebooks in `courses/` are first-party content. After adding or editing a notebook, run `python scripts/normalize_course_math.py` so `$$ … $$` display math conforms to MyST's block rules (blank lines around blocks, indentation inside list items); otherwise formulas render as literal `$` text in Jupyter Book.

## Deployment

- `public/CNAME` is committed so GitHub Pages retains the `mindquantum.org` mapping and the build pipeline can detect the active domain.
- The deploy workflow reads `public/CNAME` before building Astro: when a custom domain is present it exports `ASTRO_BASE=/` and `SITE_URL=https://mindquantum.org`; otherwise it falls back to `/${repo}/` and the default GitHub Pages URL.
- Resolved values are logged and exported through `$GITHUB_ENV`, keeping the Astro output (links, sitemap) aligned with the served origin.
- Artifacts from both builders are uploaded together for a single Pages deployment.

## Future Enhancements

- Add versioned docs (e.g., by building multiple books into `public/docs/vX/`).
- Wire real data into the Benchmark charts (the current values are representative placeholders copied from reference designs).
- Replace the QR placeholder in the footer with the production WeChat image when available.
- Consider code-splitting Recharts further (currently a single island chunk of ~400 kB min) if more dashboards ship.
</design_guidelines>
