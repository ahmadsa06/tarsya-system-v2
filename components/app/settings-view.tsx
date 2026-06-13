"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, tabId, panelId } from "@/components/ui/tabs";
import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import type { CompanyRole } from "@/lib/types";

const team: {
  name: string;
  email: string;
  role: CompanyRole;
  initials: string;
  twoFA: boolean;
}[] = [
  { name: "أحمد المالكي", email: "ahmad@alomran.sa", role: "مالك", initials: "أم", twoFA: true },
  { name: "سارة العنزي", email: "sara@alomran.sa", role: "مدير العروض", initials: "سع", twoFA: true },
  { name: "فيصل القحطاني", email: "faisal@alomran.sa", role: "معدّ فني", initials: "فق", twoFA: false },
  { name: "نورة الدوسري", email: "noura@alomran.sa", role: "معدّ مالي", initials: "ند", twoFA: true },
  { name: "خالد الشهري", email: "khaled@alomran.sa", role: "مراجع", initials: "خش", twoFA: true },
  { name: "ريم الحربي", email: "reem@alomran.sa", role: "قارئ", initials: "رح", twoFA: false },
];

const roleStyle: Record<CompanyRole, string> = {
  مالك: "bg-primary-container text-on-primary-container",
  مدير: "bg-secondary-container text-on-secondary-container",
  "مدير العروض": "bg-secondary-container text-on-secondary-container",
  "معدّ فني": "bg-tertiary-container text-on-tertiary-container",
  "معدّ مالي": "bg-info-container text-on-info-container",
  مراجع: "bg-warning-container text-on-warning-container",
  قارئ: "bg-surface-container-high text-on-surface-variant",
};

const securityToggles = [
  { icon: "policy", t: "فرض التحقّق بخطوتين على الفريق", d: "إلزام كل الأعضاء بتفعيل 2FA.", on: true },
  { icon: "devices", t: "تذكّر الجهاز", d: "عدم طلب الرمز ٣٠ يوماً على الأجهزة الموثوقة.", on: true },
  { icon: "lock_clock", t: "إنهاء الجلسات عند تغيير كلمة المرور", d: "تسجيل خروج من كل الأجهزة تلقائياً.", on: true },
];

export function SettingsView() {
  const [tab, setTab] = useState("team");

  return (
    <div className="mx-auto max-w-5xl space-y-lg px-gutter py-lg">
      <div className="rise-in">
        <h1 className="text-headline-md text-on-surface">الإعدادات</h1>
        <p className="text-body-md text-on-surface-variant">
          إدارة الفريق والصلاحيات والأمان وسياسات الخصوصية.
        </p>
      </div>

      <Tabs
        idBase="settings"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: "team", label: "الفريق والأدوار" },
          { id: "security", label: "الأمان" },
          { id: "privacy", label: "الخصوصية والاحتفاظ" },
        ]}
      />

      {tab === "team" && (
        <div
          role="tabpanel"
          id={panelId("settings", "team")}
          aria-labelledby={tabId("settings", "team")}
          tabIndex={0}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle as="h2">أعضاء الفريق</CardTitle>
              <Button size="sm" icon="person_add">
                دعوة عضو
              </Button>
            </CardHeader>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[640px] text-right">
                <thead>
                  <tr className="border-y border-outline-variant bg-surface-container text-on-surface-variant">
                    <th scope="col" className="p-md text-label-md font-semibold">العضو</th>
                    <th scope="col" className="p-md text-label-md font-semibold">الدور</th>
                    <th scope="col" className="p-md text-label-md font-semibold">التحقّق بخطوتين</th>
                    <th scope="col" className="w-10 p-md">
                      <span className="sr-only">إجراءات</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {team.map((m) => (
                    <tr key={m.email} className="hover:bg-surface-container-low">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <Avatar
                            initials={m.initials}
                            className="size-9 bg-secondary-container text-label-sm text-on-secondary-container"
                          />
                          <div>
                            <p className="text-label-md font-medium text-on-surface">
                              {m.name}
                            </p>
                            <p className="text-caption text-on-surface-variant" dir="ltr">
                              {m.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-md">
                        <span
                          className={`inline-flex rounded-full px-3 py-0.5 text-caption font-medium ${roleStyle[m.role]}`}
                        >
                          {m.role}
                        </span>
                      </td>
                      <td className="p-md">
                        {m.twoFA ? (
                          <span className="inline-flex items-center gap-xs text-label-sm text-success">
                            <Icon name="check_circle" filled className="text-[1.1rem]" />
                            مُفعّل
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-xs text-label-sm text-warning">
                            <Icon name="warning" filled className="text-[1.1rem]" />
                            غير مُفعّل
                          </span>
                        )}
                      </td>
                      <td className="p-md">
                        <button
                          className="grid size-8 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high"
                          aria-label={`خيارات ${m.name}`}
                        >
                          <Icon name="more_vert" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "security" && (
        <div
          role="tabpanel"
          id={panelId("settings", "security")}
          aria-labelledby={tabId("settings", "security")}
          tabIndex={0}
          className="space-y-md"
        >
          <Alert tone="success" title="التحقّق بخطوتين مُفعّل لحسابك">
            تستخدم تطبيق مصادقة (TOTP). يوصى بفرض التحقّق على كل أعضاء الفريق.
          </Alert>
          <Card>
            <CardBody className="space-y-md pt-lg">
              {securityToggles.map((s, i) => (
                <div
                  key={s.t}
                  className="flex items-center justify-between gap-md border-b border-outline-variant pb-md last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-sm">
                    <span className="grid size-10 place-items-center rounded-lg bg-surface-container-high text-on-surface-variant">
                      <Icon name={s.icon} className="text-[1.3rem]" />
                    </span>
                    <div>
                      <p id={`sec-toggle-${i}`} className="text-label-md font-medium text-on-surface">
                        {s.t}
                      </p>
                      <p className="text-caption text-on-surface-variant">{s.d}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={s.on} labelId={`sec-toggle-${i}`} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}

      {tab === "privacy" && (
        <div
          role="tabpanel"
          id={panelId("settings", "privacy")}
          aria-labelledby={tabId("settings", "privacy")}
          tabIndex={0}
          className="space-y-md"
        >
          <Card>
            <CardHeader>
              <CardTitle as="h2">سياسة الاحتفاظ بالبيانات</CardTitle>
            </CardHeader>
            <CardBody className="space-y-sm">
              <p className="text-body-md text-on-surface-variant">
                تُحفظ ملفاتك ومخرجاتك طوال فعالية الحساب. عند إلغاء الاشتراك، تتاح فترة
                سماح لتنزيل بياناتك قبل الأرشفة أو الحذف وفق السياسة.
              </p>
              <ul className="space-y-xs text-label-md text-on-surface">
                {["الكرّاسة الأصلية والمرفقات", "المخرجات النهائية", "النص المستخرج وتحليل المتطلبات"].map(
                  (x) => (
                    <li key={x} className="flex items-center gap-sm">
                      <Icon name="check" className="text-[1.1rem] text-success" />
                      {x}
                    </li>
                  ),
                )}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-center justify-between gap-md pt-lg">
              <div>
                <p className="text-label-md font-semibold text-error">حذف بيانات الشركة</p>
                <p className="text-caption text-on-surface-variant">
                  إجراء لا يمكن التراجع عنه — يتطلب تأكيداً بخطوتين.
                </p>
              </div>
              <Button variant="destructive" icon="delete_forever">
                طلب الحذف
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
