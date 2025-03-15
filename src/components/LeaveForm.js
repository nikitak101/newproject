import React, { useState } from "react";
import "./LeaveForm.css";

function LeaveForm({ onSubmit }) {
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="leave-form-container">
      <h2>Leave Application</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="regNo" placeholder="Registration No" onChange={handleChange} required />
        <input type="text" name="rollNo" placeholder="Roll No" onChange={handleChange} required />
        <input type="text" name="div" placeholder="Division" onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year" onChange={handleChange} required />
        <input type="text" name="parentPhone" placeholder="Parent's Phone No" onChange={handleChange} required />
        <input type="text" name="hometown" placeholder="Hometown" onChange={handleChange} required />
        <input type="text" name="reason" placeholder="Reason for Leave" onChange={handleChange} required />
        <input type="date" name="leaveDate" onChange={handleChange} required />
        <input type="time" name="leaveTime" onChange={handleChange} required />
        <input type="date" name="returnDate" onChange={handleChange} required />
        <input type="time" name="returnTime" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaveForm;
