import React, { useEffect, useState } from "react";
import "./Notices.css";

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);

  // Load notices from localStorage
  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
  }, []);

  return (
    <div className="notices-container">
      <div className="background-overlay"></div> {/* Glassmorphic Background */}

      <div className="notices-box">
        <h1 className="notices-title">📢 Latest Notices</h1>

        {notices.length === 0 ? (
          <p className="no-notices">No notices available</p>
        ) : (
          <div className="notices-list">
            {notices.map((notice, index) => (
              <div key={index} className="notice-card">
                <h2>{notice.title}</h2>
                <p>{notice.description}</p>
                <p className="notice-meta">
                  Posted by <strong>{notice.postedBy}</strong> on {notice.datePosted}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNotices;
