# Impeccable — Project Design Context

This file is the source of truth for design decisions on the MindQuantum website.
Any skill invoked under `/impeccable …` must read this before producing design work,
and every design decision on the project should be traceable back to the principles below.

## Design Context

### Users

**Primary audience: grad students and self-taught developers learning quantum computing for the first time.**

They arrive with intermediate Python / ML fluency but limited (or no) formal quantum background. Their job-to-be-done on the site is usually one of:

- **Orient**: "What is MindQuantum, and is it the framework I should invest time in?"
- **Try**: "Let me play with a circuit in the browser before I install anything."
- **Learn**: "Walk me through a tutorial I can actually run."
- **Reference**: "I'm mid-task — take me straight to the API for `UN`, `Hamiltonian`, or `Simulator`."
- **Benchmark**: "Show me that this is competitive with Qiskit / PennyLane / Cirq."

Secondary audiences still matter (university researchers, industry quantum/ML engineers, press) but they are not the center of gravity. If a design decision serves the learner at the cost of marginal polish for a researcher, the learner wins.

Reading context: desktop-first (students working through tutorials), bilingual (English + Simplified Chinese), long sessions in docs. Light rooms, not darkened dev-setups.

### Brand Personality

**Open-source powerhouse. Confident, technical, documentation-first — closer to a modern dev tool marketing site than a corporate product page or an academic portal.**

Three-word voice: **rigorous, welcoming, direct.** The framework is a serious piece of engineering from the MindSpore ecosystem, and the site should communicate competence without adornment — but never at the expense of a learner feeling invited in. Think "the docs ARE the product," but the marketing surfaces do the work of making that promise visible.

Emotional target: a new user leaves the home page thinking *"this is a real framework maintained by people who know what they're doing, and I can probably start building within an hour."*

### Aesthetic Direction

**Reference direction:** Stripe, Linear, Vercel. Refined sans-serif typography, generous whitespace, subtle depth, marketing-polished but never gaudy. Ship-grade product sites, not showcase sites.

**Anti-references (explicit bans):**

- Generic "AI startup" aesthetic: purple-to-blue gradients, glassmorphism, dark-mode-with-neon, sparkline decoration, animated gradient text.
- The current site's default look: Inter everywhere, rounded-full pills, 4-up image card grids, a saturated pure blue (`hsl(214 100% 50%)`), equal-weight accent colors (orange + green + teal + purple + yellow all at once).
- Any AI-default tell listed in the Impeccable skill: left-border stripes on callouts, gradient fills on text, big-icon-with-rounded-corners above every heading, card-in-card nesting.

**Scope:** meaningful refresh — new typography pairing, tighter palette, more distinctive home page — while preserving the existing page architecture (home, composer, learning, documentation, benchmark, community, plus iframe wrappers for Jupyter Book and Sphinx). Design-system changes flow through `src/styles/tokens.css` and `tailwind.config.mjs`; the HSL / `--mq-*` dual-token system stays (it's consumed by Jupyter Book).

**Theme:** light mode only. The site is a marketing + long-form documentation surface; committing to light removes a whole class of decisions and lets us tune one palette precisely. Background is a warm off-white (not `#fff`), neutrals are tinted toward the brand hue.

**Color strategy:** keep blue as the primary, but reinterpret it. Move off the pure-saturated Tailwind-default blue toward a less generic shade — an indigo-leaning, slightly desaturated "quantum blue" (targeting roughly `oklch(55% 0.17 252)` as the starting point for the primary, warmer on hover). Add **one** bold secondary — a warm, specific accent (amber / signal-orange territory, roughly `oklch(72% 0.17 65)`) reserved for a single purpose: "run / execute / launch" energy (the install button, the run-in-browser CTA, the primary tutorial action). Retire the ambient orange / green / teal / purple / yellow accent collection — they can survive as chart colors in `BenchmarkChart.tsx` but must not appear as UI accents on marketing pages. Everything else is tinted neutrals.

**Typography direction:** NOT Inter. The font selection must be redone following the Impeccable font procedure — brand words are "rigorous, welcoming, direct" and the candidates should be chosen with a physical-object reference (a well-printed engineering manual, a research poster, the inside cover of an O'Reilly book — not a SaaS landing page). Pair a distinctive sans (display + UI) with a quality monospace. **Banned from consideration:** Inter, Roboto, Open Sans, Arial, Geist, Fraunces, Newsreader, Lora, Crimson, Playfair, Cormorant, Syne, IBM Plex, Space Mono, Space Grotesk, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif. CJK must be first-class — the stack should fall through to PingFang SC / Source Han Sans / Noto Sans SC / Microsoft YaHei with matching optical sizes, never rely on a browser default.

**Spacing, density, depth:**

- 4pt scale with semantic tokens (`--space-sm`, `--space-md`, etc.), not pixel-named.
- Generous vertical rhythm on marketing pages; denser, information-rich layouts in docs and the composer.
- Left-aligned asymmetric hero — break from the centered-hero convention.
- Depth through tinted surfaces and hairline borders, not drop shadows. Radius holds at ~10–12px for cards, smaller (6–8px) for inputs and buttons. No `rounded-full` on everything.
- Cap prose at ~68ch. No body copy wider than that.

**Motion:** restrained, purposeful. One well-choreographed hero load, subtle entrance reveals on scroll, immediate feedback on interactive states. No parallax, no bouncy/elastic easing, no auto-playing decorative animation beyond the hero carousel (and that carousel should respect `prefers-reduced-motion`). Exponential ease-out for all transitions.

**Interactive proof:** the Composer, live `pip install` copy button, runnable Jupyter tutorials (Thebe), and Benchmark charts are the marketing. Any redesign must amplify these surfaces — they are evidence, not decoration.

### Design Principles

These five principles govern every design decision. When in doubt, rank them in this order.

1. **Teach by showing.** The primary user is learning quantum computing; clarity beats cleverness. Every page answers "what is this, what can I do with it, how do I start." Interactive proof (composer, copyable install commands, runnable notebooks, benchmark charts) always outranks decorative or abstract illustration.

2. **Technical confidence, no hype.** Write and design like the framework knows what it is. Specificity over adjectives ("99 qubits, GPU-accelerated, hybrid quantum-classical" beats "powerful, scalable, next-generation"). Zero AI-startup ornament — no gradient text, no glowing purple, no sparkline chrome, no "enterprise-grade" platitudes.

3. **Typographic system over decoration.** Hierarchy, weight, tracking, and whitespace carry the design. Icons, photos, and colored accents earn their place or get cut. Two fonts and a mono, a single primary plus one bold secondary, a 4pt spacing scale — a small system applied with precision.

4. **Bilingual parity.** English and Simplified Chinese are equal citizens. Type scales, line-heights, optical adjustments, and layout reflow must all hold up in both languages. Any heading that "only looks good in English" is broken. CJK font stack is deliberate, not a fallback afterthought.

5. **Respect the reader.** Generous whitespace, capped line length (~68ch), WCAG AA contrast minimum on every interactive state, focus styling that's visible without being ugly, `prefers-reduced-motion` honored on the hero and any scroll-driven reveal. Students spend long sessions on tutorials — the interface has to last more than 30 seconds of attention.

### Technical Constraints

Design decisions must work within the existing stack without fighting it.

- **Astro 5 static output** — every marketing route pre-renders at build time. No SSR, no runtime personalization.
- **Tailwind v3** via `@astrojs/tailwind` (`applyBaseStyles: false`). Utility-first; reusable patterns land in `@layer components` inside `src/styles/global.css` (`mq-container`, `mq-btn-*`, `mq-card`, `mq-section-title`, `mq-link-arrow`).
- **Dual design-token system in `src/styles/tokens.css`** — HSL tokens feed Tailwind; `--mq-*` OKLCH tokens feed the Jupyter Book theme via `scripts/prepare-tokens.mjs`. Both must be updated together. Do not remove a `--mq-*` token without updating `docs/_static/mq-theme.css`.
- **React islands are rare and deliberate.** Today only the Recharts benchmark charts hydrate. Keep the home page's JS payload small — prefer Web Components / vanilla JS for interactivity (the hero carousel and the `mq-circuit-builder` custom element are the precedent).
- **i18n is path-prefixed.** Default (`/`) is English; `/zh/…` mirrors every page. Copy lives in typed `src/locales/*.ts` modules. Every text string introduced in a redesign must have both language variants before it ships.
- **Docs + API are iframed.** `/docs/{lang}/` and `/api/{lang}/` embed Jupyter Book / Sphinx output from `public/docs/**`. The Astro chrome styles the frame; the iframe content is themed through `docs/_static/mq-variables.css` + `mq-theme.css`. The two surfaces must stay visually continuous.

### Out of Scope (for now)

Clarifying what we are NOT doing so future skill invocations don't drift:

- No dark mode. The CSS variables for `.dark` can stay in tokens.css (to avoid breaking anything) but are not targets for redesign.
- No versioned docs UI (`public/docs/vX/…`) — listed as a future enhancement in `DESIGN.md`.
- No real benchmark data pipeline — the chart values remain representative placeholders unless explicitly scoped.
- No WeChat QR replacement — placeholder stays until the production asset is supplied.
- No redesign of the embedded Jupyter Book / Sphinx body layouts themselves — only the shared tokens and theme overrides.
