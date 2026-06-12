import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { services, serviceDetails } from "@/data/services";

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-8 md:py-12 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Research{" "}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From market analysis to consumer insights, we provide end-to-end
            research services that drive informed decision-making.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <div className="group relative h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {serviceDetails[service.slug]?.subtitle ?? service.description}
                </p>

                {/* Link → PROPERLY INTEGRATED */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-primary font-medium group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/contact">
            <Button variant="gradient" size="lg">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
