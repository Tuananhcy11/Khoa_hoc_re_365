"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Heart, ArrowRight, BookOpen, Users, Check } from "lucide-react";
import type { Course, Category } from "@/types";

interface CourseCatalogSectionProps {
  courses: Course[];
  categories: Category[];
  searchQuery: string;
  onAddToCart: (course: Course) => void;
  onToggleWishlist: (course: Course) => void;
  wishlistIds: Set<string>;
  onSelectCourse: (course: Course) => void;
}

export default function CourseCatalogSection({
  courses,
  categories,
  searchQuery,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectCourse,
}: CourseCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtering
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "combo") return course.category.toLowerCase().includes("combo");
    if (selectedCategory === "it") return course.category.toLowerCase().includes("lập trình") || course.category.toLowerCase().includes("công nghệ");
    if (selectedCategory === "ai") return course.category.toLowerCase().includes("ai") || course.title.toLowerCase().includes("ai") || course.title.toLowerCase().includes("claude");
    if (selectedCategory === "marketing") return course.category.toLowerCase().includes("marketing") || course.category.toLowerCase().includes("facebook");
    if (selectedCategory === "languages") return course.category.toLowerCase().includes("ngoại ngữ") || course.title.toLowerCase().includes("tiếng");
    if (selectedCategory === "finance") return course.category.toLowerCase().includes("đầu tư") || course.title.toLowerCase().includes("forex") || course.title.toLowerCase().includes("smc");

    return true;
  });

  const displayCategories = [
    { id: "all", name: "Tất cả khóa học" },
    { id: "ai", name: "✨ AI & Vibe Coding" },
    { id: "it", name: "💻 Lập trình & CNTT" },
    { id: "marketing", name: "📢 Marketing & Ads" },
    { id: "languages", name: "🌐 Ngoại ngữ" },
    { id: "finance", name: "📈 Đầu tư & Forex" },
    { id: "combo", name: "📦 Combo Tiết Kiệm" },
  ];

  return (
    <section id="courses" className="py-14 bg-[#faf8f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full inline-block border border-[#c9a43c]/20 mb-2">
              Kho tri thức phong phú
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171a1c]">
              Khám Phá Các Khóa Học Hàng Đầu
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Đầy đủ video bài giảng, source code mẫu và tài liệu thực hành trọn đời.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Hiển thị <strong>{filteredCourses.length}</strong> khóa học phù hợp
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {displayCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-[#171a1c] text-[#f3dc85] border-[#171a1c] shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">Không tìm thấy khóa học nào</h3>
            <p className="text-xs text-gray-500 mt-1">Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const isWished = wishlistIds.has(course.id);
              return (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#c9a43c]/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={course.image?.startsWith("/") ? course.image : `/${course.image || "images/0_logo.png"}`}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Eyebrow tag on image */}
                    <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-[#f3dc85] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {course.category}
                    </span>

                    {/* Discount badge */}
                    {course.discount && (
                      <span className="absolute bottom-2.5 left-2.5 bg-[#e11d2e] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                        {course.discount}
                      </span>
                    )}

                    {/* Wishlist button */}
                    <button
                      onClick={() => onToggleWishlist(course)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 hover:bg-white text-gray-700 shadow-md transition-colors"
                      title={isWished ? "Bỏ yêu thích" : "Lưu yêu thích"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWished ? "fill-[#e11d2e] text-[#e11d2e]" : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Students */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>5.0</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{course.studentsCount} học viên</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectCourse(course)}
                        className="text-sm font-bold text-[#171a1c] group-hover:text-[#c9a43c] transition-colors line-clamp-2 cursor-pointer leading-snug"
                        title={course.title}
                      >
                        {course.title}
                      </h3>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-extrabold text-[#c9a43c]">
                          {course.salePrice}
                        </div>
                        <div className="text-[11px] text-gray-400 line-through">
                          {course.regularPrice}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onAddToCart(course)}
                          className="p-2 rounded-xl bg-gray-100 hover:bg-[#c9a43c] text-gray-700 hover:text-white transition-colors"
                          title="Thêm vào giỏ"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="px-3 py-2 rounded-xl bg-[#171a1c] hover:bg-black text-[#f3dc85] font-bold text-xs flex items-center gap-1 transition-colors"
                        >
                          <span>Xem</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
