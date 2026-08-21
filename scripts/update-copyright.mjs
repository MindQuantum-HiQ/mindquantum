import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// Jupyter Book configs are static YAML and cannot compute the current year.
// The committed files keep a `{year}` placeholder (the same convention as
// src/locales/footer.ts); builds substitute the real year and restore the
// placeholder afterwards so the working tree stays clean. The Astro footer
// (new Date().getFullYear()) and the Sphinx API configs (datetime.now().year)
// compute the year dynamically.

const year = String(new Date().getFullYear())
const COPYRIGHT_LINE = /^(\s*copyright:\s*["']?)(?:\{year\}|\d{4})/m

const targets = [
  'docs/en/_config.yml',
  'docs/zh/_config.yml',
  'courses/_config.yml',
]

// Substitute the build year into the Jupyter Book configs.
// Returns a restore() function that puts the original content back.
export async function patchCopyrightYears() {
  const originals = new Map()
  for (const target of targets) {
    const path = resolve(target)
    const content = await readFile(path, 'utf8')
    if (!COPYRIGHT_LINE.test(content)) {
      console.warn(`WARNING: no copyright line found in ${target}; skipping`)
      continue
    }
    originals.set(path, content)
    await writeFile(path, content.replace(COPYRIGHT_LINE, `$1${year}`))
    console.log(`${target}: copyright year → ${year}`)
  }
  return async () => {
    for (const [path, content] of originals) {
      await writeFile(path, content)
    }
  }
}
