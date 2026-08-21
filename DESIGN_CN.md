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
- Jupyter Book 的 `_config.yml` 在 `copyright` 中使用 `{year}` 占位符（YAML 无法计算当前年份）。`scripts/update-copyright.mjs` 在 `build:docs` 期间将其替换为构建年份，构建结束后还原占位符，使提交的配置文件自解释且工作区保持干净。Astro 页脚和 Sphinx API 配置则动态计算年份。

## 前端技术栈

- **Astro 5** 作为静态站点生成器，默认渲染模式为 `output: 'static'`，所有营销/内容页面均在构建时预渲染。
- **Tailwind CSS v3**（通过 `@astrojs/tailwind`，`applyBaseStyles: false`）提供工具类层。Tailwind 通过 `src/styles/tokens.css` 中声明的 CSS 变量读取 HSL 设计令牌，确保两套令牌系统不会漂移。
- **React 岛屿**（通过 `@astrojs/react`）当前在已上线页面中未被使用，能力保留以便未来引入交互式组件。
- **Web Components / 原生 JS** 为 Composer 量子电路编辑器（`mq-circuit-builder` 自定义元素）以及首页 Hero 轮播提供能力，保持首页 JS 体积精简。
- **lucide-react**、**clsx** 与 **tailwind-merge** 作为可选运行时依赖仅在必要之处引入；Recharts 仍作为依赖保留以供后续仪表盘使用，但目前已无页面引用。

## 站点结构与页面清单

重新设计后的站点包含以下顶层路由，每个页面都同时提供英文和中文版本（中文位于 `/zh/…` 前缀下）：

| 路由 | 用途 | 实现位置 |
| --- | --- | --- |
| `/` · `/zh/` | 首页：Hero 轮播、架构图、核心特性、研究高校、学习入口、CTA 栏 | `src/components/home/*`（Astro 组件集合） |
| `/composer/` | 交互式量子电路编辑器 | `src/components/pages/ComposerPage.astro`，内部复用 `mq-circuit-builder` 自定义元素 |
| `/learning/` | 学习落地页（侧边栏 + 课程卡片） | `src/components/pages/LearningPage.astro` |
| `/documentation/` | 文档落地页（分区卡片 + 侧边栏） | `src/components/pages/DocumentationPage.astro` |
| `/benchmark/` | 与其他框架性能对比的基准测试页面（来自技术报告的静态图表） | `src/components/pages/BenchmarkPage.astro` + `src/components/pages/BenchmarkSection.astro` + `src/assets/benchmark/` 下的图像资源 |
| `/community/` | 社区中心（代码镜像 + 贡献/竞赛/资源分区） | `src/components/pages/CommunityPage.astro` |
| `/docs/{lang}/` | Jupyter Book 教程（iframe 嵌入，保持不变） | `src/pages/docs/[lang]/index.astro` |
| `/api/{lang}/` | Sphinx API 参考（iframe 嵌入，保持不变） | `src/pages/api/[lang]/index.astro` |
| `/courses/` | 中文课程 Notebook（iframe 嵌入，保持不变） | `src/pages/courses/index.astro` |

所有页面共享 `src/layouts/BaseLayout.astro`，该布局渲染全局 `Header`（`src/components/layout/Header.astro`）与 `Footer`（`src/components/layout/Footer.astro`）。

## 国际化 (i18n) 与路由

- 默认语言为英语 (`en`)；根路径 (`/`) 渲染英文内容。
- 非默认语言使用路径前缀（`/zh/…`）。所有主要页面均同时提供默认语言版本（`src/pages/{page}/index.astro`）与非默认语言版本（`src/pages/[lang]/{page}/index.astro`，通过 `getStaticPaths` 生成）。
- 文档和 API 登录路由通过轻量级重定向页面实现语言感知：
  - `src/pages/docs/[lang]/index.astro` 使用 `src/config/i18n.ts` 解析特定语言的起始页面。
  - `src/pages/api/[lang]/index.astro` 转发到相应的 API 索引。
- 多语言文案集中在 `src/locales/` 下的类型化模块：`nav.ts`、`home.ts`、`footer.ts`、`composer.ts`、`benchmark.ts`、`learning.ts`、`documentation.ts`、`community.ts`。每个模块都导出 `Record<Lang, …>`，按语言键控。
- 站点级外链（AtomGit / GitHub / Gitee 镜像、MindSpore、布道师）集中维护在 `src/config/site.ts`（包括 Header 中 "Code" 下拉所使用的 `CODE_MIRRORS`）。
- `src/layouts/BaseLayout.astro` 接受 `lang` 属性、正确设置文档 `lang` 属性，并输出 canonical 与 `hreflang` 备选链接。
- 路由辅助函数位于 `src/config/urls.ts`（`withBase`、`pathForLang`、`stripBase`、`detectLang`、`altLang`），确保语言切换器与导航链接在新页面间行为一致。

## 主题策略

- `src/styles/tokens.css` 维护两套并行的令牌体系：
  - **HSL 令牌**（`--primary`、`--background`、`--brand-orange` 等）由 Tailwind 通过 `tailwind.config.mjs` 的 `theme.extend.colors` 使用。
  - **兼容的 `--mq-*` 令牌**（OKLCH）由 Jupyter Book 主题消费。`scripts/prepare-tokens.mjs` 会将本文件同步到 `docs/_static/mq-variables.css`。在未同步更新 `docs/_static/mq-theme.css` 之前，请不要移除这些令牌。
- `src/styles/global.css` 导入 Tailwind 层，并定义共享的组件类（`mq-container`、`mq-btn-*`、`mq-card`、`mq-section-title`、`mq-link-arrow`）以及渐变工具类（`bg-cta-gradient`、`bg-hero-gradient`）。
- `docs/_static/mq-theme.css` 在 `sphinx_book_theme` 之上应用轻量级覆盖，以反映品牌而无需分叉上游主题。

借助这种双令牌策略，网站外壳可以迁移到现代 Tailwind/工具类栈，同时保持与 Jupyter Book 主题的视觉一致性，并让文档升级路径保持简单。

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
- 将 Benchmark 图表接入真实数据（当前使用的是参考设计中的代表性占位数据）。
- 在 WeChat 官方二维码就绪后，替换页脚中的占位二维码。
- 若后续仪表盘继续增加，可考虑进一步代码分割 Recharts（当前单个岛屿块约 400 kB 最小化体积）。
