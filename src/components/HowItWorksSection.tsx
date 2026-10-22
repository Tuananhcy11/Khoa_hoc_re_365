import { MousePointerClick, QrCode, Send, PlayCircle } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: MousePointerClick,
      title: "Chọn Khóa Học",
      desc: "Tìm khóa học cần học hoặc chọn Gói VIP 599K trọn bộ để tiết kiệm tối đa.",
    },
    {
      step: "02",
      icon: QrCode,
      title: "Quét Mã Chuyển Khoản",
      desc: "Thanh toán tiện lợi qua QR Code hoặc số tài khoản ngân hàng chính chủ.",
    },
    {
      step: "03",
      icon: Send,
      title: "Nhận Link Drive Ngay",
      desc: "Admin gửi link thư mục Google Drive VIP đầy đủ tài liệu chỉ sau 1-2 phút.",
    },
    {
      step: "04",
      icon: PlayCircle,
      title: "Học Trọn Đời Vĩnh Viễn",
      desc: "Xem trực tiếp trên web/app hoặc tải về máy tính lưu trữ mãi mãi.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#faf8f2] border-b border-[#e8e3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9a43c] bg-[#c9a43c]/10 px-3 py-1 rounded-full border border-[#c9a43c]/20">
            Quy trình đơn giản
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#171a1c] text-balance">
            4 Bước Nhận Khóa Học Trong 2 Phút
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Hệ thống hỗ trợ tự động và đội ngũ kỹ thuật trực liên tục hỗ trợ bạn nhanh nhất.
          </p>
        </div>

        {/* Mobile: lưới 2x2 gọn, số bước nằm góc phải */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-sm flex flex-col"
              >
                <div className="absolute top-3 right-4 sm:static text-xl sm:text-3xl font-black text-[#c9a43c]/30 sm:mb-4 font-mono">
                  {s.step}
                </div>
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#171a1c] text-[#f3dc85] flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171a1c] mb-1 sm:mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                    {s.desc}
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
