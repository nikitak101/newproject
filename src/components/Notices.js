import React, { useEffect, useState } from "react";
import axios from "axios";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/notices/all")
      .then((response) => setNotices(response.data))
      .catch((error) => console.log("Error fetching notices", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📢 Notices</h2>

        {notices.length === 0 ? (
          <p className="text-center text-gray-600">No notices available</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white bg-opacity-80 p-4 rounded-lg shadow hover:shadow-md transition duration-200"
              >
                <h3 className="text-lg font-semibold text-blue-700">{notice.title}</h3>
                <p className="text-gray-700 mt-1">{notice.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted by <span className="font-medium">{notice.postedBy}</span> on{" "}
                  {notice.datePosted}
                </p>
                {notice.content && (
                  <a
                    href={notice.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 hover:underline"
                  >
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
