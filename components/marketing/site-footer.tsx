import Link from "next/link";
import { Logo } from "@/components/logo";

const cols = [
  {
    title: "المنتج",
    links: [
      { label: "المميزات", href: "#features" },
      { label: "الباقات", href: "#pricing" },
      { label: "الأمان والامتثال", href: "#security" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "#" },
      { label: "تواصل معنا", href: "#" },
      { label: "الوظائف", href: "#" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "شروط الاستخدام", href: "#" },
      { label: "اتفاقية معالجة البيانات", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-gutter py-2xl">
        <div className="grid gap-xl md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-md">
            <Logo />
            <p className="max-w-xs text-label-md text-on-surface-variant">
              منصة تجهيز العروض الفنية والمالية لمنافسات منصة اعتماد — بكفاءة وامتثال،
              مع عزل صارم للبيانات.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-md text-label-md font-semibold text-on-surface">
                {c.title}
              </h4>
              <ul className="space-y-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-xl flex flex-col items-center justify-between gap-sm border-t border-outline-variant pt-lg text-caption text-on-surface-variant sm:flex-row-reverse">
          <p>منتج مستقل، غير تابع لمنصة اعتماد الحكومية.</p>
          <p>© ١٤٤٧هـ ترسية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
