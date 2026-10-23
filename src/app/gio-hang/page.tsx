"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useCart } from "@/components/CartProvider";

export default function GioHangPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { items: cartItems, remove } = useCart();

  const parsePrice = (priceStr: string) => {
    const clean = priceStr.replace(/[^0-9]/g, "");
    return parseInt(clean, 10) || 0;
  };

  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.salePrice), 0);
  const formattedTotal = total.toLocaleString("vi-VN") + " ₫";

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2]">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Giỏ hàng</span>
            </div>
            <h1 className="text-3xl font-black text-[#171a1c]">
              Giỏ Hàng Của Bạn
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-base font-bold text-gray-800">Giỏ hàng của bạn đang trống</p>
                  <Link
                    href="/mua"
                    className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#171a1c] text-[#f3dc85] font-bold text-xs"
                  >
                    Khám phá khóa học ngay
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center gap-4 shadow-sm"
                  >
                    <div className="relative w-24 aspect-[16/9] rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={item.image?.startsWith("/") ? item.image : `/${item.image || "images/0_logo.png"}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#c9a43c] uppercase">{item.category}</span>
                      <h3 className="text-xs font-bold text-[#171a1c] truncate">{item.title}</h3>
                      <div className="text-sm font-black text-[#c9a43c] mt-1">{item.salePrice}</div>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 h-fit space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#171a1c] border-b border-gray-100 pb-3">
                Tóm Tắt Đơn Hàng
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Số lượng khóa học:</span>
                  <strong className="text-[#171a1c]">{cartItems.length}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Hình thức nhận bài:</span>
                  <strong className="text-emerald-600">Google Drive VIP</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 text-sm">
                  <span className="font-bold text-[#171a1c]">Tổng thanh toán:</span>
                  <span className="font-black text-xl text-[#c9a43c]">{formattedTotal}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#d5ab3d]/30 hover:opacity-95 transition-opacity"
                >
                  <span>Xác nhận & Nhận link qua Zalo ({siteConfig.phone})</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#faf8f2] border border-gray-200 text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cam kết bảo hành vĩnh viễn</span>
                </div>
                <p>Sau khi thanh toán, Admin sẽ duyệt và gửi link Drive trong 1-2 phút qua Zalo: {siteConfig.phone}.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
