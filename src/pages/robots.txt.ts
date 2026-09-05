import type { APIRoute } from "astro";
import { site } from "@/data/site";

/**
 * Gera o /robots.txt em tempo de build.
 *
 * É um endpoint em vez de arquivo estático para que o endereço do sitemap
 * acompanhe automaticamente o `site.url` — trocar de domínio não exige
 * lembrar de editar um segundo arquivo.
 *
 * As páginas /system/ são referência interna do design system: ficam
 * acessíveis, mas fora do sitemap e fora do índice dos buscadores.
 */
export const GET: APIRoute = ({ site: astroSite }) => {
  const base = (astroSite ?? new URL(site.url)).href.replace(/\/$/, "");

  const corpo = `User-agent: *
Allow: /
Disallow: /system/

Sitemap: ${base}/sitemap-index.xml
`;

  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
