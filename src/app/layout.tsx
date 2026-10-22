import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import SupportDock from "@/components/SupportDock";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Học Rẻ 365 - Share khóa học giá rẻ, uy tín, chất lượng",
  description: "Khám phá hàng ngàn khóa học online chất lượng thuộc nhiều lĩnh vực với mức giá tốt, nhận khóa học nhanh chóng và hỗ trợ tận tâm tại Học Rẻ 365.",
  icons: {
    icon: "/images/logo-hocre365.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#faf8f2] text-[#171717] pb-14 lg:pb-0">
        {children}
        <SupportDock />
        <MobileBottomNav />
      </body>
    </html>
  );
}
