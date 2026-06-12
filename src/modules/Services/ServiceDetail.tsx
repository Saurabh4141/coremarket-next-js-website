"use client";

import Link from "next/link";
import { useParams, redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { services, getServiceBySlug, getServiceDetailBySlug } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");
  const detail = getServiceDetailBySlug(slug || "");
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!service || !detail) {
    redirect("/services");
  }

  const otherServices = services.filter(s => s.slug !== slug);
  const ServiceIcon = service.icon;

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Other Services */}
      <div className="p-4 md:p-6 rounded-2xl bg-card border border-border">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Other Services
        </h3>
        <nav className="space-y-1">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors"
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {s.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Need Help CTA */}
      <div className="p-4 md:p-6 rounded-2xl bg-card border border-border">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          Need Help?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Contact us for personalized guidance on your market research needs.
        </p>
        <Link href="/contact">
          <Button className="w-full">
            Request Quote
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <section className="pt-6 pb-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{detail.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Mobile Collapsible Sidebar */}
            <aside className="lg:hidden order-2">
              <Collapsible open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between gap-2 mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <Menu className="w-4 h-4" />
                      <span>Browse Other Services</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                  <SidebarContent />
                </CollapsibleContent>
              </Collapsible>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <SidebarContent />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 order-1 lg:order-2">
              {/* Hero */}
              <AnimatedSection className="mb-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ServiceIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {detail.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {detail.subtitle}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Overview */}
              <AnimatedSection className="mb-10">
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                    Overview
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {detail.overview.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Methodology */}
              <AnimatedSection className="mb-10">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
                  Methodology
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {detail.methodology.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-4">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Key Benefits */}
              <AnimatedSection className="mb-10">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {detail.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-primary/5 border border-primary/10"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Use Cases */}
              <AnimatedSection className="mb-10">
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                    Business Use Cases
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {detail.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection>
                <div className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Ready to Get Started?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Contact our experts to discuss how {detail.title} can benefit your business.
                  </p>
                  <Link href="/contact">
                    <Button variant="gradient" size="lg">
                      Request a Consultation
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </main>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
