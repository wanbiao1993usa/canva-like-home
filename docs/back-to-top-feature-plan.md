# 返回顶部功能实现方案

## 背景与目标
- 目前各页面内容较长（Hero、Gallery、Pricing、Contact 等组合），缺少全局的快速回顶能力，降低了深度浏览时的效率与 SEO 评分中的「易用性」维度。
- 目标：在所有 `[locale]` 页面提供一致的「返回顶部」浮动按钮，兼顾国际化、无障碍体验以及暗色主题的一致视觉。

## 交互与表现
| 维度 | 方案 |
| --- | --- |
| 触发阈值 | 滚动距离超过 `window.innerHeight * 0.6` 时进入「显示」状态；小于该阈值时隐藏。 |
| 展示位置 | 右下角，紧贴栅格安全区：`bottom: 32px`、`right: clamp(16px, 4vw, 40px)`，兼容移动端。 |
| 尺寸与样式 | 56×56px 圆角按钮，背景 `rgba(17,17,17,0.85)`，边框 1px `rgba(255,255,255,0.12)`，内发光渐变呼应现有霓虹风格。Hover/Focus 切换为 `#AE89FF→#6B4FF0` 渐变。 |
| 图标 | 使用 `lucide-react` 中的 `ArrowUp`，大小 20px，默认 `#F6F6F6`。 |
| 反馈 | 点击后调用 `window.scrollTo({ top: 0, behavior: "smooth" })`；若 `prefers-reduced-motion` 为真，则使用 `window.scrollTo({ top: 0 })`。 |
| 动画 | 使用 `opacity` + `translate-y` 过渡（Tailwind：`transition-all duration-300 ease-out`），隐藏时 `pointer-events: none`。 |
| 无障碍 | 提供 aria-label（如 `dictionary.layout.backToTop`），并允许键盘 `Enter/Space` 触发；Focus ring 使用 `outline: 2px solid #D0B3FF`。 |

## 技术实现
### 组件结构
```
src/components/common/BackToTopButton.tsx
```
- `use client` 组件。
- `threshold`（默认 `0.6`）和 `offsetPx` 可选 prop，方便未来微调。
- 内部状态：
  - `isVisible`: 根据 `scrollY` 是否超过阈值控制。
  - `isReducedMotion`: 读取 `matchMedia("(prefers-reduced-motion: reduce)")`。
- 逻辑：
  1. `useEffect` 注册 `scroll` 监听，使用 `requestAnimationFrame` + 最小间隔 150ms 减少触发频率。
  2. `useEffect` 注册 `matchMedia` 监听，随系统设置变化更新。
  3. 点击按钮执行 `window.scrollTo`，并在完成后可选触发 `toast`/`console`（暂不需要）。
- 样式：以内联 Tailwind 类为主，若需要可在 `globals.css` 添加 `.back-to-top-shadow` 自定义阴影。

### 页面集成
1. 在 `src/app/[locale]/layout.tsx` 中引入 `BackToTopButton`，让其位于 `ToastProvider` 内层与 `{children}` 并列，保持全局可用：
   ```tsx
   <ToastProvider>
     <div className="relative z-10">{children}</div>
     <BackToTopButton dictionary={dictionary.layout.backToTop} />
   </ToastProvider>
   ```
2. 为避免按钮遮挡，需要留出 `pointer-events-none` 包裹层或给按钮设置 `z-50` 并添加 `drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]`。
3. 如部分页面还有固定底部元素，可在页面参数中传递额外的 `bottomOffset`。

### 国际化字典
- `messages/zh-CN.json`
  ```json
  {
    "layout": {
      "backToTop": "返回顶部",
      "backToTopAria": "返回页面顶部"
    }
  }
  ```
- `messages/en-US.json`
  ```json
  {
    "layout": {
      "backToTop": "Back to top",
      "backToTopAria": "Back to the beginning of the page"
    }
  }
  ```
- `dictionary.layout.backToTop` 用于按钮文本（可隐藏，仅用于 aria/tooltip）。

## 无障碍与性能考量
- 键盘支持：`role="button"` + `tabIndex={0}`（div）或直接使用 `<button>`。
- 屏幕阅读器：aria-label + `aria-live="off"`，避免重复播报。
- 监听解绑：在组件卸载时移除 scroll/media query listener，防止内存泄漏。
- SSR 兼容：组件内部在 `typeof window !== "undefined"` 后再访问浏览器 API，初始状态设为 `false` 避免 hydration mismatch。

## 验收要点
1. 任何页面滚动超过阈值时按钮出现，点击后平滑滚回顶部。
2. 浮层不遮挡右下角 Toast/Dropdown，可与 Header/Footer 共存。
3. 国际化文案随 locale 切换，且 aria-label 正确。
4. `prefers-reduced-motion` 时滚动无动画。
5. 通过移动端（≤640px）与桌面端（≥1280px）双端自测，确认不会与主内容重叠。

## 后续测试建议
- 单元测试：使用 Jest + `@testing-library/react` 对滚动阈值与按钮点击行为做 hook 级测试（需要为组件拆出 `useBackToTop` 自定义 hook）。
- 手动测试：DevTools 模拟 `prefers-reduced-motion` 以及高对比度模式，确保按钮可见。

> 待你确认方案后，再按以上步骤拆分编码子任务并进入实现阶段。
