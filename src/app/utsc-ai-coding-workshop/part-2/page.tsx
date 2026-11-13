import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORKSHOP } from "../content";
import { Step } from "../step";
import { CopyButton } from "./copy-button";
import { COMMANDS, PART_TWO, PROMPTS } from "./content";

export const metadata: Metadata = {
  title: { absolute: `${PART_TWO.title} · ${WORKSHOP.title}` },
  description: PART_TWO.intro,
  alternates: { canonical: `/${WORKSHOP.slug}/${PART_TWO.slug}` },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const steps = [
  { id: "data", title: "Get the data" },
  { id: "first-prompt", title: "First prompt" },
  { id: "ask", title: "Ask afterwards" },
  { id: "interview", title: "Let it interview you" },
  { id: "instructions", title: "An instruction file" },
  { id: "summaries", title: "How it reports back" },
  { id: "last-prompt", title: "Last prompt" },
  { id: "extras", title: "Extras" },
];

export default function TalkingToAgentsPage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pt-16 lg:pb-28">
        <div className="max-w-4xl">
          <Link
            href={`/${WORKSHOP.slug}`}
            className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {WORKSHOP.title}
          </Link>
          <h1
            className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl animate-fade-in-up"
            style={{ animationFillMode: "backwards" }}
          >
            {PART_TWO.title}
          </h1>
          <p
            className="mb-8 text-xl text-balance text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            {PART_TWO.intro}
          </p>
          <nav
            aria-label="On this page"
            className="mb-14 flex flex-wrap gap-2 animate-fade-in-up"
            style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
          >
            {steps.map(({ id, title }, index) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                {id !== "extras" && (
                  <span className="mr-1.5 font-mono text-primary">{index + 1}</span>
                )}
                {title}
              </a>
            ))}
          </nav>

          <div
            className="space-y-16 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <Step
              id="data"
              number={1}
              title="Get the data"
              intro="Start clean: a new folder and a new session, so the agent meets you cold."
            >
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <ol className="list-decimal space-y-3 pl-5 marker:font-mono marker:text-primary">
                  <li>
                    Download the data and unzip it somewhere outside the folder you used in part
                    one.
                  </li>
                  <li>
                    Open the <Code>tuning-workshop</Code> folder in VS Code, or run{" "}
                    <Code>claude</Code> inside it.
                  </li>
                  <li>Start a new session. No instructions file, no earlier chat.</li>
                </ol>
                <Button asChild size="lg" className="glow-green h-12 px-6 text-base">
                  <a href={PART_TWO.dataUrl} download>
                    <Download />
                    Download the data
                  </a>
                </Button>
              </div>
              <pre className="mt-6 rounded-xl border border-border bg-background/60 px-5 py-4 font-mono text-sm leading-relaxed">
                {`tuning-workshop/
└─ data/
   ├─ nda_ex_5_spiketimes.csv
   └─ nda_ex_5_stimulus.csv`}
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                41 neurons, 16 directions, 11 repeats of each. From the{" "}
                <TextLink href={PART_TWO.dataSource.href}>{PART_TWO.dataSource.label}</TextLink>{" "}
                by Philipp Berens and Alexander Ecker, shared under CC BY 4.0.
              </p>
            </Step>

            <Step
              id="first-prompt"
              number={2}
              title="Paste this and leave it running"
              intro="Everyone, the same request. No instructions, no background."
            >
              <Prompt label="First prompt" text={PROMPTS.first} />
              <After>
                When it stops, note one number: how many direction-selective neurons it reports.
              </After>
            </Step>

            <Step
              id="ask"
              number={3}
              title="Ask what it decided"
              intro="In the same session, once it has finished. Each answer takes about half a minute. Use these, or say it in your own words."
            >
              <div className="space-y-4">
                <Prompt label="Question 1" text={PROMPTS.askDecisions} />
                <Prompt label="Question 2" text={PROMPTS.askRule} />
              </div>
              <After>
                In question 2, change “number 1” to wherever the strength rule is in its list.
              </After>
            </Step>

            <Step
              id="interview"
              number={4}
              title="Let it interview you"
              intro="Unzip the data again into a new folder, so it can’t find the finished analysis, and start a new session there."
            >
              <Prompt label="grill-me, then the same request" text={PROMPTS.grillMe} />
              <After>
                Answer its questions one at a time. Stop at the plan; it doesn’t need to run the
                analysis. Notice the question you couldn’t answer.
              </After>

              <h3 className="mt-10 mb-2 text-lg font-medium">Keep it as a skill</h3>
              <p className="mb-4 text-muted-foreground">
                Install it once, pick grill-me, grilling and your agent, then type{" "}
                <Code>/grill-me</Code> in any new session instead of pasting it. Or save the prompt
                yourself from <TextLink href={PART_TWO.links.grillMe}>grill-me on GitHub</TextLink>.
              </p>
              <div className="space-y-4">
                <Prompt label="In a terminal" text={PROMPTS.grillMeInstall} />
                <Prompt label="Then, in a new session" text={PROMPTS.grillMeCommand} />
              </div>
            </Step>

            <Step
              id="instructions"
              number={5}
              title="Add an instruction file"
              intro="Four standing rules your agent reads at the start of every session. A nudge, not a switch."
            >
              <ol className="list-decimal space-y-3 pl-5 marker:font-mono marker:text-primary">
                <li>Unzip the data into a third folder.</li>
                <li>
                  Save the file there as <Code>CLAUDE.md</Code> (for Codex, as{" "}
                  <Code>AGENTS.md</Code>).
                </li>
                <li>Start a new session and paste the first prompt again.</li>
              </ol>
              <Button asChild variant="outline" className="mt-6 h-10 px-4">
                <a href={PART_TWO.links.claudeMd} {...external}>
                  Open CLAUDE.md on GitHub
                  <ArrowUpRight />
                </a>
              </Button>
            </Step>

            <Step
              id="summaries"
              number={6}
              title="Choose how it reports back"
              intro="Two popular tools that reshape the summary. They’re a quick way to find out which shape you like."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Tool
                  name="caveman"
                  href={PART_TWO.links.caveman}
                  install={PROMPTS.cavemanInstall}
                  usage="On: /caveman · off: say “stop caveman”"
                />
                <Tool
                  name="i-have-adhd"
                  href={PART_TWO.links.adhd}
                  install={PROMPTS.adhdInstall}
                  usage="On: /i-have-adhd · off: say “stop adhd mode”"
                />
              </div>
              <p className="mt-8 mb-4 text-muted-foreground">
                Or install nothing and say it yourself. A sentence like this gets you much of the
                same shape:
              </p>
              <Prompt label="Say it yourself" text={PROMPTS.reportShape} />
            </Step>

            <Step
              id="last-prompt"
              number={7}
              title="Ask what it learned about you"
              intro="Paste into the session you’ve been using."
            >
              <Prompt label="Last prompt" text={PROMPTS.last} />
              <After>The third list is the agent’s feedback on how you communicate.</After>
            </Step>

            <section id="extras" className="scroll-mt-8 space-y-14 border-t border-border pt-14">
              <div>
                <h2 className="mb-2 text-3xl font-semibold tracking-tight">Extras</h2>
                <p className="text-muted-foreground">If there’s time, or to try later.</p>
              </div>

              <Step
                title="Let it loop until it’s done"
                intro="A new empty folder and a new session, with no data this time. It builds a Stroop experiment and keeps checking its own work. Ours took 7 to 13 minutes."
              >
                <Prompt label="The brief" text={PROMPTS.loop} />
                <After>
                  It asks before running its checks the first time; say yes so it can keep looping.
                  When it stops, open stroop.html and try it. In Claude Code, putting{" "}
                  <Code>/goal</Code> in front of the same text keeps the session going until a
                  second model agrees it’s done.
                </After>
              </Step>

              <Step
                title="Get a second opinion"
                intro="Ask a fresh agent to check a finished analysis, not to redo it. Open a new session in the folder with the analysis, and replace the summary in the first paragraph with your own."
              >
                <Prompt label="Second opinion" text={PROMPTS.secondOpinion} />
              </Step>

              <Step
                title="Say it in the prompt"
                intro="Who you are, what it’s for and how to work, before the request. In a new folder with the data."
              >
                <Prompt label="With an introduction" text={PROMPTS.withIntro} />
              </Step>

              <Step
                title="Have it teach you the analysis"
                intro="In the session that did the analysis. It makes a short page that teaches it from your own data."
              >
                <Prompt label="Learning page" text={PROMPTS.learnAnalysis} />
              </Step>

              <Step
                title="Brief a search for a better method"
                intro="Brief it the way you would brief a person: what is wrong now, who you are, what to bring back, and how far to go. This is ours; write your own."
              >
                <Prompt label="Search brief" text={PROMPTS.search} />
              </Step>

              <Step
                title="Learn the new method before it builds it"
                intro="If your search picked a different method, describe that one in the first paragraph instead."
              >
                <Prompt label="Learning page for the new method" text={PROMPTS.learnMethod} />
              </Step>

              <Step
                title="Build the new method"
                intro="In the session with the finished analysis. It puts everything new in a bayes/ folder."
              >
                <Prompt label="Build it" text={PROMPTS.buildMethod} />
              </Step>

              <Step
                title="Eight things worth typing in Claude Code"
                intro="Checked against Claude Code 2.1.322 on 12 November 2026. These change; look again before you rely on one."
              >
                <dl className="divide-y divide-border rounded-xl border border-border bg-background/40">
                  {COMMANDS.map(({ keys, description }) => (
                    <div
                      key={keys}
                      className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6"
                    >
                      <dt className="font-mono text-primary">{keys}</dt>
                      <dd className="text-muted-foreground">{description}</dd>
                    </div>
                  ))}
                </dl>
              </Step>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function Prompt({ label, text }: { label: string; text: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background/60">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border py-1.5 pr-2 pl-5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <CopyButton text={text} />
      </figcaption>
      <pre className="px-5 py-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
        {text}
      </pre>
    </figure>
  );
}

function Tool({
  name,
  href,
  install,
  usage,
}: {
  name: string;
  href: string;
  install: string;
  usage: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-5">
      <h3 className="mb-4 text-lg font-medium">
        <TextLink href={href}>{name}</TextLink>
      </h3>
      <Prompt label="In a terminal" text={install} />
      <p className="mt-3 text-sm text-muted-foreground">{usage}</p>
    </div>
  );
}

function After({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-muted-foreground">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...external}
      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight className="size-3.5" />
    </a>
  );
}
