// app/components/QuizPage.tsx
import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizPageProps {
  questions: Question[];
  moduleTitle: string;
  onComplete: (score: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ questions, moduleTitle, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    const newUserAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newUserAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
      const score = newUserAnswers.filter((answer, index) => answer === questions[index].answer).length;
      onComplete(score);
    }
  };

  if (showSummary) {
    const score = userAnswers.filter((answer, index) => answer === questions[index].answer).length;
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Quiz Summary: {moduleTitle}</h2>
        <p className="text-lg mb-4">You scored {score} out of {questions.length}</p>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-semibold">{question.question}</p>
              <p className={userAnswers[index] === question.answer ? "text-green-600" : "text-red-600"}>
                Your answer: {userAnswers[index]}
              </p>
              {userAnswers[index] !== question.answer && (
                <p className="text-green-600">Correct answer: {question.answer}</p>
              )}
              <p className="text-gray-600 mt-2">{question.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Quiz: {moduleTitle}</h2>
      <p className="mb-4">Question {currentQuestion + 1} of {questions.length}</p>
      <p className="text-lg font-semibold mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full text-left p-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;