"use server";

import { WORKSHOP } from "./content";

export type SignupState =
  | { status: "idle" }
  | { status: "success"; email: string; alreadySignedUp: boolean }
  | { status: "error"; email: string; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = `Something went wrong on our end. Please try again, or email ${WORKSHOP.contactEmail}.`;
const ATTEMPTS = 3;

export async function signUp(
  _previous: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (formData.get("company")) {
    return { status: "success", email, alreadySignedUp: false };
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
      return { status: "success", email, alreadySignedUp: false };
    }
    console.error("[workshop] SIGNUP_SHEET_URL is not set");
    return { status: "error", email, message: GENERIC_ERROR };
  }

  // Google sometimes saves the email but then answers slowly or with a 404.
  // The script skips emails it already has, so trying again is safe.
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const reply = await saveToSheet(sheetUrl, email);
      // After a failed attempt, "exists" most likely means that attempt saved it.
      return { status: "success", email, alreadySignedUp: reply === "exists" && attempt === 1 };
    } catch (error) {
      lastError = error;
      console.warn(`[workshop] attempt ${attempt} of ${ATTEMPTS} failed: ${error}`);
    }
  }

  console.error("[workshop] could not save signup", lastError);
  return { status: "error", email, message: GENERIC_ERROR };
}

// The Apps Script in README.md replies "ok" when it adds the email to the
// signup sheet, and "exists" when the email is already there.
async function saveToSheet(sheetUrl: string, email: string): Promise<string> {
  const response = await fetch(sheetUrl, {
    method: "POST",
    body: new URLSearchParams({ email }),
    signal: AbortSignal.timeout(10_000),
  });
  const reply = await response.text();
  if (!response.ok || (reply !== "ok" && reply !== "exists")) {
    throw new Error(`${response.status}: ${reply.slice(0, 200)}`);
  }
  return reply;
}
