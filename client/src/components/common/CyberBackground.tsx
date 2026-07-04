export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="cyber-orb cyber-orb-one" />
      <div className="cyber-orb cyber-orb-two" />
      <div className="cyber-orb cyber-orb-three" />

      <div className="cyber-grid" />
      <div className="cyber-scanline" />
      <div className="cyber-vignette" />
    </div>
  );
}