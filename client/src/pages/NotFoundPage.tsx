import { HiArrowLeft, HiShieldExclamation } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-24">
      <div className="cyber-card mx-auto max-w-2xl rounded-[2rem] border border-border bg-card/60 p-8 text-center backdrop-blur-xl md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10">
          <HiShieldExclamation className="text-5xl text-primary" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
          404 Error
        </p>

        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-muted-foreground leading-8">
          The page you are trying to access does not exist or has been moved.
          Return to the secure homepage and continue browsing the portfolio.
        </p>

        <Button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="mt-8 rounded-full px-7"
        >
          <HiArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </div>
    </main>
  );
}