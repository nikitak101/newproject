import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaCalendarAlt, FaUserCheck, FaUserTimes, FaSearch, FaChalkboard } from "react-icons/fa";
import { AlertCircle, CheckCircle, BarChart2, ArrowLeft } from "lucide-react";

const subjects = ["COA", "DS", "MI", "OE", "MDM"];
const students = Array.from({ length: 149 }, (_, i) => `B${i + 1}`);

const getFormattedDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

const Attendance = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [attendance, setAttendance] = useState({});
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentPresentCounts, setStudentPresentCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [markAllPresent, setMarkAllPresent] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("attendance"); // 'attendance' or 'stats'

  useEffect(() => {
    // Trigger entrance animation
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedSubject && selectedDate) {
      setIsLoading(true);
      setTimeout(() => {
        const key = `attendance-${selectedSubject}-${selectedDate}`;
        const savedAttendance = JSON.parse(localStorage.getItem(key)) || {};
        setAttendance(savedAttendance);

        const countKey = `class-count-${selectedSubject}`;
        const existingCount = parseInt(localStorage.getItem(countKey)) || 0;

        if (!localStorage.getItem(key)) {
          const newCount = existingCount + 1;
          localStorage.setItem(countKey, newCount);
          setTotalClasses(newCount);
        } else {
          setTotalClasses(existingCount);
        }
        setIsLoading(false);
      }, 500); // Simulating a slight loading delay for better UX
    }
  }, [selectedSubject, selectedDate]);

  useEffect(() => {
    if (selectedSubject) {
      const counts = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`attendance-${selectedSubject}-`)) {
          const data = JSON.parse(localStorage.getItem(key));
          for (const rollNo in data) {
            if (data[rollNo] === "PRESENT") {
              counts[rollNo] = (counts[rollNo] || 0) + 1;
            }
          }
        }
      }
      setStudentPresentCounts(counts);
    }
  }, [selectedSubject, selectedDate, attendance]);

  // Filter students based on search term
  const filteredStudents = students.filter(rollNo => 
    rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAttendance = (rollNo) => {
    const updated = {
      ...attendance,
      [rollNo]: attendance[rollNo] === "PRESENT" ? "ABSENT" : "PRESENT",
    };
    setAttendance(updated);
    localStorage.setItem(
      `attendance-${selectedSubject}-${selectedDate}`,
      JSON.stringify(updated)
    );
  };

  const markAllStudents = (status) => {
    const updated = {};
    filteredStudents.forEach(rollNo => {
      updated[rollNo] = status;
    });
    setAttendance({...attendance, ...updated});
    localStorage.setItem(
      `attendance-${selectedSubject}-${selectedDate}`,
      JSON.stringify({...attendance, ...updated})
    );
    setMarkAllPresent(status === "PRESENT");
  };

  // Calculate overall attendance stats
  const calculateStats = () => {
    let totalPresent = 0;
    let totalStudents = students.length;
    
    for (const rollNo in studentPresentCounts) {
      totalPresent += studentPresentCounts[rollNo];
    }
    
    const averageAttendance = totalClasses > 0 ? 
      ((totalPresent / (totalClasses * totalStudents)) * 100).toFixed(1) : "0.0";
    
    const lowAttendanceCount = Object.values(studentPresentCounts).filter(
      count => (count / totalClasses) * 100 < 75
    ).length;
    
    return { averageAttendance, lowAttendanceCount };
  };

  const { averageAttendance, lowAttendanceCount } = calculateStats();

  return (
    <div className="min-h-screen p-4">
      {/* Subject Selection View */}
      {!selectedSubject ? (
        <div className={`transition-all duration-500 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6 flex items-center justify-center gap-2 drop-shadow">
            <FaChalkboardTeacher className="text-pink-600" /> Choose a Subject
          </h2>
          
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg border border-pink-100">
            <p className="text-gray-600 mb-4 text-center">Select a subject to record or view attendance</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold px-6 py-4 rounded-xl hover:from-pink-500 hover:to-purple-600 transition-all shadow-md hover:scale-105 w-full flex items-center justify-center gap-2"
                >
                  <FaChalkboard className="mr-1" /> {subject}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl p-6 shadow-md flex items-center">
              <div className="bg-purple-200 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-purple-700 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Quick Access</h3>
                <p className="text-sm text-gray-600">Choose a subject to view today's attendance</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-purple-50 rounded-xl p-6 shadow-md flex items-center">
              <div className="bg-pink-200 p-3 rounded-full mr-4">
                <BarChart2 className="text-pink-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pink-800">Statistics</h3>
                <p className="text-sm text-gray-600">Track attendance trends and analytics</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl p-6 shadow-md flex items-center">
              <div className="bg-purple-200 p-3 rounded-full mr-4">
                <AlertCircle className="text-purple-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Low Attendance</h3>
                <p className="text-sm text-gray-600">Identify students with attendance below 75%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Attendance Management View */
        <div className={`transition-all duration-500 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header with subject info */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white mb-6 shadow-lg">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <FaChalkboardTeacher /> {selectedSubject} Attendance
            </h2>
            <p className="text-center mt-2 opacity-90">
              Managing attendance records for {selectedSubject}
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex mb-6 bg-white/50 backdrop-blur rounded-xl p-1 shadow-md">
            <button 
              onClick={() => setActiveTab("attendance")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "attendance" 
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium shadow-md" 
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              <FaUserCheck /> Attendance
            </button>
            <button 
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "stats" 
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium shadow-md" 
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              <BarChart2 size={18} /> Statistics
            </button>
          </div>
          
          {activeTab === "attendance" ? (
            <>
              {/* Actions Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Date Selector */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-md flex flex-col justify-center items-center">
                  <label className="text-gray-700 flex items-center gap-2 mb-2 font-medium">
                    <FaCalendarAlt className="text-pink-500" /> Select Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="p-2 rounded-lg border border-pink-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 shadow-sm transition-all"
                  />
                </div>
                
                {/* Search */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-md">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by Roll No..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 shadow-sm transition-all"
                    />
                  </div>
                </div>
                
                {/* Mark All Buttons */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-md flex items-center justify-center gap-3">
                  <button
                    onClick={() => markAllStudents("PRESENT")}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-lg flex items-center gap-1 transition-all shadow-sm flex-1 justify-center"
                  >
                    <FaUserCheck /> All Present
                  </button>
                  <button
                    onClick={() => markAllStudents("ABSENT")}
                    className="bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-2 rounded-lg flex items-center gap-1 transition-all shadow-sm flex-1 justify-center"
                  >
                    <FaUserTimes /> All Absent
                  </button>
                </div>
              </div>
              
              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                /* Students Grid */
                <div className="bg-white/70 backdrop-blur rounded-xl p-6 shadow-lg mb-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <FaUserCheck className="text-pink-500" /> Student Attendance
                    <span className="ml-auto text-sm font-normal text-gray-500">
                      {filteredStudents.length} students
                    </span>
                  </h3>
                  
                  {filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {filteredStudents.map((rollNo) => {
                        const presentCount = studentPresentCounts[rollNo] || 0;
                        const percentage = totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(1) : "0.0";
                        const isLowAttendance = parseFloat(percentage) < 75;
                        
                        return (
                          <div
                            key={rollNo}
                            className={`flex flex-col items-center bg-white border p-3 rounded-xl shadow-sm transition-all hover:shadow-md ${
                              isLowAttendance ? "border-pink-300" : "border-purple-200"
                            }`}
                          >
                            <span className="font-medium text-purple-800 mb-1">{rollNo}</span>
                            <button
                              onClick={() => toggleAttendance(rollNo)}
                              className={`w-full text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                                attendance[rollNo] === "PRESENT"
                                  ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-sm"
                                  : "bg-gradient-to-r from-pink-100 to-pink-200 text-gray-700"
                              }`}
                            >
                              {attendance[rollNo] === "PRESENT" ? (
                                <span className="flex items-center justify-center gap-1">
                                  <CheckCircle size={14} /> Present
                                </span>
                              ) : (
                                <span>Absent</span>
                              )}
                            </button>
                            <div className="flex items-center justify-center gap-1 mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    parseFloat(percentage) >= 75 
                                      ? "bg-purple-500" 
                                      : parseFloat(percentage) >= 50 
                                        ? "bg-yellow-500" 
                                        : "bg-pink-500"
                                  }`} 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs ${
                                isLowAttendance ? "text-pink-600" : "text-gray-600"
                              }`}>
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No students match your search criteria
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Statistics Tab */
            <div className="bg-white/70 backdrop-blur rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Attendance Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex flex-col items-center">
                  <h4 className="text-purple-800 font-medium">Total Classes</h4>
                  <p className="text-3xl font-bold text-purple-700 mt-2">{totalClasses}</p>
                </div>
                
                <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 flex flex-col items-center">
                  <h4 className="text-pink-800 font-medium">Average Attendance</h4>
                  <p className="text-3xl font-bold text-pink-700 mt-2">{averageAttendance}%</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex flex-col items-center">
                  <h4 className="text-purple-800 font-medium">Low Attendance</h4>
                  <p className="text-3xl font-bold text-purple-700 mt-2">{lowAttendanceCount} students</p>
                </div>
              </div>
              
              <h4 className="text-lg font-medium text-purple-800 mb-3">Low Attendance Students</h4>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {Object.entries(studentPresentCounts)
                    .filter(([rollNo, count]) => (count / totalClasses) * 100 < 75)
                    .sort((a, b) => a[1] - b[1]) // Fixed sort function here
                    .slice(0, 12)
                    .map(([rollNo, count]) => {
                      const percentage = totalClasses > 0 ? ((count / totalClasses) * 100).toFixed(1) : "0.0";
                      return (
                        <div key={rollNo} className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-center">
                          <p className="font-medium text-purple-800">{rollNo}</p>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-pink-500 h-1.5 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-pink-600 mt-1">{percentage}% present</p>
                        </div>
                      );
                    })}
                </div>
                {Object.entries(studentPresentCounts).filter(([rollNo, count]) => (count / totalClasses) * 100 < 75).length === 0 && (
                  <p className="text-center py-4 text-gray-500">No students with low attendance</p>
                )}
              </div>
            </div>
          )}
          
          {/* Back Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setSelectedSubject(null)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-pink-500 hover:to-purple-600 transition-all shadow-md hover:scale-105 w-full max-w-xs flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back to Subject Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;