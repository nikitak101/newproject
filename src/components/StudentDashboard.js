import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css"; // Importing the CSS file

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="dashboard-links">
          <Link to="/assignments">
            <button className="dashboard-button">📚 View Assignments</button>
          </Link>
          <Link to="/attendance">
            <button className="dashboard-button">📊 Check Attendance</button>
          </Link>
          <Link to="/notices">
            <button className="dashboard-button">📢 View Notices</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
