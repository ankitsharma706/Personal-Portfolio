import React, { useState } from "react";
import { motion } from "motion/react";
import { PROJECTS, Project } from "../lib/data";
import Eyebrow from "./Eyebrow";
import StatusBadge from "./StatusBadge";
import { CASE_STUDIES, CaseStudy } from "../lib/caseStudies";
import CaseStudyModal from "./CaseStudyModal";
import AISynthesisLab from "./AISynthesisLab";

export default function Projects() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Status top line colors
  const getStatusStripColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-apricot-accent"; // Teal
      case "Building":
        return "bg-[#F59E0B]"; // Amber
      case "In Progress":
        return "bg-[#A07840]"; // Gold
      case "Planned":
      default:
        return "bg-[#4A5A70]"; // Dim gray
    }
  };

  // Associated project years
  const projectYears: Record<string, string> = {
    "urban-flow": "2023",
    "defi-gateway": "2024",
    "aml-engine": "2025",
    "assava": "2023–2024",
    "onchain-identity": "2024",
    "caffenia": "2023"
  };

  return (
    <section
      id="projects"
      className="bg-[var(--bg-secondary)] py-24 border-t border-apricot-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 select-none animate-fadeIn">
          <Eyebrow text="SELECTED WORK" className="mb-4" />
          <h2 className="font-serif font-semibold text-apricot-text tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: "1.15" }}>
            Systems Built for the Real World.
          </h2>
        </div>

        {/* 6 Grid items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project) => {
            const year = projectYears[project.id] || "2024";
            const topStripColor = getStatusStripColor(project.status);

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative flex flex-col justify-between h-full border border-apricot-border/80 bg-apricot-card/80 backdrop-blur-[16px] -webkit-backdrop-blur-[16px] shadow-[0_0_0_1px_rgba(0,180,180,0.08),0_8px_32px_rgba(0,0,0,0.5)] hover:border-apricot-accent/40 hover:bg-apricot-card hover:shadow-[0_0_0_1px_rgba(0,180,180,0.20),0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,180,180,0.08)] rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                style={{ wordBreak: "break-word" }}
              >
                {/* Embed background spotlight glow */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,180,180,0.04) 0%, transparent 100%)`
                  }}
                />

                {/* Status Indicator Color Strip */}
                <div className={`h-[3.5px] w-full ${topStripColor} absolute top-0 left-0 z-20`} />

                {/* Main Card Content */}
                <div className="p-6 pt-8 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Row 1: Jurisdiction + Status */}
                    <div className="flex items-center justify-between mb-4 select-none">
                      <span className="font-mono text-[10px] text-apricot-text-muted border border-[#007A6E]/20 bg-white/[0.01] px-2.5 py-0.5 rounded-full select-none">
                        {project.market.toUpperCase()} JURISDICTION
                      </span>
                      <span className="font-mono text-[10px] text-apricot-text-muted">
                        {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="font-serif font-bold text-[20px] text-apricot-text mt-3 tracking-tight leading-normal">
                      {project.name}
                    </h3>

                    {/* Project Type */}
                    <span className="block font-mono text-[10px] text-apricot-text-muted mt-1 mb-3">
                      {project.type.toUpperCase()}
                    </span>

                    {/* 1px separator */}
                    <div className="w-full h-[1px] bg-white/5 my-3" />

                    {/* Project Description (Line clamp 3) */}
                    <p className="font-sans text-[13px] text-apricot-text-dim leading-[1.6] line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                      {project.desc}
                    </p>

                    {/* Compliance Box if populated */}
                    {project.compliance && project.compliance.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 items-center bg-[rgba(0,180,180,0.04)] border border-[rgba(0,180,180,0.08)] rounded-lg p-2.5">
                        <span className="font-mono text-[8.5px] font-bold text-apricot-accent-dim mr-1">
                          [REGULATORY SHIELD]
                        </span>
                        {project.compliance.map((rule) => (
                          <span 
                            key={rule} 
                            className="font-mono text-[8px] font-medium text-apricot-accent-dim bg-white/[0.02] border border-apricot-border px-1.5 py-0.5 rounded"
                          >
                            {rule}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Technology tag loops */}
                  <div className="mt-6 pt-4 border-t border-apricot-border flex flex-wrap gap-1">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-[10px] text-apricot-text-muted group-hover:text-apricot-text-dim bg-white/[0.02] border border-apricot-border px-2 py-0.5 rounded transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="font-mono text-[9px] text-apricot-text-muted bg-white/[0.02] border border-apricot-border px-1.5 py-0.5 rounded">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer row */}
                <div className="px-6 py-4 bg-black/25 border-t border-apricot-border z-10 flex items-center justify-between select-none">
                  {CASE_STUDIES.some((cs) => cs.id === project.id) ? (
                    <button
                      onClick={() => {
                        const study = CASE_STUDIES.find((cs) => cs.id === project.id);
                        if (study) setSelectedStudy(study);
                      }}
                      className="font-sans text-[13px] text-apricot-accent hover:text-[#00B8A4] hover:[text-shadow:0_0_10px_rgba(0,180,180,0.3)] transition-all font-semibold cursor-pointer"
                    >
                      View Case Study →
                    </button>
                  ) : (
                    <a
                      href={project.live || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] text-apricot-accent hover:text-[#00B8A4] hover:[text-shadow:0_0_10px_rgba(0,180,180,0.3)] transition-all font-semibold cursor-pointer"
                    >
                      View Project →
                    </a>
                  )}

                  <span className="font-mono text-[11px] text-apricot-text-muted/50 group-hover:text-apricot-text-muted transition-colors ml-auto">
                    {year}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Embedded Interactive AI Lab Component */}
        <div className="mt-16 relative z-10">
          <AISynthesisLab />
        </div>

      </div>

      {/* Case Study Detailed popup overlay */}
      <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
    </section>
  );
}
