import Link from "next/link";
import { categoryName, formatDate, type Post } from "@/lib/blog";

export function PostList({ items }: { items: Post[] }) {
  return (
    <div className="grid grid-3">
      {items.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-link">
          <span className="tag">{categoryName(p.category)}</span>
          <h2 style={{ fontSize: "1.2rem", marginTop: 12 }}>{p.title}</h2>
          <p className="muted small">{p.excerpt}</p>
          <span className="small muted">
            {formatDate(p.date)} · {p.readingMinutes} min de lecture
          </span>
        </Link>
      ))}
    </div>
  );
}

