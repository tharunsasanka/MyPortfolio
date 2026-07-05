import { useEffect, useMemo, useState } from "react";
import { HiShieldCheck } from "react-icons/hi2";

type PageLoaderProps = {
  onFinish: () => void;
};

export function PageLoader({ onFinish }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [bootTextIndex, setBootTextIndex] = useState(0);

  const bootLines = useMemo(
    () => [
      "Scanning secure modules...",
      "Loading cyber interface...",
      "Verifying portfolio data...",
      "Initializing Tharun.DEV...",
    ],
    []
  );

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(progressInterval);
          return 100;
        }

        return current + 2;
      });
    }, 35);

    const textInterval = window.setInterval(() => {
      setBootTextIndex((current) =>
        current >= bootLines.length - 1 ? current : current + 1
      );
    }, 420);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, 2300);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(textInterval);
      window.clearTimeout(finishTimer);
    };
  }, [bootLines.length, onFinish]);

  return (
    <div className="page-loader">
      <div className="page-loader__grid" />
      <div className="page-loader__glow page-loader__glow--one" />
      <div className="page-loader__glow page-loader__glow--two" />

      <div className="page-loader__content">
        <div className="page-loader__brand">
          <span className="page-loader__brand-dot" />
          <span>THARUN</span>
          <strong>.DEV</strong>
        </div>

        <div className="page-loader__mark">
          <div className="page-loader__mark-ring" />
          <HiShieldCheck />
        </div>

        <h1 className="page-loader__title">
          INITIALIZING<span>...</span>
        </h1>

        <p className="page-loader__boot-text">{bootLines[bootTextIndex]}</p>

        <div className="page-loader__bar">
          <div
            className="page-loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="page-loader__meta">
          <span>SECURE BOOT</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}