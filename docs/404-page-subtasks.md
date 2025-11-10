# 404 页面编码子任务

> 依据 `docs/404-page-design.md` v1.1，聚焦「深色背景 + 中央 404 主视觉 + Header/Footer 复用」的实现范围。

## 范围说明
- 仅交付 `src/app/not-found.tsx` 页面与配套的放射状星形图标资源。
- 设计稿中的底部导航、社交入口完全由既有 `Footer` 组件提供，不再额外编码自定义导航。
- 本轮不实现推荐链接、搜索框、智能推荐等增强特性；如需追加，另起迭代。

## 子任务清单

1. **准备素材与依赖**
   - 校验 `btnPrimary`、颜色变量、背景纹理均已在 `tailwind.config.ts` 与 `src/ui.ts` 中声明；若缺失需同步补齐。
   - 确认 `Header`、`Footer` 组件的导入路径、依赖（如 `use client`）以及可直接在 App Router 中复用。
   - *依赖*：无；*产出*：完成依赖核对记录，确保后续开发无需中途回滚配置。

2. **实现 `AsteriskBurst` 图标资源**
   - 建议路径：`src/components/icons/AsteriskBurst.tsx`，导出支持 `className`、`aria-hidden` 的 React 组件；或在 `/public/icons` 下提供等比例 SVG 并封装导出。
   - 图形需包含 12 个均匀辐射的三角形或矩形扇叶，默认尺寸 160×160px，允许通过外部 class 调整。
   - *依赖*：任务 1；*产出*：可复用的图标组件（含 TSX 与样式）。

3. **搭建 `not-found.tsx` 基础结构**
   - 位置：`src/app/not-found.tsx`。引入 `Header`、`Footer`、`btnPrimary`、`AsteriskBurst`。
   - 构建根容器 `min-h-screen flex flex-col bg-[#111111]`，保证背景纹理沿用 RootLayout；为 Header/Footer 区域设置与首页一致的 `max-w` 与 `padding`。
   - *依赖*：任务 2；*产出*：页面骨架（无 404 主视觉内容）。

4. **实现 404 主视觉与交互**
   - 在 `main` 内加入数字 “4 + AsteriskBurst + 4”、提示文案与 CTA，使用设计指定的字号、间距及颜色。
   - `Link` 复用 `btnPrimary`，按钮文案「回到主页」，添加 `aria-label`。
   - 提供 `sr-only` 的 `<h1>`，并确保星形图标 `aria-hidden`；维持响应式规格（80/120/160px、`gap-2/3/4`）。
   - *依赖*：任务 3；*产出*：完整的 404 内容区域。

5. **无障碍与细节校验**
   - 检查 `main` 的 `role`、`aria-label`、焦点可达性、Hover 色值与对比度；必要时補充 `transition` 或 `prefers-reduced-motion` 处理。
   - 确认背景、按钮及文本均未重复定义，避免与 RootLayout 冲突；验证 `Footer` 复用后仍显示底部导航与社交图标。
   - *依赖*：任务 4；*产出*：QA 自检记录或注释，说明无障碍与视觉细节已验证。

6. **功能/视觉测试与验收**
   - 手工访问不存在的路由，确认 404 页面自动渲染；检查桌面/平板/移动端断点。
   - 覆盖测试清单：按钮跳转、Header/Footer 链接、颜色/动画、Tab 顺序、屏幕阅读器朗读。
   - *依赖*：任务 5；*产出*：测试结果（可在 PR 描述或 checklist 中列明通过项）。

> 执行顺序可按编号推进；若需并行，务必确保任务 2（图标）与任务 3（骨架）完成后再处理主视觉与测试。
