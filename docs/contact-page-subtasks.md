# 联系我们页面编码子任务拆解

> 依据 `docs/contact-page-design.md`，将实现工作按文件粒度拆分，并为每个子任务编号。执行任意任务前，请再次确认设计稿与说明无出入。

## 子任务列表

### 1. `src/app/contact/page.tsx`
1.1 新建 Contact 页面路由文件，导入并组合 Header、Footer 以及四个联系页子组件（ContactHero / ContactForm / SocialMedia / CustomerSupport）。  
1.2 按设计稿设置页面 `metadata`（标题、描述、OG 信息），并保持与文档 SEO 小节一致。  
1.3 为 `<main>`、包裹层设置与首页一致的最大宽度与左右内边距，确保暗色背景下内容居中；确认 `lang="zh-CN"` 环境下排版正常。  
1.4 在 Header 导航中高亮“联系我们”入口（需要与组件改动协同，见任务 2）。  
1.5 若页面需要懒加载图像或脚本，确保使用 `next/dynamic` 或 `next/image` 并处理 `priority`。

### 2. `src/components/common/Header.tsx`
2.1 在导航数组中新增“联系我们”项（`href: "/contact"`），并保证 `matchPath` 精确匹配以实现高亮。  
2.2 检查移动端 CTA 与导航在 Contact 页面下的表现，必要时调整 aria-label 或 `aria-current`。  
2.3 更新可能涉及的类型/常量，避免 hardcode。回归测试主页等既有页面。

### 3. `src/components/contact/ContactHero.tsx`
3.1 根据设计稿编写左文右图两列布局（`grid-cols-1 lg:grid-cols-2`），含标题、描述、邮件信息块、工作时间块。  
3.2 使用 `GlowEffect` 或 `bg-white/5 + ring-1` 模拟卡片，引用 `support@candeai.com`、`info@candeai.com` 等文案，添加 `mailto:` 链接。  
3.3 右侧客服图片使用 `/assets/images/customer-service.jpg` 并通过 `next/image` 加载，补充 alt 描述与 `sizes`。  
3.4 补充响应式：移动端单列、标题降级、内边距收紧。  
3.5 添加必要的中文注释与时间戳记录。

### 4. `src/components/contact/ContactForm.tsx`
4.1 实现“给我们留言”表单：姓名、邮箱、备注（多行）与提交按钮。  
4.2 采用 React Hook Form + Zod（或现有验证方案）做同步验证，错误状态要有视觉反馈（边框/提示文本）。  
4.3 表单提交逻辑暂以 `fetch("/api/contact")` 或 `setTimeout` mock，返回后给出成功/失败提示；若暂无 API，记录 TODO。  
4.4 样式沿用 `bg-[#151515]` + `ring-white/10` 圆角卡片并复用 `btnPrimary`。  
4.5 确保键盘可访问性：label/aria、`focus-visible` 等细节齐全。

### 5. `src/components/contact/SocialMedia.tsx`
5.1 输出“社交媒体”标题、描述，并在居中区域放置 X / Discord 两个图标按钮，使用圆形背景 + hover 光效。  
5.2 链接地址使用设计文档中的真实 URL：`https://twitter.com/candeai` 与 `https://discord.gg/candeai`，并添加 `rel="noopener noreferrer"`。  
5.3 每个按钮提供 `aria-label`，同时支持键盘 `Enter` 激活。  
5.4 组件底部与相邻区块设置合理的 `pt/pb`，保证与 Hero、客户支持之间留白一致。

### 6. `src/components/contact/CustomerSupport.tsx`
6.1 结构包含顶部胶囊标签、标题、描述与“联系客服”按钮。  
6.2 `handleContactSupport` 触发后打开 `https://support.candeai.com` 新窗口，添加中文注释与时间戳。  
6.3 复用 `btnPrimary` 并追加箭头图标（SVG），注意按钮尺寸与 Hero CTA 对齐。  
6.4 对齐设计稿的最大宽度（约 720px），置中排版，确保移动端文字不溢出。

### 7. `src/app/api/contact/route.ts`（如采用 API Mock）
7.1 若表单需要服务端入口，建立 `/api/contact` POST 接口，做简单参数校验并返回成功/失败 JSON。  
7.2 为未来对接真实客服系统预留 TODO，并在接口内记录日志或发送到第三方（可暂时 console）。  
7.3 补充基础测试/手动验证说明。

### 8. 资产与样式补充
8.1 将设计稿所需图片、SVG（客服照片、社交图标等）放入 `public/assets/...` 并校验大小。  
8.2 若需新增渐变背景、阴影等，可在 `tailwind.config.ts` `extend` 内注册后再使用。  
8.3 更新 `docs/layout-overview.md` 或其它相关文档（若 Contact 页对全局布局产生影响），保持文档同步。

### 9. 验证与交付
9.1 运行 `pnpm lint` / `pnpm test` / `pnpm next build`（视项目脚本而定）确认无错误。  
9.2 手动检查桌面与移动断点的视觉表现，尤其是表单焦点态与按钮 hover。  
9.3 在提交前复核中文注释、时间戳是否齐全，并补充变更日志（如 `change_log.md`）。

---

完成上述子任务后，再根据用户指令开展实际编码。若需求有变，请更新本文件并重新寻求确认。
