// src/components/blocks/ImageGalleryBlock.jsx
import React, { useEffect, useState } from "react";

const INITIAL_VISIBLE_COUNT = 9;

export default function ImageGalleryBlock({ block }) {
  const images = block.images || [];
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const visibleImages = showAll
    ? images
    : images.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = images.length > INITIAL_VISIBLE_COUNT;
  const isLightboxOpen = activeIndex !== null;
  const activeImage = isLightboxOpen ? images[activeIndex] : null;

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  }

  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, images.length]);

  if (!images.length) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      {block.title && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-medium tracking-tight text-black">
            {block.title}
          </h2>

          <p className="text-sm text-black/45">
            {images.length} photos
          </p>
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        {visibleImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-xl bg-black/5 text-left focus:outline-none focus:ring-2 focus:ring-black/40 focus:ring-offset-2"
            aria-label={`Open image ${index + 1} of ${images.length}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />

            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-black/10 px-5 py-2 text-sm text-black/70 transition hover:border-black/30 hover:text-black"
          >
            {showAll ? "Show less" : "Show more photos"}
          </button>
        </div>
      )}

      {isLightboxOpen && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            Close
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white transition hover:bg-white/20 sm:block"
            aria-label="Previous image"
          >
            ←
          </button>

          <figure
            className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[84vh] max-w-full rounded-xl object-contain"
            />

            <figcaption className="mt-4 text-center text-sm text-white/60">
              {activeIndex + 1} / {images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white transition hover:bg-white/20 sm:block"
            aria-label="Next image"
          >
            →
          </button>

          <div
            className="absolute bottom-4 z-20 flex gap-3 sm:hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrevious}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={showNext}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}