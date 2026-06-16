import React from "react";

interface StatusBadgeProps {
  status: 'In Development' | 'Building' | 'In Progress' | 'Planned' | 'Live';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Let's get color mappings matching the design system rules
  let badgeColorClass = "";
  let dotColorClass = "";

  switch (status) {
    case "Live":
      badgeColorClass = "border-apricot-accent/25 bg-apricot-accent/5 text-apricot-accent";
      dotColorClass = "bg-apricot-accent shadow-md animate-pulse";
      break;
    case "Building":
      badgeColorClass = "border-[#F59E0B]/25 bg-[#F59E0B]/5 text-[#F59E0B]";
      dotColorClass = "bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse";
      break;
    case "In Progress":
      badgeColorClass = "border-[#A07840]/25 bg-[#A07840]/5 text-[#A07840]";
      dotColorClass = "bg-[#A07840] shadow-[0_0_8px_rgba(160,120,64,0.6)] animate-pulse";
      break;
    case "Planned":
    default:
      badgeColorClass = "border-[#4A5A70]/25 bg-[#4A5A70]/5 text-[#8A9BB8]";
      dotColorClass = "bg-[#4A5A70]";
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${badgeColorClass}`}>
      <span className={`w-1 h-1 rounded-full ${dotColorClass}`} />
      <span>{status}</span>
    </div>
  );
}
