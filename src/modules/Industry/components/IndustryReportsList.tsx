import { useState, useMemo, memo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/PaginationControls";
import {
  Search,
  TrendingUp,
  Clock,
  ArrowRight,
  MapPin,
  Star,
  DollarSign,
  BarChart3,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getIndustryDetailBySlug,
  getSubIndustryBySlug,
  getIndustryBySlug,
} from "@/data/industries";
import {
  reportsData,
  getReportsByIndustry,
  getReportsBySubIndustry,
  type Report,
} from "@/data/reports";

/** One report row -> the shape this list renders. `category` is filled in by
 *  the caller, since it depends on how the page was reached. */
const toReportCard = (r: Report) => ({
  title: r.title,
  slug: r.slug,
  date: r.date,
  growth: r.growth,
  pages: r.pages,
  price: r.price,
  industrySlug: r.industry,
  subIndustrySlug: r.sub_industry,
  market_size: r.market_size,
  forecast_size: r.forecast_size,
  forecast_period: r.forecast_period,
  regions_covered: r.regions_covered,
  major_players: r.major_players,
});

// Category color mapping
const categoryColors: Record<string, string> = {
  "Automobile & Transportation": "bg-cyan-100 text-cyan-700",
  "Consumer Products": "bg-purple-100 text-purple-700",
  "Food, Beverage & Nutrition": "bg-orange-100 text-orange-700",
  "Chemicals & Materials": "bg-green-100 text-green-700",
  Technology: "bg-blue-100 text-blue-700",
  "Industrial Automation": "bg-slate-100 text-slate-700",
  "Services & Utilities": "bg-amber-100 text-amber-700",
  Pharmaceutical: "bg-rose-100 text-rose-700",
  "Healthcare IT & Services": "bg-pink-100 text-pink-700",
  "Medical Devices & Consumables": "bg-red-100 text-red-700",
  "Medical Devices": "bg-rose-100 text-rose-700",
  "IT Security & Software": "bg-indigo-100 text-indigo-700",
  "Electronics & Semiconductors": "bg-violet-100 text-violet-700",
  Agriculture: "bg-lime-100 text-lime-700",
  "Packaging & Transport": "bg-yellow-100 text-yellow-700",
  "Energy & Power": "bg-emerald-100 text-emerald-700",
  "Construction & Real Estate": "bg-stone-100 text-stone-700",
  "Daily Necessities": "bg-teal-100 text-teal-700",
  "Aerospace & Defense": "bg-sky-100 text-sky-700",
  "Financial Services": "bg-emerald-100 text-emerald-700",
};

// Single report card component
const ReportCard = memo(
  ({
    report,
  }: {
    report: {
      title: string;
      slug: string;
      date: string;
      growth: string;
      pages: number;
      price: string;
      category: string;
      industrySlug: string;
      subIndustrySlug: string;
      market_size: string;
      forecast_size: string;
      forecast_period: string;
      regions_covered: string;
      major_players: string;
    };
  }) => {
    // Build the full report URL path
    const reportUrl = report.subIndustrySlug
      ? `/report/${report.industrySlug}/${report.subIndustrySlug}/${report.slug}`
      : `/report/${report.slug}`;

    return (
      <article className="p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/30 shadow-sm hover:shadow-md transition-all">
        {/* Category & Growth Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Link
            href={`/industry/${report.industrySlug}`}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity",
              categoryColors[report.category] || "bg-gray-100 text-gray-700",
            )}
          >
            {report.category}
          </Link>
          <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
            CAGR
            <TrendingUp className="w-3 h-3" />
            {report.growth}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
          <Link href={reportUrl} className="hover:underline">
            {report.title}
          </Link>
        </h2>

        <div className="mb-2 flex flex-wrap gap-2">
          {/* Market Size */}
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-3 py-1 text-[12px] uppercase tracking-wide text-muted-foreground font-medium">
            <DollarSign className="w-3.5 h-3.5" />
            Market Size:
            <span className="ml-1 text-foreground font-semibold">
              {report.market_size}
            </span>
          </span>

          {/* Forecast Size */}
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-3 py-1 text-[12px] uppercase tracking-wide text-muted-foreground font-medium">
            <BarChart3 className="w-3.5 h-3.5" />
            Forecast Size:
            <span className="ml-1 text-foreground font-semibold">
              {report.forecast_size}
            </span>
          </span>

          {/* Forecast Period */}
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-3 py-1 text-[12px] uppercase tracking-wide text-muted-foreground font-medium">
            <Calendar className="w-3.5 h-3.5" />
            Forecast:
            <span className="ml-1 text-foreground font-semibold">
              {report.forecast_period}
            </span>
          </span>
        </div>

        <div className="mb-1 flex items-center gap-2 text-xs leading-5 text-[12px] font-normal">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="uppercase tracking-wide text-muted-foreground">
            Regions Covered:
          </span>
          <span className="font-semibold text-foreground text-[12px]">
            {report.regions_covered}
          </span>
        </div>

        <div className="mb-1 flex items-center gap-2 text-xs leading-5 text-[12px] font-normal">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span className="uppercase tracking-wide text-muted-foreground">
            Major Players
          </span>
          <span className="font-semibold text-foreground text-[12px]">
            {report.major_players}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {report.date}
          </span>
          <span>{report.pages} pages</span>
          <span className="font-display font-bold text-foreground text-base">
            {report.price}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link href={`/checkout/${report.slug}`}>
            <Button variant="gradient" size="sm">
              Buy Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href={reportUrl}>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </article>
    );
  },
);

ReportCard.displayName = "ReportCard";

// Main reports list component
const IndustryReportsList = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const detail = slug ? getIndustryDetailBySlug(slug) : null;
  const subIndustryResult = slug ? getSubIndustryBySlug(slug) : null;
  const industryResult = slug ? getIndustryBySlug(slug) : null;

  // Which reports to show, and what to label their category as, depends on
  // whether the slug is a sub-industry, a main industry, or missing entirely.
  const baseReports = useMemo(() => {
    const source = (() => {
      if (slug && subIndustryResult)
        return { reports: getReportsBySubIndustry(slug), category: subIndustryResult.name };
      if (slug && industryResult)
        return { reports: getReportsByIndustry(slug), category: detail?.title || industryResult.name };
      return { reports: reportsData, category: null };
    })();

    return source.reports.map((r) => ({
      ...toReportCard(r),
      category: source.category ?? (r.sub_industry || r.industry),
    }));
  }, [slug, detail, subIndustryResult, industryResult]);

  // Filter reports based on search
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return baseReports;
    return baseReports.filter((report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [baseReports, searchQuery]);

  // Pagination
  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  // Reset page when slug or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <main className="flex-1 min-w-0">
      {/* Reports Header with Search */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {slug && detail
                ? `${detail.title} Reports`
                : slug && subIndustryResult
                  ? `${subIndustryResult.name} Reports`
                  : "All Market Reports"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Showing{" "}
              <span className="font-medium text-foreground">
                {paginatedReports.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{totalItems}</span>{" "}
              reports
            </p>
          </div>
          {slug && (
            <Link
              href="/industry"
              className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
     <div className="mb-6 sticky top-[3.5rem] lg:top-[5rem] z-10 bg-background/95 backdrop-blur-sm py-2">
        {/* Report Search - Sticky */}
        <div className="-mx-1 px-1">
          <div className="relative border-2 border-[#0c7497]/40 rounded-lg focus-within:border-[#0c7497]/70 transition-colors">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              aria-label="Search reports"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 h-11 border-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {paginatedReports.map((report) => (
          <ReportCard
            key={`${report.industrySlug}-${report.slug}`}
            report={report}
          />
        ))}
      </div>

      {/* Empty State */}
      {paginatedReports.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            No reports found matching your search.
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-border">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </main>
  );
});

IndustryReportsList.displayName = "IndustryReportsList";

export default IndustryReportsList;
