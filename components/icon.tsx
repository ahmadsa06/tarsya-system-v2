import { cn } from "@/lib/utils";

type IconSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<IconSize, string> = {
  sm: "text-[1.1rem]",
  md: "text-[1.25rem]",
  lg: "text-[1.4rem]",
  xl: "text-[1.75rem]",
};

interface IconProps {
  name: string;
  filled?: boolean;
  /** حجم معتمد من المقياس؛ يُتجاهَل إن مُرِّر حجم في className */
  size?: IconSize;
  className?: string;
  "aria-hidden"?: boolean;
}

/** غلاف أيقونات Material Symbols Outlined. */
export function Icon({ name, filled, size, className, ...rest }: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined",
        filled && "filled",
        size && sizeMap[size],
        className,
      )}
      aria-hidden={rest["aria-hidden"] ?? true}
    >
      {name}
    </span>
  );
}
