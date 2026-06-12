import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { CookieConsent } from "@/components/CookieConsent";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
};
