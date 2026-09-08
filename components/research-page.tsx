import { PageLink } from "@/components/page-link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/site-shell";
import { PageHeader } from "@/components/page-header";
import { ContactCallout } from "@/components/contact-callout";
import { copy } from "@/app/content";
import { navigation, structureCopy } from "@/app/navigation";
import { publications } from "@/app/publications";

export function ResearchPage() {
  const { language } = useSite();
  const t = copy[language];
  const s = structureCopy[language];
  const page = navigation[language].find((item) => item.href === "/research")!;
  return (
    <div className="subpage research-page">
      <PageHeader
        title={page.label}
        intro={page.description}
        links={[
          { href: "#themes", label: s.themes },
          { href: "#projects", label: s.projects },
          { href: "#computing", label: s.computing },
        ]}
      />
      <section id="themes" className="research-section" aria-labelledby="themes-title">
        <div className="container section">
          <div className="research-heading">
            <h2 id="themes-title">{s.themes}</h2>
            <p className="section-intro">{t.researchIntro}</p>
          </div>
          <div className="research-grid">
            {t.research.map((item, i) => (
              <article className="research-item" key={item.label}>
                <div className="research-item-top">
                  <span className="research-number">0{i + 1}</span>
                  <span className="eyebrow">{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="research-rule" />
              </article>
            ))}
          </div>
          <aside id="computing" className="compute-note">
            <span className="eyebrow">{s.computing}</span>
            <div>
              <h3>{t.computeTitle}</h3>
              <p>{t.computeText}</p>
            </div>
          </aside>
          <div id="projects" className="projects-section">
            <h2>{s.projects}</h2>
            <p className="section-intro">{t.projectsIntro}</p>
            <div className="project-list">
              {t.projects.map((project) => (
                <article className="project-row" key={project.name}>
                  <div className="project-identity">
                    <span className="eyebrow">{project.label}</span>
                    <p lang="en">{project.name}</p>
                  </div>
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      {project.publications.map((id) => {
                        const paper = publications.find((item) => item.id === id);
                        return paper?.url ? (
                          <a
                            href={paper.url}
                            key={id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                            aria-label={t.relatedPaper + ": " + paper.title}
                          >
                            {t.relatedPaper}
                            <span>{paper.year}</span>
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="container related-page">
        <PageLink href="/publications" className="text-link">
          {s.publicationsLink}
          <ArrowRight size={18} />
        </PageLink>
        <PageLink href="/students" className="text-link">
          {s.studentsLink}
          <ArrowRight size={18} />
        </PageLink>
      </div>
      <ContactCallout />
    </div>
  );
}
