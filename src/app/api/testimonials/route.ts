import { getTestimonials } from "@/lib/services/misc";

export async function GET() {
  try {
    const data = await getTestimonials();
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/testimonials failed", e);
    return Response.json({ success: false, message: "Failed to fetch testimonials" }, { status: 500 });
  }
}
