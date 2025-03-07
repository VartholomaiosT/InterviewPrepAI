import { JobDetails, QuestionSet } from '@/types/questions';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export async function generateQuestions(
  input: JobDetails | { description: string }
): Promise<QuestionSet> {
  if (!API_URL || !API_KEY) {
    throw new Error('API configuration is missing');
  }

  try {
    let prompt = '';
    if ('description' in input) {
      prompt = `Generate 10 technical interview questions based on this job description: ${input.description}`;
    } else {
      prompt = `Generate 10 technical interview questions for a ${input.title} position.
Key requirements:
- Skills: ${input.skills}
- Experience Level: ${input.experienceLevel}
- Industry: ${input.industry}
- Key Responsibilities: ${input.responsibilities}`;
    }

    console.log('Sending request to:', API_URL);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    });
    console.log(
      'Body:',
      JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '...' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      })
    );

    async function fetchWithRetry(
      url: string,
      options: RequestInit,
      retries = 3,
      delay = 2000
    ) {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.ok) return response;
          console.warn(`Retrying API request... Attempt ${i + 1}`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (err) {
          console.error(`Fetch attempt ${i + 1} failed:`, err);
        }
      }
      throw new Error('API request failed after retries.');
    }

    const response = await fetchWithRetry(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert technical interviewer. Generate multiple-choice questions with 4 options each. Format your response as a JSON array of questions. Each question should have the following structure:
{
  "question": "What is...",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "correct option text",
  "explanation": "explanation why this is correct"
}`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(
        `Failed to generate questions: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();
    if (!text.trim()) {
      throw new Error('API response is empty');
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('Invalid JSON:', text);
      throw new Error('Failed to parse API response');
    }

    if (
      !data ||
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message
    ) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response format');
    }

    const content = data.choices[0].message.content;
    let questionsData;

    try {
      // Find JSON array in response
      const match = content.match(/\[[\s\S]*\]/);
      if (!match) {
        throw new Error('No JSON array found in response');
      }
      questionsData = JSON.parse(match[0]);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse questions data');
    }

    const questions = questionsData.map((q: any, index: number) => ({
      id: `q${index + 1}`,
      type: 'multiple_choice',
      question: q.question,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || 'No explanation provided',
    }));

    return {
      id: `set_${Date.now()}`,
      title: 'description' in input ? 'Practice Questions' : input.title,
      questions,
      createdAt: new Date().toISOString(),
      jobTitle: 'description' in input ? undefined : input.title,
      industry: 'description' in input ? undefined : input.industry,
    };
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

// Helper function to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&ndash;': '–',
    '&mdash;': '—',
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  return text.replace(/&[#\w]+;/g, (match) => entities[match] || match);
}
