import { useEffect, useMemo, useState } from "react";
import {
  HiPencilSquare,
  HiPlus,
  HiTrash,
  HiXMark,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Project,
  type ProjectFormData,
  type ProjectStatus,
} from "@/services/projectService";

const emptyForm: ProjectFormData = {
  title: "",
  category: "",
  description: "",
  longDescription: "",
  technologies: [],
  features: [],
  githubUrl: "#",
  liveUrl: "#",
  status: "Planning",
  isFeatured: true,
  order: 0,
};

function arrayToText(items: string[]) {
  return items.join(", ");
}

function textToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [technologiesText, setTechnologiesText] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.order - b.order);
  }, [projects]);

  async function loadProjects() {
    setLoading(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);

      try {
        const data = await getProjects();
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setTechnologiesText("");
    setFeaturesText("");
    setEditingProjectId(null);
    setShowForm(false);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setForm((currentForm) => ({
      ...currentForm,
      status: event.target.value as ProjectStatus,
    }));
  }

  function handleFeaturedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((currentForm) => ({
      ...currentForm,
      isFeatured: event.target.checked,
    }));
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  function startEdit(project: Project) {
    setEditingProjectId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      longDescription: project.longDescription,
      technologies: project.technologies,
      features: project.features,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      status: project.status,
      isFeatured: project.isFeatured,
      order: project.order,
    });
    setTechnologiesText(arrayToText(project.technologies));
    setFeaturesText(arrayToText(project.features));
    setShowForm(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ProjectFormData = {
      ...form,
      technologies: textToArray(technologiesText),
      features: textToArray(featuresText),
      githubUrl: form.githubUrl || "#",
      liveUrl: form.liveUrl || "#",
      order: Number(form.order) || 0,
    };

    setSaving(true);

    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, payload);
      } else {
        await createProject(payload);
      }

      await loadProjects();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    await deleteProject(project._id);
    await loadProjects();
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Projects CRUD
          </p>
          <h2 className="mt-2 text-3xl font-black">Manage Projects</h2>
          <p className="mt-2 text-muted-foreground">
            Add, edit, and delete portfolio projects shown on the public site.
          </p>
        </div>

        <Button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <HiPlus className="mr-2" />
          Add Project
        </Button>
      </div>

      {showForm && (
        <Card className="cyber-card mb-8 border-border bg-card/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">
                {editingProjectId ? "Edit Project" : "Add New Project"}
              </h3>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={resetForm}
                className="rounded-full bg-transparent"
              >
                <HiXMark />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Title
                  </label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Category
                  </label>
                  <Input
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                    placeholder="Web App, Cybersecurity, Java..."
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Short Description
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="resize-none border-border bg-background/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Long Description
                </label>
                <Textarea
                  name="longDescription"
                  value={form.longDescription}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="resize-none border-border bg-background/60"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Technologies
                  </label>
                  <Input
                    value={technologiesText}
                    onChange={(event) =>
                      setTechnologiesText(event.target.value)
                    }
                    placeholder="React, Node.js, MongoDB"
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Features
                  </label>
                  <Input
                    value={featuresText}
                    onChange={(event) => setFeaturesText(event.target.value)}
                    placeholder="CRUD, Auth, Dashboard"
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    GitHub URL
                  </label>
                  <Input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleInputChange}
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Live Demo URL
                  </label>
                  <Input
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleInputChange}
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={handleStatusChange}
                    className="h-10 w-full rounded-md border border-border bg-background/60 px-3 text-sm"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Display Order
                  </label>
                  <Input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleInputChange}
                    className="border-border bg-background/60"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex h-10 items-center gap-3 rounded-md border border-border bg-background/60 px-4 text-sm">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={handleFeaturedChange}
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {saving
                    ? "Saving..."
                    : editingProjectId
                    ? "Update Project"
                    : "Create Project"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="rounded-full border-border bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading projects...</p>
      ) : (
        <div className="grid gap-5">
          {sortedProjects.map((project) => (
            <Card
              key={project._id}
              className="cyber-card border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      Order {project.order}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => startEdit(project)}
                    className="rounded-full border-border bg-transparent"
                  >
                    <HiPencilSquare className="mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(project)}
                    className="rounded-full border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <HiTrash className="mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}