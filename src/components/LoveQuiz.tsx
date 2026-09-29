import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { Check, HelpCircle, RotateCcw, HeartHandshake, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveQuiz: React.FC = () => {
  const { content, quizAnswers, setQuizAnswer, resetQuiz } = useRomantic();
  const [currentIdx, setCurrentIdx] = useState(0);

  const questions = content.quiz;
  const currentQuestion = questions[currentIdx] || questions[0];
  const hasAnsweredCurrent = quizAnswers[currentQuestion?.id] !== undefined;

  const totalAnswered = Object.keys(quizAnswers).length;
  const isCompleted = totalAnswered === questions.length;

  const handleSelectOption = (idx: number) => {
    if (!currentQuestion) return;
    setQuizAnswer(currentQuestion.id, idx);

    // If answering the last question, trigger celebratory confetti
    if (totalAnswered + 1 >= questions.length) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#B94F68', '#702D40', '#F3E1E5', '#B18A45'],
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="bg-white/90 border border-[#E5CCD2] rounded-3xl p-6 sm:p-10 shadow-sm">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-[#E5CCD2] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F3E1E5] flex items-center justify-center text-[#702D40]">
            <HelpCircle className="w-4 h-4 text-[#702D40]" />
          </div>
          <div>
            <h3 className="font-serif-heading text-xl text-[#702D40]">Love Quiz</h3>
            <span className="text-xs text-[#705E64] font-normal">
              Question {currentIdx + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === currentIdx
                  ? 'bg-[#702D40] scale-125'
                  : quizAnswers[q.id] !== undefined
                  ? 'bg-[#B94F68]'
                  : 'bg-[#F3E1E5]'
              }`}
              title={`Jump to Question ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Body or Results Screen */}
      {!isCompleted ? (
        <div>
          <h4 className="font-serif-heading text-lg sm:text-xl text-[#702D40] font-medium mb-6">
            {currentQuestion.question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = quizAnswers[currentQuestion.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-normal transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#702D40] text-white border-[#702D40] shadow-xs'
                      : 'bg-white hover:bg-[#FFF9F5] text-[#302329] border-[#E5CCD2] hover:border-[#B94F68]'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#F3E1E5]" />}
                </button>
              );
            })}
          </div>

          {/* Playful feedback prompt when selected */}
          {hasAnsweredCurrent && (
            <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#E5CCD2] mb-6 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#B94F68] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#702D40] leading-relaxed">
                <span className="font-semibold block mb-0.5">The verdict:</span>
                {currentQuestion.playfulResponse}
              </div>
            </div>
          )}

          {/* Navigation between questions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="text-xs text-[#702D40] font-medium disabled:opacity-30 hover:underline cursor-pointer"
            >
              &larr; Previous Question
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2 rounded-full bg-[#702D40] hover:bg-[#8F354F] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Next Question &rarr;
              </button>
            ) : (
              <span className="text-xs text-[#B94F68] font-medium">
                {totalAnswered === questions.length ? 'All answered!' : 'Finish all questions'}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#F3E1E5] flex items-center justify-center mx-auto mb-4 text-[#702D40]">
            <Award className="w-8 h-8 text-[#702D40]" />
          </div>

          <h4 className="font-serif-heading text-2xl text-[#702D40] mb-2">
            100% Soulmate Compatibility
          </h4>
          <p className="text-sm text-[#705E64] font-normal max-w-md mx-auto leading-relaxed mb-6">
            No matter who replies slower or who stole whose heart first, you two are undeniably the
            cutest team in the world.
          </p>

          <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#E5CCD2] max-w-md mx-auto mb-6 text-xs text-[#702D40] italic">
            &ldquo;In every quiz, game, and season of life — the right answer is always each other.&rdquo;
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                resetQuiz();
                setCurrentIdx(0);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5CCD2] text-xs font-medium text-[#702D40] hover:bg-[#F3E1E5]/50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={() => setCurrentIdx(0)}
              className="px-5 py-2.5 rounded-full bg-[#702D40] hover:bg-[#8F354F] text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Review Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
