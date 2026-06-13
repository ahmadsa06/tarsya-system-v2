"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const items = [
  {
    q: "هل ترسية مرتبطة رسمياً بمنصة اعتماد؟",
    a: "لا. ترسية منتج مستقل يساعدك على تجهيز عروضك قبل رفعها على اعتماد، دون أي تكامل مباشر أو علاقة رسمية بالمنصة الحكومية.",
  },
  {
    q: "هل يقترح النظام أسعاراً للبنود؟",
    a: "إطلاقاً. النظام لا يحسب ولا يقترح أي أسعار — يكتفي بتنظيم جداول الكميات والبنود دون قيم سعرية، حمايةً لك من مخاطر الاستبعاد المالي. التسعير قرارك وحدك.",
  },
  {
    q: "كيف تُحمى ملفات شركتي من المنافسين؟",
    a: "عزل صارم لكل شركة على حدة، وتشفير الملفات، وروابط تنزيل مؤقتة موقّعة، وتحقّق بخطوتين إلزامي للأدوار الحساسة، وسجلات تدقيق لكل عملية.",
  },
  {
    q: "ما المقصود بالاشتراك «بالكراسة»؟",
    a: "تدفع حسب عدد الكرّاسات التي تجهّزها شهرياً، لا حسب عدد المستخدمين. المرفقات التابعة لنفس المنافسة لا تُحتسب ككرّاسات إضافية.",
  },
  {
    q: "هل المخرجات جاهزة للتقديم مباشرة؟",
    a: "المخرجات مسودة احترافية متقدّمة تختصر وقتك كثيراً، لكننا نوصي دائماً بمراجعتها بشرياً قبل التقديم النهائي.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-outline-variant rounded-xl border border-outline-variant bg-surface-container-lowest">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-md p-lg text-right"
              aria-expanded={isOpen}
            >
              <span className="text-title-md text-on-surface">{item.q}</span>
              <Icon
                name="expand_more"
                className={cn(
                  "shrink-0 text-on-surface-variant transition-transform duration-300",
                  isOpen && "rotate-180 text-primary",
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-lg pb-lg text-body-md leading-relaxed text-on-surface-variant">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
