/** Fills `{name}` placeholders in a translation, leaving any it has no value for as written. */
export function formatTranslation(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in vars ? String(vars[name]) : placeholder,
  );
}
