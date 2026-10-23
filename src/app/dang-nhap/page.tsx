"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#171a1c] px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <span className="relative h-11 w-11 rounded-xl overflow-hidden ring-1 ring-white/10">
            <Image src="/images/logo-hocre365.png" alt="Học Rẻ 365" fill className="object-cover" />
          </span>
          <span className="font-black text-xl text-white">
            Học <span className="text-[#f3dc85]">Rẻ</span> 365
          </span>
        </Link>

        <div className="bg-[#1e2326] border border-white/10 rounded-3xl p-7 shadow-2xl">
          <h1 className="text-2xl font-black text-white text-center">Đăng nhập</h1>
          <p className="text-sm text-gray-400 text-center mt-1 mb-6">
            Đăng nhập để lưu giỏ hàng và khóa học của bạn.
          </p>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-slate-800 font-bold text-sm hover:bg-gray-100 transition-colors"
          >
            <GoogleIcon /> Đăng nhập với Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-gray-500">hoặc dùng email</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#252a2d] border border-white/10 text-white placeholder:text-gray-500 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#d5ab3d]"
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full bg-[#252a2d] border border-white/10 text-white placeholder:text-gray-500 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#d5ab3d]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7ae32] to-[#b88d22] text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-60 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Đăng nhập
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            Chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="text-[#f3dc85] font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <Link href="/" className="block text-center text-xs text-gray-500 hover:text-gray-300 mt-5">
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
