# 定价页实现子任务拆分（2025-11-10 19:45）

> 目标：依据 `docs/pricing-page-design.md` 的方案，只规划静态展示版本的落地步骤，暂不改动任意代码。

## 1. `src/app/pricing/page.tsx`
1. 引入 `Header`, `Footer` 以及所有定价页专属组件（Hero、Cards、FAQ、CTA）。
2. 复用首页一致的容器宽度与内边距（`max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px]` 等）。
3. 负责串联模块顺序：`Header -> PricingHero -> PricingCards -> FAQSection -> PricingCTA -> Footer`。
4. 暂不加入任何数据或逻辑，仅确保语义结构和布局层级正确。

## 2. `src/components/common/Header.tsx`
1. 更新 `navItems`：将 `pricing` 的 `href` 与 `matchPath` 改为 `/pricing`。
2. 确认 `pathname.startsWith('/pricing')` 能正确高亮“定价”导航项。
3. 其他样式与交互保持不变。

## 3. `src/components/pricing/PricingHero.tsx`
1. 输出胶囊标签、主标题、副标题三段内容，使用 `gradentText` 实现标题渐变。
2. 遵循方案中的间距：上 `mt-16 lg:mt-24`、下 `mb-16 lg:mb-20`、标签与标题 `mt-6`、标题与副标题 `mt-4`。
3. 文案使用文档提供的中文描述，保持纯静态（无按钮）。

## 4. `src/components/pricing/PricingCards.tsx`
1. 声明 `pricingData: PricingTier[]`，包含免费 / 专业 / 企业三档，使用静态数组。
2. 渲染 `PricingCard` 子组件，容器使用 `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`，下边距 `mb-20 lg:mb-28`。
3. 仅负责数据传递与响应式栅格，逻辑保持静态。

## 5. `src/components/pricing/PricingCard.tsx`
1. 根据 props 输出：档位名称、热门标签（仅专业版）、价格、描述、特性列表、按钮。
2. 背景、边框、阴影依照方案：基础 `rounded-3xl bg-[#1A1A1C] border-[#2D2D2F] p-8`，热门卡额外 `border-[#AE89FF]/50 shadow-[0_0_40px_rgba(174,137,255,0.15)]`。
3. 特性列表使用紫色对勾图标（可复用 SVG），CTA 按钮区分主次样式但都为静态按钮。

## 6. `src/components/pricing/FAQSection.tsx`
1. 输出标题、副文案、FAQ 列表容器（`max-w-3xl mx-auto space-y-4`）。
2. 数据结构保留 `defaultOpen` 字段，默认让首条项展开，其余折叠，仅渲染静态内容。
3. 传递 `isOpen` / `onToggle` 给 `FAQItem`，本阶段用常量（如 `onToggle={() => {}}`）。

## 7. `src/components/pricing/FAQItem.tsx`
1. 以静态视觉渲染问题与答案：`isOpen` 为 `true` 时直接显示答案，为 `false` 时隐藏。
2. 按照文档提供的边框、背景、内边距样式；按钮仍保留 `onToggle` 但暂不做交互。
3. 动画暂不实现，仅为未来交互预留 className（可注释说明）。

## 8. `src/components/pricing/PricingCTA.tsx`
1. 输出胶囊标签、标题、副文案和主按钮，容器采用渐变背景 + 光晕效果。
2. 按钮使用主色 `btnPrimary` 或方案中的定制样式，`onClick` 暂统一指向编辑器链接或占位 `href="#"`。
3. 维持静态展示，后续可在此组件扩展更多交互。

---

> 完成以上子任务后，可在阶段二再引入 FAQ 交互、动画以及动态数据等增强能力。
