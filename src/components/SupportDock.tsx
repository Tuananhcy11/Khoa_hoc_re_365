"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Headphones, ChevronUp, MessageCircle, Phone, HelpCircle, BookOpen, X, ExternalLink } from "lucide-react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { siteConfig } from "@/lib/siteConfig";

export default function SupportDock() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Nền mờ khi mở (bấm ra ngoài để đóng) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 sm:bg-transparent sm:pointer-events-none"
          aria-hidden="true"
        />
      )}

      <aside aria-label="Trung tâm hỗ trợ" className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end gap-2">
      {/* Scroll to Top */}
      {showScrollTop && !isOpen && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="w-10 h-10 rounded-full bg-[#171a1c]/90 hover:bg-black text-[#f3dc85] border border-white/20 shadow-xl flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Support Popup Menu — mobile: bảng trượt từ đáy; sm+: popup nổi cạnh nút */}
      {isOpen && (
        <div
          className="fixed sm:static inset-x-0 bottom-0 sm:inset-auto w-full sm:w-[18rem] max-h-[80vh] overflow-y-auto bg-[#1e2326] text-white border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:mb-2 pb-6 sm:pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#c9a43c]/20 text-[#f3dc85]">
                <Headphones className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Trung Tâm Hỗ Trợ</h4>
                <p className="text-[10px] text-gray-400">Trực 8h00 - 23h30 hàng ngày</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0068ff]/15 hover:bg-[#0068ff]/25 border border-[#0068ff]/30 text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0068ff] flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold">Chat qua Zalo</div>
                <div className="text-[10px] text-gray-300">{siteConfig.phone} (Nhận link ngay)</div>
              </div>
            </a>

            <a
              href={siteConfig.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1877f2]/15 hover:bg-[#1877f2]/25 border border-[#1877f2]/30 text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1877f2] flex items-center justify-center text-white shrink-0">
                <FacebookIcon className="w-4 h-4 fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold">Chat Fanpage Facebook</div>
                <div className="text-[10px] text-gray-300">{siteConfig.fanpageName}</div>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold">Hotline Tư Vấn</div>
                <div className="text-[10px] text-gray-300">{siteConfig.phone}</div>
              </div>
            </a>

            <Link
              href="/huong-dan-mua-hang"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs"
            >
              <BookOpen className="w-4 h-4 text-[#c9a43c]" />
              <span>Hướng dẫn mua & nhận khóa</span>
            </Link>

            <Link
              href="/cac-cau-hoi-thuong-gap"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs"
            >
              <HelpCircle className="w-4 h-4 text-[#c9a43c]" />
              <span>Câu hỏi thường gặp (FAQ)</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Support Dock Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở trung tâm hỗ trợ"
        className={`relative items-center gap-2.5 w-12 h-12 sm:w-auto sm:h-auto justify-center sm:px-4 sm:py-2.5 rounded-full bg-[#171a1c] hover:bg-black text-white border border-[#c9a43c]/40 shadow-2xl transition-all hover:scale-105 group ${isOpen ? "hidden sm:flex" : "flex"}`}
      >
        {/* Mobile: chỉ hiện icon tai nghe, có chấm xanh "đang trực" */}
        <Headphones className="w-5 h-5 text-[#f3dc85] sm:hidden" />
        <span className="absolute top-0.5 right-0.5 sm:static flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-white group-hover:text-[#f3dc85] flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5 text-[#c9a43c]" />
            <span>Hỗ trợ</span>
          </div>
          <div className="text-[10px] text-gray-400 hidden sm:block">Chúng tôi luôn sẵn sàng</div>
        </div>
      </button>
      </aside>
    </>
  );
}
