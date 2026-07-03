import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex justify-center gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}