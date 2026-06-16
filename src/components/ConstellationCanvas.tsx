import React, { useEffect, useRef, useState } from "react";

interface Node {
  originalX: number;
  originalY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  isPrimary: boolean;
}

export default function ConstellationCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordsLabelOpacity, setCoordsLabelOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 600;
    let height = 600;
    let nodes: Node[] = [];
    let angleOffset = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let animationId: number;

    const generateNodes = (w: number, h: number) => {
      const list: Node[] = [];
      const centerX = w / 2;
      const centerY = h / 2;

      for (let i = 0; i < 35; i++) {
        const isPrimary = i < 8;
        const baseRadius = isPrimary ? 3 : 1.5;

        // Weighted randomly toward the center
        const offsetDist = (Math.random() - 0.5) * Math.min(w, h) * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const oX = centerX + Math.cos(theta) * offsetDist;
        const oY = centerY + Math.sin(theta) * offsetDist;

        list.push({
          originalX: oX,
          originalY: oY,
          x: oX,
          y: oY,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          phase: Math.random() * Math.PI * 2,
          isPrimary,
        });
      }
      return list;
    };

    // Tracking mouse move coordinate values
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      // Calculate mouse coordinates relative to canvas design dimensions
      mouseX = (e.clientX - rect.left) / (rect.width / width);
      mouseY = (e.clientY - rect.top) / (rect.height / height);
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryW, height: entryH } = entry.contentRect;
        width = Math.max(entryW, 300);
        height = Math.max(entryH, 300);

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        nodes = generateNodes(width, height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      const timeSecs = timestamp / 1000;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Slow coordinate rotation logic: 0.0003 rad per frame
      angleOffset += 0.0003;

      // Oscillation of central coordinates system active label opacity (0.5 to 1.0, 3s period)
      // Math.sin takes radians, 3s period means frequency is 2*PI / 3 = ~2.094
      const blinkOpacity = 0.75 + Math.sin(timeSecs * (Math.PI * 2 / 3)) * 0.25;
      setCoordsLabelOpacity(blinkOpacity);

      // 1. Update node physics and apply slow coordinate system rotation transform
      nodes.forEach((node) => {
        // Find rotated home coordinate target
        const dxOrig = node.originalX - centerX;
        const dyOrig = node.originalY - centerY;
        
        const cos = Math.cos(angleOffset);
        const sin = Math.sin(angleOffset);
        const rotatedHomeX = centerX + dxOrig * cos - dyOrig * sin;
        const rotatedHomeY = centerY + dxOrig * sin + dyOrig * cos;

        // Mouse Repulsion Mechanics: FORCE: (120 - distance) * 0.03 with simple velocity decay
        if (mouseX > 0 && mouseY > 0) {
          const dxMouse = node.x - mouseX;
          const dyMouse = node.y - mouseY;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 120 && distMouse > 1) {
            const force = (120 - distMouse) * 0.03;
            const forceX = (dxMouse / distMouse) * force;
            const forceY = (dyMouse / distMouse) * force;
            node.vx += forceX;
            node.vy += forceY;
          }
        }

        // Elastic pull to rotated target home
        const spring = 0.02;
        node.vx += (rotatedHomeX - node.x) * spring;
        node.vy += (rotatedHomeY - node.y) * spring;

        // Apply velocities & decay friction
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;

        // Pulse logic based on sine wave & offset phase (time variable incremented)
        const pulseFactor = Math.sin(timeSecs * 3.5 + node.phase);
        if (node.isPrimary) {
          // Pulse between 2.5px and 3.5px
          node.radius = 3.0 + pulseFactor * 0.5;
        } else {
          // Pulse between 1.0px and 2.0px
          node.radius = 1.5 + pulseFactor * 0.5;
        }
      });

      // 2. DRAW CONNECTION PATH LINES (hairline strokes, drawn BEFORE nodes so nodes sit on top)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            let opacity = 0;
            if (distance < 80) opacity = 0.30;
            else if (distance < 120) opacity = 0.15;
            else opacity = 0.06;

            // Apply edge fade factors to connection line if endpoints are near edges
            const margin = 80;
            const getFadeFactor = (x: number, y: number) => {
              const minDist = Math.min(x, y, width - x, height - y);
              return minDist < margin ? minDist / margin : 1;
            };

            const fadeA = getFadeFactor(nodeA.x, nodeA.y);
            const fadeB = getFadeFactor(nodeB.x, nodeB.y);
            const finalLineOpacity = opacity * Math.min(fadeA, fadeB);

            if (finalLineOpacity > 0.01) {
              ctx.strokeStyle = `rgba(0, 229, 204, ${finalLineOpacity})`;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        }
      }

      // 3. DRAW NODES (with beautiful shadow glows)
      nodes.forEach((node) => {
        // Edge fade calculations
        const margin = 80;
        const distFromEdge = Math.min(node.x, node.y, width - node.x, height - node.y);
        let nodeAlpha = 1.0;
        if (distFromEdge < margin) {
          nodeAlpha = Math.max(0, distFromEdge / margin);
        }

        if (nodeAlpha > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 225, 204, ${nodeAlpha})`;

          // Premium glowing dropshadow variables
          ctx.shadowColor = "#00E5CC";
          ctx.shadowBlur = node.isPrimary ? 12 : 6;

          ctx.fill();
          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      
      {/* Absolute center watermarked text aligned matching design */}
      <div 
        style={{ opacity: coordsLabelOpacity }}
        className="absolute top-1/2 right-0 -translate-y-1/2 text-right pointer-events-none select-none"
      >
        <span className="font-mono text-[10px] md:text-[11px] font-medium text-[#00B8A4] tracking-[0.14em] uppercase whitespace-nowrap bg-apricot-bg/85 px-4 py-2 border border-[#007A6E]/30 rounded-l border-r-0">
          [ COORDINATES SYSTEM ACTIVE ]
        </span>
      </div>
    </div>
  );
}
