import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Terms of Use
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p>Last updated: {new Date().toLocaleDateString()}</p>

              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Goal Master, you accept and agree to be bound by these Terms of Use.</p>

              <h2>2. User Accounts</h2>
              <p>You are responsible for:</p>
              <ul>
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>

              {/* Add more sections as needed */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}