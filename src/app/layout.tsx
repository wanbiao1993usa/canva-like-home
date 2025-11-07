import type { ReactNode } from "react";
import "./globals.css";
import { fontSans } from "./fonts";

export const metadata = {
  title: "CanDe",
  description: "AI 让创作更简单 | CanDe",
};

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * 2024-07-08: 根布局负责引入字体并在 body 层添加噪点背景，统一全局观感
 */
export default function RootLayout({ children }: RootLayoutProps) {
  /**
   * 2024-07-08: Body 设置粒子纹理背景，内容包裹层保持在伪元素之上
   */
  return (
    <html lang="zh-CN" className="overflow-x-hidden">
      <body
        className={`${fontSans.className} relative min-h-screen bg-[#111111] text-[#e5e5e5] antialiased before:absolute before:inset-0 before:-z-10 before:content-[''] before:pointer-events-none before:opacity-80 before:blur-[1px] before:bg-[radial-gradient(circle_at_center,_rgba(200,200,200,0.1)_1px,_transparent_1px)] before:bg-[size:6px_6px]`}
      >
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
