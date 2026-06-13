import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { StageBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/misc";
import { tenders } from "@/lib/data";
import { daysLeftTone } from "@/lib/utils";

export const metadata: Metadata = { title: "المنافسات" };

export default function TendersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-lg px-gutter py-lg">
      <div className="rise-in flex flex-col justify-between gap-md sm:flex-row-reverse sm:items-center">
        <LinkButton href="/tenders/new" icon="upload_file">
          رفع كرّاسة جديدة
        </LinkButton>
        <div>
          <h1 className="text-headline-md text-on-surface">المنافسات</h1>
          <p className="text-body-md text-on-surface-variant">
            {tenders.length} منافسة · تابع حالة تجهيز كل عرض.
          </p>
        </div>
      </div>

      {/* أدوات التصفية */}
      <Card className="p-md">
        <div className="flex flex-col gap-sm md:flex-row-reverse md:items-center">
          <div className="md:w-72">
            <Input icon="search" placeholder="ابحث بالعنوان أو رقم المنافسة…" />
          </div>
          <div className="flex flex-1 gap-sm">
            <Select aria-label="الحالة" defaultValue="">
              <option value="">كل الحالات</option>
              <option>قيد المعالجة</option>
              <option>بانتظار المراجعة</option>
              <option>جاهزة</option>
              <option>تم التصدير</option>
            </Select>
            <Select aria-label="القطاع" defaultValue="">
              <option value="">كل القطاعات</option>
              <option>مقاولات</option>
              <option>تقنية المعلومات</option>
              <option>تشغيل وصيانة</option>
              <option>توريد</option>
              <option>استشارات</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* الجدول */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[820px] text-right">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container text-on-surface-variant">
                <th scope="col" className="p-md text-label-md font-semibold">المنافسة</th>
                <th scope="col" className="p-md text-label-md font-semibold">القطاع</th>
                <th scope="col" className="p-md text-label-md font-semibold">الإغلاق</th>
                <th scope="col" className="p-md text-label-md font-semibold">الجاهزية</th>
                <th scope="col" className="p-md text-label-md font-semibold">الحالة</th>
                <th scope="col" className="w-10 p-md">
                  <span className="sr-only">إجراءات</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {tenders.map((t) => (
                <tr
                  key={t.id}
                  className="group transition-colors hover:bg-surface-container-low"
                >
                  <td className="p-md">
                    <Link href={`/tenders/${t.id}/matrix`} className="block">
                      <p className="text-label-md font-semibold text-on-surface group-hover:text-primary">
                        {t.title}
                      </p>
                      <p className="nums text-caption text-on-surface-variant">
                        {t.entity} · رقم {t.reference}
                      </p>
                    </Link>
                  </td>
                  <td className="p-md">
                    <span className="text-label-md text-on-surface-variant">
                      {t.sector}
                    </span>
                  </td>
                  <td className="p-md">
                    <span className="text-label-md text-on-surface">{t.closingDate}</span>
                    <span className={`nums block text-caption ${daysLeftTone(t.daysLeft)}`}>
                      متبقٍّ {t.daysLeft} يوم
                    </span>
                  </td>
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <ProgressBar
                        value={t.readiness}
                        tone={
                          t.readiness >= 90
                            ? "bg-success"
                            : t.readiness >= 50
                              ? "bg-primary"
                              : "bg-warning"
                        }
                        className="w-20"
                      />
                      <span className="nums text-caption font-semibold text-on-surface-variant">
                        {t.readiness}%
                      </span>
                    </div>
                    {t.gapsCount > 0 && (
                      <span className="nums mt-0.5 block text-caption text-error">
                        {t.gapsCount} نواقص
                      </span>
                    )}
                  </td>
                  <td className="p-md">
                    <StageBadge stage={t.stage} />
                  </td>
                  <td className="p-md">
                    <Link
                      href={`/tenders/${t.id}/matrix`}
                      className="grid size-8 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                      aria-label="فتح"
                    >
                      <Icon name="chevron_left" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
