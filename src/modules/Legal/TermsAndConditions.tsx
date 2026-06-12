"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const TermsAndConditions = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using {companyInfo.name}'s website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, reports, research materials, trademarks, and intellectual property on this website are owned by {companyInfo.name}. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. License to Use Reports</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Upon purchase, you are granted a limited, non-exclusive, non-transferable license to use the report according to the license type purchased:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Single User License:</strong> For individual use only. Cannot be shared or distributed.</li>
                  <li><strong>Multi-User License:</strong> Can be shared within a single department or team (up to 5 users).</li>
                  <li><strong>Corporate License:</strong> Enterprise-wide access for all employees within the purchasing organization.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information when making purchases</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Not share, resell, or redistribute purchased reports</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All prices are quoted in USD unless otherwise stated. Payment is due at the time of purchase. We accept major credit cards and bank transfers for corporate accounts.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our reports are provided "as is" based on available data and research methodologies. While we strive for accuracy, we make no warranties regarding the completeness or reliability of the information. The reports are for informational purposes and should not be the sole basis for business decisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or reliance on information in our reports.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which {companyInfo.name} is registered, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>{companyInfo.name}</strong><br />
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

export default TermsAndConditions;
