// components/ProgressBar.tsx
'use client';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full bg-indigo-200 rounded-full h-4">
      <div
        className="bg-indigo-500 h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};