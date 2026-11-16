import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../_og/render.tsx";

export const alt = "Nayab Gull, AI agents, AI receptionists and websites for US businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage("AI agents, AI receptionists and websites for US businesses");
}
