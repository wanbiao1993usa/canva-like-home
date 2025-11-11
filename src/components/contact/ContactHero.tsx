'use client';

import Image from "next/image";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { gradentTextHighlight } from "../../ui";
import { useTranslator } from "../../hooks/useTranslator";

/**
 * 2025-11-10 20:55: 联系我们页 Hero —— 提供联系方式与客服形象
 */
export default function ContactHero() {
  const t = useTranslator("contact.hero");
  const techEmail = t("emailSection.techEmail");
  const generalEmail = t("emailSection.generalEmail");

  return (
    <section className="relative z-0 mx-auto py-20">
      <div className="flex items-stretch justify-center">
        <div className="mr-35 w-[620px]">
          <CapsuleTagGroup primaryText={t("tagPrimary")} secondaryText={t("tagSecondary")} />

          <h1 className={`mt-6 text-3xl font-bold leading-tight lg:text-5xl ${gradentTextHighlight}`}>
            {t("title")}
          </h1>
          <p className="mt-6 text-[#929292] lg:text-lg">{t("introLine1")}</p>
          <p className="mt-6 text-[#929292] lg:text-lg">{t("introLine2")}</p>

          <div className="mt-12 space-y-12">
            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3 text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M0.75 2.75C0.75 2.21957 0.960714 1.71086 1.33579 1.33579C1.71086 0.960714 2.21957 0.75 2.75 0.75H16.75C17.2804 0.75 17.7891 0.960714 18.1642 1.33579C18.5393 1.71086 18.75 2.21957 18.75 2.75M0.75 2.75V12.75C0.75 13.2804 0.960714 13.7891 1.33579 14.1642C1.71086 14.5393 2.21957 14.75 2.75 14.75H16.75C17.2804 14.75 17.7891 14.5393 18.1642 14.1642C18.5393 13.7891 18.75 13.2804 18.75 12.75V2.75M0.75 2.75L9.75 8.75L18.75 2.75" stroke="#AE89FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-semibold text-[#929292]">{t("emailSection.title")}</span>
              </div>

              <div className="space-y-4 text-white/70">
                <div>
                  <p className="text-sm text-[#929292]">{t("emailSection.techLabel")}</p>
                  <a href={`mailto:${techEmail}`} className="text-lg font-medium text-white transition-colors hover:text-primary">
                    {techEmail}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-[#929292]">{t("emailSection.generalLabel")}</p>
                  <a href={`mailto:${generalEmail}`} className="text-lg font-medium text-white transition-colors hover:text-primary">
                    {generalEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.5 12H12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#AE89FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-semibold text-[#929292]">{t("hoursSection.title")}</span>
              </div>

              <div className="space-y-2 text-lg text-white">
                <p>{t("hoursSection.weekdays")}</p>
                <p>{t("hoursSection.weekends")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-[520px] self-stretch">
          <div className="relative h-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <Image
              src="/assets/images/customer-service.png"
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
