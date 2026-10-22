"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  Sparkles,
  Layers,
  User,
  ArrowRight
} from "lucide-react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import siteData from "../../public/data/siteData.json";
import { siteConfig } from "@/lib/siteConfig";
import type { Category, Course } from "@/types";

interface HeaderProps {
  categories: Category[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export default function Header({
  categories,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const allCourses = siteData.courses as Course[];

  const searchSuggestions = searchQuery.trim().length > 0
    ? allCourses.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#171a1c] text-white shadow-md">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-[#d7ae32] via-[#b88d22] to-[#c9a43c] text-slate-950 font-medium text-xs md:text-sm py-1.5 sm:py-2 px-3 sm:px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="hidden sm:block w-4 h-4 animate-spin" />
        {/* Mobile: câu ngắn 1 dòng; desktop: câu đầy đủ */}
        <span className="sm:hidden truncate">Trọn bộ 2.000+ khóa học chỉ <strong>599K</strong></span>
        <span className="hidden sm:inline">Trọn bộ 2.000+ khóa học — Truy cập trọn đời, cập nhật miễn phí, chỉ <strong>599K</strong></span>
        <Link
          href="/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc"
          className="sm:ml-2 shrink-0 whitespace-nowrap bg-slate-950 text-[#f3dc85] px-3 py-0.5 rounded-full font-semibold hover:bg-black transition-colors"
        >
          Xem ngay →
        </Link>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 sm:px-6 lg:px-8">
        {/* Mobile: logo + nút ở hàng 1, ô tìm kiếm xuống hàng 2 (flex-wrap) */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-2 gap-y-2.5 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden ring-1 ring-white/10">
              <Image
                src="/images/logo-hocre365.png"
                alt="Học Rẻ 365"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-black text-base sm:text-lg leading-none tracking-tight">
              <span className="text-white">Học </span>
              <span className="text-[#f3dc85]">Rẻ</span>
              <span className="text-white"> 365</span>
            </span>
          </Link>

          {/* Category Dropdown Button */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#252a2d] hover:bg-[#30363b] text-sm font-medium transition-colors border border-white/10"
            >
              <Layers className="w-4 h-4 text-[#d5ab3d]" />
              <span>Danh mục</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${categoryMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Category Dropdown Menu */}
            {categoryMenuOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-72 bg-[#252a2d] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-white/5">
                  Lĩnh vực khóa học
                </div>
                <div className="max-h-96 overflow-y-auto py-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/danh-muc/${cat.slug}`}
                      onClick={() => setCategoryMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:text-[#f3dc85] hover:bg-white/5 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#d5ab3d]" />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div ref={searchContainerRef} className="order-last sm:order-none w-full sm:w-auto sm:flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Tìm khóa học: Python, Claude AI, Excel..."
                className="w-full bg-[#252a2d] border border-white/10 text-white placeholder-gray-400 text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#d5ab3d] focus:ring-1 focus:ring-[#d5ab3d] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange("");
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-3 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#252a2d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-2.5 border-b border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                  <span>Gợi ý khóa học</span>
                  <span>{searchSuggestions.length} kết quả</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {searchSuggestions.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">
                      Không tìm thấy khóa học nào phù hợp.
                    </div>
                  ) : (
                    searchSuggestions.map((course) => (
                      <Link
                        key={course.id}
                        href={`/khoa-hoc/${course.slug}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          onSearchChange("");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="relative w-14 aspect-[16/9] rounded-lg overflow-hidden shrink-0 bg-black/40">
                          <Image
                            src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#d5ab3d] uppercase">{course.category}</span>
                          <div className="text-xs font-bold text-white truncate">{course.title}</div>
                          <div className="text-xs font-black text-[#f3dc85] mt-0.5">{course.salePrice}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
                <div className="p-2.5 bg-[#171a1c] border-t border-white/5 text-center">
                  <Link
                    href={`/mua?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="text-xs font-bold text-[#f3dc85] hover:underline flex items-center justify-center gap-1"
                  >
                    <span>Xem tất cả kết quả cho &quot;{searchQuery}&quot;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
            {/* Facebook Fanpage */}
            <a
              href={siteConfig.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs bg-[#1877f2]/15 hover:bg-[#1877f2]/25 border border-[#1877f2]/30 px-3 py-2 rounded-xl text-blue-200 hover:text-white transition-colors"
              title="Fanpage Facebook chính thức"
            >
              <FacebookIcon className="w-3.5 h-3.5 fill-[#1877f2] text-[#1877f2]" />
              <span className="font-semibold">Fanpage</span>
            </a>

            {/* Zalo hotline */}
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 text-xs bg-[#252a2d] hover:bg-[#30363b] border border-white/10 px-3 py-2 rounded-xl text-gray-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#d5ab3d]" />
              <span>Hotline/Zalo: <strong>{siteConfig.phone}</strong></span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative hidden sm:block p-2.5 rounded-xl bg-[#252a2d] hover:bg-[#30363b] border border-white/10 text-gray-200 hover:text-white transition-colors"
              title="Khóa học yêu thích"
            >
              <Heart className="w-5 h-5 text-gray-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e11d2e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#252a2d] hover:bg-[#30363b] border border-white/10 text-gray-200 hover:text-[#f3dc85] transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c9a43c] text-slate-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <Link
              href="/tai-khoan"
              className="relative hidden sm:block p-2.5 rounded-xl bg-[#252a2d] hover:bg-[#30363b] border border-white/10 text-gray-200 hover:text-[#f3dc85] transition-colors"
              title="Tài khoản & Đơn hàng"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              className="lg:hidden p-2 rounded-xl bg-[#252a2d] border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Nav Pills Bar */}
      {/* Ẩn trên mobile: đã có thao tác nhanh + thanh điều hướng đáy, giữ header dính thấp gọn */}
      <div className="hidden sm:block border-t border-white/5 bg-[#121619] overflow-x-auto scrollbar-none py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs whitespace-nowrap text-gray-300">
          <span className="hidden sm:flex text-[#d5ab3d] font-semibold items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Khám phá nhanh:
          </span>
          <Link href="/mua?sortBy=registeredCount&order=desc" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            🔥 Bán chạy
          </Link>
          <Link href="/mua?sortBy=createdAt&order=desc" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            ✨ Mới cập nhật
          </Link>
          <Link href="/danh-muc/combo-khoa-hoc" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            📦 Combo tiết kiệm
          </Link>
          <Link href="/cong-cu" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            🛠️ Công cụ <span className="text-[9px] bg-[#e11d2e] text-white px-1 py-0.2 rounded font-black ml-0.5">MỚI</span>
          </Link>
          <Link href="/hoi-vien" className="px-3 py-1 rounded-full bg-[#d5ab3d]/15 text-[#f3dc85] font-medium hover:bg-[#d5ab3d]/30 transition-colors">
            👑 Hội viên VIP 599K
          </Link>
          <Link href="/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            📚 Trọn bộ khóa học
          </Link>
          <Link href="/huong-dan-mua-hang" className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#d5ab3d]/20 hover:text-[#f3dc85] transition-colors">
            📖 Hướng dẫn mua
          </Link>
          <a href={siteConfig.fanpageUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-[#1877f2]/20 text-[#60a5fa] font-semibold hover:bg-[#1877f2]/30 transition-colors flex items-center gap-1">
            <FacebookIcon className="w-3 h-3 fill-current inline" />
            <span>Fanpage Facebook</span>
          </a>
          <a href={siteConfig.zaloUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 font-semibold hover:bg-blue-600/30 transition-colors">
            💬 Zalo hỗ trợ: {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171a1c] border-b border-white/10 px-4 py-4 space-y-3">
          <div className="font-semibold text-xs text-[#d5ab3d] uppercase tracking-wider">Danh mục khóa học</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/danh-muc/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-gray-300 hover:text-white bg-[#252a2d] p-2.5 rounded-lg truncate"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
            <Link
              href="/tai-khoan"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs py-2 bg-[#252a2d] text-gray-200 font-bold rounded-xl"
            >
              Tài khoản & Khóa học đã lưu
            </Link>
            <a
              href={siteConfig.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs py-2.5 bg-[#1877f2] text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <FacebookIcon className="w-4 h-4 fill-white" />
              <span>Facebook: {siteConfig.fanpageName}</span>
            </a>
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs py-2.5 bg-[#d5ab3d] text-slate-950 font-bold rounded-xl"
            >
              Liên hệ Zalo / Hotline: {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
