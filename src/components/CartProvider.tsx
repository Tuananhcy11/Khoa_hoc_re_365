"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useCourses } from "@/hooks/useCourses";
import CartModal from "@/components/CartModal";
import type { Course } from "@/types";

const LS_KEY = "hocre365_cart";

interface CartContextValue {
  ids: string[];
  items: Course[];
  count: number;
  has: (id: string) => boolean;
  add: (course: Course) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được dùng bên trong <CartProvider>");
  return ctx;
}

function readLS(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLS(ids: string[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { courses } = useCourses();
  const [ids, setIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Khởi tạo giỏ: khách -> localStorage; đã đăng nhập -> gộp giỏ khách vào DB rồi tải DB
  useEffect(() => {
    let active = true;
    async function init() {
      if (status === "loading") return;
      if (status === "authenticated") {
        const guest = readLS();
        if (guest.length > 0) {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseIds: guest }),
          }).catch(() => {});
          writeLS([]);
        }
        const data = await fetch("/api/cart")
          .then((r) => r.json())
          .catch(() => ({ courseIds: [] }));
        if (active) setIds(Array.isArray(data.courseIds) ? data.courseIds : []);
      } else {
        await Promise.resolve();
        if (active) setIds(readLS());
      }
    }
    init();
    return () => {
      active = false;
    };
  }, [status]);

  // Khách: lưu giỏ vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (status !== "authenticated") writeLS(ids);
  }, [ids, status]);

  const add = useCallback(
    (course: Course) => {
      setIds((prev) => (prev.includes(course.id) ? prev : [...prev, course.id]));
      setIsOpen(true);
      if (status === "authenticated") {
        fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: course.id }),
        }).catch(() => {});
      }
    },
    [status]
  );

  const remove = useCallback(
    (id: string) => {
      setIds((prev) => prev.filter((x) => x !== id));
      if (status === "authenticated") {
        fetch(`/api/cart?courseId=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      }
    },
    [status]
  );

  const clear = useCallback(() => {
    setIds([]);
    if (status === "authenticated") {
      fetch("/api/cart?all=1", { method: "DELETE" }).catch(() => {});
    }
  }, [status]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = ids
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  return (
    <CartContext.Provider
      value={{ ids, items, count: ids.length, has, add, remove, clear, isOpen, openCart, closeCart }}
    >
      {children}
      <CartModal
        isOpen={isOpen}
        onClose={closeCart}
        cartItems={items}
        onRemoveItem={remove}
        onClearCart={clear}
      />
    </CartContext.Provider>
  );
}
