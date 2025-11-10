# Canva-like 页面布局说明

> 更新时间：2025-11-10

## 1. 全局骨架
- src/app/layout.tsx：RootLayout 注入 Inter 字体并在 <body> 添加噪点/粒子伪元素背景，确保整站统一基底与滚动表现。
- src/app/globals.css：追加滚动条渐变、高光描边等全局样式；src/app/fonts.ts 暂时使用 Google 字体占位，后续可切换本地字体。
- src/app/page.tsx：页面主容器按 Header→Hero→AppPreview→DesignMagicBanner→GenerationShowcase→CustomDesignPanel→StartFromTemplates→CallDesignerCollab→CTA→Footer 顺序渲染，宽度随断点调节。

## 2. 公共 UI 与光影
- src/ui.ts：封装常用过渡、按钮、卡片与渐变文字类，组件通过模板字串快速复用。
- src/components/GlowEffect.tsx：集中管理光影背景定位、尺寸与 Next Image 加载策略，所有特效图片统一走该组件，避免重复 CSS。

## 3. 主要分区职责
| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 导航 | Header | 胶囊导航 + 语言切换 + 多端 CTA，使用 	ransitionAll 与 focus-visible 风格。 |
| 首屏 | Hero | NEW 标签、渐变标题、开场文案与 5 列海报排列，CTA 打开在线编辑器。 |
| 体验预览 | AppPreview | 外层玻璃拟态壳体，内部含浏览器工具条、左栏项目导航/配额卡、右侧横幅 + 海报网格 + “最近的文件”表格，数据来源本地数组。 |
| 设计魔法 | DesignMagicBanner | 渐变标题 + 胶囊标签，用于承上启下。 |
| 生成流程 | GenerationShowcase | 左侧序号说明卡，右侧 2×3 生成样图与文字说明，叠加光影。 |
| 自由定制 | CustomDesignPanel | 还原编辑器 UI：图层列表、画布、动作条与浮窗提示，右侧信息卡解释 AI 编辑逻辑。 |
| 模板起步 | StartFromTemplates | 左侧说明 + 右侧泡泡信息图，展示多模板缩略图与发光环。 |
| 设计共创 | CallDesignerCollab | 左侧多层互动卡（呼叫状态、协作者标签、指针），右侧两条说明描述实时协作。 |
| 行动号召 & 底部 | CTA / Footer | CTA 用大圆角卡、发光与主按钮驱动转化；Footer 展示品牌、导航与社交图标。 |

## 4. 资源依赖
- 静态资源分布在 public/assets/icons 与 public/assets/images，多为占位图。上线前需确认文件存在并优化尺寸（可结合 
ext/image）。
- 文字内容含大量中文渐变/高光效果，需确保字体与编码统一（UTF-8），避免出现 �? 字符。

## 5. 风险与注意事项
1. **编码问题**：Header, Hero 等组件存在 �? 乱码，需排查源文件或编辑器编码设置。
2. **资源缺失**：若缺少 PNG/SVG，会导致主要区块空白。建议引入 lint/脚本在构建前校验文件存在。
3. **交互占位**：多数 href="#"、只读输入与空按钮尚未接入真实逻辑，需在接入后统一做可访问性测试。

## 6. 下一步建议
1. 补齐 public/assets 资源并考虑用 Sprite/
ext/image 做懒加载，降低首屏体积。
2. 解决中文乱码并引入更贴合品牌的本地字体。
3. 把 AppPreview、模板/协作区块的数据源抽象为配置或 API 响应，避免硬编码数组。
