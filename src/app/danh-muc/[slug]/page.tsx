"use client";

import { useState, use, useMemo } from "react";
import siteData from "../../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/types";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "combo-khoa-hoc": ["combo", "trọn bộ"],
  "cong-nghe-thong-tin": ["lập trình", "công nghệ", "java", "python", "web", "backend", "frontend", "devops", "sql"],
  "tri-tue-nhan-tao": ["ai", "trí tuệ", "chatgpt", "claude", "vibe coding", "automation", "machine learning"],
  "kiem-tien-va-mmo": ["mmo", "kiếm tiền", "youtube", "shopee", "dropship", "affiliate"],
  "marketing": ["marketing", "ads", "quảng cáo", "seo", "content", "facebook", "tiktok"],
  "ngoai-ngu": ["ngoại ngữ", "tiếng anh", "ielts", "toeic", "tiếng trung", "tiếng nhật", "tiếng hàn"],
  "thiet-ke-djo-hoa": ["thiết kế", "đồ họa", "photoshop", "illustrator", "capcut", "premiere", "figma", "blender"],
  "djau-tu": ["đầu tư", "forex", "crypto", "chứng khoán", "tài chính", "trading"],
  "tin-hoc-van-phong": ["tin học", "excel", "word", "powerpoint", "power bi", "kế toán"],
};
const ITEMS_PER_PAGE = 12;

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { courses, loading } = useCourses();

  // Find matching category name
  const catObj = siteData.categories.find((c) => c.slug === slug);
  const categoryTitle = catObj ? catObj.name : slug.replace(/-/g, " ");

  const categoryCourses = useMemo(() => {
    const keys = CATEGORY_KEYWORDS[slug];
    if (!keys) return courses;
    return courses.filter((c) => {
      const hay = `${c.category} ${c.title}`.toLowerCase();
      return keys.some((k) => hay.includes(k));
    });
  }, [courses, slug]);

  const totalPages = Math.max(1, Math.ceil(categoryCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageCourses = categoryCourses.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const goToPage = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleAddToCart = (course: Course) => {
    if (!cartItems.some((item) => item.id === course.id)) {
      setCartItems((prev) => [...prev, course]);
    }
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (course: Course) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(course.id)) next.delete(course.id);
      else next.add(course.id);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2]">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <Link href="/mua" className="hover:text-[#c9a43c]">Danh mục</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold capitalize">{categoryTitle}</span>
            </div>
            <h1 className="text-3xl font-black text-[#171a1c] capitalize">
              {categoryTitle}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Tuyển tập các khóa học {categoryTitle} chọn lọc hay nhất, cập nhật liên tục.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-24 text-gray-400 text-sm">
              <Loader2 className="w-5 h-5 animate-spin" /> Đang tải khóa học...
            </div>
          ) : (
            <>
              <div className="text-xs text-gray-500 font-medium mb-5">
                {categoryCourses.length} khóa học
                {totalPages > 1 && <span> · Trang {currentPage}/{totalPages}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectCourse={setSelectedCourse}
                    isWished={wishlistIds.has(course.id)}
                    inCart={cartItems.some((c) => c.id === course.id)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 bg-white disabled:opacity-40 hover:border-[#c9a43c]"
                  >
                    ← Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .map((p, idx, arr) => (
                      <span key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">…</span>}
                        <button
                          onClick={() => goToPage(p)}
                          className={`w-9 h-9 rounded-lg text-xs font-bold border transition-colors ${
                            p === currentPage
                              ? "bg-[#171a1c] text-[#f3dc85] border-[#171a1c]"
                              : "bg-white border-gray-200 text-gray-700 hover:border-[#c9a43c]"
                          }`}
                        >
                          {p}
                        </button>
                      </span>
                    ))}
                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 bg-white disabled:opacity-40 hover:border-[#c9a43c]"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
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
