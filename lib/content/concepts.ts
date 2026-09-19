import { prisma } from "./prisma";

export async function getAllConceptSlugs(): Promise<string[]> {
  const concepts = await prisma.concept.findMany({ select: { slug: true } });
  return concepts.map((c) => c.slug);
}

export interface RelatedConceptSummary {
  slug: string;
  title: string;
  category: string;
}

export async function getConceptBySlug(slug: string) {
  const concept = await prisma.concept.findUnique({
    where: { slug },
    include: {
      sources: true,
      relationshipsFrom: {
        include: { toConcept: { select: { slug: true, title: true, category: true } } },
      },
      relationshipsTo: {
        include: { fromConcept: { select: { slug: true, title: true, category: true } } },
      },
    },
  });
  if (!concept) return null;

  // "prerequisite"/"derives_from" reads as "fromConcept enables toConcept": if
  // this concept is the `from` side, the related concept comes after it; if
  // it's the `to` side, the related concept should be understood first.
  const prerequisites = new Map<string, RelatedConceptSummary>();
  const leadsTo = new Map<string, RelatedConceptSummary>();
  const related = new Map<string, RelatedConceptSummary>();

  for (const r of concept.relationshipsFrom) {
    const summary = r.toConcept;
    if (r.relationshipType === "related") related.set(summary.slug, summary);
    else leadsTo.set(summary.slug, summary);
  }
  for (const r of concept.relationshipsTo) {
    const summary = r.fromConcept;
    if (r.relationshipType === "related") related.set(summary.slug, summary);
    else prerequisites.set(summary.slug, summary);
  }

  return {
    ...concept,
    prerequisites: Array.from(prerequisites.values()),
    leadsTo: Array.from(leadsTo.values()),
    related: Array.from(related.values()),
  };
}

export type ConceptWithRelations = NonNullable<Awaited<ReturnType<typeof getConceptBySlug>>>;
