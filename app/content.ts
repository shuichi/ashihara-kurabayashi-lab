import homeja from "../content/home/ja.json";
import homeen from "../content/home/en.json";
import researchja from "../content/research/ja.json";
import researchen from "../content/research/en.json";
import peopleja from "../content/people/ja.json";
import peopleen from "../content/people/en.json";
import publicationsja from "../content/publications/ja.json";
import publicationsen from "../content/publications/en.json";
import studentsja from "../content/students/ja.json";
import studentsen from "../content/students/en.json";
import commonja from "../content/common/ja.json";
import commonen from "../content/common/en.json";
export type { Language } from "../lib/navigation";
export const copy = {
  ja: { ...homeja, ...researchja, ...peopleja, ...publicationsja, ...studentsja, ...commonja },
  en: { ...homeen, ...researchen, ...peopleen, ...publicationsen, ...studentsen, ...commonen },
};
export type SiteContent = typeof copy.ja;
