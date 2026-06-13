import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** أيقونة في بداية الحقل */
  icon?: string;
  invalid?: boolean;
}

export function Input({ icon, invalid, className, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <Icon
          name={icon}
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[1.25rem] text-on-surface-variant"
        />
      )}
      <input
        className={cn(
          "h-11 w-full rounded-lg border bg-surface-container-low px-md text-body-md text-on-surface placeholder:text-on-surface-variant/85 transition-colors",
          "focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30",
          icon && "pe-10",
          invalid
            ? "border-error focus:border-error focus:ring-error/30"
            : "border-outline-variant",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-xs block text-label-md text-on-surface-variant"
    >
      {children}
    </label>
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-outline-variant bg-surface-container-low ps-md pe-9 text-label-md text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        name="expand_more"
        className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-[1.25rem] text-on-surface-variant"
      />
    </div>
  );
}
