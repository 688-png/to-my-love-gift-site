import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Milestone } from '../config/romantic-content';
import {
  Coffee,
  MessageCircleHeart,
  Flame,
  Compass,
  HeartHandshake,
  Calendar,
  MapPin,
  ChevronRight,
  Heart,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  MessageCircleHeart,
  Flame,
  Compass,
  HeartHandshake,
  Calendar,
  Heart,
  BookOpen,
};

export const Timeline: React.FC = () => {
  const { content } = useRomantic();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-[#B94F68]" />
          <span>Chapter by Chapter</span>
          <span aria-hidden="true">·</span>
          <span>Our Journey</span>
        </div>
        <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
          Our Story
        </h2>
        <p className="text-base text-[#705E64] leading-relaxed font-normal">
          Every meaningful chapter that brought us to this exact moment. Click any milestone to
          unfold the full memory.
        </p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative">
        {/* Central Spine Line */}
        <div
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#B94F68]/30 via-[#702D40]/25 to-[#B94F68]/30 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {content.milestones.map((milestone: Milestone, index: number) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedId === milestone.id;
            const IconComponent = iconMap[milestone.iconName] || Heart;

            return (
              <div
                key={milestone.id}
                className="relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* Mobile & Desktop Center Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#FFF9F5] border-2 border-[#B94F68] shadow-xs flex items-center justify-center text-[#702D40] transition-transform hover:scale-110">
                    <IconComponent className="w-5 h-5 text-[#702D40]" />
                  </div>
                </div>

                {/* Left Column (Desktop) */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:hidden'
                  }`}
                >
                  {isEven && (
                    <TimelineCard
                      milestone={milestone}
                      isExpanded={isExpanded}
                      onToggle={() => toggleExpand(milestone.id)}
                      align="right"
                    />
                  )}
                </div>

                {/* Right Column (Desktop & Mobile) */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-12 ${
                    !isEven ? 'md:block' : 'md:hidden'
                  }`}
                >
                  <TimelineCard
                    milestone={milestone}
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpand(milestone.id)}
                    align="left"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface TimelineCardProps {
  milestone: Milestone;
  isExpanded: boolean;
  onToggle: () => void;
  align: 'left' | 'right';
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  milestone,
  isExpanded,
  onToggle,
  align,
}) => {
  return (
    <div
      onClick={onToggle}
      className="group cursor-pointer bg-white/90 hover:bg-white border border-[#E5CCD2] hover:border-[#B94F68] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Date & Location unboxed metadata */}
      <div
        className={`flex items-center gap-2 text-xs text-[#702D40] font-medium mb-2 ${
          align === 'right' ? 'md:justify-end' : 'justify-start'
        }`}
      >
        <Calendar className="w-3.5 h-3.5 text-[#B94F68]" />
        <span>{milestone.date}</span>
        {milestone.location && (
          <>
            <span aria-hidden="true">·</span>
            <MapPin className="w-3.5 h-3.5 text-[#B94F68]" />
            <span>{milestone.location}</span>
          </>
        )}
      </div>

      {/* Milestone Title */}
      <h3 className="font-serif-heading text-xl sm:text-2xl text-[#702D40] mb-2 group-hover:text-[#B94F68] transition-colors">
        {milestone.title}
      </h3>

      {/* Short Story */}
      <p className="text-sm text-[#302329]/80 leading-relaxed font-normal mb-3">
        {milestone.shortStory}
      </p>

      {/* Expand/Collapse prompt */}
      {milestone.detailedMemory && (
        <div
          className={`flex items-center gap-1.5 text-xs text-[#B94F68] font-medium pt-1 ${
            align === 'right' ? 'md:justify-end' : 'justify-start'
          }`}
        >
          <span>{isExpanded ? 'Fold memory' : 'Read full memory'}</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'
            }`}
          />
        </div>
      )}

      {/* Expanded Details Drawer */}
      <AnimatePresence>
        {isExpanded && milestone.detailedMemory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[#E5CCD2] text-xs sm:text-sm text-[#302329]/90 italic font-editorial leading-relaxed bg-[#FFF9F5] p-3.5 rounded-xl">
              &ldquo;{milestone.detailedMemory}&rdquo;
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
