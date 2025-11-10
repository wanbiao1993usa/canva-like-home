# Canva-like 页面布局与样式说明

> 更新时间：2025-11-10 20:30（UTC+8）

本文档在梳理 `canva-like-home` 项目源码后整理，覆盖整体布局、公共样式资产以及 Tailwind 配置，便于后续扩展保持一致性。

## 1. 页面架构速览

1. **根布局（`src/app/layout.tsx`）**  
   - 通过 `fontSans` 注入临时的 Google Inter 字体，等待提供品牌字体后切换到 `next/font/local`。  
   - `<body>` 应用深色背景（`#111111`）与噪点网格伪元素，`min-h-screen` + `relative` 确保所有内容位于纹理层之上。  
   - `className="overflow-x-hidden"` 结合 `main` 的自适应内边距，避免 GlowEffect 等绝对定位元素造成横向滚动。

2. **主容器（`src/app/page.tsx`）**  
   - `<main>` 采用 `max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px]` 与 `px-6 → 2xl:px-[48px]` 的阶梯式内边距，保证不同断点下内容不贴边。  
   - 字体暂时强制为 `PingFang SC` 以模拟 UI 设计稿，后续可改为全局变量。  
   - 各内容区块自上而下依次为：`Header → Hero → AppPreview → DesignMagicBanner → GenerationShowcase → CustomDesignPanel → StartFromTemplates → CallDesignerCollab → CTA → Footer`。

## 2. 公共样式资产

### 2.1 全局 CSS（`src/app/globals.css`）

- 首行 `@config "../../tailwind.config.ts"` 与 `@import "tailwindcss"` 确保全局可使用项目级 Tailwind 配置。  
- 自定义滚动条沿用深色基调与 #AE89FF 高光；`scrollbar-width: thin` 配合 WebKit 伪类消除跨浏览器视觉差。  
- 其余原子类依赖 Tailwind Utilities，故无需在这里重复定义。

### 2.2 UI 工具类（`src/ui.ts`）

- `transitionAll`：统一 200ms ease-out 过渡，供按钮、卡片复用。  
- `btnPrimary / btnSecondary`：设定圆角、配色与 hover 效果，页面 CTA、Hero 按钮等保持一致。  
- `cardBase / cardHover`：卡片默认背景与 hover 轻浮起阴影，用在 AppPreview、GenerationShowcase 等模块。  
- `gradentText / gradentTextXs`：标题与说明文的渐变文字，避免手写重复 CSS。

### 2.3 复用组件

- `GlowEffect`：封装 Next Image + 绝对定位参数，负责光晕/噪点素材的定位与懒加载。  
- `CapsuleTagGroup`：胶囊标签组合的排版基座，CTA 与若干 Banner 使用。  
- `transitionAll` 需与 `focus-visible` 样式搭配，Header 导航、按钮均已实现可访问性高亮，新增组件时保持一致。

## 3. Tailwind 配置概览（`tailwind.config.ts`）

| 配置项 | 说明 |
| --- | --- |
| `content` | 扫描 `./src/**/*.{js,ts,jsx,tsx,mdx}` 与 `./docs/**/*.{md,mdx}`，确保文档示例类名同样被产出。 |
| `theme.extend.colors.primary` | `DEFAULT #AE89FF`、`accent #414BFF`，对应品牌主色及渐变终点。 |
| `theme.extend.colors.secondary` | 950 → 600 定义背景、描边与文案颜色的灰阶带。 |
| `theme.extend.backgroundImage["primary-gradient"]` | `linear-gradient(107deg, #AE89FF 11.55%, #414BFF 88.45%)`，用于按钮或大模块背景。 |
| `plugins` | 暂无额外插件，如需 Typography/Form 等可在此扩展。 |

**使用建议**

1. 保持 `bg-primary-gradient` 与 `text-primary` 等语义类在多个区块复用，避免内联色值分散。  
2. 若新增尺寸变量，优先写入 `theme.extend`，避免在组件内硬编码多个 `px` 值。  
3. 需要在 Markdown 示例中渲染 Tailwind 样式时，无需额外配置，已包含 `docs` 目录。

## 4. 首页区块拆解

| 区块 | 文件 | 布局与内容要点 | 关键素材/交互 |
| --- | --- | --- | --- |
| 顶部导航 | `src/components/common/Header.tsx` | 左侧 Logo + 文案，中段圆角导航（自动高亮当前路由），右侧语言切换 + CTA。Mobile 仅保留 CTA。 | `transitionAll`、`focus-visible` 边框；按钮触发 `window.open("https://editor.lycium.ai")`。 |
| Hero | `src/components/home/Hero.tsx` | 居中标题、描述、主按钮，下方 5 列海报按 `grid-cols-2/3/5` 响应式排布。 | `GlowEffect` 处理底部光晕；按钮使用 `btnPrimary`。 |
| App 预览 | `src/components/home/AppPreview.tsx` | 大型工作区卡片：顶部标签/标题，中间为多栏界面（侧边栏、主画布、右侧设定），底部附最近文件列表。 | 三组 `GlowEffect` 营造边缘光；`cardHover` 提升交互反馈。 |
| 品牌魔法横幅 | `.../DesignMagicBanner.tsx` | 居中胶囊标签 + 渐变标题，为下方生成流程做导入。 | 依赖 `CapsuleTagGroup` 与 `gradentText`。 |
| 生成流程展示 | `.../GenerationShowcase.tsx` | 左侧步骤/文字卡片（含 1 号徽章），右侧两层信息叠加：上层网格图、下层评价卡片。 | 自定义 `glowStyle` 背景、多个 SVG 占位，需确保 `/assets/icons` 补齐。 |
| 自定义设计面板 | `.../CustomDesignPanel.tsx` | 左侧模拟编辑器（Layer 列表 + 画布 + 快捷提示），右侧说明卡片。 | 多个 `thumb` 图片来自 `/assets/images/custom-design-*.png`，含按钮“重新生成”。 |
| 模板集合 | `.../StartFromTemplates.tsx` | 左列说明卡片，右列为 10 个圆角气泡围绕渐变光环排布，强调多模板入口。 | `GlowEffect` + `radial-gradient` 背景，图片来源 `template-bubble-*.png`。 |
| 设计师协作 | `.../CallDesignerCollab.tsx` | 左侧包含多个叠放卡片（设计师头像、进度、视频窗口等），右侧为说明卡与三段要点。 | 复用 `gradentTextXs`，含 loading SVG、自定义圆环动画。 |
| 最终 CTA | `src/components/common/CTA.tsx` | 圆角深色卡片，内含 `CapsuleTagGroup`、标题、说明与按钮。 | `GlowEffect` 叠加背景，按钮跳转同 Header。 |
| Footer | `src/components/common/Footer.tsx` | 左侧品牌版权，右侧链接 + 简易社交图标，使用 `new Date().getFullYear()` 实时年份。 | SVG 占位符需替换成正式图标后保持尺寸一致。 |

## 5. 静态资产与内容约束

- 图标与插画分别位于 `public/assets/icons` 与 `public/assets/images`，命名与组件中的引用保持一一对应。  
- GlowEffect 使用 `.svg` 背景渐变，若替换请确保尺寸与透视匹配，以免超出容器。  
- 所有占位图片均假设为 PNG，若改为 Next Image 需配置 `next.config.ts` 的远程域名或保留本地路径。  
- 字体目前为 Inter 占位，设计稿中的中文展示依赖系统字体 `PingFang SC`。后续若接入自定义字体，需要在 `fonts.ts` 中增加 `next/font/local` 并同步更新 `globals.css`。

## 6. 注意事项

1. **资源完整性**：缺失的 PNG/SVG 会直接导致构建失败或 FOUC，提交前请检查 `public/assets`。  
2. **可访问性**：按钮、链接已实现 `focus-visible` 样式，新增组件时务必沿用这套可访问性基线。  
3. **响应断点**：部分绝对定位元素（尤其是 Template 气泡、GlowEffect）在窄屏会被裁剪，如需移动端适配需提供替代布局。  
4. **国际化占位**：当前导航语言切换仅展示“中文（简体）”，若后续接入 i18n，需要抽离文案与状态管理。

## 7. 后续建议

1. 将 AppPreview、CustomDesignPanel 中的硬编码数据抽离到 `data/*.ts`，方便与真实 API 对接。  
2. 在 Tailwind 配置中加入 `boxShadow`、`borderRadius` token，替代大量 `[24px]` 这类硬编码，便于统一调整。  
3. 引入 `@tailwindcss/typography` 处理文档类 markdown 展示，确保 `docs` 内案例与页面风格一致。
