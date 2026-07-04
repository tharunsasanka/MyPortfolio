import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function AdminShortcut() {
  const navigate = useNavigate();
  const location = useLocation();

  const f8PressCount = useRef(0);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    function toggleAdminAccess() {
      const isAdminArea =
        location.pathname === "/secure-admin-portal" ||
        location.pathname.startsWith("/admin");

      if (isAdminArea) {
        navigate("/");
      } else {
        navigate("/secure-admin-portal");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code !== "F8") return;

      event.preventDefault();
      event.stopPropagation();

      f8PressCount.current += 1;

      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }

      resetTimer.current = window.setTimeout(() => {
        f8PressCount.current = 0;
      }, 2000);

      if (f8PressCount.current >= 3) {
        f8PressCount.current = 0;

        if (resetTimer.current) {
          window.clearTimeout(resetTimer.current);
        }

        toggleAdminAccess();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);

      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, [location.pathname, navigate]);

  return null;
}