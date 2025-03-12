import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Importing the new Login.css file

function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { rollNo, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.role === "STUDENT") {
        navigate("/student-dashboard");
      } else if (response.data?.role === "FACULTY") {
        navigate("/faculty-dashboard");
      } else {
        alert("Invalid role received");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to College Portal</h2>
        <select className="login-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </select>
        <input
          className="login-input"
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
