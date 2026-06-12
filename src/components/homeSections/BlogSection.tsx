import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import type { BlogPostDTO } from "@/lib/services/blogs";

const fallbackBlogPosts = [
  {
    title: "The Future of AI in Market Research: Trends to Watch in 2024",
    excerpt: "Artificial intelligence is revolutionizing how we gather and analyze market data. Discover the key trends shaping the future of research.",
    category: "AI & Technology",
    author: "Sarah Chen",
    date: "Jan 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Understanding Consumer Behavior in the Post-Pandemic Era",
    excerpt: "Consumer preferences have shifted dramatically. Learn how to adapt your research methodologies.",
    category: "Consumer Insights",
    author: "Michael Ross",
    date: "Jan 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
  {
    title: "5 Key Metrics Every Market Researcher Should Track",
    excerpt: "Data-driven decisions start with the right metrics. Here are the essential KPIs for success.",
    category: "Research Methods",
    author: "Emily Zhang",
    date: "Jan 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
];

export const BlogSection = ({ posts }: { posts?: BlogPostDTO[] }) => {
  // Home shows up to 3: one featured + two regular.
  const source = posts && posts.length ? posts.slice(0, 3) : fallbackBlogPosts;
  const featuredPost = source.find((post) => post.featured) ?? source[0];
  const regularPosts = source.filter((post) => post !== featuredPost).slice(0, 2);

  return (
    <section id="blog" className="py-8 md:py-12 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Latest Insights
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Our <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Read expert insights on market research methodologies, industry trends, consumer behavior, and business strategy.
          </p>
        </AnimatedSection>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <AnimatedSection className="lg:row-span-2">
              <article className="group h-full rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{featuredPost.author}</span>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-primary font-medium group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          )}

          {/* Regular Posts */}
          <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
            {regularPosts.map((post) => (
              <StaggerItem key={post.title}>
                <article className="group flex gap-5 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="w-32 h-32 md:w-40 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
