import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShockBridge Pulse · From market shock to clean signal",
  description:
    "Turn a macro event, earnings surprise, or market shock into a sharp analyst-style memo in seconds. Structured market logic for traders, creators, and analysts.",
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
