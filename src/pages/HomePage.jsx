// src/pages/HomePage.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar.jsx";
import Section from "../components/Section.jsx";
import FilterChips from "../components/FilterChips.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Footer from "../components/Footer.jsx";
import LetterboxdCard from "../components/LetterboxdCard.jsx";

import { PROJECT_TAGS, projects } from "../data/projects.js";

export default function HomePage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter]);

  return (
    <>
      <div id="top" />
      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-mint-200/60 blur-3xl" />
          <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-mint-300/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:pb-20 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10"
          >
            {/* MOBILE ONLY: centered label, no arrow */}
            <div className="lg:hidden">
              <motion.p
                className="text-center font-hand text-4xl text-mint-700 rotate-[-4deg] drop-shadow-sm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.45 }}
              >
                That&apos;s me (morgan)
              </motion.p>
            </div>

            {/* LEFT COLUMN: Text */}
            <div className="order-2 lg:order-none">
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                I make the <span className="text-mint-700">creative</span>
                <br className="hidden sm:block" />
                and the <span className="text-mint-700">system</span> behind it.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-black/70 font-semibold">
                Creative thinker. Technical doer. Relentless figure-outer.
              </p>
              <p className="max-w-2xl text-base leading-7 text-black/70">
                I blend strategy, modern tools, and hands-on making to ship campaigns, content, and digital experiences.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-2xl bg-mint-500 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-mint-600"
                >
                  Explore projects
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
                >
                  Contact
                </a>
                <a
                  href="/resume.pdf"
                  className="rounded-2xl border border-mint-200 bg-mint-50 px-5 py-3 text-sm font-semibold text-mint-900 hover:bg-mint-100"
                >
                  Download resume
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Photo */}
			<div className="order-1 lg:order-none">
			{/* cap width when stacked (mobile/tablet), unlimited on lg+ */}
			<div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">

				{/* DESKTOP ONLY: delayed label (keeps your rotation) */}
				<motion.p
					className="pointer-events-none hidden lg:block font-hand text-4xl text-mint-700 drop-shadow-sm z-20 absolute"
					style={{ left: -108, top: -50 }}
					initial={{ opacity: 0, y: 6, rotate: -8 }}
					animate={{ opacity: 1, y: 0, rotate: -8 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
					>
					That&apos;s me (morgan)
				</motion.p>

				{/* DESKTOP ONLY: arrow (keeps your mint-200 color + shadow) */}
				<CurvedArrow
				className="hidden lg:block text-mint-200"
				style={{
					left: -40,
					top: -35,
					width: 360,
					height: 360,
					filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.18))",
				}}
				start={{ x: 30, y: 40 }}
				c1={{ x: 60, y: 140 }}
				c2={{ x: 260, y: 10 }}
				end={{ x: 280, y: 160 }}
				headSize={18}
				strokeWidth={5}
				delay={1.15}
				/>

				{/* Image only (no border), with drop shadow */}
				<img
				src="/me.webp"
				alt="Portrait of Morgan"
				className="w-full h-[380px] sm:h-[420px] object-cover rounded-3xl shadow-xl"
				loading="lazy"
				/>
			</div>
			</div>
          </motion.div>
        </div>
      </div>


	<Section id="about" title="A little bit about me :D">
		<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
			{/* LEFT: about copy */}
			<div className="space-y-4 relative">
			<p className="text-base leading-7 text-black/70">
				Hi my name is Morgan, I’m a marketing person who can’t stop building. I like the idea part, but I love the making part.
			</p>

			<p className="text-base leading-7 text-black/70">
				 Throughout the past five years of my marketing journey, I’ve had the chance to run campaigns end-to-end. I’m usually the person doing the planning, building the creative, setting up the measurement, communicating the updates, and then reporting back with what we learned and what we’re changing next. I love the “figure-it-out” moments: tightening a hook, smoothing a flow, fixing what’s broken, and making the whole experience feel premium without feeling stiff.
			</p>

			<p className="text-base leading-7 text-black/70">
				Outside of work, I’m an absolute movie lover, and it’s what got me into marketing. As a kid I spent most of my free time filming movies with my friends, and through that I discovered video editing. Behind a computer is where I’ve always felt most comfortable, and those creative skills are what helped me break into the marketing world, starting as a video editor for paid social campaigns and growing into a more well-rounded marketer who can handle the strategy, testing, tools, and reporting.
			</p>

			{/* Handwritten CTA + arrow (desktop only for arrow) */}
			<div className="pt-2 lg:pt-4">
				<p className="font-hand text-3xl text-mint-700 rotate-[-2deg] inline-block">
				check out my letterboxd
				</p>

				{/* Arrow that points to the card on the right */}
				<CurvedArrow
				className="hidden lg:block text-mint-200 pointer-events-none"
				style={{
					position: "absolute",
					// tweak these two numbers to aim perfectly in your layout
					left: "55%",
					top: "78%",
					width: 360,
					height: 240,
					filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.18))",
				}}
				start={{ x: 40, y: 160 }}
				c1={{ x: 120, y: 190 }}
				c2={{ x: 230, y: 70 }}
				end={{ x: 320, y: 60 }}
				headSize={16}
				strokeWidth={5}
				delay={0.15}
				/>
			</div>
			</div>

			{/* RIGHT: Letterboxd */}
			<div>
			<LetterboxdCard username="morgankobayashi" count={12} />
			</div>
		</div>
		</Section>





      {/* PROJECTS */}
      <Section id="projects" kicker="Projects" title="A filterable mix of campaigns, builds, and content.">
        <div className="mt-2 flex flex-col gap-5">
          <FilterChips tags={PROJECT_TAGS} active={filter} onChange={setFilter} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" kicker="Skills" title="What I can do (and what I enjoy doing).">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Marketing Strategy", items: ["Campaign planning", "Positioning + messaging", "Creative frameworks"] },
            { title: "Content Creation", items: ["Video editing + motion", "Copywriting", "Design systems"] },
            { title: "Analytics", items: ["GA4 + GSC", "Conversion tracking", "Testing + iteration"] },
            { title: "Web + Tech", items: ["React basics", "WordPress + SEO", "Automation mindset"] },
            { title: "SEO / AEO", items: ["Content structure", "Schema ideas", "AI visibility thinking"] },
            { title: "Collaboration", items: ["Client communication", "Roadmaps + docs", "Cross-discipline work"] },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-black/10 bg-white p-5 shadow-soft">
              <h3 className="text-base font-semibold">{card.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                {card.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-mint-500" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" kicker="Contact" title="Want to work together?">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p>
              If you’re hiring or want help with marketing, content, or a tech-forward web project, I’d love to chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-2xl bg-mint-500 px-5 py-3 text-sm font-semibold text-white hover:bg-mint-600"
                href="mailto:morgankobayashi@gmail.com"
              >
                Email me
              </a>
              <a
                className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
                href="https://www.linkedin.com/in/morgan-k-483b7113b/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </Section>

      <Footer />
    </>
  );
}

function CurvedArrow({
  className = "",
  style,
  start,
  c1,
  c2,
  delay = 1,
  end,
  headSize = 16,
  strokeWidth = 8
}) {
  const w = typeof style?.width === "number" ? style.width : 240;
  const h = typeof style?.height === "number" ? style.height : 240;

  const d = `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;

  const angle = Math.atan2(end.y - c2.y, end.x - c2.x);
  const a1 = angle + Math.PI * 0.85;
  const a2 = angle - Math.PI * 0.85;

  const x1 = end.x + headSize * Math.cos(a1);
  const y1 = end.y + headSize * Math.sin(a1);
  const x2 = end.x + headSize * Math.cos(a2);
  const y2 = end.y + headSize * Math.sin(a2);

  return (
    <motion.svg
      className={`pointer-events-none absolute z-20 ${className}`}
      style={style}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay }}
      />

      <motion.path
        d={`M ${x1} ${y1} L ${end.x} ${end.y} L ${x2} ${y2}`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeInOut", delay: delay + 0.75 }}
      />
    </motion.svg>
  );
}
