"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  /** أساس المعرّفات لربط التبويب بلوحته (aria-controls/aria-labelledby) */
  idBase?: string;
  className?: string;
}

export const tabId = (base: string, id: string) => `${base}-tab-${id}`;
export const panelId = (base: string, id: string) => `${base}-panel-${id}`;

export function Tabs({
  tabs,
  value,
  onChange,
  idBase = "tabs",
  className,
}: TabsProps) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    // التنقّل بالأسهم مع مراعاة RTL: السهم لليمين = السابق، لليسار = التالي
    let next = index;
    if (e.key === "ArrowLeft") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowRight") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-xs border-b border-outline-variant",
        className,
      )}
    >
      {tabs.map((tab, i) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={tabId(idBase, tab.id)}
            aria-selected={active}
            aria-controls={panelId(idBase, tab.id)}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative -mb-px border-b-2 px-md py-sm text-label-md transition-colors",
              active
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
