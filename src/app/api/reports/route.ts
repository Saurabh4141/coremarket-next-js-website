import type { NextRequest } from "next/server";
import { getReports } from "@/lib/services/reports";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams;
    const data = await getReports({
      industrySlug: q.get("industry") ?? undefined,
      subIndustrySlug: q.get("sub_industry") ?? undefined,
      search: q.get("q") ?? undefined,
      page: q.get("page") ? Number(q.get("page")) : undefined,
      pageSize: q.get("limit") ? Number(q.get("limit")) : undefined,
    });
    return Response.json({ success: true, ...data });
  } catch (e) {
    console.error("GET /api/reports failed", e);
    return Response.json({ success: false, message: "Failed to fetch reports" }, { status: 500 });
  }
}
