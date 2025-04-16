
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeaveApplication() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    rollNo: "",
    email: "",
    div: "",
    year: "",
    parentPhone: "",
    hometown: "",
    reason: "",
    leaveDate: "",
    leaveTime: "",
    returnDate: "",
    returnTime: "",
    status: "PENDING",
    date: new Date().toISOString()
  });

  const [isEditable, setIsEditable] = useState(false);
  const [verified, setVerified] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("loggedInStudent");
    if (!storedData) {
      alert("Please log in to submit a leave application");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate phone number
    if (formData.parentPhone && !/^\d{10}$/.test(formData.parentPhone)) {
      errors.parentPhone = "Phone number must be 10 digits";
    }

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please provide a valid email address";
    }
    
    // Validate return date is after leave date
    if (formData.leaveDate && formData.returnDate) {
      const leaveDateTime = new Date(`${formData.leaveDate}T${formData.leaveTime || "00:00"}`);
      const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime || "00:00"}`);
      
      if (returnDateTime <= leaveDateTime) {
        errors.returnDate = "Return date must be after leave date";
      }
    }
    
    // Validate reason has minimum length
    if (formData.reason && formData.reason.trim().length < 10) {
      errors.reason = "Please provide a detailed reason (minimum 10 characters)";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleVerifyRollNo = () => {
    if (!formData.rollNo.trim()) {
      setValidationErrors({...validationErrors, rollNo: "Roll number is required"});
      return;
    }
    
    setLoading(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      const storedData = localStorage.getItem("loggedInStudent");
      if (!storedData) {
        alert("❌ You must be logged in.");
        navigate("/login");
        return;
      }

      const studentData = JSON.parse(storedData);
      if (
        formData.rollNo.trim().toLowerCase() !==
        studentData.rollNumber.trim().toLowerCase()
      ) {
        setValidationErrors({...validationErrors, rollNo: "Invalid roll number"});
        setLoading(false);
        return;
      }

      setIsEditable(true);
      setVerified(true);
      setFormData((prev) => ({
        ...prev,
        name: studentData.name || "",
        regNo: studentData.regNo || "",
        div: studentData.div || "",
        year: studentData.year || "",
        parentPhone: studentData.parentPhone || "",
        hometown: studentData.hometown || "",
        date: new Date().toISOString()
      }));
      setLoading(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verified) {
      alert("❌ Please verify your roll number first.");
      return;
    }

    if (!validateForm()) {
      // Focus on first field with error
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementsByName(firstErrorField)[0]?.focus();
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    setLoading(true);

    const leaveRequestData = { ...formData };
    async function submitLeaveRequest(leaveRequestData) {
    try {
      const response = await fetch("http://localhost:8090/api/leave-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveRequestData),
      });

      if (response.ok) {
        setLoading(false);
        setShowConfirmation(false);
        alert("✅ Leave request submitted successfully!");
        navigate("/leave-status");
      } else {
        setLoading(false);
        alert("❌ Failed to submit leave request. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("❌ Error occurred. Please try again.");
    }
  }

    
    // Simulate network delay
    setTimeout(() => {
      const newLeave = { id: Date.now(), ...formData };
      const existing = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      localStorage.setItem("leaveRequests", JSON.stringify([...existing, newLeave]));
      
      setLoading(false);
      setShowConfirmation(false);
      alert("✅ Leave request submitted successfully!");
      navigate("/leave-status");
    }, 1000);
  };

  const studentFields = [
    { name: "rollNo", placeholder: "Roll Number", alwaysEditable: true, icon: "🆔" },
    { name: "name", placeholder: "Full Name", icon: "👤" },
    { name: "regNo", placeholder: "Registration No", icon: "📝" },
    { name: "div", placeholder: "Division", icon: "🏫" },
    { name: "year", placeholder: "Year", icon: "📅" },
    { name: "parentPhone", placeholder: "Parent's Phone", icon: "📞" },
    { name: "hometown", placeholder: "Hometown", icon: "🏠" },
    { name: "email", placeholder: "Email Address", icon: "📧" }, // Added email field here
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-100 to-indigo-100 flex items-center justify-center relative p-6 font-[Poppins,sans-serif] overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute animate-float1 text-6xl opacity-10 top-20 left-10">🌤️</div>
      <div className="absolute animate-float2 text-5xl opacity-10 bottom-20 right-10">✈️</div>
      <div className="absolute animate-float3 text-4xl opacity-10 top-40 right-20">🏖️</div>
      <div className="absolute animate-float4 text-5xl opacity-10 bottom-40 left-20">🎒</div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-indigo-600"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-pink-200/30 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-indigo-200/30 blur-xl"></div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-4xl mr-3">📝</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-indigo-700 bg-clip-text text-transparent">
              Leave Application
            </h2>
          </div>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white px-5 py-2 rounded-xl transition font-medium text-sm flex items-center"
          >
            <span className="mr-1">←</span> Back to Dashboard
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              verified ? "w-1/2 bg-gradient-to-r from-pink-500 to-indigo-600" : "w-0 bg-pink-500"
            }`}
          ></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Verification */}
          <div className={`mb-6 ${verified ? "opacity-50" : ""}`}>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">1</span>
              Verify Your Identity
            </h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-400">
                🆔
              </div>
              <input
                type="text"
                name="rollNo"
                placeholder="Enter your Roll Number"
                value={formData.rollNo}
                onChange={handleChange}
                disabled={verified || loading}
                required
                className={`bg-white border ${validationErrors.rollNo ? 'border-red-300 ring-1 ring-red-300' : 'border-indigo-300'} p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 transition-all`}
              />
              {validationErrors.rollNo && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.rollNo}</p>
              )}
            </div>
            
            {!verified && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleVerifyRollNo}
                  disabled={loading || !formData.rollNo.trim()}
                  className={`bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition flex items-center justify-center mx-auto ${loading || !formData.rollNo.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>Verify Roll Number</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Form Fields */}
          <div className={`transition-all duration-500 ${verified ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">2</span>
              Complete Your Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {studentFields.filter(field => field.name !== "rollNo").map(({ name, placeholder, icon }) => (
                <div key={name} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-400">
                    {icon}
                  </div>
                  <input
                    type={name === "parentPhone" ? "tel" : "text"}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    readOnly={!isEditable}
                    required
                    className={`bg-white border ${validationErrors[name] ? 'border-red-300 ring-1 ring-red-300' : 'border-indigo-300'} p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 transition-all`}
                  />
                  {validationErrors[name] && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors[name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6 relative">
              <div className="absolute top-3 left-3 text-indigo-400">📄</div>
              <textarea
                name="reason"
                placeholder="Reason for Leave (please provide details)"
                value={formData.reason}
                onChange={handleChange}
                required
                className={`w-full p-3 pl-10 border ${validationErrors.reason ? 'border-red-300 ring-1 ring-red-300' : 'border-indigo-300'} rounded-xl bg-white focus:ring-2 focus:ring-indigo-400`}
                rows="4"
              />
              {validationErrors.reason && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.reason}</p>
              )}
            </div>

            <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-indigo-700 font-medium mb-2 flex items-center">
                  <span className="mr-2">🛫</span> Leave Date & Time
                </label>
                <div className="space-y-3">
                  <input
                    type="date"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 rounded-xl border border-indigo-300 bg-white focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="time"
                    name="leaveTime"
                    value={formData.leaveTime}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-indigo-300 bg-white focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-indigo-700 font-medium mb-2 flex items-center">
                  <span className="mr-2">🛬</span> Return Date & Time
                </label>
                <div className="space-y-3">
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                    min={formData.leaveDate || new Date().toISOString().split("T")[0]}
                    className={`w-full p-3 rounded-xl border ${validationErrors.returnDate ? 'border-red-300 ring-1 ring-red-300' : 'border-indigo-300'} bg-white focus:ring-2 focus:ring-indigo-400`}
                  />
                  {validationErrors.returnDate && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.returnDate}</p>
                  )}
                  <input
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-indigo-300 bg-white focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center mx-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Submit Leave Request</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-modalFade">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-3xl mb-4">
                ✅
              </div>
              <h3 className="text-xl font-bold text-gray-800">Confirm Submission</h3>
              <p className="text-gray-600 mt-2">Are you sure you want to submit this leave application?</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Leave Date:</div>
                <div className="font-medium text-gray-800">{formData.leaveDate}</div>
                
                <div className="text-gray-500">Return Date:</div>
                <div className="font-medium text-gray-800">{formData.returnDate}</div>
                
                <div className="text-gray-500">Reason:</div>
                <div className="font-medium text-gray-800">{formData.reason}</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                disabled={loading}
                className={`flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium ${loading ? 'opacity-70' : 'hover:from-indigo-600 hover:to-purple-700'}`}
              >
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes float4 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(10px) rotate(3deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes modalFade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float1 {
          animation: float1 6s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 8s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 7s ease-in-out infinite;
        }
        .animate-float4 {
          animation: float4 9s ease-in-out infinite;
        }
        .animate-modalFade {
          animation: modalFade 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default LeaveApplication;