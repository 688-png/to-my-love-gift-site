import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Key, Eye, RotateCcw, Heart } from 'lucide-react';

export const ScratchCard: React.FC = () => {
  const { content } = useRomantic();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isScratchedOff, setIsScratchedOff] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);

  // Initialize canvas with rose gold / blush editorial foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = (canvas.width = rect.width);
    const height = (canvas.height = rect.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B94F68');
    grad.addColorStop(0.3, '#F3E1E5');
    grad.addColorStop(0.5, '#E5CCD2');
    grad.addColorStop(0.7, '#F3E1E5');
    grad.addColorStop(1, '#8F354F');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative stippled shimmer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 60; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rsize = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centered label on the foil
    ctx.fillStyle = '#702D40';
    ctx.font = '600 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch here with finger or mouse ✨', width / 2, height / 2);

    setIsScratchedOff(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const scratchAt = (clientX: number, clientY: number) => {
    if (isScratchedOff) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchPercent();
  };

  const calculateScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const sampleStep = 32;

      for (let i = 3; i < data.length; i += 4 * sampleStep) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const totalSampled = data.length / (4 * sampleStep);
      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent > 45) {
        setIsScratchedOff(true);
      }
    } catch {
      // ignore
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      isDrawingRef.current = true;
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current || !e.touches[0]) return;
    scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  const handleRevealAll = () => {
    setIsScratchedOff(true);
    setScratchPercent(100);
  };

  return (
    <div className="bg-white/90 border border-[#E5CCD2] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40]">
            <Key className="w-4 h-4 text-[#702D40]" />
          </div>
          <div>
            <h3 className="font-serif-heading text-xl text-[#702D40]">Scratch-to-Reveal</h3>
            <span className="text-xs text-[#705E64] font-normal">
              {content.scratchCard.subtitle}
            </span>
          </div>
        </div>
        <p className="text-xs text-[#705E64] mb-5 font-normal">
          {content.scratchCard.scratchPrompt}
        </p>
      </div>

      {/* Canvas scratch container */}
      <div
        ref={containerRef}
        className="relative w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-[#E5CCD2] my-3 flex items-center justify-center select-none"
      >
        {/* Underneath Hidden Message */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F5] to-[#F3E1E5] p-6 flex flex-col items-center justify-center text-center">
          <Heart className="w-6 h-6 text-[#B94F68] fill-[#B94F68]/40 mb-2 animate-bounce" />
          <p className="font-editorial text-lg sm:text-xl text-[#702D40] font-semibold italic leading-snug">
            &ldquo;{content.scratchCard.hiddenMessage}&rdquo;
          </p>
          <span className="font-script text-sm text-[#B94F68] mt-2">forever yours</span>
        </div>

        {/* Scratch Canvas Foil */}
        {!isScratchedOff && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 cursor-crosshair touch-none"
          />
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-3 text-xs text-[#705E64]">
        <span>{isScratchedOff ? '100% Uncovered ✨' : `${scratchPercent}% scratched`}</span>

        <div className="flex items-center gap-2">
          {!isScratchedOff ? (
            <button
              onClick={handleRevealAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E1E5]/80 hover:bg-[#F3E1E5] text-[#702D40] font-medium transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Message</span>
            </button>
          ) : (
            <button
              onClick={initCanvas}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#702D40] hover:bg-[#F3E1E5]/50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cover Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
