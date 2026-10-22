"use client";

import { useState } from "react";
import siteData from "../../../public/data/siteData.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import CartModal from "@/components/CartModal";
import Link from "next/link";
import type { Course } from "@/types";

export default function FaqPage() {
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
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#c9a43c]">Trang chủ</Link>
              <span>/</span>
              <span className="text-[#171a1c] font-semibold">Các câu hỏi thường gặp</span>
            </div>
          </div>
          <FaqSection faqs={siteData.faqs} />
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
