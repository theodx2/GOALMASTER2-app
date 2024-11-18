import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SmartFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  description: string;
  required?: boolean;
}

export function SmartField({ 
  icon: Icon, 
  label, 
  value, 
  onChange, 
  placeholder,
  description,
  required
}: SmartFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-md focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 dark:text-white"
          placeholder={placeholder}
          required={required}
        />

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 -top-10 bg-purple-100/90 dark:bg-purple-900/90 backdrop-blur-sm text-sm p-2 rounded-lg text-purple-700 dark:text-purple-300 z-10"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add spacing only between fields */}
      <div className="h-6" />
    </motion.div>
  );
}