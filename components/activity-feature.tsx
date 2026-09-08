import { photography } from "@/app/photography";
import { useSite } from "./site-shell";
import { ActivityPhoto } from "./activity-photo";

export function ActivityFeature({ kind }: { kind: "summit" | "encyclopedia" }) {
  const { language } = useSite();
  const t = photography[language][kind];
  const id = kind === "summit" ? "international-activities" : "books";
  return (
    <section id={id} className="container activity-feature" aria-labelledby={`${id}-title`}>
      <ActivityPhoto id={kind} sizes="(max-width: 700px) 100vw, (max-width: 1352px) 60vw, 720px" />
      <div className="activity-feature-copy">
        <p className="activity-label">{t.label}</p>
        <h2 id={`${id}-title`}>{t.title}</h2>
        <p className="activity-description">{t.description}</p>
      </div>
    </section>
  );
}
