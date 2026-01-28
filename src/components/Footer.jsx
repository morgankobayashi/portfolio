// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-black/60">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Morgan — Marketing + Creative + Tech</p>
          <p className="text-black/50">Built with React • Tailwind • Motion</p>
        </div>
      </div>
    </footer>
  );
}
