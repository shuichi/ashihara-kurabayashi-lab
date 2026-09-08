import { PageLink } from "@/components/page-link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useSite } from "@/components/site-shell";
import { locationQuery, mapLink, pageCopy } from "@/app/page-content";

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
            <p className="address-translation" lang={language === "ja" ? "en" : "ja"}>
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
                  {language === "ja" ? (
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
          <a className="text-link" href={mapLink} target="_blank" rel="noopener noreferrer">
            {t.openMap}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="map-frame" data-embed="">
          <div className="embed-placeholder" data-embed-placeholder="">
            <p>
              {language === "ja"
                ? "東京理科大学 野田キャンパス 6号館"
                : "Building 6, Tokyo University of Science, Noda Campus"}
            </p>
            <button
              type="button"
              className="primary-link"
              data-embed-src={mapEmbed}
              data-embed-title={t.mapTitle}
              hidden
            >
              {language === "ja" ? "ここに地図を表示" : "Show map here"}
            </button>
            <p className="embed-note">
              {language === "ja"
                ? "地図を表示すると、Googleに接続します。"
                : "Showing the map connects to Google."}
            </p>
            <a className="text-link" href={mapLink} target="_blank" rel="noopener noreferrer">
              {t.openMap}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
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
