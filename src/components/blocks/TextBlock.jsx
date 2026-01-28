// src/components/blocks/TextBlock.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function renderBold(text) {
  if (typeof text !== "string") return text;
  const parts = text.split("**");
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <strong key={idx} className="font-semibold text-black/90">
        {part}
      </strong>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

export default function TextBlock({ block }) {
  const { title, body } = block;
  const reduceMotion = useReducedMotion();

  // Support:
  // - old style: string or [string]
  // - new style: [{type:"p"...}, {type:"ul"...}]
  const items = Array.isArray(body)
    ? body
    : body
    ? [{ type: "p", text: body }]
    : [];

  const titleVariants = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, x: -28 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
        },
      };

  const bodyVariants = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, x: 28 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.22 },
        },
      };

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-soft">
      {title ? (
        <motion.h2
          variants={titleVariants}
		className="font-hand text-3xl sm:text-4xl lg:text-5xl tracking-tight text-emerald-600"
        >
          {title}
        </motion.h2>
      ) : null}

      <motion.div variants={bodyVariants} className="mt-6 lg:mt-10 lg:ml-[10%]">
        <div className="relative pl-6">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-black/15" />

          <div className="max-w-3xl text-base sm:text-[17px] leading-relaxed text-black/75">
            {items.map((it, idx) => {
              // Back-compat: if someone still passes strings inside the array
              if (typeof it === "string") {
                return (
                  <p key={idx} className={idx ? "mt-5" : ""}>
                    {renderBold(it)}
                  </p>
                );
              }

              if (it.type === "ul") {
                return (
                  <ul
                    key={idx}
                    className="mt-3 list-disc space-y-2 pl-5 text-black/75"
                  >
                    {it.items?.map((li, i) => (
                      <li key={i}>{renderBold(li)}</li>
                    ))}
                  </ul>
                );
              }

              // default paragraph
              return (
                <div key={idx} className={idx ? "mt-6" : ""}>
                  {it.text ? <p>{renderBold(it.text)}</p> : null}
                  {it.source ? (
                    <p className="mt-2 text-xs text-black/45">{it.source}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
