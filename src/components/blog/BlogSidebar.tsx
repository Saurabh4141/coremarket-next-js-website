import Link from "next/link";
import { Search, ChevronRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Market Trends", slug: "market-trends" },
  { name: "Consumer Insights", slug: "consumer-insights" },
  { name: "Industry Analysis", slug: "industry-analysis" },
  { name: "Data & Analytics", slug: "data-&-analytics" },
];

const popularPosts = [
  { title: "Top 5 Market Research Tools", slug: "market-research-tools" },
  { title: "Strategies for Competitive Analysis", slug: "competitive-analysis" },
  { title: "The Rise of E-Commerce Trends", slug: "ecommerce-trends" },
];

const tags = [
  "Consumer Behavior",
  "2024 Trends",
  "Market Research",
  "Data Analytics",
  "Industry Insights",
];

export const BlogSidebar = () => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Search Box */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-4">Search</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search articles..."
            className="flex-1 bg-background border-border"
          />
          <Button size="icon" className="shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog?category=${category.slug}`}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-1"
              >
                <ChevronRight className="w-4 h-4" />
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-4">Popular Posts</h3>
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-start gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <TrendingUp className="w-4 h-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm leading-tight">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-4">Share this article</h3>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};
