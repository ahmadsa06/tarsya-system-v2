"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  CategoryBadge,
  PriorityTag,
  StageBadge,
  StatusBadge,
} from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Tabs } from "@/components/ui/tabs";
import {
  Breadcrumbs,
  ConfidenceBar,
  EmptyState,
  ReadinessRing,
  Skeleton,
} from "@/components/ui/misc";
import type {
  Priority,
  RequirementCategory,
  RequirementStatus,
  TenderStage,
} from "@/lib/types";

const palette: { group: string; tokens: { name: string; cls: string; on?: string }[] }[] = [
  {
    group: "أساسي",
    tokens: [
      { name: "primary", cls: "bg-primary", on: "text-on-primary" },
      {
        name: "primary-container",
        cls: "bg-primary-container",
        on: "text-on-primary-container",
      },
      {
        name: "primary-fixed",
        cls: "bg-primary-fixed",
        on: "text-on-primary-fixed",
      },
      {
        name: "surface-tint",
        cls: "bg-surface-tint",
        on: "text-on-primary",
      },
    ],
  },
  {
    group: "ثانوي ومحايد",
    tokens: [
      {
        name: "secondary-container",
        cls: "bg-secondary-container",
        on: "text-on-secondary-container",
      },
      {
        name: "tertiary-container",
        cls: "bg-tertiary-container",
        on: "text-on-tertiary-container",
      },
      {
        name: "surface-variant",
        cls: "bg-surface-variant",
        on: "text-on-surface-variant",
      },
      { name: "outline", cls: "bg-outline", on: "text-on-primary" },
    ],
  },
  {
    group: "الحالات",
    tokens: [
      { name: "success", cls: "bg-success", on: "text-on-success" },
      { name: "warning", cls: "bg-warning", on: "text-on-warning" },
      { name: "error", cls: "bg-error", on: "text-on-error" },
      { name: "info", cls: "bg-info", on: "text-on-info" },
    ],
  },
  {
    group: "الأسطح",
    tokens: [
      {
        name: "background",
        cls: "bg-background border border-outline-variant",
        on: "text-on-background",
      },
      {
        name: "surface-container-low",
        cls: "bg-surface-container-low border border-outline-variant",
        on: "text-on-surface",
      },
      {
        name: "surface-container-high",
        cls: "bg-surface-container-high",
        on: "text-on-surface",
      },
      {
        name: "inverse-surface",
        cls: "bg-inverse-surface",
        on: "text-inverse-on-surface",
      },
    ],
  },
];

const typeScale: { cls: string; label: string; sample: string }[] = [
  { cls: "text-display-lg", label: "Display LG · 48", sample: "تجهيز عروض اعتماد" },
  { cls: "text-headline-lg", label: "Headline LG · 32", sample: "مصفوفة التجهيز الذكية" },
  { cls: "text-headline-md", label: "Headline MD · 24", sample: "تحليل كرّاسة الشروط" },
  { cls: "text-title-lg", label: "Title LG · 20", sample: "المتطلبات الفنية والمالية" },
  { cls: "text-body-lg", label: "Body LG · 18", sample: "نصّ توضيحي بحجم أكبر لإبراز الفقرات الافتتاحية." },
  {
    cls: "text-body-md",
    label: "Body MD · 16",
    sample: "نصّ المتن الأساسي المستخدم في معظم الواجهات والجداول والنماذج.",
  },
  { cls: "text-label-md", label: "Label MD · 14", sample: "تسمية حقل أو زر" },
  { cls: "text-caption", label: "Caption · 12", sample: "ملاحظة مصدر · صفحة ٤٥" },
];

const statuses: RequirementStatus[] = [
  "جديد",
  "قيد التجهيز",
  "جاهز",
  "يحتاج مراجعة",
  "ناقص",
];
const categories: RequirementCategory[] = ["فني", "مالي", "إداري", "مرفق", "موعد"];
const priorities: Priority[] = ["عالية", "متوسطة", "منخفضة"];
const stages: TenderStage[] = [
  "قيد المعالجة",
  "بانتظار المراجعة",
  "جاهزة",
  "تم التصدير",
];

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-md">
      <div>
        <h2 className="text-headline-md text-on-surface">{title}</h2>
        {desc && <p className="mt-xs text-body-md text-on-surface-variant">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [tab, setTab] = useState("requirements");

  return (
    <div className="mx-auto max-w-5xl px-gutter py-2xl">
      {/* رأس الصفحة */}
      <header className="rise-in mb-2xl space-y-md border-b border-outline-variant pb-xl">
        <Breadcrumbs
          items={[{ label: "ترسية", href: "/" }, { label: "نظام التصميم" }]}
        />
        <div className="flex items-center gap-md">
          <span className="grid size-12 place-items-center rounded-xl bg-primary text-on-primary">
            <Icon name="grid_view" filled className="text-[1.5rem]" />
          </span>
          <div>
            <h1 className="text-display-md text-primary">نظام تصميم ترسية</h1>
            <p className="text-body-lg text-on-surface-variant">
              Material 3 · سمة خضراء مؤسسية · عربي RTL أصيل
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-2xl">
        {/* الألوان */}
        <Section
          title="الألوان (Design Tokens)"
          desc="معرّفة كمتغيرات CSS، لون أساسي أخضر مؤسسي عميق + محايد متدرّج + ألوان حالة هادئة."
        >
          <div className="space-y-lg">
            {palette.map((g) => (
              <div key={g.group}>
                <p className="mb-sm text-label-md text-on-surface-variant">{g.group}</p>
                <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
                  {g.tokens.map((t) => (
                    <div
                      key={t.name}
                      className={`flex h-20 flex-col justify-end rounded-lg p-sm ${t.cls} ${t.on ?? ""}`}
                    >
                      <span className="text-caption font-medium">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* الطباعة */}
        <Section
          title="مقياس الطباعة"
          desc="خط IBM Plex Sans Arabic بتدرّج أوزان مدروس وارتفاع أسطر مناسب للعربية."
        >
          <Card>
            <CardBody className="divide-y divide-outline-variant pt-0">
              {typeScale.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col gap-xs py-md sm:flex-row-reverse sm:items-baseline sm:justify-between"
                >
                  <span className={`${t.cls} text-on-surface`}>{t.sample}</span>
                  <span className="shrink-0 text-caption text-on-surface-variant">
                    {t.label}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>
        </Section>

        {/* الأزرار */}
        <Section title="الأزرار">
          <Card>
            <CardBody className="flex flex-wrap items-center gap-sm pt-lg">
              <Button icon="send">تقديم العرض</Button>
              <Button variant="outline" icon="save">
                حفظ كمسودة
              </Button>
              <Button variant="secondary" icon="auto_awesome">
                تحليل ذكي
              </Button>
              <Button variant="ghost" icon="more_horiz">
                المزيد
              </Button>
              <Button variant="destructive" icon="delete">
                حذف
              </Button>
              <Button disabled icon="lock">
                معطّل
              </Button>
            </CardBody>
          </Card>
        </Section>

        {/* الشارات */}
        <Section
          title="الشارات الدلالية"
          desc="مطابقة لقيم PRD §13: خمس حالات، خمس فئات، ثلاث أولويات — ومراحل معالجة الكراسة."
        >
          <div className="grid gap-md sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>حالة المتطلب</CardTitle>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-sm">
                {statuses.map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>تصنيف المتطلب</CardTitle>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-sm">
                {categories.map((c) => (
                  <CategoryBadge key={c} category={c} />
                ))}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>الأولوية</CardTitle>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-lg">
                {priorities.map((p) => (
                  <PriorityTag key={p} priority={p} />
                ))}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>مرحلة الكراسة</CardTitle>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-sm">
                {stages.map((s) => (
                  <StageBadge key={s} stage={s} />
                ))}
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* النماذج */}
        <Section title="حقول الإدخال">
          <Card>
            <CardBody className="grid gap-md pt-lg sm:grid-cols-2">
              <div>
                <Label htmlFor="d1">البحث في المتطلبات</Label>
                <Input id="d1" icon="search" placeholder="اكتب للبحث…" />
              </div>
              <div>
                <Label htmlFor="d2">الفئة</Label>
                <Select id="d2">
                  <option>كل الفئات</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="d3">رقم المنافسة</Label>
                <Input id="d3" placeholder="٤٤٢٠٣١" />
              </div>
              <div>
                <Label htmlFor="d4">حقل غير صالح</Label>
                <Input id="d4" invalid defaultValue="قيمة خاطئة" />
              </div>
            </CardBody>
          </Card>
        </Section>

        {/* التنبيهات */}
        <Section title="التنبيهات">
          <div className="space-y-sm">
            <Alert tone="success" title="تم تحليل الكرّاسة بنجاح">
              استُخرجت المتطلبات وبُنيت مصفوفة التجهيز.
            </Alert>
            <Alert tone="warning" title="بنود تحتاج مراجعة بشرية">
              ٣ متطلبات بثقة منخفضة يُنصح بمراجعتها قبل الاعتماد.
            </Alert>
            <Alert tone="error" title="مرفقات ناقصة">
              متطلبان إلزاميان بلا مرفق — لا يمكن إتمام الجاهزية بدونهما.
            </Alert>
            <Alert tone="info" title="مسودة احترافية">
              هذه المخرجات تساعد في التجهيز، ويوصى بمراجعتها بشرياً قبل التقديم.
            </Alert>
          </div>
        </Section>

        {/* مؤشرات الثقة والجاهزية */}
        <Section
          title="مؤشرات الثقة والجاهزية"
          desc="عرض درجة ثقة الاستخراج (§12.2) ونسبة جاهزية العرض (§17)."
        >
          <Card>
            <CardBody className="flex flex-wrap items-center gap-2xl pt-lg">
              <ReadinessRing value={75} />
              <div className="space-y-md">
                <div className="flex items-center gap-md">
                  <span className="w-28 text-label-md text-on-surface-variant">
                    ثقة عالية
                  </span>
                  <ConfidenceBar value={0.98} />
                </div>
                <div className="flex items-center gap-md">
                  <span className="w-28 text-label-md text-on-surface-variant">
                    ثقة متوسطة
                  </span>
                  <ConfidenceBar value={0.84} />
                </div>
                <div className="flex items-center gap-md">
                  <span className="w-28 text-label-md text-on-surface-variant">
                    تحتاج مراجعة
                  </span>
                  <ConfidenceBar value={0.72} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Section>

        {/* التبويبات */}
        <Section title="التبويبات">
          <Card>
            <CardBody className="pt-lg">
              <Tabs
                value={tab}
                onChange={setTab}
                tabs={[
                  { id: "requirements", label: "المتطلبات" },
                  { id: "technical", label: "العرض الفني" },
                  { id: "financial", label: "العرض المالي" },
                ]}
              />
              <p className="pt-md text-body-md text-on-surface-variant">
                التبويب المحدّد: <span className="font-semibold text-primary">{tab}</span>
              </p>
            </CardBody>
          </Card>
        </Section>

        {/* الحالة الفارغة والهياكل */}
        <Section title="الحالات الفارغة وهياكل التحميل">
          <div className="grid gap-md md:grid-cols-2">
            <EmptyState
              icon="folder_open"
              title="لا توجد منافسات بعد"
              description="ابدأ برفع كرّاسة الشروط الأولى ليحلّلها النظام تلقائياً."
              action={<Button icon="upload">رفع كرّاسة</Button>}
            />
            <Card>
              <CardBody className="space-y-sm pt-lg">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-24 w-full" />
              </CardBody>
            </Card>
          </div>
        </Section>

        <footer className="border-t border-outline-variant pt-lg text-center text-caption text-on-surface-variant">
          نظام تصميم ترسية — عرض داخلي. المكوّنات مبنية بـ Next.js + Tailwind، عربي RTL.
        </footer>
      </div>
    </div>
  );
}
