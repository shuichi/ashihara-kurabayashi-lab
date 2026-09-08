import Home from "@/app/page";
import { ResearchPage } from "./research-page";
import { PeoplePage } from "./people-page";
import { PublicationsPage } from "./publications-page";
import { StudentsPage } from "./students-page";
import { AccessPage } from "./access-page";
import { ContactPage } from "./contact-page";
import { SiteShell, type SiteProps } from "./site-shell";
import type { PagePath } from "@/lib/navigation";
import type { ComponentType, ReactNode } from "react";
const pages = {
  "/": Home,
  "/research": ResearchPage,
  "/people": PeoplePage,
  "/publications": PublicationsPage,
  "/students": StudentsPage,
  "/access": AccessPage,
  "/contact": ContactPage,
} satisfies Record<PagePath, ComponentType>;
export default function SitePage(props: SiteProps & { about?: ReactNode }) {
  const Page = pages[props.pathname];
  return (
    <SiteShell {...props}>
      <Page />
    </SiteShell>
  );
}
