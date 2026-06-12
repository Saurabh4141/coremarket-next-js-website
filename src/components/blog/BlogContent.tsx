import { Check, Lightbulb, Quote, TrendingUp, ChevronRight } from "lucide-react";

interface BlogContentProps {
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      bullets?: string[];
      keyPoints?: string[];
      image?: string;
    }>;
    keyTakeaways: string[];
    quote?: {
      text: string;
      author: string;
      role: string;
    };
  };
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-1 h-8 bg-primary rounded-full"></span>
          Introduction
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {content.introduction}
        </p>
      </section>

      {/* Main Sections */}
      {content.sections.map((section, index) => (
        <section key={index} className="space-y-4">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              {index + 1}
            </span>
            {section.title}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
              
              {section.bullets && (
                <ul className="space-y-2">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {section.keyPoints && (
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Key Points
                </h4>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {section.image && (
              <div className="rounded-xl overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Quote Block */}
      {content.quote && (
        <blockquote className="relative bg-secondary/50 rounded-2xl p-6 md:p-8 border-l-4 border-primary">
          <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
          <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-4 italic">
            "{content.quote.text}"
          </p>
          <footer className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full"></div>
            <div>
              <cite className="text-foreground font-semibold not-italic">
                {content.quote.author}
              </cite>
              <p className="text-muted-foreground text-sm">{content.quote.role}</p>
            </div>
          </footer>
        </blockquote>
      )}

      {/* Key Takeaways */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/10">
        <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          {content.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Data Insight Card */}
      <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Data Highlight
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Market Growth", value: "15.2%" },
            { label: "Consumer Adoption", value: "78%" },
            { label: "Digital Spend", value: "$4.2T" },
            { label: "Mobile Users", value: "6.8B" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
