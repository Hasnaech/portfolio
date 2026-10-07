import { trustPoints } from "@/lib/site";

export function AnnouncementBar() {
  const items = [...trustPoints, ...trustPoints];
  return (
    <div className="announce" role="region" aria-label="Engagements Skyalys">
      <div className="announce-track">
        {items.map((t, i) => (
          <span key={i} aria-hidden={i >= trustPoints.length}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
