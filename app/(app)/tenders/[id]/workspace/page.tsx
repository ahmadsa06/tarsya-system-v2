import type { Metadata } from "next";
import { WorkspaceView } from "@/components/app/workspace-view";
import { tenders } from "@/lib/data";

export const metadata: Metadata = { title: "مساحة العمل" };

export function generateStaticParams() {
  return tenders.map((t) => ({ id: t.id }));
}
export const dynamicParams = false;

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tender = tenders.find((t) => t.id === id) ?? tenders[0];
  return <WorkspaceView tender={tender} />;
}
