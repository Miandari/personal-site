export const WORKSHOP = {
  slug: "utsc-ai-coding-workshop",
  title: "UTSC AI Coding Agent Workshop",
  tagline: "How to responsibly accelerate your research using coding agents.",
  contactEmail: "mostafa.miandari@mail.utoronto.ca",
  details: [
    { label: "When", value: "Friday, November 13, 1:00–3:00 PM" },
    { label: "Where", value: "UTSC, SW316" },
    { label: "Format", value: "2 hours, hands-on" },
    { label: "Bring", value: "Your laptop" },
    { label: "Hosts", value: "Adam Frost and Mostafa Miandari Hossein" },
  ],
  topics: [
    "Setting up a coding agent on your laptop",
    "Building a simple experiment",
    "Turning example data into results and figures",
    "Catching mistakes and making your workflow more reliable",
    "Data security and participant confidentiality",
  ],
} as const;

export const SETUP = {
  slug: "setup",
  title: "Get ready for the workshop",
  intro: "Set these up before the workshop so we can start building right away.",
  software: [
    {
      name: "VS Code",
      description: "Code editor.",
      links: [{ label: "Download", href: "https://code.visualstudio.com/download" }],
    },
    {
      name: "R",
      description: "Programming language for statistics.",
      links: [
        { label: "Mac", href: "https://cran.r-project.org/bin/macosx/" },
        { label: "Windows", href: "https://cran.r-project.org/bin/windows/base/" },
      ],
    },
    {
      name: "RStudio",
      description: "Editor for R. Install R first.",
      links: [{ label: "Download", href: "https://docs.posit.co/ide/user/download.html" }],
    },
  ],
  filesUrl:
    "https://drive.google.com/drive/folders/1d5v_UpoB0kVvRGa__byGl1RvcPk4hNCT?usp=sharing",
  providers: [
    {
      company: "OpenAI",
      agent: "Codex",
      plans: [
        { name: "ChatGPT Free", usage: "Limited Codex usage", price: "Free" },
        { name: "ChatGPT Go", usage: "Limited Codex usage", price: "$11/month" },
        { name: "ChatGPT Plus", usage: "Good Codex usage", price: "$25/month" },
        { name: "ChatGPT Pro", usage: "Lots of Codex usage", price: "$136/month" },
      ],
      offer: {
        label: "Free credits for students",
        href: "https://chatgpt.com/codex/offers/students",
      },
    },
    {
      company: "Anthropic",
      agent: "Claude Code",
      plans: [
        { name: "Claude Free", usage: "No Claude Code", price: "Free" },
        { name: "Claude Pro", usage: "Some Claude Code usage", price: "$28/month" },
        { name: "Claude Max", usage: "Lots of Claude Code usage", price: "$140/month" },
      ],
    },
  ],
} as const;

export type SurveyQuestion = {
  name: string;
  label: string;
  hint?: string;
  multiple?: boolean;
  // The answers are saved to the sheet as written here.
  options: string[];
  // Only ask this question when another question has one of these answers.
  showIf?: { name: string; answers: string[] };
};

const TRIED_AGENT = "I’ve tried a coding agent a few times";
const USES_AGENT = "I use one regularly";

const questions: SurveyQuestion[] = [
  {
    name: "agentUse",
    label: "Have you used an AI coding agent?",
    options: [
      "No, never",
      "I’ve used ChatGPT or Claude in a chat window to help with code",
      TRIED_AGENT,
      USES_AGENT,
    ],
  },
  {
    name: "agents",
    label: "Which ones?",
    hint: "Tick all that apply.",
    multiple: true,
    options: ["Claude Code", "OpenAI Codex", "Cursor", "GitHub Copilot", "Gemini CLI", "Other"],
    showIf: { name: "agentUse", answers: [TRIED_AGENT, USES_AGENT] },
  },
  {
    name: "coding",
    label: "Which is closest to how you work with code today?",
    options: [
      "I don’t code; I use tools like Excel, SPSS or Qualtrics",
      "I can run and tweak scripts someone else wrote",
      "I write my own scripts for my analyses",
      "I build tools or software other people use",
    ],
  },
  {
    name: "analysis",
    label: "What do you analyze data in?",
    hint: "Tick all that apply.",
    multiple: true,
    options: [
      "R",
      "Python",
      "MATLAB",
      "SPSS, JASP or jamovi",
      "Excel or Google Sheets",
      "Not analyzing data yet",
    ],
  },
  {
    name: "laptop",
    label: "Which laptop are you bringing?",
    options: ["Mac", "Windows", "Linux", "Chromebook or iPad"],
  },
];

export const SURVEY = {
  title: "If you’d care to share a bit about yourself",
  intro: "This feedback will help us tailor the workshop to your particular situation.",
  questions,
  handOff: {
    name: "handOff",
    label: "Is there a part of your research you’d love to hand off?",
    placeholder:
      "e.g. cleaning eye-tracking files, or remaking the same figure for every participant",
  },
} as const;
