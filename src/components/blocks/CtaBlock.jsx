import React from "react";
import { Link } from "react-router-dom";

/**
 * CTA block: end-of-page conversion moment.
 * For example: "Email me", "See the repo", etc.
 */
export default function CtaBlock({ block }) {
  return (
    <div className="rounded-3xl border border-mint-200 bg-mint-50 p-6">
      <h2 className="text-lg font-semibold text-mint-950">{block.title}</h2>
      <p className="mt-2 text-sm text-mint-900/80">{block.body}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={block.primaryHref}
          className="rounded-2xl bg-mint-500 px-5 py-3 text-sm font-semibold text-white hover:bg-mint-600"
        >
          {block.primaryLabel}
        </a>

        {/* If the secondary link is internal, use Link */}
        {block.secondaryHref?.startsWith("/") ? (
          <Link
            to={block.secondaryHref}
            className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
          >
            {block.secondaryLabel}
          </Link>
        ) : (
          <a
            href={block.secondaryHref}
            className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
          >
            {block.secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}
