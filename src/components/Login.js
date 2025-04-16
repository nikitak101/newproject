import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaLock, FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff, HelpCircle, AlertCircle } from "lucide-react";

function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");  // Add email state
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) return setFormError("Please select a role");
    if (!rollNo) return setFormError("Please enter your username");
    if (!password) return setFormError("Please enter your password");

    try {
      const response = await axios.post(
        "http://localhost:8090/auth/login",
        { rollNo, password, role, email },  // Include email here
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = response.data;
      const userRole = userData?.role;

      if (userRole === "STUDENT") {
        localStorage.setItem("loggedInStudent", JSON.stringify(userData));
        localStorage.setItem("loggedInRollNo", rollNo);
        localStorage.setItem("studentUser", JSON.stringify({ rollNo, role, email }));
        localStorage.setItem("studentUser", JSON.stringify({
          rollNo: rollNo,
          role: role,
          name: userData.name
        }));
        
        navigate("/student-dashboard");
      } else if (userRole === "FACULTY") {
        localStorage.setItem("loggedInFaculty", JSON.stringify(userData));
        localStorage.setItem("facultyName", userData.name);
        localStorage.setItem("facultyPosition", userData.position || "Faculty Member");
        navigate("/faculty-dashboard");
      } else if (userRole === "CLASS_COORDINATOR") {
        navigate("/coordinator-board");
      } else if (userRole === "HOSTEL_DEPARTMENT") {
        navigate("/hostel-dashboard");
      } else {
        setFormError("Invalid role received from server.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setFormError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <svg viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full h-40">
          <path fill="#ec4899" fillOpacity="0.3" d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,160C672,160,768,128,864,106.7C960,85,1056,75,1152,101.3C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="p-4 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      <div className={`flex items-center justify-center min-h-screen p-4 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white text-center rounded-t-3xl">
            <h1 className="text-3xl font-bold mb-1">Welcome to EduKita</h1>
            <p className="text-pink-100 text-sm">Your smart leave & learning assistant</p>
          </div>

          <div className="p-6">
            {formError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-pink-800 text-sm font-medium mb-2">Select Role</label>
                <select
                  className="w-full bg-white border border-pink-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setFormError("");
                  }}
                >
                  <option value="">-- Select Role --</option>
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="CLASS_COORDINATOR">Coordinator</option>
                  <option value="HOSTEL_DEPARTMENT">Hostel Department</option>
                </select>
              </div>

              {/* Email Input */}
<div className="mb-4">
  <label className="block text-pink-800 text-sm font-medium mb-2">Email</label>
  <div className="relative">
    <input
      type="email"
      className="bg-white border border-pink-300 text-pink-800 py-3 pl-10 pr-3 block w-full rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        setFormError("");
      }}
    />
  </div>

  {/* Message below input */}
  <p className="text-sm text-gray-500 mt-2">
    📩 Check your spam folder if you don’t see the email!
  </p>
</div>


              {/* Roll Number Input */}
              <div className="mb-4">
                <label className="block text-pink-800 text-sm font-medium mb-2">Username / ID</label>
                <div className="relative">
                  <input
                    type="text"
                    className="bg-white border border-pink-300 text-pink-800 py-3 pl-10 pr-3 block w-full rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter your username"
                    value={rollNo}
                    onChange={(e) => {
                      setRollNo(e.target.value);
                      setFormError("");
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-pink-800 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-white border border-pink-300 text-pink-800 py-3 pl-10 pr-10 block w-full rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFormError("");
                    }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-500 hover:text-pink-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 font-semibold text-lg transition-all duration-300"
              >
                Login
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-pink-100 border-t border-pink-200 flex justify-center">
            <a href="#" className="flex items-center text-sm text-pink-700 hover:text-purple-700">
              <HelpCircle size={16} className="mr-1" /> Need help? Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
