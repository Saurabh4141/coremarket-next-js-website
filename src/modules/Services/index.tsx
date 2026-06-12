"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { services } from "@/data/services";

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Our suite of services is designed to provide you with comprehensive insights
              into your market and competition.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <StaggerContainer 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            staggerDelay={0.05}
          >
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={service.href}
                  className="group block h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Custom Research?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us for personalized guidance on your market research needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Request Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
