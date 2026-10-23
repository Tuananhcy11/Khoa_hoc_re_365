export interface FlashSaleTimer {
  isActive: boolean;
  label: "KẾT THÚC SAU" | "BẮT ĐẦU SAU";
  statusBadge: "ĐANG MỞ" | "SẮP MỞ";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
  slotTimeDisplay: string;
  nextSlotTime: string;
}

/**
 * Quy tắc Flash Sale vòng lặp:
 * - Mở bán 1 tiếng
 * - Sau đó nghỉ 1 tiếng
 * - Lặp lại liên tục: 1 tiếng Sale -> 1 tiếng Nghỉ -> 1 tiếng Sale
 * (Giờ chẵn: 0h, 2h, 4h, ..., 12h, 14h, 16h, 18h, 20h, 22h -> FLASH SALE ĐANG MỞ)
 * (Giờ lẻ: 1h, 3h, 5h, ..., 11h, 13h, 15h, 17h, 19h, 21h, 23h -> NGHỈ / SẮP MỞ)
 */
export function getFlashSaleState(now: Date = new Date()): FlashSaleTimer {
  const currentHour = now.getHours();
  // Giờ chẵn là mở bán, giờ lẻ là nghỉ chờ phiên tiếp theo
  const isSaleHour = currentHour % 2 === 0;

  // Điểm mốc tiếp theo là tròn giờ tiếp theo (đầu giờ sau)
  const nextHour = new Date(now);
  nextHour.setHours(currentHour + 1, 0, 0, 0);

  const diffMs = Math.max(0, nextHour.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600); // Luôn là 0 trong khung 1 tiếng
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const currentSlotStr = `${String(currentHour).padStart(2, "0")}:00 - ${String((currentHour + 1) % 24).padStart(2, "0")}:00`;
  const nextSlotStr = `${String((currentHour + 1) % 24).padStart(2, "0")}:00 - ${String((currentHour + 2) % 24).padStart(2, "0")}:00`;

  if (isSaleHour) {
    return {
      isActive: true,
      label: "KẾT THÚC SAU",
      statusBadge: "ĐANG MỞ",
      days: 0,
      hours,
      minutes,
      seconds,
      targetDate: nextHour,
      slotTimeDisplay: currentSlotStr,
      nextSlotTime: nextSlotStr,
    };
  } else {
    return {
      isActive: false,
      label: "BẮT ĐẦU SAU",
      statusBadge: "SẮP MỞ",
      days: 0,
      hours,
      minutes,
      seconds,
      targetDate: nextHour,
      slotTimeDisplay: currentSlotStr,
      nextSlotTime: nextSlotStr,
    };
  }
}

export function padZero(n: number): string {
  return n.toString().padStart(2, "0");
}
