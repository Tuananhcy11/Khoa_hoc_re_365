"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import ToolsSection from "@/components/ToolsSection";
import Link from "next/link";
import { Wrench, ShieldCheck, DownloadCloud, Sparkles, Check } from "lucide-react";
import type { Course } from "@/types";

export default function CongCuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2]">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Công cụ</span>
            </div>
            <h1 className="text-3xl font-black text-[#171a1c]">
              Công Cụ & Tiện Ích Hỗ Trợ Học Tập
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Các phần mềm, extension và script độc quyền giúp tải video, sao lưu tài liệu Google Drive không giới hạn.
            </p>
          </div>

          {/* Tools Grid */}
          <ToolsSection tools={siteData.tools} />

          {/* Guide Box */}
          <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-[#171a1c] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c9a43c]" />
              Hướng Dẫn Sử Dụng & Kích Hoạt Tool:
            </h2>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Thành viên mua gói <strong>Trọn Bộ 599K</strong> được tặng kèm miễn phí toàn bộ các công cụ trên.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Mỗi tool đều có video hướng dẫn cài đặt từng bước chi tiết (hỗ trợ Windows, MacOS, Chrome Extension).</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Được hỗ trợ kỹ thuật UltraViewer / AnyDesk qua Zalo nếu gặp khó khăn khi cài đặt.</span>
              </div>
            </div>
          </div>
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
    </div>
  );
}
