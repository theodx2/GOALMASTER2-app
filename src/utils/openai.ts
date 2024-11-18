import OpenAI from 'openai';
import { SMARTCriteria } from '../types';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function analyzeGoal(
  title: string, 
  description: string, 
  tasks: string[],
  deadline: string
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Analyze this goal using SMART criteria and provide a score and suggestions:

Goal: ${title}
Description: ${description}
Tasks: ${tasks.join(', ')}
Deadline: ${deadline}

Rate each component (0-20 points) and provide constructive feedback:
- Specific: How clear and well-defined is the goal?
- Measurable: Can progress be tracked quantitatively?
- Achievable: Is it realistic with the given timeframe and resources?
- Relevant: Does it align with long-term objectives?
- Time-bound: Is the deadline clear and appropriate?

Provide a brief, encouraging suggestion for improvement.`
      }],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content in response');

    // Parse the response
    const lines = content.split('\n');
    let scores = {
      specific: 0,
      measurable: 0,
      achievable: 0,
      relevant: 0,
      timeBound: 0
    };
    let suggestion = '';

    lines.forEach(line => {
      const scoreLine = line.match(/(\w+):\s*(\d+)/);
      if (scoreLine) {
        const [_, component, score] = scoreLine;
        const key = component.toLowerCase() as keyof typeof scores;
        if (key in scores) {
          scores[key] = parseInt(score);
        }
      } else if (line.includes('suggestion') || line.includes('Suggestion')) {
        suggestion = line.split(':')[1]?.trim() || '';
      }
    });

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    return {
      smartScore: totalScore,
      suggestion: suggestion || 'Keep refining your goal to make it more SMART.'
    };
  } catch (error) {
    console.error('Error analyzing goal:', error);
    return {
      smartScore: 0,
      suggestion: "Currently analyzing your goal. Please ensure all fields are filled out completely."
    };
  }
}