import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Heart, ArrowUp, Star, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const FinalSurprise: React.FC = () => {
  const { content } = useRomantic();
  const [isRevealed, setIsRevealed] = useState(false);
  const [answerChoice, setAnswerChoice] = useState<string | null>(null);

  const handleReveal = () => {
    setIsRevealed(true);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B94F68', '#F3E1E5', '#FFF9F5', '#B18A45'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#B94F68', '#F3E1E5', '#B18A45'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#B94F68', '#F3E1E5', '#B18A45'],
        });
      }, 350);
    } catch {
      // ignore
    }
  };

  const handleAnswer = (choice: string) => {
    setAnswerChoice(choice);
    triggerCelebration();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="final-surprise"
      className="relative min-h-screen bg-gradient-to-b from-[#302329] via-[#23171D] to-[#150B0F] text-[#FFF9F5] px-4 sm:px-6 py-28 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Delicate starry particle backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 19) % 96}%`,
              left: `${(i * 29) % 96}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
            }}
            className="absolute w-1 h-1 bg-[#FFF9F5] rounded-full animate-ping"
          />
        ))}
      </div>

      {/* Subtle deep ambient glow */}
      <div
        className="absolute w-96 h-96 rounded-full bg-[#702D40]/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Unboxed Kicker */}
        <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#B94F68] font-semibold mb-4">
          <Star className="w-3.5 h-3.5 fill-[#B18A45] text-[#B18A45]" />
          <span>{content.finalSurprise.kicker}</span>
        </div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Closed State - Button Prompt */
            <motion.div
              key="closed-surprise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 flex flex-col items-center"
            >
              <h3 className="font-serif-heading text-3xl sm:text-4xl text-[#FFF9F5] font-normal mb-8 max-w-xl">
                There is still one small whisper waiting just for you.
              </h3>

              <button
                onClick={handleReveal}
                className="group px-8 py-4 bg-gradient-to-r from-[#B94F68] to-[#8F354F] hover:from-[#c95b75] hover:to-[#9f3f59] text-white font-semibold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-3"
              >
                <span>One last thing...</span>
                <Heart className="w-4 h-4 fill-white text-white transition-transform group-hover:scale-125" />
              </button>
            </motion.div>
          ) : (
            /* Revealed State - Cinematic Love Message */
            <motion.div
              key="opened-surprise"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <h3 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#FFF9F5] leading-tight font-normal mb-6 text-balance">
                {content.finalSurprise.headline}
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-[#F3E1E5]/90 font-light font-editorial leading-relaxed max-w-2xl mb-10">
                {content.finalSurprise.bodyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Optional Final Question */}
              {content.finalSurprise.question && (
                <div className="w-full max-w-xl bg-white/5 border border-[#E5CCD2]/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-10">
                  <p className="font-serif-heading text-xl sm:text-2xl text-[#FFF9F5] font-medium mb-6">
                    {content.finalSurprise.question}
                  </p>

                  {!answerChoice ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => handleAnswer(content.finalSurprise.yesButtonText)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#B94F68] hover:bg-[#8F354F] text-white font-medium text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>{content.finalSurprise.yesButtonText}</span>
                      </button>

                      <button
                        onClick={() => handleAnswer(content.finalSurprise.alwaysButtonText)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-[#E5CCD2]/40 text-[#FFF9F5] font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B94F68]" />
                        <span>{content.finalSurprise.alwaysButtonText}</span>
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-[#702D40]/60 rounded-2xl border border-[#B94F68]/50 text-center"
                    >
                      <Heart className="w-6 h-6 text-[#B18A45] fill-[#B18A45]/30 mx-auto mb-2" />
                      <p className="font-serif-heading text-lg text-[#FFF9F5] font-medium mb-1">
                        &ldquo;{answerChoice}&rdquo;
                      </p>
                      <p className="text-xs text-[#F3E1E5]">
                        {content.finalSurprise.celebrationMessage}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Signature */}
              <div className="flex flex-col items-center mb-12">
                <span className="font-script text-3xl sm:text-4xl text-[#B94F68]">
                  {content.finalSurprise.signature}
                </span>
                <span className="text-xs tracking-widest uppercase text-[#F3E1E5]/60 mt-1">
                  {content.partner1.name} &amp; {content.partner2.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="mt-8 flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3E1E5]/70 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to the beginning</span>
        </button>
      </div>
    </section>
  );
};
