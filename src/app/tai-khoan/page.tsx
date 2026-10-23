"use client";

import { useState, useMemo } from "react";
import siteData from "../../../public/data/siteData.json";
import { useCourses } from "@/hooks/useCourses";
import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseDetailModal from "@/components/CourseDetailModal";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Heart,
  PackageSearch,
  ShieldCheck,
  PhoneCall,
  ShoppingCart,
  ArrowRight,
  BookOpen,
  Check,
  Trash2,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  CheckSquare,
  Square,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function TaiKhoanPage() {
  const [activeTab, setActiveTab] = useState<"wishlist" | "orders" | "profile">("wishlist");
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const [orderLookupEmail, setOrderLookupEmail] = useState("");
  const [orderLookupResult, setOrderLookupResult] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Wishlist management states
  const [wishlistSearch, setWishlistSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [quickAddSearch, setQuickAddSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { courses } = useCourses();
  const wishlist = useWishlist();
  const cart = useCart();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Lọc chính xác các khóa người dùng đã bấm lưu (không fallback giả vờ)
  const savedCourses = useMemo(() => {
    return courses.filter((c) => wishlist.has(c.id));
  }, [courses, wishlist]);

  // Bộ lọc & Sắp xếp danh sách yêu thích
  const filteredWishlistCourses = useMemo(() => {
    let list = [...savedCourses];

    if (wishlistSearch.trim()) {
      const q = wishlistSearch.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => {
        const pA = parseInt(a.salePrice.replace(/\D/g, "") || "0", 10);
        const pB = parseInt(b.salePrice.replace(/\D/g, "") || "0", 10);
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => {
        const pA = parseInt(a.salePrice.replace(/\D/g, "") || "0", 10);
        const pB = parseInt(b.salePrice.replace(/\D/g, "") || "0", 10);
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [savedCourses, wishlistSearch, sortBy]);

  // Danh sách gợi ý thêm vào yêu thích (các khóa chưa được lưu)
  const suggestedCourses = useMemo(() => {
    return courses.filter((c) => !wishlist.has(c.id)).slice(0, 4);
  }, [courses, wishlist]);

  // Danh sách tìm kiếm để thêm nhanh
  const quickAddResults = useMemo(() => {
    if (!quickAddSearch.trim()) return [];
    const q = quickAddSearch.toLowerCase().trim();
    return courses
      .filter(
        (c) =>
          !wishlist.has(c.id) &&
          (c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [courses, wishlist, quickAddSearch]);

  // Xóa 1 khóa học
  const handleRemoveSingle = (course: Course) => {
    wishlist.remove(course.id);
    setSelectedIds((prev) => prev.filter((id) => id !== course.id));
    showToast(`Đã bỏ lưu khóa học: "${course.title.slice(0, 35)}..."`);
  };

  // Thêm 1 khóa học
  const handleAddCourse = (course: Course) => {
    wishlist.add(course.id);
    showToast(`Đã thêm vào danh sách yêu thích: "${course.title.slice(0, 35)}..."`);
  };

  // Xóa toàn bộ
  const handleClearAll = () => {
    if (savedCourses.length === 0) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ ${savedCourses.length} khóa học đã lưu không?`)) {
      wishlist.clear();
      setSelectedIds([]);
      setIsSelectMode(false);
      showToast("Đã xóa tất cả khóa học khỏi danh sách yêu thích");
    }
  };

  // Xóa các mục đã chọn qua checkbox
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Xóa ${selectedIds.length} khóa học đã chọn khỏi danh sách yêu thích?`)) {
      selectedIds.forEach((id) => wishlist.remove(id));
      showToast(`Đã xóa ${selectedIds.length} khóa học đã chọn.`);
      setSelectedIds([]);
      setIsSelectMode(false);
    }
  };

  // Chọn / bỏ chọn 1 mục
  const toggleSelectId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Chọn tất cả / Bỏ chọn tất cả checkbox
  const handleSelectAllToggle = () => {
    if (selectedIds.length === filteredWishlistCourses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredWishlistCourses.map((c) => c.id));
    }
  };

  // Thêm vào giỏ
  const handleAddToCart = (course: Course) => {
    cart.add(course);
    cart.openCart();
  };

  // Tra cứu đơn hàng giả lập
  const handleLookupOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderLookupEmail.trim()) return;
    setOrderLookupResult({
      orderCode: "KHGH-" + Math.floor(100000 + Math.random() * 900000),
      email: orderLookupEmail,
      status: "Đã thanh toán (Hoàn tất)",
      items: [courses[0], courses[1]].filter(Boolean) as Course[],
      driveLink: "https://drive.google.com/drive/folders/example",
      paidAt: "22/10/2026 - 14:30",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2]">
      {/* Toast thông báo */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#171a1c] text-[#f3dc85] px-4 py-3 rounded-2xl shadow-2xl border border-[#c9a43c]/40 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Header
        categories={siteData.categories}
        searchQuery={headerSearchQuery}
        onSearchChange={setHeaderSearchQuery}
        wishlistCount={wishlist.count}
        onOpenWishlist={() => setActiveTab("wishlist")}
      />

      <main className="flex-1 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#c9a43c]">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#171a1c] font-semibold">Tài khoản</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation Tabs */}
            <div className="w-full md:w-64 shrink-0 space-y-2">
              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#171a1c] text-[#f3dc85] flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-md">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-[#171a1c]">Học Viên Khóa Học</h3>
                <span className="inline-block text-[10px] font-bold text-[#a87d19] bg-[#c9a43c]/15 px-2.5 py-0.5 rounded-full mt-1 border border-[#c9a43c]/20">
                  Thành viên VIP
                </span>
              </div>

              <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm space-y-1">
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                    activeTab === "wishlist"
                      ? "bg-[#171a1c] text-[#f3dc85]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Khóa học đã lưu</span>
                  <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                    {savedCourses.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                    activeTab === "orders"
                      ? "bg-[#171a1c] text-[#f3dc85]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <PackageSearch className="w-4 h-4 text-blue-500" />
                  <span>Tra cứu đơn hàng</span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                    activeTab === "profile"
                      ? "bg-[#171a1c] text-[#f3dc85]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Chính sách bảo hành</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* TAB 1: WISHLIST (KHÓA HỌC ĐÃ LƯU) */}
              {activeTab === "wishlist" && (
                <>
                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-sm space-y-5">
                    {/* Header bar: Title & Bulk Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-black text-[#171a1c]">
                            Danh Sách Khóa Học Yêu Thích
                          </h2>
                          <span className="text-xs font-bold bg-[#171a1c] text-[#f3dc85] px-2.5 py-0.5 rounded-full">
                            {savedCourses.length} khóa
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Quản lý các khóa học bạn đã lưu để học hoặc tham khảo sau. Bạn có thể thêm, sửa, hoặc xóa bất kỳ lúc nào.
                        </p>
                      </div>

                      {/* Header Controls */}
                      {savedCourses.length > 0 && (
                        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setIsSelectMode(!isSelectMode);
                              setSelectedIds([]);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border ${
                              isSelectMode
                                ? "bg-amber-100 border-amber-300 text-amber-900"
                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {isSelectMode ? "Hủy chọn nhiều" : "Chọn nhiều để xóa"}
                          </button>

                          <button
                            type="button"
                            onClick={handleClearAll}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1"
                            title="Xóa tất cả khóa học đã lưu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa tất cả</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Select Mode Bar (if active) */}
                    {isSelectMode && savedCourses.length > 0 && (
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSelectAllToggle}
                            className="font-bold text-gray-800 hover:text-[#c9a43c] flex items-center gap-1.5"
                          >
                            {selectedIds.length === filteredWishlistCourses.length && filteredWishlistCourses.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-gray-400" />
                            )}
                            <span>
                              {selectedIds.length === filteredWishlistCourses.length
                                ? "Bỏ chọn tất cả"
                                : "Chọn tất cả"}
                            </span>
                          </button>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">
                            Đã chọn: <strong className="text-gray-900">{selectedIds.length}</strong> / {filteredWishlistCourses.length} khóa
                          </span>
                        </div>

                        {selectedIds.length > 0 && (
                          <button
                            type="button"
                            onClick={handleDeleteSelected}
                            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa {selectedIds.length} mục đã chọn</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Filter & Search Bar within Wishlist (if has courses) */}
                    {savedCourses.length > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                        <div className="relative w-full sm:w-72">
                          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={wishlistSearch}
                            onChange={(e) => setWishlistSearch(e.target.value)}
                            placeholder="Tìm trong khóa đã lưu..."
                            className="w-full pl-9 pr-3 py-2 bg-[#faf8f2] border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#c9a43c]"
                          />
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-500 font-medium">Sắp xếp:</span>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-[#faf8f2] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#c9a43c]"
                          >
                            <option value="default">Mặc định</option>
                            <option value="price-asc">Giá: Thấp đến cao</option>
                            <option value="price-desc">Giá: Cao đến thấp</option>
                            <option value="rating">Đánh giá cao nhất</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Course List or Empty State */}
                    {savedCourses.length === 0 ? (
                      <div className="text-center py-12 sm:py-16 px-4 bg-[#faf8f2] rounded-3xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-100">
                          <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-base font-bold text-[#171a1c]">
                          Bạn chưa lưu khóa học nào
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                          Khi khám phá các khóa học trên trang web, hãy bấm biểu tượng trái tim (❤️) hoặc chọn các khóa học bên dưới để lưu vào danh sách yêu thích nhé.
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-3">
                          <Link
                            href="/mua"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171a1c] text-[#f3dc85] text-xs font-bold hover:bg-black transition-colors shadow-sm"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Khám phá kho khóa học</span>
                          </Link>
                        </div>
                      </div>
                    ) : filteredWishlistCourses.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-xs">
                        Không tìm thấy khóa học nào phù hợp với từ khóa &ldquo;{wishlistSearch}&rdquo;.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredWishlistCourses.map((c) => {
                          const isSelected = selectedIds.includes(c.id);
                          return (
                            <div
                              key={c.id}
                              className={`p-3.5 rounded-2xl border transition-all flex gap-3.5 relative group ${
                                isSelected
                                  ? "border-amber-400 bg-amber-50/50"
                                  : "border-gray-200/90 bg-[#faf8f2] hover:border-[#c9a43c]/60 hover:shadow-md"
                              }`}
                            >
                              {/* Checkbox for Select Mode */}
                              {isSelectMode && (
                                <button
                                  type="button"
                                  onClick={() => toggleSelectId(c.id)}
                                  className="self-center p-1 text-gray-400 hover:text-gray-700"
                                  aria-label="Chọn khóa học"
                                >
                                  {isSelected ? (
                                    <CheckSquare className="w-5 h-5 text-amber-600" />
                                  ) : (
                                    <Square className="w-5 h-5 text-gray-400" />
                                  )}
                                </button>
                              )}

                              {/* Thumbnail */}
                              <div
                                onClick={() => setSelectedCourse(c)}
                                className="relative w-28 sm:w-32 aspect-[16/9] rounded-xl overflow-hidden shrink-0 bg-gray-200 cursor-pointer"
                              >
                                <Image
                                  src={c.image?.startsWith("/") ? c.image : `/${c.image || "images/0_logo.png"}`}
                                  alt={c.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Info & Actions */}
                              <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-bold text-[#c9a43c] uppercase truncate">
                                      {c.category}
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-500">
                                      ★ {c.rating.toFixed(1)}
                                    </span>
                                  </div>

                                  <h4
                                    onClick={() => setSelectedCourse(c)}
                                    className="text-xs font-bold text-[#171a1c] line-clamp-2 mt-0.5 cursor-pointer hover:text-[#c9a43c] transition-colors"
                                    title={c.title}
                                  >
                                    {c.title}
                                  </h4>

                                  <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-xs font-black text-[#c9a43c]">
                                      {c.salePrice}
                                    </span>
                                    <span className="text-[10px] line-through text-gray-400">
                                      {c.regularPrice}
                                    </span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-200/80">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleAddToCart(c)}
                                      className="px-2.5 py-1 rounded-lg bg-[#171a1c] hover:bg-black text-[#f3dc85] text-[11px] font-bold flex items-center gap-1 transition-colors"
                                      title="Thêm vào giỏ hàng"
                                    >
                                      <ShoppingCart className="w-3 h-3" />
                                      <span>Mua</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setSelectedCourse(c)}
                                      className="px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-black text-[11px] font-semibold transition-colors"
                                      title="Xem chi tiết nội dung"
                                    >
                                      Chi tiết
                                    </button>
                                  </div>

                                  {/* Nút BỎ LƯU */}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSingle(c)}
                                    className="px-2 py-1 rounded-lg text-[11px] font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1"
                                    title="Xóa khóa học khỏi danh sách yêu thích"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Bỏ lưu</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* SECTION: THÊM NHANH KHÓA HỌC (QUICK ADD) */}
                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-[#171a1c] flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#c9a43c]" />
                          <span>Thêm Khóa Học Vào Danh Sách Yêu Thích</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Tìm kiếm bất kỳ khóa học nào trong thư viện để thêm trực tiếp vào danh sách.
                        </p>
                      </div>

                      {/* Quick Search Input */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={quickAddSearch}
                          onChange={(e) => setQuickAddSearch(e.target.value)}
                          placeholder="Nhập tên khóa học..."
                          className="w-full pl-9 pr-3 py-2 bg-[#faf8f2] border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#c9a43c]"
                        />
                      </div>
                    </div>

                    {/* Quick Search Results Dropdown/List */}
                    {quickAddSearch.trim() && (
                      <div className="p-3 bg-[#faf8f2] rounded-2xl border border-gray-200 space-y-2">
                        <div className="text-[11px] font-bold text-gray-500">
                          Kết quả tìm kiếm ({quickAddResults.length}):
                        </div>
                        {quickAddResults.length === 0 ? (
                          <div className="text-xs text-gray-400 py-2">
                            Không tìm thấy khóa học mới nào hoặc khóa học đã có trong danh sách lưu.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {quickAddResults.map((course) => (
                              <div
                                key={course.id}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200 text-xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0 mr-3">
                                  <div className="relative w-12 aspect-[16/9] rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                    <Image
                                      src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
                                      alt={course.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-bold text-gray-800 truncate">{course.title}</h5>
                                    <span className="text-[10px] text-[#c9a43c] font-black">{course.salePrice}</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddCourse(course);
                                    setQuickAddSearch("");
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-[#171a1c] hover:bg-black text-[#f3dc85] text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>+ Lưu khóa này</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* SUGGESTED COURSES TO ADD */}
                    {suggestedCourses.length > 0 && (
                      <div className="pt-2">
                        <div className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#c9a43c]" />
                          <span>Gợi ý khóa học tiêu biểu thêm vào yêu thích:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {suggestedCourses.map((c) => (
                            <div
                              key={c.id}
                              className="p-3 rounded-2xl border border-gray-200 bg-[#faf8f2] flex flex-col justify-between hover:border-[#c9a43c]/50 transition-colors"
                            >
                              <div
                                onClick={() => setSelectedCourse(c)}
                                className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200 cursor-pointer mb-2"
                              >
                                <Image
                                  src={c.image?.startsWith("/") ? c.image : `/${c.image || "images/0_logo.png"}`}
                                  alt={c.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[9px] font-bold text-[#c9a43c] uppercase">{c.category}</span>
                                  <h5
                                    onClick={() => setSelectedCourse(c)}
                                    className="text-xs font-bold text-[#171a1c] line-clamp-2 mt-0.5 cursor-pointer hover:text-[#c9a43c]"
                                  >
                                    {c.title}
                                  </h5>
                                  <div className="text-xs font-black text-[#c9a43c] mt-1">{c.salePrice}</div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleAddCourse(c)}
                                  className="mt-3 w-full py-1.5 rounded-xl bg-white border border-[#c9a43c]/50 hover:bg-[#171a1c] hover:text-[#f3dc85] text-[#171a1c] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                                >
                                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                                  <span>+ Lưu vào yêu thích</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* TAB 2: ORDERS LOOKUP (TRA CỨU ĐƠN HÀNG) */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xl font-black text-[#171a1c]">Tra Cứu Đơn Hàng & Link Google Drive</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Nhập Gmail hoặc Mã đơn hàng đã dùng khi thanh toán để lấy lại link khóa học trọn đời.
                    </p>
                  </div>

                  <form onSubmit={handleLookupOrder} className="flex gap-3">
                    <input
                      type="text"
                      value={orderLookupEmail}
                      onChange={(e) => setOrderLookupEmail(e.target.value)}
                      placeholder="Nhập Gmail của bạn (vd: hocvien@gmail.com)..."
                      className="flex-1 bg-[#faf8f2] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#c9a43c]"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#171a1c] text-[#f3dc85] font-bold text-xs hover:bg-black transition-colors"
                    >
                      Tra cứu ngay
                    </button>
                  </form>

                  {orderLookupResult && (
                    <div className="p-5 rounded-2xl bg-[#faf8f2] border border-[#e8e3d5] space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-gray-500">Mã đơn hàng:</span>
                          <div className="text-sm font-black text-[#171a1c] font-mono">{orderLookupResult.orderCode}</div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          {orderLookupResult.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-gray-700">Khóa học trong đơn:</div>
                        {orderLookupResult.items.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200 text-xs">
                            <span className="font-semibold text-gray-800 truncate mr-2">{item.title}</span>
                            <span className="font-bold text-[#c9a43c] shrink-0">{item.salePrice}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-xs text-gray-500">
                          Link Google Drive VIP: <strong className="text-emerald-600">Đã kích hoạt</strong>
                        </div>
                        <a
                          href={siteConfig.zaloUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#0068ff] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-blue-600"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Yêu cầu gửi lại link qua Zalo ({siteConfig.phone})</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROFILE & WARRANTY (CHÍNH SÁCH BẢO HÀNH) */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xl font-black text-[#171a1c]">Chính Sách & Bảo Hành Học Viên</h2>
                    <p className="text-xs text-gray-500 mt-1">Thông tin quyền lợi học tập của bạn tại {siteConfig.name}.</p>
                  </div>

                  <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-900 block mb-1">Bảo Hành Link Google Drive Trọn Đời:</strong>
                        <span>Nếu thư mục Drive bị lỗi truy cập hoặc đổi link, Admin cam kết cấp lại link mới trong 15-30 phút qua Zalo hỗ trợ.</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900 block mb-1">Cập Nhật Bài Mới Miễn Phí:</strong>
                        <span>Tất cả các khóa học khi có video bài giảng hoặc tài liệu mới đều được tự động đồng bộ vào thư mục của bạn.</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-900 block mb-1">Kênh Hỗ Trợ 24/7:</strong>
                        <span>Zalo / Hotline: <strong>{siteConfig.phone}</strong> | Email: {siteConfig.email}.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
