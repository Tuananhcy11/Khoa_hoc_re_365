import { Sparkles, PhoneCall, Crown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function ClosingCta() {
  return (
    <section className="py-16 bg-[#171a1c] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d5ab3d]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ab3d]/15 border border-[#d5ab3d]/30 text-[#f3dc85] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Cơ hội vàng nâng cao kỹ năng
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          Sở Hữu Trọn Bộ 2.000+ Khóa Học <br />
          <span className="text-[#f3dc85]">Chỉ Với 599.000 ₫ Trọn Đời</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 mb-8 leading-relaxed">
          Đừng bỏ lỡ kho tài nguyên tri thức khổng lồ bao gồm Lập trình, AI, Marketing, Ngoại ngữ và Thiết kế đồ họa. Cập nhật miễn phí liên tục hàng tuần.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] hover:from-[#e1bc40] hover:to-[#c99a2c] text-slate-950 font-black text-sm shadow-xl shadow-[#d5ab3d]/25 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Crown className="w-4 h-4" />
            <span>Đăng Ký Gói 599K Ngay</span>
          </a>

          <a
            href={siteConfig.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#252a2d] hover:bg-[#30363b] text-white border border-white/10 font-bold text-sm flex items-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#d5ab3d]" />
            <span>Chat Zalo: {siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
