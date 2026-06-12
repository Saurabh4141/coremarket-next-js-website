import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const NewsletterCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Get Market Insights in Your Inbox
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Stay ahead of the competition with our weekly research updates, industry trends, and exclusive insights delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 bg-card border-border"
                required
              />
              <Button type="submit" size="lg" className="h-12 px-8 shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
