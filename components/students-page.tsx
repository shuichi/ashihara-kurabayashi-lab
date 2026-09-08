'use client';

import { ArrowDown } from 'lucide-react';
import { PageLink } from '@/components/page-link';
import { useSite } from '@/components/site-shell';
import { PageHeader } from '@/components/page-header';
import { ContactCallout } from '@/components/contact-callout';
import { copy } from '@/app/content';
import { navigation, structureCopy } from '@/app/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function StudentsPage() {
  const { language } = useSite();
  const t = copy[language];
  const s = structureCopy[language];
  const page = navigation[language].find((item) => item.href === '/students')!;
  return (
    <div className="subpage students-page">
      <PageHeader
        title={page.label}
        intro={page.description}
        links={[
          { href: '#skills', label: s.skills },
          { href: '#fit', label: s.fit },
          { href: '#requirements', label: s.requirements },
          { href: '#life', label: s.life },
          { href: '#roadmap', label: s.roadmap },
          { href: '#faq', label: s.faq },
        ]}
      />
      <section
        id="skills"
        className="students-section"
        aria-labelledby="skills-title"
      >
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

      <section
        id="fit"
        className="container section student-details"
        aria-labelledby="fit-title"
      >
        <div className="fit-section">
          <div>
            <h2 id="fit-title">{s.fit}</h2>
            <p className="section-intro">{t.fitIntro}</p>
          </div>
          <ul className="fit-list">
            {t.fit.map((item, i) => (
              <li key={item}>
                <span>0{i + 1}</span>
                <p>{item}</p>
              </li>
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

      <section id="faq" className="container section faq-section">
        <div className="faq-heading">
          <h2>{s.faq}</h2>
          <p className="section-intro">{t.faqIntro}</p>
        </div>
        <Accordion className="faq-list" defaultValue={['question-0']}>
          {t.faq.map((item, i) => (
            <AccordionItem value={`question-${i}`} key={i}>
              <AccordionTrigger className="faq-question">
                <span className="question-number">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="faq-answer">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <ContactCallout />
    </div>
  );
}
