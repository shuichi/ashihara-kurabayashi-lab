import { PageLink } from "@/components/page-link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { useSite } from "./site-shell";
import { pageCopy } from "@/app/page-content";
import { structureCopy } from "@/app/navigation";

export function PageHeader({
  title,
  intro,
  links = [],
}: {
  title: string;
  intro: string;
  links?: { href: string; label: string }[];
}) {
  const { language } = useSite();
  return (
    <header className="container subpage-header">
      <PageLink href="/" className="return-link">
        <ArrowLeft size={16} aria-hidden="true" />
        {pageCopy[language].home}
      </PageLink>
      <h1>{title}</h1>
      <p className="section-intro">{intro}</p>
      {links.length > 0 && (
        <nav className="page-contents" aria-label={structureCopy[language].contents}>
          <p>{structureCopy[language].contents}</p>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <PageLink href={link.href}>
                  {link.label}
                  <ArrowDown size={14} aria-hidden="true" />
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
