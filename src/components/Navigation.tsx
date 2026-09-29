import React, { useState, useEffect } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Volume2, VolumeX, Heart } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { isPlayingMusic, toggleMusic } = useRomantic();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'timeline', 'letter', 'reasons', 'gallery', 'surprises', 'bucketlist'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#E5CCD2] shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer"
        >
          <span className="font-editorial text-2xl font-semibold tracking-tight text-[#702D40] transition-colors group-hover:text-[#B94F68]">
            Our Little World
          </span>
          <Heart className="w-3.5 h-3.5 text-[#B94F68] fill-[#B94F68]/30 transition-transform group-hover:scale-125" />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#705E64]">
          <button
            onClick={() => scrollTo('timeline')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'timeline' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            Our Story
            {activeSection === 'timeline' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
          <button
            onClick={() => scrollTo('letter')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'letter' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            Love Letter
            {activeSection === 'letter' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
          <button
            onClick={() => scrollTo('reasons')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'reasons' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            12 Reasons
            {activeSection === 'reasons' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'gallery' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            Scrapbook
            {activeSection === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
          <button
            onClick={() => scrollTo('surprises')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'surprises' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            Little Surprises
            {activeSection === 'surprises' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
          <button
            onClick={() => scrollTo('bucketlist')}
            className={`hover:text-[#702D40] transition-colors relative py-1 cursor-pointer ${
              activeSection === 'bucketlist' ? 'text-[#702D40] font-semibold' : ''
            }`}
          >
            Bucket List
            {activeSection === 'bucketlist' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B94F68] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Ambient Music Toggle) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            aria-label={isPlayingMusic ? 'Mute ambient melody' : 'Play ambient melody'}
            title={isPlayingMusic ? 'Mute ambient melody' : 'Play gentle background chords'}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all border cursor-pointer ${
              isPlayingMusic
                ? 'bg-[#702D40] text-white border-[#702D40] shadow-xs'
                : 'bg-white/90 text-[#302329] border-[#E5CCD2] hover:border-[#B94F68] hover:bg-white'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F3E1E5] animate-pulse" />
                <span>Melody Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#705E64]" />
                <span>Play Melody</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
