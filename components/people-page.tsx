'use client';

import { ArrowUpRight } from 'lucide-react';
import { useSite } from '@/components/site-shell';
import { PageHeader } from '@/components/page-header';
import { ContactCallout } from '@/components/contact-callout';
import { copy } from '@/app/content';
import { navigation } from '@/app/navigation';

export function PeoplePage() {
  const { language } = useSite();
  const t = copy[language];
  const page = navigation[language].find((item) => item.href === '/people')!;
  return (
    <div className="subpage people-page">
      <PageHeader title={page.label} intro={t.peopleIntro} />
      <section className="container faculty-content" aria-label={page.label}>
        <div className="people-grid">
          {t.people.map((person) => (
            <article className="person" key={person.email}>
              <p className="person-role">{person.role}</p>
              <h2>{person.name}</h2>
              <p
                className="person-translation"
                lang={language === 'ja' ? 'en' : 'ja'}
              >
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
              <a className="person-email" href={'mailto:' + person.email}>
                {person.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <ContactCallout />
    </div>
  );
}
