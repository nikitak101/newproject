import React, { useState, useEffect } from "react";
import Attendance from "./Attendance";
import { FaClipboardList, FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, Info } from "lucide-react";

function UploadAttendance() {
  const navigate = useNavigate();
  const [showTip, setShowTip] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation when component mounts
    setPageLoaded(true);
    
    // Auto-hide the tip after 5 seconds
    const tipTimer = setTimeout(() => {
      setShowTip(false);
    }, 5000);
    
    return () => clearTimeout(tipTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-100 to-purple-400 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce-slow pointer-events-none">
          📋
        </div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-pulse pointer-events-none">
          📝
        </div>
        <div className="absolute top-1/3 right-20 text-4xl opacity-10 animate-float pointer-events-none">
          ✅
        </div>
        <div className="absolute bottom-1/4 left-20 text-5xl opacity-10 animate-bounce-slow pointer-events-none">
          📊
        </div>
      </div>

      {/* Back Button - Top Left Corner */}
      <div className={`absolute top-6 left-6 z-20 transition-all duration-500 ${pageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <button
          onClick={() => navigate("/faculty-dashboard")}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>

      {/* Tip Message */}
      <div 
        className={`absolute top-20 right-6 max-w-xs bg-purple-800 text-white p-4 rounded-xl shadow-lg transition-all duration-500 cursor-pointer ${showTip ? 'opacity-90 translate-x-0' : 'opacity-0 translate-x-10'}`}
        onClick={() => setShowTip(false)}
      >
        <div className="flex items-start gap-3">
          <FaRegLightbulb className="text-yellow-300 mt-1" size={20} />
          <div>
            <h4 className="font-bold mb-1">Pro Tip</h4>
            <p className="text-sm opacity-90">You can upload multiple attendance records at once by selecting multiple files.</p>
          </div>
        </div>
      </div>

      {/* Info Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setShowTip(prev => !prev)}
          className="bg-white/30 hover:bg-white/50 backdrop-blur-md text-purple-800 p-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
          aria-label="Show tips"
        >
          <Info size={20} />
        </button>
      </div>

      {/* Main Content Card */}
      <div className={`bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl w-full max-w-4xl z-10 transition-all duration-700 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-3xl p-6 mb-6">
          <h2 className="text-4xl font-bold text-center font-poppins flex items-center justify-center gap-3">
            <FaClipboardList className="animate-pulse" /> 
            Upload Attendance
          </h2>
          <p className="text-center mt-2 text-white/80 max-w-2xl mx-auto">
            Upload, review and manage student attendance records
          </p>
        </div>

        {/* Card with Stats Indicators */}
        <div className="px-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="bg-purple-200 p-3 rounded-lg">
                <Users size={24} className="text-purple-700" />
              </div>
              <div>
                <h3 className="text-purple-800 font-semibold">Students</h3>
                <p className="text-purple-600 text-sm">Track attendance easily</p>
              </div>
            </div>
            
            <div className="bg-pink-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="bg-pink-200 p-3 rounded-lg">
                <Calendar size={24} className="text-pink-700" />
              </div>
              <div>
                <h3 className="text-pink-800 font-semibold">Schedule</h3>
                <p className="text-pink-600 text-sm">Organize by date & course</p>
              </div>
            </div>
            
            <div className="bg-purple-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="bg-purple-200 p-3 rounded-lg">
                <Info size={24} className="text-purple-700" />
              </div>
              <div>
                <h3 className="text-purple-800 font-semibold">Records</h3>
                <p className="text-purple-600 text-sm">Update & sync data</p>
              </div>
            </div>
          </div>

          {/* Attendance Component */}
          <div className="bg-white rounded-2xl p-6 shadow-inner mb-6">
            <Attendance />
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 6s infinite ease-in-out;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
          }
          .animate-float {
            animation: float 8s infinite ease-in-out;
          }
          @keyframes pulse-subtle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
          }
          .pulse-subtle {
            animation: pulse-subtle 4s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default UploadAttendance;