import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaLock, FaUserGraduate } from "react-icons/fa";
import "./LoginStyles.css";

function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!role) {
      alert("Please select your role!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { rollNo, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.role === "STUDENT") {
        localStorage.setItem("loggedInRollNo", rollNo);
        navigate("/student-dashboard");
      } else if (response.data?.role === "FACULTY") {
        navigate("/faculty-dashboard");
      } else if (response.data?.role === "COORDINATOR") {
        navigate("/coordinator-dashboard");
      } else {
        alert("Invalid role received");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="background-overlay"></div>

      <div className="login-box">
        <h2 className="login-title">College Portal Login</h2>

        {/* Role Selection */}
        <div className="input-group">
          <FaUserGraduate className="input-icon" />
          <select
            className="login-input glass-effect"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled hidden>-- Select Role --</option>
            <option value="STUDENT">🎓 Student</option>
            <option value="FACULTY">📚 Faculty</option>
            <option value="COORDINATOR">🧑‍🏫 Coordinator</option>
          </select>
        </div>

        {/* Roll Number */}
        <div className="input-group">
          <FaUserAlt className="input-icon" />
          <input
            className="login-input glass-effect"
            type="text"
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            className="login-input glass-effect"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
