import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS, SITE_CONFIG, EXPERIENCE_CONTENT } from "@/lib/constants";
import { Linkedin, FileText } from "lucide-react";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience">
      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-[1400px] mx-auto">
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
          {EXPERIENCE_CONTENT.summary}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="hover:border-primary/50 hover:bg-primary/5">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              View LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a
              href={SITE_CONFIG.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              View CV
            </a>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
