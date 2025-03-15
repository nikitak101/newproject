import React, { useEffect, useState } from "react";
import "./ViewAttendance.css"; // ✅ Correct

const subjects = ["COA", "DS", "MI", "OE", "MDM"];

function Attendance() {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [error, setError] = useState("");
  const rollNumber = localStorage.getItem("loggedInRollNo");

  useEffect(() => {
    if (!rollNumber) {
      setError("You are not logged in! Please log in again.");
      return;
    }

    let fetchedAttendance = {};

    // Retrieve attendance from localStorage for all subjects based on selected date
    subjects.forEach((subject) => {
      const subjectAttendance = JSON.parse(
        localStorage.getItem(`attendance-${subject}-${selectedDate}`)
      ) || {};
      fetchedAttendance[subject] = subjectAttendance[rollNumber] || "ABSENT"; // Default is "ABSENT"
    });

    setAttendance(fetchedAttendance);
  }, [rollNumber, selectedDate]);

  function getFormattedDate() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className="dashboard-container">
      <div className="background-overlay"></div>
      <div className="dashboard-box">
        <h1 className="dashboard-title">📊 Attendance Record</h1>

        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="dashboard-content">
            <h3>🎓 Roll No: <span className="highlight-text">{rollNumber}</span></h3>

            {/* Date Picker */}
            <label className="date-label">📅 Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-picker"
            />

            <div className="table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td className={`status ${attendance[subject] === "PRESENT" ? "present" : "absent"}`}>
                        {attendance[subject]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
