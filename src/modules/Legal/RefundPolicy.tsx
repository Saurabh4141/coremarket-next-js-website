"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const RefundPolicy = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="Refund & Cancellation Policy"
        subtitle="Our policies for refunds, returns, and order cancellations"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Digital Products Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Due to the digital nature of our market research reports, all sales are generally final once the report has been delivered or downloaded. We encourage customers to review report descriptions, table of contents, and sample pages before making a purchase.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Pre-Delivery Cancellation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Orders may be cancelled with a full refund under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Cancellation request is made within 24 hours of purchase</li>
                  <li>The report has not yet been delivered or accessed</li>
                  <li>No download links have been activated</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Eligible Refund Scenarios</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may issue refunds in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Duplicate Purchase:</strong> If you accidentally purchase the same report twice</li>
                  <li><strong>Technical Issues:</strong> If you are unable to access or download your purchased report due to technical problems on our end</li>
                  <li><strong>Significant Discrepancy:</strong> If the delivered report significantly differs from the description provided</li>
                  <li><strong>Billing Errors:</strong> If you were charged an incorrect amount</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Non-Refundable Situations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Refunds will not be granted for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Change of mind after report delivery</li>
                  <li>Inability to use the report for your intended purpose</li>
                  <li>Dissatisfaction with research findings or conclusions</li>
                  <li>Requests made more than 7 days after purchase</li>
                  <li>Reports that have been downloaded or accessed</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Refund Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To request a refund:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Contact our support team at {companyInfo.email}</li>
                  <li>Provide your order number and reason for the refund request</li>
                  <li>Allow 3-5 business days for review</li>
                  <li>If approved, refunds will be processed within 7-10 business days</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Partial Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In certain cases, we may offer partial refunds or credits toward future purchases at our discretion. This may apply when a report partially meets expectations but has minor issues.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Custom Reports</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For customized or commissioned research, refund policies are determined on a case-by-case basis and will be outlined in the project agreement. Generally, deposits for custom work are non-refundable once research has commenced.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For refund requests or questions about this policy, please contact:
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

export default RefundPolicy;
