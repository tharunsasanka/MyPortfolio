import { useState } from "react";
import { AIAssistant } from "@/components/common/AIAssistant";
import { BackToTopButton } from "@/components/common/BackToTopButton";
import { CommandPalette } from "@/components/common/CommandPalette";
import { CyberBackground } from "@/components/common/CyberBackground";
import { FloatingContactButton } from "@/components/common/FloatingContactButton";
import { MouseGlow } from "@/components/common/MouseGlow";
import { PageLoader } from "@/components/common/PageLoader";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {isLoading && <PageLoader onFinish={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-background text-foreground">
        <CyberBackground />
        <MouseGlow />
        <ScrollProgress />
        <Navbar />
        <AppRoutes />
        <Footer />
        <FloatingContactButton />
        <BackToTopButton />
        <CommandPalette />
        <AIAssistant />
      </div>
    </ThemeProvider>
  );
}

export default App;