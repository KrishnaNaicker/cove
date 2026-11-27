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
    { label: "LinkedIn", href: "https://www.linkedin.com/in/krishnanaicker" },
    { label: "Email", href: "mailto:krishnanaicker2005@gmail.com" },
    { label: "Resume", href: "./resume.pdf?v=2026-11-27" },
  ],
};

export interface ProjectLink {
  label: string;
  href: string;
}

export const INTEL_LISTING_URL =
  "https://builders.intel.com/ecosystem-engagement/solution-hub/edge-ai-catalog/partner-spotlight/maya-ai-powered-conversational-kiosk-399";

export type DiagramKind = "maya" | "aceso" | "assetflow" | "padhai" | "loom";

export interface Project {
  name: string;
  descriptor: string;
  date: string;
  summary: string;
  diagram: DiagramKind;
  tech: string[];
  links: ProjectLink[];
  // A short third-party recognition shown under the project heading.
  recognition?: string;
}

// The first three are the featured projects from the resume.
export const projects: Project[] = [
  {
    name: "Maya",
    descriptor: "Voice ordering kiosk",
    date: "Featured · Oct 2026",
    summary: "A voice-first ordering kiosk, built at AllCognix AI. An LLM turns streaming speech into typed cart actions, a deterministic engine does the pricing, and QR checkout shows live receipts. On-device Whisper: 9.6% word error rate on 18 held-out clips.",
    diagram: "maya",
    tech: ["TypeScript", "React", "Node.js", "WebSockets", "Whisper", "OpenVINO"],
    links: [{ label: "View on Intel Edge AI Catalog", href: INTEL_LISTING_URL }],
    recognition: "Verified Intel AI Edge application — listed in Intel’s Edge AI Catalog (Nov 2026)",
  },
  {
    name: "Aceso",
    descriptor: "Supervised self-healing for web apps",
    date: "Featured · Aug 2026 – Present",
    summary: "Self-healing for web apps, with a human in the loop. A final-year team project I lead. A LangGraph agent writes a scoped fix for a production fault, which ships only after 12 checks and human approval. I built its append-only evidence ledger and the job queue for the repair workers.",
    diagram: "aceso",
    tech: ["LangGraph", "PostgreSQL"],
    links: [],
  },
  {
    name: "AssetFlow",
    descriptor: "Asset & resource management",
    date: "Featured · Jul 2026",
    summary: "Asset and resource management, built as a team. The asset module has role-based access, atomic transfers, and bookings that can't overlap, enforced in an Express and Prisma service layer.",
    diagram: "assetflow",
    tech: ["TypeScript", "Express", "Prisma", "PostgreSQL"],
    links: [{ label: "GitHub", href: "https://github.com/Harsh-4210/Team-Artemis-" }],
  },
  {
    name: "Padhai",
    descriptor: "Exam notes from a syllabus",
    date: "Nov 2026",
    summary: "An open-source agent skill that turns a unit's syllabus into an exam-ready PDF of answers. Numericals are computed in code and every page is checked before it ships. Free for every student, and each page says so.",
    diagram: "padhai",
    tech: ["Agent Skill", "Python", "HTML/CSS", "KaTeX", "matplotlib"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/padhai" }],
  },
  {
    name: "Loom",
    descriptor: "A tiny coding harness",
    date: "Nov 2026",
    summary: "A tiny coding harness. A model works in a throwaway copy of a repo with four tools, and the harness, not the model, decides when it's done: it runs the tests, snapshots progress, and rolls back when a run stalls. Every step, token, and dollar is logged.",
    diagram: "loom",
    tech: ["Python", "Anthropic API", "pytest", "uv"],
    links: [{ label: "GitHub", href: "https://github.com/KrishnaNaicker/loom" }],
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
    context: "Orkus, an agent-building and orchestration platform",
    contribution:
      "Sole engineer on Orkus. Rebuilt the platform where users create AI agents, workflows, templates, and RAG knowledge bases without code, on FastAPI and React.",
  },
  {
    title: "GenAI Full-Stack Engineer Intern",
    org: "Omnineura AI Technologies",
    dates: "Nov 2025 – Jan 2026",
    context: "Bengaluru, India · Remote",
    contribution:
      "Built five retail AI agents end to end with FastAPI, React, and OpenAI, covering demand forecasting, product recommendations, checkout-free shopping, price negotiation, and post-purchase support.",
  },
];

export const education = {
  degree: "B.E. Artificial Intelligence & Data Science",
  school: "P.E.S. Modern College of Engineering (SPPU)",
  dates: "Aug 2023 – Jun 2027",
  detail: "Pune, India · CGPA 9.36 (Semesters 1–6)",
};

export interface Achievement {
  result: string;
  event: string;
  href?: string;
}

export const achievements: Achievement[] = [
  { result: "Intel Edge AI Catalog", event: "Maya, a verified Intel AI Edge application, Nov 2026", href: INTEL_LISTING_URL },
  { result: "Claude for Startups", event: "Accepted with AllCognix AI, Nov 2026" },
  { result: "85th of 857 teams", event: "Finalist, Odoo Hackathon 2026" },
  { result: "158 / 1,349", event: "HackerRank Orchestrate" },
  { result: "Top 20 teams", event: "MCCIA AI Hackathon 2026" },
  { result: "3rd of 130+ teams", event: "Pragyantra hackathon, as team lead" },
  { result: "National rank 236", event: "HackRx 6.0" },
];
