// Vendor MathJax v3 from node_modules into docs/_static/mathjax so every
// Sphinx / Jupyter Book build (tutorial books, courses, API reference) serves
// formulas from the site origin. The Sphinx default loads MathJax from
// cdn.jsdelivr.net, which is unreachable for part of the site's audience and
// would leave every formula unrendered.
//
// The Sphinx configs point at this copy via `mathjax_path: mathjax/tex-mml-chtml.js`,
// which resolves inside each build's _static/ output.
import { cp, rm, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const SRC = resolve('node_modules/mathjax/es5')
const DST = resolve('docs/_static/mathjax')

// Only the pieces the builds need: the combined TeX->CHTML component, the
// woff fonts it loads at runtime, and the TeX extensions that the bundled
// `autoload` package fetches on demand (e.g. \boldsymbol in the tutorials).
const ITEMS = [
  'tex-mml-chtml.js',
  'output/chtml/fonts/woff-v2',
  'input/tex/extensions',
]

async function main() {
  try {
    await stat(SRC)
  } catch {
    console.error(`MathJax sources not found at ${SRC}. Run \`npm install\` first.`)
    process.exit(1)
  }
  // Start from a clean directory so stale files from other versions never linger
  await rm(DST, { recursive: true, force: true })
  for (const item of ITEMS) {
    await cp(join(SRC, item), join(DST, item), { recursive: true })
  }
  console.log(`Vendored MathJax: ${SRC} -> ${DST}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
