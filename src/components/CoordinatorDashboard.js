import React, { useState } from "react";
import "./CoordinatorDashboard.css";

function CoordinatorDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "John Doe", reason: "Family Emergency", status: "PENDING" },
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: "APPROVED" } : req));
  };

  const handleReject = (id) => {
    setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: "REJECTED" } : req));
  };

  return (
    <div className="coordinator-dashboard">
      <h2>Class Coordinator Dashboard</h2>
      <div className="leave-requests">
        {leaveRequests.map(req => (
          <div key={req.id} className="leave-request">
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === "PENDING" && (
              <>
                <button onClick={() => handleApprove(req.id)}>Approve</button>
                <button onClick={() => handleReject(req.id)}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoordinatorDashboard;
