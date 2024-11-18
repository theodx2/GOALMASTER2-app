import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Mail, Lock, Target, Brain, 
  Sparkles, Users, Trophy, CheckCircle 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { backgrounds } from '../utils/backgrounds';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Goal Setting",
    description: "Our AI analyzes your goals and provides personalized suggestions to make them SMART"
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Track your progress with intuitive visualizations and milestone tracking"
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Celebrate your wins with our achievement system and progress insights"
  }
];

const testimonials = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Sarah Chen",
    role: "Entrepreneur",
    quote: "Goal Master helped me turn my business dreams into actionable plans."
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "David Kim",
    role: "Fitness Coach",
    quote: "The habit tracking features are a game-changer for my clients."
  },
  {
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop",
    name: "Emily Rodriguez",
    role: "Student",
    quote: "I love how the AI helps me break down my study goals into manageable tasks."
  }
];

export function Landing() {
  const [currentBg, setCurrentBg] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          key={currentBg}
          src={backgrounds[currentBg].url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/50 to-black/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Goal Master</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-white hover:text-purple-300 transition-colors"
              >
                {showLogin ? 'Hide Login' : 'Existing User?'}
              </button>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-4 top-20 w-full max-w-md z-20"
            >
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
                <form onSubmit={handleQuickLogin} className="space-y-4">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Transform Your Dreams into{' '}
              <span className="text-purple-400">Achievable Goals</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12"
            >
              AI-powered goal setting and tracking to help you succeed
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/register"
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Free Trial
              </Link>
              <a
                href="#features"
                className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          <section id="features" className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
                >
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-20">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <Users className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">
                  Join 250K+ goal achievers
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
          <div className="flex justify-center gap-8 mb-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          <p>© 2024 Goal Master by Théo DESROUSSEAUX. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}