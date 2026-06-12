import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of market research reports do you offer?",
    answer: "We offer comprehensive market research reports across 50+ industries including technology, healthcare, consumer goods, energy, finance, and automotive. Our reports include market size analysis, growth forecasts, competitive landscape, and strategic recommendations.",
  },
  {
    question: "How accurate is your market data?",
    answer: "Our data is sourced from primary research (surveys, interviews with industry experts) and validated secondary sources. We employ rigorous quality control measures and our analysts have deep domain expertise to ensure accuracy and reliability.",
  },
  {
    question: "Can I request a custom research report?",
    answer: "Absolutely! We specialize in custom research tailored to your specific business needs. Our team works closely with you to understand your objectives and delivers actionable insights that address your unique challenges.",
  },
  {
    question: "What is the typical turnaround time for reports?",
    answer: "Syndicated reports are available for immediate download. Custom research projects typically take 4-8 weeks depending on scope and complexity. We also offer expedited services for urgent requirements.",
  },
  {
    question: "Do you offer consulting services alongside reports?",
    answer: "Yes, we provide end-to-end consulting services including market entry strategy, competitive analysis, due diligence, and strategic advisory. Our consultants work as an extension of your team to drive business outcomes.",
  },
  {
    question: "How do I access purchased reports?",
    answer: "Upon purchase, you receive immediate access to download reports in PDF format. Enterprise clients get access to our online portal for managing subscriptions, tracking downloads, and collaborating with team members.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our research services, methodologies, and how we can help your business.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
