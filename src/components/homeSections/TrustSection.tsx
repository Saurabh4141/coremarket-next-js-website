import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Building2, Briefcase, Globe, Shield, Award, TrendingUp } from "lucide-react";

const partners = [
  { name: "Fortune 500", icon: Building2 },
  { name: "TechCorp", icon: Globe },
  { name: "GlobalBank", icon: Briefcase },
  { name: "HealthPlus", icon: Shield },
  { name: "EnergyMax", icon: TrendingUp },
  { name: "RetailGiant", icon: Award },
];

export const TrustSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Trusted Worldwide
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Partnering with Industry Leaders
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From Fortune 500 companies to emerging startups, we power strategic decisions globally.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <partner.icon className="w-8 h-8 text-primary/60 mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                <span className="text-base md:text-lg font-display font-semibold text-foreground/70 group-hover:text-foreground transition-colors text-center">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
