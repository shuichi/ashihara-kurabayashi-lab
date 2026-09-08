import ja from "../content/pages/ja.json";
import en from "../content/pages/en.json";
import site from "../content/site.json";
export const pageCopy = { ja, en };
export const { formLink, locationQuery } = site;
export const mapLink =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(locationQuery);
