"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Calendar, Clock, User, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { BlogFilterSidebar, FloatingBlogFilterButton } from "@/components/filters/BlogFilterSidebar";
import type { BlogPostDTO } from "@/lib/services/blogs";

const categories = ["All", "Industry Insights", "Research Methods", "AI & Technology", "Case Studies"];

const fallbackBlogPosts = [
  {
    title: "The Future of AI in Market Research: Trends to Watch in 2024",
    slug: "future-of-ai-market-research-2024",
    excerpt: "Artificial intelligence is revolutionizing how we gather and analyze market data. Discover the key trends shaping the future of research and how to leverage AI for competitive advantage.",
    category: "AI & Technology",
    author: "Dr. Sarah Chen",
    date: "Jan 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Understanding Consumer Behavior in the Post-Pandemic Era",
    slug: "consumer-behavior-post-pandemic",
    excerpt: "Consumer preferences have shifted dramatically. Learn how to adapt your research methodologies to capture these new behaviors and preferences.",
    category: "Industry Insights",
    author: "Michael Ross",
    date: "Jan 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
  {
    title: "5 Key Metrics Every Market Researcher Should Track",
    slug: "key-metrics-market-researchers",
    excerpt: "Data-driven decisions start with the right metrics. Here are the essential KPIs that can make or break your research success.",
    category: "Research Methods",
    author: "Emily Zhang",
    date: "Jan 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    title: "How We Helped a Fortune 500 Company Enter New Markets",
    slug: "fortune-500-market-entry-case-study",
    excerpt: "A detailed case study on our comprehensive market entry strategy that resulted in 40% revenue growth within the first year.",
    category: "Case Studies",
    author: "David Park",
    date: "Jan 5, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
  {
    title: "The Rise of Sentiment Analysis in Brand Research",
    slug: "sentiment-analysis-brand-research",
    excerpt: "Social listening and sentiment analysis are becoming essential tools for understanding brand perception. Here's how to get started.",
    category: "AI & Technology",
    author: "Dr. Sarah Chen",
    date: "Dec 28, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
  },
  {
    title: "Building Effective Survey Questions: A Complete Guide",
    slug: "effective-survey-questions-guide",
    excerpt: "The quality of your research depends on asking the right questions. Learn best practices for survey design that drives actionable insights.",
    category: "Research Methods",
    author: "Emily Zhang",
    date: "Dec 20, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
  },
  {
    title: "Global Market Trends: What to Expect in 2024",
    slug: "global-market-trends-2024",
    excerpt: "An in-depth analysis of emerging global market trends and their implications for businesses across industries.",
    category: "Industry Insights",
    author: "Michael Ross",
    date: "Dec 15, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    title: "Machine Learning in Predictive Analytics",
    slug: "machine-learning-predictive-analytics",
    excerpt: "How machine learning is transforming predictive analytics in market research and what it means for your business.",
    category: "AI & Technology",
    author: "Dr. Sarah Chen",
    date: "Dec 10, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
  },
  {
    title: "Case Study: Digital Transformation in Retail",
    slug: "digital-transformation-retail-case-study",
    excerpt: "How our research helped a major retailer navigate their digital transformation journey successfully.",
    category: "Case Studies",
    author: "David Park",
    date: "Dec 5, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
  },
  {
    title: "The Art of Competitive Intelligence",
    slug: "art-of-competitive-intelligence",
    excerpt: "Master the techniques of gathering and analyzing competitive intelligence to stay ahead in your market.",
    category: "Research Methods",
    author: "Emily Zhang",
    date: "Nov 28, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=500&fit=crop",
  },
];

const Blog = ({ posts }: { posts?: BlogPostDTO[] }) => {
  const blogPosts = posts && posts.length ? posts : fallbackBlogPosts;
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, blogPosts]);

  // Pagination
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const featuredPost = paginatedPosts.find((post) => post.featured);
  const regularPosts = paginatedPosts.filter((post) => !post.featured);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.length > 0 || activeCategory !== "All";

  return (
    <PageLayout>
      {/* Floating Filter Button */}
      <FloatingBlogFilterButton 
        onClick={() => setIsFilterOpen(true)} 
        hasActiveFilters={hasActiveFilters}
      />

      {/* Filter Sidebar */}
      <BlogFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
      />

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Blog</span>
          </nav>
        </div>
      </div>

      <PageHero
        badge="Blog & Insights"
        title="Latest Market Research Insights"
        subtitle="Stay updated with the latest trends, insights, and best practices in market research. Expert perspectives from our team of analysts."
      />

      {/* Featured Post */}
      {featuredPost && currentPage === 1 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <Link href={`/blog/${featuredPost.slug}`}>
                <article className="group grid md:grid-cols-2 gap-8 p-6 rounded-3xl bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button variant="outline" className="w-fit">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{paginatedPosts.length}</span> of{" "}
              <span className="font-medium text-foreground">{totalItems}</span> articles
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <span className="inline-block w-fit px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
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
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get the latest insights delivered directly to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-xl"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
