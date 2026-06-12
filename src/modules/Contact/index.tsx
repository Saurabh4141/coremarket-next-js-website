"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitRequest } from "@/lib/submitRequest";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";

const contactInfo = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: companyInfo.headquarter.address + ", " + companyInfo.headquarter.city,
    subValue: companyInfo.headquarter.state + " " + companyInfo.headquarter.zip,
  },
  {
    icon: Phone,
    label: "Phone",
    value: companyInfo.phone,
    subValue: companyInfo.businessHours.days.split(" - ")[0] + "-" + companyInfo.businessHours.days.split(" - ")[1] + " " + companyInfo.businessHours.hours.split(" - ")[0] + "-" + companyInfo.businessHours.hours.split(" - ")[1],
  },
  {
    icon: Mail,
    label: "Email",
    value: companyInfo.email,
    subValue: companyInfo.supportTime,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: companyInfo.businessHours.days,
    subValue: companyInfo.businessHours.hours,
  },
];

const engagementSteps = [
  {
    title: "Initial Consultation",
    subtitle: "Understand your objectives",
    description: "We discuss your business goals, challenges, and research requirements."
  },
  {
    title: "Scope & Proposal",
    subtitle: "Clear deliverables",
    description: "We define project scope, timelines, methodology, and pricing transparently."
  },
  {
    title: "Research Execution",
    subtitle: "Data-driven insights",
    description: "Our analysts conduct primary and secondary research with rigorous validation."
  },
  {
    title: "Insights & Delivery",
    subtitle: "Actionable outcomes",
    description: "You receive structured insights, forecasts, and strategic recommendations."
  }
];


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Persist the enquiry to the DB (request_master) via the API.
    await submitRequest({
      type: "contact",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      firmName: formData.company,
      subject: formData.subject,
      message: formData.message,
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <PageLayout>

       {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Contact us</span>
          </nav>
        </div>
      </div>

      <PageHero
        badge="Contact Us"
        title="Let's Start a Conversation"
        subtitle="Have questions about our services? Ready to start your research project? Our team is here to help you make data-driven decisions."
      />

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <StaggerItem key={item.label}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{item.label}</h3>
                  <p className="font-semibold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.subValue}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-lg">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your research needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-32 rounded-xl resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Office Locations */}
            <AnimatedSection delay={0.2} direction="right" className="lg:col-span-2">
              <div className="p-8 rounded-3xl bg-secondary/50 h-full">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  How We Work
                </h3>
                <div className="space-y-6">
                  {engagementSteps.map((step) => (
                    <div
                      key={step.title}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Need Immediate Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available around the clock.
                  </p>
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
