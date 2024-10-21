// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { LearnProvider } from '@/app/context/LearnContext';
import Sidebar from '@/app/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interactive Learning Platform',
  description: 'Learn with AI-generated interactive quizzes and articles',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 text-gray-900 flex">
        <LearnProvider>
          <Sidebar />
          <main className="ml-64 w-full min-h-screen p-6">{children}</main>
        </LearnProvider>
      </body>
    </html>
  );
}