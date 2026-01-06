import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="glass-card border-border transition-colors hover:border-primary/50 group h-full flex flex-col py-8">
      <CardHeader className="pb-4 px-8">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl md:text-3xl transition-colors group-hover:text-primary">
            {project.title}
          </CardTitle>
          <Badge
            variant="outline"
            className="shrink-0 text-sm capitalize border-primary/30 text-primary"
          >
            {project.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 px-8">
        <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed flex-1">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-muted text-sm">
              {tag}
            </Badge>
          ))}
        </div>
        {project.links && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.github && (
              <Button asChild variant="ghost" size="lg">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
            )}
            {project.links.github2 && (
              <Button asChild variant="ghost" size="lg">
                <a
                  href={project.links.github2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild variant="ghost" size="lg">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-5 w-5" /> Live Site
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
