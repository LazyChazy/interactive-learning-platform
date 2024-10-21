// components/ModuleList.tsx
'use client';

import { useContext } from 'react';
import { LearnContext } from '../context/LearnContext';
import Module from '@/app/components/Module';

const ModuleList = () => {
  const { modules } = useContext(LearnContext);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">Your Learning Journey</h1>
      {modules.map((module, index) => (
        <Module 
          key={index} 
          module={module} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default ModuleList;