import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { LinkButton } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StageBadge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { tenders } from "@/lib/data";
import { daysLeftTone } from "@/lib/utils";

export const metadata: Metadata = { title: "لوحة القيادة" };

const kpis = [
  {
    label: "الكرّاسات المتاحة",
    value: "٦",
    hint: "من أصل ٢٠ هذا الشهر",
    icon: "inventory_2",
    tone: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    label: "قيد المعالجة",
    value: "٢",
    hint: "تحليل آلي جارٍ",
    icon: "autorenew",
    tone: "bg-info-container text-on-info-container",
  },
  {
    label: "تحتاج مراجعة",
    value: "٢",
    hint: "بانتظار اعتماد داخلي",
    icon: "rate_review",
    tone: "bg-warning-container text-on-warning-container",
  },
  {
    label: "نواقص حرجة",
    value: "٣",
    hint: "متطلبات بلا رد",
    icon: "priority_high",
    tone: "bg-error-container text-on-error-container",
  },
];

export default function DashboardPage() {
  const closing = [...tenders]
    .filter((t) => t.stage !== "تم التصدير")
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="mx-auto max-w-6xl space-y-lg px-gutter py-lg">
      {/* رأس */}
      <div className="rise-in flex flex-col justify-between gap-md sm:flex-row-reverse sm:items-center">
        <LinkButton href="/tenders/new" icon="upload_file">
          رفع كرّاسة جديدة
        </LinkButton>
        <div>
          <h1 className="text-headline-md text-on-surface">أهلاً، أحمد 👋</h1>
          <p className="text-body-md text-on-surface-variant">
            إليك نظرة سريعة على حالة منافساتك اليوم.
          </p>
        </div>
      </div>

      {/* تنبيه موعد قريب */}
      <Alert tone="warning" title="موعد إغلاق قريب">
        منافسة «دراسات الأثر البيئي» تُغلق خلال يومين — ٤ متطلبات ما زالت بلا رد.
      </Alert>

      {/* مؤشرات */}
      <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardBody className="flex items-start justify-between gap-sm pt-lg">
              <div>
                <p className="text-label-md text-on-surface-variant">{k.label}</p>
                <p className="nums mt-xs text-display-md font-bold text-on-surface">
                  {k.value}
                </p>
                <p className="mt-0.5 text-caption text-on-surface-variant">{k.hint}</p>
              </div>
              <span className={`grid size-11 place-items-center rounded-lg ${k.tone}`}>
                <Icon name={k.icon} className="text-[1.4rem]" />
              </span>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid gap-md lg:grid-cols-[1.4fr_1fr]">
        {/* مواعيد الإغلاق */}
        <Card>
          <CardHeader>
            <CardTitle as="h2">مواعيد الإغلاق القريبة</CardTitle>
            <Link
              href="/tenders"
              className="text-label-md text-primary hover:underline"
            >
              عرض الكل
            </Link>
          </CardHeader>
          <CardBody className="space-y-sm">
            {closing.map((t) => (
              <Link
                key={t.id}
                href={`/tenders/${t.id}/matrix`}
                className="flex items-center gap-md rounded-lg border border-outline-variant bg-surface-container-low p-md transition-colors hover:border-primary/40"
              >
                <span
                  className={`grid w-14 shrink-0 flex-col place-items-center rounded-lg bg-surface-container-highest py-sm ${daysLeftTone(t.daysLeft)}`}
                >
                  <span className="nums text-title-lg font-bold leading-none">
                    {t.daysLeft}
                  </span>
                  <span className="text-caption">يوم</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-label-md font-semibold text-on-surface">
                    {t.title}
                  </p>
                  <p className="truncate text-caption text-on-surface-variant">
                    {t.entity} · رقم {t.reference}
                  </p>
                </div>
                <StageBadge stage={t.stage} />
              </Link>
            ))}
          </CardBody>
        </Card>

        {/* النشاط الأخير */}
        <Card>
          <CardHeader>
            <CardTitle as="h2">آخر النشاط</CardTitle>
          </CardHeader>
          <CardBody className="space-y-md">
            {[
              { icon: "check_circle", c: "text-success", t: "اعتماد «الضمان الابتدائي»", w: "أحمد · قبل ٣ ساعات" },
              { icon: "auto_awesome", c: "text-primary", t: "اكتمل تحليل منافسة ٤٤٠١٩٨", w: "النظام · قبل ٥ ساعات" },
              { icon: "upload_file", c: "text-info", t: "رفع مرفق: شهادة السعودة", w: "سارة · أمس" },
              { icon: "rate_review", c: "text-warning", t: "طلب مراجعة «خطة الصيانة»", w: "فيصل · أمس" },
            ].map((a) => (
              <div key={a.t} className="flex items-start gap-sm">
                <span className={`mt-0.5 ${a.c}`}>
                  <Icon name={a.icon} filled className="text-[1.25rem]" />
                </span>
                <div>
                  <p className="text-label-md text-on-surface">{a.t}</p>
                  <p className="text-caption text-on-surface-variant">{a.w}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
