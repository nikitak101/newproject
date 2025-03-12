import React, { useState } from "react";
import axios from "axios";
import "./UploadAssignment.css"; // Importing the new CSS file

function UploadAssignment() {
  const [formData, setFormData] = useState({
    facultyId: "",
    title: "",
    description: "",
    dueDate: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a file to upload.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("facultyId", Number(formData.facultyId));
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("dueDate", formData.dueDate);
    uploadData.append("file", formData.file);

    try {
      const response = await axios.post(
        "http://localhost:8090/assignments/upload",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading assignment:", error);
      alert("Failed to upload assignment");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2 className="upload-title">Upload New Assignment</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
          <input
            type="number"
            name="facultyId"
            placeholder="Faculty ID"
            value={formData.facultyId}
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="upload-input"
          />
          <textarea
            name="description"
            placeholder="Assignment Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="upload-textarea"
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input type="file" onChange={handleFileChange} required className="upload-file" />
          <button type="submit" className="upload-button">
            Upload Assignment
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadAssignment;
