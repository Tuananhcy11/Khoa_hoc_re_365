"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Crown, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartCount = useCart().count;

  const navItems = [
    {
      label: "Trang chủ",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Khóa học",
      href: "/mua",
      icon: Grid,
      isActive: pathname.startsWith("/mua") || pathname.startsWith("/danh-muc"),
    },
    {
      label: "Hội viên",
      href: "/hoi-vien",
      icon: Crown,
      isActive: pathname.startsWith("/hoi-vien"),
    },
    {
      label: "Giỏ hàng",
      href: "/gio-hang",
      icon: ShoppingBag,
      isActive: pathname.startsWith("/gio-hang"),
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      label: "Tài khoản",
      href: "/tai-khoan",
      icon: User,
      isActive: pathname.startsWith("/tai-khoan"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#171a1c]/95 backdrop-blur-md border-t border-white/10 lg:hidden px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                item.isActive
                  ? "text-[#f3dc85] font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-[#e11d2e] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {item.isActive && (
                <span className="w-1 h-1 rounded-full bg-[#f3dc85] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
