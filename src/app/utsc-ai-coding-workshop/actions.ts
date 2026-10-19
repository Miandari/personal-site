"use server";

import { WORKSHOP } from "./content";

export type SignupState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; email: string; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = `Something went wrong on our end. Please try again, or email ${WORKSHOP.contactEmail}.`;

export async function signUp(
  _previous: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (formData.get("company")) {
    return { status: "success", email };
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      email,
      message: "That doesn’t look like an email address.",
    };
  }

  const sheetUrl = process.env.SIGNUP_SHEET_URL;
  if (!sheetUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[workshop] SIGNUP_SHEET_URL not set, signup not saved: ${email}`);
      return { status: "success", email };
    }
    console.error("[workshop] SIGNUP_SHEET_URL is not set");
    return { status: "error", email, message: GENERIC_ERROR };
  }

  // The Apps Script in README.md adds the email to the signup sheet and replies "ok".
  try {
    const response = await fetch(sheetUrl, {
      method: "POST",
      body: new URLSearchParams({ email }),
      signal: AbortSignal.timeout(15_000),
    });
    const reply = await response.text();
    if (!response.ok || reply !== "ok") {
      throw new Error(`${response.status}: ${reply.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("[workshop] could not save signup", error);
    return { status: "error", email, message: GENERIC_ERROR };
  }

  return { status: "success", email };
}
