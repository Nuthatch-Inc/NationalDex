import ListDetailClient from "./ListDetailClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ListDetailClient id={id} />;
}
