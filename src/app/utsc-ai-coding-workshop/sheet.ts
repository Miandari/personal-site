import { WORKSHOP } from "./content";

// Must not start with =, + or -, which Google Sheets would read as a formula.
const EMAIL_PATTERN = /^[^\s@=+-][^\s@]*@[^\s@]+\.[^\s@]+$/;
const ATTEMPTS = 3;

// Each form saves to its own Google Sheet, through the Apps Script web app
// whose URL is in this environment variable (see README.md).
const SHEET_URLS = {
  signup: "SIGNUP_SHEET_URL",
  survey: "SURVEY_SHEET_URL",
} as const;

export const SAVE_ERROR = `Something went wrong on our end. Please try again, or email ${WORKSHOP.contactEmail}.`;
export const EMAIL_ERROR = "That doesn’t look like an email address.";

export function readEmail(formData: FormData): string {
  return String(formData.get("email") ?? "").trim().toLowerCase();
}

export function isEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export type SheetResult = { saved: true; reply: string; firstTry: boolean } | { saved: false };

/**
 * Sends fields to the sheet's Apps Script and returns its reply, which must be
 * one of `replies`. Any other reply counts as a failure.
 */
export async function sendToSheet(
  sheet: keyof typeof SHEET_URLS,
  fields: Record<string, string>,
  replies: string[]
): Promise<SheetResult> {
  const variable = SHEET_URLS[sheet];
  const sheetUrl = process.env[variable];
  if (!sheetUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[workshop] ${variable} not set, ${sheet} not saved:`, fields);
      return { saved: true, reply: replies[0], firstTry: true };
    }
    console.error(`[workshop] ${variable} is not set`);
    return { saved: false };
  }

  // Google sometimes saves the data but then answers slowly or with a 404.
  // The scripts never add the same signup or survey response twice, so trying
  // again is safe.
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const response = await fetch(sheetUrl, {
        method: "POST",
        body: new URLSearchParams(fields),
        signal: AbortSignal.timeout(10_000),
      });
      const reply = await response.text();
      if (!response.ok || !replies.includes(reply)) {
        throw new Error(`${response.status}: ${reply.slice(0, 200)}`);
      }
      return { saved: true, reply, firstTry: attempt === 1 };
    } catch (error) {
      lastError = error;
      console.warn(`[workshop] ${sheet}: attempt ${attempt} of ${ATTEMPTS} failed: ${error}`);
    }
  }

  console.error(`[workshop] could not save ${sheet}`, lastError);
  return { saved: false };
}
