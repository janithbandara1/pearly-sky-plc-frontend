/** Renders a schema.org JSON-LD object as an inline <script> tag. */
export function JsonLd({ data }: { data: object }) {
  // JSON.stringify doesn't escape "<", so a "</script>" inside a string value
  // would otherwise close the tag early and let following markup be parsed as HTML.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
