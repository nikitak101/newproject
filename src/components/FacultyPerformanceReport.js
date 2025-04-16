import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";

const FacultyPerformanceReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("semester");
  const [compareEnabled, setCompareEnabled] = useState(false);
  
  // Performance Summary Cards Data
  const reportData = [
    {
      title: "Total Classes Conducted",
      value: 58,
      previousValue: 52,
      percentChange: "+11.5%",
      trend: "up",
      color: "bg-purple-100 text-purple-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Cancelled Classes",
      value: 3,
      previousValue: 5,
      percentChange: "-40%",
      trend: "down",
      color: "bg-pink-100 text-pink-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Average Feedback Rating",
      value: "4.6 / 5",
      previousValue: "4.3 / 5",
      percentChange: "+7%",
      trend: "up",
      color: "bg-purple-100 text-purple-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: "Timeliness",
      value: "92%",
      previousValue: "88%",
      percentChange: "+4.5%",
      trend: "up",
      color: "bg-pink-100 text-pink-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  // Student Feedback Data
  const feedbackData = [
    { category: "Subject Knowledge", rating: 4.8, lastRating: 4.7 },
    { category: "Teaching Methods", rating: 4.5, lastRating: 4.4 },
    { category: "Clarity", rating: 4.6, lastRating: 4.3 },
    { category: "Accessibility", rating: 4.7, lastRating: 4.5 },
    { category: "Course Materials", rating: 4.4, lastRating: 4.3 }
  ];
  
  // Monthly Class Data
  const monthlyClassData = [
    { name: "Jan", classes: 12, expected: 14, lastYear: compareEnabled ? 10 : 0 },
    { name: "Feb", classes: 14, expected: 14, lastYear: compareEnabled ? 13 : 0 },
    { name: "Mar", classes: 13, expected: 14, lastYear: compareEnabled ? 12 : 0 },
    { name: "Apr", classes: 10, expected: 10, lastYear: compareEnabled ? 9 : 0 },
    { name: "May", classes: 9, expected: 6, lastYear: compareEnabled ? 5 : 0 }
  ];
  
  // Subject Performance Data
  const subjectPerformanceData = [
    { name: "Computer Networks", studentPass: 92, avgScore: 78, attendanceRate: 88 },
    { name: "Data Structures", studentPass: 88, avgScore: 74, attendanceRate: 92 },
    { name: "Database Management", studentPass: 95, avgScore: 82, attendanceRate: 85 },
    { name: "Adv. Algorithms", studentPass: 85, avgScore: 68, attendanceRate: 90 }
  ];
  
  // Time Distribution Data
  const timeDistributionData = [
    { name: "Lectures", value: 58 },
    { name: "Lab Sessions", value: 24 },
    { name: "Research", value: 15 },
    { name: "Student Mentoring", value: 12 },
    { name: "Administrative", value: 8 }
  ];
  
  const COLORS = ['#8b5cf6', '#ec4899', '#9333ea', '#c026d3', '#a855f7'];
  
  // Recent Comments Data
  const recentCommentsData = [
    {
      student: "Anonymous Student",
      date: "Apr 5, 2025",
      comment: "Professor explains complex concepts in an easily understandable manner. The practical examples really help.",
      rating: 5,
      course: "Computer Networks"
    },
    {
      student: "Anonymous Student",
      date: "Apr 2, 2025",
      comment: "Very knowledgeable and approachable. Makes time for students outside of class hours.",
      rating: 5,
      course: "Data Structures"
    },
    {
      student: "Anonymous Student",
      date: "Mar 28, 2025",
      comment: "Good teaching style but sometimes moves too quickly through difficult topics.",
      rating: 4,
      course: "Database Management"
    }
  ];
  
  // Areas for Improvement
  const improvementAreas = [
    { area: "More interactive teaching methods", score: 3.8 },
    { area: "Better explanation of complex algorithms", score: 4.0 },
    { area: "More real-world examples", score: 3.9 }
  ];
  
  // Handler for period change
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };
  
  // Function to render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">Faculty Performance Report</h1>
            <p className="text-gray-600 mt-1">Performance metrics and student feedback analysis</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => handlePeriodChange("month")}
                className={`px-4 py-2 text-sm border ${selectedPeriod === "month" ? "bg-purple-500 text-white" : "bg-white text-purple-600"} border-purple-500 rounded-l-md hover:bg-purple-50`}
              >
                Month
              </button>
              <button
                onClick={() => handlePeriodChange("semester")}
                className={`px-4 py-2 text-sm border ${selectedPeriod === "semester" ? "bg-purple-500 text-white" : "bg-white text-purple-600"} border-purple-500 hover:bg-purple-50`}
              >
                Semester
              </button>
              <button
                onClick={() => handlePeriodChange("year")}
                className={`px-4 py-2 text-sm border ${selectedPeriod === "year" ? "bg-purple-500 text-white" : "bg-white text-purple-600"} border-purple-500 rounded-r-md hover:bg-purple-50`}
              >
                Year
              </button>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="compareToggle"
                checked={compareEnabled}
                onChange={() => setCompareEnabled(!compareEnabled)}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <label htmlFor="compareToggle" className="text-sm text-gray-700">
                Compare to previous period
              </label>
            </div>
            
            <button className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
        
        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportData.map((report, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 shadow-md ${report.color} flex flex-col hover:shadow-lg transition-shadow`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-75">{report.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{report.value}</h3>
                  
                  {compareEnabled && (
                    <div className="flex items-center mt-2 text-xs">
                      <span className="mr-1">Previous: {report.previousValue}</span>
                      <span className={report.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {report.percentChange}
                      </span>
                    </div>
                  )}
                </div>
                {report.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Student Feedback Chart */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Student Feedback Ratings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={feedbackData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" name="Current Rating" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                {compareEnabled && (
                  <Bar dataKey="lastRating" name="Previous Rating" fill="#ec4899" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Monthly Classes Chart */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Monthly Classes Conducted</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyClassData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="classes" name="Classes Conducted" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expected" name="Expected Classes" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                {compareEnabled && (
                  <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Additional Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Subject Performance */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Subject Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Pass Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Avg. Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Attendance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjectPerformanceData.map((subject, index) => (
                    <tr key={index} className="hover:bg-purple-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{subject.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${subject.studentPass}%` }}></div>
                          </div>
                          <span>{subject.studentPass}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${subject.avgScore}%` }}></div>
                          </div>
                          <span>{subject.avgScore}/100</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-purple-400 h-2.5 rounded-full" style={{ width: `${subject.attendanceRate}%` }}></div>
                          </div>
                          <span>{subject.attendanceRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Time Distribution */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Time Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {timeDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center text-xs">
                  <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{entry.name}: {entry.value}hrs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Comments and Improvements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Comments */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Recent Student Feedback</h3>
            <div className="space-y-4">
              {recentCommentsData.map((comment, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        {renderStars(comment.rating)}
                        <span className="ml-2 text-sm text-gray-500">{comment.course}</span>
                      </div>
                      <p className="text-gray-700 mt-2">{comment.comment}</p>
                    </div>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span>{comment.student}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                View All Feedback
              </button>
            </div>
          </div>
          
          {/* Areas for Improvement */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Areas for Improvement</h3>
            <div className="space-y-4">
              {improvementAreas.map((area, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-pink-800">{area.area}</h4>
                    <span className="text-sm px-2 py-1 bg-pink-100 text-pink-800 rounded-full">
                      Score: {area.score}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-pink-500 h-2.5 rounded-full"
                      style={{ width: `${(area.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-100 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Include more interactive activities in class sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Consider recording complex algorithm explanations for students to review</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Incorporate more industry case studies into lessons</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Report generated on April 10, 2025 • Data reflects {selectedPeriod === "month" ? "current month" : selectedPeriod === "semester" ? "current semester" : "academic year"}</p>
          <p className="mt-1">For detailed analysis and historical trends, visit the Faculty Analytics Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyPerformanceReport;