"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icon";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useDialog } from "@/lib/use-dialog";

const nav = [
  { label: "لوحة القيادة", href: "/dashboard", icon: "dashboard" },
  { label: "المنافسات", href: "/tenders", icon: "folder_open" },
  { label: "مصفوفة التجهيز", href: "/tenders/t-442031/matrix", icon: "grid_view" },
  { label: "مساحة العمل", href: "/tenders/t-442031/workspace", icon: "edit_note" },
  { label: "فحص الجاهزية", href: "/tenders/t-442031/readiness", icon: "fact_check" },
  { label: "الإعدادات", href: "/settings", icon: "settings" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-outline-variant px-lg">
        <Link href="/" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-xs overflow-y-auto p-md">
        <p className="px-md pb-xs pt-sm text-caption text-on-surface-variant">
          بوابة الشركة
        </p>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-md rounded-lg px-md py-sm text-label-md transition-colors",
                active
                  ? "bg-primary-container font-semibold text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
              )}
            >
              <Icon name={item.icon} filled={active} size="lg" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-outline-variant p-md">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="mb-sm flex items-center gap-md rounded-lg px-md py-sm text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <Icon name="admin_panel_settings" size="lg" />
          بوابة المالك
          <Icon name="open_in_new" className="ms-auto text-[1.1rem] opacity-60" />
        </Link>
        <div className="flex items-center gap-sm rounded-lg bg-surface-container-low p-sm">
          <Avatar
            initials="شع"
            className="size-9 bg-secondary-container text-label-sm text-on-secondary-container"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-label-md font-medium text-on-surface">
              شركة العمران للمقاولات
            </p>
            <p className="truncate text-caption text-on-surface-variant">
              باقة Growth · ١٤/٢٠ كرّاسة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-md border-b border-outline-variant bg-background/85 px-gutter backdrop-blur-md">
      <button
        onClick={onMenu}
        className="grid size-10 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high lg:hidden"
        aria-label="فتح القائمة"
      >
        <Icon name="menu" size="lg" />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Icon
          name="search"
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[1.25rem] text-on-surface-variant"
        />
        <input
          aria-label="بحث"
          placeholder="ابحث عن منافسة أو متطلب…"
          className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-low pe-10 ps-md text-label-md focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="ms-auto flex items-center gap-xs">
        <button
          className="relative grid size-10 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high"
          aria-label="الإشعارات (توجد إشعارات غير مقروءة)"
        >
          <Icon name="notifications" size="lg" />
          <span
            className="absolute end-2 top-2 size-2 rounded-full bg-error ring-2 ring-background"
            aria-hidden
          />
        </button>
        <button
          className="grid size-10 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high"
          aria-label="المساعدة"
        >
          <Icon name="help" size="lg" />
        </button>
        <Avatar
          initials="أم"
          className="ms-xs size-9 bg-primary text-label-sm text-on-primary"
        />
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useDialog(open, () => setOpen(false));

  return (
    <div className="flex min-h-dvh bg-background">
      {/* قائمة جانبية ثابتة — سطح المكتب */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-s border-outline-variant bg-surface-container-low lg:block">
        <SidebarContent />
      </aside>

      {/* درج الجوال */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقّل"
          tabIndex={-1}
          inert={!open}
          className={cn(
            // الإخفاء فيزيائي مقصود (right-0 + translate-x-full): translate-x لا يتأثر بـ dir
            "absolute inset-y-0 right-0 w-72 bg-surface-container-low shadow-e3 transition-transform duration-300 focus:outline-none",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <SidebarContent onNavigate={() => setOpen(false)} />
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
