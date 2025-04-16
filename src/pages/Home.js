import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bell,
  Calendar,
  Users,
  Info,
  HelpCircle,
} from "lucide-react";

const Home = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [hoverRole, setHoverRole] = useState(null);

  const quotes = [
    "Empowering Students, Enabling Faculty, Enhancing Coordination",
    "Attendance, Assignments & Announcements—all in one place.",
    "Your Academic Companion for Smarter Campus Life",
    "Connect, Learn, Succeed – With EduKita",
    "Streamline your college experience effortlessly",
  ];

  const roleInfo = {
    student: {
      title: "Student Access",
      description:
        "Access assignments, check attendance, and view important notices",
    },
    faculty: {
      title: "Faculty Portal",
      description:
        "Manage classes, post assignments, and track student progress",
    },
    coordinator: {
      title: "Coordinator Dashboard",
      description:
        "Oversee departments, manage faculty, and coordinate academic activities",
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fce4ec] via-[#f3e5f5] to-[#ede7f6] flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Top Wavy SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            fill="#f3e5f5"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Nav */}
        <nav className="bg-white/60 border border-white/40 backdrop-blur-xl shadow-md rounded-xl p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-purple-600" size={24} />
            <h2 className="font-semibold text-gray-700">EduKita</h2>
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 flex items-center"
            >
              <Info size={16} className="mr-1" />
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 flex items-center"
            >
              <HelpCircle size={16} className="mr-1" />
              Help
            </a>
          </div>
        </nav>

        {/* Hero Card */}
        <div className="bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-8 text-center backdrop-blur-xl transition duration-300 animate-fade-in mb-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d63384] to-[#6f42c1] mb-4 animate-pulse drop-shadow-lg">
            EduKita
          </h1>
          <p className="text-gray-800 text-lg md:text-xl font-medium mb-3">
            Your one-stop solution for assignments, attendance & notices.
          </p>
          <p className="text-[#6f42c1] italic text-sm md:text-base mb-6 transition-all duration-500 ease-in-out">
            "{quotes[quoteIndex]}"
          </p>
          <Link to="/login">
            <button className="w-full max-w-md bg-[#d63384] hover:bg-[#b52d6f] text-white font-semibold py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Go to Login
            </button>
          </Link>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {["student", "faculty", "coordinator"].map((role) => (
            <div
              key={role}
              className={`bg-white/70 p-6 rounded-2xl shadow transition-all backdrop-blur hover:shadow-lg hover:-translate-y-1 ${
                hoverRole === role ? "scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoverRole(role)}
              onMouseLeave={() => setHoverRole(null)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 text-3xl text-purple-600">
                  {role === "student" && "🎓"}
                  {role === "faculty" && "👨‍🏫"}
                  {role === "coordinator" && "🧑‍💼"}
                </div>
                <h3 className="font-medium text-gray-800 capitalize">{role}</h3>
                {hoverRole === role && (
                  <div className="mt-3 text-sm text-gray-600 transition-all duration-300">
                    <p className="font-semibold">{roleInfo[role].title}</p>
                    <p>{roleInfo[role].description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-sm">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-purple-600"
          >
            <Calendar size={16} className="mr-2" />
            Academic Calendar
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-purple-600"
          >
            <Bell size={16} className="mr-2" />
            Announcements
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-purple-600"
          >
            <BookOpen size={16} className="mr-2" />
            Course Catalog
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-purple-600"
          >
            <Users size={16} className="mr-2" />
            Community
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          © 2025 EduKita - College Management System
        </div>
      </div>

      {/* Bottom Wavy SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-20 rotate-180"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.00,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            fill="#f3e5f5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
