/* =========================================================================
   نموذج المجال — مطابق لوثيقة PRD (منصة تجهيز عروض اعتماد)
   §6 الأدوار · §7 الاشتراك · §12 التحليل والثقة · §13 مصفوفة التجهيز
   ========================================================================= */

/** §13 — تصنيف المتطلب */
export type RequirementCategory =
  | "فني"
  | "مالي"
  | "إداري"
  | "مرفق"
  | "موعد";

/** §13 — حالة المتطلب (القيم الخمس المعتمدة) */
export type RequirementStatus =
  | "جديد"
  | "قيد التجهيز"
  | "جاهز"
  | "يحتاج مراجعة"
  | "ناقص";

export type Priority = "عالية" | "متوسطة" | "منخفضة";

/** §12.2 — كل متطلب يحفظ مصدره وثقته */
export interface RequirementSource {
  fileName: string;
  page: number;
  /** النص المستخرج حرفياً من الكراسة */
  excerpt: string;
}

export interface Requirement {
  id: string;
  title: string;
  /** وصف موجز للمتطلب */
  detail: string;
  category: RequirementCategory;
  status: RequirementStatus;
  priority: Priority;
  /** هل يتطلب مرفقاً؟ (§13) */
  needsAttachment: boolean;
  /** هل يتطلب نصاً في العرض؟ (§13) */
  needsText: boolean;
  /** المسؤول (§13) — قد يكون غير معيّن */
  owner: Owner | null;
  /** درجة ثقة الاستخراج 0..1 (§12.2) */
  confidence: number;
  /** هل يحتاج مراجعة بشرية (§12.2) */
  needsHumanReview: boolean;
  /** مصدر المتطلب محفوظ داخلياً (§13) */
  source: RequirementSource;
}

export interface Owner {
  name: string;
  initials: string;
}

/** §6.3 — أدوار مستخدمي الشركة */
export type CompanyRole =
  | "مالك"
  | "مدير"
  | "مدير العروض"
  | "معدّ فني"
  | "معدّ مالي"
  | "مراجع"
  | "قارئ";

/** حالة معالجة الكراسة في الخلفية (§9.2 / ADR-7 State Machine) */
export type TenderStage =
  | "قيد المعالجة"
  | "بانتظار المراجعة"
  | "جاهزة"
  | "تم التصدير";

export interface Tender {
  id: string;
  /** رقم المنافسة على اعتماد */
  reference: string;
  title: string;
  /** الجهة الحكومية */
  entity: string;
  /** القطاع/المجال */
  sector: string;
  /** تاريخ الإغلاق (نص عربي معروض) */
  closingDate: string;
  /** الأيام المتبقية حتى الإغلاق */
  daysLeft: number;
  stage: TenderStage;
  /** نسبة الجاهزية 0..100 */
  readiness: number;
  requirementsCount: number;
  gapsCount: number;
}
