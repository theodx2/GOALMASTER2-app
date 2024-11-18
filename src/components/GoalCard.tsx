import React from 'react';
import { motion } from 'framer-motion';
import { Goal, Task } from '../types';
import { Target, Calendar, Trophy, Edit2 } from 'lucide-react';
import { TaskItem } from './TaskItem';

interface GoalCardProps {
  goal: Goal;
  onTaskToggle: (goalId: string, taskId: string) => void;
  onTaskComplete: (goalId: string, taskId: string) => void;
  onTaskUncomplete: (goalId: string, taskId: string) => void;
  onEdit: (goalId: string) => void;
}

export function GoalCard({ 
  goal, 
  onTaskToggle,
  onTaskComplete,
  onTaskUncomplete,
  onEdit 
}: GoalCardProps) {
  const calculateProgress = () => {
    if (!goal.tasks.length) return 0;
    
    const completedTasks = goal.tasks.filter(task => {
      if (task.frequency?.totalOccurrences) {
        return task.completedCount >= task.frequency.totalOccurrences;
      }
      if (task.frequency?.times) {
        return task.completedCount >= task.frequency.times;
      }
      return task.completed;
    }).length;

    return Math.round((completedTasks / goal.tasks.length) * 100);
  };

  const progress = calculateProgress();
  const progressColor = progress === 100 
    ? 'text-green-500' 
    : progress >= 75 
    ? 'text-blue-500' 
    : progress >= 50 
    ? 'text-yellow-500' 
    : 'text-purple-500';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="backdrop-blur-md bg-white/10 dark:bg-black/10 rounded-xl p-6 shadow-xl border border-white/20 hover:border-white/40 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {goal.title}
        </h3>
        
        <div className="flex items-center gap-3">
          {progress === 100 ? (
            <Trophy className="w-5 h-5 text-yellow-500" />
          ) : (
            <Target className={`w-5 h-5 ${progressColor}`} />
          )}
          <span className={`text-sm font-medium ${progressColor}`}>
            {progress}%
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(goal.id)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>
      
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Deadline: {new Date(goal.deadline).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-2">
        {goal.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={() => onTaskComplete(goal.id, task.id)}
            onUncomplete={() => onTaskUncomplete(goal.id, task.id)}
            isCompleted={
              task.frequency?.totalOccurrences 
                ? task.completedCount >= task.frequency.totalOccurrences
                : task.completed
            }
            onToggle={() => onTaskToggle(goal.id, task.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}