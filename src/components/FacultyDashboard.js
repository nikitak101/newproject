import React from "react";
import { Link } from "react-router-dom";
import "./FacultyDashboard.css"; // Importing the new CSS file

function FacultyDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Faculty Dashboard</h1>
        <div className="dashboard-buttons">
          <Link to="/upload-assignments">
            <button className="dashboard-button">Upload Assignments</button>
          </Link>
          <Link to="/upload-attendance">
            <button className="dashboard-button">Upload Attendance</button>
          </Link>
          <Link to="/upload-notices">
            <button className="dashboard-button">Post Notice</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
