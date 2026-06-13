import type { Metadata } from "next";
import { MatrixView } from "@/components/app/matrix-view";
import { requirements, tenders } from "@/lib/data";

export const metadata: Metadata = { title: "مصفوفة التجهيز" };

export function generateStaticParams() {
  return tenders.map((t) => ({ id: t.id }));
}
export const dynamicParams = false;

export default async function MatrixPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tender = tenders.find((t) => t.id === id) ?? tenders[0];
  return <MatrixView tender={tender} requirements={requirements} />;
}
