'use client';

import { useState } from "react";
import { btnPrimary, transitionAll } from "../../ui";
import GlowEffect from "../common/GlowEffect";
import { useTranslator } from "../../hooks/useTranslator";

type FormData = {
  name: string;
  email: string;
  notes: string;
};

type FormErrors = Partial<FormData>;

/**
 * 2025-11-10 21:05: 联系我们表单 — 支持基础验证与提交态
 */
export default function ContactForm() {
  const t = useTranslator("contact.form");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fieldShellClass =
    `w-full mt-2 border border-white/10 bg-[#111111] px-6 py-4 text-base text-white placeholder:text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${transitionAll} focus:border-[#AE89FF] focus:ring-2 focus:ring-[#AE89FF]/40 focus:outline-none`;

  const fieldCopy = {
    name: {
      label: t("fields.name.label"),
      placeholder: t("fields.name.placeholder"),
      errors: {
        required: t("fields.name.errors.required"),
        min: t("fields.name.errors.min")
      }
    },
    email: {
      label: t("fields.email.label"),
      placeholder: t("fields.email.placeholder"),
      errors: {
        required: t("fields.email.errors.required"),
        invalid: t("fields.email.errors.invalid")
      }
    },
    notes: {
      label: t("fields.notes.label"),
      placeholder: t("fields.notes.placeholder"),
      errors: {
        required: t("fields.notes.errors.required"),
        min: t("fields.notes.errors.min")
      }
    },
    actions: {
      submit: t("actions.submit"),
      submitting: t("actions.submitting"),
      success: t("actions.success")
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = fieldCopy.name.errors.required;
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = fieldCopy.name.errors.min;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nextErrors.email = fieldCopy.email.errors.required;
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = fieldCopy.email.errors.invalid;
    }

    if (!formData.notes.trim()) {
      nextErrors.notes = fieldCopy.notes.errors.required;
    } else if (formData.notes.trim().length < 10) {
      nextErrors.notes = fieldCopy.notes.errors.min;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // 2025-02-15 11:40: 组装 mailto 链接，将用户输入内容填充到主题与正文
  const buildMailtoLink = () => {
    const subject = `[CanDe Contact] ${formData.name || "Visitor"}`;
    const bodySegments = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      "Message:",
      formData.notes
    ].join("\n");
    const params = new URLSearchParams();
    params.set("subject", subject);
    params.set("body", bodySegments);
    if (formData.email.trim()) {
      // 2025-02-15 12:35: 同步填充 from 参数，方便邮件客户端预设发件人
      params.set("from", formData.email.trim());
    }
    return `mailto:admin@lycium.ai?${params.toString()}`;
  };

  /**
   * 2025-02-15 11:40: 通过 mailto 拉起默认邮件客户端，向 admin@lycium.ai 发送内容
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (typeof window !== "undefined") {
        window.location.href = buildMailtoLink();
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", notes: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-[10] overflow-visible py-20">
      <GlowEffect
        top="-40px"
        src="/assets/icons/insp-hero-eclipse.svg"
        width={1000}
        height={1000}
        priority={false}
        className="left-1/2 -translate-x-1/2"
        imageClassName="rounded-[44px]"
      />

      <div className="mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold text-white">{t("title")}</h2>
          <p className="mt-6 text-2xl text-[#929292]">{t("description")}</p>
          {submitSuccess && <p className="mt-2 text-base text-emerald-400">{fieldCopy.actions.success}</p>}
        </div>

        <div className="mx-auto max-w-[520px] rounded-[32px] border border-white/15 bg-[#181818] p-6 backdrop-blur-sm sm:p-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label htmlFor="contact-name" className="text-base font-medium text-white">
                {fieldCopy.name.label}
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder={fieldCopy.name.placeholder}
                className={`${fieldShellClass} rounded-full`}
                autoComplete="name"
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="contact-email" className="text-base font-medium text-white">
                {fieldCopy.email.label}
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder={fieldCopy.email.placeholder}
                className={`${fieldShellClass} rounded-full`}
                autoComplete="email"
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="contact-notes" className="text-base font-medium text-white">
                {fieldCopy.notes.label}
              </label>
              <textarea
                id="contact-notes"
                rows={5}
                value={formData.notes}
                onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
                placeholder={fieldCopy.notes.placeholder}
                className={`${fieldShellClass} min-h-[180px] resize-none rounded-[28px] leading-relaxed`}
              />
              {errors.notes && <p className="text-sm text-red-400">{errors.notes}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${btnPrimary} inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isSubmitting ? fieldCopy.actions.submitting : fieldCopy.actions.submit}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M14.1673 5.8335L5.83398 14.1668M14.1673 5.8335H6.66732M14.1673 5.8335V13.3335" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
