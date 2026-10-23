export interface FlashSaleTimer {
  isActive: boolean;
  label: "KẾT THÚC SAU" | "BẮT ĐẦU SAU";
  statusBadge: "ĐANG MỞ" | "SẮP MỞ";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
  slotTimeDisplay: string; // "11:00 - 18:00"
  saleDateDisplay: string; // "Ngày 19 hàng tháng"
  durationHours: number;   // 7 tiếng
}

/**
 * Quy tắc Flash Sale cố định:
 * - Diễn ra vào ngày 19 hàng tháng
 * - Bắt đầu từ 11:00 trưa (11:00 AM)
 * - Kéo dài cố định 7 tiếng -> kết thúc lúc 18:00 cùng ngày (6:00 PM)
 * - Chỉ có 1 khung giờ vàng duy nhất trong tháng.
 */
export function getFlashSaleState(now: Date = new Date()): FlashSaleTimer {
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Khung giờ 11:00 - 18:00 ngày 19 tháng này
  const startThisMonth = new Date(currentYear, currentMonth, 19, 11, 0, 0, 0);
  const endThisMonth = new Date(currentYear, currentMonth, 19, 18, 0, 0, 0);

  let isActive = false;
  let targetDate: Date;
  let label: "KẾT THÚC SAU" | "BẮT ĐẦU SAU";
  let statusBadge: "ĐANG MỞ" | "SẮP MỞ";

  if (now.getTime() >= startThisMonth.getTime() && now.getTime() < endThisMonth.getTime()) {
    // Đang trong khung giờ vàng (11:00 - 18:00 ngày 19)
    isActive = true;
    targetDate = endThisMonth;
    label = "KẾT THÚC SAU";
    statusBadge = "ĐANG MỞ";
  } else if (now.getTime() < startThisMonth.getTime()) {
    // Chưa tới 11:00 ngày 19 của tháng hiện tại
    isActive = false;
    targetDate = startThisMonth;
    label = "BẮT ĐẦU SAU";
    statusBadge = "SẮP MỞ";
  } else {
    // Đã qua 18:00 ngày 19 tháng hiện tại -> Đếm tới 11:00 ngày 19 tháng sau
    isActive = false;
    targetDate = new Date(currentYear, currentMonth + 1, 19, 11, 0, 0, 0);
    label = "BẮT ĐẦU SAU";
    statusBadge = "SẮP MỞ";
  }

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isActive,
    label,
    statusBadge,
    days,
    hours,
    minutes,
    seconds,
    targetDate,
    slotTimeDisplay: "11:00 - 18:00",
    saleDateDisplay: "Ngày 19 hàng tháng",
    durationHours: 7,
  };
}

export function padZero(n: number): string {
  return n.toString().padStart(2, "0");
}
