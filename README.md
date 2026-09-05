# Portfólio — Guilherme Nascimento Silva

Site de portfólio pessoal. Desenvolvedor Python com foco em automação de
processos (RPA).

**No ar:** https://guilhermenascimento.vercel.app

---

## Stack

| Camada        | Tecnologia                                  |
|---------------|---------------------------------------------|
| Framework     | Astro 6 (geração estática)                  |
| Estilo        | Tailwind CSS 4                              |
| Interatividade| React 19 (apenas onde é necessário)         |
| Animação      | GSAP + ScrollTrigger                        |
| Tipografia    | Inter (texto) + JetBrains Mono (metadados)  |
| Hospedagem    | Vercel, com deploy automático a cada push   |

O site é **estático**: o build gera HTML pronto, sem servidor de aplicação.
O visitante recebe arquivos, não uma renderização sob demanda.

---

## Rodando localmente

Requer Node 22.12 ou superior.

```bash
npm install
npm run dev      # http://localhost:4321
```

Outros comandos:

```bash
npm run build    # gera o site em dist/
npm run preview  # serve o dist/ para conferir antes de publicar
```

---

## Onde mexer

O conteúdo é separado do layout de propósito: dá para editar textos sem
abrir nenhum componente.

```
src/
├── data/
│   ├── site.ts          ← nome, e-mail, links, textos de SEO
│   └── portfolio.ts     ← experiências e projetos (viram páginas sozinhos)
├── components/
│   ├── landing/         ← seções da home
│   ├── global/          ← navegação, rodapé
│   └── fundations/      ← primitivos (Text, Wrapper, head)
├── layouts/             ← estrutura da página
├── pages/               ← rotas (arquivo = URL)
└── styles/global.css    ← paleta e tokens do tema
```

**Para trocar dado pessoal:** `src/data/site.ts`.
**Para adicionar um projeto:** um item novo em `src/data/portfolio.ts` — a
página de detalhe em `/projeto/<slug>` é gerada automaticamente.

### Modo de edição no navegador

Rodando em `npm run dev`, um botão de edição permite alterar textos direto na
página. As alterações vão para `src/data/content-overrides.json`.
Esse modo **não existe** no site publicado.

---

## Caderno de estudos

Anotações técnicas sobre as decisões deste projeto — SEO técnico, dados
estruturados e o porquê de cada escolha: **[ESTUDOS.md](ESTUDOS.md)**

---

## Decisões de projeto

- **Modo escuro travado.** O site não segue a preferência do sistema
  operacional — é escuro para todo visitante, como foi desenhado.
- **Sem imagens nos cases.** Os projetos descritos são de ambiente corporativo
  sob sigilo; não há captura de tela publicável. Cards tipográficos comunicam
  melhor do que placeholder genérico.
- **Telefone fora do ar.** Página pública com número exposto vira alvo de
  spam. E-mail e LinkedIn dão o mesmo acesso.
- **Sigilo.** Nenhum código, captura de tela, nome de sistema interno ou regra
  de negócio de cliente aparece aqui. As empresas citadas já constam do perfil
  público do autor no LinkedIn.
- **Paleta** derivada em OKLCH a partir de um azul âncora (`#0064FF`), para os
  degraus terem salto visual uniforme.
- **Contraste** auditado contra WCAG: texto e elementos gráficos sobre o fundo
  escuro passam em AA, a maioria em AAA.

---

## Créditos e método

**AI-assisted development.** Este site foi construído com assistência de IA
(Claude, da Anthropic). Direção de produto, decisões de design, revisão e
validação são do autor; a implementação foi assistida.

Construído sobre um template de portfólio em Astro, adaptado em estrutura,
tipografia, paleta e conteúdo:
https://www.youtube.com/watch?v=9xVnIEKNNEE

---

## Contato

- **E-mail:** guilhermenascimentosilva1@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/guilherme-nascimento-silva
