import React, { useEffect, useState } from "react";
import "./Attendance.css";

const subjects = ["COA", "DS", "MI", "OE", "MDM"];
const students = Array.from({ length: 149 }, (_, i) => `B${i + 1}`);

function Attendance() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());

  useEffect(() => {
    if (selectedSubject && selectedDate) {
      const savedAttendance = JSON.parse(
        localStorage.getItem(`attendance-${selectedSubject}-${selectedDate}`)
      ) || {};
      setAttendance(savedAttendance);
    }
  }, [selectedSubject, selectedDate]);

  const toggleAttendance = (rollNo) => {
    const updatedAttendance = {
      ...attendance,
      [rollNo]: attendance[rollNo] === "PRESENT" ? "ABSENT" : "PRESENT",
    };
    setAttendance(updatedAttendance);
    localStorage.setItem(
      `attendance-${selectedSubject}-${selectedDate}`,
      JSON.stringify(updatedAttendance)
    );
  };

  function getFormattedDate() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className="attendance-container">
      {!selectedSubject ? (
        <div className="attendance-box">
          <h2 className="attendance-title">📌 Select Subject</h2>
          <div className="subject-buttons">
            {subjects.map((subject) => (
              <button
                key={subject}
                className="subject-button"
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="attendance-box full-width">
          <h2 className="attendance-title">{selectedSubject} Attendance</h2>

          {/* Date Picker */}
          <label className="date-label">📅 Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />

          <div className="attendance-grid">
            {students.map((rollNo) => (
              <div key={rollNo} className="attendance-item">
                <span>{rollNo}</span>
                <button
                  className={`attendance-btn ${
                    attendance[rollNo] === "PRESENT" ? "present" : "absent"
                  }`}
                  onClick={() => toggleAttendance(rollNo)}
                >
                  {attendance[rollNo] || "ABSENT"}
                </button>
              </div>
            ))}
          </div>

          <button className="back-button" onClick={() => setSelectedSubject(null)}>
            ⬅ Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Attendance;
