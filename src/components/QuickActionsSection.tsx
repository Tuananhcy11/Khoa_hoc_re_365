import Link from "next/link";
import { BookOpen, Zap, Crown, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const actions = [
  {
    icon: BookOpen,
    title: "Kho khóa học",
    short: "Khóa học",
    desc: "2.000+ khóa, lọc theo lĩnh vực",
    href: "/mua",
    external: false,
    tone: "bg-[#171a1c] text-[#f3dc85]",
  },
  {
    icon: Zap,
    title: "Flash Sale",
    short: "Flash Sale",
    desc: "Giảm thêm 5–10% theo khung giờ",
    href: "/flash-sale",
    external: false,
    tone: "bg-[#e11d2e] text-white",
  },
  {
    icon: Crown,
    title: "Trọn bộ 599K",
    short: "Gói 599K",
    desc: "Một lần trả, học trọn đời",
    href: "/hoi-vien",
    external: false,
    tone: "bg-gradient-to-br from-[#d7ae32] to-[#b88d22] text-slate-950",
  },
  {
    icon: MessageCircle,
    title: "Hỏi qua Zalo",
    short: "Zalo",
    desc: "Tư vấn chọn khóa trong vài phút",
    href: siteConfig.zaloUrl,
    external: true,
    tone: "bg-[#0068ff] text-white",
  },
];

export default function QuickActionsSection() {
  return (
    <section className="relative z-10 -mt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {actions.map((a) => {
            const Icon = a.icon;
            const content = (
              <>
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${a.tone}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] sm:text-sm font-bold text-[#171a1c] group-hover:text-[#b88d22] transition-colors whitespace-nowrap">
                    <span className="sm:hidden">{a.short}</span>
                    <span className="hidden sm:inline">{a.title}</span>
                  </div>
                  <div className="hidden sm:block text-[11px] text-gray-500 leading-snug mt-0.5">{a.desc}</div>
                </div>
                <ArrowRight className="hidden sm:block w-4 h-4 text-gray-300 group-hover:text-[#c9a43c] group-hover:translate-x-1 transition-all shrink-0" />
              </>
            );
            const className =
              // Mobile: icon trên, tên dưới (ô vuông gọn); sm trở lên: hàng ngang có mô tả
              "group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-gray-200/80 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-0.5 hover:border-[#c9a43c]/50 transition-all";

            return a.external ? (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <Link key={a.title} href={a.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
