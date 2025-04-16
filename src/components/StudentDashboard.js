import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaChartBar,
  FaBullhorn,
  FaClipboardList,
  FaCheckCircle,
  FaArrowLeft,
  FaCommentDots,
  FaCalendarAlt,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTrophy,
  FaGraduationCap,
  FaQuestionCircle,
  FaEnvelope
} from "react-icons/fa";

function StudentDashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Assignment due tomorrow!", isNew: true },
    { id: 2, text: "Attendance below 75% in Math", isNew: true },
    { id: 3, text: "New notice from principal", isNew: false }
  ]);
  const [userName, setUserName] = useState("");

// Fetch from localStorage when dashboard mounts
useEffect(() => {
  const storedStudent = JSON.parse(localStorage.getItem("studentUser"));
  if (storedStudent?.name) {
    setUserName(storedStudent.name);
  } else {
    setUserName("Student");
  }
}, []);


  const [recentAssignments, setRecentAssignments] = useState([
    { id: 1, subject: "Mathematics", title: "Calculus Problem Set", dueDate: "Apr 10" },
    { id: 2, subject: "Physics", title: "Wave Mechanics Report", dueDate: "Apr 12" }
  ]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FaGraduationCap className="text-purple-600 text-3xl mr-3" />
            <h1 className="text-xl font-bold text-purple-800">EduKita</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</p>
              <p className="font-medium text-purple-700">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            
            <div className="relative">
              <button className="p-2 text-purple-600 hover:text-purple-800 focus:outline-none">
                <FaBell size={20} />
                {notifications.filter(n => n.isNew).length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                <FaUser className="text-purple-700" />
              </div>
              <span className="font-medium text-purple-800">{userName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-800">
            {getGreeting()}, {userName.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">Welcome to your student dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Menu */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-6">Quick Access</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link
                  to="/assignments"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaBook size={26} />
                  </div>
                  <span className="font-medium text-center">Assignments</span>
                </Link>

                <Link
                  to="/view-attendance"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaChartBar size={26} />
                  </div>
                  <span className="font-medium text-center">Attendance</span>
                </Link>

                <Link
                  to="/view-notices"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaBullhorn size={26} />
                  </div>
                  <span className="font-medium text-center">Notices</span>
                </Link>

                <Link
                  to="/leave-application"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaClipboardList size={26} />
                  </div>
                  <span className="font-medium text-center">Leave Form</span>
                </Link>

                <Link
                  to="/leave-status"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaCheckCircle size={26} />
                  </div>
                  <span className="font-medium text-center">Leave Status</span>
                </Link>

                <Link
                  to="/feedback"
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 text-purple-700 border border-purple-100"
                >
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaCommentDots size={26} />
                  </div>
                  <span className="font-medium text-center">Feedback</span>
                </Link>
              </div>
            </div>
            
            {/* Upcoming Assignments Section */}
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-purple-700">Upcoming Assignments</h3>
                <Link to="/assignments" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  View all
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentAssignments.map(assignment => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border-l-4 border-purple-500">
                    <div>
                      <p className="font-medium text-gray-800">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaCalendarAlt className="text-purple-600 mr-1" />
                      <span className="font-medium">Due: {assignment.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Notifications */}
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-purple-700">Notifications</h3>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Mark all read
                </button>
              </div>
              
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.isNew ? 'bg-purple-50' : 'bg-white'} border border-gray-100 shadow-sm`}
                  >
                    <div className="flex items-start">
                      {notification.isNew && (
                        <span className="h-2 w-2 mt-1.5 mr-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                      )}
                      <p className={`${notification.isNew ? 'font-medium' : ''} text-gray-700`}>
                        {notification.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievement Stats */}
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-4">Your Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Attendance</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Assignments Completed</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Overall Grade</span>
                    <span>B+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="bg-purple-100 p-3 rounded-lg flex items-center">
                  <FaTrophy className="text-yellow-500 mr-2" size={20} />
                  <span className="font-medium text-purple-800">Achievement Rank: 42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with back button */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-md mt-6 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Logout
          </button>
          
          <div className="flex space-x-4">
          <Link to="/faculty-help" title="Help">
            <button className="p-2 text-purple-600 hover:text-purple-800">
              <FaQuestionCircle size={20} />
            </button>
            </Link>
            <button className="p-2 text-purple-600 hover:text-purple-800">
              <FaEnvelope size={20} />
            </button>
            <button className="p-2 text-purple-600 hover:text-purple-800">
              <FaCog size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentDashboard;