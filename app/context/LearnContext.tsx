// context/LearnContext.tsx
"use client";

import { createContext, useState, ReactNode } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizSummaryDetail {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
}

interface Quiz {
  questions: Question[];
  summary: {
    total: number;
    correct: number;
    incorrect: number;
    details: QuizSummaryDetail[];
  };
}

interface Module {
  title: string;
  article: string; // Changed from 'content' to 'article'
  quiz: Quiz;
}

interface LearnContextType {
  modules: Module[];
  setModules: (modules: Module[]) => void;
  progress: number; // Percentage (0 to 100)
  setProgress: (progress: number) => void;
}

export const LearnContext = createContext<LearnContextType>({
  modules: [],
  setModules: () => {},
  progress: 0,
  setProgress: () => {},
});

export const LearnProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState(0);

  return (
    <LearnContext.Provider value={{ modules, setModules, progress, setProgress }}>
      {children}
    </LearnContext.Provider>
  );
};
