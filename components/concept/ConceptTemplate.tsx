import Link from "next/link";
import styles from "./ConceptTemplate.module.css";
import { RelatedConcepts } from "./RelatedConcepts";
import { SourcesList } from "./SourcesList";
import { sanitizeInlineHtml } from "@/lib/content/sanitizeInlineHtml";
import { getCategoryLabel, getCategoryThemeStyle } from "@/lib/content/categoryTheme";
import type { ConceptWithRelations } from "@/lib/content/concepts";

const DIFFICULTY_LABEL: Record<string, string> = {
  foundational: "Foundational",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ConceptTemplate({ concept }: { concept: ConceptWithRelations }) {
  return (
    <div className="wrap">
      <Link className={styles.backLink} href="/">
        ← Back to the map
      </Link>

      <header className={styles.header} style={getCategoryThemeStyle(concept.category)}>
        <div className={styles.badgeRow}>
          <span className={styles.badge} style={getCategoryThemeStyle(concept.category)}>
            {getCategoryLabel(concept.category)}
          </span>
          <span className={styles.difficultyBadge}>{DIFFICULTY_LABEL[concept.difficultyLevel] ?? concept.difficultyLevel}</span>
        </div>
        <h1 className={styles.title}>{concept.title}</h1>
        {(concept.paliTerm || concept.translation) && (
          <p className={styles.subtitle}>
            {concept.paliTerm}
            {concept.paliTerm && concept.translation ? " — " : ""}
            {concept.translation}
          </p>
        )}
      </header>

      <section className={styles.section}>
        <p className={styles.summary}>{concept.shortSummary}</p>
        <p
          className={styles.explanation}
          dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(concept.explanation) }}
        />
      </section>

      <RelatedConcepts prerequisites={concept.prerequisites} leadsTo={concept.leadsTo} related={concept.related} />

      <SourcesList sources={concept.sources} />
    </div>
  );
}
