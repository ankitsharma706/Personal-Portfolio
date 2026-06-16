import React, { forwardRef } from "react";
import { ToolNode } from "../../lib/topology-data";

interface ToolCardProps {
  tool: ToolNode;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string) => void;
  onLeave: () => void;
}

export const ToolCard = forwardRef<HTMLDivElement, ToolCardProps>(
  ({ tool, isSelected, isHovered, onSelect, onHover, onLeave }, ref) => {
    const Icon = tool.icon;
    
    // Default styles
    let bgClass = "bg-transparent";
    let borderLeftColor = "transparent";
    let iconBgClass = "bg-apricot-accent/10";
    let iconBorderClass = "border-apricot-accent/20";

    if (isSelected) {
      bgClass = "bg-apricot-secondary/50";
      borderLeftColor = "var(--color-accent-primary)";
      iconBgClass = "bg-apricot-accent/20";
      iconBorderClass = "border-apricot-accent";
    } else if (isHovered) {
      bgClass = "bg-apricot-card/30";
      borderLeftColor = "var(--color-accent-hover)";
    }

    return (
      <div
        ref={ref}
        onClick={() => onSelect(tool.id)}
        onMouseEnter={() => onHover(tool.id)}
        onMouseLeave={onLeave}
        className={`flex items-center gap-2.5 px-3 cursor-pointer relative transition-colors duration-200 ${bgClass}`}
        style={{
          height: "56px",
          borderLeft: `2px solid ${borderLeftColor}`,
        }}
      >
        {isSelected && (
          <div 
            className="absolute -left-[2px] w-0 h-0"
            style={{
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "8px solid var(--color-accent-primary)",
            }}
          />
        )}
        
        <div 
          className={`w-6 h-6 flex items-center justify-center shrink-0 rounded transition-colors duration-200 ${iconBgClass} ${iconBorderClass} border`}
        >
          <Icon size={12} className="text-apricot-accent" />
        </div>

        <div className="flex flex-col justify-center truncate">
          <span className="font-mono text-[11px] font-medium text-apricot-text uppercase truncate">
            {tool.name}
          </span>
          <span className="font-mono text-[9px] font-normal text-apricot-text-dim uppercase truncate mt-[2px]">
            {tool.sub}
          </span>
        </div>
      </div>
    );
  }
);

ToolCard.displayName = "ToolCard";
