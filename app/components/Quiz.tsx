// app/components/Quiz.tsx
import { useState, useContext } from 'react';
import { LearnContext } from '../context/LearnContext';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
  moduleIndex: number;
}

const Quiz = ({ questions, moduleIndex }: QuizProps) => {
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const { modules, setProgress } = useContext(LearnContext);

  const handleOptionClick = (option: string) => {
    const newUserAnswers = [...userAnswers, option];
    setUserAnswers(newUserAnswers);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowSummary(true);
      updateProgress();
    }
  };

  const updateProgress = () => {
    const moduleProgress = ((moduleIndex + 1) / modules.length) * 100;
    setProgress(moduleProgress);
  };

  if (showSummary) {
    const correctCount = userAnswers.filter(
      (answer, idx) => answer === questions[idx].answer
    ).length;

    return (
      <div className="mt-6 p-6 bg-indigo-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Quiz Summary</h3>
        <p className="text-lg mb-6">
          You scored <span className="text-green-600 font-bold">{correctCount}</span> out of{' '}
          <span className="font-bold">{questions.length}</span>
        </p>
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white p-4 rounded-md shadow">
              <p className="font-medium text-lg mb-2 text-indigo-700">
                {idx + 1}. {q.question}
              </p>
              <p className={`mb-1 ${userAnswers[idx] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                Your Answer: {userAnswers[idx]}
              </p>
              {userAnswers[idx] !== q.answer && (
                <p className="text-green-600 mb-1">Correct Answer: {q.answer}</p>
              )}
              <p className="text-gray-700 mt-2">Explanation: {q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-indigo-50 p-6 rounded-lg shadow-md">
      <div className="mb-4 text-lg font-medium text-indigo-800">
        Question {current + 1} of {questions.length}
      </div>
      <div className="mb-6 text-xl text-indigo-900">{questions[current].question}</div>
      <div className="space-y-3">
        {questions[current].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left bg-white text-indigo-700 px-4 py-3 rounded-md hover:bg-indigo-100 transition duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;