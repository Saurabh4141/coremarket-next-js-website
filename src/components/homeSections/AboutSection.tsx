import { CheckCircle2, Award, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Link from "next/link";

const features = [
  "150,000+ comprehensive market reports",
  "AI-powered data analysis and insights",
  "Expert team of 874+ research analysts",
  "24/7 dedicated customer support",
  "Custom research solutions available",
  "Global coverage across 50+ industries",
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering the highest quality research and analysis.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We tailor solutions to your needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Comprehensive coverage across markets worldwide.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Leveraging cutting-edge AI and data science technologies.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-8 md:py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Trusted Partner in{" "}
              <span className="gradient-text">Market Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For over a decade, Core Market Research has been at the forefront of delivering 
              actionable market insights to businesses worldwide. Our team of expert analysts 
              combines deep industry knowledge with cutting-edge AI technology to provide 
              comprehensive research solutions.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="gradient" size="lg">
                Learn More About Us
              </Button>
            </Link>
          </AnimatedSection>

          {/* Values Grid */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
