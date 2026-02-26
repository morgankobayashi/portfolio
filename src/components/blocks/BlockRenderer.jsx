// src/components/blocks/BlockRenderer.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

import HeroBlock from "./HeroBlock.jsx";
import TextBlock from "./TextBlock.jsx";
import MetricsBlock from "./MetricsBlock.jsx";
import ResultsBlock from "./ResultsBlock.jsx";
import QuoteBlock from "./QuoteBlock.jsx";
import MediaBlock from "./MediaBlock.jsx";
import BulletsBlock from "./BulletsBlock.jsx";
import TwoColBlock from "./TwoColBlock.jsx";
import FeatureGridBlock from "./FeatureGridBlock.jsx";
import CtaBlock from "./CtaBlock.jsx";
import VideoMarqueeBlock from "./VideoMarqueeBlock.jsx";
import VideoCaseBlock from "./VideoCaseBlock";


const BLOCKS = {
  hero: HeroBlock,
  results: ResultsBlock,
  text: TextBlock,
  metrics: MetricsBlock,
  quote: QuoteBlock,
  media: MediaBlock,
  bullets: BulletsBlock,
  twoCol: TwoColBlock,
  featureGrid: FeatureGridBlock,
  cta: CtaBlock,
  videoMarquee: VideoMarqueeBlock,
  videoCase: VideoCaseBlock,
};

function AnimatedBlock({ children, index }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div>{children}</div>;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "0px 0px 10% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
        show: (i) => ({
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: Math.min(i * 0.04, 0.12),
          },
        }),
      }}
    >
      {children}
    </motion.div>
  );
}

export default function BlockRenderer({ blocks }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const Component = BLOCKS[block.type];
        const prevType = blocks[index - 1]?.type;
        const nextType = blocks[index + 1]?.type;

        // No spacing between hero -> results so they attach
        const needsGap =
          index > 0 && !(prevType === "hero" && block.type === "results");

        if (!Component) {
          return (
            <div key={index} className={needsGap ? "mt-8" : ""}>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                Unknown block type: <b>{block.type}</b>
              </div>
            </div>
          );
        }

        // ✅ Hero never animates; also gets told if results comes next
        if (block.type === "hero") {
          return (
            <div key={index} className={needsGap ? "mt-8" : ""}>
              <Component block={block} attachToResults={nextType === "results"} />
            </div>
          );
        }

        // ✅ Results never animates as a whole; only its metrics animate internally
        if (block.type === "results") {
          return (
            <div key={index} className={needsGap ? "mt-8" : ""}>
              <Component block={block} attachedToHero={prevType === "hero"} />
            </div>
          );
        }

        // All other blocks animate in
        return (
          <div key={index} className={needsGap ? "mt-8" : ""}>
            <AnimatedBlock index={index}>
              <Component block={block} />
            </AnimatedBlock>
          </div>
        );
      })}
    </div>
  );
}
