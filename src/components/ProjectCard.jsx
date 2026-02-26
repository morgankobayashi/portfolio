// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Thumbnail area (full bleed) */}
      <div className="relative">
        <div className="aspect-[16/10] w-full bg-black/[0.03]">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-black/50">
              Thumbnail coming soon
            </div>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold tracking-tight text-black/90">
          {project.title}
        </h3>

        <p className="mt-1 text-sm font-medium text-black/60">
          {project.headline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.year ? (
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60">
              {project.year}
            </span>
          ) : null}

          {project.tags?.map((t) => (
            <span
              key={t}
              className="rounded-full border border-mint-200 bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-900"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}