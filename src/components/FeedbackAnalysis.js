import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

const FeedbackAnalysis = () => {
  const [frequencyData, setFrequencyData] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [overallRatings, setOverallRatings] = useState({});
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [activeTab, setActiveTab] = useState("summary");

  // Enhanced color scheme while keeping purple/pink theme
  const COLORS = ["#8e44ad", "#e84393", "#ff9ff3", "#ffeaa7"]; // Excellent, Good, Average, Poor
  const RATING_LABELS = {
    Excellent: "⭐⭐⭐⭐⭐",
    Good: "⭐⭐⭐⭐",
    Average: "⭐⭐⭐",
    Poor: "⭐⭐"
  };

  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem("feedbackData")) || [];
    setTotalFeedbacks(rawData.length);
    
    const freq = {};
    const ratingSum = {};
    const ratingCount = {};
    const overall = { Excellent: 0, Good: 0, Average: 0, Poor: 0 };

    rawData.forEach(({ subject, rating }) => {
      const ratingValue = parseInt(rating);

      if (!freq[subject]) {
        freq[subject] = { Excellent: 0, Good: 0, Average: 0, Poor: 0 };
        ratingSum[subject] = 0;
        ratingCount[subject] = 0;
      }

      // Frequency distribution
      if (ratingValue === 5) {
        freq[subject].Excellent++;
        overall.Excellent++;
      } else if (ratingValue === 4) {
        freq[subject].Good++;
        overall.Good++;
      } else if (ratingValue === 3) {
        freq[subject].Average++;
        overall.Average++;
      } else if (ratingValue === 1 || ratingValue === 2) {
        freq[subject].Poor++;
        overall.Poor++;
      }

      // Average rating
      ratingSum[subject] += ratingValue;
      ratingCount[subject]++;
    });

    const avg = {};
    Object.keys(ratingSum).forEach((subject) => {
      avg[subject] = (ratingSum[subject] / ratingCount[subject]).toFixed(1);
    });

    setFrequencyData(freq);
    setAverageRatings(avg);
    setOverallRatings(overall);
  }, []);

  // Format data for bar chart
  const prepareBarChartData = () => {
    return Object.entries(averageRatings).map(([subject, rating]) => ({
      subject,
      rating: parseFloat(rating)
    })).sort((a, b) => b.rating - a.rating);
  };

  // Format data for comparison chart
  const prepareComparisonData = () => {
    return Object.keys(frequencyData).map(subject => {
      const data = { subject };
      Object.entries(frequencyData[subject]).forEach(([rating, count]) => {
        data[rating] = count;
      });
      return data;
    });
  };

  // Calculate statistics
  const highestRatedSubject = Object.entries(averageRatings).reduce(
    (highest, [subject, rating]) => 
      parseFloat(rating) > parseFloat(highest[1]) ? [subject, rating] : highest,
    ["", "0"]
  );

  const lowestRatedSubject = Object.entries(averageRatings).reduce(
    (lowest, [subject, rating]) => 
      parseFloat(rating) < parseFloat(lowest[1]) || lowest[1] === "0" ? [subject, rating] : lowest,
    ["", "0"]
  );

  const totalRatings = Object.values(overallRatings).reduce((sum, count) => sum + count, 0);
  const satisfactionScore = totalRatings > 0 ? 
    ((overallRatings.Excellent * 5 + overallRatings.Good * 4 + overallRatings.Average * 3 + overallRatings.Poor * 2) / 
    (totalRatings * 5) * 100).toFixed(1) : 0;

  const renderTabContent = () => {
    switch(activeTab) {
      case "tables":
        return (
          <div className="space-y-12">
            <div className="overflow-x-auto">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Feedback Frequency Table</h3>
              <table className="w-full text-center border-collapse shadow-xl rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="border border-purple-300 p-3">Subject</th>
                    <th className="border border-purple-300 p-3">{RATING_LABELS.Excellent}</th>
                    <th className="border border-purple-300 p-3">{RATING_LABELS.Good}</th>
                    <th className="border border-purple-300 p-3">{RATING_LABELS.Average}</th>
                    <th className="border border-purple-300 p-3">{RATING_LABELS.Poor}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(frequencyData).map(([subject, ratings]) => (
                    <tr key={subject} className="bg-white hover:bg-purple-50 transition-colors">
                      <td className="border border-purple-200 p-3 font-semibold">{subject}</td>
                      <td className="border border-purple-200 p-3">{ratings.Excellent}</td>
                      <td className="border border-purple-200 p-3">{ratings.Good}</td>
                      <td className="border border-purple-200 p-3">{ratings.Average}</td>
                      <td className="border border-purple-200 p-3">{ratings.Poor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Average Rating Per Subject</h3>
              <table className="w-full text-center border-collapse shadow-xl rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="border border-purple-300 p-3">Subject</th>
                    <th className="border border-purple-300 p-3">Average Rating</th>
                    <th className="border border-purple-300 p-3">Visual Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(averageRatings)
                    .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                    .map(([subject, avg]) => (
                      <tr key={subject} className="bg-white hover:bg-purple-50 transition-colors">
                        <td className="border border-purple-200 p-3 font-semibold">{subject}</td>
                        <td className="border border-purple-200 p-3">{avg}</td>
                        <td className="border border-purple-200 p-3">
                          <div className="flex justify-center items-center">
                            <div className="bg-purple-100 w-full max-w-xs h-4 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" 
                                style={{ width: `${(parseFloat(avg) / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        );
        
      case "charts":
        return (
          <div className="space-y-12">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-6">Rating Distribution</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(overallRatings).map(([name, value]) => ({
                        name,
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={2}
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(1)}%)`}
                      dataKey="value"
                    >
                      {Object.keys(overallRatings).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} feedback(s)`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-6">Average Ratings</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prepareBarChartData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip formatter={(value) => [`Rating: ${value}`, ""]} />
                    <Bar dataKey="rating" fill="#8e44ad" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-6">Rating Comparison by Subject</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={prepareComparisonData()}
                    layout="vertical"
                    barCategoryGap={8}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" />
                    <YAxis dataKey="subject" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Excellent" stackId="a" fill={COLORS[0]} />
                    <Bar dataKey="Good" stackId="a" fill={COLORS[1]} />
                    <Bar dataKey="Average" stackId="a" fill={COLORS[2]} />
                    <Bar dataKey="Poor" stackId="a" fill={COLORS[3]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      default: // summary
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Total Feedbacks</h3>
                <p className="text-4xl font-bold">{totalFeedbacks}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-pink-400 rounded-lg shadow-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Satisfaction Score</h3>
                <p className="text-4xl font-bold">{satisfactionScore}%</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-700 to-pink-300 rounded-lg shadow-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Highest Rated</h3>
                <p className="text-2xl font-bold truncate">{highestRatedSubject[0]}</p>
                <p className="text-lg">{highestRatedSubject[1]} / 5</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-800 to-pink-200 rounded-lg shadow-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Lowest Rated</h3>
                <p className="text-2xl font-bold truncate">{lowestRatedSubject[0]}</p>
                <p className="text-lg">{lowestRatedSubject[1]} / 5</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-6">Rating Distribution</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(overallRatings).map(([name, value]) => ({
                          name,
                          value,
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {Object.keys(overallRatings).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} feedback(s)`, ""]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-6">Top Subjects</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={prepareBarChartData().slice(0, 5)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="subject" type="category" width={100} />
                      <Tooltip formatter={(value) => [`Rating: ${value}`, ""]} />
                      <Bar 
                        dataKey="rating" 
                        fill="url(#colorGradient)" 
                        background={{ fill: "#f5f5f5" }}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8e44ad" />
                          <stop offset="100%" stopColor="#e84393" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen pb-12">
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 text-white py-8 px-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Feedback Analysis Dashboard</h1>
        <p className="text-center mt-2 text-purple-100">Analyzing {totalFeedbacks} feedback submissions</p>
      </div>
      
      <div className="container mx-auto px-4 pt-6">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-md inline-flex p-1">
            <button 
              onClick={() => setActiveTab("summary")} 
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === "summary" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
                  : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab("tables")} 
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === "tables" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
                  : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              Tables
            </button>
            <button 
              onClick={() => setActiveTab("charts")} 
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === "charts" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
                  : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              Charts
            </button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {renderTabContent()}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-purple-600">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalysis;
