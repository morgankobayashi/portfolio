import React from "react";

/**
 * BulletsBlock is great for "what I did" lists.
 */
export default function BulletsBlock({ block }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-black/70">
        {block.items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-2 h-2 w-2 rounded-full bg-mint-500" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
