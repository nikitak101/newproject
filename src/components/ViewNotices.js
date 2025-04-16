import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaCalendarAlt, FaBell, FaBookmark } from "react-icons/fa";

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookmarkedNotices, setBookmarkedNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get notices from localStorage
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    // Sort notices by date (newest first)
    const sortedNotices = storedNotices.sort((a, b) => 
      new Date(b.datePosted) - new Date(a.datePosted)
    );
    setNotices(sortedNotices);
    setFilteredNotices(sortedNotices);
    
    // Get bookmarked notices
    const stored = JSON.parse(localStorage.getItem("bookmarkedNotices")) || [];
    setBookmarkedNotices(stored);
  }, []);

  // Filter notices based on search term
  useEffect(() => {
    let results = notices;
    
    // Apply text search filter
    if (searchTerm) {
      results = results.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        notice.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== "all") {
      if (activeFilter === "bookmarked") {
        results = results.filter(notice => 
          bookmarkedNotices.includes(notice.id || notices.indexOf(notice))
        );
      } else {
        results = results.filter(notice => notice.category === activeFilter);
      }
    }
    
    setFilteredNotices(results);
  }, [searchTerm, activeFilter, notices, bookmarkedNotices]);

  // Toggle bookmark for a notice
  const toggleBookmark = (noticeId) => {
    const newBookmarked = [...bookmarkedNotices];
    const index = newBookmarked.indexOf(noticeId);
    
    if (index > -1) {
      newBookmarked.splice(index, 1);
    } else {
      newBookmarked.push(noticeId);
    }
    
    setBookmarkedNotices(newBookmarked);
    localStorage.setItem("bookmarkedNotices", JSON.stringify(newBookmarked));
  };

  // Get time since post
  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffInHours < 48) return "Yesterday";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return dateString;
  };

  // Categories for filtering (would normally come from data)
  const categories = ["all", "academic", "events", "administrative", "bookmarked"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 flex flex-col items-center p-6 relative">
      {/* Backdrop blurred decorative elements */}
      <div className="fixed top-20 right-20 h-40 w-40 rounded-full bg-pink-400 opacity-20 blur-2xl"></div>
      <div className="fixed bottom-20 left-20 h-32 w-32 rounded-full bg-purple-400 opacity-20 blur-2xl"></div>
      
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

      {/* Main Content */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-6xl mt-16 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 flex items-center">
            <FaBell className="mr-3 text-pink-500" />
            <span>Latest Notices</span>
          </h1>
          
          {/* Search Bar */}
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-50 border border-purple-200 rounded-full focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
            />
            <FaSearch className="absolute left-3 top-3 text-purple-400" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {filteredNotices.length === 0 ? (
          <div className="bg-purple-50 rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-medium text-purple-800 mb-2">No notices found</h2>
            <p className="text-gray-600">
              {searchTerm 
                ? `No notices matching "${searchTerm}"` 
                : activeFilter !== "all" 
                  ? `No ${activeFilter} notices available` 
                  : "There are no notices to display yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNotices.map((notice, index) => {
              const noticeId = notice.id || index;
              const isBookmarked = bookmarkedNotices.includes(noticeId);
              
              return (
                <div
                  key={index}
                  className="bg-white border border-purple-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:translate-y-px"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      {notice.category && (
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full mb-2">
                          {notice.category || "General"}
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-purple-800">
                        {notice.title}
                      </h2>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(noticeId)}
                      className={`p-2 rounded-full ${isBookmarked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
                    >
                      <FaBookmark />
                    </button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{notice.description}</p>
                  
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center text-purple-700">
                      <FaCalendarAlt className="mr-2 text-pink-500" />
                      <span>{getTimeSince(notice.datePosted)}</span>
                    </div>
                    <p className="text-gray-500">
                      Posted by{" "}
                      <span className="font-medium text-pink-600">
                        {notice.postedBy}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Status Bar */}
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-full py-3 px-6 text-sm text-purple-700 shadow-md">
        Showing {filteredNotices.length} of {notices.length} notices
      </div>
    </div>
  );
};

export default ViewNotices;