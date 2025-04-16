import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  PieChart,
  Users,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function CoordinatorDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(stored);
    
    // Calculate statistics
    const pending = stored.filter(req => req.status === "PENDING").length;
    const approved = stored.filter(req => req.status === "APPROVED").length;
    const rejected = stored.filter(req => req.status === "REJECTED").length;
    
    setStats({
      total: stored.length,
      pending,
      approved,
      rejected
    });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadRequests();
      setIsRefreshing(false);
    }, 800);
  };

  const updateStatus = (id, status) => {
    const updated = leaveRequests.map((req) =>
      req.id === id ? { ...req, status, updatedAt: new Date().toISOString() } : req
    );
    setLeaveRequests(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    
    // Update statistics after status change
    const pending = updated.filter(req => req.status === "PENDING").length;
    const approved = updated.filter(req => req.status === "APPROVED").length;
    const rejected = updated.filter(req => req.status === "REJECTED").length;
    
    setStats({
      total: updated.length,
      pending,
      approved,
      rejected
    });
  };

  const getFilteredRequests = () => {
    if (activeTab === "all") return leaveRequests;
    return leaveRequests.filter(req => req.status === activeTab.toUpperCase());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Determine status color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case "APPROVED":
        return { 
          color: "text-green-600 bg-green-50", 
          icon: <CheckCircle size={16} className="text-green-600" /> 
        };
      case "REJECTED":
        return { 
          color: "text-red-600 bg-red-50", 
          icon: <XCircle size={16} className="text-red-600" /> 
        };
      default:
        return { 
          color: "text-yellow-500 bg-yellow-50", 
          icon: <AlertCircle size={16} className="text-yellow-500" /> 
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/login")}
            variant="default"
            className="mb-4 md:mb-0 flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow"
          >
            <ArrowLeft size={18} /> Back to Login
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/feedback-list")}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow"
            >
              📋 View Feedbacks
            </Button>
            <Button
              onClick={refreshData}
              className="bg-white hover:bg-gray-100 text-purple-700 border border-purple-200 rounded-lg shadow flex items-center gap-1"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 flex items-center justify-center gap-3">
            🧾 Leave Management Dashboard
          </h2>
          <p className="text-gray-600 text-md mt-2">Class Coordinator Control Panel</p>
        </div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <FileText size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-purple-700">{stats.total}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <AlertCircle size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <XCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setActiveTab("all")}
            className={`rounded-full shadow-sm ${
              activeTab === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 hover:bg-purple-50"
            }`}
          >
            All Requests
          </Button>
          <Button
            onClick={() => setActiveTab("pending")}
            className={`rounded-full shadow-sm flex items-center gap-1 ${
              activeTab === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500 hover:bg-yellow-50"
            }`}
          >
            <AlertCircle size={16} /> Pending
          </Button>
          <Button
            onClick={() => setActiveTab("approved")}
            className={`rounded-full shadow-sm flex items-center gap-1 ${
              activeTab === "approved"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:bg-green-50"
            }`}
          >
            <CheckCircle size={16} /> Approved
          </Button>
          <Button
            onClick={() => setActiveTab("rejected")}
            className={`rounded-full shadow-sm flex items-center gap-1 ${
              activeTab === "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 hover:bg-red-50"
            }`}
          >
            <XCircle size={16} /> Rejected
          </Button>
        </div>

        {/* Requests Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {getFilteredRequests().length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="col-span-2 bg-white rounded-2xl shadow-md p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-purple-50">
                  <FileText size={32} className="text-purple-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No leave requests found</h3>
              <p className="text-gray-500">
              {activeTab === "all" 
  ? "No leave requests have been submitted yet."
  : `No ${activeTab} leave requests at the moment.`}

              </p>
            </motion.div>
          ) : (
            getFilteredRequests().map((req) => {
              const { color, icon } = getStatusInfo(req.status);
              
              return (
                <motion.div
                  key={req.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-purple-700">
                        {req.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${color}`}>

                        {icon} {req.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="bg-purple-50 p-3 rounded-lg mb-3">
                        <p className="text-gray-700">
                          <strong>Reason for Leave:</strong> {req.reason}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-purple-500" />
                          <div>
                            <p className="text-xs text-gray-500">From</p>
                            <p className="text-sm font-medium">{formatDate(req.leaveDate)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-pink-500" />
                          <div>
                            <p className="text-xs text-gray-500">To</p>
                            <p className="text-sm font-medium">{formatDate(req.returnDate)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-purple-500" />
                          <div>
                            <p className="text-xs text-gray-500">Leave Time</p>
                            <p className="text-sm font-medium">{req.leaveTime || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-pink-500" />
                          <div>
                            <p className="text-xs text-gray-500">Return Time</p>
                            <p className="text-sm font-medium">{req.returnTime || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {req.status === "PENDING" && (
                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={() => updateStatus(req.id, "APPROVED")}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={16} /> Approve
                        </Button>
                        <Button
                          onClick={() => updateStatus(req.id, "REJECTED")}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-1"
                        >
                          <XCircle size={16} /> Reject
                        </Button>
                      </div>
                    )}
                    
                    {req.status !== "PENDING" && (
                      <div className="mt-4 text-right text-xs text-gray-500">
                        Last updated: {new Date(req.updatedAt || Date.now()).toLocaleString()}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CoordinatorDashboard;