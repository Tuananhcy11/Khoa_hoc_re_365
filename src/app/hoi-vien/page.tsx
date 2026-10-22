"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembershipSection from "@/components/MembershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CartModal from "@/components/CartModal";
import Link from "next/link";
import { Crown, Sparkles, Check, ShieldCheck, Zap, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function HoiVienPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const perks = [
    "Quyền truy cập toàn bộ hơn 2.000+ khóa học hiện có trên website",
    "Tự động cập nhật các khóa học mới mỗi tuần (AI, Lập trình, Marketing...)",
    "Link thư mục Google Drive VIP tốc độ cao, không giới hạn dung lượng tải",
    "Xem online tiện lợi trên máy tính, điện thoại hoặc tải trọn bộ về lưu trữ",
    "Kèm trọn bộ công cụ Tool tải video Drive chặn tải, Backup Master",
    "Bảo hành link tải trọn đời, hỗ trợ kỹ thuật ưu tiên 1-1 qua Zalo"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#171a1c] text-white">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#d5ab3d]/15 border border-[#d5ab3d]/30 text-[#f3dc85] text-xs font-black uppercase tracking-wider mb-6">
            <Crown className="w-4 h-4" /> Đặc Quyền Hội Viên VIP
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Gói Trọn Bộ Hơn 2.000+ Khóa Học <br />
            <span className="text-[#f3dc85]">Truy Cập Vĩnh Viễn Chỉ 599.000 ₫</span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Giải pháp thông minh nhất dành cho lập trình viên, marketer, người làm MMO và sinh viên. Tiết kiệm hơn 99% so với mua lẻ từng khóa học.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] hover:from-[#e1bc40] hover:to-[#c99a2c] text-slate-950 font-black text-sm shadow-xl shadow-[#d5ab3d]/30 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              <span>Đăng Ký Gói 599K Ngay</span>
            </a>

            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#252a2d] hover:bg-[#30363b] text-white border border-white/10 font-bold text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#d5ab3d]" />
              <span>Tư Vấn Zalo: {siteConfig.phone}</span>
            </a>
          </div>
        </div>

        {/* Perks Grid */}
        <div className="max-w-5xl mx-auto px-4 mb-20">
          <div className="bg-[#252a2d] rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d5ab3d]" />
              Tất Cả Đặc Quyền Dành Cho Bạn:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1e2326] border border-white/5">
                  <div className="p-1 rounded-full bg-[#d5ab3d] text-slate-950 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs text-gray-200 leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <MembershipSection />

        {/* Testimonials */}
        <TestimonialsSection testimonials={siteData.testimonials} />

        {/* FAQ */}
        <FaqSection faqs={siteData.faqs} />
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
