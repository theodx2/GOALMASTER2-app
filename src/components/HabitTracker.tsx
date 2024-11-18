import React from 'react';
import { Calendar, RepeatIcon } from 'lucide-react';
import { HabitTracking } from '../types';

interface HabitTrackerProps {
  habit: HabitTracking | undefined;
  onChange: (habit: HabitTracking | undefined) => void;
  isEnabled: boolean;
  onToggle: () => void;
}

export function HabitTracker({ habit, onChange, isEnabled, onToggle }: HabitTrackerProps) {
  const handleFrequencyChange = (frequency: HabitTracking['frequency']) => {
    if (!isEnabled) return;
    
    const newHabit: HabitTracking = {
      frequency,
      completedDates: [],
      startDate: new Date().toISOString(),
      streak: 0,
      ...(habit || {}),
    };
    
    if (frequency === 'custom' && !habit?.customFrequency) {
      newHabit.customFrequency = 1;
      newHabit.customPeriod = 'weeks';
    }
    
    onChange(newHabit);
  };

  const handleCustomFrequencyChange = (value: number) => {
    if (!habit) return;
    onChange({
      ...habit,
      customFrequency: value,
    });
  };

  const handleCustomPeriodChange = (period: 'days' | 'weeks' | 'months') => {
    if (!habit) return;
    onChange({
      ...habit,
      customPeriod: period,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <RepeatIcon className="w-5 h-5" />
          Make this a recurring habit
        </label>
        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            isEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={habit?.frequency || 'daily'}
              onChange={(e) => handleFrequencyChange(e.target.value as HabitTracking['frequency'])}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Twice a week</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>

            {habit?.frequency === 'custom' && (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={habit.customFrequency}
                  onChange={(e) => handleCustomFrequencyChange(parseInt(e.target.value))}
                  className="block w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={habit.customPeriod}
                  onChange={(e) => handleCustomPeriodChange(e.target.value as 'days' | 'weeks' | 'months')}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Tracking starts from today</span>
          </div>
        </div>
      )}
    </div>
  );
}