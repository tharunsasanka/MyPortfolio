import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

      setProgress(currentProgress);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-transparent">
      <div
        className="h-full bg-primary shadow-[0_0_20px_rgba(0,229,255,0.9)] transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}