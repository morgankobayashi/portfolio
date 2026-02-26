// src/components/FilterChips.jsx
import React from "react";

export default function FilterChips({ tags = [], active = "All", onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag === active;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onChange?.(tag)}
            aria-pressed={isActive}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition-all",
              "ring-1 ring-black/10",
              "focus:outline-none focus:ring-2 focus:ring-mint-400",

              isActive
                ? "bg-mint-600 text-white shadow-soft ring-mint-600"
                : "bg-white text-black/70 hover:bg-black/5 hover:text-black/80",
            ].join(" ")}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}