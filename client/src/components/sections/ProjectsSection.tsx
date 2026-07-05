import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowTopRightOnSquare,
  HiCodeBracket,
  HiFolder,
} from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { getProjects, type Project } from "@/services/projectService";
import { Button } from "@/components/ui/button";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }

    void loadProjects();
  }, []);

  function openLink(url: string) {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="projects" className="relative px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Featured Work
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A selection of cybersecurity, web development, and software projects
            built with modern technologies.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="mt-14 rounded-[2rem] border border-border bg-card/60 p-8 text-center text-muted-foreground backdrop-blur-xl">
            Loading projects...
          </div>
        ) : (
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="cyber-card group overflow-hidden rounded-[2rem] border border-border bg-card/60 backdrop-blur-xl"
              >
                <div className="relative h-64 overflow-hidden border-b border-border bg-background/40">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10">
                        <HiFolder className="text-5xl text-primary" />
                      </div>
                    </div>
                  )}

                  <div className="absolute left-5 top-5 rounded-full border border-primary/30 bg-background/70 px-4 py-2 text-xs font-bold text-primary backdrop-blur-xl">
                    {project.category}
                  </div>

                  <div className="absolute right-5 top-5 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-bold text-foreground backdrop-blur-xl">
                    {project.status}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                      <HiCodeBracket className="text-3xl text-primary" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black">{project.title}</h3>

                      <p className="mt-3 leading-7 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => openLink(project.githubUrl)}
                      variant="outline"
                      className="rounded-full border-border bg-transparent"
                    >
                      <FaGithub className="mr-2" />
                      GitHub
                    </Button>

                    <Button
                      type="button"
                      onClick={() => openLink(project.liveUrl)}
                      className="rounded-full"
                    >
                      Live Preview
                      <HiArrowTopRightOnSquare className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}