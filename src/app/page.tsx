"use client";

import { useState } from "react";
import siteData from "../../public/data/siteData.json";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickActionsSection from "@/components/QuickActionsSection";
import SkillsSection from "@/components/SkillsSection";
import SmartBuySection from "@/components/SmartBuySection";
import FlashSaleSlotsSection from "@/components/FlashSaleSlotsSection";
import CourseSwiperSection from "@/components/CourseSwiperSection";
import ToolsSection from "@/components/ToolsSection";
import MembershipSection from "@/components/MembershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course, Testimonial, ToolItem } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = siteData.courses as Course[];

  const cartIds = new Set(cartItems.map((c) => c.id));

  const flashSaleCourses = courses.filter((c) => c.isFlashSale).slice(0, 4);
  const bestSellers = courses.slice(0, 8);
  const newCourses = [...courses].reverse().slice(0, 8);

  const aiCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes("ai") ||
      c.title.toLowerCase().includes("claude") ||
      c.category.toLowerCase().includes("ai")
  );

  const itCourses = courses.filter(
    (c) =>
      c.category.toLowerCase().includes("lập trình") ||
      c.title.toLowerCase().includes("java") ||
      c.title.toLowerCase().includes("backend") ||
      c.title.toLowerCase().includes("data")
  );

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

      <main className="flex-1">
        {/* 1. Hero — split layout */}
        <HeroSection />

        {/* Thao tác nhanh — đưa các chức năng chính lên ngay dưới Hero */}
        <QuickActionsSection />

        {/* 2. Học theo mục tiêu (8 lĩnh vực + số khóa học) */}
        <SkillsSection />

        {/* 3. Mua thông minh hơn (3 thẻ) */}
        <SmartBuySection />

        {/* 4. Flash Sale theo khung giờ */}
        <FlashSaleSlotsSection
          courses={flashSaleCourses}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          cartIds={cartIds}
          onSelectCourse={setSelectedCourse}
        />

        {/* 5. Bán chạy — Khóa học được mua nhiều nhất */}
        <CourseSwiperSection
          title="Khóa học được mua nhiều nhất"
          eyebrow="Bán chạy"
          description="Những lựa chọn được học viên quan tâm nhiều trên hệ thống."
          courses={bestSellers}
          viewAllHref="/mua"
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          cartIds={cartIds}
          onSelectCourse={setSelectedCourse}
        />

        {/* 6. Tiện ích số — Công cụ */}
        <ToolsSection tools={siteData.tools as ToolItem[]} />

        {/* 7. Đặc quyền hội viên — 5 gói + 599K */}
        <MembershipSection />

        {/* 8. Swiper: AI & Vibe Coding */}
        {aiCourses.length > 0 && (
          <CourseSwiperSection
            title="✨ Khóa Học AI & Vibe Coding Đón Đầu Xu Hướng"
            eyebrow="AI & Automation"
            description="Làm chủ Claude AI, Prompt Engineering, tạo phần mềm và tự động hóa công việc."
            courses={aiCourses}
            viewAllHref="/danh-muc/tri-tue-nhan-tao"
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          cartIds={cartIds}
            onSelectCourse={setSelectedCourse}
          />
        )}

        {/* 9. Học viên nói gì — Testimonials */}
        <TestimonialsSection testimonials={siteData.testimonials as Testimonial[]} />

        {/* 10. Mua một lần, học thật tiện — quy trình */}
        <HowItWorksSection />

        {/* 11. Swiper: IT & Lập trình */}
        {itCourses.length > 0 && (
          <CourseSwiperSection
            title="💻 Lập Trình & Công Nghệ Thực Chiến"
            eyebrow="Dành cho Lập trình viên"
            description="Java, Python, Fullstack Web, Backend và Data Science từ các giảng viên nổi tiếng."
            courses={itCourses}
            viewAllHref="/danh-muc/cong-nghe-thong-tin"
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          cartIds={cartIds}
            onSelectCourse={setSelectedCourse}
          />
        )}

        {/* 12. Mới cập nhật */}
        <CourseSwiperSection
          title="Khóa học mới dành cho bạn"
          eyebrow="Mới cập nhật"
          description="Nội dung mới được bổ sung và cập nhật thường xuyên."
          courses={newCourses}
          markNew
          viewAllHref="/mua"
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          cartIds={cartIds}
          onSelectCourse={setSelectedCourse}
        />

        {/* 13. Cam kết chất lượng */}
        <BenefitsSection />

        {/* 14. Quick Links to Dedicated Pages */}
        <section className="py-12 bg-[#faf8f2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#171a1c]">Dịch Vụ & Trang Chức Năng Riêng Biệt</h2>
              <p className="text-xs text-gray-500 mt-1">Truy cập nhanh vào từng trang chuyên biệt theo nhu cầu của bạn</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
              <Link href="/mua" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>📚 Kho Khóa Học ({courses.length})</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/flash-sale" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#e11d2e] shadow-sm flex items-center justify-between text-red-600">
                <span>⚡ Flash Sale Giờ Vàng</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </Link>
              <Link href="/cong-cu" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>🛠️ Công Cụ & Tools Drive</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/danh-gia-khach-hang" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>⭐ Đánh Giá Của Học Viên</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/huong-dan-mua-hang" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>📖 Hướng Dẫn Mua Hàng</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/cac-cau-hoi-thuong-gap" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>❓ Câu Hỏi Thường Gặp</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/chinh-sach-affiliate" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>🤝 Đối Tác & Affiliate</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/tai-khoan" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#c9a43c] shadow-sm flex items-center justify-between">
                <span>👤 Tra Cứu Đơn & Khóa Lưu</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </section>
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
