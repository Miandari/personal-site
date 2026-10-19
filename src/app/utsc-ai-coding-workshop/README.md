# UTSC AI coding workshop

Signup page at `miandari.dev/utsc-ai-coding-workshop` (alias: `workshop.miandari.dev`,
see `next.config.ts`). Everything for the workshop lives in this folder, and the page
copy is in `content.ts`.

Signups go to a Google Sheet: the server action posts each email to a Google Apps
Script web app, which adds a row (skipping emails already on the list). No email is
sent to the person; we contact them ourselves.

## Setting up the sheet

1. Create a Google Sheet, e.g. "UTSC workshop signups".
2. In the sheet: Extensions → Apps Script. Replace the code with the script below and save.
3. Deploy → New deployment → type **Web app**. Execute as: **Me**. Who has access:
   **Anyone**. Deploy, authorize it (Google warns that the app is unverified because
   it's your own script: Advanced → Go to … → Allow), and copy the Web app URL
   (it ends in `/exec`).
4. In Vercel → Settings → Environment Variables, set `SIGNUP_SHEET_URL` to that URL,
   then redeploy.

If you change the script later, publish it with Deploy → Manage deployments → Edit →
Version: New version, so the same URL keeps working.

```js
function doPost(e) {
  const email = String(e.parameter.email || "").trim().toLowerCase();
  if (!email) return ContentService.createTextOutput("missing email");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(["Email", "Signed up"]);
    const emails = sheet.getRange("A:A").getValues().flat();
    if (!emails.includes(email)) sheet.appendRow([email, new Date()]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}
```

Without `SIGNUP_SHEET_URL`, `next dev` logs signups to the terminal instead of saving them.

## Moving to a standalone site

Copy this folder, `src/components/ui/button.tsx`, `src/lib/utils.ts` and
`src/app/globals.css` into a new Next.js app, set the same env var, and point the
domain at it. The signups stay in the sheet, so nothing needs migrating.
