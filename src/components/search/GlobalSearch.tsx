import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const GlobalSearch = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 h-full flex items-start justify-center pt-32">
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search reports, industries, services..."
                className="h-12 text-base"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              Start typing to search across the website
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
