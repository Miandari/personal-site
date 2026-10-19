# UTSC AI coding workshop

Signup page at `miandari.dev/utsc-ai-coding-workshop` (alias: `workshop.miandari.dev`,
see `next.config.ts`). Everything for the workshop lives in this folder.

Signups are stored as [Resend](https://resend.com) contacts in one segment, and each
signup gets a confirmation email from `workshop@miandari.dev`. Page copy and the
email text are in `content.ts`.

## Environment variables

| Name | What |
| --- | --- |
| `RESEND_API_KEY` | Full-access API key (contacts need full access, not "sending only") |
| `RESEND_SEGMENT_ID` | ID of the segment signups are added to |

Without them, `next dev` logs signups to the terminal instead of saving them.

## Seeing and emailing signups

Resend dashboard → Audience → the workshop segment. Export as CSV from there, or
send everyone an update as a Broadcast to that segment.

## Moving to a standalone site

Copy this folder, `src/components/ui/button.tsx`, `src/lib/utils.ts` and
`src/app/globals.css` into a new Next.js app, set the same env vars, and point the
domain at it. The signups stay in Resend, so nothing needs migrating.
