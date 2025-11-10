'use client';

import { useState } from "react";
import { btnPrimary, transitionAll } from "../../ui";
import GlowEffect from "../common/GlowEffect";

type FormData = {
  name: string;
  email: string;
  notes: string;
};

type FormErrors = Partial<FormData>;

/**
 * 2025-11-10 21:05: 联系我们表单 —— 支持基础验证与提交体验
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 2025-11-11 10:30: 输入域视觉升级以贴合最新表单设计
  const fieldShellClass =
    `w-full mt-2 border border-white/10 bg-[#111111] px-6 py-4 text-base text-white placeholder:text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${transitionAll} focus:border-[#AE89FF] focus:ring-2 focus:ring-[#AE89FF]/40 focus:outline-none`;

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "请输入您的姓名";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "姓名至少需要 2 个字符";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nextErrors.email = "请输入您的邮箱";
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = "请输入有效的邮箱地址";
    }

    if (!formData.notes.trim()) {
      nextErrors.notes = "请输入留言内容";
    } else if (formData.notes.trim().length < 10) {
      nextErrors.notes = "留言内容至少需要 10 个字符";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", notes: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("提交失败：", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-[10] py-20 overflow-visible">
      {/* 2025-11-11 11:20: 提升层级，确保光影溢出时不会被上方区域遮挡 */}
      <GlowEffect
        top="-40px"
        src="/assets/icons/insp-hero-eclipse.svg"
        width={1000}
        height={1000}
        alt="灵感光影"
        priority={false}
        className="left-1/2 -translate-x-1/2 z-[60] w-[1000px] h-[1000px]"
        imageClassName="rounded-[44px]"
      />

      <div className="mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold text-white">给我们留言</h2>
          <p className="mt-6 text-2xl text-[#929292]">填写下方表单向我们发送消息。我们的团队通常会在 72 小时内回复。</p>
        </div>

        {/* 2025-11-11 10:35: 表单卡片化容器，呼应设计稿中的柔和圆角面板 */}
        <div className="max-w-[520px] mx-auto rounded-[32px] border border-white/15 bg-[#181818] p-6 backdrop-blur-sm sm:p-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label htmlFor="contact-name" className="text-base font-medium text-white">
                姓名
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Jonas Khanwald"
                className={`${fieldShellClass} rounded-full`}
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="contact-email" className="text-base font-medium text-white">
                邮箱
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="jonas@mail.com"
                className={`${fieldShellClass} rounded-full`}
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="contact-notes" className="text-base font-medium text-white">
                备注
              </label>
              <textarea
                id="contact-notes"
                rows={5}
                value={formData.notes}
                onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
                placeholder="关于 CanDe 的更多详情"
                className={`${fieldShellClass} rounded-[28px] min-h-[180px] resize-none leading-relaxed`}
              />
              {errors.notes && <p className="text-sm text-red-400">{errors.notes}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${btnPrimary} inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isSubmitting ? "提交中..." : "提交"}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.1673 5.8335L5.83398 14.1668M14.1673 5.8335H6.66732M14.1673 5.8335V13.3335" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
