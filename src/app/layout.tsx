import type { Metadata } from "next";
import "@/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CoreMarket Research",
  description:
    "CoreMarket Research provides market intelligence, industry analysis, and growth insights.",
  icons: {
    icon: { url: "/logo.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
