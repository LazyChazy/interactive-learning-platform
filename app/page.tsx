// app/page.tsx
'use client';

import { useContext } from 'react';
import InputBar from '@/app/components/InputBar';
import ModuleList from '@/app/components/ModuleList';
import { LearnContext } from '@/app/context/LearnContext';

const Home = () => {
  const { modules } = useContext(LearnContext);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {!modules.length ? (
        <div className="w-full max-w-4xl mt-20">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
            Interactive Learning Platform
          </h1>
          <InputBar />
        </div>
      ) : (
        <ModuleList />
      )}
    </div>
  );
};

export default Home;