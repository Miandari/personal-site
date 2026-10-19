"use client";

import { useActionState } from "react";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signUp, type SignupState } from "./actions";

const initialState: SignupState = { status: "idle" };

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex gap-4 rounded-xl border border-primary/40 bg-primary/5 p-5 animate-fade-in-up"
      >
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-primary" />
        <div className="space-y-1">
          <p className="text-lg font-semibold">You’re signed up.</p>
          <p className="text-muted-foreground">
            We’ll be in touch at{" "}
            <span className="font-medium text-foreground break-all">{state.email}</span>{" "}
            before the workshop.
          </p>
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

      {/* Honeypot: hidden from people and screen readers, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p id="email-error" role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
