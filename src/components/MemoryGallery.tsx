import React, { useState, useEffect, useRef } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { GalleryPhoto } from '../config/romantic-content';
import { Camera, X, Calendar, ZoomIn, Heart, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';

export const MemoryGallery: React.FC = () => {
  const { content } = useRomantic();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 bg-[#F3E1E5]/25 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-[#B94F68]" />
            <span>Captured in Time</span>
            <span aria-hidden="true">·</span>
            <span>Our Scrapbook</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
            Our Memories
          </h2>
          <p className="text-base text-[#705E64] font-normal leading-relaxed">
            Little snapshots of sunlight, laughter, and places that became sacred because we shared
            them together.
          </p>
        </div>

        {/* Polaroid Scrapbook Grid with Parallax Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.gallery.map((photo: GalleryPhoto, index: number) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              index={index}
              onSelect={setSelectedPhoto}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#702D40] flex items-center justify-center shadow-md transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="w-full md:w-3/5 bg-neutral-900 flex items-center justify-center min-h-[300px] md:min-h-[440px]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Details Pane */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#B94F68] font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.date}</span>
                  </div>

                  <h3 className="font-serif-heading text-2xl text-[#702D40] mb-3">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-sm text-[#705E64] leading-relaxed font-normal mb-4">
                    {selectedPhoto.caption}
                  </p>

                  {selectedPhoto.note && (
                    <div className="p-3 bg-[#F3E1E5]/50 rounded-xl border border-[#E5CCD2]">
                      <span className="text-[11px] uppercase tracking-wider text-[#B94F68] block mb-0.5">
                        Scrapbook Note
                      </span>
                      <p className="font-script text-lg text-[#702D40]">
                        &ldquo;{selectedPhoto.note}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#E5CCD2] flex items-center justify-between text-xs text-[#705E64]">
                  <div className="flex items-center gap-1 text-[#B94F68]">
                    <Heart className="w-3.5 h-3.5 fill-[#B94F68]" />
                    <span>Forever Cherished</span>
                  </div>
                  <span className="text-[11px]">Press ESC to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface PolaroidCardProps {
  photo: GalleryPhoto;
  index: number;
  onSelect: (photo: GalleryPhoto) => void;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ photo, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll observer specifically bounded to this card's viewport transit
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Smooth vertical parallax translation inside the card's clipped viewport
  const parallaxOffset = index % 2 === 0 ? 16 : 22;
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-parallaxOffset, parallaxOffset]
  );

  // Subtle complementary card levitation as the user scrolls through the gallery
  const cardFloatY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [index % 2 === 0 ? 10 : -10, index % 2 === 0 ? -10 : 10]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: cardFloatY,
        rotate: photo.rotationDeg || 0,
      }}
      onClick={() => onSelect(photo)}
      className="group cursor-pointer bg-white p-4 pb-6 rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-300 hover:rotate-0 hover:scale-[1.03] hover:z-20 relative flex flex-col will-change-transform"
    >
      {/* Washi tape decorative illusion on top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#F3E1E5] backdrop-blur-xs shadow-2xs transform -rotate-1 pointer-events-none border-t border-b border-[#E5CCD2] z-20"
        aria-hidden="true"
      />

      {/* Parallax Image Container (clipped viewport) */}
      <div className="relative aspect-4/3 w-full bg-[#F3E1E5]/40 overflow-hidden rounded-xs mb-4">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-6 -bottom-6 w-full h-[calc(100%+3rem)] will-change-transform"
        >
          <PolaroidImage src={photo.imageUrl} alt={photo.title} />
        </motion.div>

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-[#702D40]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="w-9 h-9 rounded-full bg-white/90 text-[#702D40] flex items-center justify-center shadow-sm">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Handwritten style caption & date */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          <h3 className="font-serif-heading text-base text-[#702D40] font-medium leading-snug mb-1">
            {photo.title}
          </h3>
          <p className="text-xs text-[#705E64] font-normal line-clamp-2">
            {photo.caption}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-dashed border-[#E5CCD2] flex items-center justify-between text-[11px] text-[#B94F68]">
          <span className="font-script text-sm text-[#702D40]">{photo.note || 'sweet memory'}</span>
          <span>{photo.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

const PolaroidImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F5] to-[#F3E1E5] p-4 text-center">
        <ImageIcon className="w-8 h-8 text-[#B94F68] mb-2 opacity-60" />
        <span className="text-xs font-serif-heading text-[#702D40]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
};
