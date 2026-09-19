import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ConceptTemplate } from "@/components/concept/ConceptTemplate";
import { getAllConceptSlugs, getConceptBySlug } from "@/lib/content/concepts";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllConceptSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);
  if (!concept) return {};
  return {
    title: `${concept.title} — Dhamma map`,
    description: concept.shortSummary,
  };
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);
  if (!concept) notFound();
  return <ConceptTemplate concept={concept} />;
}
