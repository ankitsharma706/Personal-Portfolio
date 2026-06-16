import React, { useState, useEffect, useRef } from "react";
import { TOOLS, PROJECTS } from "../../lib/topology-data";

interface ConnectionCanvasProps {
  selectedTool: string | null;
  hoveredTool: string | null;
  hoveredProject: string | null;
  toolCardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  projectCardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

interface PathData {
  id: string;
  toolId: string;
  projectId: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
  isHovered: boolean;
  length: number;
  dashVariant: boolean; // Every 3rd line gets dash variant
}

export const ConnectionCanvas: React.FC<ConnectionCanvasProps> = ({
  selectedTool,
  hoveredTool,
  hoveredProject,
  toolCardRefs,
  projectCardRefs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<PathData[]>([]);
  const [hoveredLineId, setHoveredLineId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    const calculatePaths = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newPaths: PathData[] = [];
      let activeCount = 0;

      TOOLS.forEach(tool => {
        const toolEl = toolCardRefs.current[tool.id];
        if (!toolEl) return;
        const toolRect = toolEl.getBoundingClientRect();

        // Calculate Y relative to container
        const startY = toolRect.top + toolRect.height / 2 - containerRect.top;
        const startX = 0;

        PROJECTS.forEach(project => {
          if (!project.connectedTools.includes(tool.id)) return;

          const projEl = projectCardRefs.current[project.id];
          if (!projEl) return;
          const projRect = projEl.getBoundingClientRect();

          const endY = projRect.top + projRect.height / 2 - containerRect.top;
          const endX = containerRect.width;

          const dx = endX - startX;
          const dy = endY - startY;
          const length = Math.sqrt(dx * dx + dy * dy);

          const isActive = selectedTool === tool.id;
          const isHovered = hoveredTool === tool.id || hoveredProject === project.id;
          
          let dashVariant = false;
          if (isActive) {
            dashVariant = activeCount % 3 === 2; // Every 3rd active line
            activeCount++;
          }

          newPaths.push({
            id: `${tool.id}-${project.id}`,
            toolId: tool.id,
            projectId: project.id,
            startX,
            startY,
            endX,
            endY,
            isActive,
            isHovered,
            length,
            dashVariant
          });
        });
      });

      setPaths(newPaths);
    };

    calculatePaths();

    const observer = new ResizeObserver(() => {
      calculatePaths();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", calculatePaths);
    
    // Quick recalculation after initial render to catch late layouts
    const timeout = setTimeout(calculatePaths, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculatePaths);
      clearTimeout(timeout);
    };
  }, [selectedTool, hoveredTool, hoveredProject, toolCardRefs, projectCardRefs]);

  return (
    <div ref={containerRef} className="absolute top-[36px] left-0 right-0 bottom-[28px] overflow-visible">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id="glow-teal">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, idx) => {
          const cp1X = path.startX + (path.endX - path.startX) * 0.45;
          const cp1Y = path.startY;
          const cp2X = path.startX + (path.endX - path.startX) * 0.55;
          const cp2Y = path.endY;

          const d = `M ${path.startX} ${path.startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${path.endX} ${path.endY}`;

          let stroke = "rgba(180, 210, 220, 0.12)";
          let strokeWidth = 0.8;
          let dasharray = "none";
          let animation = "none";

          const isLineHovered = hoveredLineId === path.id;

          if (isLineHovered) {
            stroke = "rgba(0, 229, 204, 0.60)";
            strokeWidth = 2;
          } else if (path.isActive) {
            if (path.dashVariant) {
              stroke = "rgba(224, 64, 160, 0.40)";
              strokeWidth = 1.5;
              dasharray = "4 4";
              animation = "dashMove 1s linear infinite";
            } else {
              stroke = "rgba(224, 64, 160, 0.75)";
              strokeWidth = 1.5;
            }
          } else if (selectedTool) {
            // Something else is selected
            stroke = "rgba(180, 210, 220, 0.08)";
            strokeWidth = 0.5;
          } else if (path.isHovered) {
            stroke = "rgba(0, 229, 204, 0.40)";
            strokeWidth = 1.2;
          } else if (hoveredTool || hoveredProject) {
            // Something else is hovered
            stroke = "rgba(180, 210, 220, 0.05)";
          }

          const dur = `${1.0 + path.length * 0.003}s`;
          const begin = `${idx * 0.3}s`;

          return (
            <g key={path.id}>
              {/* Invisible wider path for easier hovering */}
              <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={15}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  setHoveredLineId(path.id);
                  const toolName = TOOLS.find(t => t.id === path.toolId)?.name;
                  const projName = PROJECTS.find(p => p.id === path.projectId)?.name;
                  setTooltipText(`${toolName} → ${projName}`);
                  setTooltipPos({ 
                    x: path.startX + (path.endX - path.startX) * 0.5, 
                    y: path.startY + (path.endY - path.startY) * 0.5 
                  });
                }}
                onMouseLeave={() => setHoveredLineId(null)}
              />
              <path 
                id={`path-${path.id}`}
                d={d}
                fill="none"
                stroke={path.isHovered ? "var(--color-accent-primary)" : path.isActive ? "var(--color-accent-secondary)" : "var(--color-border-primary)"}
                strokeWidth={path.isHovered ? 1.5 : 1}
                strokeDasharray={path.dashVariant && !path.isHovered ? "4 4" : "none"}
                style={{ animation, transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
                className="pointer-events-none"
              />
            </g>
          );
        })}
      </svg>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        <defs>
          <filter id="glow-teal">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {paths.filter(p => p.isActive).map((path, idx) => {
          const cp1X = path.startX + (path.endX - path.startX) * 0.45;
          const cp1Y = path.startY;
          const cp2X = path.startX + (path.endX - path.startX) * 0.55;
          const cp2Y = path.endY;

          const d = `M ${path.startX} ${path.startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${path.endX} ${path.endY}`;
          
          return (
            <circle key={`pulse-${idx}`} r="2.5" fill="var(--color-accent-secondary)" filter="url(#glow-teal)">
              <animateMotion dur={`${1.0 + path.length * 0.003}s`} repeatCount="indefinite" begin={`${idx * 0.3}s`}>
                <mpath href={`#path-${path.id}`} />
              </animateMotion>
            </circle>
          );
        })}
      </svg>

      {hoveredLineId && (
        <div 
          className="absolute z-50 px-2 py-1 rounded-[4px] pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -150%)',
            backgroundColor: "#111C2E",
            border: "1px solid rgba(0,229,204,0.50)",
          }}
        >
          <span className="font-mono text-[9px] text-[#00E5CC] whitespace-nowrap">
            {tooltipText}
          </span>
        </div>
      )}

      <style>{`
        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -16; }
        }
      `}</style>
    </div>
  );
};
