import { memo } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { 
  TrendingUp, 
  BarChart3, 
  Users 
} from "lucide-react";
 import type { IndustryDetail } from "@/data/industries";

interface IndustryHeroContentProps {
  detail: IndustryDetail | null;
  slug: string | undefined;
}

// Stats section for specific industry
const IndustryStats = memo(({ detail }: { detail: IndustryDetail }) => (
  <section className="py-6 relative z-10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg text-center">
          <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground mb-1">{detail.marketSize}</p>
          <p className="text-sm text-muted-foreground">Global Market Size</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg text-center">
          <TrendingUp className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground mb-1">{detail.growthRate}</p>
          <p className="text-sm text-muted-foreground">Projected Growth</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg text-center">
          <Users className="w-10 h-10 text-accent mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground mb-1">{detail.topPlayers.length}+</p>
          <p className="text-sm text-muted-foreground">Key Market Players</p>
        </div>
      </div>
    </div>
  </section>
));

IndustryStats.displayName = "IndustryStats";

// Top players section
const TopPlayers = memo(({ players }: { players: string[] }) => (
  <section className="py-6 bg-secondary/30">
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Leading Market Players
        </h2>
      </AnimatedSection>
      <div className="flex flex-wrap gap-4">
        {players.map((player, index) => (
          <div 
            key={index}
            className="px-6 py-3 rounded-full bg-card border border-border shadow-sm font-medium text-foreground"
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  </section>
));

TopPlayers.displayName = "TopPlayers";

// Main component - only renders additional content for specific industry
const IndustryHeroContent = memo(({ detail, slug }: IndustryHeroContentProps) => {
  // Only render for specific industry pages
  if (!slug || !detail) {
    return null;
  }

  return (
    <>
      <IndustryStats detail={detail} />
      <TopPlayers players={detail.topPlayers} />
    </>
  );
});

IndustryHeroContent.displayName = "IndustryHeroContent";

export default IndustryHeroContent;
