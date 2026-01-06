import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, EDUCATION_CONTENT } from "@/lib/constants";
import { FileText, GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <SectionWrapper id="education" title="Education">
      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="p-4 rounded-full bg-primary/10">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              PhD Candidate
            </h3>
            <p className="text-primary text-lg">
              University of Toronto · Decision Neuroscience Lab
            </p>
          </div>
        </div>

        <div className="space-y-5 text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
          <p>{EDUCATION_CONTENT.summary}</p>
          <p>{EDUCATION_CONTENT.details}</p>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg" className="hover:border-primary/50 hover:bg-primary/5">
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
