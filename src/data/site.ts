/**
 * Dados de identidade do site.
 *
 * Este é o ÚNICO lugar onde seus dados pessoais ficam.
 * Para mudar nome, e-mail, links ou o texto que aparece no Google,
 * edite aqui — nenhum componente precisa ser tocado.
 */

export const site = {
  // --- Identidade ---
  nome: "Guilherme Nascimento Silva",
  nomeCurto: "Guilherme Nascimento",
  cargo: "Desenvolvedor Python | Automação de Processos",
  local: "São Paulo, Brasil",

  // --- Endereço final do site ---
  // ATENÇÃO: precisa bater com o domínio real depois do deploy.
  // É a partir daqui que o sitemap, as URLs canônicas e o
  // preview de link (WhatsApp/LinkedIn) são montados.
  url: "https://guilhermenascimento.vercel.app",

  // --- Texto que aparece no Google e no preview de link ---
  descricao:
    "Desenvolvedor Python especializado em automação de processos (RPA). " +
    "Construo robôs que navegam portais bancários, extraem documentos em " +
    "lote e integram sistemas que não conversam entre si.",

  // --- Imagem do preview de link (1200x630) ---
  ogImage: "/og-image.png",

  // --- Contato ---
  // O telefone fica FORA do site de propósito: página pública com número
  // vira alvo de spam. Quem precisa falar com você usa e-mail ou LinkedIn.
  email: "guilhermenascimentosilva1@gmail.com",
  linkedin: "https://www.linkedin.com/in/guilherme-nascimento-silva",

  // Deixe "" enquanto não tiver o usuário — o link some do site sozinho.
  github: "",
};

/** Links de contato. Entradas sem href são descartadas automaticamente. */
export const contatos = [
  { texto: "E-mail", href: `mailto:${site.email}` },
  { texto: "LinkedIn", href: site.linkedin },
  { texto: "GitHub", href: site.github },
].filter((l) => l.href && !l.href.endsWith("mailto:"));
