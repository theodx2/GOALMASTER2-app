import { LucideIcon } from 'lucide-react';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  tasks: Task[];
  smart: SMARTCriteria;
  smartScore?: number;
  frequency?: {
    times?: number;
    period?: TaskPeriod;
    completedDates?: string[];
    completedCount: number;
  };
}

export type TaskPeriod = 'daily' | 'weekly' | 'biweekly' | 'bimonthly' | 'monthly' | 'semiannual' | 'annual';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  completedCount: number;
  completedDates: string[];
  frequency?: {
    times?: number;
    period?: TaskPeriod;
    dueDate: string;
    totalOccurrences?: number;
  };
  dueDate?: string;
}

export interface SMARTCriteria {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}