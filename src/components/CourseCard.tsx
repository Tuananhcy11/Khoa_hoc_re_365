"use client";

import Image from "next/image";
import { Star, ShoppingCart, Heart, Check, Flame, Sparkles } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onToggleWishlist?: (course: Course) => void;
  isWished?: boolean;
  // Các prop giỏ hàng cũ giữ lại cho tương thích, nhưng CourseCard tự dùng CartProvider
  onAddToCart?: (course: Course) => void;
  inCart?: boolean;
  isNew?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

const BESTSELLER_MIN_STUDENTS = 1000;

// "47.499 ₫" -> 47499
function parsePrice(price: string): number {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

// 7952501 -> "7,95 triệu", 452000 -> "452K"
function formatSaving(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} triệu`;
  }
  return `${Math.round(amount / 1000)}K`;
}

export default function CourseCard({
  course,
  onToggleWishlist,
  onSelectCourse,
  isWished = false,
  isNew = false,
  variant = "light",
  className = "",
}: CourseCardProps) {
  const cart = useCart();
  const inCart = cart.has(course.id);
  const dark = variant === "dark";
  const sale = parsePrice(course.salePrice);
  const regular = parsePrice(course.regularPrice);
  const saving = regular > sale ? regular - sale : 0;
  // Làm tròn xuống và chặn ở 99% để không bao giờ hiện "100%" khi khóa vẫn có giá
  const percent = regular > 0 ? Math.min(99, Math.floor((saving / regular) * 100)) : 0;
  const isBestseller = course.studentsCount >= BESTSELLER_MIN_STUDENTS;

  return (
    <div
      // @container: thẻ tự thu gọn theo bề rộng của chính nó (vd. lưới 2 cột trên mobile)
      className={`@container group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "bg-[#252a2d] border-white/10 hover:border-[#d5ab3d]/50"
          : "bg-white border-gray-200 hover:border-[#c9a43c]/60 shadow-sm"
      } ${className}`}
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onSelectCourse(course)}
        className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden text-left"
        aria-label={`Xem chi tiết ${course.title}`}
      >
        <Image
          src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {isBestseller && (
            <span className="inline-flex items-center gap-1 bg-[#e11d2e] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
              <Flame className="w-3 h-3 fill-white" /> Bán chạy
            </span>
          )}
          {isNew && (
            <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
              <Sparkles className="w-3 h-3" /> Mới
            </span>
          )}
        </div>

        {percent > 0 && (
          <span className="absolute bottom-2 left-2 bg-[#171a1c]/85 backdrop-blur-sm text-[#f3dc85] text-[10px] @[15rem]:text-[11px] font-black px-2 py-0.5 rounded-md">
            <span className="@[15rem]:hidden">−{percent}%</span>
            <span className="hidden @[15rem]:inline">Tiết kiệm {percent}%</span>
          </span>
        )}
      </button>

      {/* Content */}
      <div className="p-3 @[15rem]:p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className={`text-[10px] font-bold uppercase truncate ${dark ? "text-[#d5ab3d]" : "text-[#c9a43c]"}`}>
            {course.category}
          </span>
          <button
            type="button"
            onClick={() => onToggleWishlist?.(course)}
            aria-label={isWished ? "Bỏ yêu thích" : "Yêu thích"}
            className={`p-1 rounded-md shrink-0 transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          >
            <Heart
              className={`w-4 h-4 ${isWished ? "fill-[#e11d2e] text-[#e11d2e]" : "text-gray-400"}`}
            />
          </button>
        </div>

        <h3
          onClick={() => onSelectCourse(course)}
          className={`text-xs @[15rem]:text-[13px] font-bold line-clamp-2 cursor-pointer leading-snug min-h-[2lh] ${
            dark ? "text-white hover:text-[#f3dc85]" : "text-[#171a1c] hover:text-[#c9a43c]"
          }`}
        >
          {course.title}
        </h3>

        <div className={`flex items-center gap-1.5 text-[11px] mt-2 whitespace-nowrap overflow-hidden ${dark ? "text-gray-400" : "text-gray-500"}`}>
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
          <span className="font-bold text-amber-500">{course.rating.toFixed(1)}</span>
          <span>·</span>
          <span className="truncate">{course.studentsCount.toLocaleString("vi-VN")} học viên</span>
        </div>

        {/* Price — thẻ hẹp: chip tiết kiệm xuống dòng thay vì đè lên giá */}
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-2 gap-y-1.5">
          <div>
            <div className={`text-base @[15rem]:text-lg font-black leading-none whitespace-nowrap ${dark ? "text-[#f3dc85]" : "text-[#171a1c]"}`}>
              {course.salePrice}
            </div>
            <div className={`text-[11px] line-through mt-1 whitespace-nowrap ${dark ? "text-gray-500" : "text-gray-400"}`}>
              {course.regularPrice}
            </div>
          </div>
          {saving > 0 && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded whitespace-nowrap">
              −{formatSaving(saving)}
            </span>
          )}
        </div>

        {/* Actions — thẻ hẹp: chỉ còn 1 nút giỏ hàng rộng; bấm ảnh/tên để xem chi tiết */}
        <div className="mt-auto pt-3 @[15rem]:pt-4 grid grid-cols-1 @[15rem]:grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => cart.add(course)}
            className={`py-2.5 px-2 rounded-xl font-black text-xs whitespace-nowrap flex items-center justify-center gap-1.5 transition-all ${
              inCart
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 hover:brightness-110 shadow-md shadow-[#d5ab3d]/25"
            }`}
          >
            {inCart ? <Check className="w-4 h-4 shrink-0" /> : <ShoppingCart className="w-4 h-4 shrink-0" />}
            {inCart ? (
              <>
                <span className="@[15rem]:hidden">Đã thêm</span>
                <span className="hidden @[15rem]:inline">Đã thêm vào giỏ</span>
              </>
            ) : (
              "Thêm vào giỏ"
            )}
          </button>
          <button
            type="button"
            onClick={() => onSelectCourse(course)}
            className={`hidden @[15rem]:block px-3 rounded-xl text-xs font-bold whitespace-nowrap border transition-colors ${
              dark
                ? "border-white/15 text-gray-200 hover:bg-white/10"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
