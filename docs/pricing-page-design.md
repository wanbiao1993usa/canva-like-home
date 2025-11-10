# 定价页面（Pricing Page）前端编码方案

> 创建时间：2025-11-10
> 
> 状态：待审批

## 1. 概述

本文档描述定价页面的前端实现方案，包括布局模块分割、组件职责划分、样式规范和技术细节。

### 1.1 设计稿来源
- 定价页面设计稿（深色主题）
- 包含：导航、定价卡片、FAQ、CTA、页脚等模块

### 1.2 技术栈
- **框架**：Next.js 14+ (App Router)
- **样式**：Tailwind CSS
- **语言**：TypeScript
- **字体**：PingFang SC / Inter

---

## 2. 页面整体布局

### 2.1 路由与文件结构
```
src/
  app/
    pricing/
      page.tsx              # 定价页主入口
  components/
    common/
      Header.tsx            # 复用现有导航
      Footer.tsx            # 复用现有页脚
    pricing/
      PricingHero.tsx       # 顶部说明区
      PricingCards.tsx      # 定价卡片容器
      PricingCard.tsx       # 单个定价卡片
      FAQSection.tsx        # FAQ 容器
      FAQItem.tsx           # 单个 FAQ 项
      PricingCTA.tsx        # 底部行动号召
```

### 2.2 页面层级结构
```tsx
<main className="容器样式">
  <Header />              {/* 复用 */}
  <PricingHero />         {/* 新建 */}
  <PricingCards />        {/* 新建 */}
  <FAQSection />          {/* 新建 */}
  <PricingCTA />          {/* 新建 */}
  <Footer />              {/* 复用 */}
</main>
```

### 2.3 容器宽度规范
- 遵循主页的断点规则：
  ```tsx
  max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px]
  px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px]
  ```

---

## 3. 模块分解与职责

### 3.1 PricingHero（定价页顶部说明区）

#### 3.1.1 职责
- 展示页面主标题和副标题
- 显示紫色胶囊标签（"产品价格 · 让品质触手可及"）
- 提供页面内容概述

#### 3.1.2 布局结构
```
┌─────────────────────────────────────┐
│    [胶囊标签: 产品价格 · 让...]      │
│                                       │
│    选择你的创意之旅 (大标题)         │
│                                       │
│    从免费开始，根据需求... (副标题)  │
└─────────────────────────────────────┘
```

#### 3.1.3 关键样式
- **胶囊标签**：
  - 背景：`bg-[#AE89FF]/10`
  - 边框：`border border-[#AE89FF]/30`
  - 文字：`text-[#AE89FF]`
  - 圆角：`rounded-full`
  - 内边距：`px-4 py-2`

- **主标题**：
  - 渐变文字（复用 `gradentText` 工具类）
  - 字号：`text-4xl lg:text-5xl xl:text-6xl`
  - 字重：`font-bold`

- **副标题**：
  - 颜色：`text-white/70`
  - 字号：`text-base lg:text-lg`

#### 3.1.4 间距
- 上边距：`mt-16 lg:mt-24`
- 下边距：`mb-16 lg:mb-20`
- 内部间距：标签与标题 `mt-6`，标题与副标题 `mt-4`

---

### 3.2 PricingCards（定价卡片区）

#### 3.2.1 职责
- 渲染三档定价卡片（免费、专业版、企业版）
- 管理卡片数据源
- 处理响应式布局

#### 3.2.2 布局结构
```
┌──────────┬──────────┬──────────┐
│  免费版  │ 专业版   │ 企业版   │
│  $0/月   │ $29/月   │ $99/月   │
│  [特性]  │ [特性]   │ [特性]   │
│  [按钮]  │ [按钮]   │ [按钮]   │
└──────────┴──────────┴──────────┘
```

#### 3.2.3 数据结构（TypeScript）
```typescript
type PricingTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;  // 是否为热门推荐
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
};

const pricingData: PricingTier[] = [
  {
    id: 'free',
    name: '免费',
    price: 0,
    period: '月',
    description: '非常适合入门，零基础也能立即使用',
    features: [
      '每日5次AI生成',
      '基础模版',
      '1GB存储空间',
      '社区支持'
    ],
    ctaText: '开始使用',
    ctaVariant: 'secondary'
  },
  // ... 其他档位
];
```

#### 3.2.4 响应式布局
- **桌面端（lg+）**：三列等宽，`grid-cols-3`
- **平板端（md）**：三列紧凑或两列换行
- **移动端（<md）**：单列堆叠，`grid-cols-1`
- 卡片间距：`gap-6 lg:gap-8`

#### 3.2.5 容器样式
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-28"
```

---

### 3.3 PricingCard（单个定价卡片）

#### 3.3.1 Props 定义
```typescript
interface PricingCardProps {
  tier: PricingTier;
}
```

#### 3.3.2 布局结构
```
┌─────────────────────────┐
│ 专业版 [热门精选]       │  ← 标题 + 标签（可选）
│                          │
│ $29/月                   │  ← 价格
│                          │
│ 最适合专业人士...       │  ← 描述
│                          │
│ ✓ 无限次AI生成          │  ← 特性列表
│ ✓ 高级模版              │
│ ✓ ...                   │
│                          │
│ [开始使用]              │  ← CTA 按钮
└─────────────────────────┘
```

#### 3.3.3 卡片容器样式
- **基础样式**：
  ```tsx
  rounded-3xl bg-[#1A1A1C] border border-[#2D2D2F] p-8
  ```
- **高亮卡片（专业版）**：
  ```tsx
  border-[#AE89FF]/50 shadow-[0_0_40px_rgba(174,137,255,0.15)]
  ```
- **悬停效果**：
  ```tsx
  hover:border-[#AE89FF]/30 transition-all duration-300
  ```

#### 3.3.4 内部元素样式

##### 标题区
- **档位名称**：
  ```tsx
  text-2xl font-bold text-white mb-2
  ```
- **热门标签**（仅专业版）：
  ```tsx
  inline-block bg-[#AE89FF] text-[#191919] text-xs font-semibold 
  px-3 py-1 rounded-full ml-2
  ```

##### 价格区
```tsx
<div className="flex items-baseline gap-1 mb-4">
  <span className="text-5xl font-bold text-white">${price}</span>
  <span className="text-xl text-white/60">/{period}</span>
</div>
```

##### 描述文字
```tsx
<p className="text-white/70 text-sm mb-6">
  {description}
</p>
```

##### 特性列表
```tsx
<ul className="space-y-3 mb-8">
  {features.map(feature => (
    <li key={feature} className="flex items-start gap-3">
      <svg className="w-5 h-5 text-[#AE89FF] flex-shrink-0 mt-0.5">
        {/* 对勾图标 */}
      </svg>
      <span className="text-white/90 text-sm">{feature}</span>
    </li>
  ))}
</ul>
```

##### CTA 按钮
- **主要按钮（专业版）**：
  ```tsx
  bg-[#AE89FF] hover:bg-[#9B76E4] text-[#191919]
  ```
- **次要按钮（免费版/企业版）**：
  ```tsx
  bg-[#2D2D2F] hover:bg-[#3D3D3F] text-white
  ```
- **通用样式**：
  ```tsx
  w-full py-3 rounded-full font-semibold text-base
  transition-all duration-200
  ```

---

### 3.4 FAQSection（常见问题解答区）

#### 3.4.1 职责
- 展示常见问题列表，保持与设计稿一致的排版层级
- **2025-11-10 19:30**：当前仅输出静态内容，默认首条按展开样式，其余保持折叠视觉；折叠/动画行为待下一阶段恢复

#### 3.4.2 布局结构
```
┌───────────────────────────────────┐
│  常见问题解答 (标题)              │
│  这里汇集了关于... (副标题)       │
│                                    │
│  ┌─────────────────────────────┐  │
│  │ 生成的海报可以商用吗？     ▼│  │ ← 展开状态
│  │ 详细答案内容...             │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │ AI生成需要多长时间？       +│  │ ← 折叠状态
│  └─────────────────────────────┘  │
│  ...                               │
└───────────────────────────────────┘
```

#### 3.4.3 当前阶段约束
- 不引入 `useState` / `useEffect`，直接基于数据渲染静态内容
- 可在数据里增加 `defaultOpen` 标记，控制首条展开、其余保持折叠视觉
- `FAQItem` 组件仍保留 `isOpen` / `onToggle` Props，但此阶段传入常量即可，方便后续升级

> 需要交互时，再恢复 `openIndex` 状态管理与切换逻辑

#### 3.4.4 数据结构
```typescript
type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: '生成的海报可以商用吗？版权归谁？',
    answer: '是的，您可以将生成的海报用于商业用途。版权归属于您，无需支付额外费用。您可以自由修改、分发和使用生成的设计作品。'
  },
  // ... 更多问题
];
```

#### 3.4.5 容器样式
```tsx
<section className="mb-20 lg:mb-28">
  <div className="text-center mb-12">
    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
      常见问题解答
    </h2>
    <p className="text-white/70 text-lg max-w-2xl mx-auto">
      这里汇集了关于CanDe、AI技术以及如何助您设计海报的常见问题答案
    </p>
  </div>
  
  <div className="max-w-3xl mx-auto space-y-4">
    {faqData.map((item, index) => (
      <FAQItem 
        key={item.id}
        item={item}
        isOpen={openIndex === index}
        onToggle={() => handleToggle(index)}
      />
    ))}
  </div>
</section>
```

---

### 3.5 FAQItem（单个FAQ项）

#### 3.5.1 Props 定义
```typescript
interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}
```

#### 3.5.2 布局结构
```tsx
<div className="border border-[#2D2D2F] rounded-2xl bg-[#1A1A1C] overflow-hidden">
  {/* 问题标题（可点击） */}
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
  >
    <span className="text-lg font-semibold text-white pr-8">
      {item.question}
    </span>
    <span className="text-2xl text-white/60 flex-shrink-0">
      {isOpen ? '×' : '+'}
    </span>
  </button>
  
  {/* 答案内容（条件渲染） */}
  {isOpen && (
    <div className="px-6 pb-6 text-white/70 text-base leading-relaxed">
      {item.answer}
    </div>
  )}
</div>
```

#### 3.5.3 动画（阶段二再启用）
- 本阶段不实现开合动画，直接渲染静态文本，保持首条展开视觉即可
- 待交互功能恢复时，再视情况选择 `max-height + opacity` 或 `framer-motion` 等方案

---

### 3.6 PricingCTA（底部行动号召）

#### 3.6.1 职责
- 引导用户注册/开始使用
- 提供明确的行动按钮
- 增强转化率

#### 3.6.2 布局结构
```
┌───────────────────────────────────┐
│  [开始吧！加入创意革命！]        │  ← 胶囊标签
│                                    │
│  准备好释放你的构想了吗？        │  ← 主标题
│                                    │
│  分享你的想法，看着AI...         │  ← 副标题
│                                    │
│  [开始使用 →]                     │  ← CTA按钮
└───────────────────────────────────┘
```

#### 3.6.3 容器样式
```tsx
<section className="mb-20 lg:mb-28">
  <div className="
    relative 
    rounded-3xl 
    bg-gradient-to-br from-[#1A1A1C] to-[#2D2D2F]
    border border-[#3D3D3D]
    p-12 lg:p-16
    text-center
    overflow-hidden
  ">
    {/* 背景光晕效果（可选） */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(174,137,255,0.08),transparent_70%)]" />
    
    {/* 内容 */}
    <div className="relative z-10">
      {/* 胶囊标签 */}
      <div className="inline-block bg-[#AE89FF]/10 border border-[#AE89FF]/30 text-[#AE89FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
        开始吧！加入创意革命！
      </div>
      
      {/* 标题 */}
      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
        准备好释放你的构想了吗？
      </h2>
      
      {/* 副标题 */}
      <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
        分享你的想法，看着AI将它转化为惊艳海报！
      </p>
      
      {/* CTA 按钮 */}
      <button className="
        inline-flex items-center gap-2
        bg-[#AE89FF] hover:bg-[#9B76E4]
        text-[#191919] font-semibold
        px-8 py-4 rounded-full
        transition-all duration-200
        shadow-[0_8px_24px_rgba(174,137,255,0.3)]
        hover:shadow-[0_12px_32px_rgba(174,137,255,0.4)]
      ">
        <span>开始使用</span>
        <svg>{ /* 右上箭头图标 */ }</svg>
      </button>
    </div>
  </div>
</section>
```

---

## 4. 复用的公共组件

### 4.1 Header
- **文件位置**：`src/components/common/Header.tsx`
- **复用方式**：直接引入，但需同步更新导航配置
- **注意事项**：
  - **2025-11-10 19:30**：将 `navItems` 中 `pricing` 的 `href` 与 `matchPath` 同步改为 `/pricing`，否则仍会跳回首页锚点
  - 高亮逻辑沿用 `pathname.startsWith('/pricing')` 即可，保证“定价”按钮在本页保持激活态

### 4.2 Footer
- **文件位置**：`src/components/common/Footer.tsx`
- **复用方式**：直接引入，无需修改
- **建议**：可考虑将导航链接统一为配置项，避免重复维护

---

## 5. 样式规范

### 5.1 色彩系统
| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主背景 | `#0A0A0B` | 页面底色（已在 globals.css 定义） |
| 卡片背景 | `#1A1A1C` | 深色卡片 |
| 边框 | `#2D2D2F` | 常规边框 |
| 强调边框 | `#AE89FF` | 主色边框（高亮卡片） |
| 主色 | `#AE89FF` | 品牌紫色（按钮、标签） |
| 主色悬停 | `#9B76E4` | 按钮悬停态 |
| 主文本 | `#FFFFFF` | 标题、正文 |
| 次文本 | `rgba(255,255,255,0.7)` | 描述性文字 |
| 弱文本 | `rgba(255,255,255,0.6)` | 辅助信息 |

### 5.2 字号体系
```css
/* 标题 */
text-6xl: 60px   /* Hero 大标题 */
text-5xl: 48px   /* Section 标题 */
text-4xl: 36px   /* 子标题 */
text-2xl: 24px   /* 卡片标题 */

/* 正文 */
text-lg: 18px    /* 副标题、描述 */
text-base: 16px  /* 正文 */
text-sm: 14px    /* 小字 */
text-xs: 12px    /* 标签 */
```

### 5.3 间距规范
```css
/* 上下边距 */
mb-28: 7rem      /* Section 大间距 */
mb-20: 5rem      /* Section 中间距 */
mb-12: 3rem      /* 标题与内容间距 */
mb-8:  2rem      /* 元素间距 */
mb-6:  1.5rem    /* 小间距 */
mb-4:  1rem      /* 紧凑间距 */

/* 内边距 */
p-16: 4rem       /* CTA 大内边距 */
p-12: 3rem       /* CTA 中内边距 */
p-8:  2rem       /* 卡片内边距 */
p-6:  1.5rem     /* FAQ 内边距 */
```

### 5.4 圆角规范
```css
rounded-full: 9999px  /* 胶囊按钮、标签 */
rounded-3xl:  24px    /* 大卡片、CTA */
rounded-2xl:  16px    /* 常规卡片、FAQ */
rounded-xl:   12px    /* 小卡片 */
```

### 5.5 阴影规范
```css
/* 卡片阴影 */
shadow-none                                           /* 默认 */
shadow-[0_0_40px_rgba(174,137,255,0.15)]             /* 高亮卡片 */

/* 按钮阴影 */
shadow-[0_8px_24px_rgba(174,137,255,0.3)]            /* 主按钮 */
hover:shadow-[0_12px_32px_rgba(174,137,255,0.4)]     /* 主按钮悬停 */
```

---

## 6. 响应式断点

### 6.1 Tailwind 断点
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 6.2 各模块响应式策略

#### PricingHero
- 标题字号：`text-4xl lg:text-5xl xl:text-6xl`
- 副标题字号：`text-base lg:text-lg`
- 垂直间距：`mt-16 lg:mt-24`

#### PricingCards
- 布局：
  - `<md`: 单列 `grid-cols-1`
  - `md-lg`: 两列或三列紧凑 `grid-cols-2 lg:grid-cols-3`
  - `lg+`: 三列 `grid-cols-3`
- 卡片间距：`gap-6 lg:gap-8`

#### FAQSection
- 标题字号：`text-4xl lg:text-5xl`
- 容器宽度：`max-w-3xl mx-auto`
- 项间距：`space-y-4`

#### PricingCTA
- 内边距：`p-12 lg:p-16`
- 标题字号：`text-4xl lg:text-5xl`
- 按钮：保持固定尺寸，中等屏幕以下可考虑 `w-full`

---

## 7. 交互与动画

### 7.1 按钮交互
```tsx
// 主按钮（紫色）
className="
  bg-[#AE89FF] hover:bg-[#9B76E4]
  transition-all duration-200
  hover:shadow-[0_12px_32px_rgba(174,137,255,0.4)]
  active:scale-95
"

// 次要按钮（深色）
className="
  bg-[#2D2D2F] hover:bg-[#3D3D3F]
  transition-all duration-200
  active:scale-95
"
```

### 7.2 卡片悬停
```tsx
className="
  border border-[#2D2D2F]
  hover:border-[#AE89FF]/30
  transition-all duration-300
  hover:-translate-y-1
"
```

### 7.3 FAQ 展开动画（阶段二预留）
> 当前静态版本不启用 FAQ 开合动画。待后续接入交互时，可重新评估是使用 `max-height + opacity` 还是 `transform` 方案，以避免与性能注意事项冲突。

---

## 8. 数据管理

### 8.1 定价数据（pricingData）
```typescript
// src/components/pricing/PricingCards.tsx
const pricingData: PricingTier[] = [
  {
    id: 'free',
    name: '免费',
    price: 0,
    period: '月',
    description: '非常适合入门，零基础也能立即使用',
    features: [
      '每日5次AI生成',
      '基础模版',
      '1GB存储空间',
      '社区支持'
    ],
    ctaText: '开始使用',
    ctaVariant: 'secondary'
  },
  {
    id: 'professional',
    name: '专业版',
    price: 29,
    period: '月',
    description: '最适合专业人士，解锁全部高级功能',
    features: [
      '无限次AI生成',
      '高级模版',
      '50GB存储空间',
      '优先支持',
      '团队协作',
      '高级编辑工具'
    ],
    highlighted: true,  // 热门推荐
    ctaText: '开始使用',
    ctaVariant: 'primary'
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: 99,
    period: '月',
    description: '适合大型团队，统一管理，高效协同',
    features: [
      '专业版全功能',
      '自定义AI模型',
      '无限存储空间',
      '全天候电话支持',
      '高级分析',
      '白标选项'
    ],
    ctaText: '开始使用',
    ctaVariant: 'secondary'
  }
];
```

### 8.2 FAQ 数据（faqData）
```typescript
// src/components/pricing/FAQSection.tsx
const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: '生成的海报可以商用吗？版权归谁？',
    answer: '是的，您可以将生成的海报用于商业用途。版权归属于您，无需支付额外费用。您可以自由修改、分发和使用生成的设计作品。'
  },
  {
    id: 'faq-2',
    question: 'AI生成的海报设计需要多长时间？',
    answer: '通常在几秒钟内即可生成初稿。您可以进一步编辑和优化设计，整个过程通常不超过5分钟。'
  },
  {
    id: 'faq-3',
    question: '支持哪些文件格式导出？',
    answer: '支持PNG、JPG、PDF和SVG格式导出，满足不同场景的需求。专业版和企业版还支持高分辨率导出。'
  },
  {
    id: 'faq-4',
    question: '可以随时取消订阅吗？',
    answer: '当然可以。您可以随时在账户设置中取消订阅，不会产生额外费用。取消后，您仍可继续使用至当前付费周期结束。'
  },
  {
    id: 'faq-5',
    question: '是否支持团队协作？',
    answer: '专业版和企业版支持团队协作功能，可以邀请团队成员共同编辑设计，实时同步修改。'
  },
  {
    id: 'faq-6',
    question: '如何联系技术支持？',
    answer: '免费版用户可通过社区获得支持，专业版用户享有优先邮件支持，企业版用户可获得全天候电话支持。'
  }
];
```

---

## 9. 可访问性（A11y）

### 9.1 语义化 HTML
- 使用 `<main>`、`<section>`、`<nav>` 等语义标签
- 按钮使用 `<button>` 而非 `<div>`
- 列表使用 `<ul>` 和 `<li>`

### 9.2 ARIA 属性
```tsx
// FAQ 折叠面板
<button
  aria-expanded={isOpen}
  aria-controls={`faq-content-${item.id}`}
  onClick={onToggle}
>
  {item.question}
</button>

<div
  id={`faq-content-${item.id}`}
  role="region"
  aria-labelledby={`faq-button-${item.id}`}
>
  {item.answer}
</div>
```

### 9.3 键盘导航
- 所有交互元素支持 Tab 键导航
- 使用 `focus-visible` 样式
- FAQ 支持 Enter/Space 键展开/折叠

### 9.4 颜色对比度
- 主文本（白色）与背景对比度 ≥ 7:1
- 次文本（白色70%透明度）与背景对比度 ≥ 4.5:1
- 按钮文字与按钮背景对比度 ≥ 4.5:1

---

## 10. 性能优化

### 10.1 图片优化
- 使用 Next.js `<Image>` 组件
- 设置合适的 `sizes` 和 `priority` 属性
- 图标优先使用 SVG

### 10.2 代码分割
- 页面级别自动分割（Next.js App Router）
- 考虑动态导入大型组件（如需要）

### 10.3 CSS 优化
- 使用 Tailwind 的 JIT 模式
- 避免内联样式，优先使用工具类
- 复用 `src/ui.ts` 中的公共样式

---

## 11. 实施步骤

### 阶段一：搭建页面骨架（1-2小时）
1. 创建 `src/app/pricing/page.tsx`
2. 引入 Header 和 Footer
3. 创建占位组件（空壳）
4. 验证路由和页面布局

### 阶段二：实现核心组件（3-4小时）
1. **PricingHero**：标题和描述区
2. **PricingCards + PricingCard**：
   - 定义数据结构
   - 实现单卡片样式
   - 实现响应式网格
3. **FAQSection + FAQItem**：
   - 定义数据结构
   - 实现折叠/展开逻辑
   - 添加动画效果
4. **PricingCTA**：行动号召区

### 阶段三：样式细化（2-3小时）
1. 调整间距和断点
2. 完善悬停和焦点样式
3. 添加阴影和光晕效果
4. 测试响应式布局

### 阶段四：交互与优化（1-2小时）
1. 测试键盘导航
2. 验证可访问性
3. 优化动画性能
4. 跨浏览器测试

### 阶段五：测试与联调（1小时）
1. 功能测试
2. 视觉还原对比
3. 性能测试
4. 修复问题

**预计总耗时：8-12 小时**

---

## 12. 风险与注意事项

### 12.1 编码问题
- ✅ 确保所有文件使用 UTF-8 编码
- ✅ 中文文案需经过测试，避免乱码

### 12.2 样式一致性
- ⚠️ 保持与主页的视觉风格一致
- ⚠️ 复用 `src/ui.ts` 中的工具类
- ⚠️ 颜色值与设计稿精确匹配

### 12.3 响应式适配
- ⚠️ 移动端卡片堆叠需测试
- ⚠️ FAQ 交互恢复后，需限制展开内容高度（`max-height` 或滚动容器）以避免跳动

### 12.4 性能
- ⚠️ 当前阶段仍以静态渲染为主，仅需保证首条 FAQ 展开、其余折叠视觉即可
- ⚠️ 待恢复交互时，优先采用 `transform` / `opacity` 动画，避免直接操作 `height` 造成回流

### 12.5 交互占位
- ⚠️ CTA 按钮暂时 `href="#"` 或 `onClick` 打开编辑器
- ⚠️ 后续接入真实支付流程需更新按钮逻辑

---

## 13. 后续扩展建议

### 13.1 功能增强
- 添加档位切换动画（月付/年付）
- 实现价格计算器
- 添加优惠码输入框
- 接入真实的支付 API

### 13.2 内容优化
- 将定价和 FAQ 数据移至 CMS 或 JSON 配置文件
- 支持多语言切换
- 添加更多 FAQ 项，按分类展示

### 13.3 转化优化
- 添加社会证明（用户评价、使用人数）
- 增加档位对比表格
- 添加"立即咨询"浮动按钮
- 埋点统计各档位的点击率

---

## 14. 附录

### 14.1 参考资源
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Next.js App Router 文档](https://nextjs.org/docs/app)
- [WCAG 2.1 可访问性指南](https://www.w3.org/WAI/WCAG21/quickref/)

### 14.2 相关文件
- `docs/layout-overview.md` - 主页布局说明
- `src/ui.ts` - 公共样式工具
- `src/app/globals.css` - 全局样式
- `src/components/common/Header.tsx` - 导航组件
- `src/components/common/Footer.tsx` - 页脚组件

---

## 15. 总结

本方案将定价页面划分为 **6 个核心模块**，采用 **组件化 + 数据驱动** 的架构，复用现有的样式系统和公共组件，确保视觉和交互的一致性。

**核心模块**：
1. **PricingHero** - 页面标题区
2. **PricingCards** - 定价卡片网格（包含 PricingCard 子组件）
3. **FAQSection** - 常见问题区（包含 FAQItem 子组件）
4. **PricingCTA** - 底部行动号召
5. **Header**（复用）
6. **Footer**（复用）

**技术栈**：
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- 响应式设计

**实施周期**：预计 8-12 小时完成全部开发和测试。

---

> **下一步**：等待用户审阅和确认方案，确认后开始编码实现。



