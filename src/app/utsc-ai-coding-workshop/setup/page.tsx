import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SETUP, WORKSHOP } from "../content";

export const metadata: Metadata = {
  title: { absolute: `${SETUP.title} · ${WORKSHOP.title}` },
  description: SETUP.intro,
  alternates: { canonical: `/${WORKSHOP.slug}/${SETUP.slug}` },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function SetupPage() {
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
            {SETUP.title}
          </h1>
          <p
            className="mb-14 text-xl text-balance text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            {SETUP.intro}
          </p>

          <div
            className="space-y-16 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <Step number={1} title="Install the software">
              <ul className="divide-y divide-border rounded-xl border border-border bg-background/40">
                {SETUP.software.map(({ name, description, links }) => (
                  <li
                    key={name}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-lg font-medium">{name}</p>
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex gap-2.5">
                      {links.map(({ label, href }) => (
                        <Button key={label} asChild variant="outline" className="h-10 px-4">
                          <a href={href} {...external}>
                            {label}
                            <ArrowUpRight />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Step>

            <Step
              number={2}
              title="Get a coding agent"
              intro="You’ll use a coding agent through your own account. Here’s what each plan includes."
            >
              <div className="grid gap-6 md:grid-cols-2">
                {SETUP.providers.map((provider) => (
                  <div
                    key={provider.company}
                    className="rounded-xl border border-border bg-background/40 p-5"
                  >
                    <h3 className="mb-4 text-lg font-medium">
                      {provider.company}{" "}
                      <span className="font-normal text-muted-foreground">· {provider.agent}</span>
                    </h3>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          <th className="pb-2 font-normal">Plan</th>
                          <th className="pb-2 text-right font-normal">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {provider.plans.map(({ name, usage, price }) => (
                          <tr key={name}>
                            <td className="py-3 pr-3">
                              <span className="block font-medium">{name}</span>
                              <span className="block text-sm text-muted-foreground">{usage}</span>
                            </td>
                            <td className="py-3 text-right align-top whitespace-nowrap">{price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {"offer" in provider && (
                      <a
                        href={provider.offer.href}
                        {...external}
                        className="mt-4 inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {provider.offer.label}
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Step>

            <Step
              number={3}
              title="Get the workshop files"
              intro="Everything we’ll work with on the day is in one shared folder."
            >
              <Button asChild size="lg" className="glow-green h-12 px-6 text-base">
                <a href={SETUP.filesUrl} {...external}>
                  <FolderOpen />
                  Open the folder
                  <ArrowUpRight />
                </a>
              </Button>
            </Step>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  intro,
  children,
}: {
  number: number;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
        <span className="font-mono text-base text-primary">0{number}</span>
        {title}
      </h2>
      {intro && <p className="mb-5 text-muted-foreground">{intro}</p>}
      <div className={intro ? undefined : "mt-5"}>{children}</div>
    </section>
  );
}
