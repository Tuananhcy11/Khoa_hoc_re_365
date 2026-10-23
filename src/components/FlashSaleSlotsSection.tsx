"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, ArrowRight } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { getFlashSaleState, padZero, type FlashSaleTimer } from "@/lib/flashSaleUtil";
import type { Course } from "@/types";

interface FlashSaleSlotsSectionProps {
  courses: Course[];
  onAddToCart: (course: Course) => void;
  onToggleWishlist: (course: Course) => void;
  wishlistIds: Set<string>;
  cartIds?: Set<string>;
  onSelectCourse: (course: Course) => void;
}

export default function FlashSaleSlotsSection({
  courses,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  onSelectCourse,
}: FlashSaleSlotsSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState<FlashSaleTimer>(() => getFlashSaleState(new Date()));

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      setTimer(getFlashSaleState(new Date()));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-[#171a1c] to-[#1e2326] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Red Flash Sale Header Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-[#e11d2e] to-[#b8121f] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-[#e11d2e]/20 mb-8">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-white/15 text-white animate-pulse">
              <Flame className="w-5 h-5 fill-white" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  Flash Sale Theo Khung Giờ
                </h2>
                {mounted && timer.isActive && (
                  <span className="bg-[#d5ab3d] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-bounce">
                    Đang diễn ra
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/90 mt-0.5">
                Mở bán chớp nhoáng <strong>1 tiếng</strong> · Nghỉ <strong>1 tiếng</strong> · Vòng lặp liên tục mỗi ngày
              </p>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] uppercase font-bold text-white/90 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{timer.label}</span>
            </span>

            <div className="flex items-center gap-1 font-mono font-black">
              <span className="bg-black/35 rounded-md px-2 py-1 text-sm tabular-nums">
                {padZero(timer.hours)}
              </span>
              <span className="text-white/70">:</span>
              <span className="bg-black/35 rounded-md px-2 py-1 text-sm tabular-nums">
                {padZero(timer.minutes)}
              </span>
              <span className="text-white/70">:</span>
              <span className="bg-black/35 rounded-md px-2 py-1 text-sm tabular-nums">
                {padZero(timer.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="dark"
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onSelectCourse={onSelectCourse}
              isWished={wishlistIds.has(course.id)}
              inCart={cartIds?.has(course.id)}
            />
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          ⚡ Giá Flash Sale áp dụng tự động trong phiên đang diễn ra. Phiên mới sẽ mở lại sau 1 tiếng.
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/flash-sale"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#e11d2e] hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-[#e11d2e]/30 transition-all"
          >
            <span>Xem tất cả khóa học Flash Sale</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
