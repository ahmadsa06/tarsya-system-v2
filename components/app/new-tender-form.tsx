"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/ui/misc";

const mockFiles = [
  { name: "كرّاسة الشروط الرئيسية.pdf", size: "٤٫٢ م.ب", icon: "picture_as_pdf", tone: "text-error" },
  { name: "المواصفات الفنية.pdf", size: "١٫٨ م.ب", icon: "picture_as_pdf", tone: "text-error" },
  { name: "جدول الكميات.xlsx", size: "٣١٢ ك.ب", icon: "table_chart", tone: "text-success" },
];

const langs = [
  { id: "ar", label: "عربي" },
  { id: "en", label: "إنجليزي" },
  { id: "both", label: "ثنائي اللغة" },
];

export function NewTenderForm() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [lang, setLang] = useState("ar");
  const [files, setFiles] = useState(mockFiles);

  return (
    <div className="mx-auto max-w-5xl space-y-lg px-gutter py-lg">
      <div className="rise-in space-y-xs">
        <Breadcrumbs
          items={[{ label: "المنافسات", href: "/tenders" }, { label: "كرّاسة جديدة" }]}
        />
        <h1 className="text-headline-md text-on-surface">رفع كرّاسة جديدة</h1>
        <p className="text-body-md text-on-surface-variant">
          أدخل بيانات المنافسة وارفع الكرّاسة ومرفقاتها ليبدأ التحليل الآلي.
        </p>
      </div>

      <div className="grid gap-md lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-md">
          {/* بيانات المنافسة */}
          <Card>
            <CardHeader>
              <CardTitle as="h2">بيانات المنافسة</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-md sm:grid-cols-2">
              <div>
                <Label htmlFor="ref">رقم المنافسة</Label>
                <Input id="ref" placeholder="٤٤٢٠٣١" />
              </div>
              <div>
                <Label htmlFor="entity">الجهة الحكومية</Label>
                <Input id="entity" placeholder="مثال: أمانة منطقة الرياض" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="name">اسم المنافسة</Label>
                <Input id="name" placeholder="عنوان المنافسة كما في الكرّاسة" />
              </div>
              <div>
                <Label htmlFor="sector">القطاع</Label>
                <Select id="sector" defaultValue="">
                  <option value="" disabled>
                    اختر القطاع
                  </option>
                  <option>مقاولات</option>
                  <option>تقنية المعلومات</option>
                  <option>تشغيل وصيانة</option>
                  <option>توريد</option>
                  <option>استشارات</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="closing">تاريخ الإغلاق</Label>
                <Input id="closing" type="date" />
              </div>
            </CardBody>
          </Card>

          {/* رفع الملفات */}
          <Card>
            <CardHeader>
              <CardTitle as="h2">الكرّاسة والمرفقات</CardTitle>
            </CardHeader>
            <CardBody className="space-y-md">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                }}
                className={`flex flex-col items-center justify-center gap-sm rounded-xl border-2 border-dashed px-lg py-xl text-center transition-colors ${
                  dragging
                    ? "border-primary bg-primary/5"
                    : "border-outline-variant bg-surface-container-low"
                }`}
              >
                <span className="grid size-14 place-items-center rounded-full bg-primary-fixed text-on-primary-fixed">
                  <Icon name="cloud_upload" className="text-[1.75rem]" />
                </span>
                <p className="text-title-md text-on-surface">
                  اسحب الملفات هنا أو اختر من جهازك
                </p>
                <p className="text-caption text-on-surface-variant">
                  PDF · Word · Excel · PowerPoint · صور · ZIP — حتى ٥٠ م.ب لكل ملف
                </p>
                <Button variant="outline" size="sm" icon="attach_file" className="mt-sm">
                  اختيار ملفات
                </Button>
              </div>

              {/* الملفات المرفوعة */}
              <ul className="space-y-sm">
                {files.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-sm"
                  >
                    <Icon name={f.icon} className={`text-[1.5rem] ${f.tone}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-label-md text-on-surface">{f.name}</p>
                      <p className="nums text-caption text-on-surface-variant">{f.size}</p>
                    </div>
                    <span className="inline-flex items-center gap-xs text-caption text-success">
                      <Icon name="check_circle" filled className="text-[1rem]" />
                      تم الفحص
                    </span>
                    <button
                      onClick={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
                      className="grid size-8 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error"
                      aria-label={`إزالة ${f.name}`}
                    >
                      <Icon name="close" className="text-[1.2rem]" />
                    </button>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          {/* خيارات الإخراج */}
          <Card>
            <CardHeader>
              <CardTitle as="h2">خيارات الإخراج</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-md sm:grid-cols-2">
              <div>
                <Label htmlFor="tpl">قالب هوية الشركة</Label>
                <Select id="tpl" defaultValue="">
                  <option>الهوية الافتراضية</option>
                  <option>هوية العروض الحكومية</option>
                </Select>
              </div>
              <div>
                <span className="mb-xs block text-label-md text-on-surface-variant">
                  لغة الإخراج
                </span>
                <div className="flex gap-xs">
                  {langs.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLang(l.id)}
                      aria-pressed={lang === l.id}
                      className={`flex-1 rounded-lg border px-md py-2.5 text-label-md transition-colors ${
                        lang === l.id
                          ? "border-primary bg-primary-container/50 font-semibold text-primary"
                          : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* جانب: ماذا سيحدث */}
        <div className="space-y-md">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle as="h2">ماذا سيحدث بعد الرفع؟</CardTitle>
            </CardHeader>
            <CardBody className="space-y-md">
              <ol className="space-y-md">
                {[
                  { icon: "security", t: "فحص أمني للملفات", d: "تحقّق من النوع والسلامة." },
                  { icon: "document_scanner", t: "استخراج النص و OCR", d: "للصفحات النصية والمصوّرة." },
                  { icon: "checklist", t: "استخراج المتطلبات", d: "وبناء مصفوفة التجهيز." },
                  { icon: "rule", t: "كشف النواقص", d: "وتنبيهات أولية قبل التجهيز." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-sm">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-container-high text-on-surface-variant">
                      <Icon name={s.icon} className="text-[1.2rem]" />
                    </span>
                    <div>
                      <p className="text-label-md font-medium text-on-surface">
                        <span className="nums text-on-surface-variant">{i + 1}. </span>
                        {s.t}
                      </p>
                      <p className="text-caption text-on-surface-variant">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="rounded-lg bg-surface-container-low p-sm text-caption text-on-surface-variant">
                تُحتسب الكرّاسة عند أول إتاحة ناجحة لمصفوفة التجهيز. الفشل الفني لا يُحتسب.
              </div>
              <Button
                size="lg"
                className="w-full"
                icon="auto_awesome"
                onClick={() => router.push("/tenders/t-440198/matrix")}
              >
                ابدأ التحليل
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
