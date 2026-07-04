import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiLockClosed, HiShieldCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/services/authService";

export function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("tharunsasanka1234@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.admin));

      navigate("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <Card className="cyber-card w-full max-w-md border-border bg-card/80 shadow-2xl backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <HiShieldCheck className="text-4xl" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
              Private Access
            </p>

            <h1 className="mt-3 text-3xl font-black">Admin Login</h1>

            <p className="mt-3 text-sm text-muted-foreground">
              This area is restricted and hidden from public visitors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="border-border bg-background/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-muted-foreground">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter admin password"
                className="border-border bg-background/60"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <HiLockClosed className="mr-2" />
              {loading ? "Checking..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}