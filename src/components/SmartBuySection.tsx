import Link from "next/link";
import { Route, SlidersHorizontal, Crown, ArrowRight } from "lucide-react";

const options = [
  {
    icon: Route,
    title: "Combo theo lộ trình",
    desc: "Nhiều khóa liên quan, chi phí tiết kiệm",
    href: "/danh-muc/combo-khoa-hoc",
  },
  {
    icon: SlidersHorizontal,
    title: "Khóa học chọn lọc",
    desc: "Nội dung thực chiến, cập nhật thường xuyên",
    href: "/mua",
  },
  {
    icon: Crown,
    title: "Gói hội viên",
    desc: "Nhận khóa mỗi ngày, khóa đã nhận được học trọn đời",
    href: "/hoi-vien",
  },
];

export default function SmartBuySection() {
  return (
    <section className="py-10 sm:py-14 bg-[#faf8f2] border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
            Mua thông minh hơn
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#171a1c] text-balance">
            Học nhiều hơn, tiết kiệm hơn
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Chọn gói phù hợp nếu bạn đang cần nhiều hơn một khóa học.
          </p>
        </div>

        {/* Mobile: mỗi lựa chọn là 1 hàng ngang gọn; md trở lên: 3 thẻ dọc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <Link
                key={o.title}
                href={o.href}
                className="group relative p-4 md:p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-[#c9a43c]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 overflow-hidden"
              >
                <div className="hidden md:block absolute -right-6 -top-6 w-24 h-24 bg-[#c9a43c]/5 rounded-full group-hover:bg-[#c9a43c]/10 transition-colors" />
                <div className="relative w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-2xl bg-[#171a1c] text-[#f3dc85] group-hover:bg-[#c9a43c] group-hover:text-white flex items-center justify-center transition-colors shadow-md md:mb-4">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="relative flex-1 min-w-0 md:flex md:flex-col">
                  <h3 className="text-sm md:text-base font-bold text-[#171a1c] group-hover:text-[#c9a43c] transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 md:mt-1.5 leading-relaxed md:flex-1">
                    {o.desc}
                  </p>
                  <span className="hidden md:inline-flex mt-4 items-center gap-1.5 text-xs font-bold text-[#c9a43c]">
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <ArrowRight className="md:hidden w-4 h-4 shrink-0 text-gray-300 group-hover:text-[#c9a43c]" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
