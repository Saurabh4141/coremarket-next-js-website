"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { 
  IndustrySidebar, 
  IndustryHeroContent, 
  IndustryReportsList, 
  IndustryBreadcrumb,
  IndustryCTA 
} from "./components";
 import { getIndustryBySlug, getIndustryDetailBySlug, getSubIndustryBySlug } from "@/data/industries";

// Dynamic page hero - memoized to prevent unnecessary re-renders
const DynamicPageHero = memo(({ 
  slug, 
  detail 
}: { 
  slug: string | undefined; 
  detail: { title: string; overview: string } | null;
}) => (
  <PageHero
    badge={slug && detail ? detail.title : "Industry Research"}
    title={slug && detail ? `${detail.title} Market Research` : "Industry Insights & Analysis"}
    subtitle={slug && detail 
      ? detail.overview 
      : "Access comprehensive market research reports covering 50+ industries worldwide. Data-driven insights to fuel your business decisions."
    }
  />
));

DynamicPageHero.displayName = "DynamicPageHero";

// Not found state component
const IndustryNotFound = memo(() => (
  <PageLayout>
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-4">Industry Not Found</h1>
      <p className="text-muted-foreground mb-8">The industry you're looking for doesn't exist.</p>
      <Link href="/industry">
        <Button variant="gradient">View All Industries</Button>
      </Link>
    </div>
  </PageLayout>
));

IndustryNotFound.displayName = "IndustryNotFound";

// Main content area with sidebar and reports - memoized for performance
const IndustryContent = memo(() => (
  <section className="py-8 md:py-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <IndustrySidebar />
        <IndustryReportsList />
      </div>
    </div>
  </section>
));

IndustryContent.displayName = "IndustryContent";

// Main Industry page component
const Industry = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Memoize industry lookups to prevent unnecessary recalculations
  const industry = useMemo(() => 
     slug ? getIndustryBySlug(slug) || getSubIndustryBySlug(slug) : null, 
    [slug]
  );
  
  const detail = useMemo(() =>
    (slug ? getIndustryDetailBySlug(slug) : null) ?? null,
    [slug]
  );

  // If we have a slug but no matching industry, show 404-like message
  if (slug && !industry) {
    return <IndustryNotFound />;
  }

  return (
    <PageLayout>
      {/* Breadcrumb - reads slug internally */}
      <IndustryBreadcrumb />

      {/* Page Hero - dynamic content based on slug */}
      <DynamicPageHero slug={slug} detail={detail} />

      {/* Stats & Top Players - only for specific industry */}
      <IndustryHeroContent detail={detail} slug={slug} />

      {/* Main Content with Sidebar */}
      <IndustryContent />

      {/* CTA - reads slug internally */}
      <IndustryCTA />
    </PageLayout>
  );
};

export default Industry;
