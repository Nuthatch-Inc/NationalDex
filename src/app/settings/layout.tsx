import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure your nationaldex preferences.",
  robots: { index: false, follow: false },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
