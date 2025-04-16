import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Calendar, FileText, AlertCircle, CheckCircle, Loader } from "lucide-react";

function UploadAssignment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    facultyId: "",
    subject: "",
    title: "",
    description: "",
    dueDate: "",
    file: null,
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [fileName, setFileName] = useState("");
  const [touched, setTouched] = useState({});

  // When component mounts, try to load facultyId from localStorage if available
  useEffect(() => {
    const savedFacultyId = localStorage.getItem("facultyId");
    if (savedFacultyId) {
      setFormData(prev => ({ ...prev, facultyId: savedFacultyId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    
    // Save facultyId to localStorage when it changes
    if (name === "facultyId") {
      localStorage.setItem("facultyId", value);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
      setFileName(e.target.files[0].name);
      setTouched({ ...touched, file: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set all fields as touched for validation
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!formData.file) {
      setStatus({ loading: false, success: false, error: "Please select a file to upload" });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    const uploadData = new FormData();
    uploadData.append("facultyId", Number(formData.facultyId));
    uploadData.append("subject", formData.subject);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("dueDate", formData.dueDate);
    uploadData.append("file", formData.file);

    try {
      await axios.post("http://localhost:8090/assignments/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ loading: false, success: true, error: null });
      
      // Reset form after successful submission
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
        setFormData({
          facultyId: formData.facultyId, // Keep the faculty ID
          subject: "",
          title: "",
          description: "",
          dueDate: "",
          file: null
        });
        setFileName("");
        setTouched({});
      }, 3000);
    } catch (error) {
      console.error("Error uploading assignment:", error);
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || "Failed to upload assignment. Please try again." 
      });
    }
  };

  const getFieldError = (fieldName) => {
    if (!touched[fieldName]) return null;
    
    switch(fieldName) {
      case 'facultyId':
        return !formData.facultyId ? "Faculty ID is required" : null;
      case 'subject':
        return !formData.subject ? "Please select a subject" : null;
      case 'title':
        return !formData.title ? "Assignment title is required" : null;
      case 'description':
        return !formData.description ? "Description is required" : null;
      case 'dueDate':
        return !formData.dueDate ? "Due date is required" : null;
      case 'file':
        return !formData.file ? "Please attach an assignment file" : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <svg viewBox="0 0 800 600" className="absolute top-10 left-10 w-72 h-72 animate-pulse">
          <path fill="#ffffff" d="M400,400Q350,500,250,500Q150,500,100,400Q50,300,100,200Q150,100,250,100Q350,100,400,200Q450,300,400,400Z" />
        </svg>
        <svg viewBox="0 0 800 600" className="absolute bottom-10 right-10 w-64 h-64 animate-bounce">
          <circle cx="400" cy="300" r="150" fill="#ffffff" />
        </svg>
        <svg viewBox="0 0 800 600" className="absolute top-1/2 left-1/3 w-56 h-56 animate-spin-slow">
          <polygon points="400,100 600,300 400,500 200,300" fill="#ffffff" />
        </svg>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/faculty-dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Form Card */}
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl p-8 md:p-10 w-full max-w-2xl z-10 transform transition-all duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-6 flex items-center justify-center gap-3">
          <Upload className="text-purple-600" size={28} /> Upload Assignment
        </h2>

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <p>{status.error}</p>
          </div>
        )}

        {status.success ? (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex flex-col items-center justify-center gap-4 animate-fade-in">
            <CheckCircle size={64} className="text-green-500" />
            <h3 className="text-xl font-semibold text-green-700">Assignment Uploaded Successfully!</h3>
            <p className="text-green-600 text-center">Your assignment has been uploaded and is now available to students.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
            {/* Faculty ID */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Faculty ID</label>
              <input
                type="number"
                name="facultyId"
                placeholder="Enter your faculty ID"
                value={formData.facultyId}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl bg-white border ${getFieldError('facultyId') ? 'border-red-300 ring-1 ring-red-300' : 'border-purple-300 focus:ring-2 focus:ring-purple-400'} shadow transition-all`}
              />
              {getFieldError('facultyId') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('facultyId')}</p>
              )}
            </div>
            
            {/* Subject */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl bg-white border ${getFieldError('subject') ? 'border-red-300 ring-1 ring-red-300' : 'border-purple-300 focus:ring-2 focus:ring-purple-400'} shadow transition-all`}
              >
                <option value="" disabled>Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="Biology">Biology</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
              {getFieldError('subject') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('subject')}</p>
              )}
            </div>
            
            {/* Assignment Title */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Assignment Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl bg-white border ${getFieldError('title') ? 'border-red-300 ring-1 ring-red-300' : 'border-purple-300 focus:ring-2 focus:ring-purple-400'} shadow transition-all`}
              />
              {getFieldError('title') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('title')}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Assignment Description</label>
              <div className="relative">
                <FileText size={18} className="absolute top-3.5 left-3 text-purple-400" />
                <textarea
                  name="description"
                  placeholder="Describe the assignment details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-3 pl-10 rounded-xl bg-white border ${getFieldError('description') ? 'border-red-300 ring-1 ring-red-300' : 'border-purple-300 focus:ring-2 focus:ring-purple-400'} shadow transition-all resize-none`}
                ></textarea>
              </div>
              {getFieldError('description') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('description')}</p>
              )}
            </div>
            
            {/* Due Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Due Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute top-3.5 left-3 text-purple-400" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 rounded-xl bg-white border ${getFieldError('dueDate') ? 'border-red-300 ring-1 ring-red-300' : 'border-purple-300 focus:ring-2 focus:ring-purple-400'} shadow transition-all`}
                />
              </div>
              {getFieldError('dueDate') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('dueDate')}</p>
              )}
            </div>
            
            {/* File Upload */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-purple-700">Assignment File</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center ${getFieldError('file') ? 'border-red-300 bg-red-50' : 'border-purple-300 hover:border-purple-500 bg-purple-50'}`}>
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="mb-2 text-purple-500" size={24} />
                    {fileName ? (
                      <span className="text-sm font-medium text-green-700 break-all">
                        {fileName}
                      </span>
                    ) : (
                      <span className="text-purple-600">
                        Drop your file here or <span className="underline">browse</span>
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX, PPT, PPTX, ZIP (max 10MB)
                    </p>
                  </div>
                </label>
              </div>
              {getFieldError('file') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('file')}</p>
              )}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3 px-6 mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-102 flex items-center justify-center gap-2"
            >
              {status.loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Assignment
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UploadAssignment;