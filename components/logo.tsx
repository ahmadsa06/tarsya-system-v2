import { cn } from "@/lib/utils";

/** شعار "ترسية" — علامة هندسية + الاسم. */
export function Logo({
  className,
  showText = true,
  invert = false,
}: {
  className?: string;
  showText?: boolean;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-sm", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg",
          invert ? "bg-on-primary text-primary" : "bg-primary text-on-primary",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M5 7.5 12 4l7 3.5v9L12 20l-7-3.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m8.5 12 2.5 2.5 4.5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showText && (
        <span
          className={cn(
            "text-title-lg font-bold tracking-tight",
            invert ? "text-on-primary" : "text-primary",
          )}
        >
          ترسية
        </span>
      )}
    </span>
  );
}
