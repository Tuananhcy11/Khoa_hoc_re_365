"use client";

import Image from "next/image";
import { X, Star, Users, Check, ShoppingCart, MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useCart } from "@/components/CartProvider";
import type { Course } from "@/types";

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onAddToCart?: (course: Course) => void;
}

export default function CourseDetailModal({
  course,
  onClose,
}: CourseDetailModalProps) {
  const cart = useCart();
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#1e2326] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-[#171a1c]">
          <span className="text-xs font-bold text-[#d5ab3d] uppercase tracking-wider">
            {course.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5">
            <Image
              src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
              alt={course.title}
              fill
              className="object-cover"
            />
            {course.discount && (
              <span className="absolute top-3 left-3 bg-[#e11d2e] text-white text-xs font-black px-3 py-1 rounded-lg">
                Giảm {course.discount}
              </span>
            )}
          </div>

          {/* Title & Stats */}
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white leading-snug mb-3">
              {course.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>5.0 (120+ đánh giá)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{course.studentsCount} học viên đã đăng ký</span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 rounded-2xl bg-[#252a2d] border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">Giá khuyến mãi hôm nay:</div>
              <div className="text-2xl font-black text-[#f3dc85]">{course.salePrice}</div>
              <div className="text-xs text-gray-500 line-through">Giá gốc: {course.regularPrice}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Tiết kiệm đến 95%
              </span>
            </div>
          </div>

          {/* What you get */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Bạn sẽ nhận được:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Truy cập trọn đời vĩnh viễn</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Link Google Drive VIP tốc độ cao</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Video Full HD + Audio trong trẻo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Đầy đủ tài liệu & mã nguồn thực hành</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Tự động cập nhật bài mới nếu có</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d5ab3d]" />
                <span>Hỗ trợ kỹ thuật 24/7 qua Zalo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-[#171a1c] flex items-center justify-end gap-3">
          <button
            onClick={() => {
              cart.add(course);
              onClose();
            }}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>

          <a
            href={siteConfig.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] hover:from-[#e1bc40] hover:to-[#c99a2c] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-[#d5ab3d]/30 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mua ngay qua Zalo ({siteConfig.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
