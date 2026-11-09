"use client";

import { startTransition, useActionState, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SETUP, SURVEY, WORKSHOP, type SurveyQuestion } from "../content";
import { Honeypot } from "../honeypot";
import { submitSurvey, type SurveyState } from "./actions";

const initialState: SurveyState = { status: "idle" };

const FIELD_CLASS =
  "w-full rounded-lg border border-input bg-background/60 px-4 text-base outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-invalid:border-destructive";

export function SurveyForm() {
  const [state, formAction, pending] = useActionState(submitSurvey, initialState);
  // Single-choice answers so far, used to show follow-up questions.
  const [choices, setChoices] = useState<Record<string, string>>({});
  // Sent with every submission from this page, so the sheet keeps one row
  // per response even if saving is retried or the person submits again.
  const responseId = useRef<string>(null);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex gap-4 rounded-xl border border-primary/40 bg-primary/5 p-5 animate-fade-in-up"
      >
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-primary" />
        <div className="space-y-1">
          <p className="text-lg font-semibold">Thanks, we’ve got your answers.</p>
          <p className="text-muted-foreground">
            See you {WORKSHOP.details[0].value} at {WORKSHOP.details[1].value}.
          </p>
          <Link
            href={`/${WORKSHOP.slug}/${SETUP.slug}`}
            className="group mt-3 inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            Get your laptop ready
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    );
  }

  const error = state.status === "error" ? state : undefined;

  return (
    <form
      onChange={(event) => {
        const { type, name, value } = event.target as HTMLInputElement;
        if (type === "radio") setChoices((current) => ({ ...current, [name]: value }));
      }}
      // Submitting here instead of through `action` stops React from clearing
      // the form, so people keep their answers if saving fails.
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        responseId.current ??= crypto.randomUUID();
        formData.set("responseId", responseId.current);
        startTransition(() => formAction(formData));
      }}
      className="relative space-y-10"
    >
      {SURVEY.questions.map((question) => {
        const { showIf } = question;
        if (showIf && !showIf.answers.includes(choices[showIf.name])) return null;
        return <Question key={question.name} question={question} />;
      })}

      <div>
        <label htmlFor={SURVEY.handOff.name} className="mb-3 block text-lg font-medium">
          {SURVEY.handOff.label}{" "}
          <span className="text-sm font-normal text-muted-foreground">Optional.</span>
        </label>
        <textarea
          id={SURVEY.handOff.name}
          name={SURVEY.handOff.name}
          rows={4}
          maxLength={2000}
          placeholder={SURVEY.handOff.placeholder}
          className={`resize-y py-3 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-3 block text-lg font-medium">
          Your email <span className="text-sm font-normal text-muted-foreground">Optional.</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          placeholder="you@mail.utoronto.ca"
          aria-invalid={error?.invalidEmail ? true : undefined}
          className={`h-12 ${FIELD_CLASS}`}
        />
      </div>

      <Honeypot />

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="glow-green group h-12 px-6 text-base"
        >
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send answers
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Question({ question }: { question: SurveyQuestion }) {
  // Short options sit side by side; sentences get a row each.
  const compact = question.options.every((option) => option.length <= 24);
  return (
    // Follow-up questions fade in when they appear.
    <fieldset className={question.showIf ? "animate-fade-in-up" : undefined}>
      <legend className="mb-3 text-lg font-medium">
        {question.label}{" "}
        {question.hint && (
          <span className="text-sm font-normal text-muted-foreground">{question.hint}</span>
        )}
      </legend>
      <div className={compact ? "flex flex-wrap gap-2.5" : "grid gap-2.5"}>
        {question.options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-input bg-background/60 px-4 py-3 transition-colors hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40"
          >
            <input
              type={question.multiple ? "checkbox" : "radio"}
              name={question.name}
              value={option}
              required={!question.multiple}
              className="size-4 shrink-0 accent-primary"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
