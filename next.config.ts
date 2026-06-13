import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // تصدير ثابت بالكامل — يصلح للاستضافة على Hostinger (لا يحتاج خادم Node).
  output: "export",
  // كل مسار كمجلد فيه index.html ليخدمه Apache مباشرة (system.tarsya.net/login/).
  trailingSlash: true,
  // لا تحسين صور وقت الطلب (مطلوب للتصدير الثابت).
  images: { unoptimized: true },
  // تثبيت جذر Turbopack على مجلد التطبيق (يوجد lockfile في مجلد أب).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
