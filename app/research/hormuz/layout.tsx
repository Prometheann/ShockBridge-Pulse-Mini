import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil is the Headline. Helium is the Hidden Bottleneck. | ShockBridge Pulse",
  description:
    "A real-data, high-dimensional framework showing how Hormuz stress moves from energy into semiconductors and AI compute through a delayed helium bottleneck.",
};

export default function HormuzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
