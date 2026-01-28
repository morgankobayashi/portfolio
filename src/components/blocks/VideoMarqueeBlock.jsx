// src/components/blocks/VideoMarqueeBlock.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export default function VideoMarqueeBlock({ block }) {
  const {
    items = [],
    height = 280, // bigger default
    libraryId: defaultLibraryId,
    heading = "check out the creative I made",
  } = block;

  // Duplicate items for seamless looping
  const loop = useMemo(() => [...items, ...items], [items]);

  // Aspect control (default square)
  const aspect = block.aspect ?? 1;
  const tileW = Math.round(height * aspect);

  // Gap between tiles (gap-4 = 16px)
  const GAP = 16;

  // Which tile is "active" (sound-on)
  const [activeKey, setActiveKey] = useState(null);

  // Manual scroll control
  const speedRef = useRef(0); // px/sec
  const trackRef = useRef(null);
  const halfWidthRef = useRef(0);
  const xRef = useRef(0);
  const rafRef = useRef(null);
  const lastTRef = useRef(null);

  // Button press animation state
  const [tapDir, setTapDir] = useState(null); // "left" | "right" | null
  const tapTimerRef = useRef(null);
  const normalizeTimerRef = useRef(null);

  // Disable hover-scroll on mobile/tablet (coarse pointer)
  const isCoarseRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    isCoarseRef.current =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const normalizeX = (x, half) => {
    // Keep x in [-half, 0)
    if (!half) return x;
    let v = x;
    while (v <= -half) v += half;
    while (v > 0) v -= half;
    return v;
  };

  // Measure half-width (since we duplicated the list)
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.scrollWidth;
      halfWidthRef.current = w / 2;

      const half = halfWidthRef.current || 1;
      xRef.current = normalizeX(xRef.current, half);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop.length]);

  // RAF loop (moves only when speedRef != 0)
  useEffect(() => {
    const tick = (t) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      const v = speedRef.current;
      const half = halfWidthRef.current || 1;

      if (v !== 0 && trackRef.current) {
        trackRef.current.style.transition = "none";

        xRef.current += v * dt;
        xRef.current = normalizeX(xRef.current, half);

        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stopScroll = () => {
    speedRef.current = 0;
  };

  // Hover-to-scroll zones (desktop only)
  const leftZone = 0.12;
  const rightZone = 0.12;
  const hoverSpeed = 180;

  const onMouseMove = (e) => {
    if (isCoarseRef.current) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;

    if (pct < leftZone) speedRef.current = +hoverSpeed;
    else if (pct > 1 - rightZone) speedRef.current = -hoverSpeed;
    else speedRef.current = 0;
  };

  // Buttons: slide animation + snap-normalize after
  const nudge = (dir, which) => {
    const step = tileW + GAP;
    const half = halfWidthRef.current || 1;

    speedRef.current = 0;

    if (trackRef.current) {
      trackRef.current.style.transition =
        "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
    }

    xRef.current += dir * step;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
    }

    window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(() => {
      xRef.current = normalizeX(xRef.current, half);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }
    }, 440);

    setTapDir(which);
    window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = window.setTimeout(() => setTapDir(null), 180);
  };

  // Feather edges
  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  };

  // Bunny embed URLs
  const getLib = (it) => it.libraryId || defaultLibraryId;

  const previewSrc = (it) =>
    `https://iframe.mediadelivery.net/embed/${getLib(it)}/${it.videoId}?autoplay=true&muted=true&loop=true&preload=false&playsinline=true`;

  const activeSrc = (it) =>
    `https://iframe.mediadelivery.net/embed/${getLib(it)}/${it.videoId}?autoplay=true&muted=false&loop=false&preload=true&playsinline=true`;

  return (
    <section className="w-full">
      {/* Handwriting heading, slightly indented */}
      <div className="mb-6 pl-6 sm:pl-14">
		<p className="font-hand text-3xl sm:text-4xl text-mint-600 -rotate-[1deg] tracking-wide">
          {heading}
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={maskStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={stopScroll}
      >
        {/* Slider buttons */}
        <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-3 pointer-events-none">
          <button
            type="button"
            onClick={() => nudge(+1, "left")}
            className={[
              "pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white/70 backdrop-blur ring-1 ring-black/10 shadow-soft",
              "transition-all duration-200 ease-out hover:bg-white hover:scale-[1.06] active:scale-[0.97]",
              tapDir === "left" ? "scale-[1.1]" : "",
            ].join(" ")}
            aria-label="Scroll left"
            title="Scroll left"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => nudge(-1, "right")}
            className={[
              "pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white/70 backdrop-blur ring-1 ring-black/10 shadow-soft",
              "transition-all duration-200 ease-out hover:bg-white hover:scale-[1.06] active:scale-[0.97]",
              tapDir === "right" ? "scale-[1.1]" : "",
            ].join(" ")}
            aria-label="Scroll right"
            title="Scroll right"
          >
            →
          </button>
        </div>

        {/* Track */}
        <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
          {loop.map((it, i) => {
            const key = `${it.id || it.videoId}-${i}`;
            const isActive = activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveKey((prev) => (prev === key ? null : key))}
                className="shrink-0 overflow-hidden rounded-2xl bg-black/5 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ width: tileW, height }}
                aria-label={isActive ? "Mute video" : "Play video with sound"}
              >
                <iframe
                  className={`h-full w-full ${isActive ? "" : "pointer-events-none"}`}
                  src={isActive ? activeSrc(it) : previewSrc(it)}
                  title={it.title || "Creative"}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
