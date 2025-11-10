# 联系我们页面设计方案

> 创建时间：2025-11-10
> 文档版本：v1.0

## 1. 设计概览

联系我们页面采用深色主题，延续整站视觉风格，提供多种联系方式、留言表单、社交媒体链接和客户支持信息，打造友好、专业的用户服务体验。

### 1.1 设计目标
- 保持品牌一致性，延续全站深色背景与紫色主题
- 提供多种联系渠道，满足不同用户需求
- 简化表单填写流程，降低用户操作成本
- 展示团队专业性和服务态度

### 1.2 页面结构
```
┌─────────────────────────────────────────────────┐
│  Header (复用现有组件)                           │
├─────────────────────────────────────────────────┤
│  "随时为您提供帮助" 区块                         │
│  ┌─────────────────┬─────────────────────────┐ │
│  │ 左侧：标题+描述  │ 右侧：客服图片           │ │
│  │ - 邮件联系       │                         │ │
│  │ - 工作时间       │                         │ │
│  └─────────────────┴─────────────────────────┘ │
├─────────────────────────────────────────────────┤
│  "给我们留言" 表单区块                           │
│  - 姓名输入框                                    │
│  - 邮箱输入框                                    │
│  - 备注文本域                                    │
│  - 提交按钮                                      │
├─────────────────────────────────────────────────┤
│  "社交媒体" 区块                                 │
│  - 标题+描述                                     │
│  - X/Discord 图标                                │
├─────────────────────────────────────────────────┤
│  "客户支持" 区块                                 │
│  - 标题+描述                                     │
│  - 联系客服按钮                                  │
├─────────────────────────────────────────────────┤
│  Footer (复用现有组件)                           │
└─────────────────────────────────────────────────┘
```

---

## 2. 色彩方案（复用 tailwind.config.ts）

### 2.1 背景色
- **页面背景**: `bg-[#111111]` (secondary-950)
  - 与全站保持一致
  - 带噪点/粒子纹理（继承自 RootLayout）

- **卡片背景**: `bg-white/5` 配合 `ring-1 ring-white/10`
  - 玻璃拟态效果
  - 用于输入框和内容区块

### 2.2 文本色
- **主标题**: `text-white` (#FFFFFF)
- **正文描述**: `text-white/90` (90%透明度白色)
- **次要信息**: `text-[#A0A0A0]` 或 `text-white/70` (浅灰色)
- **占位符文本**: `placeholder:text-white/40`

### 2.3 强调色
- **主按钮**: `bg-primary` (#AE89FF)
  - Hover: `hover:bg-[#6b4ff0]`
- **图标/标签**: `text-primary` (#AE89FF)
- **聚焦边框**: `focus:ring-2 focus:ring-primary`

### 2.4 输入框样式
- **背景**: `bg-white/5` 或 `bg-[#191919]`
- **边框**: `border border-white/20`
- **聚焦**: `focus:border-primary focus:ring-1 focus:ring-primary`
- **文本**: `text-white`

---

## 3. 组件复用策略

### 3.1 复用现有组件
| 组件名 | 文件路径 | 复用说明 |
|--------|---------|---------|
| Header | `src/components/common/Header.tsx` | 完整复用，"联系我们"链接高亮 |
| Footer | `src/components/common/Footer.tsx` | 完整复用，保持底部统一 |
| btnPrimary | `src/ui.ts` | 复用按钮样式（提交按钮、联系客服） |
| transitionAll | `src/ui.ts` | 复用过渡动画 |
| cardBase | `src/ui.ts` | 复用卡片基础样式 |

### 3.2 新建组件
| 组件名 | 文件路径 | 职责说明 |
|--------|---------|---------|
| ContactPage | `src/app/contact/page.tsx` | 页面主容器 |
| ContactHero | `src/components/contact/ContactHero.tsx` | "随时为您提供帮助"区块 |
| ContactForm | `src/components/contact/ContactForm.tsx` | 留言表单区块 |
| SocialMedia | `src/components/contact/SocialMedia.tsx` | 社交媒体区块 |
| CustomerSupport | `src/components/contact/CustomerSupport.tsx` | 客户支持区块 |

---

## 4. 详细区块设计

### 4.1 ContactHero - "随时为您提供帮助"

#### 4.1.1 布局结构
```typescript
<section className="py-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* 左侧：文字内容 */}
    <div>
      <h1>随时为您提供帮助</h1>
      <p>描述文字...</p>
      
      {/* 邮件联系 */}
      <div>
        <EnvelopeIcon />
        <h3>邮件联系我们</h3>
        <p>技术支持: support@candeai.com</p>
        <p>常规咨询: info@candeai.com</p>
      </div>
      
      {/* 工作时间 */}
      <div>
        <ClockIcon />
        <h3>工作时间</h3>
        <p>周一至周五: 上午9:00 - 下午5:00</p>
        <p>周六至周日: 休息</p>
      </div>
    </div>
    
    {/* 右侧：客服图片 */}
    <div>
      <img src="customer-service.jpg" alt="客服支持" />
    </div>
  </div>
</section>
```

#### 4.1.2 样式规范
- **主标题**: 
  - 字号：`text-4xl lg:text-5xl`
  - 字重：`font-bold`
  - 颜色：`text-white`
  - 行高：`leading-tight`

- **描述文字**:
  - 字号：`text-base lg:text-lg`
  - 颜色：`text-white/90`
  - 间距：`mt-4 mb-8`

- **联系方式卡片**:
  - 背景：`bg-white/5`
  - 圆角：`rounded-xl`
  - 内边距：`p-6`
  - 边框：`ring-1 ring-white/10`
  - 间距：`space-y-6`

- **图标样式**:
  - 尺寸：`w-6 h-6`
  - 颜色：`text-primary`

- **客服图片**:
  - 圆角：`rounded-2xl`
  - 尺寸：`w-full h-auto`
  - 最大高度：`max-h-[500px]`
  - 对象适配：`object-cover`

#### 4.1.3 响应式设计
- **手机端（< 1024px）**: 
  - 单列布局
  - 图片置于文字下方
  - 标题缩小到 `text-3xl`

- **桌面端（≥ 1024px）**: 
  - 两列布局
  - 图片固定在右侧
  - 完整标题尺寸

---

### 4.2 ContactForm - "给我们留言"

#### 4.2.1 表单结构
```typescript
<section className="py-20">
  <div className="max-w-3xl mx-auto">
    <h2>给我们留言</h2>
    <p>填写下方表单向我们发送消息。我们的团队通常会在72小时内回复。</p>
    
    <form className="space-y-6">
      {/* 姓名输入 */}
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" type="text" placeholder="Jonas Khanwald" />
      </div>
      
      {/* 邮箱输入 */}
      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" type="email" placeholder="Jonas@mail.com" />
      </div>
      
      {/* 备注文本域 */}
      <div>
        <label htmlFor="notes">备注</label>
        <textarea id="notes" rows={6} placeholder="关于CanDe的更多详情" />
      </div>
      
      {/* 提交按钮 */}
      <button type="submit" className={btnPrimary}>
        提交
        <ArrowRightIcon />
      </button>
    </form>
  </div>
</section>
```

#### 4.2.2 输入框样式规范
- **Label 标签**:
  - 字号：`text-sm`
  - 字重：`font-medium`
  - 颜色：`text-white/90`
  - 间距：`mb-2 block`

- **Input/Textarea 基础样式**:
  ```css
  w-full
  rounded-xl
  bg-white/5
  border border-white/20
  px-4 py-3
  text-white
  placeholder:text-white/40
  transition-all duration-200
  focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none
  ```

- **Textarea 特殊样式**:
  - 最小高度：`min-h-[150px]`
  - 调整大小：`resize-y`

- **提交按钮**:
  - 复用 `btnPrimary`
  - 添加 `w-full sm:w-auto` 响应式宽度
  - 添加右箭头图标：`inline-flex items-center gap-2`

#### 4.2.3 表单验证
- **客户端验证**:
  - 姓名：必填，2-50字符
  - 邮箱：必填，符合邮箱格式
  - 备注：必填，10-500字符

- **错误提示样式**:
  ```typescript
  <p className="mt-1 text-sm text-red-400">
    {errorMessage}
  </p>
  ```

- **成功提示**:
  ```typescript
  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
    <p className="text-green-400">消息已成功发送！</p>
  </div>
  ```

---

### 4.3 SocialMedia - "社交媒体"

#### 4.3.1 布局结构
```typescript
<section className="py-20 text-center">
  <h2>社交媒体</h2>
  <p>在社交媒体上关注我们, 了解最新动态和社区故事</p>
  
  <div className="flex justify-center gap-6 mt-8">
    {/* X (Twitter) */}
    <a 
      href="#" 
      className="social-icon-button"
      aria-label="在 X 上关注我们"
    >
      <XIcon />
    </a>
    
    {/* Discord */}
    <a 
      href="#" 
      className="social-icon-button"
      aria-label="加入我们的 Discord"
    >
      <DiscordIcon />
    </a>
  </div>
</section>
```

#### 4.3.2 图标按钮样式
```css
.social-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 200ms ease-out;
}

.social-icon-button:hover {
  background: rgba(174, 137, 255, 0.1);
  border-color: #AE89FF;
  transform: translateY(-2px);
}
```

**Tailwind 类名实现**:
```typescript
const socialIconClass = `
  inline-flex items-center justify-center
  w-14 h-14
  rounded-full
  bg-white/5
  border border-white/10
  text-white
  ${transitionAll}
  hover:bg-primary/10 hover:border-primary hover:-translate-y-0.5
`;
```

#### 4.3.3 图标尺寸
- SVG 尺寸：`w-6 h-6` (24px)
- 按钮容器：`w-14 h-14` (56px)

---

### 4.4 CustomerSupport - "客户支持"

#### 4.4.1 布局结构
```typescript
<section className="py-20">
  <div className="max-w-3xl mx-auto text-center">
    {/* 顶部标签 */}
    <div className="inline-flex items-center gap-2 mb-6">
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
        开始吧!
      </span>
      <span className="text-white/60 text-sm">
        陪伴您的每一步创作
      </span>
    </div>
    
    <h2>客户支持</h2>
    <p>
      我们的客户支持团队致力于为您提供最优质的服务。
      如果您遇到任何问题或对我们的平台有疑问, 请随时与我们联系。
    </p>
    
    <button className={btnPrimary}>
      联系客服
      <ArrowRightIcon />
    </button>
  </div>
</section>
```

#### 4.4.2 样式规范
- **标签组**:
  - 紫色标签：`bg-primary text-white`
  - 次要文字：`text-white/60`
  - 间距：`gap-2`

- **标题**:
  - 字号：`text-3xl lg:text-4xl`
  - 字重：`font-bold`
  - 颜色：`text-white`
  - 间距：`mb-4`

- **描述**:
  - 字号：`text-base lg:text-lg`
  - 颜色：`text-white/90`
  - 间距：`mb-8`
  - 最大宽度：`max-w-2xl mx-auto`

- **按钮**:
  - 复用 `btnPrimary`
  - 增大尺寸：`px-8 py-3 text-base`

---

## 5. 页面级布局与容器

### 5.1 容器宽度规范
```typescript
// 全宽容器（Header/Footer）
<div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">

// 内容容器（主要区块）
<div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">

// 窄容器（表单、客户支持）
<div className="w-full max-w-3xl mx-auto px-4">
```

### 5.2 垂直间距规范
- **区块间距**: `py-20` (80px 上下内边距)
- **标题与内容**: `mt-4` 或 `mb-6`
- **表单元素**: `space-y-6` (24px 间距)
- **小组件**: `gap-4` 或 `gap-6`

### 5.3 响应式断点
| 断点 | 屏幕尺寸 | 容器内边距 | 主要调整 |
|------|---------|-----------|---------|
| sm | 640px+ | px-4 | 基础布局 |
| md | 768px+ | px-6 | 字号增大 |
| lg | 1024px+ | px-12 | 两列布局 |
| xl | 1280px+ | px-12 | 完整间距 |

---

## 6. 代码结构

### 6.1 文件组织
```
src/
  app/
    contact/
      page.tsx                    # 新建：联系我们页面主文件
    layout.tsx                    # 已有：提供全局背景
  components/
    common/
      Header.tsx                  # 已有：复用
      Footer.tsx                  # 已有：复用
    contact/
      ContactHero.tsx             # 新建：帮助区块
      ContactForm.tsx             # 新建：表单区块
      SocialMedia.tsx             # 新建：社交媒体
      CustomerSupport.tsx         # 新建：客服支持
  ui.ts                           # 已有：复用样式工具
  lib/
    contact-validation.ts         # 新建：表单验证逻辑
```

### 6.2 页面主文件结构
```typescript
// src/app/contact/page.tsx
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import SocialMedia from "@/components/contact/SocialMedia";
import CustomerSupport from "@/components/contact/CustomerSupport";

export const metadata = {
  title: "联系我们 - CanDe",
  description: "随时为您提供帮助，通过邮件、社交媒体或在线表单联系我们",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <Header />
      </div>

      {/* 主内容区 */}
      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <ContactHero />
        <ContactForm />
        <SocialMedia />
        <CustomerSupport />
      </main>

      {/* Footer */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <Footer />
      </div>
    </>
  );
}
```

---

## 7. 组件详细实现

### 7.1 ContactHero.tsx
```typescript
'use client';

import Image from "next/image";
import { transitionAll } from "@/ui";

/**
 * 联系我们 Hero 区块 - "随时为您提供帮助"
 * 创建时间：2025-11-10
 */
export default function ContactHero() {
  return (
    <section className="py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* 左侧：文字内容 */}
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            随时为您提供帮助
          </h1>
          <p className="text-base lg:text-lg text-white/90 mb-8">
            有疑问吗?需要设计项目方面的帮助?或者只是想与我们分享您的体验? 
            我们随时为您服务!通过以下任一方式联系我们,我们的专业团队将尽快为您提供帮助。
          </p>

          {/* 联系方式卡片组 */}
          <div className="space-y-6">
            {/* 邮件联系 */}
            <div className="p-6 rounded-xl bg-white/5 ring-1 ring-white/10">
              <div className="flex items-start gap-4">
                {/* 信封图标 */}
                <svg 
                  className="w-6 h-6 text-primary flex-shrink-0 mt-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    邮件联系我们
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/70">
                      <span className="text-white/90">技术支持:</span>{" "}
                      <a 
                        href="mailto:support@candeai.com" 
                        className="text-[#A0A0A0] hover:text-primary transition-colors"
                      >
                        support@candeai.com
                      </a>
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/90">常规咨询:</span>{" "}
                      <a 
                        href="mailto:info@candeai.com" 
                        className="text-[#A0A0A0] hover:text-primary transition-colors"
                      >
                        info@candeai.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 工作时间 */}
            <div className="p-6 rounded-xl bg-white/5 ring-1 ring-white/10">
              <div className="flex items-start gap-4">
                {/* 时钟图标 */}
                <svg 
                  className="w-6 h-6 text-primary flex-shrink-0 mt-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    工作时间
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-[#A0A0A0]">
                      周一至周五: 上午9:00 - 下午5:00
                    </p>
                    <p className="text-[#A0A0A0]">
                      周六至周日: 休息
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：客服图片 */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/assets/images/customer-service.jpg"
              alt="专业客服团队为您提供支持"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 7.2 ContactForm.tsx
```typescript
'use client';

import { useState } from "react";
import { btnPrimary, transitionAll } from "@/ui";

interface FormData {
  name: string;
  email: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  notes?: string;
}

/**
 * 联系表单组件
 * 创建时间：2025-11-10
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    notes: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 输入框样式
  const inputClass = `
    w-full
    rounded-xl
    bg-white/5
    border border-white/20
    px-4 py-3
    text-white
    placeholder:text-white/40
    ${transitionAll}
    focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none
  `;

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "请输入您的姓名";
    } else if (formData.name.length < 2) {
      newErrors.name = "姓名至少需要2个字符";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "请输入您的邮箱";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (!formData.notes.trim()) {
      newErrors.notes = "请输入留言内容";
    } else if (formData.notes.length < 10) {
      newErrors.notes = "留言内容至少需要10个字符";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // 模拟 API 请求
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", notes: "" });
      
      // 3秒后隐藏成功提示
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("提交失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            给我们留言
          </h2>
          <p className="text-base lg:text-lg text-white/90">
            填写下方表单向我们发送消息。我们的团队通常会在72小时内回复。
          </p>
        </div>

        {/* 成功提示 */}
        {submitSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 text-center">
              ✓ 消息已成功发送！我们会尽快回复您。
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 姓名 */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-white/90 mb-2"
            >
              姓名
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jonas Khanwald"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-white/90 mb-2"
            >
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Jonas@mail.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* 备注 */}
          <div>
            <label 
              htmlFor="notes" 
              className="block text-sm font-medium text-white/90 mb-2"
            >
              备注
            </label>
            <textarea
              id="notes"
              rows={6}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="关于CanDe的更多详情"
              className={`${inputClass} resize-y min-h-[150px]`}
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-400">{errors.notes}</p>
            )}
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${btnPrimary} w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "提交中..." : "提交"}
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
```

### 7.3 SocialMedia.tsx
```typescript
import { transitionAll } from "@/ui";

/**
 * 社交媒体区块
 * 创建时间：2025-11-10
 */
export default function SocialMedia() {
  const socialIconClass = `
    inline-flex items-center justify-center
    w-14 h-14
    rounded-full
    bg-white/5
    border border-white/10
    text-white
    ${transitionAll}
    hover:bg-primary/10 hover:border-primary hover:-translate-y-0.5
  `;

  return (
    <section className="py-16 lg:py-20 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
        社交媒体
      </h2>
      <p className="text-base lg:text-lg text-white/90 mb-8">
        在社交媒体上关注我们, 了解最新动态和社区故事
      </p>

      <div className="flex justify-center gap-6">
        {/* X (Twitter) */}
        <a
          href="https://twitter.com/candeai"
          target="_blank"
          rel="noopener noreferrer"
          className={socialIconClass}
          aria-label="在 X 上关注我们"
        >
          <svg className="w-6 h-6" viewBox="0 0 16 16" fill="currentColor">
            <path d="M9.522 6.775L15.479 0H14.067L8.895 5.883L4.764 0H0L6.247 8.895L0 16H1.412L6.873 9.788L11.236 16H16L9.522 6.775ZM7.589 8.974L6.956 8.088L1.92 1.04H4.088L8.152 6.728L8.785 7.614L14.068 15.008H11.9L7.589 8.974Z" />
          </svg>
        </a>

        {/* Discord */}
        <a
          href="https://discord.gg/candeai"
          target="_blank"
          rel="noopener noreferrer"
          className={socialIconClass}
          aria-label="加入我们的 Discord 社区"
        >
          <svg className="w-6 h-6" viewBox="0 0 21 16" fill="currentColor">
            <path d="M13.4559 -0.0649414C13.2509 0.303059 13.0649 0.681059 12.8989 1.06706C11.3049 0.827059 9.68488 0.827059 8.09088 1.06706C7.92688 0.680059 7.74088 0.302059 7.53388 -0.0649414C6.03788 0.192059 4.58088 0.643059 3.19988 1.27806C0.460883 5.35706 -0.280117 9.33106 0.0878832 13.2501C1.69288 14.4431 3.49088 15.3501 5.40188 15.9311C5.83288 15.3501 6.21388 14.7331 6.54188 14.0871C5.92188 13.8561 5.32288 13.5651 4.74888 13.2281C4.89988 13.1191 5.04688 13.0051 5.18888 12.8961C8.55388 14.4871 12.4489 14.4871 15.8139 12.8961C15.9559 13.0141 16.1029 13.1271 16.2539 13.2281C15.6809 13.5681 15.0799 13.8571 14.4569 14.0911C14.7839 14.7371 15.1649 15.3541 15.5959 15.9351C17.5069 15.3551 19.3049 14.4501 20.9109 13.2581C21.3459 8.71206 20.1649 4.77206 17.7909 1.28206C16.4119 0.646059 14.9559 0.196059 13.4599 -0.0569414L13.4559 -0.0649414ZM7.01088 10.8371C5.97688 10.8371 5.11788 9.89506 5.11788 8.72906C5.11788 7.56306 5.94288 6.61506 7.00688 6.61506C8.06988 6.61506 8.91588 7.56706 8.89988 8.72906C8.88288 9.89006 8.06588 10.8371 7.01088 10.8371ZM13.9879 10.8371C12.9499 10.8371 12.0989 9.89506 12.0989 8.72906C12.0989 7.56306 12.9239 6.61506 13.9879 6.61506C15.0519 6.61506 15.8939 7.56706 15.8769 8.72906C15.8599 9.89006 15.0439 10.8371 13.9879 10.8371Z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
```

### 7.4 CustomerSupport.tsx
```typescript
import { btnPrimary } from "@/ui";

/**
 * 客户支持区块
 * 创建时间：2025-11-10
 */
export default function CustomerSupport() {
  const handleContactSupport = () => {
    // 可以打开聊天窗口或跳转到客服系统
    if (typeof window !== "undefined") {
      window.open("https://support.candeai.com", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* 顶部标签 */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-[#191919] text-sm font-medium">
            开始吧!
          </span>
          <span className="text-white/60 text-sm">
            陪伴您的每一步创作
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          客户支持
        </h2>
        
        <p className="text-base lg:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          我们的客户支持团队致力于为您提供最优质的服务。
          如果您遇到任何问题或对我们的平台有疑问, 请随时与我们联系。
        </p>

        <button 
          onClick={handleContactSupport}
          className={`${btnPrimary} inline-flex items-center gap-2 px-8 py-3 text-base`}
        >
          联系客服
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
```

---

## 8. 静态资源需求

### 8.1 图片资源
| 文件名 | 路径 | 用途 | 尺寸建议 |
|--------|------|------|---------|
| customer-service.jpg | `/assets/images/` | 客服团队照片 | 1200×900px |

### 8.2 占位图片
如果暂时没有真实图片，可以使用以下占位方案：
```typescript
// 使用 Unsplash 占位图
<Image
  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=900&fit=crop"
  alt="客服支持"
  fill
  className="object-cover"
/>
```

---

## 9. 测试检查清单

### 9.1 功能测试
- [ ] 表单验证：姓名、邮箱、备注字段验证正常
- [ ] 表单提交：能正确提交并显示成功提示
- [ ] 邮件链接：点击邮箱能打开邮件客户端
- [ ] 社交媒体链接：能正确打开新标签页
- [ ] 联系客服按钮：能正确跳转或打开客服系统
- [ ] Header 导航："联系我们"链接高亮显示

### 9.2 视觉测试
- [ ] 背景色为 #111111，与全站一致
- [ ] 文本颜色层级清晰（白色、浅灰、紫色）
- [ ] 输入框聚焦时显示紫色边框
- [ ] 按钮 Hover 状态正常
- [ ] 图标颜色为紫色 #AE89FF
- [ ] 卡片背景为半透明白色

### 9.3 响应式测试
- [ ] 手机端（375px）：单列布局，图片在下方
- [ ] 平板端（768px）：间距合理，字号适中
- [ ] 桌面端（1440px）：两列布局，视觉平衡
- [ ] ContactHero 在小屏幕下为单列
- [ ] 表单按钮在手机端为全宽

### 9.4 无障碍测试
- [ ] 所有输入框有对应的 label
- [ ] 按钮有清晰的 aria-label
- [ ] 社交媒体链接有描述性文本
- [ ] 颜色对比度符合 WCAG AA 标准
- [ ] 键盘可以完成所有操作

### 9.5 性能测试
- [ ] 图片使用 Next/Image 优化
- [ ] 图片设置正确的 sizes 属性
- [ ] 首屏图片设置 priority
- [ ] 表单提交有加载状态提示

---

## 10. 潜在风险与注意事项

### 10.1 图片资源
- **风险**: 客服图片缺失
- **解决**: 准备备用占位图或使用 Unsplash API
- **建议**: 使用真实团队照片增强信任感

### 10.2 表单后端对接
- **风险**: 当前为前端模拟提交
- **待办**: 对接真实 API 或使用表单服务（如 Formspree、Netlify Forms）
- **建议**: 添加后端验证和防垃圾邮件机制

### 10.3 客服系统集成
- **风险**: 联系客服按钮暂为占位链接
- **待办**: 集成实时聊天工具（如 Intercom、Zendesk）
- **建议**: 考虑添加在线聊天浮窗

### 10.4 邮箱地址真实性
- **注意**: 确保 support@candeai.com 和 info@candeai.com 已配置
- **建议**: 设置自动回复，告知用户已收到邮件

### 10.5 社交媒体链接
- **注意**: 当前为占位链接 "#"
- **待办**: 替换为真实的社交媒体账号链接
- **建议**: 如暂无账号，可先隐藏此区块

---

## 11. 实施步骤

### 步骤 1：创建页面文件
- 创建 `src/app/contact/page.tsx`
- 设置页面元数据（title, description）

### 步骤 2：创建组件文件
- 创建 `src/components/contact/` 目录
- 实现 ContactHero.tsx
- 实现 ContactForm.tsx
- 实现 SocialMedia.tsx
- 实现 CustomerSupport.tsx

### 步骤 3：准备图片资源
- 添加客服照片到 `/public/assets/images/`
- 确保图片尺寸合理（1200×900px 左右）
- 压缩图片减少文件大小

### 步骤 4：组装页面
- 在 page.tsx 中引入所有组件
- 设置正确的容器宽度和间距
- 复用 Header 和 Footer

### 步骤 5：表单功能实现
- 实现表单验证逻辑
- 添加提交状态管理
- 实现成功/错误提示

### 步骤 6：样式调整
- 确保所有颜色符合设计规范
- 调整响应式断点
- 测试各种屏幕尺寸

### 步骤 7：测试验证
- 按照测试检查清单逐项验证
- 修复发现的问题
- 跨浏览器测试

---

## 12. 后续优化建议

### 12.1 表单增强
```typescript
// 添加文件上传功能
<input type="file" accept="image/*" />

// 添加验证码（防机器人）
<ReCAPTCHA sitekey="your-site-key" />

// 添加字数统计
<p className="text-sm text-white/60 text-right">
  {formData.notes.length} / 500
</p>
```

### 12.2 实时聊天集成
```typescript
// 使用 Intercom 或类似工具
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.Intercom('boot', {
      app_id: 'your-app-id',
    });
  }
}, []);
```

### 12.3 FAQ 区块
```typescript
// 添加常见问题解答
<section>
  <h2>常见问题</h2>
  <Accordion items={faqData} />
</section>
```

### 12.4 地图集成（如有实体办公室）
```typescript
// 使用 Google Maps 或 Mapbox
<div className="h-[400px] rounded-2xl overflow-hidden">
  <iframe 
    src="https://www.google.com/maps/embed?pb=..." 
    className="w-full h-full"
  />
</div>
```

### 12.5 多语言支持
```typescript
// 根据用户语言显示不同内容
const contactContent = {
  'zh-CN': {
    title: '随时为您提供帮助',
    description: '有疑问吗?...',
  },
  'en-US': {
    title: 'Always Here to Help',
    description: 'Have questions?...',
  },
};
```

---

## 13. SEO 优化

### 13.1 元数据配置
```typescript
export const metadata = {
  title: "联系我们 - CanDe | AI设计平台客户支持",
  description: "通过邮件、在线表单或社交媒体联系CanDe团队。我们的专业客服随时为您提供帮助，解答设计相关问题。",
  keywords: "CanDe联系方式, 客户支持, 技术支持, AI设计帮助",
  openGraph: {
    title: "联系我们 - CanDe",
    description: "随时为您提供帮助，专业团队在线支持",
    images: ["/assets/images/og-contact.jpg"],
  },
};
```

### 13.2 结构化数据
```typescript
// 添加 JSON-LD 结构化数据
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "联系我们 - CanDe",
    "description": "CanDe客户支持页面",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@candeai.com",
      "contactType": "Customer Service",
      "availableLanguage": ["zh-CN", "en-US"],
    }
  })}
</script>
```

---

## 14. 参考资源

### 14.1 项目内部文档
- `docs/layout-overview.md` - 全局布局说明
- `tailwind.config.ts` - 颜色配置
- `src/ui.ts` - UI 工具类

### 14.2 技术文档
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/) - 可选的表单库
- [Zod](https://zod.dev/) - 可选的验证库

### 14.3 设计参考
- 客服图片：Unsplash Customer Service
- 表单设计：Material Design Input Guidelines

---

## 附录：完整页面代码预览

```typescript
// src/app/contact/page.tsx
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import SocialMedia from "@/components/contact/SocialMedia";
import CustomerSupport from "@/components/contact/CustomerSupport";

/**
 * 联系我们页面
 * 创建时间：2025-11-10
 * 说明：提供多种联系方式、留言表单和客户支持信息
 */
export const metadata = {
  title: "联系我们 - CanDe",
  description: "随时为您提供帮助，通过邮件、社交媒体或在线表单联系我们",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <Header />
      </div>

      {/* 主内容区 */}
      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <ContactHero />
        <ContactForm />
        <SocialMedia />
        <CustomerSupport />
      </main>

      {/* Footer */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <Footer />
      </div>
    </>
  );
}
```

---

**方案完成时间**: 2025-11-10  
**待执行**: 等待用户审阅并确认后开始编码实施  
**预计工作量**: 4个组件 + 1个页面文件 + 表单验证逻辑 = 约2-3小时

