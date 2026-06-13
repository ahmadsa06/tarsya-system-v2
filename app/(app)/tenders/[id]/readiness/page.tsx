import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Breadcrumbs, ReadinessRing } from "@/components/ui/misc";
import { tenders } from "@/lib/data";
import { toArabicNumerals } from "@/lib/utils";

export function generateStaticParams() {
  return tenders.map((t) => ({ id: t.id }));
}
export const dynamicParams = false;

export const metadata: Metadata = { title: "فحص الجاهزية" };

type CheckTone = "error" | "warning" | "success";

const checks: {
  icon: string;
  title: string;
  tone: CheckTone;
  items: string[];
}[] = [
  {
    icon: "assignment_late",
    title: "متطلبات بلا رد",
    tone: "error",
    items: ["خطة الصيانة الوقائية السنوية", "تعبئة جدول الكميات (BOQ)"],
  },
  {
    icon: "attachment",
    title: "مرفقات ناقصة",
    tone: "error",
    items: ["شهادة تصنيف المقاولين (الدرجة الرابعة)"],
  },
  {
    icon: "request_quote",
    title: "جداول مالية غير مكتملة",
    tone: "warning",
    items: ["٣ بنود في جدول الكميات بحاجة لتصنيف وحدة القياس"],
  },
  {
    icon: "rule",
    title: "أقسام فنية ضعيفة أو عامة",
    tone: "warning",
    items: ["قسم «المنهجية» عام ويحتاج تخصيصاً لنطاق العمل"],
  },
  {
    icon: "compare_arrows",
    title: "تناقضات محتملة",
    tone: "warning",
    items: ["تعارض في مدة الضمان بين الصفحة ١٢ والصفحة ٤٥"],
  },
  {
    icon: "verified_user",
    title: "تنبيهات تحتاج مراجعة بشرية",
    tone: "warning",
    items: ["متطلب «موعد فتح المظاريف» بثقة استخراج منخفضة"],
  },
];

const toneMap: Record<CheckTone, { ring: string; chip: string; icon: string }> = {
  error: {
    ring: "border-error/30 bg-error-container/30",
    chip: "bg-error-container text-on-error-container",
    icon: "text-error",
  },
  warning: {
    ring: "border-warning/30 bg-warning-container/30",
    chip: "bg-warning-container text-on-warning-container",
    icon: "text-warning",
  },
  success: {
    ring: "border-success/30 bg-success-container/30",
    chip: "bg-success-container text-on-success-container",
    icon: "text-success",
  },
};

export default async function ReadinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tender = tenders.find((t) => t.id === id) ?? tenders[0];

  // عدّادات مشتقّة من قوائم الفحص لتبقى متّسقة مع المعروض
  const critical = checks
    .filter((c) => c.tone === "error")
    .reduce((n, c) => n + c.items.length, 0);
  const needsReview = checks
    .filter((c) => c.tone === "warning")
    .reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-lg px-gutter py-lg">
      <div className="rise-in space-y-xs">
        <Breadcrumbs
          items={[
            { label: "المنافسات", href: "/tenders" },
            { label: `رقم ${tender.reference}`, href: `/tenders/${tender.id}/matrix` },
            { label: "فحص الجاهزية" },
          ]}
        />
        <h1 className="text-headline-md text-on-surface">فحص جاهزية العرض</h1>
      </div>

      {/* ملخص الجاهزية */}
      <Card>
        <CardBody className="flex flex-col items-center gap-lg pt-lg sm:flex-row-reverse sm:justify-between">
          <ReadinessRing value={tender.readiness} size={132} />
          <div className="flex-1 space-y-sm text-center sm:text-right">
            <h2 className="text-headline-md text-on-surface">
              عرضك جاهز بنسبة {toArabicNumerals(tender.readiness)}٪
            </h2>
            <p className="text-body-md text-on-surface-variant">
              تبقّى عدد من البنود الحرجة قبل أن يكون العرض مكتملاً للتقديم. عالج النواقص
              أدناه ثم أعد الفحص.
            </p>
            <div className="flex flex-wrap justify-center gap-sm sm:justify-start">
              <Badge className="bg-error-container text-on-error-container">
                {toArabicNumerals(critical)} بنود حرجة
              </Badge>
              <Badge className="bg-warning-container text-on-warning-container">
                {toArabicNumerals(needsReview)} تحتاج مراجعة
              </Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* قائمة الفحص */}
      <div className="grid gap-md sm:grid-cols-2">
        {checks.map((c) => {
          const t = toneMap[c.tone];
          return (
            <div
              key={c.title}
              className={`rounded-xl border p-lg ${t.ring}`}
            >
              <div className="flex items-center gap-sm">
                <Icon name={c.icon} filled className={`text-[1.4rem] ${t.icon}`} />
                <h3 className="flex-1 text-title-md text-on-surface">{c.title}</h3>
                <Badge size="sm" className={`font-bold ${t.chip}`}>
                  {toArabicNumerals(c.items.length)}
                </Badge>
              </div>
              <ul className="mt-md space-y-sm">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-sm text-label-md text-on-surface">
                    <Icon
                      name="chevron_left"
                      className="mt-0.5 text-[1.1rem] text-on-surface-variant"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* تنويه */}
      <Alert tone="info" title="تنويه مهم">
        هذه المخرجات مسودة احترافية تساعد في التجهيز، ويوصى بمراجعتها بشرياً قبل التقديم.
      </Alert>

      {/* التصدير */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">تصدير الحزمة</CardTitle>
          <Link
            href={`/tenders/${tender.id}/matrix`}
            className="text-label-md text-primary hover:underline"
          >
            العودة للمصفوفة
          </Link>
        </CardHeader>
        <CardBody className="space-y-md">
          <div className="grid gap-sm sm:grid-cols-3">
            {[
              { icon: "description", t: "العرض الفني", f: "DOCX / PDF", tone: "text-info" },
              { icon: "table_chart", t: "العرض المالي", f: "Excel (بلا أسعار)", tone: "text-success" },
              { icon: "folder_zip", t: "الحزمة الكاملة", f: "ZIP", tone: "text-warning" },
            ].map((x) => (
              <button
                key={x.t}
                className="flex items-center gap-sm rounded-lg border border-outline-variant bg-surface-container-low p-md text-right transition-colors hover:border-primary/40"
              >
                <Icon name={x.icon} className={`text-[1.6rem] ${x.tone}`} />
                <div>
                  <p className="text-label-md font-medium text-on-surface">{x.t}</p>
                  <p className="text-caption text-on-surface-variant">{x.f}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-sm rounded-lg bg-surface-container-low p-md sm:flex-row-reverse">
            <Button size="lg" icon="inventory_2">
              تصدير الحزمة الكاملة
            </Button>
            <p className="text-caption text-on-surface-variant">
              سيُوسم التصدير كـ «مسودة» طالما توجد بنود حرجة غير معالَجة.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
