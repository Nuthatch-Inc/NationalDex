import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Pokemon",
  description:
    "Compare Pokemon side by side — stats, types, abilities, and more. Find the best Pokemon for your team.",
  openGraph: {
    title: "Compare Pokemon",
    description:
      "Compare Pokemon side by side — stats, types, abilities, and more.",
  },
};

export default function ComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
