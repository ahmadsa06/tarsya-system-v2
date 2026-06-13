import type { Metadata } from "next";
import {
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

const latin = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-latin",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ترسية — تجهيز عروض منافسات اعتماد بكفاءة وامتثال",
    template: "%s · ترسية",
  },
  description:
    "منصة ذكية تساعد الشركات على تحليل كرّاسات منافسات منصة اعتماد، وتجهيز العروض الفنية والمالية المنظّمة، وتصدير حزمة جاهزة بجودة عربية عالية — مع عزل صارم للبيانات وتحقّق بخطوتين.",
  keywords: [
    "اعتماد",
    "منافسات حكومية",
    "عروض فنية",
    "كراسة الشروط",
    "تجهيز العطاءات",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabic.variable} ${latin.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          خط أيقونات Material Symbols (ليس خط نص) يُحمَّل مرة واحدة في الجذر.
          display=block مقصود لتفادي ظهور اسم الأيقونة كنص قبل تحميل الخط.
          القاعدتان أدناه لا تنطبقان على خطوط الأيقونات في App Router.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
