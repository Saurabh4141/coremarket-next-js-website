"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { companyInfo } from "@/data/companyInfo";

const GDPR = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Legal"
        title="GDPR & Data Protection"
        subtitle="Our commitment to protecting your personal data under GDPR and global privacy regulations"
      />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: January 1, 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.name} is committed to protecting the privacy and security of personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws. This page explains how we handle your data and your rights as a data subject.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Data Controller</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.name} acts as the data controller for personal data collected through our website and services. We determine the purposes and means of processing personal data.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Contact:</strong><br />
                  {companyInfo.headquarter.fullAddress}<br />
                  Email: {companyInfo.email}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Lawful Basis for Processing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We process personal data based on the following lawful grounds:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Consent:</strong> Where you have given clear consent for us to process your data for a specific purpose</li>
                  <li><strong>Contract:</strong> Where processing is necessary to fulfill a contract with you</li>
                  <li><strong>Legal Obligation:</strong> Where we need to comply with legal requirements</li>
                  <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate business interests, provided these do not override your rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Your Rights Under GDPR</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As an EU/EEA resident, you have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong>Right of Access:</strong> Request a copy of your personal data we hold</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                  <li><strong>Rights Related to Automated Decision Making:</strong> Not be subject to decisions based solely on automated processing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Exercising Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To exercise any of your rights, please contact us with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Your name and contact information</li>
                  <li>Description of the right you wish to exercise</li>
                  <li>Any relevant details to help us locate your data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We will respond to your request within 30 days. In complex cases, we may extend this by an additional 60 days with notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. Retention periods vary based on data type and purpose.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When we transfer personal data outside the EU/EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission or transfers to countries with adequacy decisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect personal data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security assessments</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Data Breach Notification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours. If the breach is likely to result in high risk to you, we will also notify you directly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Complaints</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you believe we have not handled your personal data properly, you have the right to lodge a complaint with your local Data Protection Authority. However, we encourage you to contact us first so we can address your concerns.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Contact Our Data Protection Team</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any GDPR-related inquiries or to exercise your rights:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Data Protection Officer</strong><br />
                  {companyInfo.name}<br />
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

export default GDPR;
