import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Calendar } from 'lucide-react';
import { TaskPeriod } from '../types';

interface TaskFrequencyInputProps {
  value: {
    times?: number;
    period?: TaskPeriod;
    dueDate?: string;
    totalOccurrences?: number;
  };
  onChange: (value: TaskFrequencyInputProps['value']) => void;
}

export function TaskFrequencyInput({ value, onChange }: TaskFrequencyInputProps) {
  const [dateError, setDateError] = useState('');
  const [dateValue, setDateValue] = useState(value.dueDate || '');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError('Due date cannot be in the past');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDateValue(newDate);
    
    if (newDate.length === 10) {
      if (validateDate(newDate)) {
        onChange({ ...value, dueDate: newDate });
      }
    }
  };

  const handleDateBlur = () => {
    if (dateValue.length === 10 && validateDate(dateValue)) {
      onChange({ ...value, dueDate: dateValue });
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Frequency Type
          </label>
          <select
            value={value.period || ''}
            onChange={(e) => {
              const period = e.target.value as TaskPeriod;
              onChange({
                ...value,
                period: period || undefined,
                times: period ? 1 : undefined,
                totalOccurrences: !period ? 1 : undefined
              });
            }}
            className="w-full px-3 py-2 bg-white/10 dark:bg-black/10 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
          >
            <option value="">Complete X times total</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
            <option value="bimonthly">Bi-monthly</option>
            <option value="semiannual">Every 6 months</option>
            <option value="annual">Annually</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {value.period ? 'Times per ' + value.period : 'Total times to complete'}
          </label>
          <input
            type="number"
            min="1"
            value={value.period ? value.times || 1 : value.totalOccurrences || 1}
            onChange={(e) => {
              const num = Math.max(1, parseInt(e.target.value) || 1);
              onChange({
                ...value,
                times: value.period ? num : undefined,
                totalOccurrences: !value.period ? num : undefined
              });
            }}
            className="w-full px-3 py-2 bg-white/10 dark:bg-black/10 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Due Date <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="date"
            value={dateValue}
            onChange={handleDateChange}
            onBlur={handleDateBlur}
            min={minDate}
            className={`w-full pl-10 pr-3 py-2 bg-white/10 dark:bg-black/10 border ${
              dateError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md text-gray-900 dark:text-gray-100`}
            required
          />
        </div>
        {dateError && (
          <p className="mt-1 text-sm text-red-500">{dateError}</p>
        )}
      </div>

      {((value.period && value.times) || value.totalOccurrences) && value.dueDate && !dateError && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        >
          {value.period ? (
            <>
              <Clock className="w-4 h-4 text-purple-500" />
              <span>
                {value.times === 1 ? 'Once' : `${value.times} times`} {value.period} until{' '}
                {new Date(value.dueDate).toLocaleDateString()}
              </span>
            </>
          ) : (
            <>
              <Target className="w-4 h-4 text-purple-500" />
              <span>
                Complete {value.totalOccurrences === 1 ? 'once' : `${value.totalOccurrences} times`} by{' '}
                {new Date(value.dueDate).toLocaleDateString()}
              </span>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}