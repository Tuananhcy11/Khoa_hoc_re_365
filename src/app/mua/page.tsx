"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import siteData from "../../../public/data/siteData.json";
import { useCourses } from "@/hooks/useCourses";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { Search, BookOpen, Loader2 } from "lucide-react";
import type { Course } from "@/types";

// useSearchParams cần nằm trong Suspense để Next build được trang tĩnh
export default function MuaPage() {
  return (
    <Suspense>
      <MuaContent />
    </Suspense>
  );
}

function MuaContent() {
  // Nhận từ khóa từ ô tìm kiếm ở Hero (?q=...)
  const initialQuery = useSearchParams().get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const ITEMS_PER_PAGE = 12;
  const { courses, loading } = useCourses();

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = searchQuery
        ? c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      if (!matchSearch) return false;

      if (selectedCategory === "all") return true;
      return c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    }).sort((a, b) => {
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      if (sortBy === "students") return b.studentsCount - a.studentsCount;
      return 0; // default popular
    });
  }, [courses, searchQuery, selectedCategory, sortBy]);

  // Đổi bộ lọc thì quay về trang 1 ngay trong handler, không cần effect
  const updateSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const updateCategory = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };
  const updateSort = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const cartIds = new Set(cartItems.map((c) => c.id));

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

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 220, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2]">
      <Header
        categories={siteData.categories}
        searchQuery={searchQuery}
        onSearchChange={updateSearch}
        cartCount={cartItems.length}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Tất cả khóa học</span>
            </div>
            <h1 className="text-3xl font-black text-[#171a1c]">
              Kho Khóa Học Chất Lượng Cao
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Khám phá hơn 2.000 khóa học trực tuyến thuộc mọi lĩnh vực với mức giá ưu đãi nhất.
            </p>
          </div>

          {/* Controls Bar: Search & Filter */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search within page */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên khóa học..."
                className="w-full bg-[#faf8f2] border border-gray-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c9a43c]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Category Select & Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => updateCategory(e.target.value)}
                className="bg-[#faf8f2] border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#c9a43c]"
              >
                <option value="all">Tất cả danh mục ({courses.length})</option>
                {siteData.categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => updateSort(e.target.value)}
                className="bg-[#faf8f2] border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#c9a43c]"
              >
                <option value="popular">Bán chạy nhất</option>
                <option value="students">Nhiều học viên nhất</option>
                <option value="reviews">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Result Count Status */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-6">
            <div>
              Hiển thị <strong>{paginatedCourses.length}</strong> trên tổng số <strong>{filteredCourses.length}</strong> khóa học
            </div>
            {totalPages > 1 && (
              <div>
                Trang <strong>{currentPage}</strong> / {totalPages}
              </div>
            )}
          </div>

          {/* Course Grid */}
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-24 text-gray-400 text-sm">
              <Loader2 className="w-5 h-5 animate-spin" /> Đang tải khóa học...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">Không tìm thấy khóa học nào</h3>
              <p className="text-xs text-gray-500 mt-1">Vui lòng thử chọn danh mục hoặc từ khóa khác.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectCourse={setSelectedCourse}
                    isWished={wishlistIds.has(course.id)}
                    inCart={cartIds.has(course.id)}
                  />
                ))}
              </div>

              {/* Pagination Controls (Matching shop_pagination) */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 transition-colors shadow-sm"
                  >
                    ← Trang trước
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, idx, arr) => (
                      <span key={page} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-1.5 text-gray-400 select-none">…</span>
                        )}
                        <button
                          onClick={() => goToPage(page)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            currentPage === page
                              ? "bg-[#171a1c] text-[#f3dc85] shadow-lg shadow-black/20 scale-105"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    ))}

                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 transition-colors shadow-sm"
                  >
                    Trang sau →
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
