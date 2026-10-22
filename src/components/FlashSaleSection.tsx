"use client";

import { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import CourseCard from "@/components/CourseCard";
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
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  const [activeSlot, setActiveSlot] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const flashCourses = courses.filter((c) => c.isFlashSale).slice(0, 8);
  const displayCourses = flashCourses.length > 0 ? flashCourses : courses.slice(0, 8);

  const slots = [
    { time: "09:00 - 14:00", label: "Đang diễn ra", active: true },
    { time: "14:00 - 19:00", label: "Sắp diễn ra", active: false },
    { time: "19:00 - 24:00", label: "Sắp diễn ra", active: false },
  ];

  return (
    <section id="flash-sale" className="py-12 bg-gradient-to-b from-[#171a1c] to-[#252a2d] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <div className="bg-[#121619] rounded-2xl p-5 md:p-6 border border-[#e11d2e]/30 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Title & Countdown */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#e11d2e] text-white animate-pulse">
                  <Flame className="w-6 h-6 fill-white" />
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                    FLASH SALE HÔM NAY
                  </h2>
                  <p className="text-xs text-gray-400">Số lượng ưu đãi có hạn trong khung giờ vàng</p>
                </div>
              </div>

              {/* Countdown Clock */}
              <div className="flex items-center gap-1.5 bg-[#252a2d] px-3.5 py-1.5 rounded-xl border border-white/10 text-sm font-mono font-bold text-white">
                <Clock className="w-4 h-4 text-[#e11d2e]" />
                <span className="bg-[#e11d2e] px-2 py-0.5 rounded text-white">{pad(timeLeft.hours)}</span>
                <span className="text-gray-400">:</span>
                <span className="bg-[#e11d2e] px-2 py-0.5 rounded text-white">{pad(timeLeft.minutes)}</span>
                <span className="text-gray-400">:</span>
                <span className="bg-[#e11d2e] px-2 py-0.5 rounded text-white">{pad(timeLeft.seconds)}</span>
              </div>
            </div>

            {/* Time Slot Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {slots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlot(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeSlot === idx
                      ? "bg-[#e11d2e] text-white border-[#e11d2e] shadow-lg shadow-[#e11d2e]/30"
                      : "bg-[#252a2d] text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{slot.time}</div>
                  <div className="text-[10px] opacity-80">{slot.label}</div>
                </button>
              ))}
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
