import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function LeaveApproval() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setRequests(allRequests);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus.toUpperCase();

    setRequests(updatedRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/coordinator-board")}
          className="flex items-center gap-2 text-blue-800 hover:text-blue-600 font-semibold transition"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Leave Requests Review Panel
        </h2>

        {requests.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Reg No</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Leave Date</th>
                <th className="border px-4 py-2">Return Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{req.name}</td>
                  <td className="border px-4 py-2">{req.regNo}</td>
                  <td className="border px-4 py-2">{req.reason}</td>
                  <td className="border px-4 py-2">{req.leaveDate}</td>
                  <td className="border px-4 py-2">{req.returnDate}</td>
                  <td className={`border px-4 py-2 font-semibold ${getStatusColor(req.status || "Pending")}`}>
                    {req.status || "Pending"}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => updateStatus(idx, "Approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(idx, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No leave requests available.</p>
        )}
      </div>
    </div>
  );
}

export default LeaveApproval;
