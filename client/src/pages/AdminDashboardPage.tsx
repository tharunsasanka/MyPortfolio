import { useEffect, useState } from "react";
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
import {
  getDashboardStats,
  type DashboardStats,
} from "@/services/dashboardService";

type AdminTab = "projects" | "certificates" | "cyber-labs" | "skills" | "inbox";

const defaultStats: DashboardStats = {
  projectsCount: 0,
  certificatesCount: 0,
  cyberLabsCount: 0,
  skillsCount: 0,
  messagesCount: 0,
  unreadMessagesCount: 0,
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [stats, setStats] = useState<DashboardStats>(defaultStats);

  const adminUser = localStorage.getItem("admin_user");
  const admin = adminUser ? JSON.parse(adminUser) : null;

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch {
      setStats(defaultStats);
    }
  }

  useEffect(() => {
    async function initializeStats() {
      await loadStats();
    }

    void initializeStats();
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/secure-admin-portal");
  }

  function handleTabChange(tab: AdminTab) {
    setActiveTab(tab);
    loadStats();
  }

  const adminTabs = [
    {
      id: "projects" as const,
      title: "Projects",
      description: "Add, edit, and delete portfolio projects.",
      icon: HiFolder,
      count: stats.projectsCount,
      countLabel: "Projects",
    },
    {
      id: "certificates" as const,
      title: "Certificates",
      description: "Manage certificates and verification links.",
      icon: HiShieldCheck,
      count: stats.certificatesCount,
      countLabel: "Certificates",
    },
    {
      id: "cyber-labs" as const,
      title: "Cyber Labs",
      description: "Manage TryHackMe and Hack The Box status.",
      icon: HiShieldCheck,
      count: stats.cyberLabsCount,
      countLabel: "Labs",
    },
    {
      id: "skills" as const,
      title: "Skills",
      description: "Manage technical skills and progress levels.",
      icon: HiShieldCheck,
      count: stats.skillsCount,
      countLabel: "Skills",
    },
    {
      id: "inbox" as const,
      title: "Inbox",
      description: "View and manage visitor contact messages.",
      icon: HiEnvelope,
      count: stats.unreadMessagesCount,
      countLabel:
        stats.unreadMessagesCount === 1 ? "Unread Message" : "Unread Messages",
      subCount: stats.messagesCount,
    },
  ];

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

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={loadStats}
              variant="outline"
              className="rounded-full border-border bg-transparent"
            >
              Refresh Stats
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full border-border bg-transparent"
            >
              <HiArrowLeftOnRectangle className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
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
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="text-4xl text-primary" />

                      <div className="rounded-2xl border border-primary/30 bg-primary/10 px-3 py-2 text-right">
                        <p className="text-2xl font-black text-primary">
                          {tab.count}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {tab.countLabel}
                        </p>
                      </div>
                    </div>

                    <h2 className="mt-5 text-xl font-bold">{tab.title}</h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {tab.description}
                    </p>

                    {tab.id === "inbox" && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Total messages: {tab.subCount}
                      </p>
                    )}

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