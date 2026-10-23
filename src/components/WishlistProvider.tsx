"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const LS_WISHLIST_KEY = "hocre365_wishlist";
const EVENT_NAME = "hocre365_wishlist_change";

interface WishlistContextValue {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    return {
      ids: [],
      count: 0,
      has: () => false,
      add: () => {},
      remove: () => {},
      toggle: () => {},
      clear: () => {},
    };
  }
  return ctx;
}

function readLS(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLS(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_WISHLIST_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    /* ignore */
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => setIds(readLS());
    sync();
    setMounted(true);

    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
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

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLS(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    writeLS([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        ids: mounted ? ids : [],
        count: mounted ? ids.length : 0,
        has,
        add,
        remove,
        toggle,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
