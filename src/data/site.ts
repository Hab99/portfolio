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
  cargo: "Desenvolvedor RPA | Automação | Python",
  local: "São Paulo, Brasil",

  // --- Endereço final do site ---
  // ATENÇÃO: precisa bater com o domínio real depois do deploy.
  // É a partir daqui que o sitemap, as URLs canônicas e o
  // preview de link (WhatsApp/LinkedIn) são montados.
  url: "https://guilhermenascimento.vercel.app",

  // --- Texto que aparece no Google e no preview de link ---
  descricao:
    "Desenvolvedor RPA com robôs em produção numa operação de BPO jurídico. " +
    "Automatizo o que não tem API nem DOM: terminal de mainframe dentro do " +
    "Citrix, portais bancários e documentos em lote.",

  // --- Verificação de propriedade no Google Search Console ---
  // Prova ao Google que o site é seu. Não é segredo: fica visível no
  // HTML de qualquer página. Só some se a propriedade for removida lá.
  verificacaoGoogle: "_cgfpdObkVsot10cM_k-kr0PPNRYTTziqqcuHtAQgck",

  // --- Imagem do preview de link (1200x630) ---
  ogImage: "/og-image.png",

  // --- Contato ---
  // O telefone fica FORA do site de propósito: página pública com número
  // vira alvo de spam. Quem precisa falar com você usa e-mail ou LinkedIn.
  email: "guilhermenascimentosilva1@gmail.com",
  linkedin: "https://www.linkedin.com/in/guilherme-nascimento-silva",

  // Perfil, não repositório: é para cá que o visitante deve ir, e é o
  // que o schema.org espera em sameAs (identidade, não projeto).
  // O link do repositório deste site fica no colofão, abaixo.
  github: "https://github.com/Hab99",
};

/**
 * Colofão — como o site foi feito.
 *
 * Transparência deliberada: declarar o uso de IA e creditar o template
 * é postura profissional, não confissão. O termo usado é
 * "AI-assisted development" — e não "vibe coding", que significa
 * aceitar o que a IA gera sem revisar.
 */
/**
 * Dados usados nos dados estruturados (JSON-LD / schema.org).
 *
 * Servem para o buscador entender que esta página descreve UMA PESSOA
 * específica — e não uma coincidência de palavras. É o que ajuda o
 * Google a te tratar como entidade quando alguém pesquisa seu nome.
 */
export const perfil = {
  cargoCurto: "Desenvolvedor RPA",
  cidade: "São Paulo",
  estado: "SP",
  pais: "BR",
  empresaAtual: "e-Xyon",
  formacao: "Senac São Paulo",
  // Assuntos que você domina — vira o campo knowsAbout do schema.
  competencias: [
    "Python",
    "Automação de processos (RPA)",
    "Citrix/VDI",
    "Terminal de mainframe (IMS/PCOM)",
    "OpenCV",
    "Tesseract OCR",
    "Playwright",
    "PyAutoGUI",
    "Power Automate",
    "SQL Server",
    "APIs REST",
  ],
};

export const colofao = {
  stack: "Astro, Tailwind e TypeScript. Publicado na Vercel.",
  metodo:
    "AI-assisted development com Claude (Anthropic): direção, decisões de produto, revisão e validação minhas; implementação assistida.",
  template: {
    texto: "Template base",
    href: "https://www.youtube.com/watch?v=9xVnIEKNNEE",
  },
  repositorio: {
    texto: "Código no GitHub",
    href: "https://github.com/Hab99/portfolio",
  },
};

/** Links de contato. Entradas sem href são descartadas automaticamente. */
export const contatos = [
  { texto: "E-mail", href: `mailto:${site.email}` },
  { texto: "LinkedIn", href: site.linkedin },
  { texto: "GitHub", href: site.github },
].filter((l) => l.href && !l.href.endsWith("mailto:"));
