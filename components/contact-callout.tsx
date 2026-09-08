import { PageLink } from "@/components/page-link";
import { ArrowRight } from "lucide-react";
import { copy } from "@/app/content";
import { pageCopy } from "@/app/page-content";
import { useSite } from "./site-shell";

export function ContactCallout() {
  const { language } = useSite();
  const t = copy[language];
  return (
    <aside className="contact-callout">
      <div className="container">
        <div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
        <PageLink href="/contact" className="primary-link">
          {pageCopy[language].contactAction}
          <ArrowRight size={18} aria-hidden="true" />
        </PageLink>
      </div>
    </aside>
  );
}
