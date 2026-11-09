"use server";

import { EMAIL_ERROR, isEmail, readEmail, SAVE_ERROR, sendToSheet } from "./sheet";

export type SignupState =
  | { status: "idle" }
  | { status: "success"; email: string; alreadySignedUp: boolean }
  | { status: "error"; email: string; message: string };

export async function signUp(
  _previous: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = readEmail(formData);

  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (formData.get("company")) {
    return { status: "success", email, alreadySignedUp: false };
  }

  if (!isEmail(email)) {
    return { status: "error", email, message: EMAIL_ERROR };
  }

  // The script replies "ok" when it adds the email, and "exists" when the
  // email is already on the sheet.
  const result = await sendToSheet("signup", { email }, ["ok", "exists"]);
  if (!result.saved) {
    return { status: "error", email, message: SAVE_ERROR };
  }

  // After a failed attempt, "exists" most likely means that attempt saved it.
  const alreadySignedUp = result.reply === "exists" && result.firstTry;
  return { status: "success", email, alreadySignedUp };
}
