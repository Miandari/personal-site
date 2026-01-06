export const SITE_CONFIG = {
  name: "Mostafa Miandari Hossein",
  tagline: "PhD Candidate · Computational Social Science · NLP & ML",
  email: "mostafa.miandari@mail.utoronto.ca",
  cvPath: "/documents/Mostafa_Miandari_Hossein_CV.pdf",
  headshotPath: "/images/headshot.jpg",
  domain: "miandari.dev",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/Miandari",
  linkedin: "https://www.linkedin.com/in/miandari",
  googleScholar: "https://scholar.google.ca/citations?user=e_7TwdsAAAAJ&hl=en",
};

export const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const HERO_CONTENT = {
  paragraphs: [
    "Part researcher, part engineer. I study how people interact with systems and with each other, and build tools that make those interactions better. My work spans research, from social behavior modeling to cross-platform social media analysis using NLP and LLMs, and industry, analyzing user patterns across 40M users at Cafe Bazaar.",
    "Whether it's users engaging with a product, or people communicating with each other or with LLM-based products, I design systems informed by what works. That's what I build around: things like a human-in-the-loop RAG system, an LLM interviewer that scales qualitative research, and a social app that makes accountability work through interaction.",
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Social Media Platform Fingerprints",
    description: [
      "Social media shapes public discourse, yet most research focuses on surface-level questions: does anger spread faster? Does misinformation go viral? My dissertation goes deeper, using LLMs to analyze complex expressions like humor and sarcasm, and to map what information (not just whether it's true) different platforms surface.",
      "The core question: how do platforms and communities shape the way we communicate? Through careful prompt engineering, embedding analysis, Bayesian mixed-effects models, and matched-user designs, I analyze over one million posts across four platforms to map what I call \"emotional and information fingerprints.\" Each platform and community has its own patterns, shaped by its design and norms. Even the same person communicates differently depending on where they post.",
      "This research has direct implications for how we design communication platforms and community features. Ultimately, it aims to inform how we might design online spaces that foster healthier communication.",
    ],
    tags: ["NLP", "LLMs", "Bayesian Models", "Research"],
    type: "research" as const,
  },
  {
    id: 2,
    title: "Personal Knowledge Base System",
    description: [
      "Born from a personal frustration: I love learning, but there's always too much to learn and too easy to forget. Even with notes, you drown in a sea of information you can't easily retrieve.",
      "This project has two parts. The first is an MCP server that turns everything you've learned (papers, videos, notes) into a single queryable system. Questions like \"what did I watch recently about linear algebra?\" or \"find my notes on HDBSCAN clustering\" become natural conversations with your own knowledge archive.",
      "The second is a RAG system designed for precision. Inspired by how coding agents plan before acting, it includes a planning phase: an LLM specialized in vector database retrieval that decomposes complex questions, asks for clarification when needed, and collaborates with the user to find exactly what they're looking for. This sits on top of SOTA methods (Contextual Retrieval, BM25, HyDE) to create a system for power users who need precise answers from large document collections, not just quick summaries.",
    ],
    tags: ["MCP", "RAG", "Python", "LangChain"],
    type: "project" as const,
    links: {
      github: "https://github.com/Miandari/youtube-knowledge-base-mcp",
    },
  },
  {
    id: 3,
    title: "Adaptive Qualitative Interviewer",
    description: [
      "Traditional surveys scale but are rigid. Qualitative interviews are rich but expensive and time-consuming. The challenge is designing an interaction that balances both.",
      "This system uses LLMs to generate adaptive follow-up questions based on participant responses, letting researchers probe specific areas dynamically while ensuring key topics are covered. You get interview depth at survey scale.",
      "Built with LangGraph for conversation flow, configurable experiment protocols, and deployed via REST API with a web UI.",
    ],
    tags: ["LangGraph", "LLMs", "REST API", "Research Methods"],
    type: "project" as const,
    links: {
      github: "https://github.com/Miandari/adaptive-qualitative-interviewer",
    },
  },
  {
    id: 4,
    title: "Gritful",
    description: [
      "Most habit apps are solo tools, and motivation fades when no one's watching. The social ones that exist are locked to specific domains like fitness apps or Duolingo for languages. Gritful solves the commitment problem through social interaction for any goal: track anything you want, compete with friends, and stay accountable through shared progress.",
      "The platform combines custom goal definition with multiplayer competition, features that don't typically coexist. Flexible scoring (binary, scaled, tiered) rewards progress over perfection, so you're competing to improve, not to be perfect. Real-time leaderboards, streak mechanics, achievements, and an activity feed keep the social pressure light but present.",
      "Built with Next.js, Supabase, and deployed live at gritful.app.",
    ],
    tags: ["Next.js", "Supabase", "Full-Stack", "Product"],
    type: "product" as const,
    links: {
      github: "https://github.com/Miandari/gritful",
      live: "https://gritful.app",
    },
  },
];

export const EXPERIENCE_CONTENT = {
  summary:
    "I have over five years of industry experience spanning product analytics, people analytics, and data science. At Cafe Bazaar, I analyzed user behavior across 40 million users, designing A/B experiments, building predictive models, and working with large-scale event data to understand how people engage with products. I've also modeled team dynamics and performance in HR analytics, built recommendation systems, and developed NLP pipelines for market intelligence. These roles shaped how I think about interaction at scale, both human-to-system and human-to-human. Full details on LinkedIn and CV.",
};

export const EDUCATION_CONTENT = {
  summary:
    "I'm finishing my PhD at the University of Toronto's Decision Neuroscience Lab. My research across both MSc and PhD focuses on human behavior and interaction, using computational methods like reinforcement learning, NLP, and LLMs to understand how context shapes the way people communicate and make decisions.",
  details:
    "My coursework and teaching span almost a decade and cover both technical and behavioral domains: machine learning, reinforcement learning, algorithms, and statistical inference on one side; cognitive science, human-computer interaction, and visual neuroscience on the other. This range gives me the ability to bridge technical implementation and human behavior. Full details in CV.",
};
