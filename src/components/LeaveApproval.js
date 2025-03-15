import React, { useState, useEffect } from "react";
import "./LeaveApproval.css";

function LeaveApproval() {
  const [leaveStatus, setLeaveStatus] = useState("Pending");
  const [leaveDetails, setLeaveDetails] = useState(null);

  useEffect(() => {
    // Retrieve stored leave details from localStorage
    const storedLeaveDetails = JSON.parse(localStorage.getItem("leaveRequest"));
    if (storedLeaveDetails) {
      setLeaveDetails(storedLeaveDetails);
      setLeaveStatus(storedLeaveDetails.status || "Pending"); // Default to Pending
    }
  }, []);

  return (
    <div className="leave-approval-container">
      <h2>Leave Request Status</h2>
      {leaveDetails ? (
        <div className="leave-details">
          <p><strong>Name:</strong> {leaveDetails.name}</p>
          <p><strong>Reg No:</strong> {leaveDetails.regNo}</p>
          <p><strong>Roll No:</strong> {leaveDetails.rollNo}</p>
          <p><strong>Division:</strong> {leaveDetails.div}</p>
          <p><strong>Year:</strong> {leaveDetails.year}</p>
          <p><strong>Parent's Phone:</strong> {leaveDetails.parentPhone}</p>
          <p><strong>Hometown:</strong> {leaveDetails.hometown}</p>
          <p><strong>Reason:</strong> {leaveDetails.reason}</p>
          <p><strong>Leave Date & Time:</strong> {leaveDetails.leaveDate} {leaveDetails.leaveTime}</p>
          <p><strong>Return Date & Time:</strong> {leaveDetails.returnDate} {leaveDetails.returnTime}</p>
          <p className={`status ${leaveStatus.toLowerCase()}`}>
            <strong>Status:</strong> {leaveStatus}
          </p>
        </div>
      ) : (
        <p>No leave request found.</p>
      )}
    </div>
  );
}

export default LeaveApproval;
