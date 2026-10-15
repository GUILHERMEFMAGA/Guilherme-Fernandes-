/**
 * ✏️  EDITE AQUI — todo o conteúdo do portfólio vem deste arquivo.
 * Troque os textos de exemplo pelas suas informações reais.
 */

export const profile = {
  name: "Guilherme Fernandes",
  shortName: "Guilherme",
  initials: "GF",
  githubUser: "GUILHERMEFMAGA",
  location: "Ribeirão Preto, SP · Brasil",
  email: "seuemail@exemplo.com",
  linkedin: "https://www.linkedin.com/in/seu-perfil",
  github: "https://github.com/GUILHERMEFMAGA",
  resumeUrl: "", // ex.: "/curriculo.pdf" (coloque o arquivo em /public)
  available: true,

  // Frases que alternam no topo da página (efeito de digitação)
  roles: [
    "Desenvolvedor Full Stack",
    "Entusiasta de TypeScript",
    "Construtor de produtos web",
    "Sempre aprendendo algo novo",
  ],

  headline:
    "Eu crio experiências digitais rápidas, bonitas e acessíveis — do back-end ao pixel.",

  about: [
    "Olá! Sou o Guilherme, desenvolvedor de Ribeirão Preto apaixonado por transformar ideias em produtos reais. Gosto de entender o problema a fundo antes de escrever a primeira linha de código.",
    "Trabalho principalmente com o ecossistema JavaScript/TypeScript — React no front-end e Node.js no back-end — e tenho carinho especial por performance, boas interfaces e código limpo.",
    "Fora do código, você provavelmente vai me encontrar estudando novas tecnologias, jogando ou tomando um bom café. ☕",
  ],

  stats: [
    { value: "3+", label: "anos programando" },
    { value: "20+", label: "projetos construídos" },
    { value: "∞", label: "xícaras de café" },
  ],
};

export type SkillGroup = { title: string; icon: "code" | "server" | "tools" | "design"; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Front-end", icon: "code", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML & CSS", "Framer Motion"] },
  { title: "Back-end", icon: "server", items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST & GraphQL"] },
  { title: "Ferramentas", icon: "tools", items: ["Git & GitHub", "Docker", "Vite", "Linux", "CI/CD", "Vercel"] },
  { title: "Design & Produto", icon: "design", items: ["Figma", "UI/UX", "Design Systems", "Acessibilidade", "SEO", "Metodologias Ágeis"] },
];

export type FeaturedProject = {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  gradient: string; // classes Tailwind para o "thumbnail"
  emoji: string;
};

// Projetos em destaque (escolhidos a dedo). Abaixo deles o site
// lista automaticamente seus repositórios públicos do GitHub.
export const featuredProjects: FeaturedProject[] = [
  {
    title: "Portfólio Pessoal",
    description:
      "Este site! SPA em React + TypeScript com animações, tema claro/escuro e integração em tempo real com a API do GitHub.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    repo: "https://github.com/GUILHERMEFMAGA/Guilherme-Fernandes-",
    gradient: "from-violet-600 via-fuchsia-500 to-cyan-400",
    emoji: "🚀",
  },
  {
    title: "Guilherme FMAGA — Site",
    description:
      "Site estático em HTML e CSS — um dos meus primeiros projetos publicados, focado em layout responsivo.",
    tags: ["HTML", "CSS", "Responsivo"],
    repo: "https://github.com/GUILHERMEFMAGA/GUILHERMEFMAGA-SITE",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    emoji: "🌐",
  },
  {
    title: "Seu próximo projeto",
    description:
      "Espaço reservado para o próximo grande projeto. Edite src/data/profile.ts para adicionar seus trabalhos aqui.",
    tags: ["Em breve"],
    gradient: "from-emerald-500 via-teal-500 to-sky-500",
    emoji: "✨",
  },
];

export type TimelineItem = { period: string; title: string; place: string; description: string; type: "work" | "education" };

export const timeline: TimelineItem[] = [
  {
    period: "2024 — Atual",
    title: "Desenvolvedor Full Stack",
    place: "Freelancer",
    description: "Desenvolvimento de sites e aplicações web sob medida para clientes, do protótipo ao deploy.",
    type: "work",
  },
  {
    period: "2023 — 2024",
    title: "Projetos pessoais & estudos",
    place: "Autodidata",
    description: "Mergulho em React, Node.js e TypeScript construindo projetos práticos e publicando no GitHub.",
    type: "work",
  },
  {
    period: "2022 — Atual",
    title: "Formação em Tecnologia",
    place: "Sua instituição",
    description: "Edite este item com seu curso, faculdade ou certificações.",
    type: "education",
  },
];
