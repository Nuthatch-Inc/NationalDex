import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatName, getAbility, getAllAbilities, toID } from "@/lib/pkmn";
import { AbilityDetailClient } from "./client";

export async function generateStaticParams() {
  const abilities = getAllAbilities();
  return abilities.map((a) => ({ name: toID(a.name) }));
}

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const ability = getAbility(name);

  if (!ability) {
    return { title: "Ability not found" };
  }

  const description =
    ability.shortDesc ||
    ability.desc ||
    `${formatName(ability.name)} — Pokémon ability.`;

  return {
    title: formatName(ability.name),
    description,
    alternates: {
      canonical: `/abilities/${name}`,
    },
    openGraph: {
      title: formatName(ability.name),
      description,
    },
  };
}

export default async function AbilityDetailPage({ params }: PageProps) {
  const { name } = await params;
  if (!getAbility(name)) notFound();
  return <AbilityDetailClient name={name} />;
}
