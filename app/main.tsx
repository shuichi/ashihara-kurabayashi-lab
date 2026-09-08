import { StrictMode, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteShell } from '@/components/site-shell';
import { SpaRouter, usePageLocation } from '@/components/spa-router';
import { ResearchPage } from '@/components/research-page';
import { PeoplePage } from '@/components/people-page';
import { PublicationsPage } from '@/components/publications-page';
import { StudentsPage } from '@/components/students-page';
import { AccessPage } from '@/components/access-page';
import { ContactPage } from '@/components/contact-page';
import type { PagePath } from '@/lib/spa-navigation';
import Home from './page';
import './globals.css';

// All views ship in the initial bundle: changing views needs no server request.
const pages = {
  '/': Home,
  '/research': ResearchPage,
  '/people': PeoplePage,
  '/publications': PublicationsPage,
  '/students': StudentsPage,
  '/access': AccessPage,
  '/contact': ContactPage,
} satisfies Record<PagePath, ComponentType>;

function App() {
  const { pathname } = usePageLocation();
  const Page = pages[pathname];
  return (
    <SiteShell>
      <Page />
    </SiteShell>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpaRouter>
      <App />
    </SpaRouter>
  </StrictMode>,
);
