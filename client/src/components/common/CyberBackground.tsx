export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-20 left-10 h-[350px] w-[350px] rounded-full bg-secondary/10 blur-[100px]" />
      <div className="absolute right-10 top-32 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.45)_55%,rgba(5,8,22,0.9)_100%)]" />
    </div>
  );
}