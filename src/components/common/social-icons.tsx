import { Github, Linkedin, GraduationCap } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className }: SocialIconsProps) {
  const icons = [
    { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub" },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
    {
      href: SOCIAL_LINKS.googleScholar,
      icon: GraduationCap,
      label: "Google Scholar",
    },
  ];

  return (
    <div className={`flex justify-center gap-4 ${className || ""}`}>
      {icons.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-muted p-3 transition-colors hover:bg-primary/20 hover:text-primary"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
