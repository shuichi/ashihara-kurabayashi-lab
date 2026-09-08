import ja from "../content/photography/ja.json";
import en from "../content/photography/en.json";

export const photography = { ja, en };
export type PhotoId = keyof typeof ja.photos;
export type PhotoAsset = {
  src: string;
  webp: string;
  avif: string;
  width: number;
  height: number;
};
