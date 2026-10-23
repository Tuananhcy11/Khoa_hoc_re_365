# Hướng dẫn bật tính năng Đăng nhập / Đăng ký (Học Rẻ 365)

Code đã viết xong. Để chạy thật, cần 3 thứ bên ngoài (bạn tự tạo bằng tài khoản của mình),
rồi điền vào biến môi trường trên **Vercel** (và file `.env` khi chạy local).

## 1) Tạo Database PostgreSQL (miễn phí) — Neon
1. Vào https://neon.tech → đăng ký → **Create project**.
2. Mở **Connection string** → copy chuỗi dạng:
   `postgresql://user:pass@ep-xxx.ap-southeast-1.aws.neon.tech/dbname?sslmode=require`
3. Dán vào biến `DATABASE_URL`.

## 2) Tạo bảng trong DB (chạy 1 lần)
Ở máy, sau khi điền `DATABASE_URL` thật vào file `.env`:
```bash
npx prisma db push
```
Lệnh này tạo các bảng User, Account, Session, CartItem... theo `prisma/schema.prisma`.

## 3) Khóa bí mật Auth.js
```bash
npx auth secret
```
Copy chuỗi sinh ra vào biến `AUTH_SECRET`.

## 4) Đăng nhập Google
1. Vào https://console.cloud.google.com → tạo project.
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID → Web application**.
3. **Authorized redirect URIs** thêm 2 dòng:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://khoahocre365.com/api/auth/callback/google`
4. Copy **Client ID** → `AUTH_GOOGLE_ID`, **Client secret** → `AUTH_GOOGLE_SECRET`.

## 5) Điền biến môi trường trên Vercel
Vào **Vercel → project → Settings → Environment Variables**, thêm:
| Tên | Giá trị |
|---|---|
| `DATABASE_URL` | chuỗi Neon ở bước 1 |
| `AUTH_SECRET` | chuỗi ở bước 3 |
| `AUTH_GOOGLE_ID` | ở bước 4 |
| `AUTH_GOOGLE_SECRET` | ở bước 4 |
| `AUTH_URL` | `https://khoahocre365.com` |

Sau đó **Redeploy**. Xong là web có đăng nhập/đăng ký + giỏ hàng lưu theo tài khoản.

---

## Hoạt động thế nào
- **Khách (chưa đăng nhập):** giỏ hàng lưu tạm trong trình duyệt (localStorage) — đã chạy sẵn, không cần DB.
- **Đăng nhập (email/mật khẩu hoặc Google):** giỏ hàng lưu vào DB; đăng nhập máy khác vẫn còn.
- Khi đăng nhập, giỏ hàng khách tự **gộp** vào tài khoản.

## Trang & API đã tạo
- `/dang-nhap`, `/dang-ky` — trang đăng nhập / đăng ký
- `/api/register` — tạo tài khoản (mật khẩu mã hóa bcrypt)
- `/api/auth/...` — Auth.js (NextAuth)
- `/api/cart` — lưu/đọc/xóa giỏ hàng theo tài khoản
