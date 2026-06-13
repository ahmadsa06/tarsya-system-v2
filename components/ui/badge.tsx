import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import type {
  Priority,
  RequirementCategory,
  RequirementStatus,
  TenderStage,
} from "@/lib/types";

/* ---------------------------------- شارة عامة --------------------------------- */
export function Badge({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-caption" : "px-3 py-0.5 text-caption",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------- حالة المتطلب (§13: القيم الخمس) --------------------- */
const statusStyle: Record<
  RequirementStatus,
  { cls: string; icon: string; filled?: boolean }
> = {
  جديد: {
    cls: "bg-surface-container-high text-on-surface-variant",
    icon: "fiber_new",
  },
  "قيد التجهيز": {
    cls: "bg-secondary-container text-on-secondary-container",
    icon: "pending",
  },
  جاهز: {
    cls: "bg-success-container text-on-success-container",
    icon: "check_circle",
    filled: true,
  },
  "يحتاج مراجعة": {
    cls: "bg-warning-container text-on-warning-container",
    icon: "rate_review",
  },
  ناقص: {
    cls: "bg-error-container text-on-error-container",
    icon: "error",
    filled: true,
  },
};

export function StatusBadge({ status }: { status: RequirementStatus }) {
  const s = statusStyle[status];
  return (
    <Badge className={s.cls}>
      <Icon name={s.icon} filled={s.filled} className="text-[1.1em]" />
      {status}
    </Badge>
  );
}

/* ----------------------- تصنيف المتطلب (§13: خمس فئات) ----------------------- */
const categoryStyle: Record<RequirementCategory, string> = {
  فني: "bg-tertiary-container text-on-tertiary-container",
  مالي: "bg-secondary-container text-on-secondary-container",
  إداري: "bg-info-container text-on-info-container",
  مرفق: "bg-primary-fixed text-on-primary-fixed-variant",
  موعد: "bg-warning-container text-on-warning-container",
};

export function CategoryBadge({
  category,
}: {
  category: RequirementCategory;
}) {
  return <Badge className={categoryStyle[category]}>{category}</Badge>;
}

/* -------------------------------- الأولوية -------------------------------- */
const priorityStyle: Record<Priority, { dot: string; text: string }> = {
  عالية: { dot: "bg-error", text: "text-error" },
  متوسطة: { dot: "bg-warning", text: "text-warning" },
  منخفضة: { dot: "bg-outline", text: "text-on-surface-variant" },
};

export function PriorityTag({ priority }: { priority: Priority }) {
  const p = priorityStyle[priority];
  return (
    <span
      className={cn("inline-flex items-center gap-xs text-label-sm font-medium", p.text)}
    >
      <span className={cn("size-2 rounded-full", p.dot)} />
      {priority}
    </span>
  );
}

/* ------------------------ حالة معالجة الكراسة (§9.2) ------------------------ */
const stageStyle: Record<TenderStage, string> = {
  "قيد المعالجة": "bg-info-container text-on-info-container",
  "بانتظار المراجعة": "bg-warning-container text-on-warning-container",
  جاهزة: "bg-success-container text-on-success-container",
  "تم التصدير": "bg-primary-fixed text-on-primary-fixed-variant",
};

export function StageBadge({ stage }: { stage: TenderStage }) {
  return <Badge className={stageStyle[stage]}>{stage}</Badge>;
}
