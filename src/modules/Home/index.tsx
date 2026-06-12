"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/homeSections/HeroSection";
import { TrustSection } from "@/components/homeSections/TrustSection";
import { ServicesSection } from "@/components/homeSections/ServicesSection";
import { ReportsSection } from "@/components/homeSections/ReportsSection";
import { AboutSection } from "@/components/homeSections/AboutSection";
import { BlogSection } from "@/components/homeSections/BlogSection";
import { FAQSection } from "@/components/homeSections/FAQSection";
import { ContactSection } from "@/components/homeSections/ContactSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ReportsSection />
      <AboutSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </PageLayout>
  );
};

export default Index;
