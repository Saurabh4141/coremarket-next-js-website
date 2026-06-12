import type { NextRequest } from "next/server";
import { createRequest, REQUEST_TYPES, RequestType } from "@/lib/services/misc";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const type = (body.type ?? "contact") as RequestType;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!REQUEST_TYPES.includes(type)) {
    return Response.json({ success: false, message: `type must be one of: ${REQUEST_TYPES.join(", ")}` }, { status: 400 });
  }
  if (!name || !email) {
    return Response.json({ success: false, message: "name and email are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ success: false, message: "email is not valid" }, { status: 400 });
  }

  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
    const id = await createRequest(
      {
        type,
        name,
        email,
        phone: typeof body.phone === "string" ? body.phone : undefined,
        firmName: typeof body.firmName === "string" ? body.firmName : undefined,
        designation: typeof body.designation === "string" ? body.designation : undefined,
        country: typeof body.country === "string" ? body.country : undefined,
        subject: typeof body.subject === "string" ? body.subject : undefined,
        message: typeof body.message === "string" ? body.message : undefined,
        reportId: typeof body.reportId === "number" ? body.reportId : undefined,
      },
      ip
    );
    return Response.json({ success: true, id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/requests failed", e);
    return Response.json({ success: false, message: "Failed to save request" }, { status: 500 });
  }
}
