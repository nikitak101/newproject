import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaChartBar, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const subjects = ["COA", "DS", "MI", "OE", "MDM"];
const subjectFullNames = {
  "COA": "Computer Organization & Architecture",
  "DS": "Data Structures",
  "MI": "Management Information",
  "OE": "Open Elective",
  "MDM": "Mobile Device Management"
};

function ViewAttendance() {
  const [attendance, setAttendance] = useState({});
  const [attendancePercentages, setAttendancePercentages] = useState({});
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);
  const navigate = useNavigate();
  const rollNumber = localStorage.getItem("loggedInRollNo");

  // Get dates for the past week
  const getPastDays = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const recentDates = getPastDays(7);

  // Calculate streak and warning thresholds
  const [attendanceStreak, setAttendanceStreak] = useState(0);
  const [warningSubjects, setWarningSubjects] = useState([]);

  useEffect(() => {
    if (!rollNumber) {
      setError("⚠️ You are not logged in! Please log in again.");
      setLoading(false);
      return;
    }

    // Fetch student info
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = students.find(student => student.rollNo === rollNumber);
    if (currentStudent) {
      setStudentInfo(currentStudent);
    }

    setLoading(true);
    
    // Fetch attendance data
    let fetchedAttendance = {};
    subjects.forEach((subject) => {
      const subjectAttendance = JSON.parse(
        localStorage.getItem(`attendance-${subject}-${selectedDate}`)
      ) || {};
      fetchedAttendance[subject] = subjectAttendance[rollNumber] || "ABSENT";
    });

    setAttendance(fetchedAttendance);
    calculateAttendancePercentage();
    calculateAttendanceStreak();
    
    setLoading(false);
  }, [rollNumber, selectedDate]);

  function getFormattedDate() {
    const today = new Date();
    return formatDate(today);
  }

  function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function calculateAttendancePercentage() {
    let percentages = {};
    let warnings = [];

    subjects.forEach((subject) => {
      let total = 0;
      let present = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`attendance-${subject}-`)) {
          const data = JSON.parse(localStorage.getItem(key));
          if (data[rollNumber]) {
            total++;
            if (data[rollNumber] === "PRESENT") {
              present++;
            }
          }
        }
      }

      const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : "N/A";
      percentages[subject] = percentage;
      
      // Check for warning threshold
      if (percentage !== "N/A" && parseFloat(percentage) < 75) {
        warnings.push(subject);
      }
    });

    setAttendancePercentages(percentages);
    setWarningSubjects(warnings);
  }

  function calculateAttendanceStreak() {
    let streak = 0;
    let allPresent = true;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = formatDate(checkDate);
      
      // Check if all subjects have attendance on this date
      let dayPresent = true;
      
      subjects.forEach((subject) => {
        const subjectAttendance = JSON.parse(
          localStorage.getItem(`attendance-${subject}-${dateStr}`)
        ) || {};
        
        if (subjectAttendance[rollNumber] !== "PRESENT") {
          dayPresent = false;
        }
      });
      
      if (dayPresent) {
        streak++;
      } else {
        break;
      }
    }
    
    setAttendanceStreak(streak);
  }

  // Get attendance data for a specific date
  const getDateAttendance = (date) => {
    let result = {};
    subjects.forEach((subject) => {
      const subjectAttendance = JSON.parse(
        localStorage.getItem(`attendance-${subject}-${date}`)
      ) || {};
      result[subject] = subjectAttendance[rollNumber] || "ABSENT";
    });
    return result;
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === formatDate(today)) {
      return "Today";
    } else if (dateString === formatDate(yesterday)) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 flex flex-col items-center justify-center px-4 py-10 relative">
      {/* Decorative elements */}
      <div className="fixed top-40 right-40 h-64 w-64 rounded-full bg-pink-300 opacity-10 blur-3xl"></div>
      <div className="fixed bottom-40 left-40 h-64 w-64 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-5xl mt-16"
      >
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">
          📊 Attendance Dashboard
        </h2>

        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-3 text-xl" />
            <p className="font-medium">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Student info card */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-1">
                    🎓 Student Information
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <p className="text-purple-800 font-semibold">
                      Roll No: {rollNumber}
                    </p>
                    {studentInfo && (
                      <p className="text-purple-800 font-semibold">
                        Name: {studentInfo.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {attendanceStreak > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-full px-4 py-1 flex items-center">
                      <span className="text-xl mr-1">🔥</span>
                      <span className="font-medium text-purple-800">{attendanceStreak} Day Streak</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 bg-white bg-opacity-70 rounded-lg px-4 py-2">
                    <FaCalendarAlt className="text-purple-500" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tab navigation */}
            <div className="flex gap-2 mb-6 justify-center sm:justify-start overflow-x-auto pb-2">
              <button 
                onClick={() => setActiveTab("daily")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "daily" 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                Daily Status
              </button>
              <button 
                onClick={() => setActiveTab("summary")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "summary" 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                Summary
              </button>
              <button 
                onClick={() => setActiveTab("weekly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "weekly" 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                Weekly View
              </button>
            </div>

            {/* Warning notification if attendance below threshold */}
            {warningSubjects.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Attendance Warning!</span> Your attendance is below 75% in: {warningSubjects.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Daily Tab Content */}
            {activeTab === "daily" && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-x-auto"
              >
                <table className="min-w-full border text-center rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800">
                    <tr>
                      <th className="py-3 px-4 border">📘 Subject</th>
                      <th className="py-3 px-4 border">📝 Full Name</th>
                      <th className="py-3 px-4 border">✅ Status</th>
                      <th className="py-3 px-4 border">📈 Overall %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {subjects.map((subject, index) => (
                      <motion.tr
                        key={subject}
                        variants={itemVariants}
                        className="hover:bg-purple-50 transition"
                      >
                        <td className="py-4 px-4 border font-medium text-purple-700">{subject}</td>
                        <td className="py-4 px-4 border text-gray-700">{subjectFullNames[subject]}</td>
                        <td className="py-4 px-4 border">
                          {attendance[subject] === "PRESENT" ? (
                            <div className="flex items-center justify-center">
                              <FaCheckCircle className="text-green-500 mr-2" />
                              <span className="font-semibold text-green-600">PRESENT</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <FaTimesCircle className="text-red-500 mr-2" />
                              <span className="font-semibold text-red-500">ABSENT</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 border">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  parseFloat(attendancePercentages[subject]) >= 75 
                                    ? 'bg-green-500' 
                                    : parseFloat(attendancePercentages[subject]) >= 60 
                                      ? 'bg-yellow-500' 
                                      : 'bg-red-500'
                                }`}
                                style={{ width: `${attendancePercentages[subject] === 'N/A' ? 0 : Math.min(parseFloat(attendancePercentages[subject]), 100)}%` }}
                              ></div>
                            </div>
                            <span className={`font-medium ${
                              parseFloat(attendancePercentages[subject]) >= 75 
                                ? 'text-green-600' 
                                : parseFloat(attendancePercentages[subject]) >= 60 
                                  ? 'text-yellow-600' 
                                  : 'text-red-600'
                            }`}>
                              {attendancePercentages[subject]}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Summary Tab Content */}
            {activeTab === "summary" && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible" 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100"
                  >
                    <div className={`p-4 ${parseFloat(attendancePercentages[subject]) >= 75 
                      ? 'bg-gradient-to-r from-green-500 to-green-400' 
                      : parseFloat(attendancePercentages[subject]) >= 60 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' 
                        : 'bg-gradient-to-r from-red-500 to-red-400'}`}>
                      <h3 className="text-xl font-bold text-white">{subject}</h3>
                      <p className="text-white text-opacity-90 text-sm">{subjectFullNames[subject]}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Attendance:</span>
                        <span className="font-bold text-xl text-purple-700">{attendancePercentages[subject]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`h-3 rounded-full ${
                            parseFloat(attendancePercentages[subject]) >= 75 
                              ? 'bg-green-500' 
                              : parseFloat(attendancePercentages[subject]) >= 60 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${attendancePercentages[subject] === 'N/A' ? 0 : Math.min(parseFloat(attendancePercentages[subject]), 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {parseFloat(attendancePercentages[subject]) < 75 ? (
                          <p className="text-red-600">
                            ⚠️ Below 75% attendance threshold
                          </p>
                        ) : (
                          <p className="text-green-600">
                            ✅ Good standing
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Overall summary card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 sm:col-span-2 lg:col-span-3 rounded-xl shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                    <FaChartBar className="mr-2" /> Overall Attendance Summary
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Average Attendance</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {Object.values(attendancePercentages).filter(val => val !== "N/A").length > 0
                          ? (Object.values(attendancePercentages)
                              .filter(val => val !== "N/A")
                              .reduce((sum, val) => sum + parseFloat(val), 0) / 
                              Object.values(attendancePercentages).filter(val => val !== "N/A").length).toFixed(1) + "%"
                          : "N/A"}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Perfect Attendance Days</p>
                      <p className="text-2xl font-bold text-purple-700">{attendanceStreak}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Critical Subjects</p>
                      <p className="text-2xl font-bold text-red-500">{warningSubjects.length}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Weekly View Tab Content */}
            {activeTab === "weekly" && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="overflow-x-auto pb-2">
                  <table className="min-w-full border text-center rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800">
                      <tr>
                        <th className="py-3 px-4 border">Subject</th>
                        {recentDates.map(date => (
                          <th key={date} className="py-3 px-4 border whitespace-nowrap">
                            {formatDisplayDate(date)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {subjects.map((subject, index) => (
                        <motion.tr
                          key={subject}
                          variants={itemVariants}
                          className="hover:bg-purple-50 transition"
                        >
                          <td className="py-3 px-4 border font-medium text-purple-700">{subject}</td>
                          {recentDates.map(date => {
                            const dateAttendance = getDateAttendance(date);
                            return (
                              <td key={date} className="py-3 px-4 border">
                                {dateAttendance[subject] === "PRESENT" ? (
                                  <div className="flex items-center justify-center">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                      <FaCheckCircle className="text-green-500" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center">
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                      <FaTimesCircle className="text-red-500" />
                                    </div>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-700">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-700">Absent</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ViewAttendance;