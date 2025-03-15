import React, { useState } from "react";
import axios from "axios";
import "./AddNotice.css"; // Import the new CSS

const AddNotice = () => {
    const [facultyId, setFacultyId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [postedBy, setPostedBy] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("facultyId", Number(facultyId)); 
        formData.append("title", title);
        formData.append("description", description);
        formData.append("postedBy", postedBy);
        formData.append("content", file);

        try {
            const response = await axios.post("http://localhost:8090/api/notices/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data);
        } catch (error) {
            alert("Error uploading notice");
        }
    };

    return (
        <div className="notice-container">
            <div className="background-overlay"></div> {/* Glassmorphic Background */}

            <div className="notice-box">
                <h1 className="notice-title">📢 Post a Notice</h1>
                <form onSubmit={handleSubmit} className="notice-form">
                    <input type="text" placeholder="Faculty ID" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} required />
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Posted By" value={postedBy} onChange={(e) => setPostedBy(e.target.value)} required />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    <button type="submit" className="submit-button">Upload Notice</button>
                </form>
            </div>
        </div>
    );
};

export default AddNotice;
