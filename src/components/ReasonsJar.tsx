import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { JarNote } from '../config/romantic-content';
import { RefreshCw, Heart, MessageSquareHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReasonsJar: React.FC = () => {
  const { content } = useRomantic();
  const [currentNote, setCurrentNote] = useState<JarNote | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawNote = () => {
    setIsDrawing(true);
    setTimeout(() => {
      let availableNotes = content.jarNotes.filter(n => !seenIds.includes(n.id));
      if (availableNotes.length === 0) {
        availableNotes = content.jarNotes;
        setSeenIds([]);
      }

      const picked = availableNotes[Math.floor(Math.random() * availableNotes.length)];
      setCurrentNote(picked);
      setSeenIds(prev => (prev.includes(picked.id) ? [picked.id] : [...prev, picked.id]));
      setIsDrawing(false);
    }, 350);
  };

  const getNoteBadgeLabel = (type: JarNote['type']) => {
    switch (type) {
      case 'compliment':
        return 'Sweet Compliment';
      case 'memory':
        return 'Precious Memory';
      case 'joke':
        return 'Inside Joke';
      case 'sweet':
        return 'Affectionate Note';
    }
  };

  return (
    <div className="bg-white/90 border border-[#E5CCD2] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40]">
            <MessageSquareHeart className="w-4 h-4 text-[#702D40]" />
          </div>
          <div>
            <h3 className="font-serif-heading text-xl text-[#702D40]">A Jar of Little Notes</h3>
            <span className="text-xs text-[#705E64] font-normal">
              Folded paper slips of love &amp; memories
            </span>
          </div>
        </div>
        <p className="text-xs text-[#705E64] mb-5 font-normal">
          Tap the glass jar to pull out a randomized handwritten folded slip.
        </p>
      </div>

      {/* Visual Glass Jar Graphic & Drawn Note */}
      <div className="relative py-4 flex flex-col items-center">
        {/* Animated Glass Jar */}
        <div
          onClick={drawNote}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              drawNote();
            }
          }}
          className={`relative w-40 h-48 rounded-b-3xl rounded-t-xl border-4 border-[#E5CCD2] bg-gradient-to-b from-white/90 via-[#F3E1E5]/40 to-[#FFF9F5]/70 shadow-lg cursor-pointer flex flex-col items-center justify-center overflow-hidden group transition-all duration-300 hover:border-[#B94F68] hover:shadow-xl ${
            isDrawing ? 'scale-95' : 'hover:-translate-y-1'
          }`}
          aria-label="Draw a folded note from the jar"
        >
          {/* Jar Lid */}
          <div className="absolute top-0 left-3 right-3 h-4 bg-[#702D40] rounded-sm shadow-xs border-b border-[#B94F68]" />
          {/* Jar Neck Ribbon */}
          <div className="absolute top-4 left-4 right-4 h-1.5 bg-[#B94F68] rounded-full" />

          {/* Little folded paper slips floating in the jar */}
          <div className="relative w-full h-full flex flex-wrap items-center justify-center p-4 gap-1.5 pt-8 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  transform: `rotate(${(i * 27) % 60 - 30}deg)`,
                }}
                className="w-7 h-4 bg-white rounded-xs border border-[#E5CCD2] shadow-2xs group-hover:scale-105 transition-transform"
              />
            ))}
          </div>

          {/* Jar label on front */}
          <div className="absolute inset-x-4 py-1.5 bg-white/95 rounded-lg border border-[#E5CCD2] text-center shadow-xs">
            <span className="font-serif-heading text-xs text-[#702D40] font-semibold block">
              100 Little Reasons
            </span>
            <span className="text-[10px] text-[#B94F68] uppercase tracking-wider">
              {content.jarNotes.length} notes inside
            </span>
          </div>
        </div>

        {/* Drawn Note Card */}
        <div className="w-full mt-6 min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentNote ? (
              <motion.div
                key={currentNote.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white border border-[#E5CCD2] rounded-2xl p-4 shadow-sm relative text-center"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#B94F68] font-semibold">
                    {getNoteBadgeLabel(currentNote.type)}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#702D40] fill-[#702D40]" />
                </div>
                <p className="font-editorial text-base sm:text-lg text-[#702D40] italic font-medium leading-snug">
                  &ldquo;{currentNote.text}&rdquo;
                </p>
              </motion.div>
            ) : (
              <div className="text-center p-3 text-xs text-[#705E64] italic">
                Tap the jar above or click the button below to draw your first note
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E5CCD2] text-xs">
        <span className="text-[#705E64] text-[11px]">
          {seenIds.length} of {content.jarNotes.length} drawn
        </span>

        <button
          onClick={drawNote}
          disabled={isDrawing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#702D40] hover:bg-[#8F354F] text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
          <span>{currentNote ? 'Draw Another Note' : 'Draw A Note'}</span>
        </button>
      </div>
    </div>
  );
};
