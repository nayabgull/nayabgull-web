import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "./_og/render.tsx";

export const alt = "Nayab Gull, web development agency for US businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage("Web development agency for US businesses");
}
