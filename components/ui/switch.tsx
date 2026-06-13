"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * مفتاح تبديل متاح: <button role="switch"> مع aria-checked وحالة focus.
 * المقبض مثبّت على البداية (start) ويتحرّك بـ translate (قابل للتحريك)
 * بدل التبديل بين start/end (خاصيّتان مختلفتان لا تتحرّكان بـ transition).
 */
export function Switch({
  defaultChecked = false,
  labelId,
  className,
}: {
  defaultChecked?: boolean;
  labelId?: string;
  className?: string;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelId}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-primary" : "bg-outline-variant",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 start-0.5 size-5 rounded-full bg-on-primary shadow-e1 transition-transform duration-200",
          on ? "translate-x-0" : "-translate-x-5",
        )}
      />
    </button>
  );
}
