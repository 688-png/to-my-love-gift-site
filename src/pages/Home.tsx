import React from 'react';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { LoveLetter } from '../components/LoveLetter';
import { ReasonsGrid } from '../components/ReasonsGrid';
import { MemoryGallery } from '../components/MemoryGallery';
import { LittleSurprises } from '../components/LittleSurprises';
import { BucketList } from '../components/BucketList';
import { FinalSurprise } from '../components/FinalSurprise';
import { useRomantic } from '../context/RomanticContext';
import { Heart } from 'lucide-react';

export const Home: React.FC = () => {
  const { content } = useRomantic();

  return (
    <div className="relative w-full overflow-x-hidden bg-[#FFF9F5]">
      {/* 1. Fullscreen Hero */}
      <Hero />

      {/* 2. Relationship Timeline */}
      <Timeline />

      {/* 3. The Love Letter Envelope */}
      <LoveLetter />

      {/* 4. Reasons You Are Special */}
      <ReasonsGrid />

      {/* 5. Scrapbook Photo Gallery */}
      <MemoryGallery />

      {/* 6. Little Surprises (Quiz, Scratch Card, Open-When, Jar) */}
      <LittleSurprises />

      {/* 7. Shared Bucket List */}
      <BucketList />

      {/* 8. The Final Surprise */}
      <FinalSurprise />

      {/* Clean Editorial Footer */}
      <footer className="bg-[#150B0F] border-t border-[#702D40]/40 text-[#F3E1E5]/60 py-8 px-4 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#F3E1E5]/85 font-medium">
            <span>Our Little World</span>
            <span aria-hidden="true">·</span>
            <span className="font-editorial italic">
              {content.partner1.name} &amp; {content.partner2.name}
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-[11px] text-[#F3E1E5]/60">
            Crafted with <Heart className="w-3 h-3 text-[#B94F68] fill-[#B94F68]" /> for our love story
          </p>

          <span className="text-[11px] text-[#F3E1E5]/40">
            Since {content.anniversaryFormatted}
          </span>
        </div>
      </footer>
    </div>
  );
};
