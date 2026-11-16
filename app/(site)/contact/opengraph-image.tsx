import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../_og/render.tsx";

export const alt = "Contact Nayab Gull for a free quote";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage(alt);
}
