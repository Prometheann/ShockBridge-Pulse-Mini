import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShockBridge Pulse · From market shock to clean signal",
  description:
    "Turn a macro event, earnings surprise, or market shock into a sharp Intelligence Brief in seconds. Structured macro logic for traders, investors, and analysts.",
  openGraph: {
    title: "ShockBridge Pulse",
    description: "From market shock to clean signal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
