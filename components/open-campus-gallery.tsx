import { photography } from "@/app/photography";
import { useSite } from "./site-shell";
import { ActivityPhoto } from "./activity-photo";

export function OpenCampusGallery() {
  const { language } = useSite();
  const t = photography[language].openCampus;
  return (
    <section
      id="open-campus"
      className="container open-campus-section"
      aria-labelledby="open-campus-title"
    >
      <div className="open-campus-heading">
        <h2 id="open-campus-title">{t.title}</h2>
        <p className="activity-description">{t.description}</p>
      </div>
      <ActivityPhoto id="campusOverview" sizes="(max-width: 1352px) 100vw, 1240px" />
      <div className="open-campus-pair">
        <ActivityPhoto
          id="campusTalk"
          sizes="(max-width: 700px) 100vw, (max-width: 1352px) 50vw, 608px"
        />
        <ActivityPhoto
          id="campusSpeaker"
          sizes="(max-width: 700px) 100vw, (max-width: 1352px) 50vw, 608px"
        />
      </div>
    </section>
  );
}
