import React, { useEffect, useRef } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { ChevronDown, Volume2, VolumeX, Compass, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { content, isPlayingMusic, toggleMusic } = useRomantic();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating delicate petals / sparkles canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      color: string;
    }

    const petals: Petal[] = [];
    const colors = [
      'rgba(185, 79, 104, 0.45)', // primary rose #B94F68
      'rgba(243, 225, 229, 0.70)', // secondary blush #F3E1E5
      'rgba(177, 138, 69, 0.35)',  // accent gold #B18A45
      'rgba(229, 204, 210, 0.50)', // border soft #E5CCD2
    ];

    for (let i = 0; i < 28; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.sin(Math.random() * 2) * 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, -p.size * 1.4, 0, -p.size * 2);
      ctx.bezierCurveTo(p.size, -p.size * 1.4, p.size / 2, -p.size, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.005) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleEnterWorld = () => {
    const target = document.getElementById('timeline');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-12 overflow-hidden bg-radial from-[#FFF9F5] via-[#FCF3ED] to-[#F7E7EC]"
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
        aria-hidden="true"
      />

      {/* Subtle warm glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F3E1E5]/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B94F68]/12 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Editorial unboxed kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#702D40] font-medium mb-4"
        >
          <Compass className="w-3.5 h-3.5 text-[#B94F68]" />
          <span>{content.hero.kicker}</span>
          <span aria-hidden="true">·</span>
          <span>{content.anniversaryFormatted}</span>
        </motion.div>

        {/* Personalized greeting */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-script text-3xl sm:text-4xl text-[#B94F68] mb-3"
        >
          {content.hero.greetingPrefix}, {content.partner2.nickname || content.partner2.name}...
        </motion.p>

        {/* Big Romantic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-heading text-4xl sm:text-5xl md:text-6xl text-[#702D40] leading-[1.18] font-semibold tracking-tight max-w-3xl mb-6 text-balance"
        >
          {content.hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[#705E64] max-w-2xl font-normal leading-relaxed mb-10 text-balance"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* Primary CTA & Interactive Melody Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleEnterWorld}
            className="group relative px-8 py-3.5 bg-[#702D40] hover:bg-[#8F354F] text-white rounded-full font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer"
          >
            <span>{content.hero.ctaText}</span>
            <Heart className="w-4 h-4 text-[#F3E1E5] fill-[#F3E1E5] transition-transform group-hover:scale-125" />
          </button>

          <button
            onClick={toggleMusic}
            aria-label="Toggle ambient romantic melody"
            className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-[#702D40] bg-white/85 hover:bg-white border border-[#E5CCD2] hover:border-[#B94F68] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-[#B94F68] animate-pulse" />
                <span>Ambient Melody (Active)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#705E64]" />
                <span>Play Romantic Chords</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Partners name attribution & relationship status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center gap-3 text-xs tracking-wider text-[#705E64]"
        >
          <span className="font-semibold text-[#702D40]">{content.partner1.name}</span>
          <span className="text-[#B94F68]">&amp;</span>
          <span className="font-semibold text-[#702D40]">{content.partner2.name}</span>
          <span aria-hidden="true">·</span>
          <span>{content.relationshipStatus}</span>
        </motion.div>
      </div>

      {/* Gentle Scroll Indicator */}
      <motion.button
        onClick={handleEnterWorld}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#705E64] hover:text-[#702D40] transition-colors cursor-pointer group"
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#B94F68] group-hover:text-[#702D40]" />
      </motion.button>
    </section>
  );
};
