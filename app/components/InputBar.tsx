// components/InputBar.tsx
'use client';

import { useState, useContext } from 'react';
import axios from 'axios';
import { LearnContext } from '@/app/context/LearnContext';

const InputBar = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { setModules } = useContext(LearnContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);

    try {
      const response = await axios.post('/api/generate', { topic });
      setModules(response.data.modules);
    } catch (error) {
      console.error(error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        What would you like to learn about?
      </h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full p-3 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Course'}
      </button>
    </form>
  );
};

export default InputBar;