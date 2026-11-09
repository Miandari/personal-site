import { IBM_Plex_Mono } from "next/font/google";
import { WORKSHOP } from "./content";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${mono.variable} relative flex min-h-screen flex-col overflow-hidden app-gradient-dark`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {children}

      <footer className="relative border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          Questions?{" "}
          <a
            href={`mailto:${WORKSHOP.contactEmail}`}
            className="text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {WORKSHOP.contactEmail}
          </a>
        </p>
      </footer>
    </div>
  );
}
