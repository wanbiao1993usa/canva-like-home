# Next.js App Router 多语言改造方案（官方 i18n）
> 更新时间：2025-11-11 11:45（UTC+8）

## 1. 改造目标
- 采用 Next.js 官方 App Router i18n，最小成本支持 `zh-CN`（默认）与 `en-US`，同时预留扩展其它语种的能力。
- 避免引入额外依赖（如 next-intl），优先利用框架内置 locale 功能实现路由、Metadata、JSON-LD 的语言分流。
- 将页面文案、导航与 SEO 信息抽离成结构化字典，保证未来新增语种仅需补齐翻译文件。

## 2. 现状梳理
- 所有页面位于 `src/app/*.tsx`，路径固定（无 `[locale]` 目录），文案写死中文，字体也通过 `font-[PingFang SC]` 强制中文字体。
- `Header` 内的语言按钮仅展示“中文（简体）”字符串，无切换逻辑。
- `Contact` 页包含 `metadata` 与内嵌 JSON-LD，但内容同样为中文。
- 公共组件与数据仍是硬编码字符串，缺少集中式翻译存储。

## 3. 目标架构
```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx        # 包裹每种语言的页面，注入 lang、字体与数据
│  │  ├─ page.tsx          # 首页（根据 locale 渲染对应文案）
│  │  ├─ contact/page.tsx
│  │  ├─ inspiration/page.tsx
│  │  └─ pricing/page.tsx
│  ├─ not-found.tsx        # 可共享或分 locale，后续按需拆分
│  └─ i18n.ts              # 辅助函数：supportedLocales、defaultLocale、getDictionary
├─ messages/
│  ├─ zh-CN.json
│  └─ en-US.json
```

### 3.1 `next.config.js`
```ts
const nextConfig = {
  i18n: {
    locales: ["zh-CN", "en-US"],
    defaultLocale: "zh-CN",
    localeDetection: true,
  },
};
export default nextConfig;
```
- 通过官方 `i18n` 字段启用路由前缀。默认语言访问 `/`，英文访问 `/en-US`。
- `localeDetection` 保持开启，后续如需手动控制可在中间件里覆盖。

### 3.2 字典加载
- 新建 `src/app/i18n.ts`：
  - `const locales = ["zh-CN", "en-US"] as const;`
  - `export type Locale = (typeof locales)[number];`
  - `export async function getDictionary(locale: Locale) { return (await import(`../messages/${locale}.json`)).default; }`
- 字典文件 `messages/*.json` 保存所有 UI 文案；键名建议三段式：`{domain}.{section}.{key}`，例如 `header.nav.home`。
- 未来新增语种只需添加 JSON 文件并更新 `locales` 数组。

### 3.3 布局调整
- 把 `src/app/layout.tsx` 拆分为：
  - `src/app/layout.tsx`：保留 `<html>` 骨架 + `generateStaticParams`（返回 `locales`）；内部渲染 `children`.
  - `src/app/[locale]/layout.tsx`：接收 `params.locale`，加载字典，设置 `<html lang>`，并通过 React Context/props 下发给页面。
- 也可仅在 `src/app/[locale]/layout.tsx` 设置 `<html lang>` 并在根 layout 返回 `<html>`，取决于个人偏好，关键是 locale 需要映射到 `<html lang>`。

### 3.4 页面组件
- 将当前 `src/app/page.tsx`、`contact/page.tsx` 等搬入 `[locale]` 目录，并在 `generateStaticParams` 中迭代 locales 保证静态导出。
- 各页面接收 `params.locale`，调用 `getDictionary(locale)`，再把 `t` 结果传给下游组件。
- 公共组件如 `Header`、`Footer`、`CTA` 通过 props 获取 `dict`，或使用 `LocaleContext`（可在 `src/components/providers/LocaleProvider.tsx` 定义）。

### 3.5 Header 语言切换
- 语言按钮改为遍历 `locales`，渲染下拉项：
  - 当前 locale 高亮，其他项点击后跳转 `/[locale]`（默认 zh-CN 可跳 `/`）。
  - 预留 `comingSoonLocales` 数组，用于展示不可点击的占位语言（例如 `ja-JP`、`fr-FR`），以满足“预留扩展”需求。
- 字体切换：根据 `locale` 设置不同 class，如中文使用 `font-[PingFang SC]`，英文 fallback 至 `fontSans`。

### 3.6 Metadata / JSON-LD
- 使用 Next App Router 的新 `generateMetadata`：
  - 在 `src/app/[locale]/contact/page.tsx` 等导出 `generateMetadata({ params })`。
  - 读取字典中的 `metadata.title`、`metadata.description` 等字段，返回多语言内容。
- JSON-LD：构造对象前先从字典读取对应翻译，并更新 `availableLanguage` 列表以包含 `["zh-CN","en-US"]`。

### 3.7 静态资源
- 图片路径不涉及语言，但需要确保 ALT 文本使用字典；SVG 图标可保持共享。

## 4. 实施步骤（建议顺序）
1. **配置阶段**
   - 更新 `next.config.js`，新增 `i18n` 设置。
   - 新建 `src/app/i18n.ts` 与 `messages/zh-CN.json`、`messages/en-US.json`（先放核心文案）。
2. **路由与布局**
   - 调整 `src/app` 结构：创建 `[locale]` 目录，迁移 `page.tsx`、`contact`、`pricing`、`inspiration` 等页面。
   - 在 `[locale]/layout.tsx` 中注入 `lang` 和 `LocaleProvider`，同步更新根布局逻辑。
3. **组件文案抽离**
   - 优先处理 `Header`（导航、CTA、语言下拉）、`Footer`（版权、链接）、`Home` 模块标题描述。
   - 逐步覆盖 `Contact`、`Pricing`、`Inspiration` 等页面内的子组件。
4. **SEO 与结构化数据**
   - 为每个页面实现 `generateMetadata`，引用 `dict.metadata`。
   - 更新 `Contact` JSON-LD，保证多语内容与 `availableLanguage` 准确。
5. **增强体验**
   - 处理字体切换、日期/货币格式（若需，可在后续阶段引入 `Intl.NumberFormat`）。
   - 为 Header 语言切换添加 hover/active 样式，提示“更多语言即将上线”。
6. **测试验证**
   - 手动访问 `/`、`/en-US`、`/en-US/contact` 等路由检查文案与 `lang` 属性。
   - 确认构建产物无缺失翻译（可在构建脚本中加入 lint 检查）。

## 5. 预留扩展点
- `locales` 数组可直接追加新语言；字典文件命名需与 locale 完全一致。
- 如后续需要服务器端内容协商，可新增中间件 `src/middleware.ts`，根据 `Accept-Language` 重定向。
- 若以后需要复杂格式化或 ICU 语法，可在现有架构上替换/封装到 `getDictionary`，无需大改页面结构。

## 6. 影响评估
- **目录变动**：所有页面路径将增加 locale 层，需同步更新文档与可能的测试脚本。
- **构建体积**：多语言会拉入多份 JSON，需控制字段数量，避免重复。
- **协作流程**：新增功能需同步在 `messages/*.json` 添加键值，并在 PR 中说明翻译缺口。

## 7. 验收标准
- `/` 与 `/en-US` 内容、标题、JSON-LD、`<html lang>` 等全部对应语言。
- Header 语言下拉可在两种语言间切换，其它预留语言以禁用态展示。
- 文案集中存放在 `messages/*`，代码中不再出现直写中文字符串（少量占位可保留待翻译标记）。
- Docs（含本文件、`docs/layout-overview.md`）更新描述新的目录层级与 i18n 约定。

## 8. 文件级任务拆解
1. `next.config.js`：新增官方 `i18n` 配置（locales、defaultLocale、localeDetection）。
2. `src/app/i18n.ts`：创建 locale 常量、类型以及 `getDictionary` 辅助函数。
3. `messages/zh-CN.json`：整理现有中文文案为结构化字典。
4. `messages/en-US.json`：提供英文翻译，占位未翻译字段可带 `TODO` 标记。
5. `src/app/layout.tsx`：调整根布局，配合 `[locale]` 结构输出子树并导出 `generateStaticParams`。
6. `src/app/[locale]/layout.tsx`：新建 per-locale 布局，设置 `<html lang>`、注入 `LocaleProvider` 并向下传递字典。
7. `src/app/[locale]/page.tsx`：迁移首页入口，接入字典并将段落、按钮文案改为 `dict.home.*`。
8. `src/app/[locale]/contact/page.tsx`：迁移联系页，国际化所有段落及 `generateMetadata`、JSON-LD。
9. `src/app/[locale]/inspiration/page.tsx`：迁移灵感页，抽离标题、副本及画廊说明。
10. `src/app/[locale]/pricing/page.tsx`：迁移定价页，国际化套餐名称、价格说明与 FAQ。
11. `src/components/common/Header.tsx`：替换导航文本、CTA 文案与语言下拉逻辑，依据 locale 切换字体。
12. `src/components/common/Footer.tsx`：国际化版权、链接与社交说明文案。
13. `src/components/home/*`：分别抽离 Hero、AppPreview、DesignMagicBanner 等模块内的中文描述与按钮文本。
14. `src/components/contact/*`：为 ContactHero、ContactForm、SocialMedia、CustomerSupport 提供字典映射。
15. `src/components/pricing/*`：处理 PricingHero、PricingCards、FAQSection 等组件中的硬编码字符串。
16. `src/components/inspiration/*`：同步 HeroIntro、GalleryGrid 的标题、描述及标签文本。
17. `docs/layout-overview.md`：文档中更新目录层级与多语言路由描述，保持与实现一致。
