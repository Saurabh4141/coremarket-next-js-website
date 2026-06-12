import type { Metadata } from "next";
import ReportDetail from "@/modules/Reports";
import { getMergedReportDetail } from "@/lib/services/reports";

// Both URL shapes: /report/:slug and /report/:industry/:subIndustry/:reportSlug.
const slugFromSegments = (segments: string[]): string | undefined => {
  const parts = (segments ?? []).map((s) => decodeURIComponent(s));
  if (parts.length === 1) return parts[0];
  if (parts.length === 3) return parts[2];
  return undefined;
};

export async function generateMetadata(
  { params }: { params: Promise<{ segments: string[] }> }
): Promise<Metadata> {
  const { segments } = await params;
  const slug = slugFromSegments(segments);
  const report = slug ? await getMergedReportDetail(slug) : null;
  if (!report) return { title: "Market Research Report | CoreMarket Research" };
  return {
    title: report.seo_title || `${report.title} | CoreMarket Research`,
    description: report.seo_description || report.summary,
  };
}

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const slug = slugFromSegments(segments);
  const report = slug ? await getMergedReportDetail(slug) : null;
  // If the slug isn't in the DB, fall back to the client component's own static
  // resolution by rendering it without a report prop.
  return <ReportDetail report={report ?? undefined} />;
}
