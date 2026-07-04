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
  createCyberLab,
  deleteCyberLab,
  getCyberLabs,
  updateCyberLab,
  type CyberLab,
  type CyberLabFormData,
  type CyberLabProgress,
  type CyberLabStat,
} from "@/services/cyberLabService";

const emptyForm: CyberLabFormData = {
  name: "",
  username: "",
  rank: "",
  status: "Active",
  profileUrl: "#",
  stats: [],
  progress: [],
  learningAreas: [],
  order: 0,
};

function textToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToText(items: string[]) {
  return items.join(", ");
}

function statsToText(stats: CyberLabStat[]) {
  return stats.map((stat) => `${stat.label}:${stat.value}`).join(", ");
}

function textToStats(value: string): CyberLabStat[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, ...rest] = item.split(":");

      return {
        label: label.trim(),
        value: rest.join(":").trim() || "0",
      };
    })
    .filter((item) => item.label);
}

function progressToText(progress: CyberLabProgress[]) {
  return progress.map((item) => `${item.label}:${item.value}`).join(", ");
}

function textToProgress(value: string): CyberLabProgress[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, ...rest] = item.split(":");
      const numberValue = Number(rest.join(":").trim()) || 0;

      return {
        label: label.trim(),
        value: Math.min(100, Math.max(0, numberValue)),
      };
    })
    .filter((item) => item.label);
}

export function CyberLabManager() {
  const [cyberLabs, setCyberLabs] = useState<CyberLab[]>([]);
  const [form, setForm] = useState<CyberLabFormData>(emptyForm);
  const [statsText, setStatsText] = useState("");
  const [progressText, setProgressText] = useState("");
  const [learningAreasText, setLearningAreasText] = useState("");
  const [editingCyberLabId, setEditingCyberLabId] = useState<string | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sortedCyberLabs = useMemo(() => {
    return [...cyberLabs].sort((a, b) => a.order - b.order);
  }, [cyberLabs]);

  async function loadCyberLabs() {
    setLoading(true);

    try {
      const data = await getCyberLabs();
      setCyberLabs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await loadCyberLabs();
    })();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setStatsText("");
    setProgressText("");
    setLearningAreasText("");
    setEditingCyberLabId(null);
    setShowForm(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  function startEdit(cyberLab: CyberLab) {
    setEditingCyberLabId(cyberLab._id);

    setForm({
      name: cyberLab.name,
      username: cyberLab.username,
      rank: cyberLab.rank,
      status: cyberLab.status,
      profileUrl: cyberLab.profileUrl,
      stats: cyberLab.stats,
      progress: cyberLab.progress,
      learningAreas: cyberLab.learningAreas,
      order: cyberLab.order,
    });

    setStatsText(statsToText(cyberLab.stats));
    setProgressText(progressToText(cyberLab.progress));
    setLearningAreasText(arrayToText(cyberLab.learningAreas));
    setShowForm(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CyberLabFormData = {
      ...form,
      profileUrl: form.profileUrl || "#",
      stats: textToStats(statsText),
      progress: textToProgress(progressText),
      learningAreas: textToArray(learningAreasText),
      order: Number(form.order) || 0,
    };

    setSaving(true);

    try {
      if (editingCyberLabId) {
        await updateCyberLab(editingCyberLabId, payload);
      } else {
        await createCyberLab(payload);
      }

      await loadCyberLabs();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cyberLab: CyberLab) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${cyberLab.name}"?`
    );

    if (!confirmed) return;

    await deleteCyberLab(cyberLab._id);
    await loadCyberLabs();
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Cyber Labs CRUD
          </p>
          <h2 className="mt-2 text-3xl font-black">Manage Cyber Labs</h2>
          <p className="mt-2 text-muted-foreground">
            Add, edit, and delete TryHackMe, Hack The Box, and other lab
            profiles.
          </p>
        </div>

        <Button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <HiPlus className="mr-2" />
          Add Cyber Lab
        </Button>
      </div>

      {showForm && (
        <Card className="cyber-card mb-8 border-border bg-card/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">
                {editingCyberLabId ? "Edit Cyber Lab" : "Add Cyber Lab"}
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
                    Platform Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    placeholder="TryHackMe"
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Username
                  </label>
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    required
                    placeholder="your-username"
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Rank
                  </label>
                  <Input
                    name="rank"
                    value={form.rank}
                    onChange={handleInputChange}
                    required
                    placeholder="Beginner, Learning, Hacker..."
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Status
                  </label>
                  <Input
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    required
                    placeholder="Active"
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Profile URL
                </label>
                <Input
                  name="profileUrl"
                  value={form.profileUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://tryhackme.com/p/username"
                  className="border-border bg-background/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Stats
                </label>
                <Input
                  value={statsText}
                  onChange={(event) => setStatsText(event.target.value)}
                  placeholder="Rooms:25, Badges:8, Streak:10"
                  className="border-border bg-background/60"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Format: label:value, label:value
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Progress
                </label>
                <Input
                  value={progressText}
                  onChange={(event) => setProgressText(event.target.value)}
                  placeholder="Pre Security:65, Linux:60, Web Security:55"
                  className="border-border bg-background/60"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Format: topic:percentage, topic:percentage
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Learning Areas
                </label>
                <Input
                  value={learningAreasText}
                  onChange={(event) => setLearningAreasText(event.target.value)}
                  placeholder="Web Security, Linux, OWASP Top 10"
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
                    : editingCyberLabId
                    ? "Update Cyber Lab"
                    : "Create Cyber Lab"}
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
        <p className="text-muted-foreground">Loading cyber labs...</p>
      ) : (
        <div className="grid gap-5">
          {sortedCyberLabs.map((cyberLab) => (
            <Card
              key={cyberLab._id}
              className="cyber-card border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {cyberLab.name}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {cyberLab.status}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      Order {cyberLab.order}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold">@{cyberLab.username}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Rank: {cyberLab.rank}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {cyberLab.learningAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => startEdit(cyberLab)}
                    className="rounded-full border-border bg-transparent"
                  >
                    <HiPencilSquare className="mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(cyberLab)}
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