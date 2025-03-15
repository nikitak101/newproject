import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeaveApplication.css";

function LeaveApplication() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    rollNo: "",
    div: "",
    year: "",
    parentPhone: "",
    hometown: "",
    reason: "",
    leaveDate: "",
    leaveTime: "",
    returnDate: "",
    returnTime: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("leaveRequest", JSON.stringify(formData));
    alert("Leave request submitted successfully!");
    navigate("/leave-approval");
  };

  return (
    <div className="leave-form-container">
      <h2>Leave Application Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="text" name="regNo" placeholder="Registration No" required onChange={handleChange} />
        <input type="text" name="rollNo" placeholder="Roll No" required onChange={handleChange} />
        <input type="text" name="div" placeholder="Division" required onChange={handleChange} />
        <input type="text" name="year" placeholder="Year" required onChange={handleChange} />
        <input type="text" name="parentPhone" placeholder="Parent's Phone No" required onChange={handleChange} />
        <input type="text" name="hometown" placeholder="Hometown" required onChange={handleChange} />
        <textarea name="reason" placeholder="Reason for Leave" required onChange={handleChange}></textarea>
        <label>Leave Date & Time:</label>
        <input type="date" name="leaveDate" required onChange={handleChange} />
        <input type="time" name="leaveTime" required onChange={handleChange} />
        <label>Return Date & Time:</label>
        <input type="date" name="returnDate" required onChange={handleChange} />
        <input type="time" name="returnTime" required onChange={handleChange} />
        <button type="submit">Submit Leave Request</button>
      </form>
    </div>
  );
}

export default LeaveApplication;
a