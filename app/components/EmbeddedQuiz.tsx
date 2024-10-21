// app/components/EmbeddedQuiz.tsx
import { useState } from 'react';

interface EmbeddedQuizProps {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const EmbeddedQuiz = ({ question, options, answer, explanation }: EmbeddedQuizProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowExplanation(true);
  };

  return (
    <div className="my-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md">
      <p className="font-semibold text-lg mb-4 text-indigo-800">{question}</p>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedOption === option
                ? option === answer
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
                : 'bg-white hover:bg-indigo-100 text-indigo-700'
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-white rounded-md">
          <p className={selectedOption === answer ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {selectedOption === answer ? 'Correct!' : 'Incorrect.'}
          </p>
          <p className="text-gray-700 mt-2">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default EmbeddedQuiz;