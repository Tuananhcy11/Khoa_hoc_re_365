import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-[#121619] text-gray-400 text-xs border-t border-white/5 pt-12 pb-16 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="relative h-11 w-11 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0">
                <Image
                  src="/images/logo-hocre365.png"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                />
              </span>
              <span className="font-black text-lg leading-none tracking-tight">
                <span className="text-white">Học </span>
                <span className="text-[#f3dc85]">Rẻ</span>
                <span className="text-white"> 365</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              {siteConfig.name} — Nền tảng chia sẻ khóa học trực tuyến uy tín hàng đầu Việt Nam. Cung cấp kho tài nguyên bài giảng video chất lượng cao từ các chuyên gia hàng đầu.
            </p>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d5ab3d] shrink-0" />
                <span>Hotline: <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[#f3dc85] transition-colors">{siteConfig.phone}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#0068ff] shrink-0" />
                <span>Zalo tư vấn: <a href={siteConfig.zaloUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#0068ff] transition-colors">{siteConfig.phone}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="w-4 h-4 text-[#1877f2] shrink-0" />
                <span>Fanpage: <a href={siteConfig.fanpageUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#1877f2] transition-colors flex items-center gap-1">{siteConfig.fanpageName} <ExternalLink className="w-3 h-3 inline" /></a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d5ab3d] shrink-0" />
                <span>Email: <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d5ab3d] shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Khóa Học Phổ Biến
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/danh-muc/tri-tue-nhan-tao-ai" className="hover:text-[#f3dc85] transition-colors">
                  Khóa học AI & Vibe Coding 2025
                </Link>
              </li>
              <li>
                <Link href="/danh-muc/khoa-hoc-lap-trinh" className="hover:text-[#f3dc85] transition-colors">
                  Lập trình Java, Python, Web Fullstack
                </Link>
              </li>
              <li>
                <Link href="/danh-muc/kinh-doanh-khoi-nghiep" className="hover:text-[#f3dc85] transition-colors">
                  Facebook Ads & Marketing Thực Chiến
                </Link>
              </li>
              <li>
                <Link href="/danh-muc/ngoai-ngu" className="hover:text-[#f3dc85] transition-colors">
                  Khóa học Ngoại ngữ (Anh, Trung, Nhật, Hàn)
                </Link>
              </li>
              <li>
                <Link href="/danh-muc/combo-khoa-hoc" className="hover:text-[#f3dc85] transition-colors">
                  Combo trọn bộ tiết kiệm hơn 90%
                </Link>
              </li>
              <li>
                <Link href="/hoi-vien" className="hover:text-[#f3dc85] font-semibold text-[#d5ab3d] transition-colors">
                  👑 Gói VIP 2.000+ Khóa Học 599.000 ₫
                </Link>
              </li>
              <li>
                <Link href="/mua" className="hover:text-[#f3dc85] transition-colors">
                  Tất cả khóa học tại Cửa Hàng →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Guide */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Hỗ Trợ & Chính Sách
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/huong-dan-mua-hang" className="hover:text-[#f3dc85] transition-colors">
                  Hướng dẫn đăng ký & nhận link Drive
                </Link>
              </li>
              <li>
                <Link href="/cac-cau-hoi-thuong-gap" className="hover:text-[#f3dc85] transition-colors">
                  Câu hỏi thường gặp & bảo hành trọn đời
                </Link>
              </li>
              <li>
                <Link href="/cong-cu" className="hover:text-[#f3dc85] transition-colors">
                  Công cụ hỗ trợ tải video & học tập
                </Link>
              </li>
              <li>
                <Link href="/danh-gia-khach-hang" className="hover:text-[#f3dc85] transition-colors">
                  Đánh giá & phản hồi từ học viên
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-[#f3dc85] transition-colors">
                  Giới thiệu về nền tảng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-affiliate" className="hover:text-[#f3dc85] transition-colors">
                  Chương trình cộng tác viên Affiliate 30%
                </Link>
              </li>
              <li>
                <a href={siteConfig.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#f3dc85] transition-colors">
                  Yêu cầu khóa học chưa có trên web ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Payment */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Cam Kết & Thanh Toán
            </h4>
            <div className="p-4 rounded-2xl bg-[#1e2326] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-white font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>100% Bảo hành link tải</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Cam kết link Google Drive VIP tốc độ cao, hỗ trợ cấp lại link trọn đời nếu xảy ra sự cố kỹ thuật.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-gray-300 space-y-1">
                <div>Ngân hàng: <strong>{siteConfig.bankInfo.bankName}</strong></div>
                <div>STK: <strong className="text-[#f3dc85]">{siteConfig.bankInfo.accountNumber}</strong></div>
                <div>Chủ TK: <strong>{siteConfig.bankInfo.accountName}</strong></div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                <a 
                  href={siteConfig.fanpageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 px-3 rounded-xl bg-[#1877f2]/20 hover:bg-[#1877f2]/30 text-[#1877f2] font-bold text-xs border border-[#1877f2]/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FacebookIcon className="w-4 h-4 fill-[#1877f2]" />
                  <span>Theo dõi Fanpage</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Bản quyền giao diện được clone chuẩn theo website gốc.
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">Hotline: {siteConfig.phone}</a>
            <span>•</span>
            <a href={siteConfig.fanpageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <span>•</span>
            <a href={siteConfig.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zalo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
