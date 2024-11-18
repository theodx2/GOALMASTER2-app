import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Lock, ArrowLeft, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function Profile() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({ username });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </motion.button>

            <motion.button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Profile Settings
            </h1>

            <div className="space-y-6">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg"
                    placeholder="How should we call you?"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Save Changes'
                  )}
                </motion.button>
              </form>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <motion.button
                  onClick={() => navigate('/change-password')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Lock className="w-5 h-5" />
                  Change Password
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}