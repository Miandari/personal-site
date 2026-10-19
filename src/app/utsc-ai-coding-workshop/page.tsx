import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { WORKSHOP } from "./content";
import { SignupForm } from "./signup-form";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const description = `${WORKSHOP.tagline} A two-hour, hands-on workshop on ${WORKSHOP.details[0].value}.`;

export const metadata: Metadata = {
  title: { absolute: WORKSHOP.title },
  description,
  alternates: { canonical: `/${WORKSHOP.slug}` },
  openGraph: {
    type: "website",
    url: `/${WORKSHOP.slug}`,
    title: WORKSHOP.title,
    description,
  },
  twitter: { card: "summary", title: WORKSHOP.title, description },
};

export default function WorkshopPage() {
  return (
    <div
      className={`${mono.variable} relative flex min-h-screen flex-col overflow-hidden app-gradient-dark`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <main className="relative flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
          <div>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl animate-fade-in-up"
              style={{ animationFillMode: "backwards" }}
            >
              {WORKSHOP.title}
            </h1>
            <p
              className="mb-8 text-xl text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
            >
              {WORKSHOP.tagline}
            </p>
            <dl
              className="mb-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
            >
              {WORKSHOP.details.map(({ label, value }) => (
                <div key={label} className="contents">
                  <dt className="pt-0.5 font-mono text-sm text-muted-foreground">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div
              className="max-w-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
            >
              <SignupForm />
            </div>
          </div>

          <div
            className="animate-fade-in-up lg:pl-6"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              What we’ll cover
            </h2>
            <ul className="space-y-5 border-l border-primary/30 pl-7">
              {WORKSHOP.topics.map((topic) => (
                <li key={topic} className="relative text-lg leading-snug">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(1.75rem+4.5px)] top-2 size-2 rounded-full bg-primary"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          Questions?{" "}
          <a
            href={`mailto:${WORKSHOP.contactEmail}`}
            className="text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {WORKSHOP.contactEmail}
          </a>
        </p>
      </footer>
    </div>
  );
}
