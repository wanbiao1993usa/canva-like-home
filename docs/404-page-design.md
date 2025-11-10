# 404 页面设计方案

> 创建时间：2025-11-10  
> 文档版本：v1.1（更新于 2025-11-11）

本次修订聚焦于回到主页的核心流程，移除了搜索框、智能推荐、额外导航等扩展功能，仅保留设计稿中出现的元素，确保交付范围可控。

---

## 1. 设计概览

404 页面延续深色主题，通过简洁的视觉层级与品牌紫色按钮，向用户传达“页面不存在”并提供一条明确的返回路径。顶部/底部复用站点既有 Header、Footer，中间以 404 文案 + 放射状星形图标 + CTA 组成。

### 1.1 设计目标
- 维持品牌一致性：深色背景、紫色主按钮、CanDe 图标统一。
- 信息清晰：第一时间展示 404 字样和提示文案。
- 快速引导：提供醒目 CTA 返回首页，不增加额外干扰。
- 体验友好：居中布局、柔和渐变与轻量动画营造温和语气。

### 1.2 页面结构示意
```
┌─────────────────────────────┐
│ Header（复用组件）           │
├─────────────────────────────┤
│                             │
│   4   ※   4                │
│   抱歉，您要找的页面跑丢了    │
│   [回到主页]                │
│                             │
├─────────────────────────────┤
│ Footer（复用组件：含底部导航）│
└─────────────────────────────┘
```

---

## 2. 色彩方案（复用 `tailwind.config.ts`）

### 2.1 背景
- 页面背景：`bg-[#111111]`（secondary-950），继承 RootLayout 的噪点网格纹理。
- 网格纹理：`before:bg-[radial-gradient(circle_at_center,_rgba(200,200,200,0.1)_1px,_transparent_1px)]`，`before:bg-[size:6px_6px]`。

### 2.2 文本
- “404”数字：`text-[#A0A0A0]`，强调与背景的亮度差。
- 星形图标：`text-white`。
- 提示文案：`text-white`。
- 全局正文：默认 `text-[#E5E5E5]`。

### 2.3 按钮
- 背景：`bg-primary`（#AE89FF），Hover：`hover:bg-[#6B4FF0]`。
- 文本：`text-[#191919]`，确保可读性。
- 边距/圆角：沿用 `btnPrimary` 的 `px-6 py-3 rounded-full`.

---

## 3. 组件与资源

### 3.1 复用组件
| 组件 | 文件路径 | 说明 |
|------|----------|------|
| Header | `src/components/common/Header.tsx` | 顶部导航、语言切换、CTA 完整复用。 |
| Footer | `src/components/common/Footer.tsx` | Footer 中已包含底部导航与社交入口，对应设计稿底部文案/图标。 |
| btnPrimary | `src/ui.ts` | 保证按钮色值、圆角和过渡一致。 |

### 3.2 新增资源
- `src/app/not-found.tsx`：Next.js App Router 约定的 404 文件，负责页面主体。
- `src/components/icons/AsteriskBurst.tsx`（或 `/public/icons/asterisk-burst.svg`）：用于中央放射状图案，要求：
  - 12 个均匀的辐射三角形，默认 `160px × 160px`。
  - 使用 `currentColor`，可复用 `text-white`。
  - 提供 `aria-hidden`，并允许 `className` 传入以支持响应式尺寸。

---

## 4. 布局与视觉细节

### 4.1 外层布局
| 层级 | 样式要点 |
|------|----------|
| 根容器 | `min-h-screen flex flex-col bg-[#111111]`，继承背景纹理。 |
| Header 包裹 | `w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-6`，与首页保持一致。 |
| 主内容区域 | `flex-1 flex items-center justify-center px-4`，保证垂直水平居中。 |
| Footer 包裹 | 与 Header 相同的 `max-w` 与 `padding`，直接渲染 Footer 组件。 |

### 4.2 404 核心内容
```tsx
<div className="text-center">
  <h1 className="sr-only">页面未找到 - 404</h1>
  <div className="flex items-center justify-center gap-2 md:gap-4">
    <span className="text-[80px] md:text-[120px] lg:text-[160px] font-bold text-[#A0A0A0] leading-none">4</span>
    <AsteriskBurst className="text-white w-[80px] md:w-[120px] lg:w-[160px]" aria-hidden="true" />
    <span className="text-[80px] md:text-[120px] lg:text-[160px] font-bold text-[#A0A0A0] leading-none">4</span>
  </div>
  <p className="mt-6 md:mt-8 text-white text-base md:text-lg lg:text-xl font-medium">
    抱歉，您要找的页面跑丢了
  </p>
  <Link href="/" className={`${btnPrimary} mt-8 md:mt-10 inline-flex items-center gap-2`} aria-label="返回网站主页">
    回到主页
  </Link>
</div>
```

### 4.3 响应式断点
| 断点 | 字号 | 间距 | 说明 |
|------|------|------|------|
| `<768px` | 数字/图标 `80px` | `gap-2`，`mt-6` | 保证在移动端仍可居中显示。 |
| `768px-1024px` | `120px` | `gap-3`，`mt-7` | 与平板排版一致。 |
| `>1024px` | `160px` | `gap-4`，`mt-8` | 对齐设计稿。 |

---

## 5. 代码结构

### 5.1 文件组织
```
src/
  app/
    layout.tsx            # 已有：提供背景、字体
    not-found.tsx         # 新增：404 页面主体
  components/
    common/
      Header.tsx          # 复用
      Footer.tsx          # 复用（含底部导航、社交入口）
    icons/
      AsteriskBurst.tsx   # 新增图标组件（或改为 SVG 资源）
  ui.ts                   # 已有：btnPrimary 等工具类
```

### 5.2 关键说明
- `not-found.tsx` 引入 Header、Footer 与 `AsteriskBurst`，中间内容保持纯展示逻辑，无状态管理。
- 若 Header 内含 `use client`，整页会成为客户端组件，属于 Next.js 预期行为，对 404 页面影响可忽略。
- 完整代码参考附录；若未来扩展 AB 测试或推荐模块，可在附录示例基础上分层拆分子组件。

---

## 6. 技术要点

1. **Next.js 约定**：`src/app/not-found.tsx` 自动捕获 404；不可在该文件采用默认导出的 `metadata`，避免冲突。
2. **无障碍**：包含 `sr-only` 标题、按钮 `aria-label`，并确保焦点状态与颜色对比达 WCAG AA。
3. **性能/语义**：中间图标建议使用纯 SVG，减少图片资源；背景纹理由 RootLayout 负责，避免重复渲染。

---

## 7. 测试检查清单

- **功能**：访问不存在的地址 -> 正确展示 404；“回到主页”按钮跳转 `/`；Header/Footer 导航可用。
- **视觉**：背景色 `#111111`，星形图标保持纯白；按钮 Hover 变为 `#6B4FF0`。
- **响应式**：375px、768px、1440px 下字号与间距符合 4.3 表格；Footer 始终贴底。
- **无障碍**：屏幕阅读器朗读“页面未找到”；Tab 可聚焦按钮与 Header 链接；颜色对比满足 AA。

---

## 8. 风险与注意事项

| 风险 | 说明 | 规避措施 |
|------|------|----------|
| 编码乱码 | 旧版出现 `?` 字符 | 全文以 UTF-8 保存，避免额外编辑器转换。 |
| 星形图标兼容 | 某些字体下无法显示 `*` | 改用 SVG 组件 `AsteriskBurst`，必要时提供 PNG 兜底。 |
| 布局继承 | `not-found.tsx` 仍会继承 RootLayout 背景 | 不要重复设置 `body` 背景，必要时在 `main` 增加半透明遮罩。 |

---

## 9. 实施步骤

1. 创建 `src/components/icons/AsteriskBurst.tsx`，实现 12 辐射图形。
2. 新建 `src/app/not-found.tsx` 并搭建 flex 布局结构。
3. 引入 Header、Footer，统一 `max-w` 与 `padding`。
4. 按 4.2 的规格实现 404 主视觉与按钮，补全无障碍标记。
5. 走查测试清单，确认 404 页面在主流断点表现一致。

---

## 10. 参考资源

- `docs/layout-overview.md`：全局布局/背景说明。
- `tailwind.config.ts`：颜色与动画变量。
- Next.js 官方文档：[not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)。
- Tailwind 官方文档：[Customizing Colors](https://tailwindcss.com/docs/customizing-colors)。

---

## 附录：完整代码示例

```typescript
// src/app/not-found.tsx
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { btnPrimary } from "@/ui";
import { AsteriskBurst } from "@/components/icons/AsteriskBurst";

/**
 * 404 页面（深色主题）
 * 创建时间：2025-11-10，最近更新：2025-11-11
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-6">
        <Header />
      </div>

      <main
        className="flex-1 flex items-center justify-center px-4"
        role="main"
        aria-label="404 错误页面"
      >
        <div className="text-center">
          <h1 className="sr-only">页面未找到 - 404</h1>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <span className="text-[80px] md:text-[120px] lg:text-[160px] font-bold text-[#A0A0A0] leading-none">
              4
            </span>
            <AsteriskBurst
              className="text-white w-[80px] md:w-[120px] lg:w-[160px]"
              aria-hidden="true"
            />
            <span className="text-[80px] md:text-[120px] lg:text-[160px] font-bold text-[#A0A0A0] leading-none">
              4
            </span>
          </div>
          <p className="mt-6 md:mt-8 text-white text-base md:text-lg lg:text-xl font-medium">
            抱歉，您要找的页面跑丢了
          </p>
          <Link
            href="/"
            className={`${btnPrimary} mt-8 md:mt-10 inline-flex items-center gap-2`}
            aria-label="返回网站主页"
          >
            回到主页
          </Link>
        </div>
      </main>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pb-10">
        <Footer />
      </div>
    </div>
  );
}
```

> 若需重新引入推荐链接、搜索框等功能，可在未来的增强迭代文档中单独说明，本方案暂不包含。
