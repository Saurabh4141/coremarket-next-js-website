import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "contact">("chat");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-semibold text-lg">How can we help?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Get expert market research support
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "chat"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Quick Message
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "contact"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Contact Info
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {activeTab === "chat" ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-xl p-3">
                    <p className="text-sm text-muted-foreground">
                      👋 Hi there! Send us a message and our team will respond within 24 hours.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      placeholder="Your email"
                      className="h-11 rounded-xl"
                    />
                    <Textarea
                      placeholder="How can we help you today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-24 rounded-xl resize-none"
                    />
                    <Button variant="gradient" className="w-full">
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Call Us</p>
                      <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                  
                  <a
                    href="mailto:info@coremarketresearch.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email Us</p>
                      <p className="text-sm text-muted-foreground">info@coremarketresearch.com</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Available Mon-Fri, 9AM-6PM EST
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-foreground text-background"
            : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
