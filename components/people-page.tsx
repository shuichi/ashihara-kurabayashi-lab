import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/site-shell";
import { PageHeader } from "@/components/page-header";
import { ContactCallout } from "@/components/contact-callout";
import { ActivityFeature } from "@/components/activity-feature";
import { copy } from "@/app/content";
import { navigation } from "@/app/navigation";
export function PeoplePage() {
  const { language, portraits } = useSite();
  const t = copy[language];
  const page = navigation[language].find((item) => item.href === "/people")!;
  return (
    <div className="subpage people-page">
      <PageHeader title={page.label} intro={t.peopleIntro} />
      <section className="container faculty-content" aria-label={page.label}>
        <div className="people-grid">
          {t.people.map((person) => (
            <article className="person" key={person.email}>
              <picture>
                <source type="image/avif" srcSet={portraits[person.email].avif} />
                <source type="image/webp" srcSet={portraits[person.email].webp} />
                <img
                  className="person-portrait"
                  src={portraits[person.email].src}
                  alt={person.name}
                  width={255}
                  height={312}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <p className="person-role">{person.role}</p>
              <h2>{person.name}</h2>
              <p className="person-translation" lang={language === "ja" ? "en" : "ja"}>
                {person.englishName}
              </p>
              <ul className="person-positions">
                {person.positions.map((position) => (
                  <li key={position}>{position}</li>
                ))}
              </ul>
              <p className="person-specialty">
                <span>{t.specialtyLabel}</span>
                {person.specialty}
              </p>
              <p className="person-bio">{person.bio}</p>
              <a className="person-email" href={"mailto:" + person.email}>
                {person.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <ActivityFeature kind="summit" />
      <ContactCallout />
    </div>
  );
}
