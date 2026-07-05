import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Project,
  type ProjectFormData,
} from "@/services/projectService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const emptyForm: ProjectFormData = {
  title: "",
  category: "",
  description: "",
  longDescription: "",
  technologies: [],
  features: [],
  imageUrl: "",
  githubUrl: "#",
  liveUrl: "#",
  status: "Completed",
  isFeatured: false,
  order: 0,
};

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [technologiesText, setTechnologiesText] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch {
      setMessage("Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      try {
        setIsLoading(true);
        const data = await getProjects();
        if (mounted) setProjects(data);
      } catch {
        if (mounted) setMessage("Failed to load projects.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  function resetForm() {
    setFormData(emptyForm);
    setTechnologiesText("");
    setFeaturesText("");
    setEditingProjectId(null);
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: checked,
    }));
  }

  function handleEdit(project: Project) {
    setEditingProjectId(project._id);

    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      longDescription: project.longDescription,
      technologies: project.technologies,
      features: project.features,
      imageUrl: project.imageUrl || "",
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      status: project.status,
      isFeatured: project.isFeatured,
      order: project.order,
    });

    setTechnologiesText(project.technologies.join(", "));
    setFeaturesText(project.features.join(", "));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");

      const payload: ProjectFormData = {
        ...formData,
        technologies: technologiesText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        features: featuresText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingProjectId) {
        await updateProject(editingProjectId, payload);
        setMessage("Project updated successfully.");
      } else {
        await createProject(payload);
        setMessage("Project created successfully.");
      }

      resetForm();
      await loadProjects();
    } catch {
      setMessage("Failed to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);
      setMessage("Project deleted successfully.");
      await loadProjects();
    } catch {
      setMessage("Failed to delete project.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add, edit, delete, and manage project images.
          </p>
        </div>

        <Button
          type="button"
          onClick={resetForm}
          variant="outline"
          className="rounded-full border-border bg-transparent"
        >
          New Project
        </Button>
      </div>

      {message && (
        <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          {message}
        </div>
      )}

      <Card className="mb-8 border-border bg-card/70">
        <CardContent className="p-6">
          <h3 className="text-lg font-black">
            {editingProjectId ? "Edit Project" : "Create Project"}
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <InputField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <InputField
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/project-image.jpg"
              />

              <InputField
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />

              <InputField
                label="Live URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
              />

              <InputField
                label="Order"
                name="order"
                type="number"
                value={String(formData.order)}
                onChange={handleChange}
              />

              <label className="block">
                <span className="text-sm font-semibold text-muted-foreground">
                  Status
                </span>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planning">Planning</option>
                </select>
              </label>

              <label className="mt-8 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm font-semibold">Featured Project</span>
              </label>
            </div>

            {formData.imageUrl && (
              <div className="rounded-3xl border border-border bg-background/40 p-4">
                <p className="mb-3 text-sm font-semibold text-muted-foreground">
                  Image Preview
                </p>

                <img
                  src={formData.imageUrl}
                  alt="Project preview"
                  className="h-56 w-full rounded-2xl object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <TextAreaField
              label="Short Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <TextAreaField
              label="Long Description"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              required
            />

            <TextAreaField
              label="Technologies"
              name="technologies"
              value={technologiesText}
              onChange={(event) => setTechnologiesText(event.target.value)}
              placeholder="React, Node.js, MongoDB"
            />

            <TextAreaField
              label="Features"
              name="features"
              value={featuresText}
              onChange={(event) => setFeaturesText(event.target.value)}
              placeholder="Authentication, Dashboard, CRUD"
            />

            <div className="flex flex-wrap justify-end gap-3">
              {editingProjectId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="rounded-full border-border bg-transparent"
                >
                  Cancel Edit
                </Button>
              )}

              <Button type="submit" disabled={isSaving} className="rounded-full">
                {isSaving
                  ? "Saving..."
                  : editingProjectId
                    ? "Update Project"
                    : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {isLoading ? (
          <Card className="border-border bg-card/70">
            <CardContent className="p-6 text-muted-foreground">
              Loading projects...
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project._id} className="border-border bg-card/70">
              <CardContent className="grid gap-5 p-6 md:grid-cols-[240px_1fr]">
                <div className="overflow-hidden rounded-3xl border border-border bg-background/40">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">{project.title}</h3>
                      <p className="mt-1 text-sm text-primary">
                        {project.category} • {project.status}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        onClick={() => handleEdit(project)}
                        variant="outline"
                        className="rounded-full border-border bg-transparent"
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleDelete(project._id)}
                        variant="outline"
                        className="rounded-full border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

function InputField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextAreaField({
  label,
  name,
  value,
  placeholder,
  required,
  onChange,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={4}
        onChange={onChange}
        className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </label>
  );
}