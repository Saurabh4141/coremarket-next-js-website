import { motion, AnimatePresence } from "framer-motion";
import { 
  PieChart,
  BarChart3,
  Brain,
  TrendingUp,
  Lightbulb,
  DollarSign,
  Heart,
  Target,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { industries } from "@/data/industries";

const services = [
  { icon: PieChart, title: "Market Segmentation Analysis", description: "Identify and understand target segments", href: "/services/market-segmentation-analysis" },
  { icon: BarChart3, title: "Competitor Analysis", description: "Stay ahead of competition", href: "/services/competitor-analysis" },
  { icon: Brain, title: "Consumer Behavior Analysis", description: "Understand customer decisions", href: "/services/consumer-behavior-analysis" },
  { icon: TrendingUp, title: "Industry Trends & Forecasting", description: "Predict market shifts and opportunities", href: "/services/industry-trends-forecasting" },
  { icon: Lightbulb, title: "Product and Brand Research", description: "Product insights and brand perception", href: "/services/product-brand-research" },
  { icon: DollarSign, title: "Pricing Strategy Research", description: "Optimize pricing for profitability", href: "/services/pricing-strategy-research" },
  { icon: Heart, title: "Customer Satisfaction and Loyalty Research", description: "Measure NPS and customer loyalty", href: "/services/customer-satisfaction-loyalty-research" },
  { icon: Target, title: "Market Opportunity Identification", description: "Discover growth opportunities", href: "/services/market-opportunity-identification" },
  { icon: MessageCircle, title: "Social Media and Sentiment Analysis", description: "Monitor brand perception online", href: "/services/social-media-sentiment-analysis" },
];

interface MegaMenuProps {
  type: "industries" | "services";
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu = ({ type, isOpen, onClose }: MegaMenuProps) => {
  const items = type === "industries" 
    ? industries.map(ind => ({ icon: ind.icon, title: ind.title, description: ind.description, href: ind.href }))
    : services;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[110px] bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-xl z-50"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer CTA */}
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <p className="text-muted-foreground">
                  Can't find what you're looking for?
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Contact our experts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
