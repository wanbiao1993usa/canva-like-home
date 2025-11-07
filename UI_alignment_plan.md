# canva-like 主页面组件逐项检查方案

> 依据 Figma 设计稿（Desktop：`345-4116`，大屏：`345-1685`）以及 `src/app/page.tsx` 中组件加载顺序编写。本方案聚焦还原视觉细节、响应式表现、交互与动效，后续执行时需优先尝试使用 Tailwind CSS 功能完成样式，实现不了的再落地为 SVG 或位图资源。

## 全局布局（`src/app/page.tsx` 主容器）
- **栅格与留白**：核对 `main` 容器最大宽度（1280/1440/1680）与左右 padding 在 768px、1280px、1440px、1920px 下的表现；确认背景色/纹理是否需要全局容器外延伸。
- **背景与辅助效果**：需还原 Figma 的暗色噪点纹理，优先通过全局 `::before` 或 `background-image`（噪点 PNG/SVG）实现，同时确保与动画兼容。
- **滚动条/平滑滚动**：确认页面是否需要隐藏滚动条或使用平滑滚动设置。

## Header（`src/components/Header.tsx`）
- **LOGO 区域**：对比字号、字距、首字母样式；确认是否需要响应式展示品牌文字；检查 hover 时 LOGO 动效（是否需要轻微放大/发光）。
- **导航胶囊**：对比圆角、背景透明度、分隔线高度与位置；核对 hover/active 时的填充色与字体粗细；确认选中态是否存在（如当前“主页”按钮突出）。
- **语言切换 & CTA**：检查双按钮组合的边距、圆角、阴影；确认语言下拉是否需要箭头旋转或下沉动画；移动端 CTA 是否需要固定吸底或渐隐。
- **动效**：实现滚动吸顶效果（`sticky` + 背景渐变/阴影），如设计稿含渐隐需同步补齐。

## Hero（`src/components/Hero.tsx`）
- **标签条**：核对“NEW”徽标的色值、渐变和内边距；确认文字大小 11/12px 是否与设计稿一致；检查 hover 是否有轻微亮度变化。
- **主标题与副文案**：对比行高、字距、最大宽度；确认在大屏/小屏下的字号调整策略。
- **行动按钮**：验证按钮高度、字重、图标尺寸；补充 hover（亮度+阴影）与 focus（outline/ring）态；确认是否需要 pulse 动画。
- **海报卡片廊**：核对卡片宽高比、圆角、间距；检查不同屏幕下布局列数与边距；确认 hover 是否带有 `scale` + `shadow`；需要时添加 `transition-transform` 与 `shadow-[...]`。
- **懒加载与性能**：确认图片是否需要 `priority` 或 `loading` 属性优化。

## AppPreview（`src/components/AppPreview.tsx`）
- **顶栏胶囊**：核对标签与链接之间的间距、字体颜色；检查 hover 文案是否带下划线或亮度变化。
- **预览窗口边框**：对比模糊/阴影层级；确认是否缺少半透明描边或内阴影效果；检查圆角尺寸是否达 32px。
- **工具栏与侧边栏**：验证搜索框 placeholder 不透明度，按钮图标 hover/active 态；侧边栏选中项目是否需要高亮条。
- **主内容卡片**：对比顶部横幅渐变与装饰（`app-banner-swirl.png` 位置/混合模式）。
- **推荐网格**：校验列数响应式断点（≥1024 四列）；卡片 hover 是否增加 `ring` 或 `shadow`；第二张视频卡是否有播放按钮 hover 动画。
- **最近文件列表**：核对字体层级、行高、分隔线颜色；检查“更多”按钮 hover 旋转/放大。
- **滚动或溢出**：确认内容过高时是否需要内部滚动条/自适应。

## DesignMagicBanner（`src/components/DesignMagicBanner.tsx`）
- **标签组**：确保左右胶囊半径与内边距匹配；检查边框透明度与背景色；确认是否需要内阴影/发光。
- **标题区域**：核对字号 32px 是否需在不同屏幕调整；检查是否缺少副标题/描述；确认最大宽度与居中对齐。
- **装饰元素**：如果设计稿含背景渐变/噪点，计划使用 CSS 伪元素实现。

## GenerationShowcase（`src/components/GenerationShowcase.tsx`）
- **左侧步骤卡**：对照数字胶囊大小 46px，圆角、投影；验证卡片透明度、间距及列表 bullet 样式。
- **右侧生成板**：核对整体尺寸 712×620、内边距；确认网格卡片高宽算法与设计稿一致；检查关闭按钮 hover 旋转/变色。
- **提示气泡**：确认标题及描述字体 16px/行高；检查输入框样式是否应该有滚动或截断；评估背景发光 (`radial-gradient`) 是否需要增强。
- **动效**：计划为图片生成卡片添加渐入动画（如 `animate-[fadeIn_400ms_ease]`）；提示气泡或 badge 是否有浮动动效。
- **响应式**：设计稿两版对比 1280px 以下布局是否需改为纵向堆叠；确认断点及顺序。

## CustomDesignPanel（`src/components/CustomDesignPanel.tsx`）
- **主画布**：核对层级阴影、边框色值；确认内部 Layer 列表字体/间距；检查缩略图排列及滚动逻辑（若超出高度）。
- **动作栏**：验证图标尺寸 20px、文字大小 18/16px；为按钮添加 hover 阴影与 `transition`。
- **浮动卡片**：确认按钮圆角、边框色值；若设计稿有轻微漂浮，考虑 `translate-y` 动画。
- **右侧文案卡**：校对图标、字体、段落间距；检查 `bg` 不透明度与描边色。
- **响应式**：1280px 以下是否需要换行；确认 `flex-wrap` 策略；评估移动端是否隐藏/切换顺序。

## StartFromTemplates（`src/components/StartFromTemplates.tsx`）
- **标题块**：核对 46px 数字胶囊大小；检查字体对齐。确保在窄屏时不会溢出。
- **说明卡**：确认图标、文字间距；评估 hover 是否需要 `translate-y-1` 或阴影。
- **圆形信息图**：检查背景方块与发光环的尺寸、透明度；核对 10 个图片气泡位置/层级；必要时引入自定义 CSS 变量统一；确认是否需要 `hover:scale`。
- **响应式**：设计稿小尺寸版是否将信息图缩放或改为水平滚动；制定 Tailwind 断点策略（如 `lg:flex-col`）。

## CallDesignerCollab（`src/components/CallDesignerCollab.tsx`）
- **加载动画**：确认旋转速度与宽度；若需多层渐变，考虑使用 `conic-gradient` 或伪元素。
- **大图卡片**：核对内边距 64px、图片圆角 16px；检查标题字体；确认卡片阴影。
- **浮动标签与指针**：校准旋转角度、位置；评估是否需要 `@keyframes float` 实现轻微漂浮。
- **右侧说明卡**：验证文字层级、段落宽度；hover 是否需 subtle 高亮；CTA 是否缺席。
- **响应式策略**：确认在中屏下是否要改为上下布局；标签与指针是否仍可见。

## CTA（`src/components/CTA.tsx`）
- **发光漩涡**：对比 Figma 中的多层渐变与混合模式，确认当前 CSS 是否需要额外 `mask` 或 `background-blend`。
- **胶囊标签**：检查左右边距、字体 14/16px； hover 时是否需要亮度变化。
- **标题 & 副文案**：核对行高、字重；确保在移动端自动断行且不溢出。
- **主按钮**：补齐 hover（背景亮度+阴影）与 focus（`ring`）效果；确认箭头 icon 颜色；必要时添加轻微动画。

## Footer（`src/components/Footer.tsx`）
- **布局**：检查主容器最大宽度、左右 padding；确认小屏下是否需要换行或居中。
- **品牌信息**：核对字号、行高；考虑是否需要年份自动更新（已实现）以外的分隔符。
- **导航 & 社交**：对比间距、hover 动效；检查社交图标尺寸与颜色；确认是否需要 tooltip。

## 交互与动画通用检查
- 所有可点击元素需具备 hover/focus/active 状态，使用 Tailwind 的 `transition` 与 `duration-200` 以上。
- 动画建议以 `@keyframes` + Tailwind `animate-[...]` 或 `transition-transform` 实现，尽量避免 JS。
- 全局需补充滚动进入时淡入/轻度视差：规划共用 Intersection Observer 钩子或 Tailwind + `@layer` 动画类，针对 Hero、GenerationShowcase 等大区块实现顺滑渐入；视差优先尝试 CSS `transform: translateY` + `scroll-driven animations` 或简单 `data-` 属性配合 JS。

## 资源与资产校验
- 复核 `public/assets/icons` 与 `public/assets/images` 是否齐全，缺失项列出清单。
- 若需要新 SVG，优先尝试 CSS；确需图形则将文件命名与 Figma 一致。

## 后续执行流程建议
1. 逐组件进入 Figma 对应页面对比标注，记录偏差。
2. 使用 Tailwind 调整布局与样式；必要时在组件顶部添加中文时间戳注释标记修改。
3. 针对 hover/动画，先定义全局工具类（`transitionAll` 等），统一风格。
4. 完成每个组件后进行响应式预览（768/1024/1440/1920）。
5. 所有组件完成后统一检查全局背景、字体加载、滚动体验。


