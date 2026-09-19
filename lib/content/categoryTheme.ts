import type { CSSProperties } from "react";

const THEME_BY_CATEGORY: Record<string, string> = {
  "nature-of-reality": "pink",
  "suffering-and-truth": "rust",
  "path-and-practice": "violet",
  "ethics-and-conduct": "green",
  "concentration-and-meditation": "amber",
  "liberation-and-awakening": "teal",
};

const CATEGORY_LABELS: Record<string, string> = {
  "nature-of-reality": "Nature of Reality",
  "suffering-and-truth": "Suffering and Truth",
  "path-and-practice": "Path and Practice",
  "ethics-and-conduct": "Ethics and Conduct",
  "concentration-and-meditation": "Concentration and Meditation",
  "liberation-and-awakening": "Liberation and Awakening",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getCategoryThemeStyle(category: string): CSSProperties {
  const theme = THEME_BY_CATEGORY[category] ?? "violet";
  return {
    background: `var(--${theme}-bg)`,
    borderColor: `var(--${theme}-line)`,
    color: `var(--${theme}-ink)`,
  };
}
