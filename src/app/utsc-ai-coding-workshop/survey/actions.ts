"use server";

import { SURVEY } from "../content";
import { EMAIL_ERROR, isEmail, readEmail, SAVE_ERROR, sendToSheet } from "../sheet";

export type SurveyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; invalidEmail: boolean };

const RESPONSE_ID_PATTERN = /^[0-9a-f-]{36}$/;

export async function submitSurvey(
  _previous: SurveyState,
  formData: FormData
): Promise<SurveyState> {
  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (formData.get("company")) {
    return { status: "success" };
  }

  // The email is optional, but if someone gives one it should look right.
  const email = readEmail(formData);
  if (email && !isEmail(email)) {
    return { status: "error", message: EMAIL_ERROR, invalidEmail: true };
  }

  // The script keeps one row per response ID, so retries don't add duplicates.
  const responseId = String(formData.get("responseId"));
  const fields: Record<string, string> = {
    responseId: RESPONSE_ID_PATTERN.test(responseId) ? responseId : crypto.randomUUID(),
    email,
  };

  // Keep only answers the survey offers, and drop answers to questions that
  // weren't asked (e.g. which agents, from someone who has never used one).
  for (const question of SURVEY.questions) {
    const asked =
      !question.showIf ||
      question.showIf.answers.includes(String(formData.get(question.showIf.name)));
    const answers = formData
      .getAll(question.name)
      .map(String)
      .filter((answer) => asked && question.options.includes(answer));
    fields[question.name] = answers.join(", ");
  }
  fields[SURVEY.handOff.name] = String(formData.get(SURVEY.handOff.name) ?? "")
    .trim()
    .slice(0, 2000);

  // The survey script replies "saved". Checking for it catches a
  // SURVEY_SHEET_URL that points at the signup script by mistake.
  const result = await sendToSheet("survey", fields, ["saved"]);
  if (!result.saved) {
    return { status: "error", message: SAVE_ERROR, invalidEmail: false };
  }
  return { status: "success" };
}
