"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { FAQItem } from "@/types";

interface FaqSectionProps {
  faqs: FAQItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-[#faf8f2] border-b border-[#e8e3d5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a43c]/10 border border-[#c9a43c]/25 text-[#a87d19] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#171a1c]">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Mọi điều bạn cần biết trước khi mua khóa học tại Khóa Học Giá Hời.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-[#171a1c] hover:text-[#c9a43c] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gray-500 ${
                      isOpen ? "rotate-180 text-[#c9a43c]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
