import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { scrollToSection } from "@/utils/scrollToSection";

export function FloatingContactButton() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("contact")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_rgba(0,229,255,0.35)] transition hover:-translate-y-1 hover:bg-primary/90"
      aria-label="Go to contact section"
    >
      <HiChatBubbleLeftRight className="text-lg" />
      Let&apos;s Talk
    </button>
  );
}