import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/common/social-icons";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail } from "lucide-react";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Get in Touch">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl text-muted-foreground mb-10">
          Interested in collaboration or working together? Feel free to reach out.
        </p>
        <Button
          asChild
          size="lg"
          className="glow-green bg-primary text-primary-foreground hover:bg-primary/90 mb-12 px-10 text-lg"
        >
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </a>
        </Button>
        <SocialIcons />
      </div>
    </SectionWrapper>
  );
}
