import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFilter, FaFileExport, FaSearch, FaSort } from "react-icons/fa"; // common icons
import { FaEye } from "react-icons/fa6"; // only available in fa6
import { FaStar, FaRegCalendarAlt, FaChalkboardTeacher } from "react-icons/fa"; // Font Awesome standard set



const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchSubject, setSearchSubject] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
    setFeedbacks(savedFeedback);
    setFilteredFeedbacks(savedFeedback);
  }, []);

  useEffect(() => {
    let updated = [...feedbacks];

    if (searchSubject) {
      updated = updated.filter((fb) =>
        fb.subject.toLowerCase().includes(searchSubject.toLowerCase())
      );
    }

    if (searchYear) {
      updated = updated.filter((fb) =>
        fb.studentYear.toLowerCase().includes(searchYear.toLowerCase())
      );
    }

    if (sortKey === "subject") {
      updated.sort((a, b) => {
        const result = a.subject.localeCompare(b.subject);
        return sortOrder === "asc" ? result : -result;
      });
    } else if (sortKey === "year") {
      updated.sort((a, b) => {
        const result = a.studentYear.localeCompare(b.studentYear);
        return sortOrder === "asc" ? result : -result;
      });
    } else if (sortKey === "rating") {
      updated.sort((a, b) => {
        const result = parseFloat(a.rating) - parseFloat(b.rating);
        return sortOrder === "asc" ? result : -result;
      });
    }

    setFilteredFeedbacks(updated);
  }, [searchSubject, searchYear, sortKey, sortOrder, feedbacks]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block ${
            i < fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
          size={16}
        />
      );
    }
    return stars;
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const viewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ["Subject", "Rating", "Feedback", "Division", "Year"];
    const csvContent = [
      headers.join(","),
      ...filteredFeedbacks.map(fb => 
        [
          "${fb.subject}", 
          fb.rating, 
          `"${fb.description.replace(/"/g, '""')}"`,

          fb.studentDiv, 
          fb.studentYear
        ].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "feedback_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/coordinator-board")}
        className="flex items-center gap-2 text-purple-800 hover:text-purple-600 font-semibold transition-colors duration-200 mb-6 bg-white rounded-full py-2 px-4 shadow-sm"
      >
        <FaArrowLeft />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 flex items-center gap-3 mb-4 md:mb-0">
            📋 Submitted Feedbacks
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
              {filteredFeedbacks.length} items
            </span>
          </h2>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-200"
            >
              <FaFilter />
              <span className="hidden md:inline">Filters</span>
            </button>
            
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition duration-200"
            >
              <FaFileExport />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`transition-all duration-300 overflow-hidden ${isFilterVisible ? 'max-h-96 mb-6' : 'max-h-0'}`}>

          <div className="bg-purple-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Subject"
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="p-2 pl-10 w-full rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaRegCalendarAlt className="text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Year"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                className="p-2 pl-10 w-full rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSort className="text-purple-400" />
              </div>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="p-2 pl-10 w-full rounded-lg border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sort by</option>
                <option value="subject">Subject</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback Cards for Mobile */}
        <div className="md:hidden space-y-4">
          {filteredFeedbacks.map((fb, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-purple-100 p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-purple-800">{fb.subject}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {fb.studentYear}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <div>{renderStars(fb.rating)}</div>
                <span className="ml-2 text-gray-500 text-sm">{fb.rating}/5</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{fb.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Division: {fb.studentDiv}
                </span>
                <button 
                  onClick={() => viewFeedback(fb)}
                  className="flex items-center gap-1 text-purple-700 hover:text-purple-900"
                >
                  <FaEye size={14} />
                  <span className="text-sm font-medium">View</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table for Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto text-left text-sm rounded-xl overflow-hidden">
            <thead className="bg-purple-100 text-purple-800">
              <tr>
                <th 
                  className="px-5 py-4 cursor-pointer hover:bg-purple-200 transition-colors duration-200"
                  onClick={() => handleSort("subject")}
                >
                  <div className="flex items-center gap-2">
                    <FaChalkboardTeacher />
                    Subject
                    {sortKey === "subject" && (
                      <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-5 py-4 cursor-pointer hover:bg-purple-200 transition-colors duration-200"
                  onClick={() => handleSort("rating")}
                >
                  <div className="flex items-center gap-2">
                    <FaStar />
                    Rating
                    {sortKey === "rating" && (
                      <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th className="px-5 py-4">Feedback</th>
                <th className="px-5 py-4">Division</th>
                <th 
                  className="px-5 py-4 cursor-pointer hover:bg-purple-200 transition-colors duration-200"
                  onClick={() => handleSort("year")}
                >
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt />
                    Year
                    {sortKey === "year" && (
                      <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((fb, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-purple-50 transition duration-200"
                >
                  <td className="px-5 py-4 font-medium text-purple-800">{fb.subject}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {renderStars(fb.rating)}
                      <span className="text-gray-500 text-sm">{fb.rating}/5</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 max-w-xs truncate">{fb.description}</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {fb.studentDiv}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {fb.studentYear}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button 
                      onClick={() => viewFeedback(fb)}
                      className="flex items-center justify-center gap-1 text-purple-700 hover:text-purple-900 mx-auto"
                    >
                      <FaEye size={14} />
                      <span className="font-medium">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFeedbacks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-purple-300 text-5xl mb-2">📋</div>
              <p className="text-gray-600 font-medium">No feedback records found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-800">Feedback Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-purple-700">{selectedFeedback.subject}</h4>
                <div className="flex items-center gap-2">
                  {renderStars(selectedFeedback.rating)}
                  <span className="text-purple-700 font-medium">{selectedFeedback.rating}/5</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Division: {selectedFeedback.studentDiv}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Year: {selectedFeedback.studentYear}
                </span>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <h5 className="font-medium text-purple-800 mb-2">Feedback:</h5>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedFeedback.description}</p>
              </div>
              
              <div className="pt-4 text-right">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;