"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error500 = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Animated 500 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.h1 
            className="text-[150px] md:text-[200px] font-display font-bold leading-none select-none"
            style={{
              background: "linear-gradient(135deg, hsl(var(--destructive)) 0%, hsl(var(--primary)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.2
            }}
          >
            500
          </motion.h1>
          
          {/* Pulsing warning icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <AlertTriangle className="w-20 h-20 md:w-28 md:h-28 text-destructive/60" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsl(var(--destructive) / 0.4)",
                    "0 0 0 20px hsl(var(--destructive) / 0)",
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Server Error
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Oops! Something went wrong on our end. Our team has been notified. 
            Please try again in a moment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              className="gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Animated background glitches */}
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-destructive/5 blur-3xl"
          animate={{ 
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            x: [20, -20, 20],
            y: [10, -10, 10],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default Error500;
