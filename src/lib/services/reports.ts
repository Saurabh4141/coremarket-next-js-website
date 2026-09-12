import { db, Row, bitToBool, parseJsonSafe, monthYear, formatPrice } from "@/lib/db";
import type { Report } from "@/data/reports";
import { type ReportDetail, getDefaultReportDetail } from "@/data/reportDetails";

interface ReportListRow extends Row {
  id: number;
  industry_id: number;
  sub_industry_id: number | null;
  industry_slug: string | null;
  sub_industry_slug: string | null;
  name: string | null;
  slug: string | null;
  publish_at: Date | null;
  created_at: Date;
  growth_rate: string | null;
  pages: number | null;
  single_user_price: number | null;
  base_year: string | null;
  forecast_year: string | null;
  base_year_value: string | null;
  forecast_year_value: string | null;
  regions: string | null;
  companies_mentioned: unknown;
}

const LIST_SELECT = `
  SELECT r.id, r.industry_id, r.sub_industry_id, r.name, r.slug,
         r.publish_at, r.created_at, r.growth_rate, r.pages, r.single_user_price,
         r.base_year, r.forecast_year, r.base_year_value, r.forecast_year_value,
         r.regions, i.slug AS industry_slug, s.slug AS sub_industry_slug,
         d.companies_mentioned
    FROM report_master r
    JOIN industries_master i ON i.id = r.industry_id
    LEFT JOIN sub_industries_master s ON s.id = r.sub_industry_id
    LEFT JOIN report_desc_master d ON d.report_id = r.id AND d.is_active = 1
   WHERE r.is_active = 1`;

/** DB slugs are stored with a "report/" prefix; site URLs use the bare slug. */
const cleanSlug = (s: string | null): string => (s ?? "").replace(/^report\//, "");

/** Content columns hold arrays that are either plain strings or objects like
 *  {text:"..."} (drivers/findings) or {company_name:"..."} (companies).
 *  Normalize any of those shapes to a string[]. */
const toStringList = (v: unknown, ...keys: string[]): string[] => {
  const arr = parseJsonSafe<unknown[]>(v, []);
  if (!Array.isArray(arr)) return [];
  return arr
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        for (const k of keys) {
          const val = (item as Record<string, unknown>)[k];
          if (typeof val === "string" && val) return val;
        }
      }
      return "";
    })
    .filter(Boolean);
};

const mapListRow = (r: ReportListRow): Report => ({
  industry_id: r.industry_id,
  sub_industry_id: r.sub_industry_id,
  industry: r.industry_slug ?? "",
  sub_industry: r.sub_industry_slug ?? "",
  title: r.name ?? "",
  slug: cleanSlug(r.slug),
  date: monthYear(r.publish_at ?? r.created_at),
  growth: r.growth_rate ?? "",
  pages: r.pages ?? 0,
  price: formatPrice(r.single_user_price),
  market_size: r.base_year_value ?? "",
  forecast_size: r.forecast_year_value ?? "",
  forecast_period: r.base_year && r.forecast_year ? `${r.base_year}-${r.forecast_year}` : "",
  regions_covered: r.regions ?? "",
  major_players: toStringList(r.companies_mentioned, "company_name", "name").slice(0, 4).join(", "),
});

export interface ReportListResult {
  items: Report[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getReports(opts: {
  industrySlug?: string;
  subIndustrySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<ReportListResult> {
  // Coerce to a whole number and fall back to the default: a non-numeric
  // ?page=/?limit= would otherwise reach the SQL as NaN and throw.
  const toInt = (v: number | undefined, fallback: number) =>
    Number.isFinite(v) ? Math.floor(v as number) : fallback;

  const page = Math.max(1, toInt(opts.page, 1));
  const pageSize = Math.min(50, Math.max(1, toInt(opts.pageSize, 9)));

  const where: string[] = [];
  const params: Record<string, string> = {};
  if (opts.industrySlug) { where.push("i.slug = :industry"); params.industry = opts.industrySlug; }
  if (opts.subIndustrySlug) { where.push("s.slug = :sub"); params.sub = opts.subIndustrySlug; }
  if (opts.search) { where.push("r.name LIKE :q"); params.q = `%${opts.search}%`; }
  const filter = where.length ? ` AND ${where.join(" AND ")}` : "";

  const [[{ total }]] = await db.query<(Row & { total: number })[]>(
    `SELECT COUNT(*) AS total
       FROM report_master r
       JOIN industries_master i ON i.id = r.industry_id
       LEFT JOIN sub_industries_master s ON s.id = r.sub_industry_id
      WHERE r.is_active = 1${filter}`,
    params
  );

  const [rows] = await db.query<ReportListRow[]>(
    `${LIST_SELECT}${filter}
     ORDER BY COALESCE(r.publish_at, r.created_at) DESC, r.id DESC
     LIMIT :offset, :limit`,
    { ...params, offset: (page - 1) * pageSize, limit: pageSize }
  );

  return { items: rows.map(mapListRow), total, page, pageSize };
}

/** Single report in list shape (with DB price) — used by the checkout page. */
export async function getReportSummaryBySlug(slug: string): Promise<Report | null> {
  const [rows] = await db.query<ReportListRow[]>(
    `${LIST_SELECT}
       AND (r.slug = :slug OR r.slug = CONCAT('report/', :slug))
     LIMIT 1`,
    { slug }
  );
  return rows.length ? mapListRow(rows[0]) : null;
}

interface TocChapter { number: number; title: string; sections: string[] }
interface Competitor { company: string; market_share?: string; headquarters: string; key_strategies: string[] }
interface Faq { question: string; answer: string }

export async function getReportBySlug(slug: string): Promise<ReportDetail | null> {
  const [rows] = await db.query<(ReportListRow & Row)[]>(
    `SELECT r.*, i.slug AS industry_slug, s.slug AS sub_industry_slug,
            d.companies_mentioned, d.regions_covered AS desc_regions,
            d.market_analysis, d.key_findings, d.market_drivers,
            d.market_challenges, d.market_opportunities, d.segmentation,
            d.toc_chapters, d.competitive_landscape, d.faq, d.last_updated
       FROM report_master r
       JOIN industries_master i ON i.id = r.industry_id
       LEFT JOIN sub_industries_master s ON s.id = r.sub_industry_id
       LEFT JOIN report_desc_master d ON d.report_id = r.id AND d.is_active = 1
      WHERE r.is_active = 1
        AND (r.slug = :slug OR r.slug = CONCAT('report/', :slug))
      LIMIT 1`,
    { slug }
  );
  if (!rows.length) return null;
  const r = rows[0];

  const lastUpdated = r.last_updated instanceof Date
    ? r.last_updated.toISOString().slice(0, 10)
    : (r.updated_at instanceof Date ? r.updated_at.toISOString().slice(0, 10) : "");

  return {
    id: r.id,
    industry_id: r.industry_id,
    sub_industry_id: r.sub_industry_id,
    industry: r.industry_slug ?? "",
    sub_industry: r.sub_industry_slug ?? "",
    title: r.name ?? "",
    slug: cleanSlug(r.slug),
    summary: (r.summary as string) ?? "",
    base_year: Number(r.base_year) || 0,
    forecast_year: Number(r.forecast_year) || 0,
    base_year_value: r.base_year_value ?? "",
    forecast_year_value: r.forecast_year_value ?? "",
    cagr: r.growth_rate ?? "",
    pages: r.pages ?? 0,
    companies_mentioned: toStringList(r.companies_mentioned, "company_name", "name"),
    regions_covered: toStringList(r.desc_regions, "region", "name").length
      ? toStringList(r.desc_regions, "region", "name")
      : (r.regions ? String(r.regions).split(",").map((x: string) => x.trim()).filter(Boolean) : []),
    price_single_user: formatPrice(r.single_user_price),
    price_multi_user: formatPrice(r.multi_user_price as number | null),
    price_enterprise: formatPrice(r.corp_user_price as number | null),
    seo_title: (r.seo_title as string) ?? "",
    seo_description: (r.seo_description as string) ?? "",
    seo_keywords: r.seo_keywords ? String(r.seo_keywords).split(",").map((x: string) => x.trim()) : [],
    market_analysis: (r.market_analysis as string) ?? "",
    key_findings: toStringList(r.key_findings, "text", "finding"),
    market_drivers: toStringList(r.market_drivers, "text", "driver"),
    market_challenges: toStringList(r.market_challenges, "text", "challenge"),
    market_opportunities: toStringList(r.market_opportunities, "text", "opportunity"),
    segmentation: parseJsonSafe<ReportDetail["segmentation"]>(r.segmentation, {}),
    toc_chapters: parseJsonSafe<TocChapter[]>(r.toc_chapters, []),
    competitive_landscape: parseJsonSafe<Competitor[]>(r.competitive_landscape, []),
    faq: parseJsonSafe<Faq[]>(r.faq, []),
    publication_date: r.publish_at instanceof Date ? r.publish_at.toISOString().slice(0, 10) : "",
    last_updated: lastUpdated,
    is_active: bitToBool(r.is_active),
    created_by: String(r.created_by ?? ""),
    media: [],
  };
}

/**
 * Report detail for the page: DB supplies core fields, prices, market analysis,
 * and companies; the static template (getDefaultReportDetail) supplies the
 * sub-sections that are unpopulated in the DB (FAQ, TOC, segmentation,
 * competitive landscape, drivers) — per the "keep static sub-sections" decision.
 */
export async function getMergedReportDetail(slug: string): Promise<ReportDetail | null> {
  const dbReport = await getReportBySlug(slug);
  if (!dbReport) return null;

  const template = getDefaultReportDetail(
    dbReport.industry,
    dbReport.sub_industry,
    dbReport.slug,
    dbReport.title,
    {
      date: monthYear(dbReport.publication_date || null) || dbReport.publication_date,
      growth: dbReport.cagr,
      pages: dbReport.pages,
      price: dbReport.price_single_user,
    }
  );

  const keep = <T>(dbVal: T[], tplVal: T[]) => (dbVal.length ? dbVal : tplVal);
  const segHasData = Object.values(dbReport.segmentation).some((v) => Array.isArray(v) && v.length);

  return {
    ...template,
    // Real identity + core from DB
    id: dbReport.id,
    industry_id: dbReport.industry_id,
    sub_industry_id: dbReport.sub_industry_id,
    industry: dbReport.industry,
    sub_industry: dbReport.sub_industry,
    title: dbReport.title,
    slug: dbReport.slug,
    summary: dbReport.summary || template.summary,
    base_year: dbReport.base_year || template.base_year,
    forecast_year: dbReport.forecast_year || template.forecast_year,
    base_year_value: dbReport.base_year_value || template.base_year_value,
    forecast_year_value: dbReport.forecast_year_value || template.forecast_year_value,
    cagr: dbReport.cagr || template.cagr,
    pages: dbReport.pages || template.pages,
    // Real prices from DB (seeded)
    price_single_user: dbReport.price_single_user || template.price_single_user,
    price_multi_user: dbReport.price_multi_user || template.price_multi_user,
    price_enterprise: dbReport.price_enterprise || template.price_enterprise,
    // SEO from DB when present
    seo_title: dbReport.seo_title || template.seo_title,
    seo_description: dbReport.seo_description || template.seo_description,
    seo_keywords: dbReport.seo_keywords.length ? dbReport.seo_keywords : template.seo_keywords,
    // Real content from DB
    market_analysis: dbReport.market_analysis || template.market_analysis,
    companies_mentioned: keep(dbReport.companies_mentioned, template.companies_mentioned),
    regions_covered: keep(dbReport.regions_covered, template.regions_covered),
    // Static sub-sections (DB empty) — keep template content
    key_findings: keep(dbReport.key_findings, template.key_findings),
    market_drivers: keep(dbReport.market_drivers, template.market_drivers),
    market_challenges: keep(dbReport.market_challenges, template.market_challenges),
    market_opportunities: keep(dbReport.market_opportunities, template.market_opportunities),
    segmentation: segHasData ? dbReport.segmentation : template.segmentation,
    toc_chapters: keep(dbReport.toc_chapters, template.toc_chapters),
    competitive_landscape: keep(dbReport.competitive_landscape, template.competitive_landscape),
    faq: keep(dbReport.faq, template.faq),
    publication_date: dbReport.publication_date || template.publication_date,
    last_updated: dbReport.last_updated || template.last_updated,
  };
}
