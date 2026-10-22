"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitsSection from "@/components/BenefitsSection";
import CartModal from "@/components/CartModal";
import Link from "next/link";
import { ShieldCheck, Award, HeartHandshake, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Course } from "@/types";

export default function GioiThieuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Giới thiệu</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#171a1c]">
              Về Chúng Tôi — Học Rẻ 365
            </h1>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
              Học Rẻ 365 được ra đời với sứ mệnh giúp người Việt tiếp cận các khóa học chất lượng cao với chi phí tiết kiệm nhất.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed mb-10">
            <h2 className="text-xl font-bold text-[#171a1c] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c9a43c]" />
              Sứ Mệnh Của Học Rẻ 365
            </h2>
            <p>
              Trong thời đại công nghệ số bùng nổ, việc liên tục trau dồi các kỹ năng mới như <strong>AI, Lập trình, Marketing, Ngoại ngữ và Đầu tư</strong> là yếu tố quyết định sự phát triển sự nghiệp của mỗi người. Tuy nhiên, rào cản học phí hàng triệu đến hàng chục triệu đồng cho mỗi khóa học khiến nhiều bạn trẻ, sinh viên và người đi làm khó có cơ hội tiếp cận.
            </p>
            <p>
              Học Rẻ 365 tập hợp, lưu trữ và chia sẻ kho tài nguyên học tập phong phú với mức giá chỉ bằng một bữa ăn sáng (từ 49.000 ₫ hoặc gói trọn bộ 599.000 ₫ trọn đời), giúp bạn mở ra cánh cửa tri thức vô tận.
            </p>

            <h2 className="text-xl font-bold text-[#171a1c] pt-4 border-t border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Cam Kết Của Chúng Tôi
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
              <li><strong>100% Video gốc:</strong> Bài giảng sắc nét Full HD, âm thanh rõ ràng, đầy đủ mã nguồn và tài liệu đính kèm.</li>
              <li><strong>Quyền truy cập vĩnh viễn:</strong> Không giới hạn thời gian học, không lo tài khoản hết hạn.</li>
              <li><strong>Hỗ trợ kỹ thuật 24/7:</strong> Bảo hành link tải trọn đời, hỗ trợ tức thì qua Zalo: {siteConfig.phone} hoặc Fanpage {siteConfig.fanpageName}.</li>
            </ul>
          </div>

          <BenefitsSection />
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
