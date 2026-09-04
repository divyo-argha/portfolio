"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./CyquredMagneticGrid.module.css";

interface GridNode {
  x: number;
  y: number;
  origX: number;
  origY: number;
  vx: number;
  vy: number;
  disp: number;
  row: number;
  col: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

const PITCH = 44; // Diamond grid cell pitch in CSS pixels
const ROW_HEIGHT = PITCH * (Math.sqrt(3) / 2); // ~38.1px for 60-degree isometric grid
const MAGNETIC_RADIUS = 195; // Repulsion zone around cursor
const REPULSION_FORCE = 15; // Peak repulsion acceleration
const SPRING_K = 0.065; // Elastic return constant
const DAMPING = 0.88; // Friction damping factor

export function CyquredMagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let nodes: GridNode[] = [];
    let cols = 0;
    let rows = 0;
    const pulses: PulseWave[] = [];

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let animId = 0;
    let isSleeping = false;

    function initGrid() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      cols = Math.ceil(w / PITCH) + 3;
      rows = Math.ceil(h / ROW_HEIGHT) + 3;
      const offsetX = -PITCH;
      const offsetY = -ROW_HEIGHT;

      // Preserve existing displacements when resizing
      const oldNodes = new Map<string, { x: number; y: number; vx: number; vy: number }>();
      for (const n of nodes) {
        oldNodes.set(`${n.row},${n.col}`, { x: n.x, y: n.y, vx: n.vx, vy: n.vy });
      }

      nodes = [];
      for (let r = 0; r < rows; r++) {
        const rowShift = (r % 2 === 1) ? PITCH / 2 : 0;
        for (let c = 0; c < cols; c++) {
          const origX = offsetX + c * PITCH + rowShift;
          const origY = offsetY + r * ROW_HEIGHT;
          const prev = oldNodes.get(`${r},${c}`);

          nodes.push({
            x: prev ? prev.x : origX,
            y: prev ? prev.y : origY,
            origX,
            origY,
            vx: prev ? prev.vx : 0,
            vy: prev ? prev.vy : 0,
            disp: 0,
            row: r,
            col: c,
          });
        }
      }

      wake();
    }

    initGrid();

    // Static render for reduced motion
    if (reducedMotion) {
      drawStatic();
      return;
    }

    function drawStatic() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // 1. Defined 60-degree and -60-degree lines
      ctx.strokeStyle = "rgba(94, 225, 242, 0.26)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = nodes[idx];

          if (r < rows - 1) {
            if (r % 2 === 0) {
              // Even row: down-right is (r+1, c)
              const downRight = nodes[idx + cols];
              if (downRight) {
                ctx.moveTo(p.origX, p.origY);
                ctx.lineTo(downRight.origX, downRight.origY);
              }
              // Even row: down-left is (r+1, c-1)
              if (c > 0) {
                const downLeft = nodes[idx + cols - 1];
                if (downLeft) {
                  ctx.moveTo(p.origX, p.origY);
                  ctx.lineTo(downLeft.origX, downLeft.origY);
                }
              }
            } else {
              // Odd row: down-left is (r+1, c)
              const downLeft = nodes[idx + cols];
              if (downLeft) {
                ctx.moveTo(p.origX, p.origY);
                ctx.lineTo(downLeft.origX, downLeft.origY);
              }
              // Odd row: down-right is (r+1, c+1)
              if (c < cols - 1) {
                const downRight = nodes[idx + cols + 1];
                if (downRight) {
                  ctx.moveTo(p.origX, p.origY);
                  ctx.lineTo(downRight.origX, downRight.origY);
                }
              }
            }
          }
        }
      }
      ctx.stroke();

      // 2. High-contrast light nodes at rest
      ctx.fillStyle = "rgba(180, 235, 250, 0.42)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        ctx.moveTo(p.origX + 1.75, p.origY);
        ctx.arc(p.origX, p.origY, 1.75, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = "rgba(245, 252, 255, 0.82)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        ctx.moveTo(p.origX + 1.05, p.origY);
        ctx.arc(p.origX, p.origY, 1.05, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function wake() {
      if (isSleeping) {
        isSleeping = false;
        animId = requestAnimationFrame(render);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;

      if (glow) {
        glow.style.setProperty("--mx", `${mouseX}px`);
        glow.style.setProperty("--my", `${mouseY}px`);
        glow.style.opacity = "1";
      }

      wake();
    }

    function handlePointerLeave() {
      mouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
      if (glow) {
        glow.style.opacity = "0";
      }
      wake();
    }

    function handlePointerDown(e: PointerEvent) {
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(window.innerWidth, window.innerHeight) * 0.35,
        speed: 6.5,
        strength: 14,
      });
      wake();
    }

    let resizeTimer = 0;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(initGrid, 120);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });

    function render() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      let maxMotion = 0;

      // 1. Advance magnetic pulse waves
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.radius += pulse.speed;
        if (pulse.radius >= pulse.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // 2. Physics simulation step
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        let fx = 0;
        let fy = 0;

        // Repulsive force from cursor
        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAGNETIC_RADIUS * MAGNETIC_RADIUS && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const q = 1 - dist / MAGNETIC_RADIUS;
            const force = REPULSION_FORCE * q * q;

            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        }

        // Pulse wave effect
        for (let j = 0; j < pulses.length; j++) {
          const pulse = pulses[j];
          const pdx = p.x - pulse.x;
          const pdy = p.y - pulse.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          const waveDist = Math.abs(pdist - pulse.radius);
          const waveWidth = 45;

          if (waveDist < waveWidth && pdist > 0.001) {
            const waveIntensity = (1 - waveDist / waveWidth) * (1 - pulse.radius / pulse.maxRadius);
            const pforce = pulse.strength * waveIntensity;
            fx += (pdx / pdist) * pforce;
            fy += (pdy / pdist) * pforce;
          }
        }

        // Restoring spring force (Hooke's Law) & damping
        const springX = -SPRING_K * (p.x - p.origX);
        const springY = -SPRING_K * (p.y - p.origY);

        p.vx = (p.vx + fx + springX) * DAMPING;
        p.vy = (p.vy + fy + springY) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        const currentDisp = Math.hypot(p.x - p.origX, p.y - p.origY);
        p.disp = currentDisp;

        const motion = Math.abs(p.vx) + Math.abs(p.vy) + currentDisp;
        if (motion > maxMotion) {
          maxMotion = motion;
        }
      }

      // 3. Render 60-degree and -60-degree Diamond Grid Lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = nodes[idx];

          if (r < rows - 1) {
            const connectLines = (target: GridNode | undefined) => {
              if (!target) return;
              const maxDisp = Math.max(p.disp, target.disp);
              let alpha = 0.26;
              let lineW = 1;

              if (maxDisp > 0.8) {
                const t = Math.min(1, maxDisp / 14);
                alpha = 0.26 + t * 0.45;
                lineW = 1 + t * 0.7;
              }

              ctx.lineWidth = lineW;
              ctx.strokeStyle = `rgba(94, 225, 242, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            };

            if (r % 2 === 0) {
              connectLines(nodes[idx + cols]); // down-right
              if (c > 0) connectLines(nodes[idx + cols - 1]); // down-left
            } else {
              connectLines(nodes[idx + cols]); // down-left
              if (c < cols - 1) connectLines(nodes[idx + cols + 1]); // down-right
            }
          }
        }
      }

      // 4. Render All Vertices (High-Contrast Light Cyber Nodes)
      // 4a. Batch resting outer halos
      ctx.fillStyle = "rgba(180, 235, 250, 0.42)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        if (p.disp <= 0.8) {
          ctx.moveTo(p.x + 1.75, p.y);
          ctx.arc(p.x, p.y, 1.75, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 4b. Batch resting inner bright light cores
      ctx.fillStyle = "rgba(245, 252, 255, 0.82)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        if (p.disp <= 0.8) {
          ctx.moveTo(p.x + 1.05, p.y);
          ctx.arc(p.x, p.y, 1.05, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 4c. Displaced nodes: dynamic repulsion bloom with bright white-cyan contrast
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        if (p.disp > 0.8) {
          const t = Math.min(1, p.disp / 16);
          const outerR = 1.75 + t * 1.5;
          const innerR = 1.05 + t * 0.85;

          // Radiant cyber aura
          ctx.fillStyle = `rgba(94, 225, 242, ${(0.45 + t * 0.45).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, outerR, 0, Math.PI * 2);
          ctx.fill();

          // High contrast pure light center
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.85 + t * 0.15).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, innerR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Intelligent Sleep State: Pause RAF when system has reached equilibrium
      if (!mouseActive && pulses.length === 0 && maxMotion < 0.02) {
        for (let i = 0; i < nodes.length; i++) {
          const p = nodes[i];
          p.x = p.origX;
          p.y = p.origY;
          p.vx = 0;
          p.vy = 0;
          p.disp = 0;
        }

        drawStatic();
        isSleeping = true;
        animId = 0;
        return;
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div ref={glowRef} className={styles.ambientGlow} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
