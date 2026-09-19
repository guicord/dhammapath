-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('foundational', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('related', 'prerequisite', 'derives_from');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('sutta', 'commentary', 'translation', 'other');

-- CreateTable
CREATE TABLE "concepts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pali_term" TEXT,
    "translation" TEXT,
    "short_summary" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty_level" "DifficultyLevel" NOT NULL,
    "tags" TEXT[],
    "map_node_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concept_relationships" (
    "id" TEXT NOT NULL,
    "from_concept_id" TEXT NOT NULL,
    "to_concept_id" TEXT NOT NULL,
    "relationship_type" "RelationshipType" NOT NULL,

    CONSTRAINT "concept_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "concept_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "attribution" TEXT NOT NULL,
    "source_type" "SourceType" NOT NULL,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "concepts_slug_key" ON "concepts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "concepts_map_node_id_key" ON "concepts"("map_node_id");

-- CreateIndex
CREATE INDEX "concepts_category_idx" ON "concepts"("category");

-- CreateIndex
CREATE INDEX "concept_relationships_from_concept_id_idx" ON "concept_relationships"("from_concept_id");

-- CreateIndex
CREATE INDEX "concept_relationships_to_concept_id_idx" ON "concept_relationships"("to_concept_id");

-- CreateIndex
CREATE UNIQUE INDEX "concept_relationships_from_concept_id_to_concept_id_relatio_key" ON "concept_relationships"("from_concept_id", "to_concept_id", "relationship_type");

-- CreateIndex
CREATE INDEX "sources_concept_id_idx" ON "sources"("concept_id");

-- AddForeignKey
ALTER TABLE "concept_relationships" ADD CONSTRAINT "concept_relationships_from_concept_id_fkey" FOREIGN KEY ("from_concept_id") REFERENCES "concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concept_relationships" ADD CONSTRAINT "concept_relationships_to_concept_id_fkey" FOREIGN KEY ("to_concept_id") REFERENCES "concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sources" ADD CONSTRAINT "sources_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
