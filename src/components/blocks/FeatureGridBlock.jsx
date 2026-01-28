import React from "react";

/**
 * FeatureGridBlock is very Apple-like: tidy, simple, scannable.
 */
export default function FeatureGridBlock({ block }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{block.title}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.features.map((f) => (
          <div key={f.title} className="rounded-2xl bg-black/5 p-4">
            <div className="font-semibold text-black/80">{f.title}</div>
            <div className="mt-2 text-sm text-black/70">{f.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
