import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaUpload, 
  FaClipboardList, 
  FaBullhorn, 
  FaArrowLeft, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaBell,
  FaFileAlt,
  FaCheck,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaQuestion
} from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  }),
};

// Animation for notification badge
const notificationVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 10
    } 
  }
};

function FacultyDashboard() {
  const [facultyName, setFacultyName] = useState("Faculty");
  const [position, setPosition] = useState("Faculty Member");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [upcomingTasks, setUpcomingTasks] = useState([
    { id: 1, title: "Grade Math Assignment", deadline: "Today, 5:00 PM", priority: "high" },
    { id: 2, title: "Submit Monthly Report", deadline: "Tomorrow", priority: "medium" },
    { id: 3, title: "Department Meeting", deadline: "Apr 10, 11:00 AM", priority: "low" }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New leave application from Student", time: "2 hours ago", read: false },
    { id: 2, text: "Assignment submission deadline today", time: "5 hours ago", read: false },
    { id: 3, text: "Faculty meeting scheduled", time: "Yesterday", read: true }
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem("facultyName");
    const storedPosition = localStorage.getItem("facultyPosition");

    if (storedName) setFacultyName(storedName);
    if (storedPosition) setPosition(storedPosition);

    // Update clock every minute
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

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const mainCards = [
    {
      icon: <FaUpload className="text-4xl mb-2 group-hover:scale-110 transition-transform" />,
      label: "Upload Assignments",
      description: "Create and manage student assignments",
      link: "/upload-assignments",
    },
    {
      icon: <FaClipboardList className="text-4xl mb-2 group-hover:rotate-6 transition-transform" />,
      label: "Upload Attendance",
      description: "Mark and update student attendance",
      link: "/upload-attendance",
    },
    {
      icon: <FaBullhorn className="text-4xl mb-2 group-hover:scale-125 transition-transform" />,
      label: "Post Notice",
      description: "Share important announcements",
      link: "/post-notice",
    },
  ];

  const quickAccessOptions = [
    { icon: <FaFileAlt />, label: "Assignment Responses", link: "/assignment-responses" },
    { icon: <FaCheck />, label: "Approve Leave", link: "/approve-leave" },
    { icon: <FaChartLine />, label: "Performance Reports", link: "/faculty-performance" },
    { icon: <FaCalendarAlt />, label: "Schedule", link: "/faculty-schedule" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white/70 backdrop-blur-md shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaChalkboardTeacher className="text-purple-600 text-2xl" />
            <h1 className="text-xl font-bold text-purple-800">EduKita</h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Date and Time */}
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</p>
              <p className="font-medium text-purple-700">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaBell className="text-purple-600 text-xl" />
                {unreadNotificationsCount > 0 && (
                  <motion.div 
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    variants={notificationVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {unreadNotificationsCount}
                  </motion.div>
                )}
              </button>

              {/* Notification Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10 py-2 border border-purple-100">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-purple-800">Notifications</h3>
                    <button className="text-xs text-purple-600 hover:text-purple-800">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-purple-50 ${!notification.read ? 'bg-purple-50' : ''}`}
                      >
                        <div className="flex items-start">
                          {!notification.read && (
                            <div className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-pink-500 flex-shrink-0"></div>
                          )}
                          <div>
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <Link to="/notifications" className="text-xs text-purple-600 hover:text-purple-800">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="font-medium text-purple-800">{facultyName}</p>
                <p className="text-xs text-gray-600">{position}</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {facultyName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Welcome Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-2">
              {getGreeting()}, {facultyName.split(' ')[0]}!
            </h2>
            <p className="text-gray-700">
              Welcome to your faculty dashboard. Here's what you need to know today.
            </p>
          </motion.div>

          {/* Main Cards */}
          <div className="bg-white/30 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainCards.map((card, i) => (
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  key={i}
                  className="h-full"
                >
                  <Link
                    to={card.link}
                    title={card.label}
                    className="group bg-white/60 backdrop-blur-lg hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 rounded-xl p-6 shadow hover:shadow-xl flex flex-col h-full items-center justify-center text-center focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {card.icon}
                    <span className="text-lg font-semibold mt-2">{card.label}</span>
                    <p className="text-sm mt-2 opacity-70 group-hover:opacity-90">{card.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <motion.div 
            className="bg-white/30 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-800">Upcoming Tasks</h3>
              <Link to="/tasks" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-white/70 rounded-lg p-4 shadow-sm flex justify-between items-center border-l-4 border-l-purple-500"
                >
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center mt-1">
                      <FaCalendarAlt className="text-purple-500 text-xs mr-1" />
                      <span className="text-sm text-gray-600">{task.deadline}</span>
                    </div>
                  </div>
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'}
                  `}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          {/* Profile Card */}
          <motion.div 
            className="bg-white/30 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {facultyName.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-purple-800">{facultyName}</h3>
              <p className="text-gray-600 mb-4">{position}</p>
              
              <div className="flex justify-between w-full text-center">
                <div className="px-2">
                  <p className="font-bold text-purple-700">24</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="px-2 border-x border-gray-200">
                  <p className="font-bold text-purple-700">4</p>
                  <p className="text-xs text-gray-600">Classes</p>
                </div>
                <div className="px-2">
                  <p className="font-bold text-purple-700">7</p>
                  <p className="text-xs text-gray-600">Assignments</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Access */}
          <motion.div 
            className="bg-white/30 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-purple-800 mb-4">Quick Access</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {quickAccessOptions.map((option, index) => (
                <Link 
                  key={index} 
                  to={option.link}
                  className="flex flex-col items-center p-3 bg-white/70 rounded-lg shadow-sm hover:shadow hover:bg-purple-50 transition-all text-center"
                >
                  <div className="text-purple-600 mb-2">{option.icon}</div>
                  <span className="text-xs font-medium">{option.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
          
          {/* Help & Support */}
          <motion.div 
            className="bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg rounded-2xl p-6 text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <FaQuestion className="mr-2" />
              <h3 className="text-lg font-bold">Need Help?</h3>
            </div>
            <p className="text-sm mb-4 text-white/90">
              Having trouble with the system? Contact our support team or check the help center.
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-2 text-sm font-medium">
              Visit Help Center
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-md shadow-md p-4 mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <FaSignOutAlt /> Logout
            </Link>
          </div>
          
          <div className="flex gap-4">
            <Link to="/faculty-help" className="text-purple-700 hover:text-purple-900">
              <FaQuestion />
            </Link>
            <Link to="/faculty-message" className="text-purple-700 hover:text-purple-900">
              <FaEnvelope />
            </Link>
            <Link to="/faculty-settings" className="text-purple-700 hover:text-purple-900">
              <FaCog />
            </Link>
          </div>
        </div>
      </footer>
      
      {/* Floating Decorative Icons - kept from original but made more subtle */}
      <div className="fixed top-20 left-10 text-purple-200 text-6xl animate-bounce-slow blur-sm opacity-20 pointer-events-none">🎓</div>
      <div className="fixed bottom-16 right-12 text-pink-200 text-5xl animate-pulse blur-sm opacity-20 pointer-events-none">📚</div>
      <div className="fixed top-1/3 right-24 text-blue-200 text-7xl animate-float blur-sm opacity-10 pointer-events-none">✨</div>
    </div>
  );
}

export default FacultyDashboard;