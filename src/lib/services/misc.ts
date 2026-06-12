import { db, Row, WriteResult } from "@/lib/db";

export interface TestimonialDTO {
  id: number;
  userName: string;
  designation: string;
  companyName: string;
  rating: number;
  text: string;
}

export async function getTestimonials(): Promise<TestimonialDTO[]> {
  const [rows] = await db.query<(Row & {
    Id: number; UserName: string; Designation: string | null;
    CompanyName: string | null; Rating: number | null; Text: string;
  })[]>(
    `SELECT Id, UserName, Designation, CompanyName, Rating, Text
       FROM testimonials_master
      ORDER BY Id DESC`
  );
  return rows.map((r) => ({
    id: r.Id,
    userName: r.UserName,
    designation: r.Designation ?? "",
    companyName: r.CompanyName ?? "",
    rating: r.Rating ?? 5,
    text: r.Text,
  }));
}

export const REQUEST_TYPES = [
  "contact", "sample", "enquiry", "spk-with-analyst", "req-customization", "methodology",
] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

export interface CreateRequestInput {
  type: RequestType;
  name: string;
  email: string;
  phone?: string;
  firmName?: string;
  designation?: string;
  country?: string;
  subject?: string;
  message?: string;
  reportId?: number;
}

export async function createRequest(input: CreateRequestInput, ip?: string): Promise<number> {
  const [result] = await db.query<WriteResult>(
    `INSERT INTO request_master
       (report_id, name, email, phone, firm_name, designation, country, subject, message, type, ip, created_at)
     VALUES (:reportId, :name, :email, :phone, :firmName, :designation, :country, :subject, :message, :type, :ip, NOW())`,
    {
      reportId: input.reportId ?? null,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      firmName: input.firmName ?? null,
      designation: input.designation ?? null,
      country: input.country ?? null,
      subject: input.subject ?? null,
      message: input.message ?? null,
      type: input.type,
      ip: ip ?? null,
    }
  );
  return result.insertId;
}
