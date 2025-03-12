 
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/api/notices/all")
            .then(response => setNotices(response.data))
            .catch(error => console.log("Error fetching notices", error));
    }, []);

    return (
        <div>
            <h2>Notices</h2>
            {notices.map(notice => (
                <div key={notice.id}>
                    <h3>{notice.title}</h3>
                    <p>{notice.description}</p>
                    <p>Posted by: {notice.postedBy} on {notice.datePosted}</p>
                    {notice.content && <a href={notice.content} target="_blank">View File</a>}

                </div>
            ))}
        </div>
    );
};

export default Notices;
