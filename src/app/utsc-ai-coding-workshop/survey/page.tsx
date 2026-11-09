import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SURVEY, WORKSHOP } from "../content";
import { SurveyForm } from "./survey-form";

// Sending answers can retry a slow Google Apps Script a few times (see ../sheet.ts).
export const maxDuration = 60;

export const metadata: Metadata = {
  title: { absolute: `${SURVEY.title} · ${WORKSHOP.title}` },
  description: SURVEY.intro,
  robots: { index: false },
};

export default function SurveyPage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pt-16 lg:pb-28">
        <div className="max-w-2xl">
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
            {SURVEY.title}
          </h1>
          <p
            className="mb-12 text-xl text-balance text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            {SURVEY.intro}
          </p>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <SurveyForm />
          </div>
        </div>
      </section>
    </main>
  );
}
