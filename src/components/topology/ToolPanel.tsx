import React from "react";
import { TOOLS } from "../../lib/topology-data";
import { ToolCard } from "./ToolCard";

interface ToolPanelProps {
  selectedTool: string | null;
  hoveredTool: string | null;
  onSelectTool: (id: string) => void;
  onHoverTool: (id: string) => void;
  onLeaveTool: () => void;
  toolCardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  selectedTool,
  hoveredTool,
  onSelectTool,
  onHoverTool,
  onLeaveTool,
  toolCardRefs,
}) => {
  return (
    <div 
      className="w-[230px] shrink-0 bg-apricot-secondary border-r border-apricot-border flex flex-col py-3 overflow-y-auto overflow-x-hidden hide-scrollbar hidden md:flex"
      style={{
        borderRightColor: "var(--color-border-primary)",
      }}
    >
      <div 
        className="px-3 py-2 border-b mb-1 flex items-center gap-1.5"
        style={{ borderBottom: "1px solid var(--color-border-primary)" }}
      >
        <span className="w-[5px] h-[5px] rounded-full bg-emerald-500"></span>
        <span className="font-mono text-[9px] text-apricot-text-dim tracking-[0.12em] uppercase">
          CORE INTERPRETERS & TOOLS
        </span>
      </div>

      <div className="flex flex-col">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            ref={(el) => {
              if (toolCardRefs.current) {
                toolCardRefs.current[tool.id] = el;
              }
            }}
            tool={tool}
            isSelected={selectedTool === tool.id}
            isHovered={hoveredTool === tool.id}
            onSelect={onSelectTool}
            onHover={onHoverTool}
            onLeave={onLeaveTool}
          />
        ))}
      </div>
    </div>
  );
};
