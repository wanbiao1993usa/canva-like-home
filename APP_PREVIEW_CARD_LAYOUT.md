# 预览窗口卡片布局伪代码描述

> **设计来源**: [Figma 设计链接](https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4338&m=dev)  
> **创建时间**: 2025-01-30  
> **描述**: 基于 Figma 设计稿和实际图片，描述 CanDe 应用预览窗口卡片的完整布局结构

---

## 整体结构概览

预览窗口卡片是一个独立的组件，采用深色主题设计，具有圆角和半透明背景效果。整体分为**上下两大部分**：

1. **上方工具行**：包含窗口控制按钮、Logo、搜索功能和用户相关操作
2. **下方主内容区**：进一步分为左右两部分
   - **左侧边栏**：包含 Logo、导航菜单和项目信息卡片
   - **右侧内容区**：从上到下依次是横幅卡片、探索区域（网格海报）和最近文件列表

---

## 关键设计细节

### 颜色系统
- **背景色**：
  - 主容器：`rgba(0,0,0,0.1)` 带 `backdrop-blur-[20.556px]`
  - 侧边栏导航项（激活）：`#292929`
  - 项目卡片：`rgba(36,36,36,0.5)`
  - 内容区：`rgba(36,36,36,0.5)`
- **边框**：`rgba(255,255,255,0.15)` 或 `rgba(255,255,255,0.08)`
- **进度条**：`#b08cf2`（紫色）
- **文字颜色**：白色，不同透明度（`text-white/60`, `text-white/50` 等）

### 间距系统
- **主要间距**：`13.156px`, `19.733px`, `26.311px`
- **小间距**：`6.578px`, `9.867px`, `11.511px`
- **大间距**：`42.756px`（横幅卡片内边距）

### 圆角系统
- **大圆角**：`24px`（主容器）
- **中等圆角**：`13.156px`（卡片、按钮）
- **小圆角**：`9.867px`（导航项、海报卡片）
- **微小圆角**：`8px`（文件缩略图）

### 字体系统
- **品牌名称**：`24px`, `font-semibold`
- **标题**：`14.8px`, `font-semibold`
- **正文**：`13.156px`, `font-medium`
- **小字**：`11.511px`, `font-medium`
- **横幅大标题**：`26.311px`, `font-semibold`

### 布局约束
- **侧边栏宽度**：`240.089px`（固定）
- **内容区高度**：`766.311px`
- **海报卡片高度**：`162.8px`（每行）
- **工具栏高度**：`36.178px`

---

## 组件层级关系

```
AppPreviewCard
├── TopToolbarRow
│   ├── WindowControls (三色圆点)
│   └── RightToolbarActions
│       ├── LogoSection
│       ├── SearchContainer
│       └── IconGroup (通知、设置、头像)
│
├── MainContentArea
│   ├── Sidebar (左侧边栏)
│   │   ├── NavigationMenu
│   │   │   ├── TopNavGroup (主页、探索、我的项目)
│   │   │   ├── SeparatorLine
│   │   │   └── BottomNavGroup (垃圾箱、删除、帮助)
│   │   └── ProjectInfoCard
│   │       ├── ProjectHeader (标题、进度条、重置提示)
│   │       └── ProjectActions (管理计划、升级按钮)
│   │
│   └── ContentMainArea (右侧内容区)
│       ├── BannerCard (横幅卡片)
│       │   ├── BannerIcon (白色圆形 + 星星图标)
│       │   └── BannerText (标题 + 描述)
│       │
│       ├── ExploreSection (探索区域)
│       │   ├── SectionTitle
│       │   └── PosterGrid
│       │       ├── GridRow1 (4个海报卡片)
│       │       └── GridRow2 (4个海报卡片)
│       │
│       └── RecentFilesSection (最近文件)
│           ├── FilesHeader (表头)
│           └── FilesRows (文件行列表)
│               └── FileRow (缩略图 + 文件名 + 元数据 + 操作按钮)
```

---

## 注意事项

1. **响应式设计**：侧边栏在 `xl` 断点以下隐藏（`hidden xl:block`）
2. **交互状态**：导航项支持 `hover` 和 `active` 状态
3. **图片资源**：所有图片资源通过 Figma API 提供，有效期为 7 天
4. **字体**：使用 `Alibaba_PuHuiTi_2.0` 和 `General_Sans` 字体族
5. **主题一致性**：整体采用深色主题，白色文字配不同透明度

---

## 相关文件

- **Figma 设计稿**：[https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4338&m=dev](https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4338&m=dev)
- **实现文件**：`src/components/AppPreview.tsx`

