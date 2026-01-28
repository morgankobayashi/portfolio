// src/components/Section.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * This component wraps a page section like "About" or "Projects".
 *
 * Why it's useful:
 * - Keeps consistent spacing/padding
 * - Automatically gives a scroll target using `id`
 * - Adds a gentle "fade up" animation when the section enters the viewport
 *
 * Props:
 * - id: used for nav scrolling (#about -> <section id="about">)
 * - kicker: small label above title ("About", "Projects", etc.)
 * - title: section heading
 * - children: whatever content you place inside the section
 */
export default function Section({ id, kicker, title, children }) {
  return (
    // scroll-mt-24 helps when using a sticky nav:
    // without it, the section title can hide under the sticky navbar.
    <section id={id} className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          // initial state before it’s visible
          initial={{ opacity: 0, y: 10 }}
          // animation when it becomes visible
          whileInView={{ opacity: 1, y: 0 }}
          // only animate once (not every time you scroll up/down)
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>

          {/* The children become the section body content */}
          <div className="mt-6 text-base leading-7 text-black/70">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
