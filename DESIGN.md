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

## i18n & Routing

- Default language is English (`en`); the root (`/`) renders English content.
- Non-default languages use a path prefix (e.g., `/zh/` for the Chinese homepage).
- Docs and API landing routes are language-aware via lightweight redirect pages:
  - `src/pages/docs/[lang]/index.astro` resolves a language-specific start page using `src/config/i18n.ts`.
  - `src/pages/api/[lang]/index.astro` forwards to the respective API index.
- Home content strings live in `src/locales/home.ts` to keep copy centralized and typed.
- `src/layouts/BaseLayout.astro` accepts a `lang` prop, setting the document `lang` attribute correctly for accessibility and SEO.
- A header link exposes the Chinese homepage at `/zh/` for discoverability.

## Theming Strategy

- **Tailwind CSS Adoption**: The Astro site now uses Tailwind CSS (v4) for rapid, consistent UI development.
- **Legacy Compatibility**: `src/styles/tokens.css` defines the core design tokens (colors, typography) as CSS variables. These are consumed by Tailwind (via `@theme`) and also copied to `docs/_static/mq-variables.css`.
- **Unified Brand**: This dual approach ensures that the Jupyter Book/Sphinx documentation (which cannot easily use Tailwind) stays visually consistent with the Tailwind-styled landing pages.
- `docs/_static/mq-theme.css` applies light overrides on top of `sphinx_book_theme` to reflect the brand without forking the upstream theme.

This approach avoids maintaining a heavy bespoke Sphinx theme while still achieving visual parity and keeping upgrade paths simple.

## Content Sourcing

- The build does not depend on external repositories.
- Tutorials: `scripts/sync_mindquantum_from_msdocs.py` copies MindQuantum tutorial sources from a local `mindspore/docs` clone (`docs/mindquantum/docs/source_en` and `source_zh_cn`) into `docs/en/src` and `docs/zh/src`.
- API: `scripts/sync_mindquantum_api.py` copies API `.rst` sources from a local `mindquantum` clone (`docs/api_python_en` and `docs/api_python`) into the language-specific `src/` folders.

## Deployment

- `public/CNAME` is committed so GitHub Pages retains the `mindquantum.org` mapping and the build pipeline can detect the active domain.
- The deploy workflow reads `public/CNAME` before building Astro: when a custom domain is present it exports `ASTRO_BASE=/` and `SITE_URL=https://mindquantum.org`; otherwise it falls back to `/${repo}/` and the default GitHub Pages URL.
- Resolved values are logged and exported through `$GITHUB_ENV`, keeping the Astro output (links, sitemap) aligned with the served origin.
- Artifacts from both builders are uploaded together for a single Pages deployment.

## Future Enhancements

- Add versioned docs (e.g., by building multiple books into `public/docs/vX/`).
- Integrate search across both Astro and Sphinx content.
