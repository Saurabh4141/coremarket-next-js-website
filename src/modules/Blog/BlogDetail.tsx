"use client";

import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar, Clock, User, Tag, Home } from "lucide-react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogContent } from "@/components/blog/BlogContent";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";

// Fallback used only if a server-provided article is not passed.
const fallbackBlogData = {
  title: "The Future of Consumer Behavior in 2024",
  category: "Consumer Insights",
  author: {
    name: "InsightAnalytics",
    role: "Chief Research Officer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bio: "Dr. Sarah Chen leads our research division with over 15 years of experience in AI and market analytics. She holds a Ph.D. from Stanford and has published extensively on the intersection of technology and consumer research.",
  },
  publishDate: "April 24, 2024",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  content: {
    introduction: "As we approach 2024, understanding the future of consumer behavior is crucial for businesses looking to stay competitive in an ever-evolving market. This article explores emerging trends, technological advancements, and shifts in consumer preferences that will shape the market landscape in the coming year.",
    sections: [
      {
        title: "Rise of E-Commerce and Online Shopping",
        content: "The digital marketplace continues to expand at an unprecedented rate. Consumers are increasingly turning to online platforms for their shopping needs, driven by convenience, variety, and competitive pricing. This shift has profound implications for traditional retail models.",
        bullets: [
          "Increase in online shopping frequency",
          "Growth of mobile commerce",
          "Personalized shopping experiences",
        ],
        keyPoints: [
          "Increase in online shopping",
          "Growth of mobile commerce",
          "Enhanced personalization",
          "AI-driven recommendations",
        ],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      },
      {
        title: "Demand for Sustainability and Ethical Choices",
        content: "Consumers are becoming increasingly conscious about their purchasing decisions. They are often questioning brands about their environmental impact, ethical sourcing, and corporate responsibility. Companies that align with these values are seeing stronger customer loyalty and engagement.",
        bullets: [
          "Eco-friendly product preferences",
          "Transparent supply chains",
          "Carbon-neutral commitments",
          "Ethical manufacturing practices",
        ],
        keyPoints: [
          "73% prefer sustainable brands",
          "60% willing to pay premium",
          "Growing demand for transparency",
        ],
      },
      {
        title: "The Impact of AI and Personalization",
        content: "Artificial intelligence is revolutionizing how businesses understand and engage with consumers. From predictive analytics to personalized marketing, AI enables companies to deliver tailored experiences that resonate with individual preferences and behaviors.",
        bullets: [
          "AI-powered customer service",
          "Predictive purchasing behavior",
          "Hyper-personalized marketing",
        ],
        keyPoints: [
          "85% of interactions automated by 2024",
          "Personalization increases conversion by 40%",
          "Real-time behavior analysis",
        ],
      },
      {
        title: "Social Commerce and Influencer Marketing",
        content: "Social media platforms have evolved into powerful shopping destinations. The integration of commerce features within social apps, combined with influencer partnerships, creates seamless paths from discovery to purchase, fundamentally changing the consumer journey.",
        bullets: [
          "Shoppable social posts",
          "Live shopping experiences",
          "Micro-influencer partnerships",
          "User-generated content",
        ],
      },
    ],
    keyTakeaways: [
      "E-commerce will continue to dominate, with mobile commerce leading the charge",
      "Sustainability is no longer optional—it's a key differentiator",
      "AI-driven personalization will be the standard, not the exception",
      "Social commerce bridges the gap between discovery and purchase",
      "Consumer trust and transparency are paramount for brand loyalty",
    ],
    quote: {
      text: "The businesses that will thrive in 2024 are those that truly understand their customers—not just their demographics, but their values, aspirations, and digital behaviors.",
      author: "Dr. Sarah Chen",
      role: "Chief Research Officer",
    },
  },
  relatedPosts: [
    {
      title: "Understanding Consumer Behavior in the Post-Pandemic Era",
      slug: "consumer-behavior-post-pandemic",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
      excerpt: "Explore how consumer habits have permanently shifted following the global pandemic.",
    },
    {
      title: "5 Key Metrics Every Market Researcher Should Track",
      slug: "key-metrics-market-research",
      category: "Research Methods",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      excerpt: "Discover the essential metrics that drive actionable market research insights.",
    },
    {
      title: "The Rise of Sentiment Analysis in Brand Research",
      slug: "sentiment-analysis-brand-research",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      excerpt: "How AI-powered sentiment analysis is transforming brand perception measurement.",
    },
  ],
};

export interface BlogDetailView {
  title: string;
  category: string;
  author: { name: string; role: string; avatar: string; bio: string };
  publishDate: string;
  readTime: string;
  image: string;
  content: {
    introduction: string;
    sections: { title: string; content: string; bullets?: string[]; keyPoints?: string[]; image?: string }[];
    keyTakeaways: string[];
    quote: { text: string; author: string; role: string };
  };
  relatedPosts: { title: string; slug: string; category: string; image: string; excerpt: string }[];
}

const BlogDetail = ({ data }: { data?: BlogDetailView }) => {
  const blogData: BlogDetailView = data ?? fallbackBlogData;

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <section className="pt-24 pb-4 border-b border-border bg-secondary/20">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog" className="text-primary hover:text-primary/80">
                    Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">
                  {blogData.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Blog Title Section (Hero) */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
                {blogData.title}
              </h1>
              
              {/* Meta Info Row */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {blogData.publishDate}
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {blogData.author.name}
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span className="text-primary font-medium">{blogData.category}</span>
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {blogData.readTime}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl">
              <img
                src={blogData.image}
                alt={blogData.title}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content + Sidebar Layout */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Blog Content (70%) */}
            <div className="w-full lg:w-[70%] order-2 lg:order-1">
              <BlogContent content={blogData.content} />

              {/* Author Bio Section */}
              <div className="mt-12">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  About the Author
                </h3>
                <AuthorBio author={blogData.author} />
              </div>
            </div>

            {/* Right Column - Sidebar (30%) */}
            <div className="w-full lg:w-[30%] order-1 lg:order-2">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles posts={blogData.relatedPosts} />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </PageLayout>
  );
};

export default BlogDetail;
