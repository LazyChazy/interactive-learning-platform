// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    const prompt = `
      You are an educational content generator utilizing the GPT-4o model. Based on the topic "${topic}", generate a structured course outline with modules. Each module should include:
      
      1. **Detailed Article:** An in-depth explanation of the module topic, using markdown formatting for better readability. Include headings, lists, and emphasis where appropriate. Use LaTeX for mathematical equations when necessary.
      
      2. **Embedded Interactive Questions:** Within the article, integrate 2-3 multiple-choice questions that require critical thinking and application of the concepts, not just simple recall. Format these questions as follows:
         
         [QUIZ]
         Question: [A challenging question that requires applying the concept]
         Options:
         A) [Option A]
         B) [Option B]
         C) [Option C]
         D) [Option D]
         Answer: [Correct option letter]
         Explanation: [Detailed explanation of why this answer is correct and why others are incorrect]
         [/QUIZ]
      
      3. **Extended Quiz:** At the end of each module, provide a comprehensive quiz with 8-10 multiple-choice questions. These should be complex, scenario-based questions that test deep understanding and application of the material. Use the same format as the embedded questions.
      
      Ensure that the content is thorough and covers the topic in detail. Generate at least 3 modules for the topic.
      
      Provide the response in JSON format with the following structure:
      {
        "modules": [
          {
            "title": "Module Title",
            "article": "Detailed article content with embedded questions...",
            "quiz": {
              "questions": [
                {
                  "question": "Question text",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Correct Option",
                  "explanation": "Explanation for the correct answer."
                },
                ...
              ]
            }
          },
          ...
        ]
      }
    `;


    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-2024-08-06',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 12000, // Increased tokens for more detailed content
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const data = response.data;
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Unexpected API response structure');
    }
    const content = data.choices[0].message.content;
    const jsonContent = content.replace(/```json\n|\n```/g, '');
    const parsed = JSON.parse(jsonContent);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}