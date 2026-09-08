'use client';

import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { useSite } from '@/components/site-shell';
import { formLink, pageCopy } from '@/app/page-content';

export function ContactPage() {
  const { language } = useSite();
  const t = pageCopy[language];

  return (
    <div className="subpage contact-page">
      <PageHeader title={t.contact} intro={t.contactIntro} />
      <div className="container contact-page-body">
        <div className="contact-form-intro">
          <p>{t.responseNote}</p>
          <a
            className="text-link"
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.openForm}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="form-frame">
          <iframe
            src={`${formLink}?embedded=true&hl=${language}`}
            title={t.formTitle}
            width="800"
            height="1480"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="form-help">
          <p>
            {t.formHelp}{' '}
            <a href={formLink} target="_blank" rel="noopener noreferrer">
              {t.openForm}
              <ArrowUpRight size={14} />
            </a>
          </p>
          {language === 'en' && <p>{t.formLanguageNote}</p>}
        </div>
      </div>
    </div>
  );
}
