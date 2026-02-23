import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTypes,
  getOffensiveTypeMatchups,
  getType,
  toID,
} from "@/lib/pkmn";
import { TypeDetailClient } from "./client";

export async function generateStaticParams() {
  const types = getAllTypes();
  return types.map((t) => ({ name: toID(t.name) }));
}

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const type = getType(name);

  if (!type) {
    return { title: "Type not found" };
  }

  const matchups = getOffensiveTypeMatchups(type.name);
  const superEffective = matchups.superEffective.join(", ") || "none";
  const description = `${type.name} type. Super effective against: ${superEffective}.`;

  return {
    title: `${type.name} Type`,
    description,
    alternates: {
      canonical: `/types/${name}`,
    },
    openGraph: {
      title: `${type.name} Type`,
      description,
    },
  };
}

export default async function TypeDetailPage({ params }: PageProps) {
  const { name } = await params;
  if (!getType(name)) notFound();
  return <TypeDetailClient name={name} />;
}
