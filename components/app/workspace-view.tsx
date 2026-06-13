"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDialog } from "@/lib/use-dialog";
import type { Tender } from "@/lib/types";

type SectionStatus = "جاهز" | "قيد التجهيز" | "مسودة" | "فارغ";

const sections: { id: string; title: string; status: SectionStatus }[] = [
  { id: "cover", title: "خطاب التقديم", status: "جاهز" },
  { id: "about", title: "نبذة الشركة", status: "جاهز" },
  { id: "scope", title: "فهم نطاق العمل", status: "قيد التجهيز" },
  { id: "method", title: "المنهجية", status: "مسودة" },
  { id: "plan", title: "خطة التنفيذ", status: "قيد التجهيز" },
  { id: "timeline", title: "الجدول الزمني", status: "فارغ" },
  { id: "team", title: "فريق العمل", status: "مسودة" },
  { id: "exp", title: "الخبرات المشابهة", status: "قيد التجهيز" },
  { id: "qa", title: "الجودة والسلامة", status: "فارغ" },
  { id: "risk", title: "إدارة المخاطر", status: "فارغ" },
  { id: "delivery", title: "خطة التسليم", status: "فارغ" },
  { id: "compliance", title: "الامتثال للمتطلبات", status: "قيد التجهيز" },
];

const statusDot: Record<SectionStatus, string> = {
  جاهز: "bg-success",
  "قيد التجهيز": "bg-secondary",
  مسودة: "bg-warning",
  فارغ: "bg-outline-variant",
};

const editorTools = [
  { icon: "format_bold", label: "عريض" },
  { icon: "format_italic", label: "مائل" },
  { icon: "format_list_bulleted", label: "قائمة نقطية" },
  { icon: "format_list_numbered", label: "قائمة مرقّمة" },
  { icon: "format_quote", label: "اقتباس" },
  { icon: "link", label: "إدراج رابط" },
];

const sampleContent: Record<string, string> = {
  scope:
    "يشمل نطاق العمل تشغيل وصيانة كامل مرافق المجمّع الإداري على مدار (٢٤) شهراً، متضمناً أعمال الصيانة الوقائية والتصحيحية للأنظمة الكهروميكانيكية، وأنظمة التكييف، والمصاعد، وشبكات المياه، مع الالتزام بمؤشرات الأداء المحددة في كرّاسة الشروط.",
  default:
    "اختر قسماً من الأعمدة لعرض محتواه وتحريره. المحتوى المُولّد مميّز بصرياً، ويمكنك تعديله بحرية قبل الاعتماد.",
};

export function WorkspaceView({ tender }: { tender: Tender }) {
  const [active, setActive] = useState("scope");
  const [treeOpen, setTreeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const current = sections.find((s) => s.id === active);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden">
      {/* شريط علوي للمساحة */}
      <div className="flex items-center justify-between gap-md border-b border-outline-variant bg-surface-container-low px-gutter py-sm">
        <div className="flex items-center gap-sm">
          <Link
            href={`/tenders/${tender.id}/matrix`}
            className="grid size-9 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high"
            aria-label="رجوع للمصفوفة"
          >
            <Icon name="arrow_forward" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-label-md font-semibold text-on-surface">
              تجهيز العرض الفني
            </p>
            <p className="nums truncate text-caption text-on-surface-variant">
              {tender.title} · رقم {tender.reference}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-xs">
          <button
            onClick={() => setTreeOpen(true)}
            className="grid size-9 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high lg:hidden"
            aria-label="أقسام العرض"
          >
            <Icon name="list" />
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="grid size-9 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-high xl:hidden"
            aria-label="المساعد الذكي"
          >
            <Icon name="forum" />
          </button>
          <Button size="sm" icon="download" className="hidden sm:inline-flex">
            تصدير
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* العمود الأيمن: شجرة الأقسام */}
        <aside className="hidden w-72 shrink-0 border-s border-outline-variant bg-surface-container-low lg:block">
          <TreePanel active={active} onSelect={setActive} />
        </aside>

        {/* العمود الأوسط: المحرّر */}
        <section className="flex min-w-0 flex-1 flex-col bg-background">
          <Editor title={current?.title ?? ""} sectionId={active} />
        </section>

        {/* العمود الأيسر: المساعد الذكي */}
        <aside className="hidden w-80 shrink-0 border-e border-outline-variant bg-surface-container-low xl:block">
          <ChatPanel />
        </aside>
      </div>

      {/* أدراج الجوال/اللابتوب */}
      <Drawer
        from="right"
        hideAt="lg"
        label="أقسام العرض الفني"
        open={treeOpen}
        onClose={() => setTreeOpen(false)}
      >
        <TreePanel
          active={active}
          onSelect={(id) => {
            setActive(id);
            setTreeOpen(false);
          }}
        />
      </Drawer>
      <Drawer
        from="left"
        hideAt="xl"
        label="المساعد الذكي"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      >
        <ChatPanel />
      </Drawer>
    </div>
  );
}

function TreePanel({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-outline-variant p-md">
        <p className="text-label-md font-semibold text-on-surface">أقسام العرض الفني</p>
        <p className="text-caption text-on-surface-variant">١٢ قسماً · ٢ جاهز</p>
      </div>
      <nav className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto p-sm">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            className={cn(
              "flex w-full items-center gap-sm rounded-lg px-md py-sm text-right text-label-md transition-colors",
              active === s.id
                ? "bg-primary-container font-semibold text-on-primary-container"
                : "text-on-surface-variant hover:bg-surface-container-high",
            )}
          >
            <span className={cn("size-2 shrink-0 rounded-full", statusDot[s.status])} />
            <span className="nums text-caption opacity-60">{i + 1}.</span>
            <span className="flex-1 truncate">{s.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Editor({ title, sectionId }: { title: string; sectionId: string }) {
  const content = sampleContent[sectionId] ?? sampleContent.default;
  return (
    <>
      {/* شريط أدوات */}
      <div className="flex items-center gap-xs border-b border-outline-variant px-lg py-sm">
        {editorTools.map((t) => (
          <button
            key={t.icon}
            aria-label={t.label}
            className="grid size-9 place-items-center rounded-md text-on-surface-variant hover:bg-surface-container-high"
          >
            <Icon name={t.icon} className="text-[1.25rem]" />
          </button>
        ))}
        <Badge size="sm" className="ms-auto bg-primary-container/50 text-primary">
          <Icon name="auto_awesome" className="text-[1rem]" />
          محتوى مُولّد
        </Badge>
      </div>

      {/* منطقة التحرير */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-lg py-xl">
          <div className="mb-md flex items-start gap-sm rounded-lg border border-info/30 bg-info-container/40 p-sm text-on-info-container">
            <Icon name="info" filled className="mt-0.5 text-[1.1rem]" />
            <p className="text-caption leading-relaxed">
              هذه مسودة مُولّدة بالاعتماد على متطلبات الكرّاسة وبيانات شركتك. راجعها وعدّلها
              قبل الاعتماد — يوصى بالمراجعة البشرية قبل التقديم.
            </p>
          </div>

          <h2 id="editor-section-title" className="text-headline-md text-on-surface">
            {title}
          </h2>
          <div
            key={sectionId}
            role="textbox"
            aria-multiline="true"
            aria-labelledby="editor-section-title"
            tabIndex={0}
            className="mt-md min-h-64 rounded-lg border border-outline-variant bg-surface-container-lowest p-lg text-body-lg leading-loose text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            contentEditable
            suppressContentEditableWarning
          >
            {content}
          </div>

          <div className="mt-md flex items-center justify-between">
            <span className="text-caption text-on-surface-variant">
              آخر حفظ تلقائي قبل لحظات
            </span>
            <div className="flex gap-sm">
              <Button variant="outline" size="sm" icon="autorenew">
                إعادة توليد
              </Button>
              <Button size="sm" icon="check">
                اعتماد القسم
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ChatPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-sm border-b border-outline-variant p-md">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-on-primary">
          <Icon name="neurology" filled className="text-[1.1rem]" />
        </span>
        <div>
          <p className="text-label-md font-semibold text-on-surface">المساعد الذكي</p>
          <p className="text-caption text-on-surface-variant">يجيب من الكرّاسة فقط</p>
        </div>
      </div>

      <div className="custom-scrollbar flex-1 space-y-md overflow-y-auto p-md">
        {/* رسالة مستخدم */}
        <div className="ms-auto max-w-[85%] rounded-xl rounded-se-sm bg-primary px-md py-sm text-label-md text-on-primary">
          هل مطلوب شهادة تصنيف لهذه المنافسة؟
        </div>
        {/* رد المساعد */}
        <div className="max-w-[90%] space-y-sm rounded-xl rounded-ss-sm bg-surface-container-lowest p-md">
          <p className="text-label-md leading-relaxed text-on-surface">
            نعم. تشترط الكرّاسة شهادة تصنيف سارية في نشاط «تشغيل وصيانة المباني» بدرجة لا
            تقل عن الرابعة، وتُرفق ضمن المستندات الإلزامية.
          </p>
          <div className="flex flex-wrap gap-xs">
            <Badge size="sm" className="bg-surface-container-high text-on-surface-variant">
              <Icon name="description" className="text-[0.9rem]" />
              كرّاسة الشروط · صفحة ١٧
            </Badge>
            <Badge size="sm" className="bg-surface-container-high text-on-surface-variant">
              <Icon name="verified" className="text-[0.9rem]" />
              ثقة ٩٣٪
            </Badge>
          </div>
        </div>
      </div>

      {/* إجراءات مقترحة */}
      <div className="border-t border-outline-variant p-md">
        <p className="mb-sm text-caption text-on-surface-variant">إجراءات مقترحة</p>
        <div className="mb-sm flex flex-wrap gap-xs">
          {["لخّص نطاق العمل", "ما المستندات الناقصة؟", "صُغ خطاب التقديم"].map((a) => (
            <button
              key={a}
              className="rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1 text-caption text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              {a}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            aria-label="اسأل عن الكرّاسة"
            placeholder="اسأل عن الكرّاسة…"
            className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest pe-4 ps-11 text-label-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            className="absolute start-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md bg-primary text-on-primary"
            aria-label="إرسال"
          >
            <Icon name="send" className="text-[1.1rem]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Drawer({
  from,
  hideAt,
  label,
  open,
  onClose,
  children,
}: {
  from: "right" | "left";
  hideAt: "lg" | "xl";
  label: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useDialog(open, onClose);
  const pin = from === "right" ? "right-0" : "left-0";
  const hidden = from === "right" ? "translate-x-full" : "-translate-x-full";
  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        hideAt === "xl" ? "xl:hidden" : "lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        inert={!open}
        className={cn(
          // الإخفاء فيزيائي مقصود: translate-x لا يتأثر بـ dir، مربوط يدوياً بالجهة المثبّتة
          "absolute inset-y-0 w-80 max-w-[85%] bg-surface-container-low shadow-e3 transition-transform duration-300 focus:outline-none",
          pin,
          open ? "translate-x-0" : hidden,
        )}
      >
        {children}
      </aside>
    </div>
  );
}
