import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const PAGE = {
  slug: "/rlg-assessment/extended-producer-responsibility-new-york",
  title:
    "Extended Producer Responsibility in New York: What Producers Should Do Before Legislation Passes",
  description:
    "Learn what Extended Producer Responsibility in New York could mean for producers. This guide covers pending packaging EPR proposals and how horizon scanning helps you prepare before laws pass.",
  hero: "/images/epr-ny-hero.jpg",
};

export default function RLGAssessmentBlogPost() {
  const [activeId, setActiveId] = useState("what");
  const contentRef = useRef(null);

  // Right-nav sections only (exclude FAQ; no Sources)
  const sections = useMemo(
    () => [
      { id: "what", label: "What’s being proposed" },
      { id: "risk", label: "Why uncertainty creates risk" },
      { id: "horizon", label: "How Horizon Scanning helps" },
      { id: "next", label: "Next steps" },
    ],
    []
  );

  // Deterministic scrollspy (more accurate than IntersectionObserver for long pages)
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const targets = sections
      .map((s) => root.querySelector(`#${CSS.escape(s.id)}`))
      .filter(Boolean);

    if (!targets.length) return;

    let raf = 0;

    const update = () => {
      // Offset from top of viewport where we “consider” the section active
      // tweak this if your header spacing changes
      const TOP_OFFSET = 450;

      let current = targets[0].id;

      for (const el of targets) {
        const top = el.getBoundingClientRect().top;
        if (top <= TOP_OFFSET) current = el.id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const canonical = useMemo(() => {
    const origin = window.location.origin;
    return `${origin}${PAGE.slug}`;
  }, []);

  const ogImage = useMemo(() => {
    const origin = window.location.origin;
    return `${origin}${PAGE.hero}`;
  }, []);

  const jsonLd = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: PAGE.title,
        description: PAGE.description,
        mainEntityOfPage: canonical,
        datePublished: now,
        dateModified: now,
        author: { "@type": "Person", name: "Morgan Kobayashi-LeBel" },
        publisher: { "@type": "Organization", name: "RLG (assessment)" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Has New York passed a packaging EPR law?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Not yet. New York has active proposals for packaging EPR, but comprehensive legislation has not been enacted. Bill language and timelines can change between sessions.",
            },
          },
          {
            "@type": "Question",
            name: "Who is likely to be impacted by New York packaging EPR?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Brands, manufacturers, and retailers placing packaged goods on the New York market could face reporting, fees, and performance targets through a Producer Responsibility Organization (PRO).",
            },
          },
          {
            "@type": "Question",
            name: "Why monitor EPR legislation before it passes?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Packaging, procurement, and compliance decisions have long lead times. Early visibility helps teams model cost and operational impact and avoid last-minute disruption.",
            },
          },
        ],
      },
    ];
  }, [canonical]);

  const jumpTo = (id) => {
    const el = contentRef.current?.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hardcode mint so you don’t need Tailwind theme changes
  const MINT = "#3ce664";

  const linkClass =
    "font-medium text-rlg-navy underline decoration-rlg-sky/60 underline-offset-4 hover:decoration-[#3ce664]";

  return (
    <div className="min-h-screen bg-white font-rlg text-rlg-body">
      <Seo
        title={PAGE.title}
        description={PAGE.description}
        canonical={canonical}
        ogImage={ogImage}
        robots="noindex,nofollow"
        jsonLd={jsonLd}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          {/* Content */}
          <article ref={contentRef} className="min-w-0 flex-1">
            <Link
              to="/rlg-assessment"
              className="inline-flex items-center text-sm font-medium text-black/55 hover:text-rlg-ink"
            >
              Back to overview
            </Link>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rlg-ink sm:text-4xl">
              {PAGE.title}
            </h1>

            {/* Heading → image → text */}
            <img
              src={PAGE.hero}
              alt="Abstract packaging policy illustration"
              className="mt-6 w-full rounded-xl border border-black/10"
              loading="lazy"
            />

            <p className="mt-6 max-w-3xl text-[17px] leading-8">
              New York may not have passed comprehensive packaging EPR legislation yet, but
              producers cannot afford to wait. Proposed bills have advanced in the Senate and
              stalled before a final Assembly vote, and renewed efforts are widely expected in
              upcoming sessions.
            </p>

            <p className="mt-4 max-w-3xl text-[17px] leading-8">
              This article outlines what Extended Producer Responsibility in New York could
              require, why legislative uncertainty creates business risk, and what producers can
              do now to stay prepared.
            </p>

            {/* Mobile TOC */}
            <div className="mt-8 rounded-xl border border-black/10 bg-white p-4 md:hidden">
              <div className="text-sm font-semibold text-rlg-ink">On this page</div>
              <div className="mt-3 space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpTo(s.id)}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-rlg-cloud/40"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <h2
              id="what"
              className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-rlg-ink"
            >
              What’s being proposed in New York
            </h2>

            <p className="mt-4 text-[17px] leading-8">
              New York lawmakers have introduced packaging EPR proposals that would shift funding
              and performance obligations from municipalities to producers. The best-known
              proposal is the Packaging Reduction and Recycling Infrastructure Act (PRRIA). The
              Senate has advanced versions of the bill, but it has not yet received a final
              Assembly vote. (See{" "}
              <a
                className={linkClass}
                href="https://www.nysenate.gov/legislation/bills/2025/S1464"
                target="_blank"
                rel="noopener noreferrer"
              >
                the New York State Senate bill page
              </a>
              .)
            </p>

            <p className="mt-4 text-[17px] leading-8">
              If enacted, producers would typically need to participate in a Producer
              Responsibility Organization (PRO) and support requirements such as:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-8">
              <li>Registering and reporting packaging volumes</li>
              <li>Funding recycling system upgrades</li>
              <li>Meeting reduction and recyclability targets</li>
            </ul>

            <h2
              id="risk"
              className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-rlg-ink"
            >
              Why uncertainty creates risk
            </h2>

            <p className="mt-4 text-[17px] leading-8">
              Legislative uncertainty is not neutral. Packaging redesign cycles, supplier
              agreements, labeling, and internal reporting systems can take months to change.
              Waiting for a final vote can compress timelines and force reactive decisions,
              usually at higher cost.
            </p>

            <p className="mt-4 text-[17px] leading-8">
              Policy coverage also suggests packaging regulation will remain a high-activity area
              heading into 2026. (For context, see Packaging Dive’s{" "}
              <a
                className={linkClass}
                href="https://www.packagingdive.com/news/packaging-policy-regulation-2026-extended-producer-responsibility-labeling/810561/"
                target="_blank"
                rel="noopener noreferrer"
              >
                packaging policy outlook
              </a>
              .)
            </p>

            <h2
              id="horizon"
              className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-rlg-ink"
            >
              How Horizon Scanning helps producers prepare
            </h2>

            <p className="mt-4 text-[17px] leading-8">
              Most “EPR compliance” content assumes the law already exists. RLG’s{" "}
              <a
                className={linkClass}
                href="https://rev-log.com/us/products/consultancy-advice/horizon-scanning/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Horizon Scanning
              </a>{" "}
              is built for the period before a regulation becomes binding, when there is still
              time to plan.
            </p>

            <p className="mt-4 text-[17px] leading-8">
              Through structured monitoring and early alerts, it helps teams anticipate likely
              requirements, model impact, and reduce last-minute disruption.
            </p>

            <p className="mt-4 text-[17px] leading-8">
              Three practical moves producers can take now:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-8">
              <li>Map the packaging formats you place on the New York market</li>
              <li>Compare New York proposals to existing state EPR obligations</li>
              <li>Set internal triggers for action at key legislative milestones</li>
              <li>
                Evaluate whether ongoing monitoring support (such as{" "}
                <a
                  className={linkClass}
                  href="https://rev-log.com/us/products/consultancy-advice/horizon-scanning/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Horizon Scanning
                </a>
                ) would reduce internal resource drain
              </li>
            </ul>

            

            {/* CTA ending */}
            <h2
              id="next"
              className="mt-16 scroll-mt-28 text-2xl font-semibold tracking-tight text-rlg-ink"
            >
              Next steps for producers selling products in New York
            </h2>

            <p className="mt-4 text-[17px] leading-8">
              New York has not confirmed when comprehensive packaging EPR legislation will
              advance to final passage. Producers should monitor the situation for updates, or
              work with a compliance team like the people at RLG to plan for multiple regulatory
              outcomes before timelines tighten.
            </p>

            <p className="mt-4 text-[17px] leading-8">
            We invite you to schedule a no-obligation consultation with our EPR experts; we will be glad to help you identify your potential obligations under EPR laws.
            </p>

            <a
              href="https://rev-log.com/en_ca/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-fit mx-auto rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: "#00cd50", color: "#ffffff" }}
            >
              Contact us
            </a>

            {/* FAQ (not part of the 300–400 main article word count) */}
            <h2
              id="faq"
              className="mt-14 scroll-mt-28 text-2xl font-semibold tracking-tight text-rlg-ink"
            >
              FAQs
            </h2>

            <div className="mt-5 space-y-3">
              <FaqItem
                q="Has New York passed a packaging EPR law?"
                a="Not yet. New York has active proposals for packaging EPR, but comprehensive legislation has not been enacted. Bill language and timelines can change between sessions."
              />
              <FaqItem
                q="Who is likely to be impacted by New York packaging EPR?"
                a="Brands, manufacturers, and retailers placing packaged goods on the New York market could face reporting, fees, and performance targets through a Producer Responsibility Organization (PRO)."
              />
              <FaqItem
                q="Why monitor EPR legislation before it passes?"
                a="Packaging, procurement, and compliance decisions have long lead times. Early visibility helps teams model cost and operational impact and avoid last-minute disruption."
              />
            </div>

            {/* Optional authorship (keep or delete) */}
            <p className="mt-8 text-sm leading-6 text-black/55">
              This article was written by Morgan Kobayashi-LeBel as part of a
              recruitment assessment and has not been reviewed by RLG.
            </p>

            {/* Extra whitespace at bottom */}
            <div className="h-20" />
          </article>

          {/* Right-side fixed scrollspy nav */}
          <aside className="hidden w-full md:block md:w-[340px] md:shrink-0 md:sticky md:top-10">
            <div className="rounded-xl border border-black/10 bg-white shadow-soft">
              <div className="flex items-center gap-3 border-b border-rlg-cloud px-6 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                  <img
                    src="/RLG_Monogram_RGB.png"
                    alt="RLG by Reconomy"
                    className="h-10 w-auto"
                  />
                </div>
              </div>

              <nav className="p-4">
                {sections.map((s) => {
                  const active = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => jumpTo(s.id)}
                      className={[
                        "w-full text-left rounded-lg px-4 py-3 text-[15px] transition",
                        active
                          ? "bg-rlg-cloud/60 text-rlg-ink underline underline-offset-4"
                          : "text-rlg-body hover:bg-rlg-cloud/40",
                      ].join(" ")}
                      style={active ? { textDecorationColor: MINT } : undefined}
                      aria-current={active ? "true" : "false"}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </nav>

              {/* Contact button under nav */}
              <div className="px-6 pb-6">
                <div className="border-t border-rlg-cloud pt-5">
                  <a
                    href="https://rev-log.com/en_ca/contact/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition hover:opacity-80"
                    style={{ backgroundColor: "#00cd50", color: "#ffffff" }}
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/10 bg-white">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-rlg-ink">{q}</span>
        <span className="text-sm text-black/40" aria-hidden>
          {open ? "–" : "+"}
        </span>
      </button>
      {open && <div className="px-4 pb-4 text-sm leading-6">{a}</div>}
    </div>
  );
}