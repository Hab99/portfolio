# Caderno de estudos

Anotações técnicas geradas durante a construção deste site. A ideia é
registrar **o porquê** das decisões, não só o que foi feito — para revisitar
e aprofundar depois.

## Índice

- [SEO técnico: robots, sitemap, canônica e Open Graph](#seo-técnico)
- [Dados estruturados (schema.org / JSON-LD)](#dados-estruturados)
- [Para aprofundar depois](#para-aprofundar-depois)

---

# SEO técnico

## O modelo mental

Um site recebe **três tipos de visitante**, e só um é humano:

| Visitante | Quem é | O que faz |
|---|---|---|
| **Humano** | Pessoa no navegador | Lê, rola a página, clica |
| **Rastreador** | Googlebot, Bingbot | Percorre a web montando um índice pesquisável |
| **Raspador** | WhatsApp, LinkedIn, Slack | Busca o HTML uma vez para montar o card de preview |

Os dois últimos **não rolam a página, não esperam animação e leem quase só o
`<head>`**. SEO técnico é, na prática, *a interface do site para leitores que
não são gente*.

Cada peça abaixo responde a uma pergunta diferente que essas máquinas fazem.

---

## 1. `robots.txt` — "onde eu posso entrar?"

**Problema:** o rastreador chega no domínio e não sabe o que é conteúdo
público e o que é área interna.

**Mecanismo:** arquivo de texto na raiz, no endereço fixo `/robots.txt`. É a
**primeira coisa** que um rastreador educado busca, antes de qualquer página.

Neste site:

```
User-agent: *          # vale para todo rastreador
Allow: /               # pode indexar tudo
Disallow: /system/     # menos as páginas do design system
Sitemap: https://guilhermenascimento.vercel.app/sitemap-index.xml
```

### A armadilha

`robots.txt` **não é segurança**. É uma *convenção de boa vizinhança* — um
pedido, não uma tranca. Bots mal-intencionados ignoram.

Pior: como o arquivo é público, escrever `Disallow: /admin` é literalmente
**anunciar onde fica a área administrativa**. Nunca use para esconder algo
sensível; para isso existe autenticação.

### Decisão neste projeto

Gerado por um *endpoint* (`src/pages/robots.txt.ts`), não como arquivo
estático — assim o endereço do sitemap acompanha automaticamente o
`site.url`. Trocar de domínio não exige lembrar de editar um segundo arquivo.

---

## 2. `sitemap.xml` — "quais páginas existem?"

**Problema:** o rastreador descobre páginas **seguindo links**. Uma página
que nenhum link aponta é invisível — o problema do *conteúdo órfão*.

**Mecanismo:** um XML que **declara** as URLs, em vez de esperar que sejam
descobertas.

```xml
<loc>https://guilhermenascimento.vercel.app/</loc>
<loc>https://guilhermenascimento.vercel.app/projeto/integracao-citrix-pipefy/</loc>
```

### O que ele NÃO faz

Sitemap **não melhora ranking**. Ele acelera e garante a *descoberta*. É a
diferença entre torcer para te acharem e entregar a lista pronta.

### Decisão neste projeto

As páginas `/system/*` ficam de fora por um filtro no `astro.config.mjs`.
Duas camadas: o sitemap não as declara e o robots pede para não indexar.

---

## 3. Canônica — "qual é o endereço de verdade?"

O conceito mais sutil dos quatro. A ideia central:

> A mesma página pode ser alcançada por **infinitas URLs diferentes**.

Todas estas entregam conteúdo idêntico:

```
https://exemplo.com/pagina
https://exemplo.com/pagina/
http://exemplo.com/pagina
https://exemplo.com/pagina?utm_source=linkedin
```

Para o buscador, são **quatro páginas distintas com conteúdo duplicado**.
Consequência: a autoridade se divide entre elas, e ele pode acabar exibindo
a versão feia com parâmetro de rastreio.

**Mecanismo:** uma tag no `<head>` declarando o endereço oficial.

```html
<link rel="canonical" href="https://exemplo.com/pagina/">
```

Tradução: *"chegou por onde chegou, tanto faz — a página real é esta.
Concentre tudo aqui."*

### Por que importa na prática

Ao divulgar um link, LinkedIn, WhatsApp e sistemas de vaga **acrescentam
parâmetros de rastreio**. Sem canônica, cada compartilhamento cria uma
variante concorrendo com o original.

### Decisão neste projeto

A canônica não é escrita à mão — é **calculada** a partir do endereço real:

```ts
const canonical = new URL(Astro.url.pathname, Astro.site);
```

URL escrita à mão fica desatualizada na primeira mudança de domínio. Era
exatamente o defeito do template de origem, que tinha
`yourwebsite.com/current-page` chumbado em todas as páginas.

---

## 4. Open Graph — "como isso aparece quando eu compartilho?"

**Problema:** ao colar um link no WhatsApp, em menos de um segundo aparece um
card com título, descrição e imagem. Ninguém montou aquilo à mão.

**Mecanismo:** o raspador busca o HTML e lê meta tags com prefixo `og:`.

```html
<meta property="og:title"       content="...">
<meta property="og:description" content="...">
<meta property="og:image"       content="https://.../og-image.png">
<meta property="og:url"         content="https://...">
```

**Sem essas tags o raspador chuta** — pega o primeiro texto que encontrar,
uma imagem aleatória, ou desiste e mostra um retângulo cinza.

### Três armadilhas clássicas

1. **`og:image` precisa ser URL absoluta.** `/og-image.png` não funciona: o
   raspador não está no seu domínio e não resolve caminho relativo.
2. **A imagem precisa existir no momento do compartilhamento.** O raspador
   busca uma vez e guarda em cache, às vezes por dias.
3. **1200×630 px** é a proporção esperada (1.91:1). Fora disso, as
   plataformas cortam onde quiserem.

O `twitter:card` é um padrão paralelo, criado depois pelo Twitter. Cai no
Open Graph quando não encontra o próprio — por isso os dois são declarados.

---

## Como as quatro peças se encadeiam

```
Rastreador chega
   │
   ├─ 1. lê /robots.txt          -> "onde posso ir? onde está o mapa?"
   ├─ 2. lê /sitemap-index.xml   -> "quais páginas existem?"
   ├─ 3. visita cada página
   │      └─ lê rel="canonical"  -> "esta URL é a oficial? consolido aqui"
   └─ 4. indexa

Alguém cola o link numa rede social
   │
   └─ raspador lê as tags og:    -> monta o card de preview
```

As três primeiras servem **quem procura você**. A quarta serve **quando você
se oferece**.

---

# Dados estruturados

## O salto conceitual

As meta tags descrevem **a página**. Os dados estruturados descrevem
**a entidade**.

Ou seja: em vez de dizer *"esta página fala sobre automação"*, você declara
*"esta página é sobre uma **Pessoa** chamada Guilherme Nascimento Silva, de
profissão desenvolvedor, cujos perfis são estes"*.

É o que permite ao buscador tratar um nome como **identidade** em vez de
coincidência de palavras.

## Formato

**JSON-LD** (JSON for Linking Data) — um bloco de JSON dentro de
`<script type="application/ld+json">`. O vocabulário é o **schema.org**,
mantido em conjunto por Google, Microsoft, Yahoo e Yandex.

Existem formatos alternativos (Microdata, RDFa), que misturam a marcação no
HTML. JSON-LD venceu por ser um bloco isolado: não polui o markup e é o
formato recomendado pelo Google.

## O grafo neste site

```
WebSite  ──publisher──>  Person
ProfilePage ──mainEntity──> Person
BreadcrumbList          (só nas páginas internas)
```

O campo `@id` amarra os nós: o `Person` referenciado pelo `WebSite` e pelo
`ProfilePage` é **o mesmo**, não três pessoas diferentes. Sem `@id`, o
buscador leria entidades soltas e repetidas.

Campos que carregam peso:

| Campo | Papel |
|---|---|
| `sameAs` | Lista de perfis que são **a mesma pessoa**. É assim que LinkedIn e GitHub se conectam à identidade |
| `knowsAbout` | Assuntos de domínio |
| `jobTitle`, `worksFor`, `alumniOf` | Contexto profissional |
| `BreadcrumbList` | Permite ao buscador exibir a trilha no resultado |

### Erro cometido e corrigido

O `sameAs` inicialmente apontava para o **repositório**
(`github.com/Hab99/portfolio`) em vez do **perfil** (`github.com/Hab99`).
Um repositório não é uma pessoa — o campo exige identidade, não projeto.

Vale como princípio: em dados estruturados, **o tipo semântico importa**.
Preencher um campo com algo do tipo errado é pior do que deixar vazio,
porque afirma algo falso com aparência de estrutura.

### Cuidado de segurança

O conteúdo do JSON é escapado antes de entrar no HTML:

```ts
JSON.stringify(jsonLd).replace(/</g, "\\u003c");
```

Sem isso, um valor contendo `</script>` fecharia a tag e viraria brecha de
injeção. Aqui os dados são controlados, mas o hábito vale para quando vierem
de banco ou de usuário.

---

# Para aprofundar depois

## Fontes normativas

São a origem dos padrões — não blog de terceiro:

| Documento | O que é |
|---|---|
| **RFC 9309** | *Robots Exclusion Protocol*. O robots.txt existe desde 1994 como convenção informal; só virou padrão IETF em 2022 |
| **sitemaps.org** | Protocolo Sitemap 0.9. Nasceu no Google em 2005; Yahoo e Microsoft aderiram em 2006 |
| **RFC 6596** | *The Canonical Link Relation*. Anunciada em 2009 pelos três buscadores em conjunto |
| **ogp.me** | Especificação do Open Graph. Criada pelo Facebook em 2010 |
| **schema.org** | Vocabulário de dados estruturados, mantido em consórcio |

## Referência prática

- **Google Search Central** (`developers.google.com/search`) — documentação
  oficial. O *SEO Starter Guide* desmonta muito mito.
- **MDN Web Docs** — mecânica de HTML das tags.
- **Rich Results Test** e **Schema Markup Validator** — validam os dados
  estruturados e mostram como o Google os interpreta.

## Ferramenta a configurar

**Google Search Console** — gratuito. Registra-se o site, envia-se o
sitemap, e ele mostra o que foi indexado, com que termos as pessoas
chegaram e quais erros existem. É o passo seguinte natural.

## Alerta sobre a literatura

SEO é área cheia de conteúdo ruim — muita gente vendendo truque e "fator de
ranqueamento secreto". Ficar nas fontes normativas e no Search Central; o
resto costuma ser especulação ou material desatualizado.

## Tópicos ainda não estudados

- [ ] Core Web Vitals (LCP, INP, CLS) e como o Lighthouse os mede
- [ ] Cabeçalhos de cache HTTP e por que a Vercel serve `/_astro/*` com
      `max-age` de um ano
- [ ] Acessibilidade além de contraste: navegação por teclado, leitor de tela
- [ ] `hreflang`, quando houver versão em inglês
- [ ] Content Security Policy
