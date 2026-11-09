import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LinkCard({
  href,
  title,
  description,
  className,
}: {
  href: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-4 rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50",
        className
      )}
    >
      <span>
        <span className="block font-medium">{title}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
