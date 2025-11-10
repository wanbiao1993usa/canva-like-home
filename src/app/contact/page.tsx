import type { Metadata } from "next";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import ContactHero from "../../components/contact/ContactHero";
import ContactForm from "../../components/contact/ContactForm";
import SocialMedia from "../../components/contact/SocialMedia";
import CustomerSupport from "../../components/contact/CustomerSupport";

/**
 * 2025-11-10 20:40: 联系我们页面骨架，统一管理 Header/Footer 及四个功能区块
 */
export const metadata: Metadata = {
  title: "联系我们 - CanDe | AI设计平台客户支持",
  description:
    "通过邮件、在线表单或社交媒体联系 CanDe 团队。我们的专业客服随时为您提供帮助，解答设计相关问题。",
  keywords: ["CanDe联系方式", "客户支持", "技术支持", "AI设计帮助"],
  openGraph: {
    title: "联系我们 - CanDe",
    description: "随时为您提供帮助，专业团队在线支持。",
    images: [
      {
        url: "/assets/images/og-contact.jpg",
        alt: "联系我们 - CanDe",
      },
    ],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "联系我们 - CanDe",
  description: "CanDe 客户支持页面",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@candeai.com",
    contactType: "Customer Service",
    availableLanguage: ["zh-CN", "en-US"],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* 2025-11-10 20:40: Header 区域保持与首页一致的最大宽度与内边距 */}
      <div className="mx-auto w-full px-4 md:px-6 lg:px-12">
        <Header />
      </div>

      {/* 2025-11-10 20:40: 主内容串联四个联系页模块 */}
      <main className="mx-auto w-full px-4 md:px-6 lg:px-12">
        <ContactHero />
        <ContactForm />
        <SocialMedia />
        <CustomerSupport />
      </main>

      {/* 2025-11-10 20:40: Footer 区域复用统一容器 */}
      <div className="mx-auto w-full px-4 md:px-6 lg:px-12">
        <Footer />
      </div>

      {/* 2025-11-10 20:40: 注入 Contact 页面 JSON-LD，便于搜索引擎识别 */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}
