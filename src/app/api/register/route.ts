import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const mail = typeof email === "string" ? email.toLowerCase().trim() : "";

    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Mật khẩu phải từ 6 ký tự trở lên." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: mail } });
    if (existing) {
      return NextResponse.json({ error: "Email này đã được đăng ký." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: typeof name === "string" && name.trim() ? name.trim() : mail.split("@")[0],
        email: mail,
        passwordHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
  }
}
