import type { Metadata } from "next";
import { cache } from "react";

import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import ContactHero from "../../../components/contact/ContactHero";
import ContactForm from "../../../components/contact/ContactForm";
import CustomerSupport from "../../../components/contact/CustomerSupport";
import { defaultLocale, getDictionary, isLocale, locales, type Locale } from "../../i18n";

type ContactMetadataCopy = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    imageAlt: string;
  };
  jsonLd: {
    name: string;
    description: string;
  };
};

type ContactPageParams = {
  params?: Promise<{
    locale?: string | string[];
  }>;
};

// 2025-11-12 14:45: 解析路由参数中的 locale，兼容 Promise 包装
const resolveLocaleFromParams = async (paramsPromise: ContactPageParams["params"]): Promise<Locale> => {
  const resolvedParams = (paramsPromise ? await paramsPromise : {}) as { locale?: string | string[] };
  const localeParam = Array.isArray(resolvedParams.locale) ? resolvedParams.locale[0] : resolvedParams.locale;
  return localeParam && isLocale(localeParam) ? localeParam : defaultLocale;
};

// 2025-11-12 14:45: 缓存 contact metadata，避免 generateMetadata 与页面重复读取
const getContactMetadataCopy = cache(async (locale: Locale): Promise<ContactMetadataCopy> => {
  const dictionary = await getDictionary(locale);
  const contactDictionary = dictionary?.contact as { metadata?: ContactMetadataCopy } | undefined;
  if (contactDictionary?.metadata) {
    return contactDictionary.metadata;
  }
  if (locale !== defaultLocale) {
    const fallbackDictionary = await getDictionary(defaultLocale);
    const fallbackContactDictionary = fallbackDictionary?.contact as
      | { metadata?: ContactMetadataCopy }
      | undefined;
    if (fallbackContactDictionary?.metadata) {
      return fallbackContactDictionary.metadata;
    }
  }
  throw new Error("[contact] Missing metadata copy.");
});

// 2025-11-12 14:45: 动态生成 SEO Metadata，依据 locale 拉取文案
export async function generateMetadata({ params }: ContactPageParams = {}): Promise<Metadata> {
  const locale = await resolveLocaleFromParams(params);
  const metadataCopy = await getContactMetadataCopy(locale);

  return {
    title: metadataCopy.title,
    description: metadataCopy.description,
    keywords: metadataCopy.keywords,
    openGraph: {
      title: metadataCopy.openGraph.title,
      description: metadataCopy.openGraph.description,
      images: [
        {
          url: "/assets/images/og-contact.jpg",
          alt: metadataCopy.openGraph.imageAlt,
        },
      ],
    },
  };
}

export default async function ContactPage({ params }: ContactPageParams = {}) {
  const locale = await resolveLocaleFromParams(params);
  const metadataCopy = await getContactMetadataCopy(locale);

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: metadataCopy.jsonLd.name,
    description: metadataCopy.jsonLd.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: "admin@lycium.ai",
      contactType: "Customer Service",
      availableLanguage: locales,
    },
  } as const;

  return (
    <>
      <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px] font-[PingFang SC]">
        <Header />

        <ContactHero />

        <ContactForm />

        <CustomerSupport />

        <Footer />
      </main>

      {/* 2025-11-12 14:45: 注入 Contact 页面 JSON-LD，使用多语言 name/description */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}
