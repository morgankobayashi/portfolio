// src/components/blocks/MetricsBlock.jsx
import React from "react";

export default function MetricsBlock({ block }) {
  const {
    title,
    note,
    // old format
    items = [],
    // new format
    sections = [],
  } = block;

  const hasSections = Array.isArray(sections) && sections.length > 0;
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-soft">
      {title ? (
        <h2 className="font-hand text-2xl sm:text-5xl tracking-wide text-emerald-600 -rotate-[0.3deg]">
          {title}
        </h2>
      ) : null}

      {/* NEW: grouped metrics */}
      {hasSections ? (
        <div className="mt-5 sm:mt-6 space-y-6">
          {sections.map((sec, idx) => (
            <div key={`${sec.title}-${idx}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-black/80">
                  {sec.title}
                </h3>
                {sec.source ? (
                  <span className="text-xs font-medium text-black/40">
                    {sec.source}
                  </span>
                ) : null}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(sec.items || []).map((it, i) => (
                  <div
                    key={`${it.label}-${i}`}
                    className="rounded-2xl bg-black/5 p-4"
                  >
                    <div className="text-lg font-semibold text-black/85">
                      {it.value}
                    </div>

                    <div className="mt-1 text-sm font-medium text-black/60">
                      {it.label}
                    </div>

                    {it.note ? (
                      <div className="mt-2 text-xs text-black/45">
                        {it.note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* OLD: simple snapshot (backwards compatible) */}
      {!hasSections && hasItems ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.label} className="rounded-2xl bg-black/5 p-4">
              {/* value first (like you said) */}
              <div className="text-lg font-semibold text-black/85">{it.value}</div>
              <div className="mt-1 text-sm font-medium text-black/60">{it.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {note ? <p className="mt-5 text-sm text-black/60">{note}</p> : null}
    </section>
  );
}
