import React, { useState, useEffect } from "react";
import "./PostNotice.css"; // Importing the updated CSS

const PostNotice = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notices, setNotices] = useState([]);

    const datePosted = new Date().toISOString().split("T")[0]; // Auto-generated date

    useEffect(() => {
        const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
        setNotices(storedNotices);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = { title, description, datePosted, postedBy: "Faculty" };

        const updatedNotices = [...notices, newNotice];
        setNotices(updatedNotices);
        localStorage.setItem("notices", JSON.stringify(updatedNotices));

        alert("📢 Notice posted successfully!");
        setTitle("");
        setDescription("");
    };

    return (
        <div className="notice-container">
            <div className="background-overlay"></div> {/* Glassmorphic Background */}

            <div className="notice-box">
                <h1 className="notice-title">📢 Post a Notice</h1>
                <form onSubmit={handleSubmit} className="notice-form">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="date" value={datePosted} disabled />
                    <button type="submit" className="submit-button">Post Notice</button>
                </form>
            </div>
        </div>
    );
};

export default PostNotice;
