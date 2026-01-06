import { SocialIcons } from "@/components/common/social-icons";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <SocialIcons />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-base text-muted-foreground">
          <span>
            &copy; {currentYear} {SITE_CONFIG.name}
          </span>
          <span className="hidden sm:inline">·</span>
          <a
            href={SITE_CONFIG.cvPath}
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>
    </footer>
  );
}
