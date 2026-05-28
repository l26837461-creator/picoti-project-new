import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const sourceHanSans = Noto_Sans_SC({
  variable: "--font-source-han-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  fallback: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Picati · 定制宠物产品",
  description: "为您的爱宠打造专属定制产品",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${sourceHanSans.variable} h-full antialiased`}>
      <body className="min-h-dvh overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
