export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background">
      <div className="cyber-ambient-base" />

      <div className="cyber-orbit cyber-orbit-one" />
      <div className="cyber-orbit cyber-orbit-two" />
      <div className="cyber-orbit cyber-orbit-three" />

      <div className="cyber-glow-blob cyber-glow-blob-one" />
      <div className="cyber-glow-blob cyber-glow-blob-two" />
      <div className="cyber-glow-blob cyber-glow-blob-three" />

      <div className="cyber-3d-grid" />
      <div className="cyber-stars" />
      <div className="cyber-particles">
        {Array.from({ length: 34 }).map((_, index) => (
          <span
            key={index}
            style={
              {
                "--particle-left": `${(index * 29) % 100}%`,
                "--particle-top": `${(index * 47) % 100}%`,
                "--particle-delay": `${(index % 12) * 0.45}s`,
                "--particle-duration": `${7 + (index % 8)}s`,
                "--particle-size": `${2 + (index % 4)}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="cyber-scanline" />
      <div className="cyber-vignette" />
    </div>
  );
}