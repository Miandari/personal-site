import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miandari.dev"),
  title: {
    default: "Mostafa Miandari Hossein | PhD Candidate in Computational Social Science",
    template: "%s | Mostafa Miandari Hossein",
  },
  description:
    "PhD Candidate at University of Toronto specializing in Computational Social Science, NLP, and Machine Learning. Building tools at the intersection of AI and social research.",
  keywords: [
    "Mostafa Miandari",
    "Computational Social Science",
    "NLP",
    "Machine Learning",
    "PhD Candidate",
    "University of Toronto",
    "LLM",
    "Social Media Research",
  ],
  authors: [{ name: "Mostafa Miandari Hossein" }],
  creator: "Mostafa Miandari Hossein",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miandari.dev",
    siteName: "Mostafa Miandari Hossein",
    title: "Mostafa Miandari Hossein | PhD Candidate",
    description:
      "Computational Social Science researcher specializing in NLP & ML",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mostafa Miandari Hossein | PhD Candidate",
    description:
      "Computational Social Science researcher specializing in NLP & ML",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
