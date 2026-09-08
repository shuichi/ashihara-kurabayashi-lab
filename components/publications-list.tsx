import { ArrowUpRight } from "lucide-react";
import { publications, type Publication } from "@/app/publications";
import type { SiteContent } from "@/app/content";
import { useSite } from "./site-shell";

type Labels = Pick<SiteContent, "publicationLink" | "forthcoming">;

export const publicationYears = [...new Set(publications.map((paper) => paper.year))].sort(
  (a, b) => b - a,
);

function PublicationEntry({ paper, labels }: { paper: Publication; labels: Labels }) {
  const originalLanguage = /[\u3040-\u30ff\u3400-\u9fff]/.test(paper.title) ? "ja" : "en";
  return (
    <article id={paper.id} className="publication-entry">
      <div className="publication-body">
        {paper.forthcoming && <span className="publication-status">{labels.forthcoming}</span>}
        <h3 lang={originalLanguage}>
          {paper.url ? (
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              {paper.title}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ) : (
            paper.title
          )}
        </h3>
        <p className="publication-authors" lang={originalLanguage}>
          {paper.authors}
        </p>
        <p className="publication-venue" lang={originalLanguage}>
          {paper.venue}
        </p>
        {paper.url && (
          <a
            className="publication-source"
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels.publicationLink}: ${paper.title}`}
          >
            {paper.url.startsWith("https://doi.org/")
              ? paper.url.replace("https://doi.org/", "DOI: ")
              : labels.publicationLink}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function PublicationsList({ labels }: { labels: Labels }) {
  const { language } = useSite();
  return (
    <div className="publications-list">
      {publicationYears.map((year) => {
        const papers = publications.filter((paper) => paper.year === year);
        return (
          <section
            id={`year-${year}`}
            className="publication-year-group"
            aria-labelledby={`year-title-${year}`}
            key={year}
          >
            <div className="publication-year-heading">
              <h2 id={`year-title-${year}`}>
                {year}
                {language === "ja" && <span>年</span>}
              </h2>
              <p>
                {papers.length}
                {language === "ja" ? "件" : papers.length === 1 ? " publication" : " publications"}
              </p>
            </div>
            <div>
              {papers.map((paper) => (
                <PublicationEntry key={paper.id} paper={paper} labels={labels} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
