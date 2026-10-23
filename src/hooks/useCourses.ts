"use client";

import { useState, useEffect } from "react";
import type { Course } from "@/types";

// Tải danh sách khóa học lúc chạy từ /data/courses.json thay vì nhúng vào JS bundle.
// Dùng cache ở cấp module để mọi component chỉ fetch 1 lần duy nhất.
let cache: Course[] | null = null;
let inflight: Promise<Course[]> | null = null;

function loadCourses(): Promise<Course[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/data/courses.json")
      .then((r) => r.json())
      .then((data: Course[]) => {
        cache = data;
        return data;
      })
      .catch(() => {
        inflight = null; // cho phép thử lại nếu lỗi mạng
        return [];
      });
  }
  return inflight;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    if (cache !== null) return; // đã có sẵn, không fetch lại
    let active = true;
    loadCourses().then((data) => {
      if (active) {
        setCourses(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { courses, loading };
}
