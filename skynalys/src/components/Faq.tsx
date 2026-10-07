import { faqLd } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

export function Faq({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      {withSchema ? <JsonLd data={faqLd(items)} /> : null}
    </div>
  );
}
