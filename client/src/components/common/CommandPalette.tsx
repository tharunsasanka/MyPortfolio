import { useEffect, useMemo, useState } from "react";
import {
  HiAcademicCap,
  HiCodeBracket,
  HiCommandLine,
  HiEnvelope,
  HiHome,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi2";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { certificates } from "@/data/certificates";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { scrollToSection } from "@/utils/scrollToSection";

type CommandAction = {
  label: string;
  description: string;
  group: string;
  action: () => void;
  icon: React.ElementType;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCommandPalette =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

      if (!isCommandPalette) return;

      event.preventDefault();
      setOpen((current) => !current);
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  const actions = useMemo<CommandAction[]>(() => {
    const sectionActions = profile.navLinks.map((link) => ({
      label: link.label,
      description: `Go to ${link.label} section`,
      group: "Navigation",
      icon:
        link.href === "#home"
          ? HiHome
          : link.href === "#contact"
          ? HiEnvelope
          : HiCommandLine,
      action: () => scrollToSection(link.href.replace("#", "")),
    }));

    const projectActions = projects.map((project) => ({
      label: project.title,
      description: `View project: ${project.category}`,
      group: "Projects",
      icon: HiCodeBracket,
      action: () => scrollToSection("projects"),
    }));

    const certificateActions = certificates.map((certificate) => ({
      label: certificate.title,
      description: `Certificate by ${certificate.issuer}`,
      group: "Certificates",
      icon: HiAcademicCap,
      action: () => scrollToSection("certificates"),
    }));

    const skillActions = skills.slice(0, 10).map((skill) => ({
      label: skill.name,
      description: `${skill.category} skill`,
      group: "Skills",
      icon: HiSparkles,
      action: () => scrollToSection("skills"),
    }));

    const cyberActions = [
      {
        label: "TryHackMe Status",
        description: "View TryHackMe learning progress",
        group: "Cyber Labs",
        icon: HiShieldCheck,
        action: () => scrollToSection("cyber-labs"),
      },
      {
        label: "Hack The Box Status",
        description: "View Hack The Box learning progress",
        group: "Cyber Labs",
        icon: HiShieldCheck,
        action: () => scrollToSection("cyber-labs"),
      },
    ];

    return [
      ...sectionActions,
      ...projectActions,
      ...certificateActions,
      ...skillActions,
      ...cyberActions,
    ];
  }, []);

  const groupedActions = actions.reduce<Record<string, CommandAction[]>>(
    (groups, action) => {
      if (!groups[action.group]) {
        groups[action.group] = [];
      }

      groups[action.group].push(action);
      return groups;
    },
    {}
  );

  function runAction(action: CommandAction) {
    setOpen(false);

    setTimeout(() => {
      action.action();
    }, 100);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[70] hidden rounded-full border border-border bg-card/90 px-4 py-3 text-sm text-muted-foreground shadow-lg backdrop-blur-xl transition hover:border-primary/50 hover:text-primary lg:flex"
      >
        <span className="mr-2 text-primary">⌘</span>
        Search
        <span className="ml-2 rounded-md border border-border px-2 py-0.5 text-xs">
          Ctrl K
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search sections, projects, skills, certificates..." />

        <CommandList>
          <CommandEmpty>No result found.</CommandEmpty>

          {Object.entries(groupedActions).map(([group, items], index) => (
            <div key={group}>
              {index > 0 && <CommandSeparator />}

              <CommandGroup heading={group}>
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <CommandItem
                      key={`${item.group}-${item.label}`}
                      value={`${item.label} ${item.description}`}
                      onSelect={() => runAction(item)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <p>{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}