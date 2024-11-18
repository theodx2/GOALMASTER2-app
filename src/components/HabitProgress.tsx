import React from 'react';
import { motion } from 'framer-motion';
import { format, differenceInDays, isSameDay } from 'date-fns';
import { HabitTracking } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface HabitProgressProps {
  habit: HabitTracking;
  onComplete: () => void;
}

export function HabitProgress({ habit, onComplete }: HabitProgressProps) {
  const today = new Date();
  const startDate = new Date(habit.startDate);
  const daysSinceStart = differenceInDays(today, startDate);

  const getExpectedCompletions = () => {
    switch (habit.frequency) {
      case 'daily':
        return daysSinceStart + 1;
      case 'weekly':
        return Math.ceil((daysSinceStart + 1) / 7);
      case 'biweekly':
        return Math.ceil((daysSinceStart + 1) / 3.5);
      case 'monthly':
        return Math.ceil((daysSinceStart + 1) / 30);
      case 'custom':
        if (!habit.customFrequency || !habit.customPeriod) return 0;
        const daysPerPeriod = {
          days: 1,
          weeks: 7,
          months: 30
        }[habit.customPeriod];
        return Math.ceil((daysSinceStart + 1) / (daysPerPeriod * habit.customFrequency));
      default:
        return 0;
    }
  };

  const expectedCompletions = getExpectedCompletions();
  const actualCompletions = habit.completedDates.length;
  const progress = Math.round((actualCompletions / expectedCompletions) * 100) || 0;
  const canCompleteToday = !habit.completedDates.some(date => 
    isSameDay(new Date(date), today)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Habit Progress
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {actualCompletions} of {expectedCompletions} expected completions
          </p>
        </div>
        {canCompleteToday && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
          >
            Complete Today
          </motion.button>
        )}
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 dark:text-purple-200 dark:bg-purple-900">
              {progress}% Complete
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200 dark:bg-purple-900">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {habit.completedDates.map((date, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs"
          >
            <CheckCircle2 className="w-3 h-3" />
            {format(new Date(date), 'MMM d')}
          </motion.div>
        ))}
      </div>
    </div>
  );
}