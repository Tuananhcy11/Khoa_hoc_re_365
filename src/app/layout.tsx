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

const SITE_URL = "https://khoahocre365.com";
const TITLE = "Học Rẻ 365 - Share khóa học giá rẻ, uy tín, chất lượng";
const DESCRIPTION =
  "Khám phá hàng ngàn khóa học online chất lượng thuộc nhiều lĩnh vực với mức giá tốt, nhận khóa học nhanh chóng và hỗ trợ tận tâm tại Học Rẻ 365.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Học Rẻ 365",
  },
  description: DESCRIPTION,
  applicationName: "Học Rẻ 365",
  keywords: ["khóa học giá rẻ", "học online", "khóa học online", "Học Rẻ 365", "combo khóa học", "AI", "marketing", "lập trình"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo-hocre365.png",
    apple: "/images/logo-hocre365.png",
  },
  openGraph: {
    type: "website",
    siteName: "Học Rẻ 365",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "vi_VN",
    images: [
      {
        url: "/images/logo-hocre365.png",
        width: 1024,
        height: 1024,
        alt: "Học Rẻ 365",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/logo-hocre365.png"],
  },
  robots: {
    index: true,
    follow: true,
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
