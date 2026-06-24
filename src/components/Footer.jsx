// src/components/Footer.jsx
import React from "react";

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/morgan-k-483b7113b/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@kobayashiarchives6085",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/morgankobayashi",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.25.8-.57v-2.1c-3.3.72-4-1.42-4-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1 .11-.78.42-1.32.76-1.62-2.64-.3-5.42-1.32-5.42-5.87 0-1.3.47-2.36 1.24-3.19-.12-.3-.54-1.52.12-3.15 0 0 1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0C17.68 4.95 18.68 6 18.68 6c.66 1.63.24 2.85.12 3.15.77.83 1.24 1.9 1.24 3.19 0 4.56-2.78 5.57-5.43 5.86.43.37.82 1.1.82 2.22v3.3c0 .32.22.69.82.57A12 12 0 0 0 12 0Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-black/60">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:morgankobayashi@gmail.com"
            className="w-fit transition hover:text-black"
          >
            morgankobayashi@gmail.com
          </a>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-black/45 transition hover:-translate-y-0.5 hover:text-black"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}