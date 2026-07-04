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
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
  type Skill,
  type SkillFormData,
} from "@/services/skillService";

const emptyForm: SkillFormData = {
  name: "",
  category: "",
  level: 50,
  icon: "",
  description: "",
  order: 0,
};

export function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState<SkillFormData>(emptyForm);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => a.order - b.order);
  }, [skills]);

  async function loadSkills() {
    setLoading(true);

    try {
      const data = await getSkills();
      setSkills(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initialize() {
      await loadSkills();
    }

    initialize();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingSkillId(null);
    setShowForm(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        name === "level" || name === "order"
          ? Number(value)
          : value,
    }));
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  function startEdit(skill: Skill) {
    setEditingSkillId(skill._id);

    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      description: skill.description,
      order: skill.order,
    });

    setShowForm(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: SkillFormData = {
      ...form,
      level: Math.min(100, Math.max(0, Number(form.level) || 0)),
      order: Number(form.order) || 0,
    };

    setSaving(true);

    try {
      if (editingSkillId) {
        await updateSkill(editingSkillId, payload);
      } else {
        await createSkill(payload);
      }

      await loadSkills();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(skill: Skill) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${skill.name}"?`
    );

    if (!confirmed) return;

    await deleteSkill(skill._id);
    await loadSkills();
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Skills CRUD
          </p>
          <h2 className="mt-2 text-3xl font-black">Manage Skills</h2>
          <p className="mt-2 text-muted-foreground">
            Add, edit, and delete skills shown on the public portfolio.
          </p>
        </div>

        <Button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <HiPlus className="mr-2" />
          Add Skill
        </Button>
      </div>

      {showForm && (
        <Card className="cyber-card mb-8 border-border bg-card/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">
                {editingSkillId ? "Edit Skill" : "Add Skill"}
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
                    Skill Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    placeholder="React"
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
                    placeholder="Frontend, Backend, Security..."
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Level %
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    name="level"
                    value={form.level}
                    onChange={handleInputChange}
                    required
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Icon Name
                  </label>
                  <Input
                    name="icon"
                    value={form.icon}
                    onChange={handleInputChange}
                    placeholder="react, nodejs, shield, linux"
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Description
                </label>
                <Input
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Short skill description"
                  className="border-border bg-background/60"
                />
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

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {saving
                    ? "Saving..."
                    : editingSkillId
                    ? "Update Skill"
                    : "Create Skill"}
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
        <p className="text-muted-foreground">Loading skills...</p>
      ) : (
        <div className="grid gap-5">
          {sortedSkills.map((skill) => (
            <Card
              key={skill._id}
              className="cyber-card border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {skill.category}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {skill.level}%
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      Order {skill.order}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold">{skill.name}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {skill.description || "No description added."}
                  </p>

                  {skill.icon && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Icon: {skill.icon}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => startEdit(skill)}
                    className="rounded-full border-border bg-transparent"
                  >
                    <HiPencilSquare className="mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(skill)}
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