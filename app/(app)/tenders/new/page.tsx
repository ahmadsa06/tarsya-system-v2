import type { Metadata } from "next";
import { NewTenderForm } from "@/components/app/new-tender-form";

export const metadata: Metadata = { title: "رفع كرّاسة جديدة" };

export default function NewTenderPage() {
  return <NewTenderForm />;
}
