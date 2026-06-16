import React, { forwardRef } from "react";
import { ProjectNode } from "../../lib/topology-data";

interface ProjectCardProps {
  project: ProjectNode;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, isActive, isHovered, onHover, onLeave }, ref) => {
    const Icon = project.icon;

    // Default styles
    let bgClass = "bg-apricot-card";
    let borderClass = "border-apricot-border";
    let iconBgClass = "bg-transparent";

    if (isActive) {
      bgClass = "bg-[#E040A0]/10";
      borderClass = "border-[#E040A0]/50";
      iconBgClass = "bg-[#E040A0]/20";
    } else if (isHovered) {
      bgClass = "bg-apricot-secondary/80";
      borderClass = "border-apricot-accent/50";
    }

    return (
      <div
        ref={ref}
        onMouseEnter={() => onHover(project.id)}
        onMouseLeave={onLeave}
        className={`w-[160px] h-[64px] rounded-[4px] p-2 flex flex-col justify-between cursor-pointer transition-colors duration-200 ${bgClass} border ${borderClass}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div 
              className={`w-4 h-4 flex items-center justify-center rounded-[2px] ${iconBgClass}`}
            >
              <Icon size={10} className={isActive ? "text-[#E040A0]" : "text-apricot-text"} />
            </div>
            <span className="font-mono text-[10px] font-medium text-apricot-text truncate">
              {project.name.length > 18 ? project.name.substring(0, 18) + '...' : project.name}
            </span>
          </div>
          <span className="font-mono text-[8px] text-apricot-text-dim shrink-0 ml-1">
            {project.market}
          </span>
        </div>
        
        <div className="font-mono text-[8px] text-apricot-text-dim uppercase truncate mt-auto">
          {project.category}
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
