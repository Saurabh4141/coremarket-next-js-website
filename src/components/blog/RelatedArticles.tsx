import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface RelatedPost {
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
}

interface RelatedArticlesProps {
  posts: RelatedPost[];
}

export const RelatedArticles = ({ posts }: RelatedArticlesProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-display font-semibold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
