import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Mail, RefreshCw, Heart, Calendar, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoveLetter: React.FC = () => {
  const { content } = useRomantic();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="py-24 px-4 sm:px-6 bg-[#F3E1E5]/30 relative overflow-hidden">
      {/* Background ambient elements */}
      <div
        className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-[#F3E1E5]/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#B94F68]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
            <Feather className="w-3.5 h-3.5 text-[#B94F68]" />
            <span>Unspoken Thoughts</span>
            <span aria-hidden="true">·</span>
            <span>From the Heart</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
            The Love Letter
          </h2>
          <p className="text-base text-[#705E64] font-normal leading-relaxed">
            Written with complete sincerity for quiet evenings and long tomorrows. Click the
            envelope below to unseal.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md cursor-pointer group"
                onClick={() => setIsOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOpen(true);
                  }
                }}
                aria-label="Open the sealed love letter"
              >
                <div className="relative bg-[#FFF9F5] border border-[#E5CCD2] rounded-2xl shadow-md p-8 sm:p-12 text-center transition-all duration-300 group-hover:shadow-xl group-hover:border-[#B94F68] group-hover:-translate-y-1">
                  {/* Decorative envelope fold line */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#B94F68]/40 via-[#702D40]/30 to-[#B94F68]/40 rounded-t-2xl" />

                  {/* Wax Seal Embellishment */}
                  <div className="relative mx-auto w-20 h-20 rounded-full bg-[#702D40] shadow-inner flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full border border-[#B18A45]/40 flex items-center justify-center">
                      <Heart className="w-7 h-7 text-[#F3E1E5] fill-[#F3E1E5]" />
                    </div>
                  </div>

                  <span className="text-xs uppercase tracking-[0.25em] text-[#B94F68] font-semibold block mb-2">
                    A Private Letter for You
                  </span>
                  <h3 className="font-serif-heading text-2xl text-[#702D40] mb-3">
                    To {content.partner2.nickname || content.partner2.name}
                  </h3>
                  <p className="text-xs text-[#705E64] mb-6 font-normal">
                    Sealed with affection. Tap to open and read.
                  </p>

                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#702D40] hover:bg-[#8F354F] text-white text-xs font-medium rounded-full shadow-xs transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Unseal &amp; Read Letter</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter Parchment */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl bg-white border border-[#E5CCD2] rounded-3xl p-8 sm:p-14 shadow-xl relative"
              >
                {/* Subtle paper border */}
                <div className="absolute inset-2 border border-[#F3E1E5] rounded-2xl pointer-events-none" />

                {/* Top letter controls */}
                <div className="flex items-center justify-between border-b border-[#E5CCD2] pb-6 mb-8 text-xs text-[#705E64]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#B94F68]" />
                    <span className="font-editorial text-sm italic text-[#702D40]">
                      {content.loveLetter.date || 'A quiet evening just for us'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#702D40] hover:bg-[#F3E1E5]/60 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3 text-[#B94F68]" />
                    <span>Fold back into envelope</span>
                  </button>
                </div>

                {/* Salutation */}
                <div className="font-serif-heading text-2xl sm:text-3xl text-[#702D40] mb-6">
                  {content.loveLetter.salutation}
                </div>

                {/* Body Paragraphs */}
                <div className="space-y-5 text-sm sm:text-base text-[#302329]/85 leading-relaxed font-normal font-editorial">
                  {content.loveLetter.paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="indent-4 sm:indent-6">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Closing & Signature */}
                <div className="mt-10 pt-6 border-t border-[#E5CCD2] flex flex-col items-end">
                  <span className="text-xs uppercase tracking-wider text-[#705E64] mb-1">
                    {content.loveLetter.closing}
                  </span>
                  <span className="font-script text-3xl sm:text-4xl text-[#702D40] tracking-wide transform -rotate-2">
                    {content.loveLetter.signature}
                  </span>
                </div>

                {/* P.S. Note */}
                {content.loveLetter.psNote && (
                  <div className="mt-8 pt-4 border-t border-dashed border-[#E5CCD2] text-xs sm:text-sm text-[#702D40]/85 italic font-editorial">
                    {content.loveLetter.psNote}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
