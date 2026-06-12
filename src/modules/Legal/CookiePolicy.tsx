"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const CookiePolicy = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {companyInfo.name} uses cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality, including navigation and access to secure areas.</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and personalize your experience.</li>
                  <li><strong>Marketing Cookies:</strong> Track your visit across websites to display relevant advertisements.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left text-foreground">Cookie Type</th>
                        <th className="border border-border p-3 text-left text-foreground">Purpose</th>
                        <th className="border border-border p-3 text-left text-foreground">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3 text-muted-foreground">Session</td>
                        <td className="border border-border p-3 text-muted-foreground">Maintain user session</td>
                        <td className="border border-border p-3 text-muted-foreground">Session</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 text-muted-foreground">Preferences</td>
                        <td className="border border-border p-3 text-muted-foreground">Remember settings</td>
                        <td className="border border-border p-3 text-muted-foreground">1 year</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 text-muted-foreground">Analytics</td>
                        <td className="border border-border p-3 text-muted-foreground">Track usage patterns</td>
                        <td className="border border-border p-3 text-muted-foreground">2 years</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 text-muted-foreground">Marketing</td>
                        <td className="border border-border p-3 text-muted-foreground">Personalized ads</td>
                        <td className="border border-border p-3 text-muted-foreground">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services such as Google Analytics, which set their own cookies. These are governed by the respective third party's privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                  <li>Our cookie consent tool: Adjust your preferences when you first visit</li>
                  <li>Opt-out links: Use third-party opt-out tools for analytics and advertising</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that disabling certain cookies may impact website functionality.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
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

export default CookiePolicy;
