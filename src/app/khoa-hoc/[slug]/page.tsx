"use client";

import { useState, use } from "react";
import siteData from "../../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Check, ShoppingCart, MessageCircle, ShieldCheck, PlayCircle, FolderOpen, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const courses = siteData.courses as Course[];
  // Match course by slug or fallback to first course
  const course = courses.find((c) => c.slug === slug) || courses[0];

  const handleAddToCart = () => {
    if (!cartItems.some((item) => item.id === course.id)) {
      setCartItems((prev) => [...prev, course]);
    }
    setIsCartOpen(true);
  };

  const relatedCourses = courses.filter((c) => c.id !== course.id).slice(0, 4);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
            <span>/</span>
            <Link href="/mua" className="hover:text-[#c9a43c]">Khóa học</Link>
            <span>/</span>
            <span className="text-[#171a1c] font-semibold truncate max-w-xs sm:max-w-md">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left Col: Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-black/40 shadow-xl border border-gray-200">
                <Image
                  src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                {course.discount && (
                  <span className="absolute top-4 left-4 bg-[#e11d2e] text-white text-xs font-black px-3 py-1 rounded-xl shadow-lg">
                    Giảm {course.discount}
                  </span>
                )}
              </div>

              {/* Title & Metadata */}
              <div>
                <span className="text-xs font-bold text-[#c9a43c] uppercase tracking-wider bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
                  {course.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#171a1c] mt-3 leading-snug">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-3">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>5.0 (250+ học viên đánh giá xuất sắc)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{course.studentsCount} học viên đã tham gia</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-4 text-sm text-gray-700 leading-relaxed">
                <h2 className="text-lg font-bold text-[#171a1c] border-b border-gray-100 pb-3">
                  Giới Thiệu Nội Dung Khóa Học
                </h2>
                <p>
                  Khóa học <strong>{course.title}</strong> được biên soạn bài bản, bám sát thực tế từ cơ bản đến nâng cao. Toàn bộ video bài giảng đã được lưu trữ sẵn trên Google Drive VIP tốc độ cao, hỗ trợ xem trực tiếp hoặc tải về máy trọn đời.
                </p>

                <h3 className="text-base font-bold text-[#171a1c] pt-2">
                  Bạn Sẽ Nhận Được Khi Mua Khóa Học Này:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% Video gốc Full HD âm thanh rõ ràng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Đầy đủ slide, tài liệu và source code mẫu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Quyền truy cập vĩnh viễn không lo hết hạn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cập nhật miễn phí các bài giảng mới</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Hỗ trợ kỹ thuật 24/7 qua Zalo Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Bảo hành link tải trọn đời</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Price & Purchase Box */}
            <div>
              <div className="sticky top-24 bg-white rounded-3xl p-6 border border-gray-200 shadow-xl space-y-5">
                <div>
                  <div className="text-xs text-gray-500">Giá ưu đãi đặc biệt hôm nay:</div>
                  <div className="text-3xl font-black text-[#c9a43c] mt-1">{course.salePrice}</div>
                  <div className="text-xs text-gray-400 line-through">Giá gốc thị trường: {course.regularPrice}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-700 font-semibold">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>Cam kết hoàn tiền 100% nếu link hỏng hoặc không đúng bài học.</span>
                </div>

                <div className="space-y-3">
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#d5ab3d]/30 hover:scale-[1.02] transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Mua Ngay Qua Zalo ({siteConfig.phone})</span>
                  </a>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 rounded-2xl bg-[#171a1c] hover:bg-black text-[#f3dc85] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Thêm Vào Giỏ Hàng</span>
                  </button>
                </div>

                {/* Upsell to 599k */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#e8e3d5] text-xs">
                    <div className="font-bold text-[#171a1c] mb-1">🔥 Khuyên dùng:</div>
                    <p className="text-gray-600 mb-2">
                      Chỉ với <strong>599.000 ₫</strong>, bạn được sở hữu khóa học này cùng hơn 2.000 khóa học khác trên toàn hệ thống!
                    </p>
                    <Link
                      href="/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc"
                      className="text-[#c9a43c] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Xem chi tiết gói 599K</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-black text-[#171a1c] mb-6">
              Các Khóa Học Cùng Chuyên Mục
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedCourses.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/khoa-hoc/${rel.slug}`}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all p-3 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 bg-gray-100">
                    <Image
                      src={rel.image?.startsWith("/") ? rel.image : `/${rel.image || "images/0_logo.png"}`}
                      alt={rel.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#c9a43c] uppercase">{rel.category}</span>
                    <h3 className="text-xs font-bold text-[#171a1c] line-clamp-2 mt-1">{rel.title}</h3>
                    <div className="text-xs font-black text-[#c9a43c] mt-2">{rel.salePrice}</div>
                  </div>
                </Link>
              ))}
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
