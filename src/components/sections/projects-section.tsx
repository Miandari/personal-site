import { ProjectCard } from "@/components/common/project-card";
import { PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="mb-14 text-center text-4xl font-bold text-foreground md:text-5xl">
          Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
