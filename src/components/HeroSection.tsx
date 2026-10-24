"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, BadgeCheck, CheckCircle2, Search } from "lucide-react";

const popularSearches = ["Claude AI", "Vibe Coding", "Excel", "Tiếng Anh", "Facebook Ads", "Photoshop"];

const promoBanners = [
  "/images/banner_flash_sale.webp",
  "/images/banner_vip_599k.webp",
  "/images/banner_ai_coding.webp",
];

const toasts = [
  { name: "Th*** ****", action: "đã đăng ký", course: "Combo 3 Khóa Học Business Analysis", time: "1 giờ trước" },
  { name: "Ngu*** ***", action: "vừa mua", course: "Khóa Học Content Marketing MindX", time: "3 phút trước" },
  { name: "Le* ****", action: "đã nhận link", course: "Full Combo Khóa Học AI", time: "12 phút trước" },
];

export default function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const goSearch = (q: string) => {
    const term = q.trim();
    router.push(term ? `/mua?q=${encodeURIComponent(term)}` : "/mua");
  };

  useEffect(() => {
    const t1 = setInterval(() => setSlide((p) => (p + 1) % promoBanners.length), 5000);
    const t2 = setInterval(() => setToast((p) => (p + 1) % toasts.length), 4000);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  const activeToast = toasts[toast];

  return (
    <section className="relative bg-[#171a1c] text-white overflow-hidden border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a43c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#e11d2e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Text */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ab3d]/15 border border-[#d5ab3d]/30 text-[#f3dc85] text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Giá sinh viên
            </span>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] text-balance">
              Khóa học online giá rẻ.
              <br />
              <span className="text-[#f3dc85]">Học ngay sau thanh toán.</span>
            </h1>

            <p className="mt-5 text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
              Marketing, thiết kế, tin học, ngoại ngữ. Chọn khóa, thanh toán và nhận
              tài liệu qua Google Drive — học trọn đời, cập nhật miễn phí.
            </p>

            {/* Ô tìm kiếm nổi bật */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goSearch(query);
              }}
              className="mt-7 flex items-center gap-2 p-1.5 rounded-2xl bg-white shadow-2xl shadow-black/30 max-w-xl"
            >
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Bạn muốn học gì hôm nay?"
                aria-label="Tìm khóa học"
                className="flex-1 min-w-0 bg-transparent text-slate-900 placeholder:text-gray-400 text-sm md:text-base py-2.5 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-sm hover:brightness-110 transition"
              >
                Tìm
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2 max-w-xl">
              <span className="text-[11px] text-gray-400">Phổ biến:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => goSearch(term)}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#d5ab3d]/60 hover:text-[#f3dc85] text-[11px] text-gray-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/mua"
                className="px-3 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-[13px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-[#d5ab3d]/30 hover:scale-105 transition-transform"
              >
                <span className="sm:hidden">Xem khóa học</span>
                <span className="hidden sm:inline">Khám phá khóa học</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/huong-dan-mua-hang"
                className="px-3 sm:px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold text-[13px] sm:text-sm text-center transition-colors"
              >
                Cách mua khóa học
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2.000+ khóa học chất lượng
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Truy cập vĩnh viễn
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hỗ trợ 24/7
              </span>
            </div>
          </div>

          {/* Right: Image card + floating toast */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/10] bg-[#252a2d]">
              {promoBanners.map((src, idx) => (
                <Image
                  key={src}
                  src={src}
                  alt="Kho tri thức 2000+ khóa học"
                  fill
                  priority={idx === 0}
                  className={`object-cover transition-opacity duration-700 ${
                    idx === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>

            {/* Floating "vừa đăng ký" toast */}
            <div className="hidden sm:flex absolute -bottom-5 left-6 max-w-xs bg-white text-slate-900 rounded-2xl shadow-2xl p-3.5 items-center gap-3 border border-black/5">
              <div className="w-10 h-10 rounded-full bg-[#d5ab3d]/20 text-[#b88d22] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-900 truncate">
                  {activeToast.name} <span className="text-emerald-600 font-semibold">{activeToast.action}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{activeToast.course}</div>
                <div className="text-[10px] text-slate-400">{activeToast.time}</div>
              </div>
            </div>

            {/* Slide dots */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
              {promoBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === slide ? "w-6 bg-[#d5ab3d]" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
