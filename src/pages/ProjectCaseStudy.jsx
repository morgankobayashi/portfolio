import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BlockRenderer from "../components/blocks/BlockRenderer.jsx";
import { projects } from "../data/projects.js";

/**
 * This page is now just a "container":
 * - read slug from URL
 * - find matching project
 * - render its blocks
 *
 * The blocks define the unique structure of each project page.
 */
export default function ProjectCaseStudy() {
  const { slug } = useParams();

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="mt-3 text-black/70">No project matches slug: {slug}</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-2xl bg-mint-500 px-5 py-3 text-sm font-semibold text-white hover:bg-mint-600"
          >
            Back home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* This renders a unique page layout per project based on blocks */}
        <BlockRenderer blocks={project.blocks} />
      </div>

      <Footer />
    </>
  );
}
