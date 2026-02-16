import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moves",
  description:
    "Browse all Pokemon moves — filter by type, category, power, accuracy, and PP. Find the perfect moves for your team.",
  openGraph: {
    title: "Pokemon Moves",
    description:
      "Browse all Pokemon moves — filter by type, category, power, accuracy, and PP.",
  },
};

export default function MovesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
