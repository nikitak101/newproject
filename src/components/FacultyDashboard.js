import React from "react";
import { Link } from "react-router-dom";
import "./FacultyDashboard.css";
import { FaUpload, FaClipboardList, FaBullhorn } from "react-icons/fa";

function FacultyDashboard() {
  return (
    <div className="dashboard-container">
      <div className="background-overlay"></div> {/* Glassmorphic Background */}
      
      <div className="dashboard-box adjusted-box">
        <h1 className="dashboard-title">Faculty Dashboard</h1>
        <div className="dashboard-grid adjusted-grid">
          <Link to="/upload-assignments" className="dashboard-item medium-box">
            <FaUpload className="dashboard-icon" />
            <span>Upload Assignments</span>
          </Link>
          <Link to="/upload-attendance" className="dashboard-item medium-box">
            <FaClipboardList className="dashboard-icon" />
            <span>Upload Attendance</span>
          </Link>
          <Link to="/post-notice" className="dashboard-item medium-box">
            <FaBullhorn className="dashboard-icon" />
            <span>Post Notice</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
