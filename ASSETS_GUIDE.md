## 资产指引（命名规范与建议尺寸）

仅使用 Tailwind，所有资源放置在 `public/` 下直接通过路径引用。

### 目录
- `public/assets/icons/`：SVG 图标
- `public/assets/images/`：位图/插画（优先 WebP，透明用 PNG）
- `public/fonts/`：自托管字体（.woff2 优先）

### 命名规范
- 统一 `kebab-case`，英文、短语义名：`brand-logo.svg`、`hero-poster-1.webp`
- 结尾可加尺寸/倍率：`@2x`、`-512x384`（二选一，不混用）
- 同组资源用数字或语义后缀：`sticker-01.svg`、`sticker-02.svg`

### 建议尺寸（1440/1920 PC 设计）
- 顶栏 Logo：
  - SVG：`brand-logo.svg`（矢量）
  - 位图备选：`brand-logo@2x.png`，建议画布高 40–48px（2x 导出）
- 导航/操作图标：
  - `24x24`（基准显示），提供 `svg` 或 `48x48@2x` PNG
- Hero 海报卡（横向 5 张）：
  - 单卡显示约 `256x352`（建议 2x 导出：`512x704`）
  - 命名：`hero-poster-01@2x.webp` ... `hero-poster-05@2x.webp`
- App 预览大面板截图：
  - 宽度建议 `1280–1440`，16:10 或 16:9 皆可；首版用 `1440x900`（WebP）
  - 命名：`app-preview-hero-1440x900.webp`
- 创作卡片网格封面：
  - 4:3 比例；显示区约 `256x192`，2x 导出：`512x384`
  - 命名：`creation-card-01-512x384.webp`
- Sticker 云/徽章：
  - 显示 `64x64`；2x 导出 `128x128`（透明背景 PNG 或 SVG）
  - 命名：`sticker-01-128.png`
- 视频展示区封面：
  - 16:9；`1280x720`（WebP/PNG），视频文件可后续替换
  - 命名：`video-cover-1280x720.webp`
- 社媒/品牌徽标：
  - 单色/双色 SVG 优先；若位图，`160x40`（2x 导出 `320x80`）

### 放置示例
```
public/
  assets/
    icons/
      brand-logo.svg
      play.svg
    images/
      hero-poster-01@2x.webp
      app-preview-hero-1440x900.webp
      creation-card-01-512x384.webp
      sticker-01-128.png
    fonts/
      YourFont-Regular.woff2
      YourFont-Semibold.woff2
```

### 备注
- 若导出字体受限，请提供允许自托管的字重（Regular/Medium/Semibold/Bold）。
- 所有资源提交后无需额外构建步骤，直接可被页面引用。

### 接入本地字体（提交字体后我会切换）
当前临时使用 Google 字体占位（见 `src/app/fonts.ts`）。当你把字体放入 `public/fonts/` 后，可改为本地字体：

```ts
// src/app/fonts.ts
import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    { path: "../../public/fonts/YourFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/YourFont-Medium.woff2",  weight: "500", style: "normal" },
    { path: "../../public/fonts/YourFont-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/YourFont-Bold.woff2",    weight: "700", style: "normal" }
  ],
  display: "swap"
}).className;
```



