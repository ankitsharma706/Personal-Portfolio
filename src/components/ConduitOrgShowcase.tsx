import React from "react";
import { motion } from "motion/react";
import { X, ExternalLink, Github, Users, MapPin, Link as LinkIcon, FolderDot, Star, GitFork, Activity } from "lucide-react";

interface ConduitOrgShowcaseProps {
  onClose: () => void;
}

const orgRepos = [
  {
    name: "conduit-core",
    description: "The core backend services and APIs for the Conduit platform.",
    language: "TypeScript",
    langColor: "bg-blue-500",
    stars: 124,
    forks: 32,
    updated: "2 days ago"
  },
  {
    name: "conduit-ui",
    description: "Frontend dashboard and component library for Conduit.",
    language: "React",
    langColor: "bg-cyan-400",
    stars: 98,
    forks: 18,
    updated: "5 days ago"
  },
  {
    name: "conduit-auth",
    description: "Secure JWT and Role-Based Access Control microservice.",
    language: "Node.js",
    langColor: "bg-green-500",
    stars: 56,
    forks: 12,
    updated: "1 week ago"
  },
  {
    name: "conduit-analytics",
    description: "Real-time data aggregation and financial modeling engine.",
    language: "Python",
    langColor: "bg-yellow-500",
    stars: 87,
    forks: 22,
    updated: "3 weeks ago"
  }
];

export default function ConduitOrgShowcase({ onClose }: ConduitOrgShowcaseProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0d1117] text-[#c9d1d9] w-full max-w-6xl rounded-2xl shadow-2xl border border-[#30363d] overflow-hidden flex flex-col max-h-[90vh] font-sans"
      >
        {/* Header - GitHub Style */}
        <div className="bg-[#161b22] border-b border-[#30363d] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Github className="w-8 h-8 text-white" />
            <span className="font-semibold text-white text-lg">CONDUIT-FINTECH</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#30363d] rounded-md transition-colors text-[#8b949e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar: Org Profile */}
            <div className="lg:col-span-1 space-y-6">
              <div className="aspect-square w-full bg-[#161b22] border border-[#30363d] rounded-2xl flex items-center justify-center p-8 mb-4">
                {/* Org Logo Placeholder */}
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Activity className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Conduit FinTech</h2>
                <p className="text-[#8b949e] text-xl mb-4">CONDUIT-FINTECH</p>
                <p className="text-[15px] mb-6">Building the infrastructure for modern, compliant financial dashboards and data visualization.</p>
                
                <div className="space-y-2 text-sm text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Global Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <a href="https://docsconduit.netlify.app/overview" className="text-[#58a6ff] hover:underline">docsconduit.netlify.app</a>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#30363d]">
                    <Users className="w-4 h-4" />
                    <span><span className="text-white font-semibold">4</span> members</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content: Repositories */}
            <div className="lg:col-span-3">
              <div className="border-b border-[#30363d] mb-6 pb-2">
                <nav className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 px-3 py-2 text-white border-b-2 border-[#f78166] font-semibold text-sm">
                    <FolderDot className="w-4 h-4" />
                    Repositories
                    <span className="bg-[#30363d] text-xs px-2 py-0.5 rounded-full">4</span>
                  </a>
                </nav>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orgRepos.map((repo, i) => (
                  <div key={i} className="p-4 border border-[#30363d] rounded-xl bg-[#161b22]/50 hover:bg-[#161b22] transition-colors flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <a href={`https://github.com/CONDUIT-FINTECH`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline font-semibold text-[15px]">
                        {repo.name}
                      </a>
                      <span className="px-2 py-0.5 border border-[#30363d] text-[#8b949e] text-xs rounded-full font-medium">Public</span>
                    </div>
                    <p className="text-[#8b949e] text-xs mb-6 flex-grow">{repo.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${repo.langColor}`}></span>
                        {repo.language}
                      </div>
                      <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer transition-colors">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer transition-colors">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </div>
                      <div className="ml-auto">
                        Updated {repo.updated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <a href="https://github.com/CONDUIT-FINTECH" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#21262d] border border-[#363b42] hover:bg-[#30363d] hover:border-[#8b949e] text-white text-sm font-medium rounded-md transition-all">
                  <ExternalLink className="w-4 h-4" />
                  View Organization on GitHub
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
