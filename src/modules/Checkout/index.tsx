"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  Lock,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { reportsData, getReportBySlug, type Report } from "@/data/reports";
import { 
  licenseTypes, 
  currencies, 
  calculatePrice, 
  formatPrice,
  getLicenseById,
  getDefaultCurrency
} from "@/data/pricing";

const Checkout = ({ report: reportProp }: { report?: Report } = {}) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  // Get report data — server-provided DB report wins, else static lookup.
  const report = useMemo(() => {
    if (reportProp) return reportProp;
    if (slug) {
      return getReportBySlug(slug);
    }
    // Fallback to first report if no slug
    return reportsData[0];
  }, [reportProp, slug]);

  // State
  const [selectedLicense, setSelectedLicense] = useState(
    searchParams.get("license") || "single"
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies.find(c => c.code === searchParams.get("currency")) || getDefaultCurrency()
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    country: ""
  });

  // Calculate pricing
  const currentLicense = getLicenseById(selectedLicense) || licenseTypes[0];
  const basePrice = report ? parseFloat(report.price.replace(/[^0-9.]/g, '')) : 3500;
  const finalPrice = calculatePrice(basePrice, currentLicense, selectedCurrency);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission - would integrate with payment gateway
    console.log("Processing payment:", { formData, selectedLicense, finalPrice });
  };

  if (!report) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Report Not Found</h1>
          <p className="text-muted-foreground mb-8">The report you're looking for doesn't exist.</p>
          <Link href="/industry">
            <Button variant="gradient">Browse Reports</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link 
            href={`/report/${report.slug}`}
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
            Secure Checkout
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Complete your purchase to access the full report
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Report Summary */}
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-foreground text-lg mb-1">
                      {report.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {report.pages} pages • Published {report.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* License Selection */}
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Select License Type
                </h3>
                <RadioGroup 
                  value={selectedLicense} 
                  onValueChange={setSelectedLicense}
                  className="space-y-3"
                >
                  {licenseTypes.map((license) => {
                    const price = calculatePrice(basePrice, license, selectedCurrency);
                    return (
                      <label
                        key={license.id}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                          selectedLicense === license.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <RadioGroupItem value={license.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            <span className="font-medium text-foreground">{license.name}</span>
                            <span className="font-display font-bold text-primary">
                              {formatPrice(price, selectedCurrency)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {license.description}
                          </p>
                          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {license.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Currency Selection */}
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Select Currency
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        selectedCurrency.code === currency.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      )}
                    >
                      {currency.symbol} {currency.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Billing Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-5 md:p-6 sticky top-24">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Report</span>
                    <span className="text-foreground font-medium truncate ml-2 text-right max-w-[180px]">
                      {report.title}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">License</span>
                    <span className="text-foreground font-medium">{currentLicense.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="text-foreground">{formatPrice(
                      Math.round(basePrice * selectedCurrency.exchangeRate), 
                      selectedCurrency
                    )}</span>
                  </div>
                  {currentLicense.priceMultiplier > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">License Upgrade</span>
                      <span className="text-foreground">
                        +{formatPrice(
                          finalPrice - Math.round(basePrice * selectedCurrency.exchangeRate),
                          selectedCurrency
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-4 border-b border-border">
                  <span className="font-display font-semibold text-foreground">Total</span>
                  <span className="font-display font-bold text-2xl text-primary">
                    {formatPrice(finalPrice, selectedCurrency)}
                  </span>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="w-full"
                    onClick={handleSubmit}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Purchase
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Secure SSL Encryption</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-border space-y-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">100% Secure Payment</p>
                      <p className="text-xs text-muted-foreground">Your data is protected with industry-standard encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Instant Download</p>
                      <p className="text-xs text-muted-foreground">Access your report immediately after payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Checkout;
