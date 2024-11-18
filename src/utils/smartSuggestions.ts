import { SMARTCriteria } from '../types';

const smartExamples = {
  specific: {
    learn: 'Complete 3 advanced React courses and build 5 full-stack projects',
    fitness: 'Run a half-marathon (21.1km) in under 2 hours',
    career: 'Get promoted to Senior Developer with 20% salary increase',
    business: 'Launch an e-commerce store with 100+ products and 1000 monthly visitors'
  },
  measurable: {
    learn: 'Track progress through 30 coding challenges and 5 project milestones',
    fitness: 'Log 3 training sessions per week, increasing distance by 2km monthly',
    career: 'Lead 3 major projects and obtain 2 key certifications',
    business: 'Achieve $5000 monthly revenue with 15% month-over-month growth'
  },
  achievable: {
    learn: 'Dedicate 2 hours daily for learning, using existing programming background',
    fitness: 'Follow a structured 12-week training program with rest days',
    career: 'Network with 2 industry leaders monthly and take on additional responsibilities',
    business: 'Invest 20 hours weekly in business development with available savings'
  },
  relevant: {
    learn: 'Aligns with current tech industry demand and career growth path',
    fitness: 'Improves cardiovascular health and mental clarity for work-life balance',
    career: 'Matches long-term career goals and industry expertise requirements',
    business: 'Creates additional income stream and professional independence'
  },
  timeBound: {
    learn: '6 months timeline with monthly skill assessments and project deadlines',
    fitness: '12-week training program with weekly progress checkpoints',
    career: '12 months with quarterly performance reviews and milestone tracking',
    business: '6 months with monthly revenue targets and growth metrics'
  }
};

export function generateSmartSuggestions(
  title: string,
  description: string
): Partial<SMARTCriteria> {
  const suggestions: Partial<SMARTCriteria> = {};
  const titleLower = title.toLowerCase();
  let category = 'learn';

  // Determine the most relevant category based on keywords
  if (titleLower.includes('learn') || titleLower.includes('study') || titleLower.includes('course')) {
    category = 'learn';
  } else if (titleLower.includes('run') || titleLower.includes('exercise') || titleLower.includes('gym') || titleLower.includes('health')) {
    category = 'fitness';
  } else if (titleLower.includes('promotion') || titleLower.includes('career') || titleLower.includes('job')) {
    category = 'career';
  } else if (titleLower.includes('business') || titleLower.includes('startup') || titleLower.includes('revenue')) {
    category = 'business';
  }

  // Return suggestions for the determined category
  return {
    specific: smartExamples.specific[category],
    measurable: smartExamples.measurable[category],
    achievable: smartExamples.achievable[category],
    relevant: smartExamples.relevant[category],
    timeBound: smartExamples.timeBound[category]
  };
}