import Link from "@/components/locale-link";
import type { LegalBlock, LegalDocument, LegalInline } from "@/lib/content/legal/types";

function Inline({ part }: { part: LegalInline }) {
  if (typeof part === "string") return <>{part}</>;
  if (part.href.startsWith("/")) {
    return (
      <Link href={part.href} className="underline underline-offset-2">
        {part.text}
      </Link>
    );
  }
  const external = part.href.startsWith("http");
  return (
    <a
      href={part.href}
      className="underline underline-offset-2"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {part.text}
    </a>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p className="text-muted-foreground">
        {block.content.map((part, i) => (
          <Inline key={i} part={part} />
        ))}
      </p>
    );
  }
  const ListTag = block.type;
  return (
    <ListTag className={`list-inside ${block.type === "ol" ? "list-decimal" : "list-disc"} text-muted-foreground`}>
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ListTag>
  );
}

/** Renders one language's copy of a legal page (privacy, cookies, terms) — see lib/content/legal/. */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <p className="text-sm text-muted-foreground">{doc.lastUpdated}</p>

      <p>
        {doc.intro.map((part, i) => (
          <Inline key={i} part={part} />
        ))}
      </p>

      {doc.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </>
  );
}
