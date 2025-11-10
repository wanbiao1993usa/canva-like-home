# 社区作品集页面设计说明（2025-11-10 更新）

## 1. 页面概览
- **内容宽度**：固定 1440px 居中，继承 `layout.tsx` 的深色背景与噪点纹理，无需新增背景设定。
- **复用模块**：顶部导航与页脚直接复用 `common/Header` 与 `common/Footer`，新页面只需实现 Hero 引导、筛选条、作品瀑布流（含加载更多）。
- **目录结构**：`src/components` 下新增 `inspiration/`，存放灵感页组件；原主页相关组件放入 `home/`，通用组件放入 `common/`，保持三层清晰分工。

## 2. Hero 引导区（建议文件：`inspiration/HeroIntro.tsx`）
- **元素**：标题「社区作品集」+ 副标题说明 + 主 CTA（“开始创作”）+ 辅助链接（暂定“查看排行榜”），不再展示位置标签。
- **样式**：
  - 背景沿用全局暗色，可叠加淡紫径向光晕。
  - 标签为白底半透明圆角 pill，含定位 icon。
  - CTA 使用 Primary 渐变 `linear-gradient(107deg, #AE89FF 11.55%, #414BFF 88.45%)`，圆角 999px。
  - 文案区域宽约 720px，整体居中，竖直间距 16px。

## 3. 筛选条（建议文件：`inspiration/FilterBar.tsx`）
- **控件**：分类下拉（全部/摄影/插画…）、宽度固定 480px 的搜索框、筛选标签（热门/最新/收藏）、图标按钮（排序、设置）。
- **交互**：仅做静态展示，不接入业务逻辑；仍需在样式上提供基础 hover 反馈，便于后续接入。
- **视觉**：容器宽 1440px，深灰 80% 透明度背景，圆角 24px，内边距 16px，控件间距 12px。

## 4. 作品瀑布流（含加载更多，建议文件：`inspiration/GalleryGrid.tsx`）
- **布局**：列宽固定 220px，列间距 24px，行间距 24px。每列可以放置 320/280/220px 高度的卡片，依据设计布局交错。整体只需静态展示，不接入真实数据。
- **卡片**：圆角 28px，1px 白色/10% 边框，轻投影；Hover 时整体放大 1.5%，浮出收藏/分享按钮与作品标题信息。
- **数据**：本阶段使用静态占位数据，加载更多按钮亦为静态元素（无请求逻辑），点击无实际动作。

## 5. 调色与字体（沿用主题配置）
- **主色**：Primary 渐变与纯色 `#AE89FF`、`#414BFF` 用于 CTA、标签、高亮文本。
- **辅色**：`#111111`、`#191919`、`#2C2C2C`、`#3E3C3C`、`#929292`；字体颜色根据重要性分 100%、70%、50%。
- **字体**：中文无衬线/思源系 + 英文 Grotesk，标题 700，副标题 500，正文 400。

## 6. 交互与动画
- Hero CTA、筛选控件、卡片 hover 统一使用 200ms ease-out 过渡。
- 筛选/搜索需展示加载骨架或空状态文案。
- 瀑布流可引入 Intersection Observer 支持懒加载。

## 7. 资源与占位
- 作品卡片静态数据字段：`id`、`title`、`cover`, `creator`, `category`, `liked`。
- 图标引用 `public/assets/icons`；若无排序/设置图标，可在该目录新增。
- 背景纹理依赖全局 `layout.tsx` 与 `globals.css`，灵感页面不再重复。

## 8. 子任务拆分（按文件）
1. `src/components/common`  
   - 已完成：Header、Footer 划归 `common/`。后续若有导航变更，在此目录维护。
2. `src/components/home`  
   - 已完成：主页组件迁移至 `home/`，保持与灵感页解耦。
3. `src/components/inspiration/HeroIntro.tsx`  
   - 新建组件，输出标题、副标题、渐变 CTA 与辅助链接，遵循 1440px 宽度与全局背景。
4. `src/components/inspiration/FilterBar.tsx`  
   - 静态实现分类下拉、480px 搜索框、标签切换与图标按钮；仅含 UI，未接入逻辑。
5. `src/components/inspiration/GalleryGrid.tsx`  
   - 构建 220px 卡片宽、24px 间距的瀑布流，使用静态占位数据；包含「加载更多」按钮但不触发请求。
6. `src/app/inspiration/page.tsx`（待建）  
   - 组合 Header/Footer（复用）、HeroIntro、FilterBar、GalleryGrid；控制容器宽度 1440px 并设置必要的节距。
7. `docs/community-gallery-design.md`  
   - 持续记录设计决定与任务拆分，作为开发对照基准。
