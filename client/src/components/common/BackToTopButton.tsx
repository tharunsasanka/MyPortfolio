import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-primary shadow-[0_0_25px_rgba(0,229,255,0.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/50"
      aria-label="Back to top"
    >
      <HiArrowUp className="text-xl" />
    </button>
  );
}