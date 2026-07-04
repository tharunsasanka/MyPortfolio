import { CyberBackground } from "@/components/common/CyberBackground";
import { FloatingContactButton } from "@/components/common/FloatingContactButton";
import { MouseGlow } from "@/components/common/MouseGlow";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <CyberBackground />
        <MouseGlow />
        <ScrollProgress />
        <Navbar />
        <AppRoutes />
        <Footer />
        <FloatingContactButton />
      </div>
    </ThemeProvider>
  );
}

export default App;