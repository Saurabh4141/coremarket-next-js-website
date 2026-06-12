"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Award, Users, Globe, Target, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "150K+", label: "Reports Published" },
  { value: "5000+", label: "Global Clients" },
  { value: "50+", label: "Industries Covered" },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We deliver the highest quality research with rigorous methodology and attention to detail.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We tailor every solution to meet your unique needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our network spans continents, providing comprehensive market coverage worldwide.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We leverage cutting-edge AI and data science to deliver actionable insights.",
  },
];

const team = [
  { name: "Dr. Sarah Chen", role: "CEO & Chief Research Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
  { name: "Michael Ross", role: "VP of Research Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { name: "Emily Zhang", role: "Head of Data Analytics", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
  { name: "David Park", role: "Director of Client Success", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
];

const About = () => {
  return (
    <PageLayout>

       {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">About</span>
          </nav>
        </div>
      </div>

      <PageHero
        badge="About Us"
        title="Your Trusted Partner in Market Intelligence"
        subtitle="For over a decade, Core Market Research has been at the forefront of delivering actionable market insights to businesses worldwide."
      />

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-lg text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pioneering Data-Driven Decisions Since 2010
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Core Market Research was founded with a simple mission: to make world-class market intelligence accessible to businesses of all sizes. What started as a small team of passionate researchers has grown into a global organization trusted by Fortune 500 companies and startups alike.
                </p>
                <p>
                  Our journey has been defined by continuous innovation. We were among the first to integrate AI and machine learning into our research methodologies, allowing us to deliver insights faster and more accurately than ever before.
                </p>
                <p>
                  Today, our team of 874+ expert analysts covers over 50 industries across every major market, providing the comprehensive coverage our clients need to make confident business decisions.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-card border border-border shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-foreground">98%</div>
                      <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-muted-foreground">
              Our core values shape everything we do, from how we conduct research to how we serve our clients.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
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
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Our leadership team brings decades of combined experience in market research, data science, and business strategy.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group text-center">
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how our research solutions can help drive your business forward.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="xl">
                Get in Touch
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
