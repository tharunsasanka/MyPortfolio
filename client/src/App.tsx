import { CyberBackground } from "@/components/common/CyberBackground";
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
        <ScrollProgress />
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;