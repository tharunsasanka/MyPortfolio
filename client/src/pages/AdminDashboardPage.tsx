import { useNavigate } from "react-router-dom";
import { HiArrowLeftOnRectangle, HiFolder, HiShieldCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AdminDashboardPage() {
  const navigate = useNavigate();

  const adminUser = localStorage.getItem("admin_user");
  const admin = adminUser ? JSON.parse(adminUser) : null;

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/secure-admin-portal");
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

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <HiFolder className="mb-4 text-4xl text-primary" />
              <h2 className="text-xl font-bold">Projects</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add, edit, and delete portfolio projects.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <HiShieldCheck className="mb-4 text-4xl text-primary" />
              <h2 className="text-xl font-bold">Certificates</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage certificates and verification links.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card border-border bg-card/70 backdrop-blur-xl">
            <CardContent className="p-6">
              <HiShieldCheck className="mb-4 text-4xl text-primary" />
              <h2 className="text-xl font-bold">Cyber Labs</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Update TryHackMe and Hack The Box status.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}