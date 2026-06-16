import React, { useState, useRef, useEffect } from "react";
import { GripHorizontal } from "lucide-react";
import { ToolPanel } from "./ToolPanel";
import { SignalConsole } from "./SignalConsole";
import { ConnectionCanvas } from "./ConnectionCanvas";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS, TOOLS } from "../../lib/topology-data";

export default function TopologyGraph() {
  const [selectedTool, setSelectedTool] = useState<string | null>("mongodb");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const toolCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const projectCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToolSelect = (id: string) => setSelectedTool(id);
  const handleToolHover = (id: string | null) => setHoveredTool(id);
  const handleToolLeave = () => setHoveredTool(null);
  
  const activeConnections = PROJECTS.filter(p => selectedTool && p.connectedTools.includes(selectedTool));

  return (
    <div className="w-full max-w-[1100px] mx-auto bg-apricot-card rounded-[8px] overflow-hidden font-mono relative shadow-2xl"
      style={{ boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
    >
      <div 
        className="w-full h-8 flex items-center px-4 gap-2 border-b select-none"
        style={{ borderColor: "var(--color-border-primary)" }}
      >
        <GripHorizontal size={14} className="text-apricot-accent" />
        <span className="font-mono text-[11px] font-medium text-apricot-accent tracking-[0.10em]">
          TOPOLOGICAL DATA ROUTING GRAPH // REAL-TIME SYSTEM TRACES
        </span>
      </div>

      {/* BODY - DESKTOP */}
      <div className="flex flex-1 min-h-0 relative z-10">
        
        {/* Left Panel: Tools */}
        <ToolPanel
          selectedTool={selectedTool}
          hoveredTool={hoveredTool}
          onSelectTool={handleToolSelect}
          onHoverTool={handleToolHover}
          onLeaveTool={handleToolLeave}
          toolCardRefs={toolCardRefs}
        />

        {/* Center Panel: Visualization Canvas */}
        <div className="flex-1 bg-apricot-card relative overflow-hidden flex flex-col min-w-0">
          {/* Center Panel Header */}
          <div 
            className="px-4 py-2 flex justify-between items-center border-b border-apricot-border"
          >
            <div className="flex-1"></div>
            <span className="font-mono text-[10px] font-semibold text-apricot-accent tracking-[0.12em]">
              TOPOLOGY COUPLINGS
            </span>
            <div className="flex-1 flex justify-end items-center gap-1.5">
              <span className="font-mono text-[9px] text-apricot-text-dim">
                RECONCILED PLATFORMS
              </span>
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* SVG Canvas goes here, bounded by its own container */}
          <ConnectionCanvas
            selectedTool={selectedTool}
            hoveredTool={hoveredTool}
            hoveredProject={hoveredProject}
            toolCardRefs={toolCardRefs}
            projectCardRefs={projectCardRefs}
          />

          {/* Projects Column (Right side of Center Panel) */}
          <div className="absolute right-0 top-[36px] bottom-[28px] w-[160px] flex flex-col justify-between py-6">
            {PROJECTS.map(project => {
              const active = !!selectedTool && project.connectedTools.includes(selectedTool);
              const hovered = !!hoveredTool && project.connectedTools.includes(hoveredTool);

              return (
                <ProjectCard
                  key={project.id}
                  ref={(el) => {
                    if (projectCardRefs.current) {
                      projectCardRefs.current[project.id] = el;
                    }
                  }}
                  project={project}
                  isActive={active}
                  isHovered={hovered}
                  onHover={setHoveredProject}
                  onLeave={() => setHoveredProject(null)}
                />
              );
            })}
          </div>

          {/* Center Panel Footer */}
          <div className="px-4 py-2 flex justify-between items-center border-t border-apricot-border relative z-10">
            <span className="font-mono text-[9px] text-apricot-text-dim">
              TOTAL REGISTERED LINKS: {activeConnections.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-apricot-text-dim">
                ● STANDBY
              </span>
              <span className="font-mono text-[9px] text-apricot-text-dim ml-2 flex items-center gap-1">
                ● TRACE SWEEPS ACTIVE
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 3: Signal Readout Console (Right) */}
        <SignalConsole selectedToolId={selectedTool} />
      </div>

      {/* BODY - MOBILE FALLBACK */}
      <div className="lg:hidden p-4 bg-apricot-secondary border-t border-apricot-border">
        <div className="text-apricot-accent text-[10px] mb-2 font-semibold tracking-wider">
          SYSTEM INTERPRETERS
        </div>
        <div className="flex overflow-x-auto snap-x gap-2 pb-4 hide-scrollbar">
          {TOOLS.map((tool) => {
            const isSelected = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool.id)}
                className="snap-start shrink-0 w-[140px] p-3 rounded flex flex-col items-start gap-2 bg-apricot-card transition-all focus:outline-none"
                style={{
                  border: `1px solid ${isSelected ? "var(--color-accent-primary)" : "var(--color-border-primary)"}`
                }}
              >
                <tool.icon size={12} className={isSelected ? "text-apricot-accent" : "text-apricot-text-muted"} />
                <span className="font-mono text-[10px] font-bold text-apricot-text">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-apricot-border">
          <SignalConsole 
            tool={TOOLS.find(t => t.id === selectedTool) || null}
            connectedProjects={PROJECTS.filter(p => p.connectedTools.includes(selectedTool || ""))}
          />
        </div>
      </div>
    </div>
  );
}
