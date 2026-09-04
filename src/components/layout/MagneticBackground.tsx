"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./MagneticBackground.module.css";

interface LatticePoint {
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

const PITCH = 34; // Spacing between lattice points in CSS pixels
const MAGNETIC_RADIUS = 150; // Gentle repulsion radius around cursor
const REPULSION_FORCE = 11; // Soft, fluid repulsive acceleration
const SPRING_K = 0.065; // Organic restitution constant
const DAMPING = 0.88; // Gentle friction damping factor

export function MagneticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let points: LatticePoint[] = [];
    let cols = 0;
    let rows = 0;
    const pulses: PulseWave[] = [];

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let animId = 0;
    let isSleeping = false;
    let isDark = false;

    function detectTheme() {
      const explicit = document.documentElement.getAttribute("data-theme");
      if (explicit === "dark") {
        isDark = true;
      } else if (explicit === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    }

    detectTheme();

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      detectTheme();
      wake();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSchemeChange = () => {
      detectTheme();
      wake();
    };
    colorSchemeQuery.addEventListener("change", handleSchemeChange);

    function initGrid() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      cols = Math.ceil(w / PITCH) + 1;
      rows = Math.ceil(h / PITCH) + 1;
      const offsetX = (w - (cols - 1) * PITCH) / 2;
      const offsetY = (h - (rows - 1) * PITCH) / 2;

      // Preserve existing displacements when resizing
      const oldPoints = new Map<string, { x: number; y: number; vx: number; vy: number }>();
      for (const p of points) {
        oldPoints.set(`${p.row},${p.col}`, { x: p.x, y: p.y, vx: p.vx, vy: p.vy });
      }

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const origX = offsetX + c * PITCH;
          const origY = offsetY + r * PITCH;
          const prev = oldPoints.get(`${r},${c}`);

          points.push({
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
      return () => {
        themeObserver.disconnect();
        colorSchemeQuery.removeEventListener("change", handleSchemeChange);
      };
    }

    function drawStatic() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = isDark
        ? "rgba(255, 255, 255, 0.22)"
        : "rgba(20, 30, 25, 0.22)";

      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.origX, p.origY, 1.35, 0, Math.PI * 2);
        ctx.fill();
      }
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
      // Spawn subtle, gentle magnetic impulse on click/tap
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(window.innerWidth, window.innerHeight) * 0.28,
        speed: 5.5,
        strength: 7,
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

      // Color palettes tuned for scientific elegance
      // Light: refined deep pine emerald accent (#0f5c4a)
      // Dark: ethereal luminous mint accent (#55d6b0)
      const baseDotFill = isDark
        ? "rgba(255, 255, 255, 0.22)"
        : "rgba(20, 30, 25, 0.22)";
      const activeDotR = isDark ? 85 : 15;
      const activeDotG = isDark ? 214 : 92;
      const activeDotB = isDark ? 176 : 74;

      let maxMotion = 0;

      // 1. Advance magnetic pulse shockwaves
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.radius += pulse.speed;
        if (pulse.radius >= pulse.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // 2. Physics simulation step
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // --- Magnetic Repulsion Force ---
        let fx = 0;
        let fy = 0;

        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAGNETIC_RADIUS * MAGNETIC_RADIUS && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            // Smooth cubic hermite falloff from center to radius
            const q = 1 - dist / MAGNETIC_RADIUS;
            const force = REPULSION_FORCE * q * q;

            // Repulsion vector pointing radially away from cursor
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        }

        // --- Magnetic Pulse Ripple Effect ---
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

        // --- Restitution Spring Force (Hooke's Law) & Damping ---
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

      // 3. Render Lattice Nodes (clear, distinct magnetic fluid texture)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (p.disp < 0.5) {
          // Equilibrium resting dot: clearly visible, crisp coordinate grid
          ctx.fillStyle = baseDotFill;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Displaced dot: responsive, luminous accent shift
          const t = Math.min(1, p.disp / 16);
          const radius = 1.35 + t * 0.55;
          const alpha = isDark ? 0.25 + t * 0.38 : 0.22 + t * 0.33;

          ctx.fillStyle = `rgba(${activeDotR}, ${activeDotG}, ${activeDotB}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Intelligent Sleep State: Pause RAF when system has reached equilibrium
      if (!mouseActive && pulses.length === 0 && maxMotion < 0.02) {
        // Snap any negligible residual displacement back to exact equilibrium
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          p.x = p.origX;
          p.y = p.origY;
          p.vx = 0;
          p.vy = 0;
          p.disp = 0;
        }
        // One final crisp draw to ensure zero sub-pixel blur
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = baseDotFill;
        for (let i = 0; i < points.length; i++) {
          ctx.beginPath();
          ctx.arc(points[i].origX, points[i].origY, 1.35, 0, Math.PI * 2);
          ctx.fill();
        }

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
      themeObserver.disconnect();
      colorSchemeQuery.removeEventListener("change", handleSchemeChange);
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
