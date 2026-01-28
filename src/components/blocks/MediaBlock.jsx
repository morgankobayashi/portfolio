import React from "react";

/**
 * MediaBlock is a placeholder for images/video/galleries.
 * Right now it's just a clean box so the layout feels real.
 * Later we can support:
 * - image arrays
 * - embedded video
 * - before/after sliders
 */
export default function MediaBlock({ block }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      {block.description ? <p className="mt-2 text-sm text-black/70">{block.description}</p> : null}

      <div className="mt-4 grid place-items-center rounded-2xl border border-dashed border-black/15 bg-black/3 p-10 text-sm text-black/50">
        Media placeholder (add images/video later)
      </div>
    </div>
  );
}
