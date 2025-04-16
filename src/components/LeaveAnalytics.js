import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Calendar, Filter, BarChart2, PieChart as PieChartIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Color palette for consistent theme - purple, pink, yellow
const COLORS = {
  APPROVED: "#A78BFA", // Purple
  REJECTED: "#F472B6", // Pink
  PENDING: "#FDE68A", // Yellow
};

const LeaveAnalytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("This Month");
  const [chartType, setChartType] = useState("pie");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total: 0, approved: 0, rejected: 0, pending: 0 });
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      processData();
      setLoading(false);
    }, 600);
  }, [filter]);

  const processData = () => {
    const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const now = new Date();
    let approved = 0, rejected = 0, pending = 0;
    let startDate = null, endDate = null;

    // Filter based on selection
    const filteredRequests = requests.filter((req) => {
      const reqDate = new Date(req.leaveDate);
      
      if (filter === "This Month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return (
          reqDate.getMonth() === now.getMonth() &&
          reqDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === "Last 30 Days") {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        endDate = new Date(now);
        
        const diffInTime = now.getTime() - reqDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        return diffInDays <= 30 && diffInDays >= 0;
      } else if (filter === "This Year") {
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        return reqDate.getFullYear() === now.getFullYear();
      } else if (filter === "All Time") {
        if (requests.length > 0) {
          // Find earliest and latest dates in data
          const dates = requests.map(r => new Date(r.leaveDate).getTime());
          startDate = new Date(Math.min(...dates));
          endDate = new Date(Math.max(...dates));
        }
        return true;
      }
      return true;
    });

    // Count by status
    filteredRequests.forEach((req) => {
      const status = (req.status || "PENDING").trim().toUpperCase();
      if (status === "APPROVED") approved++;
      else if (status === "REJECTED") rejected++;
      else pending++;
    });

    // Set date range for display
    setDateRange({ start: startDate, end: endDate });

    // Update data for charts
    const chartData = [
      { name: "Approved", value: approved, fill: COLORS.APPROVED },
      { name: "Rejected", value: rejected, fill: COLORS.REJECTED },
      { name: "Pending", value: pending, fill: COLORS.PENDING },
    ];
    
    setData(chartData);
    setSummary({ 
      total: filteredRequests.length,
      approved,
      rejected,
      pending,
      approvalRate: filteredRequests.length > 0 ? ((approved / filteredRequests.length) * 100).toFixed(1) : 0
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-purple-700 rounded-full animate-spin"></div>
        </div>
      );
    }

    if (data.every(item => item.value === 0)) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-lg font-medium">No leave requests found for this period</p>
          <p className="text-sm">Try selecting a different time range</p>
        </div>
      );
    }

    if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={4}
              labelLine={true}
              label={({ name, percent }) =>
                percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
              }
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} Requests`, "Count"]}
              contentStyle={{ 
                backgroundColor: "rgba(255, 255, 255, 0.95)", 
                borderRadius: "8px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
                border: "none",
                padding: "8px 12px" 
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ paddingTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
            <YAxis tick={{ fill: "#6B7280" }} allowDecimals={false} />
            <Tooltip
              formatter={(value) => [`${value} Requests`, "Count"]}
              contentStyle={{ 
                backgroundColor: "rgba(255, 255, 255, 0.95)", 
                borderRadius: "8px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
                border: "none" 
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 md:p-6 relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-sm text-purple-700 py-2 px-4 rounded-full shadow transition duration-300"
      >
        <ArrowLeft size={16} /> Back
      </button>
    
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <BarChart2 className="inline" size={28} />
            Leave Request Analytics
          </h2>
          <p className="text-purple-100 mt-2">
            Visualizing leave request patterns and approval rates
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b bg-purple-50">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-2 border-r text-purple-600">
                <Filter size={18} />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border-none focus:outline-none text-gray-700 bg-transparent"
              >
                <option>This Month</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            {dateRange.start && dateRange.end && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} className="text-purple-500" />
                <span className="hidden md:inline">{formatDate(dateRange.start)} - {formatDate(dateRange.end)}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType("pie")}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                chartType === "pie" 
                  ? "bg-purple-600 text-white" 
                  : "bg-white text-purple-600 border border-purple-200"
              }`}
            >
              <PieChartIcon size={16} />
              <span className="hidden md:inline">Pie</span>
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                chartType === "bar" 
                  ? "bg-purple-600 text-white" 
                  : "bg-white text-purple-600 border border-purple-200"
              }`}
            >
              <BarChart2 size={16} />
              <span className="hidden md:inline">Bar</span>
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="p-4 md:p-6">
          {renderChart()}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-sm text-gray-500">Total Requests</span>
            <span className="text-2xl font-bold text-gray-800">{summary.total}</span>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-sm text-gray-500">Approved</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-purple-600">{summary.approved}</span>
              <span className="text-sm font-medium" style={{ color: COLORS.APPROVED }}>
                {summary.total > 0 ? `${((summary.approved / summary.total) * 100).toFixed(0)}%` : '0%'}
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-sm text-gray-500">Rejected</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-pink-500">{summary.rejected}</span>
              <span className="text-sm font-medium" style={{ color: COLORS.REJECTED }}>
                {summary.total > 0 ? `${((summary.rejected / summary.total) * 100).toFixed(0)}%` : '0%'}
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-sm text-gray-500">Pending</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-yellow-500">{summary.pending}</span>
              <span className="text-sm font-medium" style={{ color: COLORS.PENDING }}>
                {summary.total > 0 ? `${((summary.pending / summary.total) * 100).toFixed(0)}%` : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        {summary.total > 0 && (
          <div className="p-4 md:p-6 border-t">
            <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Key Insights
            </h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 mt-1 rounded-full bg-purple-600"></div>
                  <p>Approval rate for this period is <span className="font-semibold">{summary.approvalRate}%</span></p>
                </li>
                {summary.pending > 0 && (
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 mt-1 rounded-full bg-yellow-400"></div>
                    <p>You have <span className="font-semibold">{summary.pending}</span> pending leave {summary.pending === 1 ? 'request' : 'requests'} that {summary.pending === 1 ? 'requires' : 'require'} attention</p>
                  </li>
                )}
                {summary.approved === 0 && summary.rejected > 0 && (
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 mt-1 rounded-full bg-red-500"></div>
                    <p>All processed requests were rejected during this period</p>
                  </li>
                )}
                {summary.rejected === 0 && summary.approved > 0 && (
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 h-4 mt-1 rounded-full bg-green-500"></div>
                    <p>All processed requests were approved during this period</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveAnalytics;