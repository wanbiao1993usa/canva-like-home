## CanDe 页面重构实施方案（基于 Figma 设计）

> 目标：将现有 Next.js 项目重写为与 Figma 设计一致的 PC 端页面，仅使用 Tailwind 原子类（不编写自定义 CSS），实现关键 hover 与动画效果，并从 Figma 导出字体与图标。

### 1. 设计来源与尺寸
- 设计稿：
  - 桌面版（大尺寸）：`https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4116`
  - 桌面版（较小尺寸）：`https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-1685`
- 用途：两者仅尺寸不同，用于指导响应式/断点适配（PC 端 1280–1440 区间优先）。

### 2. 前置条件与权限
- 需要设计文件开启 Dev Mode，并授予本账号可访问权限（可读即可）。
- 若存在 Component/Styles/Variables，需要允许开发访问，以便拉取 Token、切图与导出资产。
- 字体文件需确认版权允许自托管分发（.ttf/.otf/.woff2）。

### 3. 技术栈与约束
- 框架：Next.js 15（App Router），React 19。
- 样式：Tailwind CSS v4，仅使用原子类与任意值（如 `bg-[#RRGGBB]`），不编写任何自定义 CSS/SCSS。
- 字体：使用 `next/font/local` 自托管加载，不通过 CSS `@font-face`。
- 图标：从 Figma 导出 SVG，使用 `<img>` 或内联 `svg`（不增加构建器/loader）。
- 动效：基于 Tailwind 的 `transition` / `transform` / `opacity` / `blur` / `backdrop` 等，不引入额外动画库。

### 3.1 范围与不变项（仅做 UI 改造）
- 仅改造 UI 展现与样式；不改动现有路由结构与跳转逻辑。
- 不新增/修改后端接口、不改变现有数据流与业务流程。
- 保留既有事件处理与方法签名（如按钮点击、表单提交）。
- 导航 `href`、按钮行为、外链目标等均沿用项目当前实现；如需变更将单独评审并另行记录。
- 为适配布局可能增添轻量包裹容器，但不改变可被业务依赖的 DOM 挂载点与元素 `id`。

### 4. 目录与基线调整
- 清理与重置（保留 Tailwind 引入）：
  - `src/app/globals.css` 仅保留 `@import "tailwindcss";`，删除其余自定义样式。
  - 新建基础文件结构：
    - `src/app/layout.tsx`：注入全局字体（`next/font/local`）、基础 `<html lang="zh-CN">`、容器布局。
    - `src/app/page.tsx`：主页（默认路由 `/`），映射主设计画板结构。
    - `src/components/*`：按模块拆分的无样式组件（仅 Tailwind 原子类）。
    - `public/assets/icons/*`：Figma 导出 SVG 图标。
    - `public/assets/images/*`：位图/插画，优先 WebP。
    - `public/fonts/*`：自托管字体资源。

### 5. 资产导出策略（Figma → 项目）
- 字体：
  - 从 Figma 标注获取所用字体族与字重（如 400/500/600/700），导出/收集对应字体文件至 `public/fonts/`。
  - 在 `src/app/layout.tsx` 使用 `next/font/local` 加载，并通过 `className` 应用于 `<body>`，避免自定义 CSS。
- 图标：
  - 导出为纯净 SVG（去除多余属性与填充，命名使用 `kebab-case.svg`）。
  - 放置 `public/assets/icons/`，使用 `<img src="/assets/icons/name.svg" alt="..." />` 引用。
- 位图/插画：
  - 导出 `@2x` WebP（如需要透明则 PNG），命名 `kebab-case@2x.webp`，置于 `public/assets/images/`。

### 6. Tailwind-only 样式策略
- 色彩/阴影/渐变/毛玻璃：
  - 使用 Tailwind 预设与任意值：`bg-[#RRGGBB]`、`text-[#RRGGBB]`、`shadow-[...]`、`from-[#...] to-[#...]`、`backdrop-blur-md` 等。
- 排版：
  - 通过 `tracking-*`、`leading-*`、`font-*` 控制排版，不写自定义 `@font-face` 或选择器。
- 布局容器：
  - PC 端主容器 `max-w-[1440px] mx-auto px-8 xl:px-10 2xl:px-12`。
- 响应式断点（PC 范围）：
  - 主要针对 `xl`（≥1280）与 `2xl`（≥1536）两个区间；元素尺寸/间距以两画板标注映射。

### 7. 页面与组件映射（示例）
- 顶部导航（`components/Header.tsx`）
  - Logo、主导航、CTA 按钮；hover: 颜色/背景/阴影过渡。
- 英雄区（`components/Hero.tsx`）
  - 标题/副标题/主行动按钮；背景渐变或装饰图形；按钮 hover scale/opacity。
- 功能区/卡片网格（`components/Features.tsx`）
  - 卡片阴影与悬浮提升（`hover:-translate-y-0.5 hover:shadow-[...]`）。
- 画布/预览区（`components/CanvasPreview.tsx`）
  - 静态预览图 + 轻动效（悬浮轻微旋转/位移）。
- 客户/数据背书（`components/SocialProof.tsx`）
  - 品牌图标行；变灰到彩色 hover。
- CTA 区（`components/CTA.tsx`）
  - 大按钮与说明；渐变背景与光晕（`before:`/`after:` 伪元素不使用，转为容器子层渐变块）。
- 页脚（`components/Footer.tsx`）
  - 链接分组、版权与社媒图标。

> 具体组件与层级名称会以 Figma 的节点结构为准；上述为映射示例，落地时将根据标注逐一对齐。

### 8. 交互与动画清单（PC 端）
- 导航链接：`transition-colors`，hover 文字高亮。
- 主要按钮：`transition-all`，`hover:scale-[1.02] hover:shadow-[...]`。
- 卡片：`hover:-translate-y-0.5 hover:shadow-[...]`，`group-hover` 内部元素淡入。
- 图标：`hover:opacity-80` 或 `hover:brightness-110`。
- 渐显：`opacity-0` → `opacity-100` 基于视口/交互触发（首版可按加载即显）。

### 9. 可访问性与 SEO
- 语义标签：`header/main/section/footer/nav/button` 等。
- 图像 `alt` 与图标 `aria-hidden` 合理设置。
- 标题层级与可聚焦状态（:focus-visible）默认由浏览器与 Tailwind 处理。

### 10. 性能与资源
- 图片优先 WebP；SVG 使用 `<img>` 直引，避免不必要的运行时处理。
- 按需渲染组件；减少不必要的 Client Component（默认 Server Component）。

### 11. 里程碑与交付
- M0 基线：项目清理、目录搭建、字体加载通路（0.5 天）。
- M1 资产导出：字体/图标/位图批量导出与归档（0.5–1 天）。
- M2 结构落地：布局与组件骨架，完成 80% 还原（1–1.5 天）。
- M3 视觉还原：颜色/间距/细节对齐（0.5–1 天）。
- M4 动效与交互：hover/过渡/微动效补齐（0.5 天）。
- M5 QA 与验收：对照 Figma 两尺寸画板走查与修正（0.5 天）。

交付清单：
- 完整页面实现（`/` 路由）。
- `src/components/*` 组件集合（与设计结构一致）。
- 资产目录：`public/assets/icons`、`public/assets/images`、`public/fonts`。
- README 中简述运行与资产更新方法。

### 12. 验收标准（像素与体验）
- 视口宽度 1280 与 1440 下，与 Figma 对齐度 ≥ 95%（以字体渲染差异为容差）。
- 交互与 hover 与设计一致；动效时长/曲线与预期匹配或更自然。
- 不存在自定义 CSS；仅使用 Tailwind 原子类与 Next 字体加载。

### 13. 风险与依赖
- Figma Dev Mode 与文件权限未开通将阻塞资产导出与标注读取。
- 若使用了商用受限字体，需替换为等效或获取授权。

### 14. 下一步（等待你确认）
- 一旦你确认本方案：
  1) 赋予 Figma 设计文件 Dev Mode 访问权限；
  2) 我将批量导出字体/图标与图片，并开始按模块落地；
  3) 优先完成 M0–M2，提交首个可预览版本供走查。


### 附：编码实施分解步骤（大任务 → 子任务）

> 执行规则：严格按“子任务”为单位推进；每完成一个子任务我会在对话中汇报并等待你的下一步指令后再进行下一个子任务。

#### 任务 A：基线搭建与清理（Tailwind-only）
1. 清理 `src/app/globals.css`，仅保留 `@import "tailwindcss";`
2. 新建 `src/app/layout.tsx`，接入 `next/font/local`，设置 `<html lang="zh-CN">`
3. 新建 `src/app/page.tsx`，放置页面容器：`max-w-[1440px] mx-auto px-8 xl:px-10 2xl:px-12`
4. 创建目录：`src/components/`、`public/assets/icons`、`public/assets/images`、`public/fonts`

#### 任务 B：资产导出与接入（Figma → 项目）
1. 字体导出：收集所需字重 → 放入 `public/fonts/` → 在 `layout.tsx` 加载并应用到 `<body>`
2. 图标导出：SVG 清理与命名 → 放入 `public/assets/icons/` → 以 `<img>` 引用
3. 图片导出：优先 WebP/必要时 PNG → 放入 `public/assets/images/`
4. 占位替换：未就绪资产先以占位图/占位文本临时代替

#### 任务 C：Header 模块
1. 结构搭建：Logo/导航项/CTA 按钮（Server Component）
2. 样式与布局：Tailwind 原子类完成对齐
3. 交互：hover 颜色/阴影/轻微缩放，焦点态可见

#### 任务 D：Hero 模块
1. 文案栈：标题/副标题/说明/主按钮
2. 海报横向列表（静态首版）：等高卡片、mask 圆角与阴影
3. 按钮动效：`hover:scale-[1.02]`，`transition-all`

#### 任务 E：App 预览大面板
1. 容器与背景：深色卡片、内边距、圆角与阴影
2. 顶栏与搜索框：图标/输入框布局
3. 预览网格：示例卡片若干，hover 投影与上浮

#### 任务 F：交互信息/提示模块
1. 气泡/提示卡结构与层叠顺序
2. 进入/悬浮渐显：`opacity`/`translate` 过渡

#### 任务 G：创作卡片网格/组件区
1. 网格布局与卡片规格
2. 卡片内元素层级（封面/标题/标签）
3. 卡片 hover：阴影与轻微上浮

#### 任务 H：Sticker 云/徽章集
1. 图块排布：不规则密集布局（静态首版）
2. hover：`brightness`/`opacity` 变化

#### 任务 I：视频展示区
1. 占位封面/播放器外框
2. 文案与辅助说明

#### 任务 J：CTA 模块
1. 文案/按钮/背景装饰（渐变/光晕用子层实现）
2. hover 与聚焦态

#### 任务 K：Footer 模块
1. 链接分组与版权信息
2. 社媒图标行与 hover

#### 任务 L：全局动效与细节统一
1. 统一 `transition` 时长/曲线、阴影层级命名
2. 统一圆角/间距/字重

#### 任务 M：1440/1920 响应式适配
1. 1440 对齐：`xl` 尺寸与间距校正
2. 1920 对齐：`2xl` 尺寸与间距校正

#### 任务 N：可访问性与 SEO
1. 语义标签/标题层级与 `alt`/`aria-*` 补全
2. 元信息/OG 基础字段

#### 任务 O：性能与资源优化
1. 图片体积/格式回顾，必要时降采样
2. SVG 去冗余校验
3. Server/Client 组件边界优化

#### 任务 P：最终走查与验收
1. 对照 Figma 两画板（1440/1920）像素核对
2. 交互与动效回归
3. 问题清单与最终修复

参考设计链接（用于对照）：
- [桌面版（大尺寸）](https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4116)
- [桌面版（较小尺寸）](https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-1685)

### 附加：任务 M（1440/1920 响应式）子任务（基于 Dev Mode）

> 目标：对齐 `home_1440` 与 `home_1920` 两画板像素关系，完善断点 `xl`/`2xl` 的尺寸、间距与排版。

M-1 断点与容器基线
- 校准页面主容器：`max-w-[1440px]`（xl）、`max-w-[1920px]`（2xl 可用更宽容器或加大内边距）
- 全局水平内边距：`px-8 xl:px-10 2xl:px-12` 是否需要上调；按 Figma 标注落定

M-2 Header 与 Hero（xl/2xl）
- Logo/导航/CTA 的字号、行高与间距差异
- Hero 标题字号阶梯（xl: 48–56、2xl: 56–64 依据标注），段落行高与最大宽度
- 海报行卡片尺寸与间距（xl 与 2xl 的列宽/间距变化）

M-3 App 预览大面板（xl/2xl）
- 外框圆角/内边距、阴影层级与工具栏高度
- 预览栅格卡尺寸（行高/列数）与占位图最终替换路径

M-4 中段模块（提示/创作网格/Sticker）
- 提示卡：容器宽度、文本字号；按钮尺寸在 2xl 下的调整
- 创作网格：列数、卡片高宽比与间距（xl: 3/4 列，2xl: 4/5 列，按标注确认）
- Sticker 云：多尺寸矩阵在 2xl 下的间距与密度

M-5 视频展示区与 CTA、Footer（xl/2xl）
- 视频封面高度与比例（16:9/特定高）；CTA 容器内边距与按钮尺寸
- Footer 链接间距与字号、版权信息在 2xl 的对齐

M-6 字体与栅格统一
- 按 Dev Mode 标注修正 `font-weight`、`letter-spacing`、`leading` 在 xl/2xl 的差异
- 统一圆角、阴影、边框与毛玻璃强度（必要时使用任意值类）

M-7 验收走查
- 对照 `home_1440` 与 `home_1920` 两画板，逐区截图对比；偏差 > 4px 即修正
- Hover/动效在 2xl 下不突兀，动画曲线与时长一致

### 附加：后续执行任务清单（新窗口用）

- 资产导出与替换（高优先级）
  - Hero 海报 5 张：为每张获取 Dev 子层链接（单独 node-id），保存为 `public/assets/images/hero-poster-0{1..5}@2x.webp`，在 `src/components/Hero.tsx` 替换占位 `placeholder-rect.svg`。
  - 创作卡片封面 8 张：同上，命名 `public/assets/images/creation-card-0{1..8}-512x384.webp`，在 `src/components/CreationGrid.tsx` 替换占位。
  - Sticker（可选）：落盘 `public/assets/images/sticker-XX-128.png` 或 svg，将 `src/components/StickerCloud.tsx` 的矩形占位改为 `<img>` 引用并沿用原类名。
  - 视频封面（可选）：输出 `public/assets/images/video-cover-1280x720.webp`，替换 `src/components/VideoShowcase.tsx` 的图片 src。

- 响应式与像素走查（继续 M-7）
  - 打开 1440/1920 视口，按 `QA_CHECKLIST.md` 逐区核对尺寸/间距/字号/阴影；偏差 > 4px 即修正。
  - 需要任意值时使用 Tailwind 任意值类（如 `h-[420px]`、`tracking-[-0.02em]`）。

- 文案与链接确认（不改业务逻辑）
  - 导航与 CTA 的 `href` 若需变更，直接在 `src/components/Header.tsx` 与 `src/components/CTA.tsx` 调整；默认沿用现有逻辑。

- 可选小优化
  - 图片统一 WebP，质量约 80%；首屏关键图 `loading="eager"`，其余 `loading="lazy"`。

- 需要的输入（若走分图导出）
  - 在 Figma 中逐个选择图片 → 右键 Copy link → 提供 5 张海报 + 8 张卡片封面的链接（各自 node-id）。

