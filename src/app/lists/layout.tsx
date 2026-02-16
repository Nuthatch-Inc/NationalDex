import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lists",
  description: "Your custom Pokemon lists on nationaldex.",
  robots: { index: false, follow: false },
};

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
