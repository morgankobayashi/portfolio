import React from "react";

/**
 * TwoColBlock makes a project feel unique by using a split layout.
 * Great for "Problem/Solution" or "Before/After".
 */
export default function TwoColBlock({ block }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{block.title}</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-black/5 p-4">
          <div className="text-xs font-medium text-black/50">{block.leftTitle}</div>
          <div className="mt-2 text-sm leading-6 text-black/70">{block.leftBody}</div>
        </div>
        <div className="rounded-2xl bg-black/5 p-4">
          <div className="text-xs font-medium text-black/50">{block.rightTitle}</div>
          <div className="mt-2 text-sm leading-6 text-black/70">{block.rightBody}</div>
        </div>
      </div>
    </div>
  );
}
