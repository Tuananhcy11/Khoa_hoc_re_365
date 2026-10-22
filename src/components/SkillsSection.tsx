import Link from "next/link";
import {
  Megaphone,
  Palette,
  Code2,
  FileSpreadsheet,
  Languages,
  Sparkles,
  LineChart,
  Banknote,
  ArrowRight,
} from "lucide-react";

interface Skill {
  name: string;
  desc: string;
  count: string;
  icon: React.ElementType;
  slug: string;
}

const skills: Skill[] = [
  { name: "Kinh doanh & Marketing", desc: "Bán hàng, quảng cáo, xây dựng thương hiệu", count: "287 khóa học", icon: Megaphone, slug: "marketing" },
  { name: "Thiết kế & Sáng tạo", desc: "Đồ họa, video, dựng phim và nhiếp ảnh", count: "356 khóa học", icon: Palette, slug: "thiet-ke-djo-hoa" },
  { name: "Công nghệ & Lập trình", desc: "Website, ứng dụng, dữ liệu và công nghệ", count: "92 khóa học", icon: Code2, slug: "cong-nghe-thong-tin" },
  { name: "Tin học Văn phòng", desc: "Excel, Word, PowerPoint và kỹ năng làm việc", count: "171 khóa học", icon: FileSpreadsheet, slug: "tin-hoc-van-phong" },
  { name: "Ngoại ngữ", desc: "Tiếng Anh, Trung, Nhật, Hàn và giao tiếp", count: "256 khóa học", icon: Languages, slug: "ngoai-ngu" },
  { name: "Kỹ năng & Phát triển bản thân", desc: "Giao tiếp, tư duy và kỹ năng mềm", count: "90 khóa học", icon: Sparkles, slug: "" },
  { name: "Tài chính & Đầu tư", desc: "Chứng khoán, tài chính cá nhân và đầu tư", count: "122 khóa học", icon: LineChart, slug: "djau-tu" },
  { name: "Kiếm Tiền và MMO", desc: "MMO, affiliate và xây dựng thu nhập online", count: "122 khóa học", icon: Banknote, slug: "kiem-tien-va-mmo" },
];

export default function SkillsSection() {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
            Học theo mục tiêu
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#171a1c] text-balance">
            Bạn muốn nâng cao kỹ năng nào?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Chọn lĩnh vực gần nhất với công việc và mục tiêu bạn đang theo đuổi.
          </p>
        </div>

        {/* Mobile: 2 cột gọn, ẩn mô tả; từ sm trở lên hiện đầy đủ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.name}
                href={s.slug ? `/danh-muc/${s.slug}` : "/mua"}
                className="group p-3.5 sm:p-5 rounded-2xl bg-[#faf8f2] border border-gray-200/80 hover:border-[#c9a43c]/50 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#171a1c] text-[#f3dc85] group-hover:bg-[#c9a43c] group-hover:text-white flex items-center justify-center transition-colors shadow-md">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <ArrowRight className="hidden sm:block w-4 h-4 text-gray-300 group-hover:text-[#c9a43c] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-[13px] sm:text-sm font-bold text-[#171a1c] group-hover:text-[#c9a43c] transition-colors leading-snug flex-1 sm:flex-none">
                  {s.name}
                </h3>
                <p className="hidden sm:block text-xs text-gray-500 mt-1.5 leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-2 sm:mt-3 text-[11px] font-semibold text-[#c9a43c] bg-[#c9a43c]/10 px-2 py-0.5 rounded self-start">
                  {s.count}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/mua"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:border-[#c9a43c] hover:bg-[#c9a43c]/5 text-sm font-bold text-[#171a1c] transition-colors"
          >
            <span>Xem thêm 4 lĩnh vực</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
