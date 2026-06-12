import { Suspense } from "react";
import Checkout from "@/modules/Checkout";
import { getReportSummaryBySlug } from "@/lib/services/reports";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReportSummaryBySlug(slug);
  return (
    <Suspense>
      <Checkout report={report ?? undefined} />
    </Suspense>
  );
}
