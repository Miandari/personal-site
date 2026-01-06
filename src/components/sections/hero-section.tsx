import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/common/social-icons";
import { SITE_CONFIG, HERO_CONTENT } from "@/lib/constants";
import { ArrowDown, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center app-gradient-dark overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 pt-32 relative z-10">
        {/* Headshot with glowing ring */}
        <div
          className="flex justify-center mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
        >
          <div className="relative group">
            {/* Animated glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

            {/* Inner ring */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-primary/60" />

            {/* Image container */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-background">
              <Image
                src={SITE_CONFIG.headshotPath}
                alt={SITE_CONFIG.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Name with gradient */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-5 animate-fade-in-up tracking-tight"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          <span className="gradient-text">{SITE_CONFIG.name}</span>
        </h1>

        {/* Tagline with separator dots */}
        <p
          className="text-center mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          <span className="inline-flex items-center gap-3 text-xl md:text-2xl text-primary font-medium tracking-wide">
            <span>PhD Candidate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span>Computational Social Science</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span>NLP & ML</span>
          </span>
        </p>

        {/* Bio paragraphs */}
        <div
          className="space-y-6 mb-14 text-center max-w-4xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          {HERO_CONTENT.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-14 animate-fade-in-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
        >
          <Button
            asChild
            size="lg"
            className="glow-green bg-primary text-primary-foreground hover:bg-primary/90 group px-8 text-base"
          >
            <a href="#projects" className="inline-flex items-center gap-2">
              View Projects
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/50 hover:bg-primary/5 px-8 text-base"
          >
            <a
              href={SITE_CONFIG.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </Button>
        </div>

        {/* Social Icons */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
        >
          <SocialIcons />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
