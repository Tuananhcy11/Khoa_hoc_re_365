"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import { useCourses } from "@/hooks/useCourses";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import Image from "next/image";
import Link from "next/link";
import { User, Heart, PackageSearch, ShieldCheck, PhoneCall, ShoppingCart, ArrowRight, BookOpen, Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function TaiKhoanPage() {
  const [activeTab, setActiveTab] = useState<"wishlist" | "orders" | "profile">("wishlist");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderLookupEmail, setOrderLookupEmail] = useState("");
  const [orderLookupResult, setOrderLookupResult] = useState<any>(null);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { courses } = useCourses();
  // Demo wishlist: 4 khóa đầu, cho phép gỡ (không dùng effect để tránh render dây chuyền)
  const [removedWishlist, setRemovedWishlist] = useState<Set<string>>(new Set());
  const wishlistCourses = courses.slice(0, 4).filter((c) => !removedWishlist.has(c.id));

  const handleRemoveWishlist = (id: string) => {
    setRemovedWishlist((prev) => new Set(prev).add(id));
  };

  const handleAddToCart = (course: Course) => {
    if (!cartItems.some((item) => item.id === course.id)) {
      setCartItems((prev) => [...prev, course]);
    }
    setIsCartOpen(true);
  };

  const handleLookupOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderLookupEmail.trim()) return;
    // Simulate finding order
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
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={wishlistCourses.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setActiveTab("wishlist")}
      />

      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
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
                  <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    {wishlistCourses.length}
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
            <div className="flex-1">
              {/* Tab 1: Wishlist */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                    <div>
                      <h2 className="text-xl font-black text-[#171a1c]">Danh Sách Khóa Học Yêu Thích</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Các khóa học bạn đã đánh dấu để học hoặc tham khảo sau.</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400">{wishlistCourses.length} khóa</span>
                  </div>

                  {wishlistCourses.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm font-semibold">Chưa có khóa học yêu thích nào</p>
                      <Link href="/mua" className="mt-3 inline-block text-xs font-bold text-[#c9a43c] hover:underline">
                        Khám phá khóa học ngay →
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistCourses.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 rounded-2xl border border-gray-200 flex gap-3 hover:border-[#c9a43c]/50 transition-colors bg-[#faf8f2]"
                        >
                          <div className="relative w-28 aspect-[16/9] rounded-xl overflow-hidden shrink-0 bg-gray-200">
                            <Image
                              src={c.image?.startsWith("/") ? c.image : `/${c.image || "images/0_logo.png"}`}
                              alt={c.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-[#c9a43c] uppercase">{c.category}</span>
                              <h4 className="text-xs font-bold text-[#171a1c] line-clamp-2 mt-0.5">{c.title}</h4>
                              <div className="text-xs font-black text-[#c9a43c] mt-1">{c.salePrice}</div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                              <button
                                onClick={() => handleAddToCart(c)}
                                className="px-2.5 py-1 rounded-lg bg-[#171a1c] text-[#f3dc85] text-[11px] font-bold flex items-center gap-1"
                              >
                                <ShoppingCart className="w-3 h-3" />
                                <span>Mua</span>
                              </button>
                              <button
                                onClick={() => handleRemoveWishlist(c.id)}
                                className="text-[11px] text-gray-400 hover:text-red-500"
                              >
                                Bỏ lưu
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Orders Lookup */}
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

              {/* Tab 3: Profile & Warranty */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xl font-black text-[#171a1c]">Chính Sách & Bảo Hành Học Viên</h2>
                    <p className="text-xs text-gray-500 mt-1">Thông tin quyền lợi học tập của bạn tại Học Rẻ 365.</p>
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
