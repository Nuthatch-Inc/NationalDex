import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Items",
  description:
    "Browse all Pokemon items — held items, berries, TMs, key items, and more across all generations.",
  alternates: {
    canonical: "/items",
  },
  openGraph: {
    title: "Pokemon Items",
    description:
      "Browse all Pokemon items — held items, berries, TMs, key items, and more.",
  },
};

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
