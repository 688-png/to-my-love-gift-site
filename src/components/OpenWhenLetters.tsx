import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { OpenWhenLetter } from '../config/romantic-content';
import {
  Mail,
  HeartHandshake,
  Shield,
  Music,
  Clock,
  Crown,
  Heart,
  X,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ElementType> = {
  HeartHandshake,
  Shield,
  Music,
  Clock,
  Crown,
  Heart,
};

export const OpenWhenLetters: React.FC = () => {
  const { content } = useRomantic();
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    setActiveLetter(letter);
    if (!openedIds.includes(letter.id)) {
      setOpenedIds(prev => [...prev, letter.id]);
    }
  };

  return (
    <div className="bg-white/90 border border-[#E5CCD2] rounded-3xl p-6 sm:p-10 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5CCD2] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40]">
            <Mail className="w-4 h-4 text-[#702D40]" />
          </div>
          <div>
            <h3 className="font-serif-heading text-xl text-[#702D40]">Open-When Letters</h3>
            <span className="text-xs text-[#705E64] font-normal">
              Always here for you, in every circumstance
            </span>
          </div>
        </div>

        <span className="text-xs text-[#B94F68] font-medium">
          {openedIds.length} of {content.openWhenLetters.length} opened
        </span>
      </div>

      {/* Grid of Sealed Mini Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.openWhenLetters.map((letter: OpenWhenLetter) => {
          const isOpened = openedIds.includes(letter.id);
          const IconComponent = iconMap[letter.accentIcon] || Heart;

          return (
            <button
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="group text-left p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF9F5] hover:to-[#F3E1E5]/40 border border-[#E5CCD2] hover:border-[#B94F68] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between h-36"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40] group-hover:scale-110 transition-transform">
                  <IconComponent className="w-4 h-4" />
                </div>
                {isOpened && (
                  <span className="flex items-center gap-1 text-[11px] text-[#B94F68] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Opened</span>
                  </span>
                )}
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#B94F68] font-semibold block mb-0.5">
                  Open when...
                </span>
                <h4 className="font-serif-heading text-sm sm:text-base text-[#702D40] font-medium leading-snug group-hover:text-[#8F354F]">
                  {letter.prompt.replace(/^Open when\s+/i, '')}
                </h4>
              </div>

              <div className="text-[11px] text-[#705E64] flex items-center justify-between pt-1">
                <span>Tap to read letter</span>
                <span className="text-[#B94F68]">&rarr;</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-[#E5CCD2] rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3E1E5] hover:bg-[#E5CCD2] text-[#702D40] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#B94F68] font-semibold uppercase tracking-wider mb-2">
                <Heart className="w-3.5 h-3.5 fill-[#B94F68]" />
                <span>{activeLetter.prompt}</span>
              </div>

              <h4 className="font-serif-heading text-2xl text-[#702D40] mb-4">
                {activeLetter.title}
              </h4>

              <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#E5CCD2] mb-6">
                <p className="text-sm sm:text-base text-[#302329]/85 font-editorial italic leading-relaxed">
                  &ldquo;{activeLetter.letter}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5CCD2]">
                <span className="font-script text-2xl text-[#702D40]">
                  {activeLetter.signature}
                </span>

                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-4 py-1.5 rounded-full bg-[#702D40] hover:bg-[#8F354F] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Return to Envelopes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
