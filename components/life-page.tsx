import { ActivityPhoto } from "@/components/activity-photo";
import { ContactCallout } from "@/components/contact-callout";
import { PageHeader } from "@/components/page-header";
import { copy } from "@/app/content";
import { navigation } from "@/app/navigation";
import { useSite } from "@/components/site-shell";

const scenePhotos = [
  ["dailyWhiteboardGroup", "dailyNotes"],
  ["dailyResultsClose"],
  ["facultyDiscussionWide"],
] as const;

export function LifePage() {
  const { language } = useSite();
  const t = copy[language];
  const page = navigation[language].find((item) => item.href === "/life")!;
  const lifeHeadline =
    language === "ja"
      ? t.lifeHeadline.replace("、", "、\n")
      : t.lifeHeadline.replace(",", ",\n");

  return (
    <div className="subpage lab-life-page">
      <PageHeader
        title={page.label}
        intro={page.description}
      />

      <section className="container life-hero" aria-labelledby="life-headline">
        <div className="life-hero-copy">
          <p className="eyebrow">{t.lifeEyebrow}</p>
          <h2 id="life-headline">{lifeHeadline}</h2>
          <p>{t.lifeLead}</p>
        </div>
        <ActivityPhoto
          id="facultyPresentationRoom"
          sizes="(max-width: 700px) 100vw, (max-width: 1352px) 58vw, 720px"
        />
      </section>

      <section id="scenes" className="life-scenes" aria-labelledby="life-scenes-title">
        <div className="container section">
          <div className="life-section-heading">
            <h2 id="life-scenes-title">{t.lifeScenesTitle}</h2>
            <p>{t.lifeScenesIntro}</p>
          </div>
          {t.lifeScenes.map((scene, index) => (
            <article className="life-scene" key={scene.label}>
              <div className="life-scene-copy">
                <p className="activity-label">{scene.label}</p>
                <h3>
                  {language === "ja" && index === 2
                    ? scene.title.replace("、", "、\n")
                    : scene.title}
                </h3>
                <p>{scene.description}</p>
              </div>
              <div className={`life-photo-grid life-photo-grid-${index + 1}`}>
                {scenePhotos[index].map((id) => (
                  <ActivityPhoto
                    id={id}
                    key={id}
                    sizes="(max-width: 700px) 100vw, (max-width: 1352px) 50vw, 608px"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="container section life-process" aria-labelledby="life-process-title">
        <div className="life-section-heading">
          <h2 id="life-process-title">{t.lifeProcessTitle}</h2>
          <p>{t.lifeProcessIntro}</p>
        </div>
        <ol className="life-process-grid">
          {t.lifeProcess.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <ContactCallout />
    </div>
  );
}
