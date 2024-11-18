import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Sun, Moon, User, Target, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Goal } from '../types';
import { GoalCard } from '../components/GoalCard';
import { AddGoalModal } from '../components/AddGoalModal';
import { backgrounds } from '../utils/backgrounds';

function EmptyState({ onAddGoal }: { onAddGoal: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-6"
      >
        <Sparkles className="w-16 h-16 text-purple-500 dark:text-purple-400" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Start Your Journey
      </h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Transform your dreams into achievable goals. Let's create your first goal and make it happen!
      </p>

      <motion.button
        onClick={onAddGoal}
        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Target className="w-5 h-5" />
        Create Your First Goal
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

export function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentBg, setCurrentBg] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load goals from Supabase
    // This would be implemented with your actual data fetching logic
  }, [user]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(goals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGoals(items);
  };

  const handleTaskToggle = (goalId: string, taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return { ...goal, tasks: updatedTasks };
      }
      return goal;
    }));
  };

  const handleTaskComplete = (goalId: string, taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task =>
          task.id === taskId ? {
            ...task,
            completedCount: task.completedCount + 1,
            completedDates: [...task.completedDates, new Date().toISOString()]
          } : task
        );
        return { ...goal, tasks: updatedTasks };
      }
      return goal;
    }));
  };

  const handleTaskUncomplete = (goalId: string, taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task =>
          task.id === taskId ? {
            ...task,
            completedCount: Math.max(0, task.completedCount - 1),
            completedDates: task.completedDates.slice(0, -1)
          } : task
        );
        return { ...goal, tasks: updatedTasks };
      }
      return goal;
    }));
  };

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={backgrounds[currentBg].url}
          alt={backgrounds[currentBg].credit}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-black/80 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Goals
            </h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="goals">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={goals.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}
                >
                  {goals.length > 0 ? (
                    goals.map((goal, index) => (
                      <Draggable key={goal.id} draggableId={goal.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <GoalCard
                              goal={goal}
                              onTaskToggle={handleTaskToggle}
                              onTaskComplete={handleTaskComplete}
                              onTaskUncomplete={handleTaskUncomplete}
                              onEdit={(goalId) => {
                                setEditingGoal(goals.find(g => g.id === goalId) || null);
                                setIsModalOpen(true);
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <EmptyState onAddGoal={() => {
                      setEditingGoal(null);
                      setIsModalOpen(true);
                    }} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {goals.length > 0 && (
            <motion.button
              onClick={() => {
                setEditingGoal(null);
                setIsModalOpen(true);
              }}
              className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          )}
        </main>

        <AddGoalModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingGoal(null);
          }}
          onAdd={handleAddGoal}
          onUpdate={handleUpdateGoal}
          onDelete={handleDeleteGoal}
          editingGoal={editingGoal}
        />
      </div>
    </div>
  );
}