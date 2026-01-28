// src/components/blocks/ResultsBlock.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ResultsBlock({ block, attachedToHero = false }) {
  const { highlights = [] } = block;
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={[
        "bg-emerald-600 shadow-soft w-full box-border",
        "border border-black/10",
        attachedToHero ? "rounded-t-none border-t-0" : "rounded-t-3xl",
        "rounded-b-3xl",
        "px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10",
      ].join(" ")}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={
          reduceMotion
            ? undefined
            : {
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.12, // ✅ 1 at a time
                    delayChildren: 0.05,
                  },
                },
              }
        }
        className="flex flex-wrap gap-3 sm:gap-4 lg:flex-nowrap" // ✅ 1 row on desktop
      >
        {highlights.map((it) => (
          <motion.div
            key={it.label}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0, x: -18 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }
            }
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="
              flex-1 min-w-[140px]
              rounded-3xl bg-white/10 p-5 sm:p-6
              ring-1 ring-white/15 backdrop-blur-sm
              text-center sm:text-left
              transition-all duration-200 ease-out
              hover:bg-white/15 hover:ring-white/25 hover:shadow-lg
            "
          >
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              {it.value}
            </div>
            <div className="mt-2 text-sm font-medium text-white/80">
              {it.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
