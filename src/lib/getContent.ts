import rawOverrides from "@/data/content-overrides.json";

export type ContentOverrides = Record<string, string>;

export const contentOverrides: ContentOverrides = rawOverrides;

export function getContent(key: string, fallback: string): string {
  return contentOverrides[key] ?? fallback;
}

// Segunda barreira, para o caso de o JSON ser editado à mão:
// link fora deste padrão (ex.: `javascript:`) cai no valor padrão.
const HREF_SEGURO = /^(https?:\/\/|mailto:|\/|#)/i;

export function getLinkHref(linkKey: string, fallback: string): string {
  const href = contentOverrides[`link.${linkKey}`];
  return href && HREF_SEGURO.test(href) ? href : fallback;
}

export function getImageSrc(imageKey: string): string | undefined {
  return contentOverrides[`image.${imageKey}`];
}
