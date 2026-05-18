#!/usr/bin/env node
/*
 * Architecture deep-link integrity check.
 *
 * The homepage architecture diagram (src/components/home/FrameworkIntro.astro)
 * deep-links into the iframed Sphinx API portal via hash routing:
 *
 *   /api/{lang}/#/{rel}
 *
 * where {rel} resolves to public/docs/api/{lang}/{rel}. Astro's static build
 * can't verify those routes — the parent /api/{lang}/ page exists, but the
 * hash-routed sub-page is only loaded at runtime when a user clicks. If a
 * MindQuantum release renames a module (e.g. algorithm.nisq → algorithm.vqa)
 * the link silently 404s inside the iframe.
 *
 * This script reads src/locales/home.ts as text, pulls out every architecture
 * href, derives the expected file under public/docs/api/, and asserts each
 * one exists. It is wired into the Astro build so a broken locale URL fails
 * the build instead of shipping.
 *
 * Behaviour:
 *   - public/docs/api/ missing → log a warning, exit 0 (typical in dev where
 *     `npm run build:docs` hasn't run; we don't want to block local builds).
 *   - any target file missing  → log every offender, exit 1.
 *   - all targets resolve      → log the count, exit 0.
 */

import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const LOCALE_PATH = resolve(REPO_ROOT, "src/locales/home.ts");
const API_ROOT = resolve(REPO_ROOT, "public/docs/api");

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/* Extract every href: "/api/{lang}/#/..." string literal in the locale file.
 * The regex is intentionally narrow: it only matches the architecture URL
 * shape (hash-routed API deep-links). Non-architecture hrefs (release links,
 * docs links, community links) are ignored. */
async function collectArchHrefs() {
  const src = await readFile(LOCALE_PATH, "utf8");
  const pattern = /href:\s*"(\/api\/(en|zh)\/#\/[^"]+)"/g;
  const seen = new Map(); // href -> { lang, rel }
  for (const match of src.matchAll(pattern)) {
    const [, full, lang] = match;
    if (seen.has(full)) continue;
    const hashIdx = full.indexOf("#/");
    const rel = full.slice(hashIdx + 2); // drop the literal "#/"
    seen.set(full, { lang, rel });
  }
  return seen;
}

async function main() {
  if (!(await exists(API_ROOT))) {
    console.warn(
      `[check-arch-links] ${API_ROOT} not found; skipping deep-link verification.`,
    );
    console.warn(
      `[check-arch-links] Run "npm run build:docs" before "npm run build:site" to enable this check.`,
    );
    process.exit(0);
  }

  const hrefs = await collectArchHrefs();
  if (hrefs.size === 0) {
    console.warn(
      "[check-arch-links] No architecture hrefs found in src/locales/home.ts.",
    );
    process.exit(0);
  }

  const broken = [];
  for (const [full, { lang, rel }] of hrefs) {
    const target = resolve(API_ROOT, lang, rel);
    if (!(await exists(target))) {
      broken.push({ full, target });
    }
  }

  if (broken.length > 0) {
    console.error(
      `[check-arch-links] ${broken.length} architecture URL(s) point at missing files:`,
    );
    for (const { full, target } of broken) {
      console.error(`  ✗ ${full}`);
      console.error(`      expected: ${target}`);
    }
    console.error(
      "[check-arch-links] Update src/locales/home.ts or rebuild the API docs.",
    );
    process.exit(1);
  }

  console.log(
    `[check-arch-links] verified ${hrefs.size} architecture deep-link(s).`,
  );
}

main().catch((err) => {
  console.error("[check-arch-links] unexpected error:", err);
  process.exit(1);
});
