# Navbar 导航栏设计规范

> 设计稿链接: [Figma - CanDe Navbar](https://www.figma.com/design/LMZyUJhqXVZy5fgBL015sV/CanDe?node-id=345-4130&m=dev)  
> 节点 ID: 345:4130  
> 最后更新: 2025-11-07

---

## 整体布局

### 容器属性
- **布局方式**: `flex` 水平布局
- **对齐方式**: `items-center justify-between`（垂直居中，左右分布）
- **内边距**: `px-[48px] py-[32px]`
  - 水平内边距: `48px`
  - 垂直内边距: `32px`
- **盒模型**: `box-border`
- **背景色**: 深色背景（继承父级）

### 三栏结构
```
[Logo 区域 - 250px]  [导航菜单 - 自适应]  [操作区域 - 250px]
```

---

## 左侧 Logo 区域

### 容器
- **宽度**: `w-[250px]`
- **高度**: `h-[32px]`
- **布局**: `flex gap-[12px] items-center`
- **对齐**: 左对齐，垂直居中

### Logo 图标
- **尺寸**: 
  - 宽度: `28px`
  - 高度: `25.136px`
- **图标样式**: 紫色渐变六边形星形图标
- **图标资源**: `imgGroup1707483296`

### Logo 文字
- **文本**: "CanDe"
- **字体**: `Inter Semi_Bold` (Inter 字体，半粗体)
- **字号**: `24px`
- **字重**: `font-semibold` (600)
- **颜色**: `#ffffff` (白色)
- **行高**: `leading-none`
- **字间距**: `-0.48px` (紧凑排列)
- **样式**: `not-italic`

---

## 中间导航菜单区域

### 外层容器
- **背景色**: `rgba(255,255,255,0.08)` (半透明白色)
- **边框**: `1px solid #414141` (深灰色)
- **圆角**: `32px` (胶囊形状)
- **内边距**: `p-[5px]`
- **布局**: `flex items-center justify-center`

### 菜单项通用样式
- **字体**: `PingFang_SC Medium` (苹方-中黑)
- **字号**: `14px`
- **颜色**: `#ffffff` (白色)
- **行高**: `1.2`
- **内边距**: `px-[16px] py-[10px]`
  - 水平: `16px`
  - 垂直: `10px`
- **圆角**: `32px`
- **文本**: 不换行 (`whitespace-nowrap`)

### 激活状态 (当前选中项)
- **背景色**: `#171719` (深黑色)
- **示例**: "主页" 按钮

### 未激活状态
- **背景色**: 透明 (继承外层容器背景)
- **示例**: "灵感"、"价格"、"关于"

### 菜单项列表
1. 主页 (激活状态)
2. 灵感
3. 价格
4. 关于

---

## 右侧操作区域

### 容器
- **宽度**: `w-[250px]`
- **布局**: `flex gap-[8px] items-center justify-end`
- **对齐**: 右对齐，垂直居中
- **元素间距**: `8px`

---

### 语言选择器

#### 容器属性
- **高度**: `h-[28px]`
- **内边距**: `px-[8px] py-0`
  - 水平: `8px`
  - 垂直: `0`
- **圆角**: `8px`
- **布局**: `flex gap-[2px] items-center`
- **元素间距**: `2px`

#### 文字部分
- **文本**: "简体中文"
- **字体**: `PingFang_SC Regular` (苹方-常规)
- **字号**: `16px`
- **颜色**: `#ffffff` (白色)
- **行高**: `24.8px`
- **对齐**: 居中
- **样式**: `not-italic whitespace-nowrap`

#### 下拉图标
- **尺寸**: `13px × 13px`
- **图标**: 向下箭头 (Chevron Down)
- **图标资源**: `imgSvg`

---

### 开始使用按钮

#### 容器属性
- **背景色**: `#191919` (深黑色)
- **边框**: `1px solid rgba(255,255,255,0.2)` (半透明白色边框)
- **圆角**: `100px` (完全圆角)
- **内边距**: `px-[20px] py-[14px]`
  - 水平: `20px`
  - 垂直: `14px`
- **布局**: `flex gap-[10px] items-center justify-center`
- **元素间距**: `10px`
- **溢出**: `overflow-clip`

#### 文字部分
- **文本**: "开始使用"
- **字体**: `PingFang_SC Medium` (苹方-中黑)
- **字号**: `18px`
- **颜色**: `#ffffff` (白色)
- **行高**: `1.2`
- **对齐**: 居中
- **样式**: `not-italic`

#### 箭头图标
- **尺寸**: `16.667px × 16.667px`
- **图标**: 右上箭头 (arrow-up-right)
- **颜色**: `rgba(255, 255, 255, 1)` (白色)
- **图标资源**: `img`
- **含义**: 表示跳转或开始操作

---

## 设计变量 (Design Tokens)

### 颜色变量
```css
--text/main/white: #ffffff
--stroke/neutral/soft: #414141
--icon/neutral/white: #ffffff
--background/button/secondary: #191919
```

### 颜色用途映射
| 变量名 | 颜色值 | 用途 |
|-------|--------|------|
| `Text/Main/White` | `#ffffff` | 主要文字颜色 |
| `Stroke/Neutral/Soft` | `#414141` | 导航菜单边框 |
| `Icon/Neutral/White` | `#ffffff` | 图标颜色 |
| `Background/Button/Secondary` | `#191919` | 次要按钮背景 |

### 其他颜色
- **半透明白色背景**: `rgba(255,255,255,0.08)` - 导航菜单容器
- **半透明白色边框**: `rgba(255,255,255,0.2)` - 开始使用按钮边框
- **深黑色背景**: `#171719` - 激活菜单项

---

## 字体规范

### 字体族
1. **Inter**
   - 变体: Semi_Bold
   - 用途: Logo 文字
   - 备用: `sans-serif`

2. **PingFang SC (苹方-简)**
   - 变体: Medium (中黑), Regular (常规)
   - 用途: 导航菜单、按钮、语言选择器
   - 备用: `sans-serif`

### 字号层级
| 元素 | 字号 | 字重 | 行高 | 字间距 |
|-----|------|------|------|--------|
| Logo 文字 | 24px | Semi_Bold | none | -0.48px |
| 按钮文字 | 18px | Medium | 1.2 | - |
| 语言选择器 | 16px | Regular | 24.8px | - |
| 导航菜单 | 14px | Medium | 1.2 | - |

---

## 圆角规范

| 元素 | 圆角值 | 效果 |
|-----|--------|------|
| 导航菜单外层容器 | `32px` | 胶囊形状 |
| 菜单项 | `32px` | 胶囊形状 |
| 开始使用按钮 | `100px` | 完全圆角 |
| 语言选择器 | `8px` | 轻微圆角 |

---

## 间距规范

### 外边距
- Navbar 容器内边距: `48px (水平) / 32px (垂直)`

### 内边距
| 元素 | 水平内边距 | 垂直内边距 |
|-----|-----------|-----------|
| 导航菜单外层 | `5px` | `5px` |
| 菜单项 | `16px` | `10px` |
| 语言选择器 | `8px` | `0` |
| 开始使用按钮 | `20px` | `14px` |

### 元素间距
- Logo 图标与文字: `12px`
- 语言选择器内元素: `2px`
- 右侧操作区元素: `8px`
- 开始使用按钮内元素: `10px`

---

## 交互状态

### 导航菜单项
- **默认状态**: 透明背景，白色文字
- **激活状态**: `#171719` 深色背景，白色文字
- **悬停状态**: (未在设计稿中明确，建议: 轻微背景高亮)

### 按钮
- **默认状态**: `#191919` 背景，`rgba(255,255,255,0.2)` 边框
- **悬停状态**: (未在设计稿中明确，建议: 背景略微变亮或边框加深)
- **按下状态**: (未在设计稿中明确，建议: 轻微缩放或背景变暗)

---

## 响应式设计建议

### 断点建议
- **桌面**: `≥1200px` - 完整布局
- **平板**: `768px - 1199px` - 可能需要调整左右区域宽度
- **移动**: `<768px` - 建议改为汉堡菜单

### 移动端适配
1. Logo 区域和操作区域可缩小宽度
2. 导航菜单可折叠为汉堡菜单
3. 内边距可适当减小 (如: `px-[24px] py-[16px]`)

---

## 资源文件

### 图标资源
1. **Logo 图标**: `imgGroup1707483296` (紫色渐变六边形星形)
2. **下拉箭头**: `imgSvg` (Chevron Down)
3. **跳转箭头**: `img` (Arrow Up Right)

### 资源路径建议
```
public/assets/icons/
  - brand-logo.svg (Logo 图标)
  - chevron-down.svg (下拉箭头)
  - arrow-up-right.svg (跳转箭头)
```

---

## 实现要点

### 关键 CSS 类
```css
/* 容器 */
.navbar-container {
  padding: 32px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 导航菜单 */
.nav-menu {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid #414141;
  border-radius: 32px;
  padding: 5px;
}

.nav-menu-item {
  padding: 10px 16px;
  border-radius: 32px;
  font-size: 14px;
  color: #ffffff;
}

.nav-menu-item.active {
  background: #171719;
}

/* 按钮 */
.cta-button {
  background: #191919;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  padding: 14px 20px;
  font-size: 18px;
  color: #ffffff;
}
```

### 技术栈兼容性
- **React/Next.js**: 完全兼容
- **Tailwind CSS**: 已生成对应的 Tailwind 类名
- **CSS Modules**: 可转换为 CSS Modules 格式
- **Styled Components**: 可转换为 styled-components 格式

---

## 可访问性 (A11y)

### 建议改进
1. 为 Logo 图标添加 `alt` 属性描述
2. 为导航菜单项添加 `aria-current="page"` (激活项)
3. 为按钮添加 `role="button"` 和 `aria-label`
4. 确保键盘导航顺序合理
5. 确保颜色对比度符合 WCAG 2.1 AA 标准

### 对比度检查
- 白色文字 (`#ffffff`) on 深色背景 - ✅ 通过
- 边框 `#414141` on 半透明背景 - 需验证

---

## 备注

1. 设计采用深色主题，适合夜间/暗色模式使用
2. 圆角设计统一，视觉风格现代简洁
3. 中文字体使用苹方，确保在中文环境下显示效果
4. Logo 采用渐变图标，增加品牌识别度
5. 右侧按钮带箭头图标，强调行动号召 (CTA)

---

## 版本记录

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| 1.0 | 2025-11-07 | 初始版本，基于 Figma 设计稿创建 |

