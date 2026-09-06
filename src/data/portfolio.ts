/**
 * Conteúdo dos cases do portfólio.
 *
 * `workItems`    -> seção "Trabalho"  (trajetória profissional)
 * `projectItems` -> seção "Projetos"  (entregas técnicas)
 *
 * Cada item vira também uma página própria em /trabalho/<slug> ou /projeto/<slug>.
 *
 * REGRA DE SIGILO: nada aqui pode conter código, print de tela, nome de
 * sistema interno ou regra de negócio do cliente. Os nomes citados
 * (Santander, SCPC, Pipefy, Itaú, Olé) já constam do LinkedIn público.
 *
 * PENDENTE v1.1: preencher os números de impacto (antes/depois, volume
 * diário, retrabalho eliminado) nos blocos "Resultado".
 */

export type CaseDetailBlock = {
  heading: string;
  text: string;
  aside: string;
};

export type CaseDetailMeta = {
  label: string;
  value: string;
};

export type CaseDetail = {
  summary: string;
  meta: CaseDetailMeta[];
  blocks: CaseDetailBlock[];
};

export type PortfolioCase = {
  slug: string;
  year: string;
  title: string;
  description: string;
  category: string;
  detail: CaseDetail;
  /** Repositório público. Quando existe, o case ganha o link e o selo. */
  repo?: string;
  /** Diagrama de arquitetura, exibido só na página do case. */
  imagem?: string;
};

export const workItems: PortfolioCase[] = [
  {
    slug: "e-xyon-desenvolvedor-rpa",
    year: "2025 — Atual",
    title: "e-Xyon",
    description:
      "Desenvolvo e mantenho automações em Python para operações de gestão jurídica BPO. Construo robôs que sustentam processos críticos do negócio: navegação em portais bancários, extração de documentos, integração entre sistemas e classificação automatizada de PDFs.",
    category: "Desenvolvedor RPA",
    detail: {
      summary:
        "Atuação como desenvolvedor RPA numa operação de BPO jurídico, onde os robôs não são experimento: eles rodam todo dia e a operação depende deles.",
      meta: [
        { label: "Papel", value: "Desenvolvedor RPA" },
        {
          label: "Stack",
          value:
            "Python, Selenium, Playwright, Pandas, OpenPyXL, PyAutoGUI, PyWinAuto, Regex",
        },
        { label: "Período", value: "Maio de 2025 — Atual" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "Operações de BPO jurídico vivem de volume: milhares de documentos, prazos processuais e sistemas que não conversam entre si. Boa parte do trabalho é repetitivo, sujeito a erro humano e impossível de escalar apenas contratando mais gente.",
          aside:
            "Vim da operação antes de programar para ela — conheço o processo por dentro, não só o requisito no papel.",
        },
        {
          heading: "Processo",
          text: "Construo robôs em Python aplicando separação de responsabilidades e padrões de projeto (Strategy, Template Method). Cada automação isola navegação, extração e regra de negócio em camadas distintas, porque portal bancário muda de layout e o robô não pode quebrar inteiro por causa de um botão que mudou de lugar.",
          aside:
            "Documento o porquê das decisões, não só o quê — é o que permite outra pessoa dar manutenção meses depois.",
        },
        {
          heading: "Resultado",
          text: "Automações em produção que sustentam a rotina diária da operação, cobrindo portais bancários, integração entre sistemas sem API e classificação de documentos em lote.",
          aside: "Números de impacto detalhados por projeto na seção Projetos.",
        },
      ],
    },
  },
  {
    slug: "e-xyon-juridico-operacoes",
    year: "2022 — 2025",
    title: "e-Xyon",
    description:
      "Análise e controle de processos nas esteiras de revisional e triagem para grandes bancos (Santander, Olé e Bradesco). Ponto focal da equipe, responsável por relatórios operacionais, treinamento de novos colaboradores e suporte a múltiplas esteiras.",
    category: "Analista Jurídico · Operações",
    detail: {
      summary:
        "Três anos dentro da operação que hoje eu automatizo. É daqui que vem o entendimento de qual gargalo vale a pena atacar com um robô.",
      meta: [
        { label: "Papel", value: "Analista Jurídico e Assistente de Operações" },
        { label: "Domínio", value: "Revisional, triagem, contratos bancários" },
        { label: "Período", value: "Janeiro de 2022 — Maio de 2025" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "Esteiras de revisional e triagem para Santander, Olé e Bradesco, cobrindo Veículos, Consignado, Imobiliário, Cartão de Crédito, Capital de Giro e Pessoa Jurídica e Física.",
          aside:
            "Ponto focal da equipe — o canal entre a operação e quem precisava de resposta.",
        },
        {
          heading: "Processo",
          text: "Análise de iniciais e identificação de contratos reclamados, montagem de contratos físicos e digitais, levantamento de restritivos em SPC e Serasa, e controle operacional da esteira com relatórios diários de entrada e saída.",
          aside:
            "Treinar novos colaboradores exige entender o processo bem o suficiente para descrevê-lo passo a passo — a mesma habilidade que automatizar exige.",
        },
        {
          heading: "Resultado",
          text: "A transição para desenvolvimento não foi troca de área: foi automatizar o processo que eu já executava. Esse domínio de negócio é o que separa um robô que funciona no teste de um que funciona na produção.",
          aside: "Entender a regra de negócio é o que evita automatizar o problema errado.",
        },
      ],
    },
  },
  {
    slug: "interfile-analista-juridico",
    year: "2020 — 2022",
    title: "Interfile Full Service BPO",
    description:
      "Esteira de triagem do Banco Itaú, com foco em análise de decisões judiciais e gestão operacional da equipe: análise de sentenças e acórdãos, acompanhamento processual em tribunais e PJe, e planejamento da fila de trabalho.",
    category: "Analista Jurídico",
    detail: {
      summary:
        "Primeira atuação como ponto focal de esteira, com responsabilidade sobre o planejamento da fila de trabalho de toda a equipe.",
      meta: [
        { label: "Papel", value: "Analista Jurídico — esteira de Triagem" },
        { label: "Domínio", value: "Decisões judiciais, PJe, tribunais" },
        { label: "Período", value: "Fevereiro de 2020 — Janeiro de 2022" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "Esteira de triagem do Banco Itaú: análise de sentenças e acórdãos com identificação e classificação das decisões judiciais.",
          aside:
            "Classificar decisão judicial em escala é exatamente o tipo de problema que hoje eu resolvo com OCR e regra automatizada.",
        },
        {
          heading: "Processo",
          text: "Coleta de sentenças e acompanhamento de andamentos processuais em tribunais e no PJe, planejamento da fila de trabalho da equipe para o dia seguinte e envio de relatório diário dos casos tratados.",
          aside:
            "Planejar fila de trabalho é orquestração de processo — o mesmo raciocínio de um motor de automação.",
        },
        {
          heading: "Resultado",
          text: "Base de domínio jurídico e operacional que sustenta minha atuação técnica hoje: sei ler um processo, entender o que o cliente precisa e traduzir isso em requisito de automação.",
          aside: "Treinamento de novos colaboradores e ponto focal da esteira.",
        },
      ],
    },
  },
];

export const projectItems: PortfolioCase[] = [
  {
    slug: "extrator-documentos-lote",
    year: "2026",
    title: "Extrator de documentos em lote",
    description:
      "Framework de automação web que lê uma planilha, coleta os documentos de cada registro em um portal e devolve um relatório consolidado, sem perder trabalho quando a execução falha no meio.",
    category: "Python · Playwright · pytest",
    repo: "https://github.com/Hab99/rpa-extrator-lote",
    imagem: "/extrator-lote-arquitetura.webp",
    detail: {
      summary:
        "Reimplementação pública e independente dos padrões de resiliência que uso em produção. Escrita do zero, sem código, seletor ou dado de nenhum cliente.",
      meta: [
        { label: "Papel", value: "Projeto autoral: arquitetura, código e testes" },
        { label: "Stack", value: "Python, Playwright, pytest, Pandas, OpenPyXL" },
        { label: "Testes", value: "93 testes, 2,45s, sem abrir navegador" },
        { label: "Licença", value: "MIT, código aberto para avaliação" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "Um lote de milhares de linhas roda por horas. Nesse tempo, queda de rede, sessão derrubada pelo portal e interrupção manual não são exceção: são parte da operação. O problema real não é clicar em tela, e sim não perder o trabalho já feito quando algo quebra na linha 3.000.",
          aside:
            "O foco do projeto não é só automatizar a navegação. É garantir também que nenhuma execução termine sem resposta.",
        },
        {
          heading: "Processo",
          text: "A garantia central é um Template Method cujo bloco `finally` sempre salva o relatório: terminando bem, quebrando no meio ou recebendo Ctrl+C, o que já foi processado é gravado e o que ficou de fora sai marcado com o motivo. A arquitetura tem duas hierarquias paralelas, uma dona do navegador e outra dona do laço sobre as linhas, então trocar de portal significa escrever uma única classe. Uma guarda contra pares repetidos evita rebaixar o mesmo conjunto: numa remessa com registros duplicados, ela cortou 347 downloads para 106 arquivos únicos.",
          aside:
            "Distinguir 'tela que não carregou' de 'tela vazia' evita o pior erro possível aqui: marcar como não localizado um documento que estava lá. Erro silencioso é o mais caro.",
        },
        {
          heading: "Resultado",
          text: "Os padrões deste repositório vêm de um RPA de extração documental que mantenho em produção, processando cerca de 4.700 documentos por dia. Feito à mão, esse volume consumiria a jornada inteira de uma equipe apenas nesta etapa. Aqui os padrões foram reescritos do zero para serem públicos: a suíte de 93 testes roda em 2,45 segundos porque o Playwright é mockado por completo, o que permite testar toda a lógica de orquestração sem depender do portal estar no ar.",
          aside:
            "Estado atual: núcleo, regras de lote e testes completos. O robô concreto de demonstração contra um portal público é o próximo passo.",
        },
      ],
    },
  },
  {
    slug: "automacao-faturas-santander",
    year: "2025",
    title: "Automação de faturas em portal bancário",
    description:
      "Robô em Selenium que autentica, navega e baixa faturas em lote no portal do Santander, eliminando um gargalo operacional recorrente da equipe.",
    category: "RPA · Selenium",
    detail: {
      summary:
        "O download de faturas era feito à mão, uma a uma, todo dia. O robô assumiu a tarefa inteira.",
      meta: [
        { label: "Papel", value: "Desenvolvimento completo" },
        { label: "Stack", value: "Python, Selenium, Pandas, Pathlib, Regex" },
        { label: "Tipo", value: "Automação de portal web" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "A equipe precisava baixar faturas do portal do Santander manualmente, em volume, todos os dias. Além do tempo consumido, o processo era sujeito a falha humana: fatura pulada, arquivo salvo com nome errado, retrabalho de conferência.",
          aside:
            "Portal bancário não oferece API — a única porta de entrada é a interface web.",
        },
        {
          heading: "Processo",
          text: "Automação em Selenium cobrindo o fluxo completo: autenticação, navegação até a área de faturas, seleção por critério e download em lote com nomenclatura padronizada. A camada de navegação foi isolada da camada de regra de negócio, para que mudança de layout no portal não exija reescrever o robô inteiro.",
          aside:
            "Nomenclatura padronizada de arquivo é o que torna o resultado utilizável pelo passo seguinte do processo.",
        },
        {
          heading: "Resultado",
          text: "O gargalo operacional da equipe foi eliminado: a tarefa passou de execução manual diária para execução automatizada, liberando o time para trabalho de análise.",
          aside: "Métricas de tempo e volume a detalhar.",
        },
      ],
    },
  },
  {
    slug: "integracao-citrix-pipefy",
    year: "2025",
    title: "Ponte entre Citrix e Pipefy",
    description:
      "Robô de integração que transporta dados entre um sistema virtualizado em Citrix e o Pipefy — dois ambientes sem qualquer ponto de conexão nativo.",
    category: "RPA · Integração de sistemas",
    detail: {
      summary:
        "Dois sistemas que não conversam e nenhuma API disponível. A ponte teve que ser construída pela interface.",
      meta: [
        { label: "Papel", value: "Desenvolvimento completo" },
        { label: "Stack", value: "Python, PyAutoGUI, PyWinAuto, Pandas" },
        { label: "Tipo", value: "Integração entre sistemas sem API" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "O dado nascia num sistema acessado por Citrix e precisava chegar ao Pipefy. Não havia integração nativa nem API exposta do lado do Citrix. A transferência era feita por pessoas, copiando informação de uma tela para outra.",
          aside:
            "Ambiente virtualizado é o cenário mais hostil para automação: não há acesso ao DOM, só pixels numa sessão remota.",
        },
        {
          heading: "Processo",
          text: "Automação de interface sobre a sessão Citrix, com validação do estado da tela antes de cada ação — em ambiente virtualizado a tela é a única fonte de verdade, e latência de rede pode fazer o robô agir antes de o sistema responder. Do outro lado, envio estruturado dos dados ao Pipefy.",
          aside:
            "Cada passo confirma que chegou onde deveria antes de seguir. Sem isso, o robô erra em silêncio.",
        },
        {
          heading: "Resultado",
          text: "A transferência manual entre os dois sistemas deixou de existir, junto com o risco de erro de digitação que ela carregava.",
          aside: "Métricas de volume e tempo a detalhar.",
        },
      ],
    },
  },
  {
    slug: "robos-documentos-scpc",
    year: "2025",
    title: "Robôs de documentos no SCPC",
    description:
      "Dois robôs em Playwright: um coleta comprovantes em PDF, outro classifica e valida documentos a partir de uma planilha de entrada preenchida pela operação.",
    category: "RPA · Playwright · Documentos",
    detail: {
      summary:
        "Coleta e classificação de documentos em lote, dirigidas por planilha — a operação define o que precisa, o robô executa.",
      meta: [
        { label: "Papel", value: "Desenvolvimento completo" },
        { label: "Stack", value: "Python, Playwright, Pandas, OpenPyXL, Regex" },
        { label: "Tipo", value: "Coleta e classificação de documentos" },
      ],
      blocks: [
        {
          heading: "Contexto",
          text: "Duas necessidades distintas sobre a mesma base: obter comprovantes em PDF no SCPC e, em seguida, classificar e validar esses documentos conforme critérios definidos pela operação.",
          aside:
            "Separar em dois robôs em vez de um só: cada um falha e é reexecutado de forma independente.",
        },
        {
          heading: "Processo",
          text: "Playwright para a navegação, mais resiliente que Selenium em páginas com carregamento assíncrono. A entrada é uma planilha preenchida pela operação, o que mantém o robô dirigido por dados: mudar o escopo do trabalho não exige mexer em código.",
          aside: "Robô dirigido por dados é robô que a operação consegue usar sozinha.",
        },
        {
          heading: "Resultado",
          text: "Coleta e classificação passaram a rodar em lote, com critério de validação aplicado de forma consistente — sem variação de interpretação entre pessoas diferentes.",
          aside: "Métricas de volume e taxa de acerto a detalhar.",
        },
      ],
    },
  },
];

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getProjectItem(slug: string) {
  return projectItems.find((item) => item.slug === slug);
}
