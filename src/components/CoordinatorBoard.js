import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaClipboardCheck, 
  FaChartPie, 
  FaCommentDots, 
  FaComments, 
  FaArrowLeft, 
  FaBell,
  FaCalendarAlt,
  FaUserCircle,
  FaSearch,
  FaEllipsisH
} from "react-icons/fa";

function CoordinatorBoard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Set greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };
    
    updateGreeting();
    
    // Update time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Mock data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      action: "New leave request from Sarah Johnson", 
      time: "10 minutes ago",
      priority: "high",
      icon: <FaClipboardCheck className="text-blue-500" />
    },
    { 
      id: 2, 
      action: "Feedback form submitted by Team Alpha", 
      time: "2 hours ago",
      priority: "medium",
      icon: <FaCommentDots className="text-purple-500" />
    },
    { 
      id: 3, 
      action: "Leave request approved for Alex Chen", 
      time: "Yesterday",
      priority: "normal",
      icon: <FaClipboardCheck className="text-green-500" />
    }
  ];

  // Mock data for notifications
  const notificationsList = [
    {
      id: 1,
      title: "New Leave Request",
      message: "Sarah Johnson has submitted a new leave request",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Feedback Submitted",
      message: "Team Alpha has submitted their monthly feedback",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      title: "System Update",
      message: "The system will undergo maintenance tonight",
      time: "5 hours ago",
      read: false
    }
  ];

  // Mock data for stats
  const stats = [
    { label: "Leave Requests", value: 12, trend: "+3", trendDir: "up" },
    { label: "Pending Approvals", value: 5, trend: "-2", trendDir: "down" },
    { label: "New Feedback", value: 8, trend: "+5", trendDir: "up" }
  ];

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleNotificationsPanel = () => {
    setShowNotificationsPanel(!showNotificationsPanel);
  };

  const markAllAsRead = () => {
    setNotifications(0);
    setShowNotificationsPanel(false);
  };

  const cardSections = [
    {
      path: "/coordinator-dashboard",
      icon: <FaClipboardCheck size={28} className="text-blue-600" />,
      bgClass: "from-blue-50 to-purple-50",
      iconBg: "bg-blue-100",
      title: "View Leave Forms",
      description: "Manage & respond to leave requests"
    },
    {
      path: "/analytics",
      icon: <FaChartPie size={28} className="text-purple-600" />,
      bgClass: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      title: "Leave Analysis",
      description: "View trends & patterns in leave data"
    },
    {
      path: "/feedback-analysis",
      icon: <FaCommentDots size={28} className="text-pink-600" />,
      bgClass: "from-pink-50 to-purple-50",
      iconBg: "bg-pink-100",
      title: "Feedback Analysis",
      description: "Track & analyze employee feedback"
    },
    {
      path: "/view-feedback",
      icon: <FaComments size={28} className="text-green-600" />,
      bgClass: "from-green-50 to-blue-50",
      iconBg: "bg-green-100",
      title: "View Feedback Forms",
      description: "Review submitted feedback forms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white bg-opacity-85 backdrop-blur-lg rounded-3xl shadow-xl p-4 md:p-8">
          {/* Top navigation bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-purple-100">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white mr-4">
                <FaUserCircle size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
                  Coordinator Dashboard
                </h1>
                <div className="flex flex-col md:flex-row md:items-center text-gray-600 text-sm">
                  <span className="font-medium">{formatDate()}</span>
                  <span className="hidden md:block mx-2">•</span>
                  <span>
                    {greeting}, <span className="text-purple-600 font-medium">Admin</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <button 
                  onClick={toggleNotificationsPanel}
                  className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors relative"
                >
                  <FaBell size={20} className="text-purple-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {/* Notifications Panel */}
                {showNotificationsPanel && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 overflow-hidden">
                    <div className="flex justify-between items-center p-3 bg-purple-50 border-b border-purple-100">
                      <h3 className="font-semibold text-purple-800">Notifications</h3>
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notificationsList.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-purple-50' : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">{notification.title}</h4>
                            {!notification.read && (
                              <span className="h-2 w-2 bg-pink-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 my-1">{notification.message}</p>
                          <p className="text-xs text-purple-600">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center bg-purple-50">
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-purple-800">{stat.value}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trendDir === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cards grid */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cardSections.map((card, index) => (
                <Link
                  key={index}
                  to={card.path}
                  className={`flex items-center justify-center flex-col gap-3 p-6 bg-gradient-to-br ${card.bgClass} rounded-2xl shadow-md hover:shadow-xl hover:scale-102 transition-all duration-300 border border-purple-100 group`}

                >
                 <div className={`${card.iconBg} p-4 rounded-full group-hover:scale-110 transition-transform duration-300`}>

                    {card.icon}
                  </div>
                  <span className="font-semibold text-gray-800 text-lg">{card.title}</span>
                  <p className="text-sm text-gray-500 text-center">{card.description}</p>
                </Link>
              ))}
            </div>

            {/* Recent activities section */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-800">Recent Activities</h2>
                <button className="text-gray-400 hover:text-purple-600 transition-colors">
                  <FaEllipsisH />
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {recentActivities.map(activity => (
                  <div 
                    key={activity.id} 
                    className={`bg-gradient-to-r border-l-4 ${
                      activity.priority === 'high' 
                        ? 'border-pink-500 from-pink-50 to-white' 
                        : activity.priority === 'medium'
                        ? 'border-purple-500 from-purple-50 to-white'
                        : 'border-blue-500 from-blue-50 to-white'
                    } rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
                  >
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-white mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <p className="text-xs text-purple-600 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-purple-100 text-center">
                <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center justify-center mx-auto">
                  View All Activities
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar preview section */}
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-md border border-purple-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-purple-800">Upcoming Events</h2>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">{currentTime.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm flex-1 min-w-60">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="font-medium">Team Meeting</h4>
                </div>
                <p className="text-sm text-gray-600">Today, 3:00 PM - 4:00 PM</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm flex-1 min-w-60">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <h4 className="font-medium">Project Review</h4>
                </div>
                <p className="text-sm text-gray-600">Tomorrow, 11:00 AM</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm flex-1 min-w-60">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <h4 className="font-medium">Monthly Report Due</h4>
                </div>
                <p className="text-sm text-gray-600">Friday, April 12</p>
              </div>
            </div>
            
            <div className="mt-3 text-right">
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Full Calendar
              </button>
            </div>
          </div>

          {/* Footer with back button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom decorative elements */}
      <div className="fixed top-10 right-10 h-24 w-24 rounded-full bg-pink-400 opacity-20 blur-xl"></div>
      <div className="fixed bottom-10 left-10 h-32 w-32 rounded-full bg-purple-400 opacity-20 blur-xl"></div>
      <div className="fixed bottom-20 right-20 h-16 w-16 rounded-full bg-purple-600 opacity-10 blur-xl"></div>
      <div className="fixed top-20 left-20 h-20 w-20 rounded-full bg-pink-600 opacity-10 blur-xl"></div>
    </div>
  );
}

export default CoordinatorBoard;