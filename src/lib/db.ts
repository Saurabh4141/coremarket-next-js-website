import mysql, { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

// In dev, Turbopack HMR re-evaluates modules; keep one pool per process.
const globalForDb = globalThis as unknown as { __dbPool?: Pool };

export const db: Pool =
  globalForDb.__dbPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT ?? 3306),
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  });

if (process.env.NODE_ENV !== "production") globalForDb.__dbPool = db;

export type Row = RowDataPacket;
export type WriteResult = ResultSetHeader;

/** MySQL bit(1) arrives as a Buffer; tinyint as number. */
export const bitToBool = (v: unknown): boolean => {
  if (Buffer.isBuffer(v)) return v[0] === 1;
  return Boolean(v);
};

/** Parse a JSON/longtext column defensively; mysql2 auto-parses `json` columns. */
export const parseJsonSafe = <T>(v: unknown, fallback: T): T => {
  if (v == null) return fallback;
  if (typeof v === "object") return v as T;
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jan 2024" — deterministic (UTC), matching the existing UI date style. */
export const monthYear = (d: Date | string | null): string => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return typeof d === "string" ? d : "";
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

/** "Jan 20, 2024" — blog card style. */
export const monthDayYear = (d: Date | string | null): string => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return typeof d === "string" ? d : "";
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

/** "$3,900" from an integer price. */
export const formatPrice = (n: number | null, currency = "$"): string =>
  n == null ? "" : `${currency}${n.toLocaleString("en-US")}`;

/** "a, b, c" -> ["a","b","c"] */
export const splitList = (s: string | null): string[] =>
  s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [];
