import React, { useMemo } from "react";

function isVideoFile(url = "") {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

function toYouTubeEmbed(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube-nocookie.com/embed/${v}`;

    const parts = u.pathname.split("/").filter(Boolean);

    const shortsIdx = parts.indexOf("shorts");
    if (shortsIdx !== -1 && parts[shortsIdx + 1]) {
      return `https://www.youtube-nocookie.com/embed/${parts[shortsIdx + 1]}`;
    }

    const embedIdx = parts.indexOf("embed");
    if (embedIdx !== -1 && parts[embedIdx + 1]) {
      return `https://www.youtube-nocookie.com/embed/${parts[embedIdx + 1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

function toVimeoEmbed(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("vimeo.com")) return null;

    const match = u.pathname.match(/\/(\d+)(?:$|\/)/);
    if (!match?.[1]) return null;

    return `https://player.vimeo.com/video/${match[1]}`;
  } catch {
    return null;
  }
}

function getEmbed(src = "") {
  if (!src) return { kind: "none", embedSrc: null };
  if (isVideoFile(src)) return { kind: "file", embedSrc: src };

  const yt = toYouTubeEmbed(src);
  if (yt) return { kind: "iframe", provider: "youtube", embedSrc: yt };

  const vm = toVimeoEmbed(src);
  if (vm) return { kind: "iframe", provider: "vimeo", embedSrc: vm };

  return { kind: "iframe", provider: "generic", embedSrc: src };
}

function RichText({ content }) {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className="text-sm leading-relaxed text-black/70">{content}</p>;
  }

  if (Array.isArray(content)) {
    return (
      <div className="space-y-3">
        {content.map((node, i) => {
          if (!node) return null;

          if (node.type === "p") {
            return (
              <p key={i} className="text-sm leading-relaxed text-black/70">
                {node.text}
              </p>
            );
          }

          if (node.type === "ul") {
            return (
              <ul
                key={i}
                className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-black/70"
              >
                {(node.items || []).map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            );
          }

          if (node.type === "h3") {
            return (
              <h3 key={i} className="text-sm font-semibold text-black/80">
                {node.text}
              </h3>
            );
          }

          return null;
        })}
      </div>
    );
  }

  return null;
}

export default function VideoCaseBlock({ block }) {
  const {
    heading,
    subheading,
    src,
    poster,
    aspectClass = "aspect-video",
    description,
    cardClassName = "",
  } = block;

  const embed = useMemo(() => getEmbed(src), [src]);

  return (
    <section className={cardClassName}>
      {/* Marker heading OUTSIDE the card */}
      {(heading || subheading) && (
        <header className="mb-4 px-1">
          {heading && (
            <p className="font-hand text-3xl sm:text-4xl text-mint-600  tracking-wide">
              {heading}
            </p>
          )}
          {subheading && (
            <p className="mt-2 text-sm text-black/60">{subheading}</p>
          )}
        </header>
      )}

      {/* Single clean card */}
      <div className="rounded-3xl border border-black/10 bg-white shadow-soft overflow-hidden">
        {/* Video */}
        <div className="bg-black">
          <div className={`${aspectClass} w-full`}>
            {embed.kind === "file" ? (
              <video
                className="h-full w-full"
                src={embed.embedSrc}
                poster={poster}
                controls
                playsInline
                preload="metadata"
              />
            ) : embed.kind === "iframe" ? (
              <iframe
                className="h-full w-full"
                src={
                  embed.provider === "youtube"
                    ? `${embed.embedSrc}?rel=0&modestbranding=1&playsinline=1`
                    : embed.embedSrc
                }
                title={heading || "Video"}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ border: 0 }}
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-white/70 text-sm">
                Missing video src
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="p-6">
            <RichText content={description} />
          </div>
        )}
      </div>
    </section>
  );
}