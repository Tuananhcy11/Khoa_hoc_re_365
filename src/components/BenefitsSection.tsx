import { Infinity, DownloadCloud, ShieldCheck, Headphones, RefreshCw } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Infinity,
      title: "Truy Cập Vĩnh Viễn Trọn Đời",
      desc: "Chỉ thanh toán 1 lần duy nhất, bạn sở hữu link Google Drive vĩnh viễn không lo hết hạn hay đóng khóa.",
      color: "text-[#c9a43c]",
      bg: "bg-[#c9a43c]/10",
      border: "border-[#c9a43c]/30"
    },
    {
      icon: DownloadCloud,
      title: "Tải Về Học Offline Tốc Độ Cao",
      desc: "Lưu trữ trên Google Drive VIP tốc độ cao, có thể xem online hoặc tải trọn bộ video về máy tính/điện thoại.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30"
    },
    {
      icon: ShieldCheck,
      title: "100% Video & Bài Tập Chuẩn Gốc",
      desc: "Chất lượng video sắc nét Full HD, âm thanh trong trẻo, đầy đủ slide tài liệu và source code thực hành.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: RefreshCw,
      title: "Cập Nhật Bài Mới Miễn Phí",
      desc: "Khi giảng viên hoặc trung tâm ra bài giảng mới, hệ thống tự động đồng bộ thêm vào thư mục cho học viên.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30"
    },
    {
      icon: Headphones,
      title: "Hỗ Trợ Kỹ Thuật 24/7 Qua Zalo",
      desc: "Đội ngũ kỹ thuật trực hỗ trợ nhanh chóng từ 8h00 - 23h30 hàng ngày, cam kết bảo hành link nếu có sự cố.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30"
    }
  ];

  return (
    <section className="py-10 sm:py-12 bg-[#faf8f2] border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
            Cam kết chất lượng
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#171a1c] text-balance">
            Tại Sao Hơn 50.000+ Học Viên Chọn Học Rẻ 365?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Giải pháp học tập tiết kiệm đến 95% chi phí mà vẫn đảm bảo chất lượng tri thức nguyên bản.
          </p>
        </div>

        {/* Mobile: hàng ngang gọn (icon trái, chữ phải); md trở lên: thẻ dọc */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 md:p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-row md:flex-col items-start gap-3.5 md:gap-0"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center ${b.bg} ${b.color} md:mb-4`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#171a1c] mb-1 md:mb-2 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
