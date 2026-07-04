import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function AdminShortcut() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isAdminShortcut =
        event.ctrlKey && event.key.toLowerCase() === "d";

      if (!isAdminShortcut) return;

      event.preventDefault();
      event.stopPropagation();

      const isAdminArea =
        location.pathname === "/secure-admin-portal" ||
        location.pathname.startsWith("/admin");

      if (isAdminArea) {
        navigate("/");
      } else {
        navigate("/secure-admin-portal");
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [location.pathname, navigate]);

  return null;
}