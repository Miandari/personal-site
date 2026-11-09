"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signUp, type SignupState } from "./actions";
import { WORKSHOP } from "./content";
import { Honeypot } from "./honeypot";

const initialState: SignupState = { status: "idle" };

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-primary/40 bg-primary/5 p-5 animate-fade-in-up"
      >
        <div className="flex gap-4">
          <CircleCheck className="mt-0.5 size-6 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-lg font-semibold">
              {state.alreadySignedUp ? "You’re already signed up." : "You’re signed up."}
            </p>
            <p className="text-muted-foreground">
              We’ll be in touch at{" "}
              <span className="font-medium text-foreground break-all">{state.email}</span>{" "}
              before the workshop.
            </p>
          </div>
        </div>
        <div className="mt-5 border-t border-primary/20 pt-5 sm:pl-10">
          <p className="mb-4 text-muted-foreground">
            Got a minute? Tell us a bit about your experience so we can plan the session.
          </p>
          <Button asChild size="lg" className="glow-green group h-11 px-5 text-base">
            <Link href={`/${WORKSHOP.slug}/survey`}>
              Answer a few questions
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const error = state.status === "error" ? state.message : undefined;

  return (
    <form action={formAction} className="relative">
      <label htmlFor="email" className="mb-2 block text-sm font-medium">
        Your email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          placeholder="you@mail.utoronto.ca"
          defaultValue={state.status === "error" ? state.email : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "email-error" : undefined}
          className="h-12 min-w-0 rounded-lg sm:flex-1 border border-input bg-background/60 px-4 text-base outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-invalid:border-destructive"
        />
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="glow-green group h-12 px-6 text-base"
        >
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Signing up…
            </>
          ) : (
            <>
              Sign me up
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>

      <Honeypot />

      {error && (
        <p id="email-error" role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
