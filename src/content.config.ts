import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import * as schemas from "./content-schemas";
export const collections = {
  photography: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/photography" }),
    schema: schemas.photographySchema,
  }),
  news: defineCollection({
    loader: file("./content/news.json"),
    schema: schemas.newsSchema,
  }),
  about: defineCollection({
    loader: glob({ pattern: "*.md", base: "./content/about" }),
    schema: z.object({ language: z.enum(["ja", "en"]) }).strict(),
  }),
  home: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/home" }),
    schema: schemas.homeSchema,
  }),
  research: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/research" }),
    schema: schemas.researchSchema,
  }),
  people: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/people" }),
    schema: schemas.peopleSchema,
  }),
  publications: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/publications" }),
    schema: schemas.publicationsSchema,
  }),
  students: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/students" }),
    schema: schemas.studentsSchema,
  }),
  common: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/common" }),
    schema: schemas.commonSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/pages" }),
    schema: schemas.pagesSchema,
  }),
  navigation: defineCollection({
    loader: glob({ pattern: "*.json", base: "./content/navigation" }),
    schema: schemas.navigationSchema,
  }),
  bibliography: defineCollection({
    loader: file("./content/publications.json"),
    schema: schemas.publicationSchema,
  }),
};
