import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { companyInfo } from "@/data/companyInfo";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
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

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-8 md:py-12 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our services? Ready to start your research project? 
            We're here to help you make data-driven decisions.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <StaggerContainer className="lg:col-span-2 space-y-6" staggerDelay={0.1}>
            {contactInfo.map((item) => (
              <StaggerItem key={item.label}>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.label}</h4>
                    <p className="text-foreground font-medium">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.subValue}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} direction="right" className="lg:col-span-3">
            <div className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-lg">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Send us a Message
              </h3>
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

                <p className="text-sm text-muted-foreground text-center">
                  By submitting, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
