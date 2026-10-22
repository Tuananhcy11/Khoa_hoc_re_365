import Image from "next/image";
import { Wrench, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { ToolItem } from "@/types";

interface ToolsSectionProps {
  tools: ToolItem[];
}

export default function ToolsSection({ tools }: ToolsSectionProps) {
  return (
    <section id="tools" className="py-10 sm:py-14 bg-[#faf8f2] border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full inline-block border border-[#c9a43c]/20 mb-2">
              Bộ công cụ hỗ trợ
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171a1c] text-balance">
              Công Cụ & Tiện Ích Độc Quyền
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Hỗ trợ tải video, sao lưu dữ liệu và tài liệu học tập một cách dễ dàng và nhanh chóng.
            </p>
          </div>
        </div>

        {/* Mobile: dải vuốt ngang */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-1">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="w-[80%] shrink-0 snap-start md:w-auto bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full bg-gray-100">
                <Image
                  src={tool.image?.startsWith("/") ? tool.image : `/${tool.image || "images/0_logo.png"}`}
                  alt={tool.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#171a1c] text-[#f3dc85] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {tool.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#c9a43c] mb-1">
                    {tool.category}
                  </div>
                  <h3 className="text-base font-bold text-[#171a1c] mb-2">
                    {tool.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{tool.price}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Kèm video hướng dẫn</span>
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#171a1c] hover:bg-black text-[#f3dc85] text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Nhận ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
