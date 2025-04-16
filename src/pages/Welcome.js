import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Award, Bell, BookOpen, Calendar,
  Mail, Shield, User
} from 'lucide-react';

const WelcomePage = () => {
  const fullText = "Your all-in-one campus management system for students, faculty, and coordinators.";
  const [typedText, setTypedText] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowFeatures(true), 500);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const roleCards = [
    {
      emoji: '🎓',
      icon: <User size={28} />,
      title: 'Students',
      color: 'from-pink-500 to-pink-700',
      bgColor: 'bg-gradient-to-br from-pink-50 to-white',
      borderColor: 'border-pink-200',
      points: ['View attendance & notices', 'Submit assignments', 'Track progress']
    },
    {
      emoji: '🧑‍🏫',
      icon: <BookOpen size={28} />,
      title: 'Faculty',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-50 to-white',
      borderColor: 'border-purple-200',
      points: ['Upload assignments & notices', 'Manage attendance', 'Grade submissions']
    },
    {
      emoji: '📣',
      icon: <Shield size={28} />,
      title: 'Coordinators',
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-white',
      borderColor: 'border-indigo-200',
      points: ['Oversee student records', 'Handle notifications', 'Manage departments']
    },
  ];

  const features = [
    { icon: <User size={20} />, text: 'Role-based login & dashboards' },
    { icon: <Mail size={20} />, text: 'Automated email notifications' },
    { icon: <Award size={20} />, text: 'Transparent approval system' },
    { icon: <Calendar size={20} />, text: 'Academic calendar integration' },
    { icon: <Bell size={20} />, text: 'Real-time notifications' },
    { icon: <Shield size={20} />, text: 'Secure data protection' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-purple-100 to-white p-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-white p-4 rounded-full shadow-md">
          <div className="text-4xl">📚</div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-4 text-center"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
          Welcome to EduKita
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-800 text-lg md:text-xl mb-12 text-center max-w-2xl"
        style={{ fontFamily: 'monospace' }}
      >
        <p>{typedText}<span className="blinking-cursor">|</span></p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 mb-10 w-full justify-center">
        {roleCards.map((role, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.2 }}
            key={role.title}
            className={`hover:shadow-lg transform transition-transform hover:-translate-y-2 ${role.bgColor} rounded-2xl shadow-md p-6 w-full md:w-72 text-center border ${role.borderColor}`}
          >
            <div className="text-3xl mb-2">{role.emoji}</div>
            <div className={`inline-flex items-center justify-center p-2 mb-3 rounded-full bg-gradient-to-br ${role.color} text-white`}>
              {role.icon}
            </div>
            <h2 className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${role.color} mb-3`}>
              {role.title}
            </h2>
            <ul className="text-gray-600 text-sm space-y-2">
              {role.points.map(point => (
                <li key={point} className="flex items-start">
                  <span className="mr-2 text-pink-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showFeatures ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className={`bg-white rounded-2xl shadow-lg p-8 w-full md:w-[900px] text-center border border-gray-200 mb-10 ${!showFeatures && 'hidden'}`}
      >
        <div className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
          <span className="text-pink-400 text-2xl">💡</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Key Features
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-full bg-pink-100 text-pink-500">
                {feature.icon}
              </div>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={showFeatures ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <button
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 transform transition-all flex items-center gap-2"
          onClick={() => navigate("/home")}
        >
          <span>Proceed to Login</span>
          <ArrowRight size={18} />
        </button>

        <button
          className="text-gray-600 font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => navigate("/learn-more")}
        >
          Learn More
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
