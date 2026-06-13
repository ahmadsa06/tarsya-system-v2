import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icon";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/misc";

export const metadata: Metadata = { title: "بوابة المالك" };

const kpis = [
  { label: "الشركات المشتركة", value: "٤٨", delta: "+٦ هذا الشهر", icon: "apartment" },
  { label: "اشتراكات نشطة", value: "٤١", delta: "٨٥٪ احتفاظ", icon: "verified" },
  { label: "كرّاسات هذا الشهر", value: "٣١٢", delta: "+١٨٪", icon: "description" },
  { label: "تكلفة AI الشهرية", value: "٤٬٢٨٠ ﷼", delta: "ضمن الميزانية", icon: "savings" },
];

const companies = [
  { name: "شركة العمران للمقاولات", plan: "Growth", used: 14, quota: 20, status: "نشطة", cost: "٣١٢ ﷼" },
  { name: "مجموعة التقنية المتقدمة", plan: "Pro", used: 38, quota: 50, status: "نشطة", cost: "٨١٠ ﷼" },
  { name: "مكتب الاستشارات الهندسية", plan: "Starter", used: 5, quota: 5, status: "بلغت الحد", cost: "٩٨ ﷼" },
  { name: "شركة التوريدات الطبية", plan: "Growth", used: 9, quota: 20, status: "نشطة", cost: "١٩٥ ﷼" },
];

const costBreakdown = [
  { label: "التحليل والتوليد", pct: 46, color: "bg-primary" },
  { label: "OCR", pct: 24, color: "bg-info" },
  { label: "Embeddings", pct: 14, color: "bg-secondary" },
  { label: "التخزين", pct: 10, color: "bg-warning" },
  { label: "أخرى", pct: 6, color: "bg-outline" },
];

const margins = [
  { plan: "Starter", margin: 64 },
  { plan: "Growth", margin: 76 },
  { plan: "Pro", margin: 81 },
];

const statusStyle: Record<string, string> = {
  نشطة: "bg-success-container text-on-success-container",
  "بلغت الحد": "bg-warning-container text-on-warning-container",
};

export default function AdminPage() {
  return (
    <div className="min-h-dvh bg-background">
      {/* شريط علوي مميّز لبوابة المالك */}
      <header className="sticky top-0 z-30 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
          <div className="flex items-center gap-md">
            <Logo invert />
            <span className="rounded-full bg-on-primary/10 px-3 py-1 text-caption font-medium text-inverse-on-surface">
              بوابة المالك · التشغيل
            </span>
          </div>
          <div className="flex items-center gap-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-xs rounded-lg px-md py-sm text-label-md text-inverse-on-surface/80 transition-colors hover:bg-on-primary/10"
            >
              <Icon name="swap_horiz" className="text-[1.2rem]" />
              بوابة الشركة
            </Link>
            <Avatar
              initials="م"
              className="size-9 bg-primary-fixed-dim text-label-sm text-on-primary-fixed"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-lg px-gutter py-lg">
        <div className="rise-in">
          <h1 className="text-headline-md text-on-surface">نظرة عامة على المنصة</h1>
          <p className="text-body-md text-on-surface-variant">
            مراقبة الشركات والاستهلاك والتكلفة الداخلية والربحية.
          </p>
        </div>

        {/* المؤشرات */}
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardBody className="flex items-start justify-between pt-lg">
                <div>
                  <p className="text-label-md text-on-surface-variant">{k.label}</p>
                  <p className="nums mt-xs text-headline-md font-bold text-on-surface">
                    {k.value}
                  </p>
                  <p className="mt-0.5 text-caption text-success">{k.delta}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-lg bg-primary-fixed text-on-primary-fixed">
                  <Icon name={k.icon} className="text-[1.3rem]" />
                </span>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* الشركات */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle as="h2">الشركات</CardTitle>
            <span className="text-label-md text-on-surface-variant">٤ من ٤٨</span>
          </CardHeader>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[720px] text-right">
              <thead>
                <tr className="border-y border-outline-variant bg-surface-container text-on-surface-variant">
                  <th scope="col" className="p-md text-label-md font-semibold">الشركة</th>
                  <th scope="col" className="p-md text-label-md font-semibold">الباقة</th>
                  <th scope="col" className="p-md text-label-md font-semibold">الاستهلاك</th>
                  <th scope="col" className="p-md text-label-md font-semibold">الحالة</th>
                  <th scope="col" className="p-md text-label-md font-semibold">التكلفة الداخلية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {companies.map((c) => (
                  <tr key={c.name} className="hover:bg-surface-container-low">
                    <td className="p-md text-label-md font-medium text-on-surface">
                      {c.name}
                    </td>
                    <td className="p-md">
                      <Badge className="bg-secondary-container text-on-secondary-container">
                        {c.plan}
                      </Badge>
                    </td>
                    <td className="p-md">
                      <div className="flex items-center gap-sm">
                        <ProgressBar
                          value={c.used}
                          max={c.quota}
                          tone={c.used >= c.quota ? "bg-warning" : "bg-primary"}
                          className="w-20"
                        />
                        <span className="nums text-caption text-on-surface-variant">
                          {c.used}/{c.quota}
                        </span>
                      </div>
                    </td>
                    <td className="p-md">
                      <Badge className={statusStyle[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="nums p-md text-label-md text-on-surface">{c.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* لوحة التكلفة الداخلية §22 */}
        <div className="grid gap-md lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">توزيع تكلفة الكرّاسة</CardTitle>
            </CardHeader>
            <CardBody className="space-y-md">
              <div className="flex h-3 overflow-hidden rounded-full">
                {costBreakdown.map((c) => (
                  <span
                    key={c.label}
                    className={c.color}
                    style={{ width: `${c.pct}%` }}
                  />
                ))}
              </div>
              <ul className="space-y-sm">
                {costBreakdown.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between text-label-md"
                  >
                    <span className="flex items-center gap-sm text-on-surface">
                      <span className={`size-3 rounded-sm ${c.color}`} />
                      {c.label}
                    </span>
                    <span className="nums text-on-surface-variant">{c.pct}٪</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-lg bg-surface-container-low p-sm text-caption text-on-surface-variant">
                متوسط تكلفة الكرّاسة: <span className="nums">٦٫٤ ﷼</span> · معدل الاستفادة
                من الكاش: <span className="nums">٢٣٪</span>
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">الربحية حسب الباقة</CardTitle>
            </CardHeader>
            <CardBody className="space-y-lg pt-lg">
              {margins.map((m) => (
                <div key={m.plan} className="space-y-xs">
                  <div className="flex items-center justify-between text-label-md">
                    <span className="text-on-surface">{m.plan}</span>
                    <span
                      className={`nums font-semibold ${m.margin >= 70 ? "text-success" : "text-warning"}`}
                    >
                      هامش {m.margin}٪
                    </span>
                  </div>
                  <ProgressBar
                    value={m.margin}
                    tone={m.margin >= 70 ? "bg-success" : "bg-warning"}
                    className="h-2.5"
                  />
                </div>
              ))}
              <p className="rounded-lg bg-surface-container-low p-sm text-caption text-on-surface-variant">
                عتبة الهامش المستهدفة ≥ ٧٠٪ لكل باقة قبل الإطلاق التجاري.
              </p>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
