"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/types";

interface CourseSwiperSectionProps {
  title: string;
  eyebrow?: string;
  description?: string;
  courses: Course[];
  viewAllHref?: string;
  onAddToCart: (course: Course) => void;
  onToggleWishlist: (course: Course) => void;
  wishlistIds: Set<string>;
  cartIds?: Set<string>;
  onSelectCourse: (course: Course) => void;
  markNew?: boolean;
}

export default function CourseSwiperSection({
  title,
  eyebrow,
  description,
  courses,
  viewAllHref,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds,
  onSelectCourse,
  markNew = false,
}: CourseSwiperSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalPages = Math.max(1, Math.ceil(courses.length / 4));

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const pageIndex = Math.round(scrollLeft / clientWidth);
      setActiveIndex(Math.min(totalPages - 1, Math.max(0, pageIndex)));
    }
  }, [totalPages]);

  // Cập nhật nút trượt khi khung có kích thước thật / đổi kích thước
  // (callback của observer chạy ngoài effect nên không gây render dây chuyền)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => observer.disconnect();
  }, [checkScroll, courses]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const amount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: index * clientWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 bg-white border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Nav Buttons */}
        <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6">
          <div className="min-w-0">
            {eyebrow && (
              <span className="text-[11px] font-bold text-[#c9a43c] uppercase tracking-wider bg-[#c9a43c]/10 px-2.5 py-1 rounded-md border border-[#c9a43c]/20 mb-1.5 inline-block">
                {eyebrow}
              </span>
            )}
            <h2 className="text-xl md:text-2xl font-black text-[#171a1c] flex items-center gap-2 text-balance">
              {title}
            </h2>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>

          {/* Mobile: chỉ link "Xem tất cả" (vuốt tay để trượt); sm trở lên: thêm 2 nút mũi tên */}
          <div className="flex items-center gap-2 shrink-0">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="text-xs font-bold text-[#c9a43c] hover:underline sm:mr-2 whitespace-nowrap"
              >
                Xem tất cả →
              </Link>
            )}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Trượt sang trái"
              className={`hidden sm:inline-flex p-2 rounded-xl border transition-all ${
                canScrollLeft
                  ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm"
                  : "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Trượt sang phải"
              className={`hidden sm:inline-flex p-2 rounded-xl border transition-all ${
                canScrollRight
                  ? "bg-[#171a1c] border-[#171a1c] text-[#f3dc85] hover:bg-black shadow-md"
                  : "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onSelectCourse={onSelectCourse}
              isWished={wishlistIds.has(course.id)}
              inCart={cartIds?.has(course.id)}
              isNew={markNew}
              className="w-[270px] sm:w-[290px] shrink-0 snap-start"
            />
          ))}
        </div>

        {/* Pagination Dots (matching khgh-mobile-swiper__dots) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all ${
                  i === activeIndex
                    ? "w-6 h-2 bg-[#c9a43c] rounded-full"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
