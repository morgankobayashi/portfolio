import React, { useRef } from "react";

/**
 * Lightweight LinkedIn-sized graphic rendered as SVG (1200x627).
 * - Uses RLG/Reconomy brand colours + Montserrat.
 * - Includes a one-click SVG download for quick reuse.
 */
export default function RLGLinkedInGraphic({
  headline = "NY packaging EPR: uncertainty isn’t neutral.",
  subhead = "Long lead times make late compliance expensive.",
  bullets = [
    "Packaging redesign",
    "Supplier contracts",
    "Labeling + reporting systems",
  ],
  footer = "Horizon Scanning: structured monitoring • early alerts • impact briefs",
  url = "rev-log.com/us/products/consultancy-advice/horizon-scanning/",
  showDownload = true,
  fileName = "RLG-LinkedIn.png",
}) {
  const svgRef = useRef(null);

  const downloadSvg = () => {
    try {
      const svgEl = svgRef.current;
      if (!svgEl) return;

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgEl);
      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const urlObj = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = urlObj;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlObj);
    } catch {
      // If download fails (rare), user can still screenshot.
    }
  };

  return (
    <div className="w-full">
      <div
        className="overflow-hidden rounded-xl border border-rlg-cloud bg-white shadow-soft"
        style={{ aspectRatio: "1200 / 627" }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1200 627"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="LinkedIn graphic for RLG Horizon Scanning"
        >
          {/* Background */}
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d5dfe3" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3ce664" />
              <stop offset="1" stopColor="#4bc3e1" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1200" height="627" fill="url(#bg)" />

          {/* Brand accents (abstract shapes) */}
          <path
            d="M1080 40c-90 24-180 96-210 165-26 62-15 120 34 171 42 45 105 73 176 77V627H1200V0h-120v40z"
            fill="#005596"
            opacity="0.10"
          />
          <path
            d="M0 470c120-70 230-90 330-70 78 16 128 62 158 130 24 56 23 110 17 97H0V470z"
            fill="#4bc3e1"
            opacity="0.15"
          />
          <rect x="80" y="92" width="6" height="96" fill="url(#accent)" />
          <rect x="80" y="92" width="1040" height="4" fill="url(#accent)" />

          {/* Header */}
          <text
            x="96"
            y="72"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="22"
            fontWeight="600"
            fill="#004664"
            letterSpacing="-0.4"
          >
            RLG
          </text>
          <text
            x="148"
            y="72"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="18"
            fontWeight="500"
            fill="#004664"
            opacity="0.85"
          >
            by Reconomy
          </text>

          {/* Main content */}
          <text
            x="96"
            y="180"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="54"
            fontWeight="700"
            fill="#004664"
            letterSpacing="-1.2"
          >
            {headline}
          </text>

          <text
            x="96"
            y="230"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="24"
            fontWeight="500"
            fill="#3c3c3c"
          >
            {subhead}
          </text>

          {/* Bullets */}
          {bullets.slice(0, 3).map((b, i) => (
            <g key={b}>
              <circle
                cx="102"
                cy={290 + i * 44}
                r="6"
                fill="#3ce664"
              />
              <text
                x="120"
                y={298 + i * 44}
                fontFamily="Montserrat, Arial, sans-serif"
                fontSize="26"
                fontWeight="600"
                fill="#004664"
              >
                {b}
              </text>
            </g>
          ))}

          {/* Footer panel */}
          <rect
            x="96"
            y="480"
            width="1008"
            height="110"
            rx="18"
            fill="#004664"
          />
          <text
            x="124"
            y="525"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="22"
            fontWeight="600"
            fill="#ffffff"
            opacity="0.98"
          >
            {footer}
          </text>
          <text
            x="124"
            y="560"
            fontFamily="Montserrat, Arial, sans-serif"
            fontSize="18"
            fontWeight="500"
            fill="#3ce664"
          >
            {url}
          </text>
        </svg>
      </div>

      {showDownload && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={downloadSvg}
            className="inline-flex items-center justify-center rounded-md bg-rlg-ink px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Download SVG
          </button>

        </div>
      )}
    </div>
  );
}
