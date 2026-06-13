import Link from "next/link";
import { cn, toArabicNumerals } from "@/lib/utils";
import { Icon } from "@/components/icon";

/* ------------------------------ شريط تقدّم عام ------------------------------ */
export function ProgressBar({
  value,
  max = 100,
  tone = "bg-primary",
  className,
}: {
  value: number;
  max?: number;
  tone?: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className={cn(
        "h-1.5 overflow-hidden rounded-full bg-surface-container-highest",
        className,
      )}
    >
      <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------------------------- شريط الثقة (§12.2) ---------------------------- */
export function ConfidenceBar({
  value,
  showLabel = true,
}: {
  value: number; // 0..1
  showLabel?: boolean;
}) {
  const pct = Math.round(value * 100);
  const tone =
    value >= 0.9
      ? "bg-success"
      : value >= 0.8
        ? "bg-primary"
        : value >= 0.7
          ? "bg-warning"
          : "bg-error";
  return (
    <div className="flex items-center gap-sm">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-container-highest">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && (
        <span className="nums text-caption font-semibold text-on-surface-variant">
          {pct}%
        </span>
      )}
    </div>
  );
}

/* --------------------------------- هيكل تحميل -------------------------------- */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-container-highest",
        className,
      )}
    />
  );
}

/* --------------------------------- حالة فارغة -------------------------------- */
export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-sm rounded-xl border border-dashed border-outline-variant bg-surface-container-low/50 px-lg py-2xl text-center">
      <span className="grid size-14 place-items-center rounded-full bg-surface-container-high text-on-surface-variant">
        <Icon name={icon} className="text-[1.75rem]" />
      </span>
      <p className="text-title-md text-on-surface">{title}</p>
      {description && (
        <p className="max-w-sm text-body-md text-on-surface-variant">{description}</p>
      )}
      {action && <div className="mt-sm">{action}</div>}
    </div>
  );
}

/* ------------------------------- مسار التنقّل ------------------------------- */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="مسار التنقّل"
      className="flex items-center gap-xs text-caption text-on-surface-variant"
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-xs">
          {i > 0 && <Icon name="chevron_left" className="text-[1rem] opacity-60" />}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-on-surface">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* --------------------------- مؤشر دائري للجاهزية --------------------------- */
export function ReadinessRing({
  value,
  size = 116,
}: {
  value: number; // 0..100
  size?: number;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-container-highest"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="absolute flex flex-col items-center">
        <span className="text-headline-md font-bold text-primary">
          {toArabicNumerals(value)}٪
        </span>
      </span>
    </div>
  );
}
