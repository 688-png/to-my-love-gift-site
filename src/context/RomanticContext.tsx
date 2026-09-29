import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RomanticContentConfig,
  defaultRomanticContent,
  BucketListItem,
} from '../config/romantic-content';
import { romanticAudio } from '../utils/audio';

const STORAGE_KEY_BUCKET = 'our_little_world_bucket_v2';
const STORAGE_KEY_QUIZ = 'our_little_world_quiz_v2';
const STORAGE_KEY_REVEALED_REASONS = 'our_little_world_revealed_reasons_v2';

interface RomanticContextType {
  content: RomanticContentConfig;

  // Ambient music controls
  isPlayingMusic: boolean;
  toggleMusic: () => void;

  // Bucket list state
  bucketList: BucketListItem[];
  toggleBucketItem: (id: string) => void;
  addBucketItem: (title: string, category: BucketListItem['category']) => void;
  removeBucketItem: (id: string) => void;

  // Reasons revealed
  revealedReasons: number[];
  revealReason: (id: number) => void;
  revealAllReasons: () => void;
  resetReasons: () => void;

  // Quiz state
  quizAnswers: Record<string, number>;
  setQuizAnswer: (questionId: string, answerIdx: number) => void;
  resetQuiz: () => void;
}

const RomanticContext = createContext<RomanticContextType | null>(null);

export const RomanticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Romantic content is driven directly by configuration
  const content = defaultRomanticContent;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Bucket list state
  const [bucketList, setBucketList] = useState<BucketListItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUCKET);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading saved bucket list:', e);
    }
    return defaultRomanticContent.bucketList;
  });

  // Revealed reasons
  const [revealedReasons, setRevealedReasons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVEALED_REASONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Quiz answers
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUIZ);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Save bucket list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BUCKET, JSON.stringify(bucketList));
    } catch (e) {
      console.warn('Could not save bucket list', e);
    }
  }, [bucketList]);

  // Save revealed reasons
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVEALED_REASONS, JSON.stringify(revealedReasons));
    } catch (e) {
      console.warn('Could not save revealed reasons', e);
    }
  }, [revealedReasons]);

  // Save quiz answers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(quizAnswers));
    } catch (e) {
      console.warn('Could not save quiz answers', e);
    }
  }, [quizAnswers]);

  const toggleMusic = () => {
    const isNowPlaying = romanticAudio.toggle(content.music.customUrl);
    setIsPlayingMusic(isNowPlaying);
  };

  const toggleBucketItem = (id: string) => {
    setBucketList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          return {
            ...item,
            completed: nextCompleted,
            completedDate: nextCompleted
              ? new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
              : undefined,
          };
        }
        return item;
      })
    );
  };

  const addBucketItem = (title: string, category: BucketListItem['category']) => {
    const newItem: BucketListItem = {
      id: `b-${Date.now()}`,
      title,
      category,
      completed: false,
    };
    setBucketList(prev => [newItem, ...prev]);
  };

  const removeBucketItem = (id: string) => {
    setBucketList(prev => prev.filter(item => item.id !== id));
  };

  const revealReason = (id: number) => {
    setRevealedReasons(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const revealAllReasons = () => {
    setRevealedReasons(content.reasons.map(r => r.id));
  };

  const resetReasons = () => {
    setRevealedReasons([]);
  };

  const setQuizAnswer = (questionId: string, answerIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIdx }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
  };

  return (
    <RomanticContext.Provider
      value={{
        content,
        isPlayingMusic,
        toggleMusic,
        bucketList,
        toggleBucketItem,
        addBucketItem,
        removeBucketItem,
        revealedReasons,
        revealReason,
        revealAllReasons,
        resetReasons,
        quizAnswers,
        setQuizAnswer,
        resetQuiz,
      }}
    >
      {children}
    </RomanticContext.Provider>
  );
};

export const useRomantic = () => {
  const context = useContext(RomanticContext);
  if (!context) {
    throw new Error('useRomantic must be used within a RomanticProvider');
  }
  return context;
};
