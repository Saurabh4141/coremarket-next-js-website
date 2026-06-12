"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.h1 
            className="text-[150px] md:text-[200px] font-display font-bold text-primary/10 leading-none select-none"
            animate={{ 
              textShadow: [
                "0 0 20px hsl(var(--primary) / 0.1)",
                "0 0 40px hsl(var(--primary) / 0.2)",
                "0 0 20px hsl(var(--primary) / 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          
          {/* Floating search icon animation */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Search className="w-16 h-16 md:w-24 md:h-24 text-primary/40" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
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
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/5 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default Error404;
