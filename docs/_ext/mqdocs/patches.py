from __future__ import annotations

from typing import Any, Iterable, List, Sequence, Tuple

from docutils import nodes
from docutils.statemachine import ViewList
from sphinx import addnodes
from sphinx.application import Sphinx
from sphinx.ext.autosummary import Autosummary
from sphinx.util.nodes import nested_parse_with_titles


def _should_apply(app: Sphinx, scope: str) -> bool:
    lang = (getattr(app.config, "language", "") or "").lower()
    if scope == "all":
        return True
    if scope == "en":
        return lang.startswith("en")
    return False


def apply_autosummary_adapter(
    app: Sphinx,
    *,
    display: str = "short",
    fix_currentmodule: bool = True,
    scope: str = "en",
) -> None:
    """Adapt stock Autosummary rendering without touching sources.

    - fix_currentmodule: temporarily clears the current-module context so
      fully-qualified names in items won't trigger the "include current module"
      warning.
    - display: 'short' shows only the last segment as the link text while
      keeping real_name for cross-refs; 'full' leaves Autosummary defaults.
    - scope: 'en' applies only to English builds; 'all' applies to all.
    """
    if not _should_apply(app, scope):
        return

    # Guard to avoid double patching in multi-build environments
    if getattr(app, "_mqdocs_autosummary_patched", False):
        return

    try:
        orig_get_items = Autosummary.get_items  # type: ignore[attr-defined]
    except Exception:  # pragma: no cover - environment without autosummary
        return

    def _mq_get_items(self: Autosummary, names: Sequence[str]):  # type: ignore[override]
        env = self.state.document.settings.env  # type: ignore[attr-defined]
        ref_context = getattr(env, "ref_context", None)
        temp_data = getattr(env, "temp_data", None)
        prev_ref = ref_context.get("py:module") if ref_context else None
        prev_tmp = temp_data.get("py:module") if temp_data else None
        try:
            # Clear current-module to avoid "include current module" warnings
            if fix_currentmodule:
                if ref_context is not None:
                    ref_context["py:module"] = None
                if temp_data is not None:
                    temp_data["py:module"] = None
            items = orig_get_items(self, names)
            if display == "short":
                processed: List[Tuple[str, str, str, str]] = []
                for name, sig, summary, real_name in items:
                    # Preserve real_name for xref; shorten only display name
                    target = real_name or name
                    short = target.rsplit(".", 1)[-1]
                    processed.append((short, sig, summary, real_name))
                return processed
            return items
        finally:
            # Restore context
            if ref_context is not None:
                if prev_ref is None:
                    ref_context.pop("py:module", None)
                else:
                    ref_context["py:module"] = prev_ref
            if temp_data is not None:
                if prev_tmp is None:
                    temp_data.pop("py:module", None)
                else:
                    temp_data["py:module"] = prev_tmp

    Autosummary.get_items = _mq_get_items  # type: ignore[attr-defined]

    if display == "short":
        # Override table renderer for stock autosummary to ensure the display text uses short names
        try:
            orig_get_table = Autosummary.get_table  # type: ignore[attr-defined]
        except Exception:  # pragma: no cover
            orig_get_table = None

        def _render_inline(self: Autosummary, text: str) -> List[nodes.Node]:
            if not text:
                return [nodes.paragraph("")]
            env = self.state.document.settings.env  # type: ignore[attr-defined]
            view = ViewList()
            src = env.doc2path(env.docname)
            for i, line in enumerate((text or "").splitlines()):
                view.append(line, src, i)
            container = nodes.container()
            nested_parse_with_titles(self.state, view, container)
            return container.children or [nodes.paragraph("")]

        def _mq_get_table(self: Autosummary, items: Sequence[Tuple[str, str, str, str]]):  # type: ignore[override]
            # Build a 2-column table (Name, Description) using short display names
            table = nodes.table()
            tgroup = nodes.tgroup(cols=2)
            table += tgroup
            for _ in range(2):
                tgroup += nodes.colspec(colwidth=1)
            thead = nodes.thead()
            tbody = nodes.tbody()
            tgroup += thead
            tgroup += tbody

            header_row = nodes.row()
            for label in ("API Name", "Description"):
                e = nodes.entry()
                e += nodes.paragraph(text=str(label))
                header_row += e
            thead += header_row

            for name, sig, summary, real_name in items:
                row = nodes.row()
                # Name cell with pending_xref to object
                e_name = nodes.entry()
                para = nodes.paragraph()
                xref = addnodes.pending_xref(
                    "",
                    refdomain="py",
                    reftype="obj",
                    reftarget=real_name or name,
                    modname=None,
                    classname=None,
                )
                display = name + (sig or "")
                xref += nodes.literal(text=display)
                para += xref
                e_name += para
                row += e_name

                # Summary cell (supports inline roles and math)
                e_sum = nodes.entry()
                for child in _render_inline(self, summary or ""):
                    e_sum += child
                row += e_sum

                tbody += row

            return [table]

        Autosummary.get_table = _mq_get_table  # type: ignore[attr-defined]

    app._mqdocs_autosummary_patched = True  # type: ignore[attr-defined]

