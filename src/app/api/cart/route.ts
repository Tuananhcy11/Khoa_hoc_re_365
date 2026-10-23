import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Lấy giỏ hàng của người dùng đang đăng nhập (danh sách courseId)
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ courseIds: [] });
  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    select: { courseId: true },
  });
  return NextResponse.json({ courseIds: items.map((i) => i.courseId) });
}

// Thêm 1 khóa, hoặc gộp nhiều khóa (khi đăng nhập, gộp giỏ khách vào tài khoản)
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const ids: string[] = Array.isArray(body.courseIds)
    ? body.courseIds
    : body.courseId
    ? [body.courseId]
    : [];
  const clean = ids.filter((x) => typeof x === "string" && x).slice(0, 500);
  if (clean.length === 0) return NextResponse.json({ error: "Thiếu courseId." }, { status: 400 });

  await prisma.cartItem.createMany({
    data: clean.map((courseId) => ({ userId: session.user.id, courseId })),
    skipDuplicates: true,
  });

  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    select: { courseId: true },
  });
  return NextResponse.json({ courseIds: items.map((i) => i.courseId) });
}

// Xóa 1 khóa (?courseId=...) hoặc xóa sạch giỏ (?all=1)
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const { searchParams } = new URL(req.url);
  if (searchParams.get("all") === "1") {
    await prisma.cartItem.deleteMany({ where: { userId: session.user.id } });
    return NextResponse.json({ courseIds: [] });
  }
  const courseId = searchParams.get("courseId");
  if (!courseId) return NextResponse.json({ error: "Thiếu courseId." }, { status: 400 });

  await prisma.cartItem.deleteMany({ where: { userId: session.user.id, courseId } });
  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    select: { courseId: true },
  });
  return NextResponse.json({ courseIds: items.map((i) => i.courseId) });
}
