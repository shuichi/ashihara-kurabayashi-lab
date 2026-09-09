import { ArrowDown, ArrowRight } from "lucide-react";
import { PageLink } from "@/components/page-link";
import { useSite } from "@/components/site-shell";
import { PageHeader } from "@/components/page-header";
import { ContactCallout } from "@/components/contact-callout";
import { OpenCampusGallery } from "@/components/open-campus-gallery";
import { photography } from "@/app/photography";
import { copy } from "@/app/content";
import { navigation, structureCopy } from "@/app/navigation";

export function StudentsPage() {
  const { language } = useSite();
  const t = copy[language];
  const s = structureCopy[language];
  const page = navigation[language].find((item) => item.href === "/students")!;
  return (
    <div className="subpage students-page">
      <PageHeader
        title={page.label}
        intro={page.description}
        links={[
          { href: "#skills", label: s.skills },
          { href: "#fit", label: s.fit },
          { href: "#requirements", label: s.requirements },
          { href: "#life", label: s.life },
          { href: "#roadmap", label: s.roadmap },
          { href: "#open-campus", label: photography[language].openCampus.title },
          { href: "#faq", label: s.faq },
        ]}
      >
        <section className="visit-callout" aria-labelledby="visit-title">
          <div className="visit-heading">
            <div>
              <h2 id="visit-title">{t.visit.title}</h2>
              <p>{t.visit.intro}</p>
            </div>
            <PageLink href="/contact" className="primary-link">
              {t.visit.action}
              <ArrowRight size={18} aria-hidden="true" />
            </PageLink>
          </div>
          <dl className="visit-details">
            {t.visit.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </PageHeader>
      <section id="skills" className="students-section" aria-labelledby="skills-title">
        <div className="container section">
          <div className="students-heading">
            <h2 id="skills-title">{s.skills}</h2>
            <div>
              <p>{t.studentsIntro}</p>
              <PageLink className="text-link" href="#faq">
                {t.studentsLink}
                <ArrowDown size={17} />
              </PageLink>
            </div>
          </div>
          <div className="preparation">
            <h3>{t.skillsTitle}</h3>
            <div className="steps-grid skills-grid">
              {t.skills.map((skill, i) => (
                <article className="step" key={skill.label}>
                  <div className="step-marker">
                    <span>0{i + 1}</span>
                    <span>{skill.label}</span>
                  </div>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="fit" className="container section student-details" aria-labelledby="fit-title">
        <div className="fit-section">
          <div>
            <h2 id="fit-title">{s.fit}</h2>
            <p className="section-intro">{t.fitIntro}</p>
          </div>
          <ul className="fit-list">
            {t.fit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div id="requirements" className="requirements-grid">
          <div className="requirements">
            <h2 className="subsection-title">{t.requiredTitle}</h2>
            {t.required.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="not-required">
            <h2 className="subsection-title">{t.notRequiredTitle}</h2>
            <ul>
              {t.notRequired.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t.notRequiredNote}</p>
          </div>
        </div>
        <div id="life" className="lab-life">
          <h2>{s.life}</h2>
          <div className="life-grid">
            {t.life.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div id="roadmap" className="roadmap">
          <h2>{s.roadmap}</h2>
          <p className="section-intro">{t.roadmapIntro}</p>
          <ol className="roadmap-grid">
            {t.roadmap.map((item) => (
              <li key={item.label}>
                <div className="roadmap-stop">
                  <span />
                  {item.season}
                </div>
                <span className="eyebrow">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <OpenCampusGallery />
      <section id="faq" className="container section faq-section" aria-labelledby="faq-title">
        <div className="faq-heading">
          <h2 id="faq-title">{s.faq}</h2>
          <p className="section-intro">{t.faqIntro}</p>
        </div>
        <div className="faq-list">
          {t.faq.map((item, i) => (
            <article
              className="faq-item"
              key={item.question}
              aria-labelledby={`faq-question-${i + 1}`}
            >
              <h3 className="faq-question" id={`faq-question-${i + 1}`}>
                <span className="question-number">Q{i + 1}</span>
                <span>{item.question}</span>
              </h3>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactCallout />
    </div>
  );
}
