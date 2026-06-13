"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { Button, LinkButton } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  Badge,
  CategoryBadge,
  PriorityTag,
  StatusBadge,
} from "@/components/ui/badge";
import { Breadcrumbs, ConfidenceBar, ReadinessRing } from "@/components/ui/misc";
import { cn, normalizeArabic } from "@/lib/utils";
import { useDialog } from "@/lib/use-dialog";
import type { Requirement, Tender } from "@/lib/types";

const statusOptions = ["جديد", "قيد التجهيز", "جاهز", "يحتاج مراجعة", "ناقص"];
const categoryOptions = ["فني", "مالي", "إداري", "مرفق", "موعد"];

export function MatrixView({
  tender,
  requirements,
}: {
  tender: Tender;
  requirements: Requirement[];
}) {
  const [selected, setSelected] = useState<Requirement | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = normalizeArabic(query);
    return requirements.filter(
      (r) =>
        (!q ||
          normalizeArabic(r.title).includes(q) ||
          normalizeArabic(r.detail).includes(q)) &&
        (!status || r.status === status) &&
        (!category || r.category === category),
    );
  }, [requirements, query, status, category]);

  // العدّادات مشتقّة من الصفوف الفعلية لتطابق ما يراه المستخدم
  const ready = requirements.filter((r) => r.status === "جاهز").length;
  const gaps = requirements.filter((r) => r.status === "ناقص").length;

  return (
    <div className="mx-auto max-w-6xl space-y-lg px-gutter py-lg">
      {/* رأس */}
      <div className="rise-in flex flex-col justify-between gap-md md:flex-row-reverse md:items-start">
        <div className="flex flex-wrap gap-sm">
          <LinkButton href={`/tenders/${tender.id}/readiness`} icon="fact_check">
            فحص الجاهزية
          </LinkButton>
          <LinkButton
            href={`/tenders/${tender.id}/workspace`}
            variant="outline"
            icon="edit_note"
          >
            تجهيز العرض
          </LinkButton>
        </div>
        <div className="space-y-xs">
          <Breadcrumbs
            items={[
              { label: "المنافسات", href: "/tenders" },
              { label: `رقم ${tender.reference}` },
              { label: "مصفوفة التجهيز" },
            ]}
          />
          <h1 className="text-headline-md text-on-surface">{tender.title}</h1>
          <p className="text-label-md text-on-surface-variant">
            {tender.entity} · الإغلاق {tender.closingDate}
          </p>
        </div>
      </div>

      {/* تصفية + ملخص */}
      <div className="grid gap-md lg:grid-cols-[1fr_auto]">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
          <div className="flex flex-col gap-sm sm:flex-row-reverse sm:items-center">
            <div className="sm:w-56">
              <Input
                icon="search"
                aria-label="بحث في المتطلبات"
                placeholder="بحث في المتطلبات…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-1 gap-sm">
              <Select
                aria-label="تصفية حسب الحالة"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">كل الحالات</option>
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
              <Select
                aria-label="تصفية حسب الفئة"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">كل الفئات</option>
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-md flex items-center gap-md border-t border-outline-variant pt-md text-label-md text-on-surface-variant">
            <span className="nums">
              المتطلبات: <strong className="text-on-surface">{requirements.length}</strong>
            </span>
            <span className="h-4 w-px bg-outline-variant" />
            <span className="nums text-success">
              جاهز: <strong>{ready}</strong>
            </span>
            <span className="h-4 w-px bg-outline-variant" />
            <span className="nums text-error">
              نواقص: <strong>{gaps}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-md rounded-xl bg-primary-container px-lg py-md text-on-primary-container">
          <ReadinessRing value={tender.readiness} size={92} />
          <div>
            <p className="text-label-md">نسبة الجاهزية الكلية</p>
            <p className="text-caption">فحص جاهزية العرض</p>
          </div>
        </div>
      </div>

      {/* الجدول */}
      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[860px] text-right">
            <thead>
              <tr className="bg-primary text-on-primary">
                <th scope="col" className="p-md text-label-md font-semibold">المتطلب</th>
                <th scope="col" className="p-md text-label-md font-semibold">الفئة</th>
                <th scope="col" className="p-md text-label-md font-semibold">الأولوية</th>
                <th scope="col" className="p-md text-label-md font-semibold">الحالة</th>
                <th scope="col" className="p-md text-label-md font-semibold">المسؤول</th>
                <th scope="col" className="p-md text-center text-label-md font-semibold">
                  الثقة (AI)
                </th>
                <th scope="col" className="w-12 p-md">
                  <span className="sr-only">إجراءات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="cursor-pointer transition-colors hover:bg-surface-container-low"
                >
                  <td className="p-md">
                    <p className="text-label-md font-semibold text-on-surface">
                      {r.title}
                    </p>
                    <p className="text-caption text-on-surface-variant">{r.detail}</p>
                  </td>
                  <td className="p-md">
                    <CategoryBadge category={r.category} />
                  </td>
                  <td className="p-md">
                    <PriorityTag priority={r.priority} />
                  </td>
                  <td className="p-md">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="p-md">
                    {r.owner ? (
                      <span className="flex items-center gap-xs">
                        <Avatar
                          initials={r.owner.initials}
                          className="size-7 bg-secondary-container text-[0.65rem] text-on-secondary-container"
                        />
                        <span className="text-caption text-on-surface-variant">
                          {r.owner.name}
                        </span>
                      </span>
                    ) : (
                      <span className="text-caption italic text-on-surface-variant">
                        غير معيّن
                      </span>
                    )}
                  </td>
                  <td className="p-md">
                    <div className="flex flex-col items-center gap-0.5">
                      <ConfidenceBar value={r.confidence} />
                      {r.needsHumanReview && (
                        <span className="text-[0.65rem] font-medium text-warning">
                          مراجعة مطلوبة
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-md">
                    <button
                      type="button"
                      aria-label={`عرض تفاصيل: ${r.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(r);
                      }}
                      className="grid size-8 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                    >
                      <Icon name="chevron_left" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-2xl text-center text-on-surface-variant">
                    لا توجد متطلبات مطابقة للتصفية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* اللوحة الجانبية */}
      <RequirementPanel
        requirement={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function RequirementPanel({
  requirement,
  onClose,
}: {
  requirement: Requirement | null;
  onClose: () => void;
}) {
  const open = !!requirement;
  const dialogRef = useDialog(open, onClose);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="req-panel-title"
        tabIndex={-1}
        inert={!open}
        className={cn(
          "absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-surface-container-lowest shadow-e3 transition-transform duration-300 ease-out focus:outline-none",
          // الإخفاء فيزيائي مقصود (left-0 + -translate-x-full): translate-x في v4 لا يتأثر بـ dir
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {requirement && (
          <>
            {/* رأس اللوحة */}
            <div className="flex items-center justify-between border-b border-outline-variant p-md">
              <button
                onClick={onClose}
                className="grid size-9 place-items-center rounded-full text-on-surface-variant hover:bg-surface-container-high"
                aria-label="إغلاق"
              >
                <Icon name="close" />
              </button>
              <div className="text-right">
                <h2 id="req-panel-title" className="text-title-lg font-bold text-primary">
                  تفاصيل المتطلب
                </h2>
                <p className="text-caption text-on-surface-variant">
                  {requirement.title}
                </p>
              </div>
            </div>

            {/* المحتوى */}
            <div className="custom-scrollbar flex-1 space-y-lg overflow-y-auto p-lg">
              {/* بيانات وصفية */}
              <div className="grid grid-cols-2 gap-sm">
                <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
                  <p className="mb-xs text-caption text-on-surface-variant">الحالة</p>
                  <StatusBadge status={requirement.status} />
                </div>
                <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
                  <p className="mb-xs text-caption text-on-surface-variant">الفئة</p>
                  <CategoryBadge category={requirement.category} />
                </div>
              </div>

              {/* متطلبات التجهيز */}
              <div className="flex flex-wrap gap-sm">
                {requirement.needsAttachment && (
                  <Badge size="sm" className="bg-surface-container-high text-on-surface-variant">
                    <Icon name="attach_file" className="text-[1rem]" />
                    يتطلب مرفقاً
                  </Badge>
                )}
                {requirement.needsText && (
                  <Badge size="sm" className="bg-surface-container-high text-on-surface-variant">
                    <Icon name="article" className="text-[1rem]" />
                    يتطلب نصاً في العرض
                  </Badge>
                )}
              </div>

              {/* تحليل الذكاء الاصطناعي */}
              <div className="ai-processing rounded-xl border-2 border-primary-container/40 bg-primary-container/5 p-md">
                <div className="mb-md flex items-center justify-between">
                  <div className="flex items-center gap-xs text-primary">
                    <Icon name="neurology" filled className="text-[1.2rem]" />
                    <span className="text-label-md font-bold">تحليل الذكاء الاصطناعي</span>
                  </div>
                  <Badge size="sm" className="bg-primary uppercase tracking-wider text-on-primary">
                    AI
                  </Badge>
                </div>
                <p className="mb-md text-body-md leading-relaxed text-on-surface-variant">
                  هذا المتطلب مصنّف ضمن «{requirement.category}» بأولوية{" "}
                  {requirement.priority}. النص أدناه{" "}
                  <strong className="text-on-surface">مُستخرَج حرفياً من الكرّاسة</strong>{" "}
                  (لم يُولّده النظام) — راجع المصدر للتحقق.
                </p>
                {/* §15: المقتطف مُستخرَج لا مولّد، ولا رقم مقترح */}
                <blockquote className="mb-md rounded-lg border border-outline-variant bg-surface-container-lowest p-sm font-mono text-[0.8rem] leading-relaxed text-on-surface-variant">
                  «{requirement.source.excerpt}»
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <ConfidenceBar value={requirement.confidence} />
                    <span className="text-caption text-on-surface-variant">ثقة</span>
                  </div>
                  <button className="flex items-center gap-xs text-caption font-semibold text-primary hover:underline">
                    <Icon name="content_copy" className="text-[1rem]" />
                    نسخ المقتطف
                  </button>
                </div>
              </div>

              {/* حاجز ثقة عند المراجعة */}
              {requirement.needsHumanReview && (
                <div className="flex items-start gap-sm rounded-lg border border-warning/40 bg-warning-container/50 p-md text-on-warning-container">
                  <Icon name="warning" filled className="mt-0.5 text-[1.2rem]" />
                  <p className="text-label-md">
                    ثقة الاستخراج دون العتبة — يلزم مراجعة بشرية قبل اعتماد هذا المتطلب.
                  </p>
                </div>
              )}

              {/* المصدر المستندي */}
              <div className="space-y-sm">
                <h3 className="text-label-md font-bold text-on-surface">
                  المصدر المستندي
                </h3>
                <div className="flex items-center gap-sm rounded-lg border border-outline-variant bg-surface-container-low p-md">
                  <span className="grid size-10 place-items-center rounded-lg bg-error-container text-on-error-container">
                    <Icon name="picture_as_pdf" className="text-[1.3rem]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-label-md text-on-surface">
                      {requirement.source.fileName}
                    </p>
                    <p className="nums text-caption text-on-surface-variant">
                      صفحة {requirement.source.page}
                    </p>
                  </div>
                  <button
                    className="grid size-8 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                    aria-label="فتح المصدر"
                  >
                    <Icon name="open_in_new" className="text-[1.2rem]" />
                  </button>
                </div>
              </div>

              {/* آخر التحديثات */}
              <div className="space-y-sm">
                <h3 className="text-label-md font-bold text-on-surface">آخر التحديثات</h3>
                <div className="flex gap-sm">
                  <Avatar
                    initials={requirement.owner?.initials ?? "—"}
                    className="size-8 bg-secondary-container text-[0.65rem] text-on-secondary-container"
                  />
                  <div className="flex-1 rounded-lg bg-surface-container-low p-sm">
                    <p className="text-caption font-semibold text-on-surface">
                      {requirement.owner?.name ?? "النظام"}
                    </p>
                    <p className="text-caption text-on-surface-variant">
                      {requirement.status === "ناقص"
                        ? "بانتظار رفع المستند المطلوب."
                        : "تمت مراجعة المتطلب وتحديث حالته."}
                    </p>
                    <span className="text-[0.65rem] text-on-surface-variant">
                      قبل ٣ ساعات
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* إجراءات */}
            <div className="flex gap-sm border-t border-outline-variant p-md">
              <Button className="flex-1" icon="check_circle" iconFilled>
                اعتماد المتطلب
              </Button>
              <Button variant="outline" icon="assignment_ind">
                تعيين مسؤول
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
