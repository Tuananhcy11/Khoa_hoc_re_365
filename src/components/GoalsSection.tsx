import { 
  Terminal, 
  Cpu, 
  Banknote, 
  Target, 
  Globe, 
  LineChart, 
  ArrowRight 
} from "lucide-react";
import type { GoalItem } from "@/types";

interface GoalsSectionProps {
  goals: GoalItem[];
}

const iconMap: Record<string, any> = {
  Terminal,
  Cpu,
  Banknote,
  Target,
  Globe,
  LineChart,
};

export default function GoalsSection({ goals }: GoalsSectionProps) {
  return (
    <section className="py-14 bg-white border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
            Lộ trình học tập
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#171a1c]">
            Bạn Muốn Học Để Đạt Mục Tiêu Gì?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Chọn lộ trình học được chọn lọc bài bản theo từng chuyên ngành cụ thể.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal, idx) => {
            const Icon = iconMap[goal.icon] || Terminal;
            return (
              <a
                key={idx}
                href="#courses"
                className="group p-5 rounded-2xl bg-[#faf8f2] border border-gray-200/80 hover:border-[#c9a43c]/50 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#c9a43c]/15 text-[#c9a43c] group-hover:bg-[#c9a43c] group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-[#171a1c] group-hover:text-[#c9a43c] transition-colors">
                      {goal.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#c9a43c] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                    {goal.desc}
                  </p>
                  <span className="text-[11px] font-semibold text-[#c9a43c] bg-[#c9a43c]/10 px-2 py-0.5 rounded">
                    {goal.count}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
