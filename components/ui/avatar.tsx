import { cn } from "@/lib/utils";

/**
 * أفاتار بالأحرف الأولى. مرّر الحجم واللون كأصناف كاملة عبر className
 * (لا تبنِ size-${n} ديناميكياً — Tailwind لا يكتشفه عند المسح).
 */
export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-bold",
        className,
      )}
    >
      {initials}
    </span>
  );
}
