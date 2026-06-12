import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface BlogFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

export const BlogFilterSidebar = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  onClearFilters,
}: BlogFilterSidebarProps) => {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b border-border sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-xl font-bold">
              Filters & Search
            </SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground text-sm">
            Refine your search with filters below
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Articles
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 rounded-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Categories
            </label>
            <div className="flex flex-col gap-2">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                
                return (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      onClose();
                    }}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-all border text-left",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary/50"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                onClearFilters();
              }}
            >
              Clear All Filters
            </Button>
            <Button 
              variant="default" 
              className="w-full"
              onClick={onClose}
            >
              Apply & Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Floating Filter Toggle Button for Blog
interface FloatingBlogFilterButtonProps {
  onClick: () => void;
  hasActiveFilters?: boolean;
}

export const FloatingBlogFilterButton = ({ onClick, hasActiveFilters }: FloatingBlogFilterButtonProps) => {
  return (
    <motion.button
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-40",
        "flex items-center gap-2 px-3 py-4",
        "bg-primary text-primary-foreground",
        "rounded-l-xl shadow-lg",
        "hover:px-4 transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      aria-label="Open filters"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span className="sr-only md:not-sr-only md:inline text-sm font-medium">Filters</span>
      {hasActiveFilters && (
        <span className="absolute -top-1 -left-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      )}
    </motion.button>
  );
};
