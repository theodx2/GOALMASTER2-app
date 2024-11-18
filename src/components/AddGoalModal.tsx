import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import { 
  Target, ListTodo, Rocket, ArrowRight, 
  Brain, Sparkles, Plus, X, Calendar
} from 'lucide-react';
import { Goal, Task } from '../types';
import { SmartField } from './SmartField';
import { TaskFrequencyInput } from './TaskFrequencyInput';
import { SmartScoreBar } from './SmartScoreBar';
import { analyzeGoal } from '../utils/openai';
import toast from 'react-hot-toast';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: Goal) => void;
  onUpdate?: (goal: Goal) => void;
  onDelete?: (goalId: string) => void;
  editingGoal?: Goal | null;
}

export function AddGoalModal({ 
  isOpen, 
  onClose, 
  onAdd,
  onUpdate,
  onDelete,
  editingGoal 
}: AddGoalModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([{ 
    id: '1', 
    title: '', 
    completed: false,
    completedCount: 0,
    completedDates: []
  }]);
  const [deadline, setDeadline] = useState('');
  const [smartScore, setSmartScore] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setDescription(editingGoal.description);
      setTasks(editingGoal.tasks);
      setDeadline(editingGoal.deadline);
    }
  }, [editingGoal]);

  useEffect(() => {
    const analyzeCurrentGoal = async () => {
      if (!title || !description || !tasks.some(t => t.title.trim())) {
        setSmartScore(0);
        setSuggestion('Fill out all fields to get SMART score analysis.');
        return;
      }

      setIsAnalyzing(true);
      try {
        const analysis = await analyzeGoal(
          title,
          description,
          tasks.map(t => t.title).filter(Boolean),
          deadline
        );

        setSmartScore(analysis.smartScore);
        setSuggestion(analysis.suggestion);
      } catch (error) {
        console.error('Error analyzing goal:', error);
        setSmartScore(0);
        setSuggestion('Unable to analyze goal at the moment.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    const debouncedAnalysis = debounce(analyzeCurrentGoal, 1000);
    debouncedAnalysis();

    return () => {
      debouncedAnalysis.cancel();
    };
  }, [title, description, tasks]);

  const handleClose = () => {
    setCurrentStep(1);
    setTitle('');
    setDescription('');
    setTasks([{ id: '1', title: '', completed: false, completedCount: 0, completedDates: [] }]);
    setDeadline('');
    setSmartScore(0);
    setSuggestion('');
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !deadline || !tasks.some(t => t.title.trim())) {
      toast.error('Please fill out all required fields');
      return;
    }

    const newGoal: Goal = {
      id: editingGoal?.id || Date.now().toString(),
      title,
      description,
      deadline,
      progress: 0,
      tasks: tasks.filter(task => task.title.trim()),
      smart: {
        specific: title,
        measurable: description,
        achievable: 'true',
        relevant: 'true',
        timeBound: deadline
      },
      smartScore
    };

    if (editingGoal && onUpdate) {
      onUpdate(newGoal);
    } else {
      onAdd(newGoal);
    }
    handleClose();
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], title: value };
    if (index === tasks.length - 1 && value !== '') {
      newTasks.push({ 
        id: Date.now().toString(), 
        title: '', 
        completed: false,
        completedCount: 0,
        completedDates: []
      });
    }
    setTasks(newTasks);
  };

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate.length === 10 && !validateDate(newDate)) {
      toast.error('Due date cannot be in the past');
      return;
    }
    setDeadline(newDate);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return title.trim() && description.trim();
      case 2:
        return tasks.some(task => task.title.trim());
      case 3:
        return deadline;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            className="inline-block w-full max-w-2xl p-8 my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-900 shadow-xl rounded-2xl relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="mt-4">
              {currentStep === 1 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Define Your Goal
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      What do you want to achieve?
                    </p>
                  </div>

                  <SmartScoreBar 
                    score={smartScore}
                    suggestion={suggestion}
                    isLoading={isAnalyzing}
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Goal Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="I want to..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Why is this important? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 transition-all"
                        rows={3}
                        placeholder="This goal matters because..."
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <ListTodo className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Break It Down
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      What steps will you take?
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={task.id}>
                        <TaskFrequencyInput
                          value={task.frequency || {}}
                          onChange={(frequency) => {
                            const newTasks = [...tasks];
                            newTasks[index] = { ...task, frequency };
                            setTasks(newTasks);
                          }}
                        />
                        <input
                          type="text"
                          value={task.title}
                          onChange={(e) => handleTaskChange(index, e.target.value)}
                          className="w-full px-4 py-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder={`Step ${index + 1}: I will...`}
                          required={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Calendar className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Set Timeline
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      When will you achieve this?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Goal Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div 
              className="mt-8 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentStep > 1 && (
                <motion.button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back
                </motion.button>
              )}
              
              <motion.button
                onClick={currentStep === 3 ? handleSubmit : () => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!canProceed()}
              >
                {currentStep === 3 ? (
                  <>
                    {editingGoal ? 'Update' : 'Create'} Goal
                    <Rocket className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {editingGoal && onDelete && (
                <motion.button
                  onClick={() => {
                    onDelete(editingGoal.id);
                    handleClose();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}