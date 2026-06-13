export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

/** دمج بسيط لأسماء أصناف Tailwind مع تجاهل القيم الفارغة. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) out.push(inner);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

/** لون درجة الإلحاح حسب الأيام المتبقية حتى الإغلاق (موحّد عبر الصفحات). */
export function daysLeftTone(daysLeft: number): string {
  if (daysLeft <= 3) return "text-error";
  if (daysLeft <= 10) return "text-warning";
  return "text-on-surface-variant";
}

/** تحويل الأرقام اللاتينية إلى عربية هندية للعرض. */
export function toArabicNumerals(input: string | number): string {
  const map = "٠١٢٣٤٥٦٧٨٩";
  return String(input).replace(/\d/g, (d) => map[Number(d)]);
}

/** تطبيع نص عربي للبحث: قص المسافات وتوحيد صور الألف والياء. */
export function normalizeArabic(s: string): string {
  return s
    .trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}
