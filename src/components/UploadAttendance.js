import React from "react";
import Attendance from "./Attendance"; // ✅ Import the Attendance Component

function UploadAttendance() {
  return (
    <div>
      <h2>Upload Attendance</h2>
      <Attendance /> {/* ✅ Show the Attendance Component */}
    </div>
  );
}

export default UploadAttendance;
