// app/components/Article.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkGfm from 'remark-gfm';
import EmbeddedQuiz from '@/app/components/EmbeddedQuiz';

interface ArticleProps {
  content: string;
}

const Article: React.FC<ArticleProps> = ({ content }) => {
  const renderContent = () => {
    const parts = content.split(/(\[QUIZ\].*?\[\/QUIZ\])/s);
    return parts.map((part, index) => {
      if (part.startsWith('[QUIZ]') && part.endsWith('[/QUIZ]')) {
        const quizContent = part.replace('[QUIZ]', '').replace('[/QUIZ]', '').trim();
        const lines = quizContent.split('\n');
        const question = lines[0].replace('Question: ', '');
        const options = lines.slice(2, -3).map(option => option.trim().substring(3));
        const answer = lines[lines.length - 2].replace('Answer: ', '');
        const explanation = lines[lines.length - 1].replace('Explanation: ', '');
        
        return (
          <EmbeddedQuiz
            key={index}
            question={question}
            options={options}
            answer={answer}
            explanation={explanation}
          />
        );
      } else {
        return (
          <ReactMarkdown
            key={index}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {part}
          </ReactMarkdown>
        );
      }
    });
  };

  return <div className="prose max-w-none">{renderContent()}</div>;
};

export default Article;