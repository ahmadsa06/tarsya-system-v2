import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { FAQ } from "@/components/marketing/faq";
import { LinkButton } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { StatusBadge, CategoryBadge } from "@/components/ui/badge";

const features = [
  {
    icon: "neurology",
    title: "محرّك تحليل عربي ذكي",
    desc: "يقرأ كرّاسة الشروط ومرفقاتها ويستخرج المتطلبات الفنية والمالية والإدارية مع مصدرها ورقم صفحتها ودرجة ثقتها.",
  },
  {
    icon: "grid_view",
    title: "مصفوفة التجهيز",
    desc: "قلب المنتج: كل متطلب بحالته وأولويته ومسؤوله ومصدره من الكرّاسة — لا يضيع شرط ولا مرفق.",
  },
  {
    icon: "rule",
    title: "كشف النواقص والتناقضات",
    desc: "ينبّهك للمتطلبات بلا رد، والمرفقات الناقصة، والتناقضات المحتملة قبل التقديم.",
  },
  {
    icon: "table_chart",
    title: "تنظيم العرض المالي — بلا أسعار",
    desc: "يرتّب جدول الكميات والبنود في Excel جاهز لإضافة أسعارك، دون أن يقترح أي رقم.",
  },
  {
    icon: "groups",
    title: "تعاون الفريق بالأدوار",
    desc: "أدوار دقيقة (مدير عروض، معدّ فني، معدّ مالي، مراجع) بأقل صلاحية لازمة لكل مستخدم.",
  },
  {
    icon: "description",
    title: "تصدير عربي عالي الجودة",
    desc: "حزمة DOCX/PDF/Excel بجودة RTL احترافية، بخطوط عربية وهوية بصرية سليمة.",
  },
];

const steps = [
  {
    n: "١",
    icon: "upload_file",
    title: "ارفع الكرّاسة",
    desc: "كرّاسة الشروط والمرفقات بأي صيغة: PDF, Word, Excel, صور أو ملف مضغوط.",
  },
  {
    n: "٢",
    icon: "auto_awesome",
    title: "حلّل تلقائياً",
    desc: "يستخرج النظام المتطلبات ويبني مصفوفة التجهيز ويكشف النواقص.",
  },
  {
    n: "٣",
    icon: "edit_note",
    title: "جهّز العرض",
    desc: "حرّر الأقسام الفنية ونظّم العرض المالي بمساعدة القوالب وبيانات شركتك.",
  },
  {
    n: "٤",
    icon: "task_alt",
    title: "افحص وصدّر",
    desc: "افحص الجاهزية، ثم صدّر حزمة جاهزة للمراجعة البشرية والتقديم.",
  },
];

const securityPoints = [
  { icon: "lock", title: "تحقّق بخطوتين", desc: "2FA إلزامي للأدوار الحساسة." },
  { icon: "shield", title: "عزل صارم", desc: "بيانات كل شركة معزولة تماماً." },
  { icon: "encrypted", title: "تشفير شامل", desc: "تشفير الملفات والبيانات الحساسة." },
  { icon: "history", title: "سجلات تدقيق", desc: "تتبّع كل عملية حساسة." },
];

const plans = [
  {
    name: "Starter",
    tagline: "للمقاول المتقطّع",
    quota: "٥ كرّاسات / شهرياً",
    featured: false,
    perks: ["تحليل كامل للكرّاسة", "مصفوفة التجهيز", "تصدير DOCX/PDF/Excel", "قالب هوية واحد"],
  },
  {
    name: "Growth",
    tagline: "للشركات النشطة",
    quota: "٢٠ كرّاسة / شهرياً",
    featured: true,
    perks: ["كل مزايا Starter", "قوالب هوية متعددة", "تعاون الفريق بالأدوار", "أولوية في المعالجة"],
  },
  {
    name: "Pro",
    tagline: "لأقسام العطاءات",
    quota: "٥٠ كرّاسة / شهرياً",
    featured: false,
    perks: ["كل مزايا Growth", "OCR أقوى للملفات المصورة", "مكتبة خبرة موسّعة", "دعم مخصّص"],
  },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, var(--color-primary-fixed) 55%, transparent), transparent), radial-gradient(50% 40% at 10% 10%, color-mix(in srgb, var(--color-secondary-container) 45%, transparent), transparent)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-2xl px-gutter py-2xl lg:grid-cols-2 lg:py-[6rem]">
            <div className="rise-in space-y-lg">
              <span className="inline-flex items-center gap-sm rounded-full border border-outline-variant bg-surface-container-lowest px-md py-1.5 text-label-sm text-on-surface-variant">
                <span className="size-2 rounded-full bg-success" />
                متوافق مع نظام المنافسات والمشتريات الحكومية
              </span>
              <h1 className="text-display-md leading-[1.1] text-on-surface lg:text-display-lg">
                جهّز عروض <span className="text-primary">منافسات اعتماد</span> بكفاءة
                وامتثال
              </h1>
              <p className="max-w-xl text-body-lg text-on-surface-variant">
                ارفع كرّاسة الشروط، فيستخرج النظام المتطلبات، ويبني مصفوفة تجهيز واضحة،
                وينظّم عرضك الفني والمالي — ثم ينتج حزمة عربية احترافية جاهزة للمراجعة.
              </p>
              <div className="flex flex-wrap items-center gap-sm">
                <LinkButton href="/dashboard" size="lg" icon="arrow_back">
                  جرّب لوحة التطبيق
                </LinkButton>
                <LinkButton href="#how" size="lg" variant="outline" icon="play_circle">
                  كيف يعمل؟
                </LinkButton>
              </div>
              <p className="text-caption text-on-surface-variant">
                اشتراك بالكرّاسة — تدفع لما تجهّزه فقط، بلا التزام سنوي.
              </p>
            </div>

            {/* بطاقة معاينة المنتج */}
            <div className="rise-in [animation-delay:120ms]">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-md shadow-e3">
                <div className="mb-md flex items-center justify-between border-b border-outline-variant pb-md">
                  <div className="flex items-center gap-sm">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary text-on-primary">
                      <Icon name="grid_view" className="text-[1.1rem]" />
                    </span>
                    <span className="text-label-md font-semibold">مصفوفة التجهيز</span>
                  </div>
                  <span className="nums rounded-full bg-primary-container px-3 py-1 text-caption font-bold text-on-primary-container">
                    الجاهزية ٧٥٪
                  </span>
                </div>
                <div className="space-y-sm">
                  {[
                    { t: "الضمان الابتدائي", c: "مالي" as const, s: "جاهز" as const },
                    { t: "شهادة السعودة", c: "إداري" as const, s: "قيد التجهيز" as const },
                    { t: "خطة الصيانة الوقائية", c: "فني" as const, s: "ناقص" as const },
                  ].map((r) => (
                    <div
                      key={r.t}
                      className="flex items-center justify-between gap-sm rounded-lg border border-outline-variant bg-surface-container-low p-sm"
                    >
                      <div className="flex items-center gap-sm">
                        <CategoryBadge category={r.c} />
                        <span className="text-label-md text-on-surface">{r.t}</span>
                      </div>
                      <StatusBadge status={r.s} />
                    </div>
                  ))}
                </div>
                <div className="ai-processing mt-md rounded-lg border-2 border-primary-container/40 bg-primary-container/5 p-sm">
                  <div className="flex items-center gap-sm text-label-sm text-primary">
                    <Icon name="neurology" filled className="text-[1.1rem]" />
                    تحليل الذكاء الاصطناعي · المصدر صفحة ٤٥ · ثقة ٩٨٪
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* شريط الثقة */}
        <section className="border-y border-outline-variant bg-surface-container-low">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-md px-gutter py-lg text-center md:grid-cols-4">
            {[
              { k: "٨٥٬٩٠٠+", v: "منافسة سنوياً" },
              { k: "٢٠٠ صفحة", v: "تُحلَّل في دقائق" },
              { k: "٥ فئات", v: "متطلبات منظّمة" },
              { k: "RTL", v: "تصدير عربي احترافي" },
            ].map((s) => (
              <div key={s.v}>
                <p className="nums text-headline-md font-bold text-primary">{s.k}</p>
                <p className="text-label-md text-on-surface-variant">{s.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* المميزات */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-gutter py-2xl">
          <SectionHeading
            eyebrow="المميزات"
            title="كل ما تحتاجه لتجهيز عرض فائز"
            desc="من قراءة الكرّاسة حتى تصدير الحزمة — أدوات مصمّمة لطبيعة منافسات اعتماد."
          />
          <div className="mt-xl grid gap-md sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-e2"
              >
                <span className="grid size-12 place-items-center rounded-lg bg-primary-fixed text-on-primary-fixed transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  <Icon name={f.icon} className="text-[1.5rem]" />
                </span>
                <h3 className="mt-md text-title-md text-on-surface">{f.title}</h3>
                <p className="mt-xs text-body-md leading-relaxed text-on-surface-variant">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* كيف يعمل */}
        <section id="how" className="scroll-mt-20 bg-surface-container-low py-2xl">
          <div className="mx-auto max-w-6xl px-gutter">
            <SectionHeading
              eyebrow="كيف يعمل"
              title="أربع خطوات من الكرّاسة إلى الحزمة"
            />
            <div className="mt-xl grid gap-md md:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.title} className="relative">
                  {i < steps.length - 1 && (
                    <span className="absolute -start-3 top-6 hidden h-px w-6 bg-outline-variant md:block" />
                  )}
                  <div className="h-full rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-lg bg-primary text-on-primary">
                        <Icon name={s.icon} className="text-[1.4rem]" />
                      </span>
                      <span className="nums text-display-md font-bold text-surface-tint">
                        {s.n}
                      </span>
                    </div>
                    <h3 className="mt-md text-title-md text-on-surface">{s.title}</h3>
                    <p className="mt-xs text-label-md leading-relaxed text-on-surface-variant">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* الأمان */}
        <section id="security" className="mx-auto max-w-6xl scroll-mt-20 px-gutter py-2xl">
          <div className="overflow-hidden rounded-2xl bg-primary text-on-primary">
            <div className="grid gap-xl p-xl lg:grid-cols-[1.2fr_1fr] lg:p-2xl">
              <div className="space-y-md">
                <span className="inline-flex items-center gap-sm rounded-full bg-on-primary/10 px-md py-1.5 text-label-sm">
                  <Icon name="verified_user" filled className="text-[1.1rem]" />
                  الأمان قيمة، لا متطلب تقني فقط
                </span>
                <h2 className="text-headline-lg">ملفاتك محمية من المنافسين بالتصميم</h2>
                <p className="max-w-lg text-body-lg text-on-primary/80">
                  لأن مخاوف تسريب العروض حقيقية، بنينا الحماية في صميم المنتج: عزل كامل
                  لكل شركة، وتشفير، وتحقّق بخطوتين، وسجلات تدقيق غير قابلة للتلاعب.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-md">
                {securityPoints.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl bg-on-primary/[0.08] p-md backdrop-blur-sm"
                  >
                    <Icon name={p.icon} className="text-[1.5rem] text-primary-fixed-dim" />
                    <h4 className="mt-sm text-title-md">{p.title}</h4>
                    <p className="mt-0.5 text-label-md text-on-primary/70">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* الباقات */}
        <section id="pricing" className="scroll-mt-20 bg-surface-container-low py-2xl">
          <div className="mx-auto max-w-6xl px-gutter">
            <SectionHeading
              eyebrow="الباقات"
              title="اشتراك بالكرّاسة — ادفع لما تجهّزه"
              desc="لا رسوم على عدد المستخدمين. المرفقات التابعة لنفس المنافسة لا تُحتسب كرّاسة إضافية."
            />
            <div className="mt-xl grid gap-md lg:grid-cols-3">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={
                    p.featured
                      ? "relative rounded-2xl border-2 border-primary bg-surface-container-lowest p-lg shadow-e3"
                      : "rounded-2xl border border-outline-variant bg-surface-container-lowest p-lg"
                  }
                >
                  {p.featured && (
                    <span className="absolute -top-3 right-lg rounded-full bg-primary px-md py-1 text-caption font-bold text-on-primary">
                      الأكثر اختياراً
                    </span>
                  )}
                  <h3 className="text-title-lg text-on-surface">{p.name}</h3>
                  <p className="text-label-md text-on-surface-variant">{p.tagline}</p>
                  <p className="mt-md text-headline-md font-bold text-primary">{p.quota}</p>
                  <ul className="mt-md space-y-sm">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-sm text-label-md">
                        <Icon
                          name="check_circle"
                          filled
                          className="text-[1.15rem] text-success"
                        />
                        <span className="text-on-surface">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <LinkButton
                    href="/dashboard"
                    variant={p.featured ? "primary" : "outline"}
                    className="mt-lg w-full"
                  >
                    ابدأ بـ {p.name}
                  </LinkButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* الأسئلة الشائعة */}
        <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-gutter py-2xl">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="أسئلة يطرحها عملاؤنا" />
          <div className="mt-xl">
            <FAQ />
          </div>
        </section>

        {/* CTA ختامي */}
        <section className="mx-auto max-w-6xl px-gutter pb-2xl">
          <div className="flex flex-col items-center gap-md rounded-2xl border border-outline-variant bg-surface-container-lowest px-gutter py-2xl text-center">
            <h2 className="text-headline-lg text-on-surface">
              جاهز لتجهيز عرضك القادم؟
            </h2>
            <p className="max-w-xl text-body-lg text-on-surface-variant">
              ابدأ تجربة لوحة التطبيق الآن واستكشف مصفوفة التجهيز على منافسة حقيقية.
            </p>
            <LinkButton href="/dashboard" size="lg" icon="arrow_back">
              ابدأ الآن
            </LinkButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-label-md font-semibold text-primary">{eyebrow}</p>
      <h2 className="mt-xs text-headline-lg text-on-surface">{title}</h2>
      {desc && <p className="mt-sm text-body-lg text-on-surface-variant">{desc}</p>}
    </div>
  );
}
