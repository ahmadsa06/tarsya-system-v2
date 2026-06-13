"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleOtp(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  }

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  function handlePaste(i: number, e: React.ClipboardEvent<HTMLInputElement>) {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    e.preventDefault();
    const next = [...code];
    for (let k = 0; k < digits.length && i + k < 6; k++) next[i + k] = digits[k];
    setCode(next);
    inputs.current[Math.min(i + digits.length, 5)]?.focus();
  }

  const otpComplete = code.every((c) => c !== "");

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* نموذج الدخول */}
      <div className="flex items-center justify-center px-gutter py-2xl">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-2xl inline-block">
            <Logo />
          </Link>

          {step === "credentials" ? (
            <form
              className="rise-in space-y-lg"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
              }}
            >
              <div>
                <h1 className="text-headline-md text-on-surface">تسجيل الدخول</h1>
                <p className="mt-xs text-body-md text-on-surface-variant">
                  أدخل بياناتك للوصول إلى بوابة شركتك.
                </p>
              </div>

              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  icon="mail"
                  placeholder="name@company.sa"
                  defaultValue="ahmad@alomran.sa"
                  required
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-caption text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                  <Label htmlFor="pass">كلمة المرور</Label>
                </div>
                <Input
                  id="pass"
                  type="password"
                  icon="lock"
                  placeholder="••••••••"
                  defaultValue="demo-password"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" icon="login">
                متابعة
              </Button>

              <p className="text-center text-caption text-on-surface-variant">
                محميّ بتحقّق بخطوتين إلزامي للأدوار الحساسة.
              </p>
            </form>
          ) : (
            <div className="rise-in space-y-lg">
              <button
                onClick={() => setStep("credentials")}
                className="flex items-center gap-xs text-label-md text-on-surface-variant hover:text-primary"
              >
                <Icon name="arrow_forward" className="text-[1.2rem]" />
                رجوع
              </button>

              <div className="flex items-center gap-md">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-fixed text-on-primary-fixed">
                  <Icon name="phonelink_lock" className="text-[1.5rem]" />
                </span>
                <div>
                  <h1 className="text-headline-md text-on-surface">التحقّق بخطوتين</h1>
                  <p id="otp-hint" className="text-body-md text-on-surface-variant">
                    أدخل الرمز من تطبيق المصادقة.
                  </p>
                </div>
              </div>

              <div
                role="group"
                aria-label="رمز التحقّق المكوّن من ٦ أرقام"
                aria-describedby="otp-hint"
                className="flex justify-center gap-sm"
                dir="ltr"
              >
                {code.map((c, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={c}
                    onChange={(e) => handleOtp(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    onPaste={(e) => handlePaste(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`الخانة ${i + 1}`}
                    className="nums size-12 rounded-lg border border-outline-variant bg-surface-container-low text-center text-title-lg font-bold text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                ))}
              </div>

              <Button
                size="lg"
                className="w-full"
                icon="verified_user"
                iconFilled
                disabled={!otpComplete}
                onClick={() => router.push("/dashboard")}
              >
                تحقّق ودخول
              </Button>

              <div className="space-y-xs text-center">
                <button className="text-caption text-primary hover:underline">
                  إعادة إرسال الرمز
                </button>
                <p className="text-caption text-on-surface-variant">
                  فقدت جهازك؟{" "}
                  <Link href="#" className="text-primary hover:underline">
                    استخدم رمز احتياطي
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* مؤشر الخطوات */}
          <div className="mt-2xl flex items-center justify-center gap-sm">
            <span
              className={`h-1.5 rounded-full transition-all ${step === "credentials" ? "w-8 bg-primary" : "w-1.5 bg-outline-variant"}`}
            />
            <span
              className={`h-1.5 rounded-full transition-all ${step === "otp" ? "w-8 bg-primary" : "w-1.5 bg-outline-variant"}`}
            />
          </div>
        </div>
      </div>

      {/* لوحة العلامة */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 80% 20%, color-mix(in srgb, var(--color-primary-fixed) 60%, transparent), transparent)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-2xl text-on-primary">
          <Logo invert />
          <div className="space-y-lg">
            <h2 className="text-headline-lg leading-snug">
              جهّز عروض منافسات اعتماد
              <br />
              بثقة وامتثال.
            </h2>
            <ul className="space-y-md">
              {[
                { icon: "shield", t: "عزل صارم لبيانات كل شركة" },
                { icon: "neurology", t: "تحليل عربي ذكي للكرّاسات" },
                { icon: "verified_user", t: "تحقّق بخطوتين وسجلات تدقيق" },
              ].map((f) => (
                <li key={f.t} className="flex items-center gap-sm">
                  <span className="grid size-9 place-items-center rounded-lg bg-on-primary/10">
                    <Icon name={f.icon} className="text-[1.25rem] text-primary-fixed-dim" />
                  </span>
                  <span className="text-body-md text-on-primary/90">{f.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-caption text-on-primary/60">
            منتج مستقل، غير تابع لمنصة اعتماد الحكومية.
          </p>
        </div>
      </div>
    </div>
  );
}
