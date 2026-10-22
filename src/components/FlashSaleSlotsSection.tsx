"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, ArrowRight } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/types";

interface FlashSaleSlotsSectionProps {
  courses: Course[];
  onAddToCart: (course: Course) => void;
  onToggleWishlist: (course: Course) => void;
  wishlistIds: Set<string>;
  cartIds?: Set<string>;
  onSelectCourse: (course: Course) => void;
}

const slots = ["09:00", "12:00", "15:00", "18:00", "21:00"];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function FlashSaleSlotsSection({
  courses,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  onSelectCourse,
}: FlashSaleSlotsSectionProps) {
  // Countdown to the next whole hour (demo behaviour)
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(now.getHours() + 1, 0, 0, 0);
      const diff = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
      setRemaining({ h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-[#171a1c] to-[#1e2326] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar */}
        <div className="rounded-2xl bg-gradient-to-r from-[#e11d2e] to-[#b8121f] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-[#e11d2e]/20 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-white/15 text-white animate-pulse">
              <Flame className="w-5 h-5 fill-white" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase text-white leading-tight">Flash Sale theo khung giờ</h2>
              <p className="text-[11px] text-white/80">Giảm thêm 5–10% · áp giá thật lúc thanh toán</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase font-bold text-white/80 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Bắt đầu sau
            </span>
            <div className="flex items-center gap-1 font-mono font-black">
              {[remaining.h, remaining.m, remaining.s].map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="bg-black/30 rounded-md px-2 py-1 text-sm tabular-nums">{pad(v)}</span>
                  {i < 2 && <span className="text-white/70">:</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-8">
          {slots.map((slot, idx) => (
            <div
              key={slot}
              className={`rounded-xl py-2.5 text-center border transition-colors ${
                idx === 0
                  ? "bg-[#d5ab3d] border-[#d5ab3d] text-slate-950"
                  : "bg-[#252a2d] border-white/10 text-gray-300"
              }`}
            >
              <div className="text-sm sm:text-base font-black tabular-nums">{slot}</div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase opacity-80">
                {idx === 0 ? "Đang mở" : "Sắp mở"}
              </div>
            </div>
          ))}
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

        <p className="text-center text-[11px] text-gray-500 mt-6">
          Giá Flash chỉ hiệu lực trong khung đang diễn ra và được tính lại lúc tạo đơn.
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/flash-sale"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#e11d2e] hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-[#e11d2e]/30 transition-all"
          >
            <span>Xem tất cả Flash Sale</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
