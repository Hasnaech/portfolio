import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getLegal, legalPages } from "@/lib/legal";

type Params = { slug: string };

export function generateStaticParams() {
  return legalPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const l = getLegal((await params).slug);
  if (!l) return {};
  return { title: l.title, description: l.description, alternates: { canonical: `/legal/${l.slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const l = getLegal((await params).slug);
  if (!l) notFound();
  return (
    <>
      <Breadcrumbs items={[{ name: l.title, path: `/legal/${l.slug}` }]} />
      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="prose">
          <h1>{l.title}</h1>
          {l.sections.map((s) => (
            <section key={s.heading}>
              <h2 style={{ fontSize: "1.3rem" }}>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
