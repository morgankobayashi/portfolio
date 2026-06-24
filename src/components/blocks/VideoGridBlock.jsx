import React from "react";

function getYouTubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    }

    if (parsedUrl.pathname.includes("/shorts/")) {
      const id = parsedUrl.pathname.split("/shorts/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    const id = parsedUrl.searchParams.get("v");

    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

export default function VideoGridBlock({ block }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14">
      {block.title && (
        <div className="mb-6">
          <h2 className="text-2xl font-medium tracking-tight text-black">
            {block.title}
          </h2>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {block.videos.map((video) => (
          <article key={video.src}>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={getYouTubeEmbedUrl(video.src)}
                title={video.title}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {video.title && (
              <p className="mt-3 text-sm text-black/60">{video.title}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}