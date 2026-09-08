import data from "../content/publications.json";
export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  url: string | null;
  forthcoming: boolean;
}

export const publications: Publication[] = data;
