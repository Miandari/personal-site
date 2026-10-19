"use server";

import { Resend } from "resend";
import { WORKSHOP } from "./content";

export type SignupState =
  | { status: "idle" }
  | { status: "success"; email: string; emailSent: boolean }
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
    return { status: "success", email, emailSent: true };
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      email,
      message: "That doesn’t look like an email address.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[workshop] Resend not configured, signup not saved: ${email}`);
      return { status: "success", email, emailSent: false };
    }
    console.error("[workshop] RESEND_API_KEY or RESEND_SEGMENT_ID is not set");
    return { status: "error", email, message: GENERIC_ERROR };
  }

  const resend = new Resend(apiKey);

  if (!(await saveSignup(resend, email, segmentId))) {
    return { status: "error", email, message: GENERIC_ERROR };
  }

  const { paragraphs, from, subject } = WORKSHOP.confirmationEmail;
  const { error } = await resend.emails.send({
    from,
    to: email,
    replyTo: WORKSHOP.contactEmail,
    subject,
    text: paragraphs.join("\n\n"),
    html: paragraphs
      .map((paragraph) => `<p>${paragraph.replaceAll("&", "&amp;")}</p>`)
      .join("\n"),
  });
  if (error) {
    console.error("[workshop] confirmation email failed", error);
  }

  return { status: "success", email, emailSent: !error };
}

// Signups are stored as Resend contacts in the workshop's segment, so the
// list can be exported or emailed later as a broadcast.
async function saveSignup(resend: Resend, email: string, segmentId: string) {
  const created = await resend.contacts.create({
    email,
    segments: [{ id: segmentId }],
  });
  if (!created.error) return true;

  // Resend doesn't document what happens when the contact already exists
  // (e.g. someone signs up twice), so check for that before giving up.
  const existing = await resend.contacts.get({ email });
  if (existing.error) {
    console.error("[workshop] could not save signup", created.error, existing.error);
    return false;
  }
  // Errors here just mean they were already in the segment.
  await resend.contacts.segments.add({ email, segmentId });
  return true;
}
