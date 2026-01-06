import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  title,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="mb-14 text-center text-4xl font-bold text-foreground md:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
