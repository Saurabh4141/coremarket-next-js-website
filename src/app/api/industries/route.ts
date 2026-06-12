import { getIndustries } from "@/lib/services/industries";

export async function GET() {
  try {
    const data = await getIndustries();
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/industries failed", e);
    return Response.json({ success: false, message: "Failed to fetch industries" }, { status: 500 });
  }
}
