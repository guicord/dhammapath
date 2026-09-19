/**
 * Content is first-party authored (content/dhamma-concepts.ts), not user
 * input; this just guards against a stray unclosed tag reaching the DOM
 * via innerHTML / dangerouslySetInnerHTML.
 */
export function sanitizeInlineHtml(html: string): string {
  return html.replace(/<(?!\/?(i|em|b)\b)[^>]*>/gi, "");
}
