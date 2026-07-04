import { HiBars3, HiMoon, HiSun } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="group flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(0,229,255,0.9)]" />
          <span className="font-bold tracking-wide">
            THARUN<span className="text-primary">.DEV</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {profile.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full bg-transparent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <HiSun /> : <HiMoon />}
            <span className="transition-transform duration-300 hover:rotate-180">
  {theme === "dark" ? <HiSun /> : <HiMoon />}
</span>
          </Button>

          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Let&apos;s Talk
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full bg-transparent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </Button>

          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="bg-transparent">
                <HiBars3 />
              </Button>
            </SheetTrigger>

            <SheetContent className="border-border bg-background">
              <div className="mt-10 flex flex-col gap-5">
                {profile.navLinks.map((link) => (
                  <SheetClose key={link.href}>
                    <a
                      href={link.href}
                      className="text-lg text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                <SheetClose>
                  <Button className="mt-4 rounded-full bg-primary text-primary-foreground">
                    Let&apos;s Talk
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}