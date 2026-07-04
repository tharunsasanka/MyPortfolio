import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowLeftOnRectangle,
  HiEnvelope,
  HiFolder,
  HiShieldCheck,
} from "react-icons/hi2";
import { CertificateManager } from "@/components/admin/CertificateManager";
import { ContactInbox } from "@/components/admin/ContactInbox";
import { CyberLabManager } from "@/components/admin/CyberLabManager";
import { ProjectManager } from "@/components/admin/ProjectManager";
import { SkillManager } from "@/components/admin/SkillManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AdminTab = "projects" | "certificates" | "cyber-labs" | "skills" | "inbox";

const adminTabs: {
  id: AdminTab;
  title: string;
  description: string;
  icon: typeof HiFolder;
}[] = [
  {
    id: "projects",
    title: "Projects",
    description: "Add, edit, and delete portfolio projects.",
    icon: HiFolder,
  },
  {
    id: "certificates",
    title: "Certificates",
    description: "Manage certificates and verification links.",
    icon: HiShieldCheck,
  },
  {
    id: "cyber-labs",
    title: "Cyber Labs",
    description: "Manage TryHackMe and Hack The Box status.",
    icon: HiShieldCheck,
  },
  {
    id: "skills",
    title: "Skills",
    description: "Manage technical skills and progress levels.",
    icon: HiShieldCheck,
  },
  {
    id: "inbox",
    title: "Inbox",
    description: "View and manage visitor contact messages.",
    icon: HiEnvelope,
  },
];

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");

  const adminUser = localStorage.getItem("admin_user");
  const admin = adminUser ? JSON.parse(adminUser) : null;

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/secure-admin-portal");
  }

  function renderActiveSection() {
    if (activeTab === "projects") {
      return <ProjectManager />;
    }

    if (activeTab === "certificates") {
      return <CertificateManager />;
    }

    if (activeTab === "cyber-labs") {
      return <CyberLabManager />;
    }

    if (activeTab === "skills") {
      return <SkillManager />;
    }

    if (activeTab === "inbox") {
      return <ContactInbox />;
    }

    return <ProjectManager />;
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
              Admin CMS
            </p>

            <h1 className="mt-3 text-4xl font-black">Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Welcome back, {admin?.name || "Admin"}.
            </p>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-full border-border bg-transparent"
          >
            <HiArrowLeftOnRectangle className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="text-left"
              >
                <Card
                  className={`cyber-card h-full border-border backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50 ${
                    isActive
                      ? "bg-primary/10 shadow-[0_0_35px_rgba(0,229,255,0.14)]"
                      : "bg-card/70"
                  }`}
                >
                  <CardContent className="p-6">
                    <Icon
                      className={`mb-4 text-4xl ${
                        isActive ? "text-primary" : "text-primary"
                      }`}
                    />

                    <h2 className="text-xl font-bold">{tab.title}</h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {tab.description}
                    </p>

                    {isActive && (
                      <div className="mt-5 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Active
                      </div>
                    )}
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-[2rem] border border-border bg-card/30 p-5 backdrop-blur-xl md:p-8">
          {renderActiveSection()}
        </div>
      </div>
    </main>
  );
}