import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';

interface SmartScoreBarProps {
  score: number;
  suggestion?: string;
  isLoading?: boolean;
}

export function SmartScoreBar({ score, suggestion, isLoading }: SmartScoreBarProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-600';
    if (score >= 70) return 'from-blue-500 to-blue-600';
    if (score >= 40) return 'from-amber-500 to-amber-600';
    return 'from-rose-500 to-rose-600';
  };

  return (
    <div className="mb-8">
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-3 text-purple-500 dark:text-purple-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            />
            <span className="text-sm font-medium">Analyzing your goal...</span>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                SMART Score
              </span>
            </div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-purple-600 dark:text-purple-400"
            >
              {score}%
            </motion.div>
          </div>

          <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getScoreColor(score)}`}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
            >
              <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {suggestion}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}