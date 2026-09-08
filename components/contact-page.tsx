import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useSite } from "@/components/site-shell";
import { copy } from "@/app/content";
import { formLink, pageCopy } from "@/app/page-content";

export function ContactPage() {
  const { language } = useSite();
  const t = pageCopy[language];

  return (
    <div className="subpage contact-page">
      <PageHeader title={t.contact} intro={t.contactIntro} />
      <div className="container contact-page-body">
        <div className="contact-form-intro">
          <p>{t.responseNote}</p>
          <a className="text-link" href={formLink} target="_blank" rel="noopener noreferrer">
            {t.openForm}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <section
          className="contact-emails"
          aria-label={language === "ja" ? "教員へのメール" : "Email the faculty"}
        >
          {copy[language].people.map((person) => (
            <article key={person.email}>
              <h2>{person.name}</h2>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </article>
          ))}
        </section>
        <div className="form-frame" data-embed="">
          <div className="embed-placeholder" data-embed-placeholder="">
            <p>
              {language === "ja"
                ? "Googleフォームからもお問い合わせいただけます。"
                : "You can also contact us using Google Forms."}
            </p>
            <button
              type="button"
              className="primary-link"
              data-embed-src={`${formLink}?embedded=true&hl=${language}`}
              data-embed-title={t.formTitle}
              data-embed-height="1480"
              hidden
            >
              {language === "ja" ? "ここにフォームを表示" : "Show form here"}
            </button>
            <p className="embed-note">
              {language === "ja"
                ? "フォームを表示すると、Googleに接続します。"
                : "Showing the form connects to Google."}
            </p>
            <a className="text-link" href={formLink} target="_blank" rel="noopener noreferrer">
              {t.openForm}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="form-help">
          <p>
            {t.formHelp}{" "}
            <a href={formLink} target="_blank" rel="noopener noreferrer">
              {t.openForm}
              <ArrowUpRight size={14} />
            </a>
          </p>
          {language === "en" && <p>{t.formLanguageNote}</p>}
        </div>
      </div>
    </div>
  );
}
