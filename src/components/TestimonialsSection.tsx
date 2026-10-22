import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-[#171a1c] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ab3d]/15 border border-[#d5ab3d]/30 text-[#f3dc85] text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#f3dc85]" /> Đánh Giá Thực Tế
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-balance">
            Học Viên Nói Gì Về Chúng Tôi?
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Hơn 50.000+ thành viên đã tin tưởng và nâng cao kỹ năng nghề nghiệp cùng Học Rẻ 365.
          </p>
        </div>

        {/* Mobile: dải vuốt ngang thay vì 4 thẻ ảnh to xếp chồng */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-1">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[80%] shrink-0 snap-start md:w-auto bg-[#252a2d] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:border-[#d5ab3d]/50 transition-all duration-300"
            >
              <div>
                {/* Feedback Image Thumbnail */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5">
                  <Image
                    src={t.avatar?.startsWith("/") ? t.avatar : `/${t.avatar || "images/0_logo.png"}`}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs text-gray-300 italic mb-4 leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#d5ab3d]" />
                  </div>
                  <div className="text-[10px] text-gray-400">{t.role}</div>
                </div>
                <span className="text-[10px] text-[#f3dc85] bg-[#d5ab3d]/15 px-2 py-0.5 rounded-full font-medium">
                  Đã mua
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
