"use client";

import { useState, use } from "react";
import siteData from "../../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import type { Course } from "@/types";

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

  // Find matching category name
  const catObj = siteData.categories.find((c) => c.slug === slug);
  const categoryTitle = catObj ? catObj.name : slug.replace(/-/g, " ");

  const courses = siteData.courses as Course[];
  const categoryCourses = courses.filter((c) => {
    if (slug === "combo-khoa-hoc") return c.category.toLowerCase().includes("combo") || c.title.toLowerCase().includes("combo");
    if (slug === "cong-nghe-thong-tin") return c.category.toLowerCase().includes("lập trình") || c.category.toLowerCase().includes("công nghệ");
    if (slug === "tri-tue-nhan-tao") return c.category.toLowerCase().includes("ai") || c.title.toLowerCase().includes("ai");
    if (slug === "marketing") return c.category.toLowerCase().includes("marketing") || c.title.toLowerCase().includes("ads");
    if (slug === "ngoai-ngu") return c.category.toLowerCase().includes("ngoại ngữ") || c.title.toLowerCase().includes("tiếng");
    if (slug === "djau-tu") return c.category.toLowerCase().includes("đầu tư") || c.title.toLowerCase().includes("forex");
    return true; // Fallback to all
  });

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryCourses.map((course) => (
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
