"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.name} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect information about you in a variety of ways:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, and billing information when you make a purchase or contact us.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and navigation patterns.</li>
                  <li><strong>Device Data:</strong> Browser type, operating system, IP address, and device identifiers.</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Process transactions and deliver purchased reports</li>
                  <li>Send administrative information and service updates</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Sharing Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or serving you, provided they agree to keep this information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>{companyInfo.name}</strong><br />
                  {companyInfo.headquarter.fullAddress}<br />
                  Email: {companyInfo.email}<br />
                  Phone: {companyInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
