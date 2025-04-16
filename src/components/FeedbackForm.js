import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Star, Check, Sparkles } from "lucide-react";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    rating: "",
    description: "",
    studentDiv: "",
    studentYear: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Track character count for description
  useEffect(() => {
    setCharacterCount(formData.description.length);
  }, [formData.description]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingSelect = (rating) => {
    setFormData({ ...formData, rating: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const existingFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
      const updatedFeedback = [...existingFeedback, {...formData, date: new Date().toISOString()}];
      localStorage.setItem("feedbackData", JSON.stringify(updatedFeedback));

      // Show success animation
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          subject: "",
          rating: "",
          description: "",
          studentDiv: "",
          studentYear: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error saving feedback locally:", error);
      alert("❌ Failed to save feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <svg viewBox="0 0 800 600" className="absolute top-10 left-10 w-72 h-72">
          <path fill="#ffffff" d="M400,400Q350,500,250,500Q150,500,100,400Q50,300,100,200Q150,100,250,100Q350,100,400,200Q450,300,400,400Z" />
        </svg>
        <svg viewBox="0 0 600 600" className="absolute bottom-0 right-0 w-64 h-64">
          <circle cx="300" cy="300" r="200" fill="#ffffff" />
        </svg>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute top-20 left-20 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-40 w-12 h-12 bg-white/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 left-1/3 w-6 h-6 bg-purple-200/40 rounded-full animate-ping"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full shadow-lg transition transform hover:scale-105"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Form Card */}
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl p-10 w-full max-w-2xl z-10 transform transition-all duration-500">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="text-purple-500 mr-2" size={28} />
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            Faculty Feedback
          </h2>
        </div>

        <p className="text-center text-gray-600 mb-8">Help us improve our teaching quality by sharing your thoughts</p>

        {success ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Feedback Submitted!</h3>
            <p className="text-gray-600 mt-2">Thank you for your valuable input</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="e.g. Computer Science, Mathematics"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Rating</label>
              <div className="flex items-center justify-between bg-white rounded-xl border border-purple-300 p-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingSelect(rating.toString())}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${
                      formData.rating === rating.toString()
                        ? "bg-purple-500 text-white"
                        : "hover:bg-purple-100"
                    }`}
                  >
                    <Star
                      size={18}
                      className={formData.rating === rating.toString() ? "fill-white text-white" : "text-gray-400"}
                    />
                    <span className="text-xs mt-1">{rating}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Feedback Details</label>
                <span className={`text-xs ${characterCount > 200 ? "text-purple-600" : "text-gray-500"}`}>
                  {characterCount}/500
                </span>
              </div>
              <textarea
                name="description"
                placeholder="What did you like? What could be improved?"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                maxLength={500}
                className="w-full p-3 rounded-xl bg-white border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm resize-none placeholder-gray-400"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Division</label>
                <input
                  type="text"
                  name="studentDiv"
                  placeholder="e.g. A, B, C"
                  value={formData.studentDiv}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-white border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Year</label>
                <select
                  name="studentYear"
                  value={formData.studentYear}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-white border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-gray-700"
                >
                  <option value="" disabled>Select Year</option>
                  <option value="FE">First Year (FE)</option>
                  <option value="SE">Second Year (SE)</option>
                  <option value="TE">Third Year (TE)</option>
                  <option value="BE">Fourth Year (BE)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 flex items-center justify-center ${
                submitting ? "opacity-70 cursor-not-allowed" : "transform hover:scale-[1.02]"
              }`}
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;