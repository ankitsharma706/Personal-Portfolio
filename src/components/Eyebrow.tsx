import React from "react";

interface EyebrowProps {
  text: string;
  className?: string;
}

export default function Eyebrow({ text, className = "" }: EyebrowProps) {
  return (
    <div 
      className={`font-mono text-[11px] font-medium text-apricot-accent tracking-[0.14em] uppercase select-none ${className}`}
    >
      [ {text} ]
    </div>
  );
}
