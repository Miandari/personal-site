export const WORKSHOP = {
  slug: "utsc-ai-coding-workshop",
  title: "UTSC AI Coding Agent Workshop",
  tagline: "How to responsibly accelerate your research using coding agents.",
  contactEmail: "mostafa.miandari@mail.utoronto.ca",
  details: [
    { label: "When", value: "Friday, November 13, 1:00–3:00 PM" },
    { label: "Where", value: "UTSC, SW316" },
    { label: "Format", value: "2 hours, hands-on" },
    { label: "Bring", value: "Your laptop" },
    { label: "Hosts", value: "Adam Frost and Mostafa Miandari Hossein" },
  ],
  topics: [
    "Setting up a coding agent on your laptop",
    "Building a simple experiment",
    "Turning example data into results and figures",
    "Catching mistakes and making your workflow more reliable",
    "Data security and participant confidentiality",
  ],
  confirmationEmail: {
    from: "UTSC AI Coding Agent Workshop <workshop@miandari.dev>",
    subject: "You’re signed up for the UTSC AI Coding Agent Workshop",
    paragraphs: [
      "Thanks for signing up for the UTSC AI Coding Agent Workshop on Friday, November 13, 1:00–3:00 PM, in SW316 at UTSC.",
      "You’re on the list. We’ll be in touch before the workshop about what to set up on your laptop.",
      "Questions? Just reply to this email.",
      "Adam & Mostafa",
    ],
  },
} as const;
