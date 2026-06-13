import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

type Tone = "info" | "success" | "warning" | "error";

const tones: Record<Tone, { cls: string; icon: string }> = {
  info: {
    cls: "bg-info-container/60 text-on-info-container border-info/30",
    icon: "info",
  },
  success: {
    cls: "bg-success-container/60 text-on-success-container border-success/30",
    icon: "check_circle",
  },
  warning: {
    cls: "bg-warning-container/60 text-on-warning-container border-warning/30",
    icon: "warning",
  },
  error: {
    cls: "bg-error-container/60 text-on-error-container border-error/30",
    icon: "error",
  },
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-sm rounded-lg border p-md text-body-md",
        t.cls,
        className,
      )}
    >
      <Icon name={t.icon} filled className="mt-0.5 shrink-0 text-[1.25rem]" />
      <div className="space-y-0.5">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-label-md opacity-90">{children}</div>}
      </div>
    </div>
  );
}
