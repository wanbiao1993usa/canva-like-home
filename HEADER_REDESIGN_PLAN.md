# Header 改造计划

## 背景
- 设计规范 `NAVBAR_DESIGN_SPEC.md` 对 Header 的三栏布局、尺寸、字体、颜色与交互有严格定义。
- 现有 `src/components/Header.tsx` 在容器间距、三栏宽度、导航胶囊样式、语言/CTA 组件及响应式行为上与设计稿存在明显偏差。
- 本计划旨在重构 Header 结构与样式，使之与设计稿保持一致，并为后续测试/联调提供明确步骤。

## 改造范围
1. Header 外层容器：内边距、背景继承、三栏宽度、对齐策略。
2. 左侧 Logo 区域：定宽容器、Logo 资源尺寸、`CanDe` 字体/字号/字距。
3. 中间导航菜单：外层胶囊、边框、半透明背景、导航项激活/默认/悬停状态、`aria` 标签。
4. 右侧操作区：语言选择器（尺寸、圆角、文字样式、图标）、CTA 按钮（配色、描边、箭头资源）。
5. 响应式与交互：断点策略、移动端折叠、悬停反馈、阴影/过渡复用。
6. 字体与资源引用：核对 `public/assets/icons` 内资源命名，与设计稿一致。

## 实施步骤（子任务）
1. **容器与栅格调整**
   - 将 Header 外层改为 `px-12 lg:px-16 2xl:px-[48px] py-[32px]` 等阶梯式 padding，确保在桌面端达到设计值。
   - 使用 `flex` + `w-[250px]`（左右）+ `flex-1`（中间）构成三栏结构，保持 `items-center justify-between`。
   - 验证 `box-border` 与背景继承情况，必要时加 `bg-transparent`。

2. **Logo 区域重构**
   - 设定左栏容器 `className="flex w-[250px] items-center gap-3"`。
   - 替换/限制 Logo 图标尺寸为 `w-[28px] h-[25.136px]`，补充 `alt` 与 `loading="lazy"`。
   - 引入 24px `font-semibold tracking-[-0.48px]` 的 `CanDe` 文案，默认显示，在窄屏可 `hidden`。

3. **导航菜单胶囊**
   - 创建导航外壳 `bg-white/10 border border-[#414141] rounded-[32px] p-[5px] flex gap-1`。
   - 调整导航链接为 `px-4 py-2.5 text-[14px] font-medium text-white`，激活项背景 `#171719`。
   - 复用 `transitionAll` 实现 hover 背景轻微加深；为激活项添加 `aria-current="page"`。
   - 通过数组映射生成导航项，便于后续扩展。

4. **语言选择器与 CTA**
   - 右栏容器 `flex w-[250px] items-center justify-end gap-2`。
   - 语言按钮：`h-[28px] px-2`、`rounded-[8px] bg-white/5 border border-white/10 text-[16px] font-normal`，内含 Chevron 图标（13px）。
   - CTA：`bg-[#191919] ring-1 ring-white/20 rounded-full px-5 py-3 text-[18px] font-semibold flex items-center gap-2`，箭头使用 `arrow-up-right.svg`（若无则添加）。
   - 若需 `actionsShellClass`，可作为语言+CTA 的透明容器；若无必要则移除该常量。

5. **响应式策略**
   - ≥1200px（xl）显示完整三栏；<xl 将导航折叠/隐藏，仅保留 Logo + CTA（或汉堡按钮占位）。
   - 在平板断点（md/lg）调整左右栏宽度、padding；移动端缩小 `py` 至 `16px`。
   - 小屏 CTA 维持 `rounded-full`，但遵循新的配色与箭头。

6. **可访问性与动画统一**
   - 确保所有可点击元素具备 `aria-label`、`aria-current`、`aria-expanded`（如后续加入菜单）。
   - 统一 `transitionAll`，避免硬编码 `hover` 色彩；必要时新增 `focus-visible` 状态。
   - 检查暗色背景下的对比度，保留/更新阴影值以匹配设计。

7. **验证步骤**
   - 在 `npm run dev` 下对桌面、平板、移动视口进行手动核对。
   - 查验图标路径与尺寸是否与设计匹配；若缺资源则补充 SVG。
   - 通过浏览器开发者工具比对 padding/宽度是否达到规范；记录任何与设计稿仍不符的点。

## 交付物
- 更新后的 `src/components/Header.tsx`（含必要 Tailwind 类）。
- 若需新增图标，放置于 `public/assets/icons/` 并在文档中登记。
- 可选：在 `UI_alignment_plan.md` 追加进度记录。

## 风险与依赖
- 圆角与尺寸依赖 Tailwind 配置是否允许自定义值，必要时使用内联 `style` 或 `arbitrary values`。
- 移动端汉堡菜单若需交互逻辑，可能需要额外组件；本计划仅聚焦视觉对齐。
- 字体 `PingFang` / `Inter` 在不同平台的可用性需通过 `font-family` fallback 保障。
