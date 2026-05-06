import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let particles: Particle[] = [];
    let time = 0;

    const initStars = (w: number, h: number) => {
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const spawnParticle = (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 1.5 + 0.5,
      opacity: 0,
      color: Math.random() > 0.5 ? "0,229,255" : "108,99,255",
      life: 0,
      maxLife: Math.random() * 200 + 100,
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    resize();
    // Seed initial particles
    for (let i = 0; i < 20; i++) {
      const p = spawnParticle(canvas.width, canvas.height);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      time++;

      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#05070D");
      grad.addColorStop(0.5, "#0B0F1A");
      grad.addColorStop(1, "#080C15");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.speed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle})`;
        ctx.fill();
      }

      // Draw and update particles
      particles = particles.filter((p) => p.life < p.maxLife);
      while (particles.length < 25) {
        particles.push(spawnParticle(w, h));
      }

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        p.opacity =
          progress < 0.1
            ? progress * 10
            : progress > 0.8
              ? (1 - progress) * 5
              : 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity * 0.7})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color},0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
