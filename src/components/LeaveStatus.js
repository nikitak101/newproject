import React, { useEffect, useState } from "react";
import { Calendar, Clock, RefreshCw, ChevronLeft, FileText, AlertCircle } from "lucide-react";

function LeaveStatus() {
  const [myLeaves, setMyLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchLeaves = () => {
    setIsLoading(true);
    const student = JSON.parse(localStorage.getItem("loggedInStudent"));
    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];

    if (student && student.rollNumber) {
      const studentLeaves = allLeaves.filter(
        (leave) => leave.rollNo === student.rollNumber
      );
      setMyLeaves(studentLeaves);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeaves();

    const handleStorageChange = (event) => {
      if (event.key === "leaveRequests") {
        fetchLeaves();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navigateTo = (path) => {
    // This simulates navigation by changing window location
    window.location.href = path;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
            Pending
          </span>
        );
    }
  };

  const filteredLeaves = myLeaves.filter(leave => {
    if (filter === "ALL") return true;
    return leave.status === filter;
  });

  const getEmptyStateMessage = () => {
    if (myLeaves.length === 0) {
      return "You haven't submitted any leave requests yet.";
    } else if (filteredLeaves.length === 0) {
      return `No ${filter.toLowerCase()} leave requests found.`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold flex items-center">
              <FileText className="mr-2" size={28} /> My Leave Requests
            </h2>
            <button
              onClick={() => navigateTo("/student-dashboard")}
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-all"
            >
              <ChevronLeft size={20} className="mr-1" /> Dashboard
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-6 md:p-8">
          {/* Filter & Refresh Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-2 text-purple-800">
              <span className="font-medium">Filter:</span>
              <div className="flex bg-purple-50 rounded-lg p-1">
                {["ALL", "APPROVED", "PENDING", "REJECTED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      filter === status
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-purple-700 hover:bg-purple-100"
                    }`}
                  >
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={fetchLeaves}
              className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <RefreshCw size={18} className="mr-2" /> Refresh
            </button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : getEmptyStateMessage() ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <AlertCircle size={48} className="text-purple-300 mb-4" />
              <p className="text-lg text-gray-600">{getEmptyStateMessage()}</p>
              <button
                onClick={() => navigateTo("/apply-leave")}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all"
              >
                Apply for Leave
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-100 text-purple-800">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Leave Period</th>
                      <th className="px-6 py-3 text-left font-semibold">Reason</th>
                      <th className="px-6 py-3 text-center font-semibold">Duration</th>
                      <th className="px-6 py-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLeaves.map((leave) => {
                      // Calculate duration
                      const leaveDate = new Date(leave.leaveDate);
                      const returnDate = new Date(leave.returnDate);
                      const diffTime = Math.abs(returnDate - leaveDate);
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                      
                      return (
                        <tr key={leave.id} className="hover:bg-purple-50 transition-all">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center text-gray-800 font-medium">
                                <Calendar size={16} className="mr-1 text-purple-500" />
                                From: {leave.leaveDate}
                              </div>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Clock size={14} className="mr-1 text-pink-400" />
                                {leave.leaveTime}
                              </div>
                              <div className="flex items-center text-gray-800 font-medium mt-2">
                                <Calendar size={16} className="mr-1 text-purple-500" />
                                To: {leave.returnDate}
                              </div>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Clock size={14} className="mr-1 text-pink-400" />
                                {leave.returnTime}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-800">{leave.reason}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                              {diffDays} day{diffDays !== 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {getStatusBadge(leave.status)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigateTo("/apply-leave")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all"
            >
              Apply for New Leave
            </button>
            <button
              onClick={() => navigateTo("/student-dashboard")}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-6 py-3 rounded-xl font-medium shadow-md transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveStatus;