import React from "react";
import { motion } from "motion/react";
import { X, ExternalLink, Github, Book, Server, Shield, Layers, Activity } from "lucide-react";

interface ConduitCaseStudyProps {
  onClose: () => void;
}

export default function ConduitCaseStudy({ onClose }: ConduitCaseStudyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--bg-primary)] w-full max-w-6xl rounded-3xl shadow-2xl border border-[var(--color-border)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 flex items-end p-8 md:p-12 border-b border-[var(--color-border)]">
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                  FinTech
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Conduit</h2>
              <p className="text-xl text-blue-100/80 max-w-2xl">
                A scalable, secure financial dashboard platform designed for modern banking and data visualization.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a href="https://conduits.vercel.app/" target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">
                <ExternalLink className="w-5 h-5" /> Live Demo
              </a>
              <a href="https://docsconduit.netlify.app/overview" target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-medium transition-colors backdrop-blur-sm">
                <Book className="w-5 h-5" /> Docs
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Problem & Solution */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[var(--text-primary)]">
                  <Activity className="w-6 h-6 text-blue-500" />
                  The Problem
                </h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                  Modern financial institutions struggle with fragmented data streams. Operations teams rely on disjointed tools for user management, transaction monitoring, and risk assessment, leading to high latency in decision-making and increased compliance risks.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[var(--text-primary)]">
                  <Shield className="w-6 h-6 text-emerald-500" />
                  The Solution
                </h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                  Conduit was architected as a centralized, highly-secure FinTech platform. It unifies financial workflows into a single dashboard, integrating authentication, real-time analytics, and API-driven data modeling. By prioritizing responsive UI and robust backend architecture, Conduit significantly reduces the cognitive load on financial operators.
                </p>
              </section>
              
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                  <Layers className="w-6 h-6 text-purple-500" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Robust Authentication System",
                    "Financial Workflow Management",
                    "Real-time Data Visualization",
                    "Enterprise-style Layout",
                    "Seamless API Integrations",
                    "Scalable Application Design"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--color-border)]">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-medium text-[var(--text-primary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Screenshots Placeholder */}
              <section>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Interface Overview</h3>
                <div className="aspect-video w-full rounded-2xl bg-[var(--bg-secondary)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
                  <img src="https://placehold.co/1200x675/1e293b/94a3b8?text=Conduit+Dashboard+Screenshot" alt="Conduit Dashboard" className="w-full h-full object-cover opacity-80" />
                </div>
              </section>
            </div>

            {/* Right Column: Architecture & Links */}
            <div className="space-y-8">
              <div className="premium-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                  <Server className="w-5 h-5 text-indigo-500" />
                  System Architecture
                </h3>
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-1">Frontend</span>
                    <span className="text-[var(--text-primary)] font-semibold">React, TypeScript, Tailwind</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-1">Backend</span>
                    <span className="text-[var(--text-primary)] font-semibold">Node.js, Express, REST APIs</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-1">Database</span>
                    <span className="text-[var(--text-primary)] font-semibold">MongoDB, Redis</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-1">Security</span>
                    <span className="text-[var(--text-primary)] font-semibold">JWT, Role-Based Access Control</span>
                  </li>
                </ul>
              </div>
              
              <div className="premium-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Organization</h3>
                <a href="https://github.com/CONDUIT-FINTECH" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-xl hover:border-blue-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <Github className="w-6 h-6 text-[var(--text-primary)]" />
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">CONDUIT-FINTECH</h4>
                      <p className="text-xs text-[var(--text-muted)]">GitHub Organization</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-blue-500 transition-colors" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
