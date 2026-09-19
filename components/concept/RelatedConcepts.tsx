import Link from "next/link";
import styles from "./ConceptTemplate.module.css";
import type { RelatedConceptSummary } from "@/lib/content/concepts";

function Group({ title, items }: { title: string; items: RelatedConceptSummary[] }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.relatedGroup}>
      <h3>{title}</h3>
      <ul className={styles.relatedList}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link className={styles.relatedLink} href={`/concepts/${item.slug}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedConcepts({
  prerequisites,
  leadsTo,
  related,
}: {
  prerequisites: RelatedConceptSummary[];
  leadsTo: RelatedConceptSummary[];
  related: RelatedConceptSummary[];
}) {
  if (prerequisites.length === 0 && leadsTo.length === 0 && related.length === 0) {
    return null;
  }
  return (
    <section className={styles.section}>
      <h2>Related concepts</h2>
      <Group title="Understand first" items={prerequisites} />
      <Group title="Leads to" items={leadsTo} />
      <Group title="Related" items={related} />
    </section>
  );
}
