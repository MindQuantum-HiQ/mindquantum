#!/usr/bin/env python3
"""
Normalize display math in the course notebooks (``courses/*.ipynb``) so that
Jupyter Book / MyST renders every formula correctly.

Background
----------
The notebooks were authored for the classic Jupyter renderer, whose MathJax
setup is lenient: ``$$ ... $$`` blocks render even when they sit on lines
directly adjacent to prose. MyST's ``dollarmath`` parser is stricter - display
math must form its own block. When a ``$$`` block is glued to the previous or
next text line, the delimiters leak into the page as literal ``$`` characters
and adjacent prose can even be swallowed into the formula.

What this script does
---------------------
For every markdown cell it ensures each ``$$ ... $$`` display-math block:

- is preceded and followed by a blank line, and
- when it directly follows a list-item line (``- foo`` / ``1. bar``), is
  indented to the item's content column so the formula stays inside the item.

Fenced code blocks are left untouched, and a cell with unbalanced ``$$``
delimiters is skipped with a warning rather than risk corrupting it.

The transformation is idempotent and safe to run repeatedly. Run it after
adding or editing course notebooks:

    python scripts/normalize_course_math.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COURSES = ROOT / "courses"

LIST_ITEM_RE = re.compile(r"^(\s*)([-*+]|\d+[.)])(\s+)")
FENCE_RE = re.compile(r"^\s*(```|~~~)")


def _indent_of(line: str) -> int:
    return len(line) - len(line.lstrip())


def normalize_lines(lines: list[str]) -> list[str] | None:
    """Return normalized lines, or ``None`` if ``$$`` delimiters are unbalanced."""
    out: list[str] = []
    in_fence = False
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        if FENCE_RE.match(line):
            in_fence = not in_fence
            out.append(line)
            i += 1
            continue
        stripped = line.strip()
        if in_fence or not stripped.startswith("$$"):
            out.append(line)
            i += 1
            continue

        # Collect the display-math block spanning lines[i..j].
        if len(stripped) > 2 and stripped.endswith("$$"):
            j = i  # single-line ``$$ ... $$``
        else:
            j = i + 1
            while j < n and not lines[j].strip().endswith("$$"):
                j += 1
            if j == n:
                return None  # unbalanced delimiters: leave the cell alone
        block = lines[i : j + 1]

        # A block glued to a list-item line belongs inside that item: indent it
        # to the item's content column, otherwise the blank line we add below
        # would push the formula out of the list.
        prev = lines[i - 1] if i > 0 else ""
        m = LIST_ITEM_RE.match(prev)
        if m:
            content_col = sum(len(g) for g in m.groups())
            delta = content_col - _indent_of(block[0])
            if delta > 0:
                pad = " " * delta
                block = [pad + b if b.strip() else b for b in block]

        if out and out[-1].strip():
            out.append("")
        out.extend(block)
        if j + 1 < n and lines[j + 1].strip():
            out.append("")
        i = j + 1
    return out


def normalize_notebook(path: Path) -> bool:
    nb = json.loads(path.read_text(encoding="utf-8"))
    changed = False
    for idx, cell in enumerate(nb.get("cells", [])):
        if cell.get("cell_type") != "markdown":
            continue
        text = "".join(cell.get("source", []))
        lines = text.split("\n")
        new_lines = normalize_lines(lines)
        if new_lines is None:
            print(f"WARNING: unbalanced $$ in {path.name} cell {idx}; cell skipped")
            continue
        new_text = "\n".join(new_lines)
        if new_text != text:
            cell["source"] = new_text.splitlines(keepends=True)
            changed = True
    if changed:
        # Match nbformat's on-disk conventions (indent=1, raw UTF-8, final newline).
        path.write_text(
            json.dumps(nb, indent=1, ensure_ascii=False) + "\n", encoding="utf-8"
        )
    return changed


def main() -> None:
    total = 0
    for path in sorted(COURSES.glob("*.ipynb")):
        if normalize_notebook(path):
            print(f"Normalized {path.relative_to(ROOT)}")
            total += 1
    print(f"Done. {total} notebook(s) updated.")


if __name__ == "__main__":
    main()
