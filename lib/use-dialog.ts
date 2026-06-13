import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * إدارة إمكانية الوصول لنافذة/درج حواري:
 * - إغلاق بمفتاح Escape
 * - حصر التركيز (focus trap) داخل اللوحة عند الفتح
 * - نقل التركيز لأول عنصر عند الفتح، وإعادته للعنصر المُطلِق عند الإغلاق
 * أرجِع المرجع وألصِقه بعنصر اللوحة (مع role="dialog" aria-modal="true").
 */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  // مزامنة آخر onClose بعد كل رندر (لا يُقرأ/يُكتب الـ ref أثناء الرندر)
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const panel = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null,
          )
        : [];

    (focusables()[0] ?? panel)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) {
        e.preventDefault();
        panel?.focus();
        return;
      }
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return ref;
}
