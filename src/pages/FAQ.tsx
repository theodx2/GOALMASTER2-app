import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is Goal Master?",
    answer: "Goal Master is an AI-powered goal-setting and tracking platform that helps you transform your dreams into achievable goals using the SMART framework and personalized insights."
  },
  {
    question: "How does the AI feature work?",
    answer: "Our AI analyzes your goals and provides personalized suggestions to make them more specific, measurable, achievable, relevant, and time-bound. It also tracks your progress and offers optimization tips."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent."
  },
  // Add more FAQs
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

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
              Frequently Asked Questions
            </h1>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ backgroundColor: openIndex === index ? 'rgba(124, 58, 237, 0.1)' : 'transparent' }}
                  className="rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <motion.div
                    initial="collapsed"
                    animate={openIndex === index ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}