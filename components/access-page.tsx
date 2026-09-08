'use client';

import { PageLink } from '@/components/page-link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { useSite } from '@/components/site-shell';
import { locationQuery, mapLink, pageCopy } from '@/app/page-content';

export function AccessPage() {
  const { language } = useSite();
  const t = pageCopy[language];
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed&z=17&hl=${language}`;

  return (
    <div className="subpage access-page">
      <PageHeader title={t.access} intro={t.accessIntro} />
      <section className="container access-grid" aria-label={t.access}>
        <div className="access-details">
          <address>
            <h2>{t.labName}</h2>
            <p
              className="address-translation"
              lang={language === 'ja' ? 'en' : 'ja'}
            >
              {t.labTranslation}
            </p>
            <p className="address-affiliation">
              {t.university}
              <br />
              {t.faculty}
            </p>
            <dl>
              <div>
                <dt>{t.addressLabel}</dt>
                <dd>
                  {language === 'ja' ? (
                    <>
                      {t.postalCode}
                      <br />
                      {t.address}
                    </>
                  ) : (
                    <>
                      {t.address}
                      <br />
                      {t.postalCode}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>{t.roomLabel}</dt>
                <dd className="address-room">{t.room}</dd>
              </div>
            </dl>
          </address>
          <a
            className="text-link"
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.openMap}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="map-frame">
          <iframe
            src={mapEmbed}
            title={t.mapTitle}
            width="800"
            height="540"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
      <aside className="container access-contact">
        <p>{t.visitContact}</p>
        <PageLink href="/contact" className="text-link">
          {t.contactAction}
          <ArrowRight size={17} />
        </PageLink>
      </aside>
    </div>
  );
}
