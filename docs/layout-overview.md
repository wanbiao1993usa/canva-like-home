# Canva-like 布局与代码结构指南
> 更新时间：2025-11-11 11:20（UTC+8）

本文档基于 `canva-like-home` 当前代码（Next.js App Router + TailwindCSS）撰写，聚焦页面布局、组件分层与公共样式资产，帮助后续协作者快速理解结构并保持一致的开发约定。

## 1. 顶层目录速览
- `docs/`：设计与实现说明文档，当前文件位于此目录。
- `public/assets/{icons,images}`：页面所有静态插画与 SVG 图标，命名需与组件引用一致；`public/fonts` 存放字体占位符。
- `src/app/`：Next App Router 入口，含根布局、全局样式、各页面 `page.tsx`。
- `src/components/`：按照页面或通用类型拆分的 UI 组件；`icons/` 收录内联矢量组件。
- `src/ui.ts`：Tailwind class 片段与渐变文本工具函数。
- `tailwind.config.ts`、`postcss.config.js` 等位于仓库根目录，支撑原子化样式体系。

### 1.1 `src/` 层级图
```text
src/
├─ app/
│  ├─ layout.tsx           # 根布局，注入字体与噪点背景
│  ├─ page.tsx             # 首页
│  ├─ not-found.tsx        # 404 展示页
│  ├─ globals.css          # Tailwind 全局入口 + 滚动条样式
│  ├─ fonts.ts             # next/font 配置（Inter 占位）
│  ├─ contact/page.tsx     # 联系我们
│  ├─ inspiration/page.tsx # 灵感画廊
│  └─ pricing/page.tsx     # 定价
├─ components/
│  ├─ common/
│  │  ├─ CapsuleTagGroup.tsx
│  │  ├─ CTA.tsx
│  │  ├─ Footer.tsx
│  │  ├─ GlowEffect.tsx
│  │  └─ Header.tsx
│  ├─ home/
│  │  ├─ AppPreview.tsx
│  │  ├─ CallDesignerCollab.tsx
│  │  ├─ CustomDesignPanel.tsx
│  │  ├─ DesignMagicBanner.tsx
│  │  ├─ GenerationShowcase.tsx
│  │  ├─ Hero.tsx
│  │  └─ StartFromTemplates.tsx
│  ├─ contact/
│  │  ├─ ContactHero.tsx
│  │  ├─ ContactForm.tsx
│  │  ├─ SocialMedia.tsx
│  │  └─ CustomerSupport.tsx
│  ├─ inspiration/
│  │  ├─ HeroIntro.tsx
│  │  └─ GalleryGrid.tsx
│  ├─ pricing/
│  │  ├─ PricingHero.tsx
│  │  ├─ PricingCards.tsx
│  │  ├─ PricingCard.tsx
│  │  ├─ FAQSection.tsx
│  │  └─ FAQItem.tsx
│  └─ icons/AsteriskBurst.tsx
└─ ui.ts
```

## 2. 根布局与全局样式
- `src/app/layout.tsx`  
  - 注入 `fontSans`（暂用 Google Inter），未来可切换 `next/font/local` 引入品牌字体。  
  - `<html>` 统一 `lang="zh-CN"` 且 `overflow-x-hidden`，防止 GlowEffect 与绝对定位背景造成横向滚动。  
  - `<body>` 通过伪元素铺设噪点网格并维持暗色基底，所有内容包裹在 `relative z-10` 容器上方，保证纹理层不会遮挡交互元素。
- `src/app/globals.css`  
  - 首行 `@config "../../tailwind.config.ts"` 与 `@import "tailwindcss"`，确保 docs 中示例同样使用项目配置。  
  - 定制滚动条为暗色渐变背景配合 Primary 高光，覆盖标准与 WebKit 内核。  
  - 其余样式统一依赖 Tailwind Utilities；如需自定义语义类，应优先加入 `tailwind.config.ts`。
- `tailwind.config.ts` 关键配置  

| 项 | 说明 |
| --- | --- |
| `content` | 扫描 `src` 与 `docs`，保证文档示例类名可被 safelist。 |
| `theme.extend.colors.primary` | `#AE89FF`（默认）+ `accent #414BFF`，用于按钮与渐变。 |
| `theme.extend.colors.secondary` | 950~600 定义暗色背景、描边、正文灰阶。 |
| `backgroundImage["primary-gradient"]` | `linear-gradient(107deg, #AE89FF 11.55%, #414BFF 88.45%)`，常用于 CTA、Hero。 |
| `plugins` | 当前为空，如需 `@tailwindcss/typography`/`forms` 可在此扩展。 |

## 3. 页面级布局层级

所有页面主容器共享 `max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px]` 与阶梯式 `px`，字体临时锁定 `PingFang SC` 以贴合设计稿。

### 3.1 首页（`src/app/page.tsx`）
```text
HomePage main
├─ Header                (common/Header)
├─ Hero                  (home/Hero)
├─ AppPreview            (home/AppPreview)
├─ DesignMagicBanner     (home/DesignMagicBanner)
├─ GenerationShowcase    (home/GenerationShowcase)
├─ CustomDesignPanel     (home/CustomDesignPanel)
├─ StartFromTemplates    (home/StartFromTemplates)
├─ CallDesignerCollab    (home/CallDesignerCollab)
├─ CTA                   (common/CTA)
└─ Footer                (common/Footer)
```

| 模块 | 关键布局要点 | 依赖素材/交互 |
| --- | --- | --- |
| Header | `sticky top-0` 导航，包含多语言下拉与桌面/移动 CTA；`focus-visible` 保证无障碍 | 点击 CTA 通过 `window.open("https://editor.lycium.ai")` 跳转编辑器 |
| Hero | 居中标题+描述+按钮，下方 5 列作品卡响应式网格 | `GlowEffect` 注入底部光晕，按钮使用 `btnPrimary` 类组合 |
| AppPreview | 左列工具栏 + 中央画布 + 右栏属性面板 + 最近文件列表 | 多个 `GlowEffect` 叠加边缘光，卡片 hover 继承 `cardHover` |
| DesignMagicBanner | 胶囊标签 + 渐变标题，承上启下 | `CapsuleTagGroup` 统一间距，文本用 `gradientText` |
| GenerationShowcase | 左侧步骤卡 + 右侧叠层信息面板（流程图+评价卡） | 定制 `glowStyle`、多张 SVG 背景，确保 `/assets/icons` 完整 |
| CustomDesignPanel | 左侧模拟编辑器（Layers/Canvas/快捷提示），右侧说明卡 | 使用本地 PNG（`custom-design-*.png`），含“重新生成”按钮 |
| StartFromTemplates | 左列文案，右列 10 个气泡围绕渐变光圈 | 结合 `GlowEffect` + `radial-gradient`；图片位于 `template-bubble-*.png` |
| CallDesignerCollab | 左侧叠放多张状态卡片，右侧三段要点 | 使用 `gradientTextXs`、loading SVG、圆环动画 |
| CTA | 圆角深色卡片，复用 `CapsuleTagGroup`、双按钮 | 背景添加 `GlowEffect`，按钮跳转同 Header |
| Footer | 左侧品牌信息，右侧链接/社交图标 | 年份通过 `new Date().getFullYear()` 实时生成 |

### 3.2 联系我们（`src/app/contact/page.tsx`）
```text
ContactPage
├─ Header
├─ ContactHero          # 联系方式概览 + 关键转化按钮
├─ ContactForm          # 多列表单，内置验证状态提示
├─ SocialMedia          # 平台矩阵卡片 + 快速入口
├─ CustomerSupport      # 客服 FAQ 及响应时间
├─ Footer
└─ JSON-LD 脚本块       # schema.org ContactPage 数据
```
- 页面包含 `metadata` 与 JSON-LD，便于搜索引擎索引；如需新增字段，须同时更新 `contactPageJsonLd`。  
- `CustomerSupport` 组件对接 `/assets/icons/support-*`，提交前需确认静态资源存在。

### 3.3 灵感画廊（`src/app/inspiration/page.tsx`）
```text
InspirationPage
├─ Header
├─ HeroIntro            # 顶部简介 + 关键指标
├─ GalleryGrid          # 4×N Masonry 风格卡片网格，支持筛选标签
└─ Footer
```
- `GalleryGrid` 内部维护卡片数据数组（封面、标签、设计师信息），如需接入真实后端可抽离至 `data/`。

### 3.4 定价页（`src/app/pricing/page.tsx`）
```text
PricingPage
├─ Header
├─ PricingHero          # 标题、说明与计费周期切换占位
├─ PricingCards         # 三档 PricingCard，支持高亮推荐
├─ FAQSection           # 多个 FAQItem 手风琴
├─ CTA
└─ Footer
```
- `PricingCard` 提供 props 控制推荐角标、价格单位与功能列表；如新增套餐，优先在 `PricingCards` 内追加数据对象。  
- `FAQSection` 依赖 `FAQItem` 处理开合状态（受控 state），保持动画一致。

### 3.5 404（`src/app/not-found.tsx`）
- 独立背景插画 + CTA 返回首页，与根布局共用样式。  
- 若自定义路径需要专属 404，可在对应路由目录加入 `not-found.tsx` 并复用此组件。

## 4. 复用样式与基础组件
- `src/ui.ts`  
  - `transitionAll`：200ms ease-out 过渡类片段，用于按钮、卡片统一动效。  
  - `btnPrimary / btnSecondary`：封装圆角、填充、hover/active 状态。  
  - `cardBase / cardHover`：卡片初始与悬浮阴影，AppPreview、GenerationShowcase、GalleryGrid 复用。  
  - `gradientText / gradientTextXs`：标题与说明文渐变文字，配合 `bg-clip-text text-transparent` 实现。
- `GlowEffect`：Next `<Image>` 包装 + 绝对定位参数，负责在背景叠加噪点/渐变光；传入 `width/height/top/left` 控制位置。  
- `CapsuleTagGroup`：胶囊标签排版容器，确保 CTA、横幅、模板模块间距一致。  
- `components/icons/AsteriskBurst`：特殊装饰 SVG，避免重复引入静态文件。

## 5. 静态资产与内容约束
- 所有插画与图标存放于 `public/assets/images`、`public/assets/icons`，文件名需与组件内 `src` 完全一致，缺失会导致构建失败。  
- GlowEffect 所用 `.svg` 依赖准确的尺寸与渐变方向，替换素材时需同步更新组件传入的 `width/height`，避免溢出容器。  
- 若将占位 PNG 改为远程图片，需要在 `next.config.js` 配置 `images.domains`，或继续以本地路径引用。  
- 字体当前为 Inter 占位；若引入品牌字体，需同时更新 `src/app/fonts.ts`、`globals.css` 以及组件里硬编码的 `font-[PingFang SC]`。

## 6. 维护建议
1. **抽离数据**：`AppPreview`、`CustomDesignPanel` 等模块内存在大段 mock 数据，建议迁移到 `src/data/*.ts`，方便后续对接 API。  
2. **统一 Tokens**：新增阴影、圆角、间距时，优先写入 `tailwind.config.ts` 的 `extend`，避免多处硬编码 `[24px]`。  
3. **文档同步**：当增删页面或组件，请在 `docs/layout-overview.md` 中同步层级树与模块说明，保持文档与实现一致。  
4. **可访问性**：保持 `focus-visible` 与 `aria-*` 一致性；Header、FAQ 等已经实现示例，可复制到新组件。  
5. **资源检查**：提交前检查 `public/assets` 是否缺失引用文件，必要时在 PR 描述附带资源清单。

> 若后续需要新增页面，请沿用“`app/{route}/page.tsx` + `components/{route}/...`” 的拆分方式，并在本指南中追加对应层级说明。
