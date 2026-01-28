import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectCaseStudy from "./pages/ProjectCaseStudy.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
      </Routes>
    </div>
  );
}
