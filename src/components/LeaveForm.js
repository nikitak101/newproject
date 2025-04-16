import React, { useState } from "react";
import { CalendarDays, Clock, FileText, Home, Phone, Send, User, UserCircle, Users } from "lucide-react";

function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    rollNo: "",
    div: "",
    year: "",
    parentPhone: "",
    hometown: "",
    reason: "",
    leaveDate: "",
    leaveTime: "",
    returnDate: "",
    returnTime: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Leave Details

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await onSubmit(formData);
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          regNo: "",
          rollNo: "",
          div: "",
          year: "",
          parentPhone: "",
          hometown: "",
          reason: "",
          leaveDate: "",
          returnDate: "",
          leaveTime: "",
          returnTime: "",
        });
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const isNextDisabled = () => {
    return !formData.name || !formData.regNo || !formData.rollNo || !formData.div || 
           !formData.year || !formData.parentPhone || !formData.hometown;
  };

  const isSubmitDisabled = () => {
    return !formData.reason || !formData.leaveDate || !formData.leaveTime || 
           !formData.returnDate || !formData.returnTime;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-4xl border border-white/50 relative z-10">
        {success ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Leave Application Submitted!</h3>
            <p className="text-gray-600">Your application has been received and is being processed.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Leave Application</h2>
              <p className="text-center text-gray-600">Please fill in the details to request your leave</p>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center mt-6">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 1 ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-700"
                  }`}>
                    1
                  </div>
                  <div className={`h-1 w-16 ${step === 1 ? "bg-purple-200" : "bg-purple-600"}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2 ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-700"
                  }`}>
                    2
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <span className={`text-xs mx-4 ${step === 1 ? "text-purple-600 font-medium" : "text-gray-500"}`}>Personal Details</span>
                <span className={`text-xs mx-4 ${step === 2 ? "text-purple-600 font-medium" : "text-gray-500"}`}>Leave Details</span>
              </div>
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="Enter your full name" 
                          value={formData.name}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Registration No</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="text" 
                          name="regNo" 
                          placeholder="Enter registration number" 
                          value={formData.regNo}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Roll No</label>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="text" 
                          name="rollNo" 
                          placeholder="Enter roll number" 
                          value={formData.rollNo}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Division</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="text" 
                          name="div" 
                          placeholder="Enter your division" 
                          value={formData.div}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Year</label>
                      <div className="relative">
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 appearance-none"
                        >
                          <option value="" disabled>Select your year</option>
                          <option value="FE">First Year</option>
                          <option value="SE">Second Year</option>
                          <option value="TE">Third Year</option>
                          <option value="BE">Final Year</option>
                        </select>
                        <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Parent's Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="tel" 
                          name="parentPhone" 
                          placeholder="Enter parent's phone number" 
                          value={formData.parentPhone}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="relative sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Hometown</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <input 
                          type="text" 
                          name="hometown" 
                          placeholder="Enter your hometown" 
                          value={formData.hometown}
                          onChange={handleChange} 
                          required 
                          className="w-full pl-10 pr-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 px-6 rounded-xl flex items-center gap-2 shadow transition-all
                        ${isNextDisabled() ? "opacity-60 cursor-not-allowed" : "hover:shadow-md hover:translate-y-0.5"}`}
                    >
                      Next <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Reason for Leave</label>
                    <textarea
                      name="reason"
                      placeholder="Please explain your reason for requesting leave"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-purple-700 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Leaving Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">Date</label>
                          <div className="relative">
                            <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                            <input
                              type="date"
                              name="leaveDate"
                              value={formData.leaveDate}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">Time</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                            <input
                              type="time"
                              name="leaveTime"
                              value={formData.leaveTime}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-purple-700 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M9 11l3 3m0 0l3-3m-3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Return Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">Date</label>
                          <div className="relative">
                            <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                            <input
                              type="date"
                              name="returnDate"
                              value={formData.returnDate}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">Time</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
                            <input
                              type="time"
                              name="returnTime"
                              value={formData.returnTime}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-2.5 px-6 border border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 flex items-center gap-2 transition"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      disabled={submitting || isSubmitDisabled()}
                      className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 px-6 rounded-xl flex items-center gap-2 shadow transition-all
                        ${(submitting || isSubmitDisabled()) ? "opacity-60 cursor-not-allowed" : "hover:shadow-md hover:translate-y-0.5"}`}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LeaveForm;