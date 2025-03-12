 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/attendance')
      .then((response) => setAttendance(response.data))
      .catch((error) => console.error('Error fetching attendance:', error));
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      <ul>
        {attendance.map((record) => (
          <li key={record.id}>{record.date} - {record.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;
