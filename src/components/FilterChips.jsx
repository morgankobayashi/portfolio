// src/components/FilterChips.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * FilterChips is a “controlled component”.
 *
 * That means:
 * - The parent component (HomePage) owns the state: `active`
 * - FilterChips just renders the UI and calls `onChange(tag)` when clicked
 *
 * Props:
 * - tags: array of strings (All, Marketing, Video...)
 * - active: currently selected tag
 * - onChange: function to update the parent state
 */
export default function FilterChips({ tags, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const isActive = t === active;

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={[
              "relative rounded-full px-3 py-1.5 text-sm font-medium transition",
              isActive ? "text-mint-950" : "text-black/70 hover:text-black",
            ].join(" ")}
          >
            {/* This animated span “moves” between chips because layoutId stays the same */}
            {isActive && (
              <motion.span
                layoutId="chip"
                className="absolute inset-0 -z-10 rounded-full bg-mint-100"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            )}
            {t}
          </button>
        );
      })}
    </div>
  );
}
