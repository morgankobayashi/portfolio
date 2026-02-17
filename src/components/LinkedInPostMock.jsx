import React from "react";

/**
 * Presentational LinkedIn-style post mock.
 * - No interaction, just visuals for portfolio display.
 */
export default function LinkedInPostMock({
  authorName = "Reverse Logistics Group (RLG)",
  authorSubtitle = "Environmental compliance & global recycling | RLG by Reconomy",
  timeAgo = "1d",
  visibility = "🌐",
  postText,
  media,
  reactions = "128",
  comments = "12",
  reposts = "4",
}) {
  const lines = (postText || "").split("\n");

  return (
    <div className="rounded-xl border border-black/10 bg-white shadow-soft">
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white">
  <img
    src="/RLG_Monogram_RGB.png"
    alt="RLG"
    className="h-full w-full object-cover"
    loading="lazy"
  />
</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-black">
                {authorName}
              </p>
              <p className="truncate text-xs text-black/60">{authorSubtitle}</p>
              <p className="mt-0.5 text-xs text-black/50">
                {timeAgo} • {visibility}
              </p>
            </div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-xl leading-none text-black/40"
              aria-label="More"
            >
              …
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-3 text-[15px] leading-6 text-black">
        {lines.map((l, idx) => {
          const trimmed = l.trim();
          const isBullet = trimmed.startsWith("•");
          const isEmpty = trimmed.length === 0;
          if (isEmpty) return <div key={idx} className="h-3" />;
          return (
            <p key={idx} className={isBullet ? "pl-4 -indent-4" : ""}>
              {l}
            </p>
          );
        })}
        <p className="mt-2 text-sm text-black/50">…see more</p>
      </div>

      {/* Media */}
      {media && <div className="px-4 pb-4">{media}</div>}

      {/* Engagement */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between text-xs text-black/60">
          <p>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-rlg-sky" />
              <span className="inline-block h-3 w-3 -ml-2 rounded-full bg-rlg-mint" />
              <span className="ml-1">{reactions}</span>
            </span>
          </p>
          <p>
            {comments} comments • {reposts} reposts
          </p>
        </div>

        <div className="mt-3 border-t border-black/10 pt-3">
          <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium text-black/60">
            <button type="button" className="rounded-md py-2 hover:bg-black/5">
              Like
            </button>
            <button type="button" className="rounded-md py-2 hover:bg-black/5">
              Comment
            </button>
            <button type="button" className="rounded-md py-2 hover:bg-black/5">
              Repost
            </button>
            <button type="button" className="rounded-md py-2 hover:bg-black/5">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
