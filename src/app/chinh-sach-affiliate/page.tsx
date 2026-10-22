"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import Link from "next/link";
import { Handshake, DollarSign, Users, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function AffiliatePage() {
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

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Chính sách Affiliate</span>
            </div>
            <span className="inline-block bg-[#c9a43c]/10 text-[#a87d19] font-bold text-xs uppercase px-3 py-1 rounded-full border border-[#c9a43c]/20 mb-3">
              Kiếm thu nhập thụ động
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#171a1c]">
              Chương Trình Đối Tác & Affiliate 2025
            </h1>
            <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
              Giới thiệu bạn bè, học viên cùng tham gia Học Rẻ 365 và nhận hoa hồng lên đến 30% - 50% cho mỗi đơn hàng thành công.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed mb-8">
            <h2 className="text-lg font-bold text-[#171a1c] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Mức Hoa Hồng Hấp Dẫn:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#faf8f2] border border-gray-200">
                <div className="text-xs text-gray-500">Gói mua lẻ khóa học:</div>
                <div className="text-2xl font-black text-[#c9a43c] mt-1">40% / Đơn</div>
                <p className="text-xs text-gray-500 mt-2">Nhận hoa hồng trực tiếp sau khi khách hàng chuyển khoản thành công.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf8f2] border border-gray-200">
                <div className="text-xs text-gray-500">Gói VIP 599K trọn bộ:</div>
                <div className="text-2xl font-black text-[#c9a43c] mt-1">200.000 ₫ / Đơn</div>
                <p className="text-xs text-gray-500 mt-2">Dễ bán, tỷ lệ chốt đơn cực cao nhờ khoá học phong phú và giá siêu hời.</p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-[#171a1c] pt-4 border-t border-gray-100 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-[#c9a43c]" />
              Cách Thức Tham Gia:
            </h2>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Nhắn tin trực tiếp qua Zalo Admin: <strong>{siteConfig.phone}</strong> để nhận mã giới thiệu hoặc link affiliate độc quyền.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Chia sẻ link lên Facebook, TikTok, Blog cá nhân hoặc các hội nhóm học tập.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Rút hoa hồng về tài khoản ngân hàng bất cứ lúc nào (hạn mức tối thiểu chỉ từ 100.000 ₫).</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#171a1c] hover:bg-black text-[#f3dc85] font-black text-xs shadow-lg transition-transform hover:scale-105"
              >
                <span>Đăng ký làm Affiliate qua Zalo ngay ({siteConfig.phone})</span>
                <ArrowRight className="w-4 h-4" />
              </a>
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
