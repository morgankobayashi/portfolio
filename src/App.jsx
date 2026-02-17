import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectCaseStudy from "./pages/ProjectCaseStudy.jsx";
import RLGAssessmentIndex from "./pages/RLGAssessmentIndex.jsx";
import RLGAssessmentBlogPost from "./pages/RLGAssessmentBlogPost.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />

        {/* Hidden assessment routes (not linked anywhere) */}
        <Route path="/rlg-assessment" element={<RLGAssessmentIndex />} />
        <Route
          path="/rlg-assessment/extended-producer-responsibility-new-york"
          element={<RLGAssessmentBlogPost />}
        />
      </Routes>
    </div>
  );
}
