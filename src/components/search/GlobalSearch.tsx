"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import type { Report } from "@/data/reports";

/** Same URL shape the industry listing uses: 3 segments when we know the
 *  industry/sub-industry, bare slug otherwise. */
const reportHref = (r: Report): string =>
  r.industry && r.sub_industry
    ? `/report/${r.industry}/${r.sub_industry}/${r.slug}`
    : `/report/${r.slug}`;

const MIN_CHARS = 2;

export const GlobalSearch = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  /** The query the current `results` belong to; drives the loading state
   *  without setting state synchronously inside the effect. */
  const [settledQuery, setSettledQuery] = useState("");
  // Guards against a slow earlier response overwriting a newer one.
  const reqId = useRef(0);
  const router = useRouter();

  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_CHARS && trimmed !== settledQuery;

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setTotal(0);
    setSettledQuery("");
    onClose();
  };

  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_CHARS) return;

    const id = ++reqId.current;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/reports?q=${encodeURIComponent(q)}&limit=8`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (id !== reqId.current) return;
        setResults(Array.isArray(data.items) ? data.items : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setSettledQuery(q);
      } catch {
        // A newer keystroke aborted this request; the newer one will settle.
        if (controller.signal.aborted || id !== reqId.current) return;
        setResults([]);
        setTotal(0);
        setSettledQuery(q);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
        onClick={handleClose}
      >
        <div className="container mx-auto px-4 h-full flex items-start justify-center pt-32">
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports, industries, services..."
                className="h-12 text-base"
              />
              <button
                onClick={handleClose}
                aria-label="Close search"
                className="p-2 hover:bg-muted rounded-lg shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {trimmed.length < MIN_CHARS ? (
              <p className="text-sm text-muted-foreground">
                Start typing to search across the website
              </p>
            ) : searching ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching…
              </p>
            ) : results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No reports found for &ldquo;{trimmed}&rdquo;
              </p>
            ) : (
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  {total.toLocaleString("en-US")} result{total === 1 ? "" : "s"}
                  {total > results.length ? ` — showing first ${results.length}` : ""}
                </p>
                <ul className="max-h-[50vh] overflow-y-auto divide-y divide-border">
                  {results.map((r) => (
                    <li key={`${r.industry}/${r.slug}`}>
                      <Link
                        href={reportHref(r)}
                        // Closing unmounts this Link, which would cancel its own
                        // navigation — so route explicitly after closing.
                        onClick={(e) => {
                          e.preventDefault();
                          handleClose();
                          router.push(reportHref(r));
                        }}
                        className="flex items-start gap-3 py-3 px-2 -mx-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <FileText className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground line-clamp-2">
                            {r.title}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5">
                            {[r.industry, r.date, r.pages ? `${r.pages} pages` : ""]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
