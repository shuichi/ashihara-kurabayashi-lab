import { ArrowUpRight } from "lucide-react";
import news from "../content/news.json";
import { useSite } from "./site-shell";

const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

export function NewsSection() {
  const { language } = useSite();
  return (
    <section id="news" className="container news-section" aria-labelledby="news-title">
      <div className="news-heading">
        <h2 id="news-title">{language === "ja" ? "お知らせ" : "News"}</h2>
        <p>{language === "ja" ? "研究と、研究室の日々。" : "Research and life in the lab."}</p>
      </div>
      <ol className="news-list">
        {latestNews.map((item) => {
          const text = item[language];
          return (
            <li key={item.id}>
              <div className="news-meta">
                <time dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
                <span>{text.category}</span>
              </div>
              <div className="news-copy">
                <h3>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {text.title}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  ) : (
                    text.title
                  )}
                </h3>
                {text.description && <p>{text.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
