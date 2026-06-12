import { useState } from "react";
import { ArrowRight, Clock, TrendingUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = ["Latest Reports", "Trending Reports"];

const reports = {
  latest: [
    {
      title: "Cabernet Sauvignon Market Analysis 2024",
      category: "Food & Beverage",
      date: "Jan 2024",
      growth: "+12.5%",
    },
    {
      title: "Global Salon Chairs Market Report",
      category: "Consumer Goods",
      date: "Jan 2024",
      growth: "+8.3%",
    },
    {
      title: "Industrial Automation Sensors Market",
      category: "Technology",
      date: "Dec 2023",
      growth: "+15.7%",
    },
    {
      title: "Renewable Energy Storage Solutions",
      category: "Energy",
      date: "Dec 2023",
      growth: "+22.1%",
    },
    {
      title: "Healthcare AI Diagnostics Market",
      category: "Healthcare",
      date: "Dec 2023",
      growth: "+18.9%",
    },
    {
      title: "Electric Vehicle Components Market",
      category: "Automotive",
      date: "Nov 2023",
      growth: "+25.4%",
    },
  ],
  trending: [
    {
      title: "AI in Financial Services Report",
      category: "Finance",
      date: "Jan 2024",
      growth: "+28.6%",
    },
    {
      title: "Sustainable Packaging Market Analysis",
      category: "Environment",
      date: "Jan 2024",
      growth: "+19.2%",
    },
    {
      title: "5G Infrastructure Investment Report",
      category: "Telecom",
      date: "Dec 2023",
      growth: "+31.5%",
    },
    {
      title: "Cybersecurity Solutions Market 2024",
      category: "Technology",
      date: "Dec 2023",
      growth: "+24.8%",
    },
    {
      title: "Plant-Based Food Market Outlook",
      category: "Food & Beverage",
      date: "Dec 2023",
      growth: "+16.3%",
    },
    {
      title: "Smart Home Devices Market",
      category: "Consumer Electronics",
      date: "Nov 2023",
      growth: "+21.7%",
    },
  ],
};

const categoryColors: Record<string, string> = {
  "Food & Beverage": "bg-orange-100 text-orange-700",
  "Consumer Goods": "bg-purple-100 text-purple-700",
  "Technology": "bg-blue-100 text-blue-700",
  "Energy": "bg-green-100 text-green-700",
  "Healthcare": "bg-rose-100 text-rose-700",
  "Automotive": "bg-cyan-100 text-cyan-700",
  "Finance": "bg-emerald-100 text-emerald-700",
  "Environment": "bg-lime-100 text-lime-700",
  "Telecom": "bg-violet-100 text-violet-700",
  "Consumer Electronics": "bg-indigo-100 text-indigo-700",
};

export const ReportsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentReports = activeTab === 0 ? reports.latest : reports.trending;

  return (
    <section id="reports" className="py-8 md:py-12 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Research Reports
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Industry <span className="gradient-text">Insights</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex p-1.5 rounded-xl bg-card border border-border shadow-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                  activeTab === index
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Reports Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {currentReports.map((report) => (
            <StaggerItem key={report.title}>
              <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-medium", categoryColors[report.category] || "bg-muted text-muted-foreground")}>
                    {report.category}
                  </span>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {report.growth}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {report.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {report.date}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4" />
                    Read More..
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Buy Now
                     <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/reports">
            <Button variant="gradient" size="lg">
              Browse All Reports
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
