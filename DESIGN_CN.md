# 设计概览

本仓库同时托管 MindQuantum 网站 (Astro) 和文档门户 (Jupyter Book)，以确保提供一致且易于维护的用户体验。

## 目标

- 单次部署到 GitHub Pages，包含网站和文档
- 通过共享设计令牌实现品牌一致性
- 明确职责分离，便于维护
- 能够从 MindSpore 文档获取教程，而无需硬依赖

## 架构

- Astro 站点位于仓库根目录。静态输出在 `dist/` 中。
- 两个 Jupyter Book 项目分别在 `docs/en` 和 `docs/zh` 中。构建输出集中在 `docs/_build/books/{lang}` 下，并复制到 `public/docs/{lang}`，Astro 将其作为 `/docs/{lang}/` 提供服务。
- API (Sphinx) 构建作为两个项目分别在 `docs/api-en` 和 `docs/api-zh` 中。输出集中在 `docs/_build/api/{lang}` 下，并复制到 `public/docs/api/{lang}`。
- GitHub Actions 首先构建文档 (Jupyter Book + Sphinx)，然后构建 Astro，并部署合并后的 `dist/`。

## 国际化 (i18n) 与路由

- 默认语言为英语 (`en`)；根路径 (`/`) 渲染英文内容。
- 非默认语言使用路径前缀（例如，中文主页使用 `/zh/`）。
- 文档和 API 登录路由通过轻量级重定向页面实现语言感知：
  - `src/pages/docs/[lang]/index.astro` 使用 `src/config/i18n.ts` 解析特定语言的起始页面。
  - `src/pages/api/[lang]/index.astro` 转发到相应的 API 索引。
- 主页内容字符串位于 `src/locales/home.ts` 中，以保持文案集中和类型化。
- `src/layouts/BaseLayout.astro` 接受 `lang` 属性，正确设置文档的 `lang` 属性，以提高可访问性和 SEO。
- 头部链接在 `/zh/` 处显示中文主页，便于发现。

## 主题策略

- **采用 Tailwind CSS**：Astro 站点现在使用 Tailwind CSS (v4) 进行快速、一致的 UI 开发。
- **遗留兼容性**：`src/styles/tokens.css` 定义了核心设计令牌（颜色、排版）作为 CSS 变量。这些变量被 Tailwind 使用（通过 `@theme`），同时也复制到 `docs/_static/mq-variables.css`。
- **统一品牌**：这种双重方法确保 Jupyter Book/Sphinx 文档（它们难以直接使用 Tailwind）与使用 Tailwind 样式化的主页在视觉上保持一致。
- `docs/_static/mq-theme.css` 在 `sphinx_book_theme` 之上应用轻量级覆盖，以反映品牌而无需分叉上游主题。

这种方法避免了维护一个繁重的定制 Sphinx 主题，同时仍能实现视觉一致性并保持升级路径简单。

## 内容来源

- 构建不依赖于外部仓库。
- 教程：`scripts/sync_mindquantum_from_msdocs.py` 将 MindQuantum 教程源文件从本地 `mindspore/docs` 克隆（`docs/mindquantum/docs/source_en` 和 `source_zh_cn`）复制到 `docs/en/src` 和 `docs/zh/src`。
- API：`scripts/sync_mindquantum_api.py` 将 API `.rst` 源文件从本地 `mindquantum` 克隆（`docs/api_python_en` 和 `docs/api_python`）复制到特定语言的 `src/` 文件夹中。

## 部署

- 仓库中提交了 `public/CNAME`，以确保 GitHub Pages 保留 `mindquantum.org` 映射，并让构建流程能够检测当前域名。
- 部署工作流在构建 Astro 前读取 `public/CNAME`：存在自定义域名时导出 `ASTRO_BASE=/` 与 `SITE_URL=https://mindquantum.org`，否则回退到 `/${repo}/` 与默认的 GitHub Pages 地址。
- 解析后的值会记录并通过 `$GITHUB_ENV` 导出，从而让 Astro 输出（链接、站点地图）与实际来源保持一致。
- 两个构建器的工件一起上传，用于单次 Pages 部署。

## 未来增强

- 添加版本化文档（例如，通过将多个书籍构建到 `public/docs/vX/` 中）。
- 整合 Astro 和 Sphinx 内容的搜索功能。
