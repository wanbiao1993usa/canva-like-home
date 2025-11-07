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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body className={`${fontSans.className} bg-[#0d0d10] text-[#e5e5e5] antialiased`}>
        {children}
      </body>
    </html>
  );
}


