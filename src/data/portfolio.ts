// Single editable file for all personal content on the site.
// Facts sourced from Krishna's resume (Nov 2026) and verified public links.

export type View = "home" | "work" | "experience";

export const VIEW_BY_HASH: Record<string, View> = {
  "#work": "work",
  "#experience": "experience",
  "#home": "home",
};

export const profile = {
  name: "Krishna Naicker",
  fullName: "Krishna Kumar K. Naicker",
  role: "full-stack AI engineer",
  location: "Pune, India",
  greeting: "a quiet surface.\na current of my own",
  heading: "Namaste, I'm Krishna.",
  salutation: "Namaste,",
  introduction: "I'm Krishna.",
  currentWork: { product: "Orkus", href: "https://agents.allcognix.com/", company: "@AllCognix AI" },
  bioLines: [
    "Usually between AI agents, retrieval, and backend systems.",
    "I like things that work while I’m away.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/KrishnaNaicker" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/krishnanaicker29" },
    { label: "Email", href: "mailto:krishnanaicker2005@gmail.com" },
    { label: "Resume", href: "./resume.pdf" },
  ],
};

export interface ProjectLink {
  label: string;
  href: string;
}

export type DiagramKind = "assetflow" | "triage" | "tracelink" | "careflow" | "healthease";

export interface Project {
  name: string;
  descriptor: string;
  date: string;
  summary: string;
  diagram: DiagramKind;
  tech: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: "AssetFlow",
    descriptor: "Enterprise asset management",
    date: "Jul 2026",
    summary: "Shared assets, fewer loose ends. Transfers, bookings, maintenance, and permissions in one place.",
    diagram: "assetflow",
    tech: ["TypeScript", "React", "Express", "Prisma", "PostgreSQL"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/Team-Artemis" }],
  },
  {
    name: "Support Triage Agent",
    descriptor: "Safety-first RAG pipeline",
    date: "May 2026",
    summary: "Checks safety before searching the docs. Answers from sources and hands off when it needs help.",
    diagram: "triage",
    tech: ["Python", "LangGraph", "ChromaDB", "sentence-transformers"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/Support-Triage-Agent" }],
  },
  {
    name: "TraceLink",
    descriptor: "Offline traceability engine",
    date: "Apr 2026",
    summary: "Follow a manufacturing batch from material to complaint. Built to work offline.",
    diagram: "tracelink",
    tech: ["TypeScript", "Node.js", "Offline-first"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/TraceLink" }],
  },
  {
    name: "CareFlow & HealBERT",
    descriptor: "Agentic healthcare & self-healing ML",
    date: "Nov 2025",
    summary: "Healthcare agents and a language model with a fallback plan. Two builds exploring more dependable AI.",
    diagram: "careflow",
    tech: ["Python", "PyTorch", "LangGraph", "CrewAI", "LoRA"],
    links: [
      { label: "GitHub · CareFlow", href: "https://github.com/KrishnaNaicker/healthcare-ai-agents" },
      { label: "GitHub · HealBERT", href: "https://github.com/KrishnaNaicker/self-healing-dag" },
    ],
  },
  {
    name: "HealthEase",
    descriptor: "AI healthcare platform",
    date: "Apr 2025",
    summary: "Research summaries, symptom analysis, and wellness history. A healthcare app that keeps things together.",
    diagram: "healthease",
    tech: ["Python", "Streamlit", "MongoDB"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/HealthEase" }],
  },
];

export interface Role {
  title: string;
  org: string;
  dates: string;
  context?: string;
  contribution: string;
}

export const experience: Role[] = [
  {
    title: "Full-Stack Engineer Intern",
    org: "AllCognix AI",
    dates: "Jan 2026 – Present",
    context: "Product Lead — Orkus, an agent-building and orchestration platform",
    contribution:
      "Leads Orkus end to end — turning product requirements into workflow primitives, backend services, integrations, and tooling across architecture, implementation, debugging, and release.",
  },
  {
    title: "GenAI Full-Stack Engineer Intern",
    org: "Omnineura AI Technologies",
    dates: "Nov 2025 – Jan 2026",
    context: "Bengaluru, India · Remote",
    contribution:
      "Architected full-stack LLM applications and autonomous agents with LangGraph and CrewAI for multi-step healthcare workflows.",
  },
];

export const education = {
  degree: "B.E. Artificial Intelligence & Data Science",
  school: "P.E.S. Modern College of Engineering (SPPU)",
  dates: "Aug 2023 – Jun 2027",
  detail: "Pune, India · CGPA 9.36 (Semesters 1–6)",
};

export const achievements = [
  { result: "158 / 1,349", event: "HackerRank Orchestrate" },
  { result: "Top 20 teams", event: "MCCIA AI Hackathon 2026" },
  { result: "3rd of 130+ teams", event: "Pragyantra national hackathon" },
  { result: "National rank 236", event: "HackRx 6.0, Bajaj Finserv" },
];
