// app/components/Module.tsx
import { useState } from 'react';
import Article from '@/app/components/Article';
import QuizPage from '@/app/components/QuizPage';

interface ModuleProps {
  module: {
    title: string;
    article: string;
    quiz: {
      questions: {
        question: string;
        options: string[];
        answer: string;
        explanation: string;
      }[];
    };
  };
  index: number;
}

const Module = ({ module, index }: ModuleProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setQuizCompleted(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Module {index + 1}: {module.title}
      </h2>
      {!showQuiz && <Article content={module.article} />}
      {!showQuiz && (
        <button
          onClick={() => setShowQuiz(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-indigo-600 transition duration-300"
        >
          Take End-of-Module Quiz
        </button>
      )}
      {showQuiz && !quizCompleted && (
        <QuizPage
          questions={module.quiz.questions}
          moduleTitle={module.title}
          onComplete={handleQuizComplete}
        />
      )}
      {quizCompleted && (
        <div className="mt-6">
          <p className="text-lg font-semibold">
            Quiz completed! Your score: {quizScore} / {module.quiz.questions.length}
          </p>
          <button
            onClick={() => {
              setShowQuiz(false);
              setQuizCompleted(false);
            }}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 transition duration-300"
          >
            Return to Article
          </button>
        </div>
      )}
    </div>
  );
};

export default Module;