import Link from "next/link";
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  ArrowRight,
  MapPin,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo } from "@/data/companyInfo";
import Logo from "@/assets/logo-clean.png";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  services: [
    { label: "Market Opportunity", href: "/services/market-opportunity" },
    { label: "Segmentation Analysis", href: "/services/segmentation-analysis" },
    { label: "Pricing Strategy", href: "/services/pricing-strategy" },
    { label: "Consumer Behavior", href: "/services/consumer-behavior" },
    { label: "Competitor Analysis", href: "/services/competitor-analysis" },
  ],
  industries: [
    { label: "Healthcare", href: "/industry/healthcare-it-services" },
    { label: "Technology", href: "/industry/technology" },
    { label: "Consumer Goods", href: "/industry/consumer-products" },
    { label: "Energy", href: "/industry/energy-power" },
    { label: "Finance", href: "/industry/financial-services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Stay Ahead of Market Trends
              </h3>
              <p className="text-background/70">
                Subscribe to our newsletter for the latest insights and reports.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full sm:w-80 bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-xl focus:border-accent"
              />
              <Button variant="hero" size="lg" className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={Logo.src}
                  alt="Core Market Research"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl">Core</span>
                <span className="font-display font-medium text-xl text-accent ml-1">Market Research</span>
              </div>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Empowering businesses with actionable market intelligence and research solutions since 2010.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{companyInfo.headquarter.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4 text-accent" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>{companyInfo.email}</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2024 Core Market Research. All rights reserved.</p>
            <p>Designed with ♥ for data-driven businesses</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
