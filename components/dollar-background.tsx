"use client";

import { useEffect, useRef } from "react";

export function DollarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const dollarSigns: { x: number; y: number; size: number; speed: number }[] = [];
    const gridSize = 60;
    const cols = Math.ceil(window.innerWidth / gridSize) + 2;
    const rows = Math.ceil(window.innerHeight / gridSize) + 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dollarSigns.push({
          x: i * gridSize,
          y: j * gridSize,
          size: 14 + Math.random() * 4,
          speed: 0.3 + Math.random() * 0.4,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dollarSigns.forEach((dollar, index) => {
        const waveX = Math.sin(time * dollar.speed + index * 0.1) * 15;
        const waveY = Math.cos(time * dollar.speed * 0.8 + index * 0.15) * 10;

        const distanceFromCenter = Math.abs(dollar.x - canvas.width / 2) / (canvas.width / 2);
        const opacity = 0.08 - distanceFromCenter * 0.04;

        ctx.font = `${dollar.size}px monospace`;
        ctx.fillStyle = `rgba(74, 222, 128, ${Math.max(0.02, opacity)})`;
        ctx.fillText("$", dollar.x + waveX, dollar.y + waveY);
      });

      time += 0.008;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
