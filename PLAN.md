# PLAN.MD: THIẾT KẾ KỸ THUẬT & KẾ HOẠCH THỰC THI BACKEND KHÓA HỌC GIÁ HỜI
*(Hệ Thống Phân Phối Khóa Học Tự Động 100% Qua Google Drive)*

---

## 📌 CHỈ THỊ DÀNH CHO CLAUDE CODE (EXECUTION DIRECTIVE)

Chào **Claude Code**, bạn là Kỹ sư Trưởng (Lead Backend Engineer) thực thi tài liệu này. Hãy đọc kỹ toàn bộ thiết kế, hiện thực hóa 100% các phân hệ, viết test đạt **100% PASS**, sau đó tạo commit và ghi kết quả vào **`REPORT.md`**.

### ⚠️ Quy tắc thực thi:
1. **Bảo vệ Frontend hiện có:** Không làm hỏng hoặc xóa các components, giao diện đã dựng tại `src/app` và `src/components`. Giữ nguyên cấu trúc giao diện responsive và styling hiện tại.
2. **Cập nhật `package.json`:**
   - Thêm script: `"ai:run": "claude -p \"Đọc PLAN.md và thực thi toàn bộ, chạy pass 100% test rồi commit push và ghi kết quả vào REPORT.md\" --permission-mode acceptEdits"`
   - Thêm script test: `"test": "vitest run"` hoặc `"test": "jest"`
   - Cài đặt các thư viện cần thiết: `@payos/node`, `googleapis`, `vitest` (hoặc `jest` + `@types/jest`), `dotenv`, etc.
3. **Quy chuẩn mã nguồn:** TypeScript strict mode, xử lý lỗi chặt chẽ (try-catch, async/await), validate input bằng Zod hoặc schema validation.
4. **Cam kết kiểm thử:** Mọi phân hệ mới đều phải có file test tương ứng trong `tests/` hoặc `__tests__/`, chạy lệnh `npm test` đạt **100% PASS** trước khi commit.

---

## PHẦN 1: BẢNG KẾT QUẢ GAP ANALYSIS (KIỂM KÊ HIỆN TRẠNG & KHOẢNG TRỐNG)

| STT | Phân hệ Backend tiêu chuẩn | Hiện trạng trong Code | Đánh giá & Nhiệm vụ cần làm |
| :--- | :--- | :--- | :--- |
| **1** | **Google Drive Permission Worker & `DriveAccessLogs`** | ❌ **Chưa có (0%)** | Xây dựng worker tích hợp Google Drive API (`drive.permissions.create`) tự động cấp quyền `reader` cho Gmail khách khi đơn PayOS `paid`. Lưu log vào `DriveAccessLogs`. |
| **2** | **Cổng bảo vệ Link Drive & Chống cào kho VIP (`/api/drive/open/[courseId]`)** | ❌ **Chưa có (0%)** | Xây dựng API route gateway bảo mật. Tuyệt đối không để lộ URL Drive thô ra Frontend. Áp dụng Rate Limit tối đa 25 khóa/giờ cho tài khoản VIP để chống crawler/bot và share tài khoản. |
| **3** | **Tra cứu đơn hàng & Gửi lại link Drive không cần mật khẩu (`/api/orders/lookup`)** | ❌ **Chưa có (0%)** | Xây dựng API tra cứu cho khách Guest Checkout bằng Gmail hoặc Mã đơn hàng. Trả về danh sách khóa học đã mua kèm nút kích hoạt gửi lại link qua email (có Rate Limit 5 lần/10 phút). |
| **4** | **Cơ chế Khấu trừ tiền khi nâng cấp VIP 599K (`VIP Upgrade Credit`)** | ❌ **Chưa có (0%)** | Xây dựng logic tự động kiểm tra các đơn mua lẻ/combo trạng thái `paid` trong 7 ngày gần nhất của Gmail khách. Tự động khấu trừ vào giá gói VIP 599k (sàn tối thiểu 199k). |
| **5** | **Hệ thống báo lỗi Link Drive (`CourseIssues` & `/api/courses/report`)** | ❌ **Chưa có (0%)** | Xây dựng Collection/Model `CourseIssues` và API `/api/courses/report` nhận báo cáo lỗi 403, 404, thiếu video từ học viên, lưu vào hệ thống và kích hoạt thông báo Admin. |
| **6** | **Thông báo Realtime qua Telegram Bot (`telegram-notify.ts`)** | ❌ **Chưa có (0%)** | Xây dựng module gửi tin nhắn Telegram Bot bất đồng bộ ngầm (non-blocking). Bắn tin nhắn khi có đơn `paid`, có `PaymentClaims` chuyển khoản thủ công, hoặc có báo lỗi link Drive. |
| **7** | **Webhook PayOS & Khởi tạo thanh toán (`/api/webhook/payos`)** | ❌ **Chưa có (0%)** | Xây dựng endpoint tiếp nhận Webhook PayOS, xác thực checksum hợp lệ, cập nhật trạng thái đơn hàng sang `paid`, kích hoạt Drive Permission Worker và Telegram Notify. |

---

## PHẦN 2: THIẾT KẾ SCHEMA DỮ LIỆU & COLLECTIONS

Claude Code hãy tạo các file định nghĩa schema trong thư mục `src/collections/` hoặc `src/lib/models/` (hỗ trợ persistence dữ liệu qua SQLite/LibSQL hoặc JSON database an toàn, dễ bảo trì):

### 1. `Orders` (Quản lý Đơn hàng)
- `id`: string (UUID)
- `orderCode`: number / string (Mã đơn hàng duy nhất từ PayOS hoặc tự sinh, ví dụ: `1789481`)
- `customerEmail`: string (Gmail của khách nhận link Drive)
- `customerPhone`: string
- `items`: Array<{ courseId: string, courseTitle: string, price: number, driveFolderId?: string }>
- `isVipUpgrade`: boolean (Đánh dấu đơn nâng cấp VIP)
- `originalAmount`: number (Số tiền gốc, ví dụ: 599000)
- `creditDeducted`: number (Số tiền được khấu trừ từ đơn cũ)
- `finalAmount`: number (Số tiền thực tế phải thanh toán, tối thiểu 199000)
- `status`: `'pending' | 'paid' | 'cancelled' | 'refunded'`
- `paymentMethod`: `'payos' | 'bank_transfer' | 'momo'`
- `payosPaymentLinkId`: string
- `paidAt`: Date / ISO string
- `createdAt`: Date / ISO string

### 2. `DriveAccessLogs` (Nhật ký cấp quyền Google Drive)
- `id`: string
- `orderId`: string
- `orderCode`: string
- `customerEmail`: string (Gmail được cấp quyền)
- `courseId`: string
- `folderId`: string (Google Drive Folder ID)
- `role`: string (Mặc định: `'reader'`)
- `status`: `'success' | 'failed'`
- `permissionId`: string (ID quyền do Google API trả về)
- `errorMessage`: string (nếu lỗi)
- `createdAt`: Date / ISO string

### 3. `CourseIssues` (Báo cáo lỗi thư mục Drive từ học viên)
- `id`: string
- `courseId`: string
- `courseTitle`: string
- `customerEmail`: string
- `issueType`: `'403_access_denied' | '404_not_found' | 'missing_videos' | 'link_broken' | 'other'`
- `description`: string
- `status`: `'pending' | 'investigating' | 'resolved'`
- `adminNote`: string
- `resolvedAt`: Date / ISO string
- `createdAt`: Date / ISO string

### 4. `PaymentClaims` (Khiếu nại / Xác nhận chuyển khoản thủ công)
- `id`: string
- `orderCode`: string
- `customerEmail`: string
- `customerPhone`: string
- `amount`: number
- `receiptImageUrl`: string
- `note`: string
- `status`: `'pending' | 'verified' | 'rejected'`
- `createdAt`: Date / ISO string

### 5. `VipAccessTracking` (Theo dõi lượt mở link chống cào kho VIP)
- `customerEmail`: string
- `date`: string (YYYY-MM-DD)
- `hourlyWindow`: string (YYYY-MM-DD-HH)
- `coursesAccessed`: Array<{ courseId: string, timestamp: Date }>
- `hourlyCount`: number (Tối đa 25 lượt/giờ)

---

## PHẦN 3: ĐẶC TẢ KỸ THUẬT CHI TIẾT TỪNG FILE CẦN TẠO

### File 1: `src/lib/telegram-notify.ts`
- **Mục đích:** Bắn thông báo Realtime tới Telegram Group của Admin.
- **Yêu cầu quan trọng:** **Non-blocking / Fail-safe**. Lỗi mạng hoặc lỗi Telegram API không được làm gián đoạn Webhook PayOS hay làm crash API response.
- **Hàm cần xuất khẩu:**
  ```typescript
  export async function notifyNewOrderPaid(order: Order): Promise<void>;
  export async function notifyCourseIssueReported(issue: CourseIssue): Promise<void>;
  export async function notifyPaymentClaimSubmitted(claim: PaymentClaim): Promise<void>;
  ```
- **Nội dung tin nhắn mẫu:**
  - *Đơn hàng:* `🎉 [ĐƠN HÀNG MỚI ĐÃ THANH TOÁN] #1789481 | 599.000 ₫ | Gmail: hocvien@gmail.com | Gói: Trọn Bộ 2.000+ Khóa Học`
  - *Báo lỗi:* `🚨 [CẢNH BÁO LỖI LINK DRIVE] Khóa: Lập trình Java 28Tech | Lỗi: 403 Access Denied | Báo bởi: hocvien@gmail.com`

### File 2: `src/lib/drive-worker.ts`
- **Mục đích:** Tự động cấp quyền Google Drive thông qua Service Account.
- **Hàm cần xuất khẩu:**
  ```typescript
  export async function grantDriveAccessToCustomer(
    customerEmail: string,
    folderId: string,
    orderId: string,
    courseId: string
  ): Promise<{ success: boolean; permissionId?: string; error?: string }>;
  ```
- **Logic:**
  1. Khởi tạo `google.drive({ version: 'v3', auth })` bằng `GOOGLE_SERVICE_ACCOUNT_EMAIL` và `GOOGLE_PRIVATE_KEY`.
  2. Gọi `drive.permissions.create`:
     - `fileId`: `folderId`
     - `sendNotificationEmail`: false (hoặc true tùy cấu hình)
     - `supportsAllDrives`: true
     - `requestBody`: `{ role: 'reader', type: 'user', emailAddress: customerEmail }`
  3. Ghi log ngay lập tức vào `DriveAccessLogs`.
  4. Cơ chế retry: Thử lại tối đa 3 lần nếu gặp lỗi mạng tạm thời (exponential backoff).

### File 3: `src/lib/rate-limiter.ts`
- **Mục đích:** Bảo vệ API, chống crawler/bot cào kho VIP và chống brute force tra cứu đơn.
- **Hàm cần xuất khẩu:**
  ```typescript
  export function checkVipOpenRateLimit(customerEmail: string): { allowed: boolean; remaining: number; resetTime: Date };
  export function checkOrderLookupRateLimit(ipOrEmail: string): { allowed: boolean; remaining: number };
  ```
- **Giới hạn:**
  - VIP Open Drive Link: **Tối đa 25 lượt mở/giờ**. Nếu vượt quá -> Trả về HTTP 429 `"Bạn đã mở quá giới hạn 25 khóa học trong 1 giờ. Vui lòng quay lại sau ít phút để bảo vệ tài khoản VIP."`
  - Order Lookup: **Tối đa 5 lượt tra cứu trong 10 phút**.

### File 4: `src/lib/vip-credit.ts`
- **Mục đích:** Tính toán khấu trừ tiền khi nâng cấp lên gói VIP 599K.
- **Hàm cần xuất khẩu:**
  ```typescript
  export async function calculateVipUpgradePrice(customerEmail: string): Promise<{
    originalPrice: number;
    creditAmount: number;
    finalPrice: number;
    eligibleOrders: Array<{ orderCode: string; amount: number; paidAt: Date }>;
  }>;
  ```
- **Quy tắc khấu trừ:**
  - Giá gốc VIP: `599.000 ₫`.
  - Quét trong database các đơn hàng trạng thái `paid` của `customerEmail` có `paidAt` trong vòng **7 ngày gần nhất**.
  - Tổng số tiền khấu trừ = Tổng tiền các đơn hợp lệ.
  - `finalPrice = Math.max(199000, 599000 - creditAmount)`. (Sàn tối thiểu 199.000 ₫).

### File 5: `src/app/api/webhook/payos/route.ts`
- **Phương thức:** `POST`
- **Logic xử lý:**
  1. Tiếp nhận payload webhook từ PayOS.
  2. Xác thực tính toàn vẹn dữ liệu bằng `payos.verifyPaymentWebhookData(body)`.
  3. Nếu `data.code === '00'` và `status === 'PAID'`:
     - Cập nhật trạng thái `Orders` sang `paid`, ghi nhận `paidAt`.
     - Lặp qua các `items` trong đơn hàng, lấy `driveFolderId`.
     - Kích hoạt `grantDriveAccessToCustomer` để cấp quyền đọc thư mục Drive cho Gmail khách.
     - Gọi `notifyNewOrderPaid` gửi tin nhắn Telegram tới Admin.
  4. Trả về HTTP 200 `{ success: true }`.

### File 6: `src/app/api/drive/open/[courseId]/route.ts`
- **Phương thức:** `GET`
- **Tham số query/header:** `?email=...&token=...` hoặc session user
- **Logic:**
  1. Kiểm tra quyền: Email này đã mua khóa học `courseId` chưa, hoặc có gói VIP 599k còn hạn không?
  2. Nếu không có quyền -> Trả về HTTP 403 Forbidden.
  3. Kiểm tra `checkVipOpenRateLimit(email)`. Nếu vượt quá 25 khóa/giờ -> Trả về HTTP 429 Too Many Requests.
  4. Nếu hợp lệ:
     - Ghi nhận lượt mở vào `VipAccessTracking`.
     - Thực hiện HTTP 302 Redirect thẳng tới `https://drive.google.com/drive/folders/{folderId}` hoặc trả về URL có chữ ký an toàn.

### File 7: `src/app/api/orders/lookup/route.ts`
- **Phương thức:** `POST`
- **Input body:** `{ query: string, action?: 'view' | 'resend_email' }` (query có thể là Gmail hoặc Mã đơn hàng).
- **Logic:**
  1. Kiểm tra Rate limit tra cứu (tối đa 5 lần / 10 phút).
  2. Tìm kiếm trong bảng `Orders` các đơn có `status: 'paid'` khớp với Gmail hoặc `orderCode`.
  3. Trả về danh sách khóa học kèm trạng thái link Drive.
  4. Nếu `action === 'resend_email'`: Tổng hợp toàn bộ link khóa học và gửi lại vào Gmail khách hàng.

### File 8: `src/app/api/courses/report/route.ts`
- **Phương thức:** `POST`
- **Input body:** `{ courseId: string, courseTitle: string, customerEmail: string, issueType: string, description: string }`
- **Logic:**
  1. Validate dữ liệu đầu vào.
  2. Lưu bản ghi mới vào `CourseIssues` với trạng thái `pending`.
  3. Kích hoạt `notifyCourseIssueReported` bắn thông báo khẩn qua Telegram.
  4. Trả về HTTP 200 `{ success: true, message: "Đã tiếp nhận báo cáo. Kỹ thuật viên sẽ kiểm tra link trong 15-30 phút." }`.

### File 9: `src/app/api/checkout/create-payment/route.ts`
- **Phương thức:** `POST`
- **Input body:** `{ customerEmail: string, customerPhone: string, items: Array<{ courseId: string, price: number }>, isVip: boolean }`
- **Logic:**
  1. Nếu `isVip === true`: Gọi `calculateVipUpgradePrice(customerEmail)` để tự động áp dụng khấu trừ 7 ngày gần nhất.
  2. Tạo đơn hàng mới trong database với trạng thái `pending`.
  3. Gọi PayOS SDK `createPaymentLink` tạo URL thanh toán QR Code.
  4. Trả về `{ checkoutUrl: string, orderCode: number, finalAmount: number, creditDeducted: number }`.

### File 10: `.env.example`
Tạo file `.env.example` với đầy đủ tài liệu hướng dẫn:
```env
# URL website
NEXT_PUBLIC_APP_URL=http://localhost:3000

# PayOS Cổng thanh toán QR Code tự động
PAYOS_CLIENT_ID=your_client_id
PAYOS_API_KEY=your_api_key
PAYOS_CHECKSUM_KEY=your_checksum_key

# Google Drive API Service Account (Cấp quyền tự động)
GOOGLE_SERVICE_ACCOUNT_EMAIL=sa-drive-manager@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Telegram Bot Thông báo Realtime cho Admin
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
TELEGRAM_CHAT_ID=-1001234567890

# Cấu hình Email gửi link (Nodemailer / Resend)
RESEND_API_KEY=re_123456789
EMAIL_FROM=support@khoahocgiahoi.com
```

---

## PHẦN 4: DANH SÁCH UNIT TESTS & INTEGRATION TESTS BẮT BUỘC

Claude Code phải viết các file test trong thư mục `tests/` và chạy lệnh `npm test` pass 100%:

1. **`tests/drive-worker.test.ts`**:
   - Mock Google Drive API trả về thành công -> Kiểm tra `DriveAccessLogs` được tạo đúng status `success` và `permissionId`.
   - Mock Google Drive API trả về lỗi 403 / 404 -> Kiểm tra cơ chế retry và log status `failed` có lưu `errorMessage`.
2. **`tests/payos-webhook.test.ts`**:
   - Gửi payload Webhook có Checksum giả lập hợp lệ -> Order chuyển sang `paid`.
   - Đảm bảo Drive Worker được gọi đúng email và `folderId`.
   - Kiểm tra Telegram Notify được gọi không chặn luồng trả về HTTP 200.
3. **`tests/drive-gateway-ratelimit.test.ts`**:
   - Gọi API `/api/drive/open/[courseId]` 25 lần liên tiếp trong 1 giờ -> Cả 25 lần trả về 302 Redirect thành công.
   - Gọi lần thứ 26 -> Trả về HTTP 429 Too Many Requests.
   - Thử mở khóa học khi chưa thanh toán -> Trả về HTTP 403 Forbidden.
4. **`tests/vip-upgrade-credit.test.ts`**:
   - Giả lập khách đã mua 1 đơn 150.000 ₫ cách đây 3 ngày -> Giá VIP 599k còn `449.000 ₫`.
   - Giả lập khách đã mua 2 đơn tổng 450.000 ₫ cách đây 2 ngày -> Giá VIP 599k bị chặn ở mức sàn `199.000 ₫`.
   - Giả lập đơn mua cách đây 10 ngày (quá 7 ngày) -> Không được khấu trừ, giữ nguyên `599.000 ₫`.
5. **`tests/order-lookup.test.ts`**:
   - Tra cứu bằng Gmail hợp lệ -> Trả về danh sách đơn đã mua.
   - Tra cứu liên tục 6 lần trong 1 phút -> Lần thứ 6 bị chặn bởi Rate Limiter (HTTP 429).
6. **`tests/course-issues.test.ts`**:
   - Gửi báo cáo lỗi qua `/api/courses/report` -> Tạo bản ghi `CourseIssues` status `pending`.
   - Đảm bảo Telegram Notify được kích hoạt gửi thông báo cho Admin.
7. **`tests/telegram-nonblocking.test.ts`**:
   - Giả lập Telegram API bị timeout hoặc sập mạng -> Hàm `notifyNewOrderPaid` bắt lỗi êm dịu, không ném exception làm crash ứng dụng.

---

## PHẦN 5: BÁO CÁO NGHIỆM THU (`REPORT.MD`)

Sau khi hoàn tất toàn bộ các bước:
1. Chạy toàn bộ test suite: `npm test` và kiểm tra 100% pass.
2. Kiểm tra lại build ứng dụng: `npm run build` không lỗi.
3. Chạy `git add .` và `git commit -m "feat(backend): implement 6 core drive & payment modules with full test suite"`.
4. Viết tổng kết nghiệm thu chi tiết vào file **`REPORT.md`** gồm:
   - Danh sách các file mới đã tạo.
   - Kết quả chạy test (số lượng test pass/fail).
   - Hướng dẫn các biến môi trường cần điền để chạy thật.
