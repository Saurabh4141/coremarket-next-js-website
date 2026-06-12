"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldX, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error403 = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Animated 403 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.h1 
            className="text-[150px] md:text-[200px] font-display font-bold text-accent/15 leading-none select-none"
          >
            403
          </motion.h1>
          
          {/* Animated shield/lock */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <motion.div
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" } as const}
                style={{ transformStyle: "preserve-3d" }}
              >
                <ShieldX className="w-20 h-20 md:w-28 md:h-28 text-accent/50" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-8 h-8 md:w-10 md:h-10 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            You don't have permission to access this page. 
            Please check your credentials or contact support.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="default" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-10 right-20 w-24 h-24 rounded-full bg-accent/5 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default Error403;
