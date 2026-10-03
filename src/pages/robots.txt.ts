import type { APIRoute } from "astro";
import { site } from "@/data/site";

/**
 * Gera o /robots.txt em tempo de build.
 *
 * É um endpoint em vez de arquivo estático para que o endereço do sitemap
 * acompanhe automaticamente o `site.url` — trocar de domínio não exige
 * lembrar de editar um segundo arquivo.
 *
 * As páginas /system/ ficam fora do sitemap e marcadas com noindex
 * (Meta.astro). Não entram em Disallow de propósito: bloqueadas aqui,
 * o buscador não leria o noindex e poderia indexar só a URL.
 */
export const GET: APIRoute = ({ site: astroSite }) => {
  const base = (astroSite ?? new URL(site.url)).href.replace(/\/$/, "");

  const corpo = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap-index.xml
`;

  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
