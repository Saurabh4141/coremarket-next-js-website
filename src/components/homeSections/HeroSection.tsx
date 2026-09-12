import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: FileText, value: "150,000+", label: "Reports" },
  { icon: TrendingUp, value: "70,000+", label: "Research Topics" },
  { icon: Users, value: "874+", label: "Expert Analysts" },
  { icon: Award, value: "5,000+", label: "Global Clients" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg.src}
          alt="Market Research Visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">AI-Powered Market Intelligence</span>
          </motion.div>

          {/* SEO H1 - Screen reader accessible */}
          <h1 className="sr-only">
            Market Research Company in India Providing Industry Reports & Strategic Insights
          </h1>

          {/* Main Heading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-[1.1]"
            role="heading"
            aria-level={2}
          >
            Competitive Insights at the{" "}
            <span className="relative">
              Speed of Thought
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  d="M2 10C50 4 150 4 298 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-accent"
                />
              </svg>
            </span>
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed"
          >
            Transform your business decisions with data-driven market research. 
            Access comprehensive industry analysis, consumer insights, and competitive intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/industry">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Explore Reports
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Overview
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 md:p-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-lg border border-primary-foreground/15"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="group text-center p-4 md:p-6 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 border border-primary-foreground/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mb-4">
                    <stat.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-primary-foreground/70 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-primary-foreground text-xs sm:text-sm mt-6">
              Figures are based on internal research database and global analyst network.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
