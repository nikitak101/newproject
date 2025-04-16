import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload, FaBookOpen, FaArrowLeft, FaSearch, FaCalendarCheck, FaFilter, FaRegClock } from "react-icons/fa";
import { MdDescription, MdDateRange, MdOutlineAssignment, MdFilterAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8090/assignments")
      .then((response) => {
        console.log("Fetched Assignments:", response.data);
        setAssignments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getFilteredAndSortedAssignments = () => {
    let filtered = assignments.filter(
      (assignment) =>
        (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" ||
          (statusFilter === "submitted" && assignment.status === "Submitted") ||
          (statusFilter === "pending" && assignment.status === "Pending"))
    );

    return filtered.sort((a, b) => {
      if (sortBy === "dueDate") {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
  };

  const filteredAssignments = getFilteredAndSortedAssignments();

  // Add status badge with appropriate colors
  const getStatusBadge = (status) => {
    if (!status) return "Pending";
    switch (status.toLowerCase()) {
      case "submitted":
        return (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
            <FaCalendarCheck /> Submitted
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium flex items-center gap-1">
            <FaRegClock /> Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 py-10 px-4 font-[Poppins,sans-serif]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full mb-6 shadow-lg hover:opacity-90 transition transform hover:scale-105"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 flex items-center gap-3 mb-4 md:mb-0">
            <MdOutlineAssignment className="text-pink-500" size={32} /> My Assignments
          </h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => navigate('/add-assignment')} 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
            >
              <span>+ New Assignment</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-purple-50 rounded-2xl p-4 mb-8 border border-purple-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full px-4 py-3 pl-10 border border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-purple-400" />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-3 border border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="pending">Pending</option>
                </select>
                <MdFilterAlt className="absolute left-3 top-3.5 text-purple-400" size={18} />
              </div>
              
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="appearance-none pl-10 pr-8 py-3 border border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white cursor-pointer"
                >
                  <option value="dueDate-asc">Due Date (Earliest)</option>
                  <option value="dueDate-desc">Due Date (Latest)</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                </select>
                <BiSortAlt2 className="absolute left-3 top-3.5 text-purple-400" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="text-center py-16 bg-purple-50/50 rounded-2xl border border-purple-100">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <MdOutlineAssignment size={32} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-purple-700 mb-2">No assignments found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-purple-100 group transform hover:-translate-y-1 duration-300"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                        <FaBookOpen className="text-pink-500" /> {assignment.title}
                      </h3>
                      {getStatusBadge(assignment.status || "Pending")}
                    </div>
                    <p className="text-sm text-gray-700 flex items-start gap-2 mb-3">
                      <MdDescription className="text-purple-500 mt-1 flex-shrink-0" /> 
                      <span>{assignment.description}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                      <MdDateRange className="text-pink-500" /> 
                      <span>
                        Due: <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}</span>
                      </span>
                    </p>
                    {assignment.course && (
                      <p className="text-sm text-purple-600 mb-3">
                        Course: <span className="font-medium">{assignment.course}</span>
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">
                      {new Date(assignment.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                    {assignment.filePath ? (
                      <a
                        href={`http://localhost:8090/uploads/${assignment.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-sm group-hover:shadow"
                      >
                        <FaDownload /> Download
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-full text-sm italic">
                        No File Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;