# UTSC AI coding workshop

Pages, all under `miandari.dev/utsc-ai-coding-workshop` (alias: `workshop.miandari.dev`,
see `next.config.ts`):

- `/`: signup.
- `/survey`: a short survey, linked from the signup confirmation.
- `/setup`: what to install, coding agent plans, and the workshop files.
- `/part-2`: the data and prompts for part two ("Talking to agents"). The data zip is
  `public/documents/tuning-workshop.zip`.

Everything for the workshop lives in this folder. The page copy, survey questions and
setup links are in `content.ts`; part two's prompts are in `part-2/content.ts`.

Each form saves to its own Google Sheet, through a Google Apps Script web app attached
to that sheet (`sheet.ts`):

| Form   | Environment variable | Script reply                               |
| ------ | -------------------- | ------------------------------------------ |
| Signup | `SIGNUP_SHEET_URL`   | "ok", or "exists" if the email is on the list |
| Survey | `SURVEY_SHEET_URL`   | "saved"                                    |

No email is sent to people who sign up; we contact them ourselves. The survey email is
optional.

Google sometimes saves the data but then replies slowly or with a 404, so the server
actions try up to three times. That's safe because the signup script never adds an
email twice, and the survey script keeps one row per response ID.

## Setting up a sheet

Do this once for each form, with that form's script below.

1. Create a Google Sheet, e.g. "UTSC workshop signups" or "UTSC workshop survey".
2. In the sheet: Extensions → Apps Script. Replace the code with the script and save.
3. Deploy → New deployment → type **Web app**. Execute as: **Me**. Who has access:
   **Anyone**. Deploy, authorize it (Google warns that the app is unverified because
   it's your own script: Advanced → Go to … → Allow), and copy the Web app URL
   (it ends in `/exec`).
4. In Vercel → Settings → Environment Variables, set the form's variable to that URL,
   then redeploy.

If you change a script later, publish it with Deploy → Manage deployments → Edit →
Version: New version, so the same URL keeps working.

Each script writes to the first tab of its sheet.

### Signup script

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
    if (emails.includes(email)) return ContentService.createTextOutput("exists");
    sheet.appendRow([email, new Date()]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}
```

### Survey script

```js
// Survey fields, in column order, with their column titles.
const COLUMNS = [
  ["email", "Email"],
  ["agentUse", "Used a coding agent"],
  ["agents", "Agents"],
  ["coding", "Coding"],
  ["analysis", "Analyzes data in"],
  ["laptop", "Laptop"],
  ["handOff", "Would hand off"],
];

// One row per response ID: saving the same response again (e.g. when the site
// retries) replaces its row.
function doPost(e) {
  const answers = e.parameter;
  const id = answers.responseId;
  if (!id) return ContentService.createTextOutput("missing response ID");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Answered", ...COLUMNS.map(([, title]) => title), "Response ID"]);
    }
    const row = [new Date(), ...COLUMNS.map(([name]) => asText(answers[name] || "")), id];
    const ids = sheet.getRange(1, row.length, sheet.getLastRow()).getValues().flat();
    const index = ids.indexOf(id);
    if (index === -1) sheet.appendRow(row);
    else sheet.getRange(index + 1, 1, 1, row.length).setValues([row]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("saved");
}

// Stops Sheets from reading answers like "=..." or "- item" as formulas.
function asText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}
```

Without these variables, `next dev` logs signups and survey answers to the terminal
instead of saving them.

## Moving to a standalone site

Copy this folder, `src/components/ui/button.tsx`, `src/lib/utils.ts` and
`src/app/globals.css` into a new Next.js app, set the same env vars, and point the
domain at it. The signups and answers stay in the sheets, so nothing needs migrating.
