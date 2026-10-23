"use client";

import { useState, useEffect } from "react";
import { Flame, Clock, Sparkles } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { getFlashSaleState, padZero, type FlashSaleTimer } from "@/lib/flashSaleUtil";
import type { Course } from "@/types";

interface FlashSaleSectionProps {
  courses: Course[];
  onAddToCart: (course: Course) => void;
  onToggleWishlist: (course: Course) => void;
  wishlistIds: Set<string>;
  cartIds?: Set<string>;
  onSelectCourse: (course: Course) => void;
}

export default function FlashSaleSection({
  courses,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  onSelectCourse,
}: FlashSaleSectionProps) {
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

  const flashCourses = courses.filter((c) => c.isFlashSale).slice(0, 8);
  const displayCourses = flashCourses.length > 0 ? flashCourses : courses.slice(0, 8);

  return (
    <section id="flash-sale" className="py-10 bg-gradient-to-b from-[#171a1c] to-[#252a2d] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <div className="bg-[#121619] rounded-3xl p-5 md:p-6 border border-[#e11d2e]/30 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Title & Info */}
            <div className="flex items-center gap-3.5">
              <span className="p-3 rounded-2xl bg-[#e11d2e] text-white animate-pulse shrink-0">
                <Flame className="w-7 h-7 fill-white" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
                    Flash Sale Theo Khung Giờ
                  </h2>
                  {mounted && timer.isActive && (
                    <span className="bg-[#d5ab3d] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      Đang Mở
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Mở bán chớp nhoáng <strong>1 tiếng</strong> · Nghỉ <strong>1 tiếng</strong> · Vòng lặp liên tục mỗi ngày
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-[#252a2d] px-4 py-2.5 rounded-2xl border border-white/10 text-xs font-mono font-bold text-white">
              <span className="text-gray-400 font-sans text-[11px] uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#e11d2e]" />
                <span>{timer.label}:</span>
              </span>

              <span className="bg-[#e11d2e] px-2 py-1 rounded text-white font-black">{padZero(timer.hours)}</span>
              <span className="text-gray-400">:</span>
              <span className="bg-[#e11d2e] px-2 py-1 rounded text-white font-black">{padZero(timer.minutes)}</span>
              <span className="text-gray-400">:</span>
              <span className="bg-[#e11d2e] px-2 py-1 rounded text-white font-black">{padZero(timer.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Flash Sale Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayCourses.map((course) => (
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
      </div>
    </section>
  );
}
