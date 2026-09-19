import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';
import { getPoolConfig } from '../lib/content/dbConnection';
import { seedConcepts, seedRelationships, seedSources } from '../content/dhamma-concepts';

// POSTGRES_URL_NON_POOLING (direct, set by Supabase's Vercel integration) is
// preferred for admin operations like seeding; local dev falls back to DATABASE_URL.
const adapter = new PrismaPg(getPoolConfig(process.env.POSTGRES_URL_NON_POOLING, process.env.DATABASE_URL));
const prisma = new PrismaClient({ adapter });

async function main() {
  const idBySlug = new Map<string, string>();

  for (const concept of seedConcepts) {
    const { slug, ...rest } = concept;
    const row = await prisma.concept.upsert({
      where: { slug },
      update: { ...rest },
      create: { slug, ...rest },
    });
    idBySlug.set(slug, row.id);
  }
  console.log(`Upserted ${seedConcepts.length} concepts`);

  for (const rel of seedRelationships) {
    const fromConceptId = idBySlug.get(rel.from);
    const toConceptId = idBySlug.get(rel.to);
    if (!fromConceptId || !toConceptId) {
      throw new Error(`Relationship references unknown slug: ${rel.from} -> ${rel.to}`);
    }
    await prisma.conceptRelationship.upsert({
      where: {
        fromConceptId_toConceptId_relationshipType: {
          fromConceptId,
          toConceptId,
          relationshipType: rel.type,
        },
      },
      update: {},
      create: { fromConceptId, toConceptId, relationshipType: rel.type },
    });
  }
  console.log(`Upserted ${seedRelationships.length} concept relationships`);

  await prisma.source.deleteMany({});
  for (const source of seedSources) {
    const conceptId = idBySlug.get(source.conceptSlug);
    if (!conceptId) {
      throw new Error(`Source references unknown slug: ${source.conceptSlug}`);
    }
    await prisma.source.create({
      data: {
        conceptId,
        title: source.title,
        url: source.url,
        attribution: source.attribution,
        sourceType: source.sourceType,
      },
    });
  }
  console.log(`Created ${seedSources.length} sources`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
