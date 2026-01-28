// src/components/Navbar.jsx
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const ITEMS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);

  const goTo = (id) => {
    const el = document.getElementById(id === "top" ? "top" : id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-center px-4 py-3">
        <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/70 p-2 shadow-soft">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                goTo("top");
              }
            }}
            className="group inline-flex items-center"
            aria-label="Go to home"
          >
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full overflow-hidden ring-1 ring-black/10 bg-white transition-transform group-hover:scale-[1.03]">
              <img
                src="/logo.png"
                alt="Morgan logo"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </span>
          </Link>

          {isHome ? (
            <nav className="hidden sm:flex items-center gap-1">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="rounded-full px-3 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <nav className="flex items-center">
              <Link
                to="/"
                className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5"
              >
                ← Back
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
