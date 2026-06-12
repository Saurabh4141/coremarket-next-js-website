import { db, Row, bitToBool, splitList } from "@/lib/db";

/** Industry/SubIndustry shapes mirror src/data/industries.ts, with `icon` as a
 *  lucide icon NAME (string) so values can cross the server->client boundary. */
export interface SubIndustryDTO {
  id: string;
  industryId: string;
  icon: string;
  name: string;
  rephrasedName: string;
  path: string;
  initial: string;
  seo: string;
  image: string;
  color: string;
  description: string;
  marketSize: string;
  growthRate: string;
  topPlayers: string[];
  marketSizeValue: number;
  growthRateValue: number;
  overview: string;
  priority: number;
  isActive: boolean;
}

export interface IndustryDTO extends Omit<SubIndustryDTO, "industryId"> {
  keyInsights: string[];
  subIndustries: SubIndustryDTO[];
}

interface IndustryRow extends Row {
  id: number;
  name: string;
  rephrased_name: string | null;
  slug: string;
  initial: string | null;
  seo_title: string | null;
  seo_description: string | null;
  image_Path: string | null;
  icon: string | null;
  color: string | null;
  description: string | null;
  market_size: string | null;
  growth_rate: string | null;
  top_players: string | null;
  market_size_value: string | null;
  growth_rate_value: string | null;
  overview: string | null;
  priority: number | null;
  isActive: Buffer | number;
}

const mapSub = (r: IndustryRow & { industry_slug: string }): SubIndustryDTO => ({
  id: r.slug,
  industryId: r.industry_slug,
  icon: r.icon ?? "",
  name: r.name,
  rephrasedName: r.rephrased_name ?? r.name,
  path: r.slug,
  initial: r.initial ?? "",
  seo: r.seo_title ?? "",
  image: r.image_Path ?? "",
  color: r.color ?? "",
  description: r.description ?? "",
  marketSize: r.market_size ?? "",
  growthRate: r.growth_rate ?? "",
  topPlayers: splitList(r.top_players),
  marketSizeValue: Number(r.market_size_value ?? 0),
  growthRateValue: Number(r.growth_rate_value ?? 0),
  overview: r.overview ?? "",
  priority: r.priority ?? 0,
  isActive: bitToBool(r.isActive),
});

export async function getIndustries(): Promise<IndustryDTO[]> {
  const [industries] = await db.query<IndustryRow[]>(
    `SELECT id, name, rephrased_name, slug, initial, seo_title, seo_description,
            image_Path, icon, color, description, market_size, growth_rate,
            top_players, market_size_value, growth_rate_value, overview,
            priority, isActive
       FROM industries_master
      WHERE isActive = 1
      ORDER BY priority IS NULL, priority, name`
  );
  const [subs] = await db.query<(IndustryRow & { industry_id: number; image_path: string | null })[]>(
    `SELECT s.*, i.slug AS industry_slug
       FROM sub_industries_master s
       JOIN industries_master i ON i.id = s.industry_id
      WHERE s.isActive = 1
      ORDER BY s.priority IS NULL, s.priority, s.name`
  );

  return industries.map((r) => ({
    ...mapSub({ ...r, image_Path: r.image_Path ?? null, industry_slug: r.slug }),
    keyInsights: [],
    subIndustries: subs
      .filter((s) => s.industry_id === r.id)
      .map((s) => mapSub({ ...s, image_Path: s.image_path ?? null, industry_slug: r.slug })),
  }));
}

export async function getIndustryBySlug(slug: string): Promise<IndustryDTO | null> {
  const all = await getIndustries();
  return all.find((i) => i.path === slug) ?? null;
}
