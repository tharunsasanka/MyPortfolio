import type { CSSProperties } from "react";
import { HiShieldCheck } from "react-icons/hi2";

export function AnimatedTerminalCard() {
  return (
    <div className="terminal-stage">
      <div className="terminal-orbit terminal-orbit-one" />
      <div className="terminal-orbit terminal-orbit-two" />
      <div className="terminal-orbit terminal-orbit-three" />

      <div className="terminal-floating-points">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            style={
              {
                "--x": `${(index * 37) % 100}%`,
                "--y": `${(index * 61) % 100}%`,
                "--delay": `${index * 0.25}s`,
                "--duration": `${5 + (index % 5)}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="terminal-card-3d">
        <div className="terminal-card-glow" />

        <div className="terminal-card-header">
          <span className="terminal-dot green" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot red" />

          <span className="ml-auto text-xs text-primary">secure-terminal</span>
        </div>

        <div className="terminal-card-body">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Portfolio Status
            </p>

            <h3 className="mt-4 text-3xl font-black leading-tight text-foreground">
              Tharun Sasanka
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Cybersecurity student, ethical hacking learner, and full-stack
              developer building secure digital systems.
            </p>
          </div>

          <div className="terminal-security-box">
            <HiShieldCheck className="text-4xl text-primary" />
          </div>
        </div>

        <div className="terminal-code-lines">
          <p>
            <span className="text-primary">$</span> initializing portfolio...
          </p>
          <p>
            <span className="text-primary">$</span> loading cybersecurity labs...
          </p>
          <p>
            <span className="text-primary">$</span> status: online
          </p>
        </div>

        <div className="terminal-card-footer">
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>Cybersecurity</span>
        </div>
      </div>
    </div>
  );
}