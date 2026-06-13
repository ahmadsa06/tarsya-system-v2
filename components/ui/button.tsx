import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-e1 hover:bg-primary-container hover:text-on-primary active:scale-[0.98]",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:brightness-95 active:scale-[0.98]",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary/[0.06] active:scale-[0.98]",
  ghost:
    "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
  destructive:
    "bg-error text-on-error shadow-e1 hover:brightness-110 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-md text-label-sm gap-xs rounded-md",
  md: "h-11 px-lg text-label-md gap-sm rounded-lg",
  lg: "h-12 px-xl text-body-md font-medium gap-sm rounded-lg",
};

const base =
  "inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-150 disabled:pointer-events-none disabled:opacity-50";

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconFilled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconFilled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {icon && <Icon name={icon} filled={iconFilled} className="text-[1.25em]" />}
      {children}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconFilled?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** زر للتنقّل — يرندر <a> عبر next/link (لا <button> داخل <a>). */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconFilled,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(buttonClasses(variant, size), className)}>
      {icon && <Icon name={icon} filled={iconFilled} className="text-[1.25em]" />}
      {children}
    </Link>
  );
}
