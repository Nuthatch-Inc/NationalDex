import TeamDetailClient from "./TeamDetailClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TeamDetailClient id={id} />;
}
