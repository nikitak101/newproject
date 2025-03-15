import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assignments.css";
import { FaDownload, FaBookOpen } from "react-icons/fa"; // Importing icons
import { MdDescription, MdDateRange } from "react-icons/md";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/assignments")
      .then((response) => {
        console.log("Fetched Assignments:", response.data);
        setAssignments(response.data);
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  return (
    <div className="assignments-container">
      <div className="background-overlay"></div> {/* Glassmorphic Background */}
      
      <div className="assignments-box">
        <h2 className="assignments-title"><FaBookOpen /> Assignments</h2>
        {assignments.length === 0 ? (
          <p className="no-assignments">No assignments available</p>
        ) : (
          <table className="assignments-table">
            <thead>
              <tr>
                <th><FaBookOpen /> Title</th>
                <th><MdDescription /> Description</th>
                <th><MdDateRange /> Due Date</th>
                <th><FaDownload /> Download</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.dueDate}</td>
                  <td>
                    {assignment.filePath ? (
                      <a
                        href={`http://localhost:8090/uploads/${assignment.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="download-link"
                      >
                        <FaDownload /> Download
                      </a>
                    ) : (
                      "No File Available"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Assignments;
