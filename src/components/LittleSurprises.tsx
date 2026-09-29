import React, { useState } from 'react';
import { LoveQuiz } from './LoveQuiz';
import { ScratchCard } from './ScratchCard';
import { OpenWhenLetters } from './OpenWhenLetters';
import { ReasonsJar } from './ReasonsJar';
import { Gift } from 'lucide-react';

export const LittleSurprises: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'quiz' | 'scratch' | 'letters' | 'jar'>('all');

  return (
    <section id="surprises" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
          <Gift className="w-3.5 h-3.5 text-[#B94F68]" />
          <span>Interactive Magic</span>
          <span aria-hidden="true">·</span>
          <span>Made for Two</span>
        </div>
        <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
          Little Surprises
        </h2>
        <p className="text-base text-[#705E64] font-normal leading-relaxed">
          Playful games, sealed envelopes, secret scratch notes, and a jar filled with our warmest
          thoughts. Take your time exploring each one.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white/90 border border-[#E5CCD2] rounded-2xl max-w-md mx-auto mt-8 shadow-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#702D40] text-white shadow-xs'
                : 'text-[#705E64] hover:text-[#702D40]'
            }`}
          >
            All Surprises
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#702D40] text-white shadow-xs'
                : 'text-[#705E64] hover:text-[#702D40]'
            }`}
          >
            Love Quiz
          </button>
          <button
            onClick={() => setActiveTab('scratch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'scratch'
                ? 'bg-[#702D40] text-white shadow-xs'
                : 'text-[#705E64] hover:text-[#702D40]'
            }`}
          >
            Scratch Card
          </button>
          <button
            onClick={() => setActiveTab('letters')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'letters'
                ? 'bg-[#702D40] text-white shadow-xs'
                : 'text-[#705E64] hover:text-[#702D40]'
            }`}
          >
            Letters
          </button>
          <button
            onClick={() => setActiveTab('jar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'jar'
                ? 'bg-[#702D40] text-white shadow-xs'
                : 'text-[#705E64] hover:text-[#702D40]'
            }`}
          >
            Jar of Notes
          </button>
        </div>
      </div>

      {/* Grid of Surprises */}
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'letters') && (
          <div>
            <OpenWhenLetters />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'quiz' || activeTab === 'scratch' || activeTab === 'jar') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(activeTab === 'all' || activeTab === 'quiz') && <LoveQuiz />}
            {(activeTab === 'all' || activeTab === 'scratch') && <ScratchCard />}
            {(activeTab === 'all' || activeTab === 'jar') && (
              <div className={activeTab === 'all' ? 'lg:col-span-2 max-w-xl mx-auto w-full' : 'w-full'}>
                <ReasonsJar />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
