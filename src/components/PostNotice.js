import React, { useState, useEffect } from "react";
import { Bell, Calendar, Send, ArrowLeft, Clock, Trash, Edit } from "lucide-react";

const PostNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showNotices, setShowNotices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priority, setPriority] = useState("normal");

  const datePosted = new Date().toISOString().split("T")[0];
  const formattedDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
  }, []);

  const navigateTo = (path) => {
    // Alternative to useNavigate
    window.location.href = path;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newNotice = { 
        id: Date.now().toString(),
        title, 
        description, 
        datePosted, 
        postedBy: "Faculty",
        priority
      };
      const updatedNotices = [...notices, newNotice];
      setNotices(updatedNotices);
      localStorage.setItem("notices", JSON.stringify(updatedNotices));
      
      setIsSubmitting(false);
      setShowPreview(false);
      
      // Show success message
      const successMessage = document.getElementById("success-message");
      successMessage.classList.remove("opacity-0");
      successMessage.classList.add("opacity-100");
      
      setTimeout(() => {
        successMessage.classList.remove("opacity-100");
        successMessage.classList.add("opacity-0");
        setTitle("");
        setDescription("");
        setPriority("normal");
      }, 2000);
    }, 800);
  };

  const deleteNotice = (id) => {
    const filteredNotices = notices.filter(notice => notice.id !== id);
    setNotices(filteredNotices);
    localStorage.setItem("notices", JSON.stringify(filteredNotices));
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case "high":
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">High Priority</span>;
      case "medium":
        return <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">Medium Priority</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">Normal</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-pink-100 flex items-center justify-center px-4 py-10 overflow-hidden relative">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl animate-bounce-slow select-none opacity-60">🌸</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-bounce-slow select-none opacity-60 animation-delay-1000">🌸</div>
      <div className="absolute top-1/3 right-20 text-3xl animate-bounce-slow select-none opacity-40 animation-delay-2000">📝</div>
      <div className="absolute bottom-1/3 left-20 text-3xl animate-bounce-slow select-none opacity-40 animation-delay-3000">📌</div>

      {/* Success Message */}
      <div id="success-message" className="fixed top-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center opacity-0 transition-opacity duration-300">
        <Bell size={20} className="mr-2" />
        Notice posted successfully!
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigateTo("/faculty-dashboard")}
        className="absolute top-6 left-6 bg-white bg-opacity-70 hover:bg-opacity-90 text-purple-700 px-4 py-2 rounded-xl shadow-md transition-all flex items-center z-20"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </button>

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        {/* Top Buttons */}
        <div className="flex mb-6 space-x-4">
          <button 
            onClick={() => {setShowPreview(false); setShowNotices(false);}}
            className={`px-6 py-2 rounded-xl transition-all ${!showPreview && !showNotices ? "bg-purple-600 text-white shadow-md" : "bg-white bg-opacity-70 text-purple-700"}`}
          >
            Create Notice
          </button>
          <button 
            onClick={() => {setShowPreview(true); setShowNotices(false);}}
            className={`px-6 py-2 rounded-xl transition-all ${showPreview && !showNotices ? "bg-purple-600 text-white shadow-md" : "bg-white bg-opacity-70 text-purple-700"}`}
            disabled={!title || !description}
          >
            Preview
          </button>
          <button 
            onClick={() => {setShowNotices(true); setShowPreview(false);}}
            className={`px-6 py-2 rounded-xl transition-all ${showNotices ? "bg-purple-600 text-white shadow-md" : "bg-white bg-opacity-70 text-purple-700"}`}
          >
            View All ({notices.length})
          </button>
        </div>

        {/* Create Notice Form */}
        {!showPreview && !showNotices && (
          <div className="w-full max-w-xl bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-30 rounded-3xl shadow-xl p-8 transition-all">
            <div className="flex items-center justify-center mb-6">
              <Bell size={28} className="text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-purple-700">Post a Notice</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1 ml-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter an attention-grabbing title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-80 backdrop-blur-sm border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all shadow-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1 ml-1">Description</label>
                <textarea
                  placeholder="Enter detailed notice information"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-80 backdrop-blur-sm border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all shadow-sm resize-none"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-purple-800 mb-1 ml-1">Date</label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-600">
                    <Calendar size={18} className="mr-2 text-purple-500" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
                
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-purple-800 mb-1 ml-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-80 backdrop-blur-sm border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all shadow-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Post Notice
                  </div>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Preview Notice */}
        {showPreview && !showNotices && (
          <div className="w-full max-w-xl bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-30 rounded-3xl shadow-xl p-8 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-700">Notice Preview</h2>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition-all flex items-center"
              >
                <Send size={16} className="mr-2" />
                Post Now
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-purple-900">{title}</h3>
                {getPriorityBadge(priority)}
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap mb-4">{description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formattedDate}
                </div>
                <div>
                  Posted by: Faculty
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View All Notices */}
        {showNotices && (
          <div className="w-full max-w-2xl bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-30 rounded-3xl shadow-xl p-8 transition-all">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
              <Bell size={24} className="mr-2" />
              All Notices ({notices.length})
            </h2>
            
            {notices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notices posted yet
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {notices.map((notice, index) => (
                  <div key={notice.id || index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-purple-900">{notice.title}</h3>
                      <div className="flex space-x-2">
                        {notice.priority && getPriorityBadge(notice.priority)}
                        <button 
                          onClick={() => deleteNotice(notice.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mt-2 line-clamp-2">{notice.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {new Date(notice.datePosted).toLocaleDateString()}
                      </div>
                      <div>
                        Posted by: {notice.postedBy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom animation styles */}
      <style>
        {`
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounceSlow 3s infinite;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default PostNotice;