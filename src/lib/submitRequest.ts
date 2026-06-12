/** Client helper to submit a lead/contact request to POST /api/requests. */
export type RequestPayload = {
  type: "contact" | "sample" | "enquiry" | "spk-with-analyst" | "req-customization" | "methodology";
  name: string;
  email: string;
  phone?: string;
  firmName?: string;
  designation?: string;
  country?: string;
  subject?: string;
  message?: string;
  reportId?: number;
};

export async function submitRequest(payload: RequestPayload): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, message: data?.message };
  } catch {
    return { ok: false, message: "Network error" };
  }
}
