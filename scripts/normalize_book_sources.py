#!/usr/bin/env python3
"""
Normalize Jupyter Book sources under docs/{en,zh}/src to avoid Sphinx warnings
when using an external Table of Contents (_toc.yml).

Actions performed:
- Strip any top-level ``.. toctree::`` directive blocks from RST files.
  With an external ToC, in-page toctree directives are not expected and may
  reference pages that are intentionally excluded from the book.
- Ensure the API tile on each language's index page points to the standalone
  Sphinx build at ../api/{lang}/ instead of referencing in-book API pages.

The transformation is idempotent and safe to run repeatedly.
"""
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def strip_toctree_blocks(text: str) -> str:
    """Remove all top-level ``.. toctree::`` blocks from an RST document.

    We detect a directive start line and then skip following indented option
    lines (starting with ":") and entries until de-indentation.
    """
    lines = text.splitlines()
    out: list[str] = []
    i = 0
    n = len(lines)
    while i < n:
        ln = lines[i]
        # Detect directive start
        m = re.match(r"^(?P<indent>\s*)\.\.\s+toctree::\s*$", ln)
        if not m:
            out.append(ln)
            i += 1
            continue
        base_indent = m.group("indent")
        i += 1
        # Skip all lines that are part of this directive block
        while i < n:
            nxt = lines[i]
            if not nxt.strip():
                # blank lines inside directive are fine; still part of block
                i += 1
                continue
            # If de-indented back to base indent or less, stop skipping
            if not nxt.startswith(base_indent + " ") and not nxt.startswith(base_indent + "\t"):
                break
            i += 1
        # Do not append anything for this block (effectively removed)
    return "\n".join(out)


def fix_api_tile_href(text: str, lang: str) -> str:
    """Rewrite API tile link to match the site's top-nav behavior.

    We point the tile to the site API wrapper route ``/api/{lang}/`` so users
    see the same experience as clicking the header "API" button. We also add
    ``target="_top"`` so the click breaks out of Jupyter Book's hash router.
    """
    target = f"/api/{lang}/"

    new = text
    # Replace common upstream targets (overview pages) with the wrapper
    for pat in (
        r'href="\./overview\.html"',
        r'href="overview\.html"',
        r'href="\./overview"',
        r'href="overview"',
    ):
        new = re.sub(pat, f'href="{target}"', new)

    # Normalize any relative or absolute API paths to the wrapper
    rel_api = rf'href="(?:\./|\.\./)+api/{lang}/?"'
    root_api = rf'href="/api/{lang}/?"'
    docs_api = rf'href="/docs/api/{lang}/?"'
    new = re.sub(rel_api, f'href="{target}"', new)
    new = re.sub(root_api, f'href="{target}"', new)
    new = re.sub(docs_api, f'href="{target}"', new)

    # Collapse any deeper /api/{lang}/... paths to just /api/{lang}/
    deep_api = rf'href="/api/{lang}/[^"#]*"'
    new = re.sub(deep_api, f'href="{target}"', new)

    # Ensure target="_top" on the API tile anchor
    href_pat = re.escape(f'href="{target}"')
    anchor_pat = rf"(<a\s[^>]*{href_pat}(?![^>]*\btarget=)[^>]*)(>)"
    new = re.sub(anchor_pat, lambda m: f"{m.group(1)} target=\"_top\"{m.group(2)}", new)
    return new


def normalize_lang(lang: str) -> None:
    srcdir = ROOT / "docs" / lang / "src"
    if not srcdir.exists():
        return
    for path in sorted(srcdir.rglob("*.rst")):
        original = path.read_text(encoding="utf-8")
        transformed = strip_toctree_blocks(original)
        if path.name == "index.rst":
            transformed = fix_api_tile_href(transformed, lang)
        if transformed != original:
            path.write_text(transformed, encoding="utf-8")
            print(f"Normalized {path.relative_to(ROOT)}")


def main() -> None:
    for lang in ("en", "zh"):
        normalize_lang(lang)


if __name__ == "__main__":
    main()
