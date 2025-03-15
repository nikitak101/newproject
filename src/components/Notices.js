import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notices.css"; // Updated CSS

const Notices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/notices/all")
            .then(response => setNotices(response.data))
            .catch(error => console.log("Error fetching notices", error));
    }, []);

    return (
        <div className="notices-container">
            <div className="background-overlay"></div> {/* Glassmorphic Background */}

            <div className="notices-box">
                <h2 className="notices-title">📢 Notices</h2>
                {notices.length === 0 ? (
                    <p className="no-notices">No notices available</p>
                ) : (
                    <div className="notices-list">
                        {notices.map(notice => (
                            <div key={notice.id} className="notice-card">
                                <h3>{notice.title}</h3>
                                <p>{notice.description}</p>
                                <p className="notice-meta">
                                    Posted by <strong>{notice.postedBy}</strong> on {notice.datePosted}
                                </p>
                                {notice.content && (
                                    <a href={notice.content} target="_blank" rel="noopener noreferrer" className="view-file">
                                        📄 View File
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;
