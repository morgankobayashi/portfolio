// src/components/blocks/HeroBlock.jsx
import React from "react";

/**
 * HeroBlock
 * - Supports optional background images (block.bgImage)
 * - Puts a readability overlay on top
 * - Renders kicker/title/subtitle/badges as text overlay
 *
 * In your project data, add:
 * {
 *   type: "hero",
 *   kicker: "Marketing Campaign",
 *   title: "Highlands Music Festival",
 *   subtitle: "...",
 *   badges: ["Meta Ads", "Creative Testing"],
 *   bgImage: "/case-hero/highlands-hero.webp",
 *   bgPosition: "center" // optional, e.g. "50% 30%" or "top"
 * }
 */
export default function HeroBlock({ block, attachToResults = false }) {
  const hasBg = Boolean(block.bgImage);

  return (
<section
		className={[
			"relative isolate overflow-hidden shadow-soft w-full ", // ✅ important
			"ring-1 ring-black/10 shadow-soft overflow-hidden",
			"rounded-t-3xl",
			attachToResults ? "rounded-b-none border-b-0" : "rounded-b-3xl",
		].join(" ")}
		>      
	{/* BACKGROUND LAYER */}
      {hasBg ? (
        <img
          src={block.bgImage}
          alt="" // decorative background
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: block.bgPosition || "center" }}
          loading="lazy"
        />
      ) : (
        // Fallback background: your mint→lime theme
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #ECFDF3 0%, #D1FAE5 35%, #A7F3D0 65%, #34D399 100%)",
          }}
        />
      )}

      {/* READABILITY OVERLAY */}
      {/* Dark overlay so white text reads over any photo */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Optional mint tint to keep it on-brand */}
      <div className="absolute inset-0 bg-mint-700/15 mix-blend-multiply" />

      {/* CONTENT */}
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        {block.kicker ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            {block.kicker}
          </p>
        ) : null}

        {block.title ? (
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {block.title}
          </h1>
        ) : null}

        {block.subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
            {block.subtitle}
          </p>
        ) : null}

        
      </div>
    </section>
  );
}
