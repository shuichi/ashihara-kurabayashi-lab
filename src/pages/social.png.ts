import type { APIRoute } from "astro";
import sharp from "sharp";
import { curveAt } from "../../lib/knowledge-field";
import labMark from "../../public/favicon.svg?raw";
export const GET: APIRoute = async () => {
  // A typographic card using the site's existing geometric motif; generated at build time.
  const paths = Array.from({ length: 25 }, (_, i) => `<path d="${curveAt(i / 24, 0)}"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#fafbf9"/>
    <g transform="translate(440,120) scale(.85)" fill="none" stroke="#487b70" stroke-width="1" opacity=".65">${paths}</g>
    <path d="M70 83H1130" stroke="#315e58" stroke-width="3"/>
    <g fill="#202f30" font-family="Georgia,serif" font-size="52">
      <text x="174" y="205">Ashihara–Kurabayashi</text>
      <text x="174" y="272">Laboratory</text>
    </g>
    <g fill="#315e58" font-family="sans-serif" font-size="23">
      <text x="74" y="352">From using AI to creating it.</text>
      <text x="74" y="559">TOKYO UNIVERSITY OF SCIENCE</text>
    </g>
  </svg>`;
  const mark = await sharp(Buffer.from(labMark)).resize(80, 80).png().toBuffer();
  const png = await sharp(Buffer.from(svg))
    .composite([{ input: mark, left: 70, top: 184 }])
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
