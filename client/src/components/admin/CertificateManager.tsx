import { useEffect, useMemo, useState } from "react";
import {
  HiCheckBadge,
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
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
  type Certificate,
  type CertificateFormData,
  type CertificateStatus,
} from "@/services/certificateService";

const emptyForm: CertificateFormData = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  verificationUrl: "#",
  skills: [],
  status: "Completed",
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

export function CertificateManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState<CertificateFormData>(emptyForm);
  const [skillsText, setSkillsText] = useState("");
  const [editingCertificateId, setEditingCertificateId] =
    useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sortedCertificates = useMemo(() => {
    return [...certificates].sort((a, b) => a.order - b.order);
  }, [certificates]);

  async function loadCertificates() {
    setLoading(true);

    try {
      const data = await getCertificates();
      setCertificates(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialCertificates() {
      setLoading(true);

      try {
        const data = await getCertificates();
        if (isMounted) {
          setCertificates(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialCertificates();

    return () => {
      isMounted = false;
    };
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setSkillsText("");
    setEditingCertificateId(null);
    setShowForm(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setForm((currentForm) => ({
      ...currentForm,
      status: event.target.value as CertificateStatus,
    }));
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  function startEdit(certificate: Certificate) {
    setEditingCertificateId(certificate._id);

    setForm({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate,
      credentialId: certificate.credentialId,
      verificationUrl: certificate.verificationUrl,
      skills: certificate.skills,
      status: certificate.status,
      order: certificate.order,
    });

    setSkillsText(arrayToText(certificate.skills));
    setShowForm(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CertificateFormData = {
      ...form,
      skills: textToArray(skillsText),
      verificationUrl: form.verificationUrl || "#",
      order: Number(form.order) || 0,
    };

    setSaving(true);

    try {
      if (editingCertificateId) {
        await updateCertificate(editingCertificateId, payload);
      } else {
        await createCertificate(payload);
      }

      await loadCertificates();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(certificate: Certificate) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${certificate.title}"?`
    );

    if (!confirmed) return;

    await deleteCertificate(certificate._id);
    await loadCertificates();
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Certificates CRUD
          </p>
          <h2 className="mt-2 text-3xl font-black">Manage Certificates</h2>
          <p className="mt-2 text-muted-foreground">
            Add, edit, and delete certificates shown on the public site.
          </p>
        </div>

        <Button
          type="button"
          onClick={startCreate}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <HiPlus className="mr-2" />
          Add Certificate
        </Button>
      </div>

      {showForm && (
        <Card className="cyber-card mb-8 border-border bg-card/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">
                {editingCertificateId ? "Edit Certificate" : "Add Certificate"}
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
                    Certificate Title
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
                    Issuer
                  </label>
                  <Input
                    name="issuer"
                    value={form.issuer}
                    onChange={handleInputChange}
                    required
                    placeholder="Cisco, TryHackMe, Hack The Box..."
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Issue Date
                  </label>
                  <Input
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleInputChange}
                    required
                    placeholder="2026"
                    className="border-border bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Credential ID
                  </label>
                  <Input
                    name="credentialId"
                    value={form.credentialId}
                    onChange={handleInputChange}
                    placeholder="Certificate ID"
                    className="border-border bg-background/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Verification URL
                </label>
                <Input
                  name="verificationUrl"
                  value={form.verificationUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="border-border bg-background/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Skills
                </label>
                <Input
                  value={skillsText}
                  onChange={(event) => setSkillsText(event.target.value)}
                  placeholder="Cybersecurity, Linux, Networking"
                  className="border-border bg-background/60"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={handleStatusChange}
                    className="h-10 w-full rounded-md border border-border bg-background/60 px-3 text-sm"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
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
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {saving
                    ? "Saving..."
                    : editingCertificateId
                    ? "Update Certificate"
                    : "Create Certificate"}
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
        <p className="text-muted-foreground">Loading certificates...</p>
      ) : (
        <div className="grid gap-5">
          {sortedCertificates.map((certificate) => (
            <Card
              key={certificate._id}
              className="cyber-card border-border bg-card/70 backdrop-blur-xl"
            >
              <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {certificate.issuer}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {certificate.status}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      Order {certificate.order}
                    </Badge>
                  </div>

                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <HiCheckBadge className="text-primary" />
                    {certificate.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Issued: {certificate.issueDate}
                  </p>

                  {certificate.credentialId && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Credential: {certificate.credentialId}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => startEdit(certificate)}
                    className="rounded-full border-border bg-transparent"
                  >
                    <HiPencilSquare className="mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(certificate)}
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