"use client";

import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Course[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
}: CartModalProps) {
  if (!isOpen) return null;

  // Calculate total price roughly
  const parsePrice = (priceStr: string) => {
    const clean = priceStr.replace(/[^0-9]/g, "");
    return parseInt(clean, 10) || 0;
  };

  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.salePrice), 0);
  const formattedTotal = total.toLocaleString("vi-VN") + " ₫";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-[#1e2326] text-white shadow-2xl flex flex-col justify-between overflow-hidden border-l border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#171a1c]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d5ab3d]" />
            <h3 className="font-bold text-base text-white">Giỏ Hàng Khóa Học</h3>
            <span className="text-xs bg-[#c9a43c] text-slate-950 font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-600" />
              <p className="text-sm font-semibold">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-gray-500">Hãy thêm các khóa học yêu thích để tiếp tục thanh toán.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#252a2d] border border-white/5"
              >
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-black/40">
                  <Image
                    src={item.image?.startsWith("/") ? item.image : `/${item.image || "images/0_logo.png"}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <div className="text-xs font-black text-[#f3dc85] mt-1">{item.salePrice}</div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5"
                  title="Xóa khóa học"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#171a1c] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Tổng thanh toán:</span>
              <span className="text-xl font-black text-[#f3dc85]">{formattedTotal}</span>
            </div>

            <div className="bg-[#252a2d] p-3 rounded-xl border border-white/5 flex items-center gap-2.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Nhận link Google Drive VIP ngay sau khi chuyển khoản.</span>
            </div>

            <div className="space-y-2">
              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] hover:from-[#e1bc40] hover:to-[#c99a2c] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#d5ab3d]/30 transition-all"
              >
                <span>Xác nhận mua qua Zalo ({siteConfig.phone})</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClearCart}
                className="w-full py-2 text-xs text-gray-500 hover:text-gray-300"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
