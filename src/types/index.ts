export interface Project {
  id: number;
  title: string;
  description: string[];
  tags: string[];
  type: "research" | "project" | "product";
  links?: {
    github?: string;
    github2?: string;
    live?: string;
    paper?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "googleScholar" | "email";
  url: string;
  label: string;
}
