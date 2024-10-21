# Interactive Learning Platform

Welcome to the **Interactive Learning Platform** repository. This project uses AI-generated content to help users learn through interactive modules and quizzes. Built with [Next.js](https://nextjs.org/), the platform allows users to explore various topics and engage in learning with AI-created articles and quizzes.

## Features

- AI-generated course content based on user input
- Interactive quizzes embedded within articles
- End-of-module quizzes to test understanding
- Progress tracking with a sidebar
- Responsive and intuitive UI built with [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 16.x or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn, pnpm, etc.)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/interactive-learning-platform.git
   cd interactive-learning-platform

2. Install Dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```


3. Set up enviroment variables:

   Create a .env.local file in the root directory and add your API keys (e.g., for OpenAI):
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   ```

# Running the App

To start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
Open http://localhost:3000 to see the platform in action.


# Building for Production

To create an optimized production build:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```
Then, to start the production server:
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

# Linting

To run ESLint and check for issues:
   ```bash
   npm run lint
   ```

## Folder Structure

- **app/**: Contains the main application components, API routes, and pages.
- **components/**: UI components like articles, quizzes, and the sidebar.
- **context/**: Context providers for managing global state (e.g., progress, module data).
- **public/**: Static files like images or icons.
- **styles/**: Global CSS and Tailwind configuration.
- **api/generate/route.ts**: API route that generates course content using OpenAI.

## Usage

The platform allows users to input a topic of interest, and AI generates an interactive course with multiple modules. Each module includes an article, embedded quizzes, and a final quiz. The user’s progress is tracked, and scores from quizzes are displayed.

Thanks for checking out the Interactive Learning Platform! We hope you enjoy using it.





