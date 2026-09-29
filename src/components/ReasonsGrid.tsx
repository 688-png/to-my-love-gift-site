import React from 'react';
import { useRomantic } from '../context/RomanticContext';
import { SpecialReason } from '../config/romantic-content';
import {
  Heart,
  Coffee,
  Bookmark,
  Lightbulb,
  Shield,
  Sun,
  Star,
  Flame,
  Eye,
  Music,
  Award,
  Infinity as InfinityIcon,
  Shuffle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  Bookmark,
  Heart,
  Lightbulb,
  Shield,
  Sun,
  Star,
  Flame,
  Eye,
  Music,
  Award,
  Infinity: InfinityIcon,
};

export const ReasonsGrid: React.FC = () => {
  const {
    content,
    revealedReasons,
    revealReason,
    revealAllReasons,
    resetReasons,
  } = useRomantic();

  const handleRevealRandom = () => {
    const unrevealed = content.reasons.filter(r => !revealedReasons.includes(r.id));
    if (unrevealed.length > 0) {
      const randomItem = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      revealReason(randomItem.id);
    }
  };

  const isCardRevealed = (id: number) => revealedReasons.includes(id);

  return (
    <section id="reasons" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
          <Bookmark className="w-3.5 h-3.5 text-[#B94F68]" />
          <span>Twelve Little Wonders</span>
          <span aria-hidden="true">·</span>
          <span>Endless Admiration</span>
        </div>
        <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
          Reasons You Are Special
        </h2>
        <p className="text-base text-[#705E64] font-normal leading-relaxed mb-6">
          A few of the countless qualities that make you so deeply loved. Click any card to flip
          and reveal what's inside.
        </p>

        {/* Status Tracker & Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#702D40] font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#B94F68]" />
            <span>
              {revealedReasons.length} of {content.reasons.length} revealed
            </span>
          </div>

          <div className="h-3 w-px bg-[#E5CCD2] hidden sm:block" />

          <button
            onClick={handleRevealRandom}
            disabled={revealedReasons.length === content.reasons.length}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E1E5]/80 hover:bg-[#F3E1E5] text-[#702D40] font-medium transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Show me another</span>
          </button>

          {revealedReasons.length > 0 && (
            <button
              onClick={resetReasons}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#705E64] hover:text-[#702D40] hover:bg-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all</span>
            </button>
          )}

          {revealedReasons.length < content.reasons.length && (
            <button
              onClick={revealAllReasons}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#705E64] hover:text-[#702D40] transition-colors cursor-pointer"
            >
              <span>Reveal all</span>
            </button>
          )}
        </div>
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {content.reasons.map((reason: SpecialReason) => {
          const revealed = isCardRevealed(reason.id);
          const IconComponent = iconMap[reason.iconName] || Heart;

          return (
            <div
              key={reason.id}
              className="perspective-1000 h-64 cursor-pointer focus:outline-none"
              onClick={() => revealReason(reason.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  revealReason(reason.id);
                }
              }}
              aria-label={`Reason ${reason.id}: ${revealed ? reason.title : reason.teaser}`}
            >
              <div
                className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                  revealed ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE (Teaser) */}
                <div className="absolute inset-0 backface-hidden bg-white/90 hover:bg-white border border-[#E5CCD2] hover:border-[#B94F68] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-xl font-semibold text-[#B94F68] tabular-nums">
                      #{String(reason.id).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4 text-[#702D40]" />
                    </div>
                  </div>

                  <div className="my-auto text-center py-2">
                    <h3 className="font-serif-heading text-lg text-[#702D40] mb-1">
                      {reason.teaser}
                    </h3>
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] uppercase tracking-wider text-[#B94F68] font-medium group-hover:text-[#702D40] transition-colors">
                      Click to reveal
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Full Compliment) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-white to-[#FBF1F3] border border-[#E5CCD2] rounded-2xl p-6 flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-[#E5CCD2] pb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#B94F68] font-semibold">
                      Reason #{reason.id}
                    </span>
                    <Heart className="w-3.5 h-3.5 text-[#702D40] fill-[#702D40]" />
                  </div>

                  <div className="my-auto py-2">
                    <h3 className="font-serif-heading text-base font-semibold text-[#702D40] mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#302329]/85 leading-relaxed font-normal font-editorial">
                      {reason.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#702D40]/60 font-script text-base">
                      with love
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
