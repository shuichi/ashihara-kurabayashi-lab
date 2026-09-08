import { ArrowRight } from "lucide-react";
import { photography, type PhotoId } from "@/app/photography";
import { useSite } from "./site-shell";
import { PageLink } from "./page-link";
import { ActivityPhoto } from "./activity-photo";

export function ActivityHighlights() {
  const { language } = useSite();
  const t = photography[language];
  const items = [
    { photo: "campusSpeaker", text: t.openCampus, href: "/students#open-campus" },
    { photo: "summit", text: t.summit, href: "/people#international-activities" },
    { photo: "encyclopedia", text: t.encyclopedia, href: "/publications#books" },
  ] satisfies { photo: PhotoId; text: typeof t.openCampus; href: string }[];
  return (
    <section className="container activity-highlights" aria-labelledby="activities-title">
      <h2 id="activities-title" className="home-section-title">
        {t.homeTitle}
      </h2>
      <div className="activity-grid">
        {items.map(({ photo, text, href }) => (
          <PageLink href={href} className="activity-link" key={photo}>
            <ActivityPhoto
              id={photo}
              sizes="(max-width: 700px) 100vw, (max-width: 1352px) 33vw, 398px"
              caption={false}
            />
            <p className="activity-label">{text.label}</p>
            <h3>{text.title}</h3>
            <span className="activity-action">
              {text.link}
              <ArrowRight size={17} aria-hidden="true" />
            </span>
          </PageLink>
        ))}
      </div>
    </section>
  );
}
