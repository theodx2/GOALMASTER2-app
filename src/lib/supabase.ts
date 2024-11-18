import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbsvuwtuscoqgsyutfnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNic3Z1d3R1c2NvcWdzeXV0Zm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NzE5NDYsImV4cCI6MjA0NzQ0Nzk0Nn0.yTtcizFg2yaMEEAIR6thwLZwohUl_gcdleoe6uMaMaU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Demo admin account credentials
export const demoAdmin = {
  email: 'demo@goalmaster.app',
  password: 'GoalMaster2024!'
};

// Pre-made goals for demo account
export const demoGoals = [
  {
    title: "Launch Mobile App",
    description: "Develop and launch a successful mobile application",
    deadline: "2024-12-31",
    tasks: [
      {
        title: "Complete MVP Development",
        frequency: { times: 1, period: "daily", dueDate: "2024-06-30" }
      },
      {
        title: "User Testing Sessions",
        frequency: { times: 2, period: "weekly", dueDate: "2024-08-31" }
      },
      {
        title: "Marketing Campaign",
        frequency: { times: 3, period: "monthly", dueDate: "2024-12-15" }
      }
    ]
  },
  {
    title: "Fitness Transformation",
    description: "Achieve optimal health and fitness level",
    deadline: "2024-09-30",
    tasks: [
      {
        title: "Morning Workout",
        frequency: { times: 5, period: "weekly", dueDate: "2024-09-30" }
      },
      {
        title: "Meal Prep",
        frequency: { times: 1, period: "weekly", dueDate: "2024-09-30" }
      },
      {
        title: "Progress Photos",
        frequency: { times: 2, period: "monthly", dueDate: "2024-09-30" }
      }
    ]
  },
  {
    title: "Master Web Development",
    description: "Become proficient in modern web technologies",
    deadline: "2024-12-31",
    tasks: [
      {
        title: "Complete React Course",
        frequency: { times: 1, totalOccurrences: 30, dueDate: "2024-06-30" }
      },
      {
        title: "Build Portfolio Projects",
        frequency: { times: 1, totalOccurrences: 5, dueDate: "2024-09-30" }
      },
      {
        title: "Contribute to Open Source",
        frequency: { times: 2, period: "monthly", dueDate: "2024-12-31" }
      }
    ]
  }
];