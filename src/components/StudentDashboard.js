import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";
import { FaBook, FaChartBar, FaBullhorn, FaClipboardList } from "react-icons/fa";

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="background-overlay"></div> {/* Glassmorphic Background */}

      <div className="dashboard-box adjusted-box">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="dashboard-grid adjusted-grid">
          <Link to="/assignments" className="dashboard-item medium-box">
            <FaBook className="dashboard-icon" />
            <span>Assignments</span>
          </Link>
          <Link to="/view-attendance" className="dashboard-item medium-box">
            <FaChartBar className="dashboard-icon" />
            <span>Attendance</span>
          </Link>
          <Link to="/view-notices" className="dashboard-item medium-box">
            <FaBullhorn className="dashboard-icon" />
            <span>Notices</span>
          </Link>
          <Link to="/leave-application" className="dashboard-item medium-box">
            <FaClipboardList className="dashboard-icon" />
            <span>Leave Approval</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
