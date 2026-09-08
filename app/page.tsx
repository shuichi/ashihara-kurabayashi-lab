import { PageLink } from "@/components/page-link";
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { KnowledgeField } from "@/components/knowledge-field";
import { ContactCallout } from "@/components/contact-callout";
import { NewsSection } from "@/components/news-section";
import { useSite } from "@/components/site-shell";
import { copy } from "./content";
import { navigation, structureCopy } from "./navigation";

export default function Home() {
  const { language, about } = useSite();
  const t = copy[language];
  const s = structureCopy[language];
  return (
    <>
      <section className="hero is-paused" aria-labelledby="hero-title">
        <div className="hero-art">
          <KnowledgeField />
        </div>
        <div className="container hero-content">
          <h1 id="hero-title">
            {t.title[0]}
            <br />
            <span>{t.title[1]}</span>
          </h1>
          <div className="hero-description">
            <p>{t.intro}</p>
            <p>{t.description}</p>
          </div>
          <div className="hero-actions">
            <PageLink href="/research" className="primary-link">
              {t.primary}
              <ArrowRight size={18} />
            </PageLink>
            <PageLink href="/students" className="text-link">
              {t.secondary}
              <ArrowUpRight size={17} />
            </PageLink>
          </div>
        </div>
        <div className="container hero-bottom">
          <div className="affiliation">
            <span>{t.university}</span>
            <span>{t.faculty}</span>
          </div>
          <PageLink href="#about" className="scroll-cue" aria-label={s.overview}>
            <span>{s.overview}</span>
            <ArrowDown size={16} />
          </PageLink>
          <button
            type="button"
            className="animation-control"
            data-motion-toggle=""
            data-play-label={t.play}
            data-pause-label={t.pause}
            aria-label={t.pause}
            aria-pressed="false"
            hidden
          >
            <Play className="motion-play" size={16} aria-hidden="true" />
            <Pause className="motion-pause" size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
      <div className="notice-bar">
        <div className="container notice-inner">
          <span className="eyebrow">{s.focus}</span>
          <p>{t.focus}</p>
        </div>
      </div>
      <NewsSection />
      <section id="about" className="section container about-section" aria-labelledby="about-title">
        <h2 id="about-title" className="home-section-title">
          {s.about}
        </h2>
        <div className="about-content">
          <p className="about-statement">
            {t.aboutTitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className="about-copy">{about}</div>
        </div>
        <div className="pillars-section">
          <h3 className="subsection-title">{t.pillarsTitle}</h3>
          <div className="research-grid">
            {t.pillars.map((pillar, i) => (
              <article className="research-item" key={pillar.label}>
                <div className="research-item-top">
                  <span className="research-number">0{i + 1}</span>
                  <span className="eyebrow">{pillar.label}</span>
                </div>
                <h4>{pillar.title}</h4>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-guide" aria-labelledby="guide-title">
        <div className="container section">
          <h2 id="guide-title">{s.guide}</h2>
          <p className="section-intro">{s.guideIntro}</p>
          <div className="page-directory">
            {navigation[language].slice(1).map((page) => (
              <PageLink
                id={page.href.slice(1)}
                href={page.href}
                className="directory-card"
                key={page.href}
              >
                <div>
                  <h3>{page.label}</h3>
                  <ArrowRight size={22} aria-hidden="true" />
                </div>
                <p>{page.description}</p>
              </PageLink>
            ))}
          </div>
        </div>
      </section>
      <ContactCallout />
    </>
  );
}
