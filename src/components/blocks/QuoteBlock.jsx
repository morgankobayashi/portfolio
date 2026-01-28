import React from "react";

/**
 * QuoteBlock adds personality + rhythm to a page.
 * Helps break up long text sections (very Apple-esque).
 */
export default function QuoteBlock({ block }) {
  return (
    <div className="rounded-3xl border border-mint-200 bg-mint-50 p-6">
      <p className="text-lg font-semibold text-mint-950">“{block.quote}”</p>
      {block.attribution ? <p className="mt-2 text-sm text-mint-900/70">— {block.attribution}</p> : null}
    </div>
  );
}
