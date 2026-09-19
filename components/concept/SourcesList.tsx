import styles from "./ConceptTemplate.module.css";

interface SourceItem {
  id: string;
  title: string;
  url: string;
  attribution: string;
  sourceType: string;
}

const SOURCE_TYPE_LABEL: Record<string, string> = {
  sutta: "Sutta",
  commentary: "Commentary",
  translation: "Translation",
  other: "Source",
};

export function SourcesList({ sources }: { sources: SourceItem[] }) {
  return (
    <section className={styles.section}>
      <h2>Read the source</h2>
      {sources.length === 0 ? (
        <p className={styles.sourcesPlaceholder}>Source references for this concept are coming soon.</p>
      ) : (
        <ul className={styles.sourceList}>
          {sources.map((source) => (
            <li key={source.id} className={styles.sourceItem}>
              <a className={styles.sourceTitle} href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
              <span className={styles.sourceMeta}>
                {SOURCE_TYPE_LABEL[source.sourceType] ?? source.sourceType} — {source.attribution}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
