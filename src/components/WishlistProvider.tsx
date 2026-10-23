"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const LS_WISHLIST_KEY = "hocre365_wishlist";

interface WishlistContextValue {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    return {
      ids: [],
      count: 0,
      has: () => false,
      toggle: () => {},
      remove: () => {},
    };
  }
  return ctx;
}

function readLS(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLS(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIds(readLS());
    setMounted(true);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLS(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeLS(next);
      return next;
    });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        ids: mounted ? ids : [],
        count: mounted ? ids.length : 0,
        has,
        toggle,
        remove,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
