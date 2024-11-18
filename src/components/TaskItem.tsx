import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Clock, RepeatIcon, CheckCircle } from 'lucide-react';
import { Task, TaskPeriod } from '../types';
import { format, isSameDay, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onComplete: () => void;
  onUncomplete: () => void;
  isCompleted: boolean;
}

export function TaskItem({ 
  task, 
  onToggle, 
  onComplete,
  onUncomplete,
  isCompleted 
}: TaskItemProps) {
  const [showFrequency, setShowFrequency] = useState(false);

  const getCompletionsInPeriod = () => {
    if (!task.frequency?.period || !task.completedDates.length) return 0;
    const now = new Date();
    let periodStart: Date;
    let periodEnd: Date;

    switch (task.frequency.period) {
      case 'daily':
        periodStart = startOfDay(now);
        periodEnd = endOfDay(now);
        break;
      case 'weekly':
        periodStart = startOfWeek(now);
        periodEnd = endOfWeek(now);
        break;
      case 'biweekly':
        periodStart = startOfWeek(now);
        periodEnd = endOfWeek(now);
        break;
      case 'monthly':
        periodStart = startOfMonth(now);
        periodEnd = endOfMonth(now);
        break;
      case 'bimonthly':
        periodStart = startOfMonth(now);
        periodEnd = endOfMonth(now);
        break;
      case 'semiannual':
      case 'annual':
        // For these longer periods, just check total completions
        return task.completedCount;
      default:
        return 0;
    }

    return task.completedDates.filter(date => {
      const completionDate = new Date(date);
      return completionDate >= periodStart && completionDate <= periodEnd;
    }).length;
  };

  const canCompleteToday = () => {
    if (!task.frequency?.period) {
      return task.completedCount < (task.frequency?.totalOccurrences || 1);
    }

    const completionsInPeriod = getCompletionsInPeriod();
    return completionsInPeriod < (task.frequency.times || 1);
  };

  const todayCompletions = task.completedDates?.filter(date =>
    isSameDay(new Date(date), new Date())
  ).length || 0;

  const periodCompletions = task.frequency?.period ? 
    `${getCompletionsInPeriod()}/${task.frequency.times}` : 
    `${task.completedCount}/${task.frequency?.totalOccurrences || 1}`;

  return (
    <div className="group relative">
      <motion.div
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        whileHover={{ x: 5 }}
      >
        <div className="flex-1 flex items-center gap-2">
          <button onClick={onToggle}>
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
            )}
          </button>
          <span className={`text-sm ${
            isCompleted 
              ? 'line-through text-gray-500 dark:text-gray-600' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {task.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.frequency && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <RepeatIcon className="w-4 h-4" />
              <span>
                {task.frequency.period ? (
                  `${periodCompletions} ${task.frequency.period}`
                ) : (
                  `${task.completedCount}/${task.frequency.totalOccurrences} total`
                )}
              </span>
            </div>
          )}
          
          {todayCompletions > 0 && (
            <div className="text-xs text-green-600 dark:text-green-400">
              {todayCompletions}x today
            </div>
          )}

          {canCompleteToday() && !isCompleted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              Complete
            </motion.button>
          )}

          {task.completedCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUncomplete}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Uncomplete
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}