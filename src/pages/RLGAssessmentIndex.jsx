import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import LinkedInPostMock from "../components/LinkedInPostMock.jsx";
import RLGLinkedInGraphic from "../components/RLGLinkedInGraphic.jsx";

/**
 * Hidden page (not linked in nav). Access only via direct URL.
 * Keep the language simple and human.
 */
export default function RLGAssessmentIndex() {
  const title = "Horizon Scanning mini campaign concept";
  const description =
    "Recruitment task hub: strategy notes and links to the blog, sales slide, and LinkedIn post deliverables.";

  const slidePdfPath = "/RLG-Assesment-Slide.pdf";

  // Update this to swap the image. File must live in /public.
  // Example: /RLG-LinkedIn.png -> portfolio/public/RLG-LinkedIn.png
  const linkedInGraphicSrc = "/RLG-LinkedIn.png";

  const linkedInCopy =
    "New York’s packaging EPR has moved before, then stalled short of a final Assembly vote. For producers, that uncertainty isn’t neutral: packaging redesign, supplier contracts, labeling, and reporting systems all have long lead times.\n\nHorizon Scanning helps teams track emerging EPR requirements before they become binding:\n• Structured monitoring of bills and guidance\n• Early alerts at key legislative milestones\n• Impact briefs to set internal decision triggers\n\nIf you sell packaged products into New York, now is the time to monitor and prepare, not scramble at the finish line.\n\nLearn more: https://rev-log.com/us/products/consultancy-advice/horizon-scanning/\n\n#EPR #Packaging #EnvironmentalCompliance #RegulatoryUpdates #NewYork";

  return (
    <div className="min-h-screen bg-white font-rlg text-rlg-body">
      <Seo title={title} description={description} robots="noindex,nofollow" />

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="border-b border-rlg-cloud pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-rlg-ink">
            Horizon Scanning: mini campaign concept
          </h1>
        </div>

        {/* Blog explanation */}
        <section className="mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold text-rlg-ink">Blog post</h2>
              <div className="mt-2 max-w-3xl space-y-3 text-sm leading-6 text-black/70">
                <p>
                  Because New York packaging EPR is an emerging topic with low keyword volume, the
                  post is built around search intent and what the SERP is actually showing
                  (regulatory updates + business impact), not internal shorthand. That’s why the
                  title is action-focused (“What Producers Should Do Before Legislation Passes”) and
                  the structure is straightforward: what’s being proposed, why uncertainty creates
                  risk, and what producers can do now.
                </p>
                <p>
                  The article is designed to be genuinely informative first, but it is also
                  structured to naturally lead to the Horizon Scanning product as the next step.
                  Internal linking supports that strategy (including a clear, descriptive link to
                  the Horizon Scanning page), along with a few credible external sources for trust.
                  The scannable layout (clean headings, right-side section nav, and FAQ accordions)
                  is intentional for readability and search visibility.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-w-3xl">
              <Link
                to="/rlg-assessment/extended-producer-responsibility-new-york"
                className="block mx-auto items-center justify-center rounded-full bg-rlg-leaf px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
              >
                View blog post
              </Link>
            </div>
          </div>
        </section>

        {/* Slide */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-rlg-ink">Sales slide</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">
                Kept the copy very simple, used the headline as a clear descriptor of the product. Then used additional copy to expand on the offering with a clear CTA button for conversions. </p>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">
                The design was made to respect visual hierchy and guide the eye in the proper order: Headline, then body, then CTA. Icons were used to keep the slide from becoming too visually bland. </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-rlg-cloud bg-white shadow-soft">
            <div className="h-[560px] w-full">
              <object data={slidePdfPath} type="application/pdf" className="h-full w-full">
                <div className="p-6 text-sm text-black/70">
                  Your browser can’t display the PDF here. You can still{" "}
                  <a className="underline" href={slidePdfPath} target="_blank" rel="noreferrer">
                    open the slide
                  </a>{" "}
                  in a new tab.
                </div>
              </object>
            </div>
          </div>
        </section>

        {/* LinkedIn */}
        <section id="linkedin" className="mt-14">
          <h2 className="text-xl font-semibold text-rlg-ink">LinkedIn post + graphic</h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Left: reasoning (minimal body copy, no box) */}
            <div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">
                I chose the primary visual copy to be “Did you know packaging EPR in New York could
                be changing?” because it’s a fast, low-friction hook for a scrolling audience. It
                signals that something is in motion without overstating certainty, which matches the
                reality of proposed legislation that may advance or stall. It also tees up the value
                of Horizon Scanning.
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">
                Visually I kept it simple with nice bright colours, and matched similar design
                compositions found on RLG’s other LinkedIn posts. The text is legible, and visually
                the graphic is uncluttered.
              </p>
            </div>

            {/* Right: post mock */}
            <div>
              <LinkedInPostMock
                postText={linkedInCopy}
                media={
                  <div className="overflow-hidden rounded-lg border border-black/10">
                    {/* Use the PNG from /public. If it's missing, fall back to the SVG graphic. */}
                    {linkedInGraphicSrc ? (
                      <img
                        src={linkedInGraphicSrc}
                        alt="RLG LinkedIn graphic"
                        className="h-auto w-full"
                        loading="lazy"
                        onError={(e) => {
                          // If the image path is wrong/missing, show SVG fallback
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = document.createElement("div");
                            fallback.setAttribute("data-fallback", "true");
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <RLGLinkedInGraphic showDownload={false} />
                    )}

                    {/* Fallback render target (if the img onError runs) */}
                    {!linkedInGraphicSrc && <RLGLinkedInGraphic showDownload={false} />}
                  </div>
                }
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}