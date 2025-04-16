import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNotice = () => {
  const [facultyId, setFacultyId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.AOS && window.AOS.init(); // Ensure AOS works
  }, []);

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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?announcement,meeting')`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div
        className="relative z-10 bg-white/10 backdrop-blur-xl text-white shadow-2xl rounded-2xl p-8 md:p-10 max-w-xl w-full"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center" data-aos="fade-down">
          📢 Post a Notice
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <i data-feather="user" className="absolute left-3 top-3.5 text-white"></i>
            <input
              type="text"
              placeholder="Faculty ID"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
              className="pl-10 bg-white/20 placeholder-white/80 text-white p-3 rounded-lg outline-none w-full"
              data-aos="fade-right"
            />
          </div>

          <div className="relative">
            <i data-feather="file-text" className="absolute left-3 top-3.5 text-white"></i>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pl-10 bg-white/20 placeholder-white/80 text-white p-3 rounded-lg outline-none w-full"
              data-aos="fade-left"
            />
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-white/20 placeholder-white/80 text-white p-3 rounded-lg outline-none resize-none h-24"
            data-aos="zoom-in"
          />

          <div className="relative">
            <i data-feather="user-check" className="absolute left-3 top-3.5 text-white"></i>
            <input
              type="text"
              placeholder="Posted By"
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              required
              className="pl-10 bg-white/20 placeholder-white/80 text-white p-3 rounded-lg outline-none w-full"
              data-aos="fade-up-right"
            />
          </div>

          <div data-aos="flip-up">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-transform duration-200 hover:scale-105 active:scale-95"
            data-aos="zoom-in-up"
          >
            Upload Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
