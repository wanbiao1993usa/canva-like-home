# Change Log

## 2025-10-29
- 新增并调整 `src/components/DesignMagicBanner.tsx`（原 `FeatureHighlight.tsx`），按 Figma (node 345-4559) 恢复背景渐变、描边、胶囊标签排版以及 32px 标题排版，实现精确还原。
- 更新 `src/app/page.tsx`，在 `AppPreview` 组件之后渲染 `DesignMagicBanner`，保持页面结构与命名一致。
- 新增 `src/components/GenerationShowcase.tsx`，基于 Figma (node 345-4563) 实现“生成流程演示”：左侧步骤与要点卡片、右侧生成结果面板与提示气泡，并插入于 `DesignMagicBanner` 之后。
- 资源前缀调整：为避免冲突，复制并重命名图片为 `gen-showcase-01~06.png`，更新 `GenerationShowcase` 内的引用。
- 新增 `src/components/CustomDesignPanel.tsx`，基于 Figma (node 345-4674) 完整还原：左侧 720×598 编辑器与层级栏、底部动作栏以及右侧说明卡片；新增占位资源前缀 `custom-design-*` 并在页面接入。


