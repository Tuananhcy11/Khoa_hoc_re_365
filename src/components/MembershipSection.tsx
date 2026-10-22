import Link from "next/link";
import { Crown, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface Tier {
  tag: string;
  label: string;
  name: string;
  desc: string;
  price: string;
  perDay: string;
  maxPrice: string;
  duration: string;
}

const tiers: Tier[] = [
  { tag: "Gói 01", label: "Trải nghiệm", name: "Hội viên Start", desc: "Phù hợp để bắt đầu học đều đặn với chi phí thấp.", price: "99.000 ₫", perDay: "1 khóa", maxPrice: "50.000 ₫", duration: "30 ngày" },
  { tag: "Gói 02", label: "Phổ biến", name: "Hội viên Flex", desc: "Nhiều lựa chọn hơn cho người học cần học liên tục.", price: "199.000 ₫", perDay: "1 khóa", maxPrice: "100.000 ₫", duration: "45 ngày" },
  { tag: "Gói 03", label: "Hội viên", name: "Hội viên Plus", desc: "Học trong 60 ngày và chọn cả các khóa thuộc Combo.", price: "299.000 ₫", perDay: "2 khóa", maxPrice: "150.000 ₫", duration: "60 ngày" },
  { tag: "Gói 04", label: "Hội viên", name: "Hội viên Pro", desc: "Mở rộng lựa chọn khóa và combo trong suốt 90 ngày.", price: "399.000 ₫", perDay: "3 khóa", maxPrice: "200.000 ₫", duration: "90 ngày" },
  { tag: "Gói 05", label: "Hội viên", name: "Hội viên VIP", desc: "Quyền lựa chọn rộng nhất trong 360 ngày, gồm combo.", price: "490.000 ₫", perDay: "5 khóa", maxPrice: "300.000 ₫", duration: "360 ngày" },
];

export default function MembershipSection() {
  return (
    <section id="pricing" className="py-12 sm:py-16 bg-[#171a1c] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c9a43c]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ab3d]/15 border border-[#d5ab3d]/30 text-[#f3dc85] text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" /> Đặc quyền hội viên
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white text-balance">
            Học đều mỗi ngày, tiết kiệm hơn mỗi khóa
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Chủ động nhận những khóa học phù hợp với mục tiêu của bạn. Khóa đã nhận được lưu trong tài khoản để học trọn đời.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Featured: Trọn bộ 599K */}
          <div className="relative rounded-3xl p-7 bg-gradient-to-br from-[#2a2f33] to-[#1e2326] border-2 border-[#d5ab3d] shadow-2xl shadow-[#d5ab3d]/20 flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#d5ab3d]/15 rounded-full blur-2xl" />
            <div className="relative">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider text-slate-950 bg-[#f3dc85] px-2.5 py-1 rounded-md mb-4">
                Trọn bộ website · Tiết kiệm nhất
              </span>
              <h3 className="text-xl font-bold text-white">Trọn bộ hơn 2.000 khóa học</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Truy cập toàn bộ kho khóa học trên website và nhận các nội dung mới được cập nhật liên tục.
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-xs text-gray-400">Chỉ một lần</span>
                <span className="text-3xl sm:text-4xl font-black text-[#f3dc85] whitespace-nowrap">599.999 ₫</span>
              </div>

              <div className="mt-5 space-y-2.5 text-xs text-gray-200">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d5ab3d]" /> Quyền truy cập: Toàn bộ website</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d5ab3d]" /> Thời hạn: Trọn đời</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d5ab3d]" /> Cập nhật khóa mới miễn phí</div>
              </div>
            </div>

            <Link
              href="/hoi-vien"
              className="relative mt-7 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-[#d5ab3d]/30 hover:scale-[1.02] transition-transform"
            >
              <Crown className="w-4 h-4" /> Xem gói 599K
            </Link>
          </div>

          {/* 5 tiers — mobile: dải vuốt ngang; sm trở lên: lưới */}
          {/* min-w-0: không cho ô lưới giãn theo dải vuốt ngang bên trong */}
          <div className="lg:col-span-2 min-w-0">
            <p className="sm:hidden text-[11px] text-gray-400 mb-2">Vuốt để xem 5 gói hội viên →</p>
            <div className="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 content-start overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="w-[78%] shrink-0 snap-start sm:w-auto rounded-2xl p-5 bg-[#1e2326] border border-white/10 hover:border-[#d5ab3d]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.tag}</span>
                    <span className="text-[10px] font-semibold text-[#f3dc85] bg-[#d5ab3d]/15 px-2 py-0.5 rounded-full">{t.label}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed min-h-[32px]">{t.desc}</p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-[11px] text-gray-400">Từ</span>
                    <span className="text-2xl font-black text-white">{t.price}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-[11px] text-gray-300">
                    <div className="flex items-center justify-between"><span className="text-gray-400">Mỗi ngày</span><span className="font-semibold text-white">{t.perDay}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-400">Giá khóa tối đa</span><span className="font-semibold text-white">{t.maxPrice}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-400">Thời hạn</span><span className="font-semibold text-white">{t.duration}</span></div>
                  </div>
                </div>

                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  Xem quyền lợi <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
