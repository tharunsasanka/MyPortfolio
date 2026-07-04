import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowTopRightOnSquare,
  HiCodeBracket,
  HiEye,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { projects, type Project } from "@/data/projects";

const categories = ["All", ...new Set(projects.map((project) => project.category))];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Practical work that shows my skills"
        description="A collection of web, software, cybersecurity, and academic projects that demonstrate my development and problem-solving abilities."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                : "rounded-full border-border bg-transparent text-muted-foreground hover:text-foreground"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
          >
            <Card className="group h-full overflow-hidden cyber-card border-border bg-card/70 backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
                    {project.category}
                  </Badge>

                  <Badge variant="outline" className="border-border">
                    {project.status}
                  </Badge>
                </div>

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                  <HiCodeBracket className="text-3xl" />
                </div>

                <h3 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    onClick={() => setSelectedProject(project)}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <HiEye className="mr-2" />
                    Preview
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      if (project.githubUrl !== "#") {
                        window.open(project.githubUrl, "_blank");
                      }
                    }}
                    className="rounded-full border-border bg-transparent"
                  >
                    GitHub
                    <HiArrowTopRightOnSquare className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={selectedProject !== null}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-background text-foreground sm:max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {selectedProject.category}
                  </Badge>

                  <Badge variant="outline" className="border-border">
                    {selectedProject.status}
                  </Badge>
                </div>

                <DialogTitle className="text-3xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <p className="mt-4 leading-8 text-muted-foreground">
                {selectedProject.longDescription}
              </p>

              <div className="mt-6">
                <h4 className="mb-3 font-semibold text-foreground">
                  Key Features
                </h4>

                <ul className="grid gap-3 md:grid-cols-2">
                  {selectedProject.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-muted-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 font-semibold text-foreground">
                  Technologies
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    if (selectedProject.githubUrl !== "#") {
                      window.open(selectedProject.githubUrl, "_blank");
                    }
                  }}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  GitHub Repository
                  <HiArrowTopRightOnSquare className="ml-2" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedProject.liveUrl !== "#") {
                      window.open(selectedProject.liveUrl, "_blank");
                    }
                  }}
                  className="rounded-full border-border bg-transparent"
                >
                  Live Demo
                  <HiArrowTopRightOnSquare className="ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}