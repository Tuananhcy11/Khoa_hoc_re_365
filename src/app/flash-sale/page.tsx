"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import FlashSaleSection from "@/components/FlashSaleSection";
import Link from "next/link";
import { Flame, Clock, Sparkles } from "lucide-react";
import type { Course } from "@/types";

export default function FlashSalePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = siteData.courses as Course[];

  const handleAddToCart = (course: Course) => {
    if (!cartItems.some((item) => item.id === course.id)) {
      setCartItems((prev) => [...prev, course]);
    }
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (course: Course) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(course.id)) next.delete(course.id);
      else next.add(course.id);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#171a1c] text-white">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#f3dc85]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#f3dc85] font-semibold">Flash Sale Giờ Vàng</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e11d2e]/20 border border-[#e11d2e]/40 text-[#ff4d5e] text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-current" /> Sự kiện giảm giá sốc
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Đại Tiệc Flash Sale — Giảm Sốc Đến 95%
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
              Các khóa học lập trình, AI, Marketing và Ngoại ngữ được mở bán với mức giá tượng trưng trong các khung giờ vàng hôm nay.
            </p>
          </div>

          {/* Full Flash Sale Component */}
          <FlashSaleSection
            courses={courses}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            cartIds={new Set(cartItems.map((c) => c.id))}
            onSelectCourse={setSelectedCourse}
          />
        </div>
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onClearCart={() => setCartItems([])}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
