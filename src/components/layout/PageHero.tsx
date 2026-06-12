import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}

export const PageHero = ({ title, subtitle, badge, children }: PageHeroProps) => {
  return (
    <section className="relative py-20 md:py-20 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              {badge}
            </span>
          )}
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              {subtitle}
            </p>
          )}
          
          {children}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
