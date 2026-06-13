"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const nav = [
  { label: "المميزات", href: "#features" },
  { label: "كيف يعمل", href: "#how" },
  { label: "الأمان", href: "#security" },
  { label: "الباقات", href: "#pricing" },
  { label: "الأسئلة الشائعة", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
        <Link href="/" aria-label="ترسية — الرئيسية">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-xs md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-md py-sm text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-sm md:flex">
          <LinkButton href="/login" variant="ghost" size="sm">
            تسجيل الدخول
          </LinkButton>
          <LinkButton href="/dashboard" size="sm" icon="arrow_back">
            ابدأ الآن
          </LinkButton>
        </div>

        <button
          className="grid size-10 place-items-center rounded-lg text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
          aria-expanded={open}
          aria-controls="site-mobile-menu"
        >
          <Icon name={open ? "close" : "menu"} className="text-[1.5rem]" />
        </button>
      </div>

      {/* قائمة الجوال */}
      <div
        id="site-mobile-menu"
        inert={!open}
        className={cn(
          "overflow-hidden border-t border-outline-variant bg-surface-container-low transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-xs p-md">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-md py-sm text-body-md text-on-surface hover:bg-surface-container-high"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-sm flex gap-sm">
            <LinkButton href="/login" variant="outline" className="flex-1">
              دخول
            </LinkButton>
            <LinkButton href="/dashboard" className="flex-1">
              ابدأ الآن
            </LinkButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
