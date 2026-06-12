"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const Disclaimer = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="Disclaimer"
        subtitle="Important notices regarding our services and content"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. General Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information provided by {companyInfo.name} on our website and in our market research reports is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Market Research Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our market research reports are based on data and information gathered from various sources believed to be reliable. However, we cannot guarantee the accuracy or completeness of this data. Market conditions, trends, and forecasts are subject to change without notice. Past performance is not indicative of future results.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. No Professional Advice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The content on our website and in our reports does not constitute professional financial, investment, legal, or business advice. You should consult with appropriate professionals before making any business decisions based on the information provided.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Investment Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our reports may discuss companies, markets, and investment opportunities. This information should not be construed as investment advice or a recommendation to buy, sell, or hold any security. Always conduct your own due diligence and consult with a qualified financial advisor.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Forward-Looking Statements</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our reports contain forward-looking statements, including projections, forecasts, and estimates. These statements are based on current expectations and assumptions that are subject to risks and uncertainties. Actual results may differ materially from those anticipated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Under no circumstances shall {companyInfo.name}, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or reliance on information contained in our reports.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Changes to This Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of any modifications.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about this disclaimer, contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>{companyInfo.name}</strong><br />
                  Email: {companyInfo.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Disclaimer;
