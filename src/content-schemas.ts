import { z } from "astro/zod";
export const homeSchema = z
  .object({
    title: z.array(z.string().min(1)).min(1),
    intro: z.string().min(1),
    description: z.string().min(1),
    primary: z.string().min(1),
    secondary: z.string().min(1),
    focus: z.string().min(1),
    aboutTitle: z.array(z.string().min(1)).min(1),
    pillarsTitle: z.string().min(1),
    pillars: z
      .array(
        z
          .object({
            label: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export const researchSchema = z
  .object({
    researchTitle: z.string().min(1),
    researchIntro: z.string().min(1),
    research: z
      .array(
        z
          .object({
            label: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    computeTitle: z.string().min(1),
    computeText: z.string().min(1),
    projectsTitle: z.string().min(1),
    projectsIntro: z.string().min(1),
    projects: z
      .array(
        z
          .object({
            name: z.string().min(1),
            label: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
            publications: z.array(z.string().min(1)).min(1),
          })
          .strict(),
      )
      .min(1),
    relatedPaper: z.string().min(1),
  })
  .strict();
export const peopleSchema = z
  .object({
    peopleTitle: z.string().min(1),
    peopleIntro: z.string().min(1),
    people: z
      .array(
        z
          .object({
            name: z.string().min(1),
            englishName: z.string().min(1),
            role: z.string().min(1),
            email: z.string().min(1),
            positions: z.array(z.string().min(1)).min(1),
            specialty: z.string().min(1),
            bio: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    specialtyLabel: z.string().min(1),
    biography: z.string().min(1),
  })
  .strict();
export const publicationsSchema = z
  .object({
    publicationsTitle: z.string().min(1),
    publicationsIntro: z.string().min(1),
    publicationLink: z.string().min(1),
    forthcoming: z.string().min(1),
    showPublications: z.string().min(1),
    hidePublications: z.string().min(1),
  })
  .strict();
export const studentsSchema = z
  .object({
    studentsTitle: z.array(z.string().min(1)).min(1),
    studentsIntro: z.string().min(1),
    studentsLink: z.string().min(1),
    skillsTitle: z.string().min(1),
    skills: z
      .array(
        z
          .object({
            label: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    fitTitle: z.string().min(1),
    fitIntro: z.string().min(1),
    fit: z.array(z.string().min(1)).min(1),
    requiredTitle: z.string().min(1),
    required: z
      .array(
        z
          .object({
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    notRequiredTitle: z.string().min(1),
    notRequired: z.array(z.string().min(1)).min(1),
    notRequiredNote: z.string().min(1),
    lifeTitle: z.string().min(1),
    life: z
      .array(
        z
          .object({
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    roadmapTitle: z.string().min(1),
    roadmapIntro: z.string().min(1),
    roadmap: z
      .array(
        z
          .object({
            season: z.string().min(1),
            label: z.string().min(1),
            title: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    faqTitle: z.string().min(1),
    faqIntro: z.string().min(1),
    faq: z
      .array(
        z
          .object({
            question: z.string().min(1),
            answer: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export const commonSchema = z
  .object({
    university: z.string().min(1),
    faculty: z.string().min(1),
    skip: z.string().min(1),
    menu: z.string().min(1),
    theme: z.string().min(1),
    pause: z.string().min(1),
    play: z.string().min(1),
    top: z.string().min(1),
    contactTitle: z.string().min(1),
    contactText: z.string().min(1),
  })
  .strict();
export const pagesSchema = z
  .object({
    access: z.string().min(1),
    contact: z.string().min(1),
    home: z.string().min(1),
    accessIntro: z.string().min(1),
    university: z.string().min(1),
    faculty: z.string().min(1),
    labName: z.string().min(1),
    labTranslation: z.string().min(1),
    addressLabel: z.string().min(1),
    postalCode: z.string().min(1),
    address: z.string().min(1),
    roomLabel: z.string().min(1),
    room: z.string().min(1),
    mapTitle: z.string().min(1),
    openMap: z.string().min(1),
    contactIntro: z.string().min(1),
    formTitle: z.string().min(1),
    openForm: z.string().min(1),
    formHelp: z.string().min(1),
    formLanguageNote: z.string().min(1),
    responseNote: z.string().min(1),
    visitContact: z.string().min(1),
    contactAction: z.string().min(1),
  })
  .strict();
export const navigationSchema = z
  .object({
    links: z
      .array(
        z
          .object({
            href: z.string().min(1),
            label: z.string().min(1),
            description: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
    labels: z
      .object({
        about: z.string().min(1),
        guide: z.string().min(1),
        guideIntro: z.string().min(1),
        focus: z.string().min(1),
        overview: z.string().min(1),
        contents: z.string().min(1),
        themes: z.string().min(1),
        projects: z.string().min(1),
        computing: z.string().min(1),
        skills: z.string().min(1),
        fit: z.string().min(1),
        requirements: z.string().min(1),
        life: z.string().min(1),
        roadmap: z.string().min(1),
        faq: z.string().min(1),
        years: z.string().min(1),
        publicationCount: z.string().min(1),
        researchLink: z.string().min(1),
        publicationsLink: z.string().min(1),
        studentsLink: z.string().min(1),
      })
      .strict(),
  })
  .strict();
export const publicationSchema = z
  .object({
    id: z.string().regex(/^publication-\d+$/),
    year: z.number().int().min(1900).max(2100),
    title: z.string().min(1),
    authors: z.string().min(1),
    venue: z.string().min(1),
    url: z
      .url()
      .regex(/^https?:\/\//)
      .nullable(),
    forthcoming: z.boolean(),
  })
  .strict();
