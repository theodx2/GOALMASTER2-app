import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, Trophy, TrendingUp } from 'lucide-react';

interface GoalAnalysisProps {
  analysis: {
    optimizedGoal: string;
    suggestions: string[];
    smartScore: number;
    metrics: string[];
    challenges: string[];
    strategies: string[];
  };
  isLoading: boolean;
}

export function GoalAnalysis({ analysis, isLoading }: GoalAnalysisProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-xl border border-purple-200 dark:border-purple-800"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AI Analysis</h3>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {analysis.smartScore}/100
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Optimized Goal
          </h4>
          <p className="text-gray-800 dark:text-gray-200 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            {analysis.optimizedGoal}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              Key Metrics
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {analysis.metrics.map((metric, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              Potential Challenges
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {analysis.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <Trophy className="w-4 h-4" />
            Success Strategies
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {analysis.strategies.map((strategy, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-purple-200 dark:bg-purple-800 rounded-full text-xs font-medium">
                  {index + 1}
                </span>
                {strategy}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}