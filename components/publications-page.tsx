import { PageLink } from "@/components/page-link";
import { ArrowRight } from "lucide-react";
import { useSite } from "./site-shell";
import { PageHeader } from "./page-header";
import { PublicationsList, publicationYears } from "./publications-list";
import { ActivityFeature } from "./activity-feature";
import { copy } from "@/app/content";
import { publications } from "@/app/publications";
import { navigation, structureCopy } from "@/app/navigation";

export function PublicationsPage() {
  const { language } = useSite();
  const t = copy[language];
  const s = structureCopy[language];
  const page = navigation[language].find((item) => item.href === "/publications")!;
  return (
    <div className="subpage publications-page">
      <PageHeader title={page.label} intro={t.publicationsIntro} />
      <ActivityFeature kind="encyclopedia" />
      <div className="container publication-index">
        <div className="publication-index-heading">
          <h2>{s.years}</h2>
          <p>
            <strong>{publications.length}</strong> {s.publicationCount}
          </p>
        </div>
        <nav className="year-navigation" aria-label={s.years}>
          {publicationYears.map((year) => (
            <PageLink href={`#year-${year}`} key={year}>
              {year}
              {language === "ja" && "年"}
            </PageLink>
          ))}
        </nav>
        <PublicationsList labels={t} />
      </div>
      <div className="container related-page">
        <PageLink href="/research" className="text-link">
          {s.researchLink}
          <ArrowRight size={18} />
        </PageLink>
      </div>
    </div>
  );
}
