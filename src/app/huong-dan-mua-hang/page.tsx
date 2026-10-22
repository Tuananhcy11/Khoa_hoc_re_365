"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import Link from "next/link";
import { MousePointerClick, QrCode, Send, PlayCircle, ShieldCheck, PhoneCall, Check } from "lucide-react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function HuongDanMuaHangPage() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Hướng dẫn mua hàng</span>
            </div>
            <h1 className="text-3xl font-black text-[#171a1c]">
              Hướng Dẫn Đăng Ký & Nhận Khóa Học
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Quy trình nhận link Google Drive chỉ mất từ 1 - 2 phút sau khi hoàn tất thanh toán.
            </p>
          </div>

          {/* Step by Step Container */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#171a1c] text-[#f3dc85] flex items-center justify-center font-black text-lg shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#171a1c] mb-2">
                  Bước 1: Chọn Khóa Học Hoặc Gói Hội Viên
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Tìm kiếm khóa học bạn muốn mua hoặc chọn <strong>Gói Trọn Bộ 599.000 ₫</strong> để sở hữu toàn bộ hơn 2.000 khóa học trên hệ thống.
                </p>
                <div className="inline-block bg-[#faf8f2] border border-gray-200 text-xs text-gray-700 px-3 py-1.5 rounded-xl font-medium">
                  Mẹo: Đăng ký gói trọn bộ tiết kiệm hơn 99% so với mua lẻ.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#c9a43c] text-slate-950 flex items-center justify-center font-black text-lg shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#171a1c] mb-2">
                  Bước 2: Chuyển Khoản Thanh Toán
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Thực hiện chuyển khoản ngân hàng qua mã QR hoặc số tài khoản chính thức:
                </p>
                
                <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#e8e3d5] space-y-2 text-xs text-gray-800">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Ngân hàng:</span>
                    <strong className="text-[#171a1c]">{siteConfig.bankInfo.bankName}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Số tài khoản / Hotline:</span>
                    <strong className="text-[#c9a43c] font-mono text-sm">{siteConfig.bankInfo.accountNumber}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Chủ tài khoản:</span>
                    <strong className="text-[#171a1c]">{siteConfig.bankInfo.accountName}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Nội dung chuyển khoản:</span>
                    <strong className="text-[#e11d2e] font-mono">[Số điện thoại của bạn] + [Tên khóa học]</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#171a1c] mb-2">
                  Bước 3: Nhận Link Google Drive Qua Zalo Hoặc Fanpage
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Chụp ảnh biên lai chuyển khoản và gửi về Zalo hỗ trợ: <strong>{siteConfig.phone}</strong> hoặc nhắn tin cho <strong>{siteConfig.fanpageName}</strong>. Admin sẽ gửi link thư mục Google Drive VIP ngay trong vòng 2 phút.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0068ff] text-white font-bold text-xs shadow-md hover:bg-blue-600 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Mở Zalo: {siteConfig.phone}</span>
                  </a>
                  <a
                    href={siteConfig.fanpageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877f2] text-white font-bold text-xs shadow-md hover:bg-[#166fe5] transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4 fill-white" />
                    <span>Nhắn tin Fanpage Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#171a1c] mb-2">
                  Bước 4: Xem Online Hoặc Tải Về Học Trọn Đời
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Bạn có toàn quyền truy cập vĩnh viễn, học trên máy tính hoặc điện thoại bất cứ lúc nào, hỗ trợ kỹ thuật trọn đời 24/7.
                </p>
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
