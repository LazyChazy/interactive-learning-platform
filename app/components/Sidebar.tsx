// app/components/Sidebar.tsx
'use client';

import { useContext } from 'react';
import { LearnContext } from '../context/LearnContext';
import { ProgressBar } from '@/app/components/ProgressBar';

const Sidebar = () => {
  const { progress, modules } = useContext(LearnContext);

  return (
    <div className="w-64 bg-indigo-800 text-white shadow-md p-6 fixed h-full overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Course Progress</h2>
      <ProgressBar progress={progress} />
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Modules</h3>
        <ul className="space-y-3">
          {modules.map((module, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <span className="truncate text-indigo-100 hover:text-white transition duration-300">
                {module.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;