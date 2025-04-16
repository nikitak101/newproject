import React, { useState } from "react";

export default function FacultyHelpPage() {
  const [activeTab, setActiveTab] = useState("upload-assignments");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I edit an assignment after uploading?",
      answer: "Yes, you can edit or delete assignments before the deadline. Simply go to 'My Assignments' and click the edit icon next to the assignment you wish to modify."
    },
    {
      question: "Where do I check uploaded attendance?",
      answer: "Navigate to the 'Attendance History' section from the sidebar menu. There you can filter by date, class, or subject to review past attendance records."
    },
    {
      question: "Can I schedule notices in advance?",
      answer: "Currently, notices post immediately. However, we're working on adding scheduled posting in our next update."
    },
    {
      question: "How do I download student submissions?",
      answer: "Go to the specific assignment, click 'View Submissions', then use the download button next to each student's submission or use 'Download All' to get a ZIP file."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-200 to-pink-100 min-h-screen p-8 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with improved styling */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white">
          <h1 className="text-4xl font-bold text-center mb-2">EduKita Faculty Help Center</h1>
          <p className="text-center text-white opacity-90">Your guide to using the faculty portal efficiently</p>
        </div>

        {/* Quick Navigation Tabs */}
        <div className="flex overflow-x-auto p-2 bg-purple-50 border-b border-purple-100">
          {[
            { id: "upload-assignments", name: "📁 Assignments" },
            { id: "upload-attendance", name: "📊 Attendance" },
            { id: "view-schedule", name: "🗓️ Schedule" },
            { id: "post-notices", name: "📢 Notices" },
            { id: "faqs", name: "❓ FAQs" },
            { id: "contact", name: "📬 Support" }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 whitespace-nowrap mx-1 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white text-purple-700 hover:bg-purple-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-10">
          {/* Content area */}
          <div className={`${activeTab === "upload-assignments" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">📁</span>
              Upload Assignments
            </h2>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">Step-by-Step Guide</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</span>
                  <div>
                    <p className="font-medium">Go to the "Assignments" section from the sidebar menu.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</span>
                  <div>
                    <p className="font-medium">Click <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Upload Assignment</span> button at the top right.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</span>
                  <div>
                    <p className="font-medium">Fill in all required fields:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
                      <li>Assignment title</li>
                      <li>Detailed description and instructions</li>
                      <li>Submission deadline (date and time)</li>
                      <li>Select target class year and division</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</span>
                  <div>
                    <p className="font-medium">Attach any necessary files (PDF, DOC, PPTX).</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">5</span>
                  <div>
                    <p className="font-medium">Click <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Submit</span> to publish the assignment.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-400">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Set deadlines that give students adequate time for quality submissions</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Use the formatting options to make your instructions clear and organized</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Enable the "Allow Late Submissions" option if you want to accept work after the deadline</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${activeTab === "upload-attendance" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">📊</span>
              Upload Attendance
            </h2>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">Step-by-Step Guide</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</span>
                  <div>
                    <p className="font-medium">Navigate to the "Attendance" tab in the sidebar.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</span>
                  <div>
                    <p className="font-medium">Select the date, subject, and division/year from the dropdown menus.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</span>
                  <div>
                    <p className="font-medium">Mark each student as Present, Absent, or Excused.</p>
                    <p className="text-gray-600 text-sm mt-1">You can use the bulk actions to mark all students at once.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</span>
                  <div>
                    <p className="font-medium">Click <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Upload</span> to save the attendance record.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-400">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Use the "Quick Mark" feature to speed up attendance for large classes</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Past attendance records can be updated within 7 days</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Download attendance reports from the "Reports" section for parent-teacher meetings</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${activeTab === "view-schedule" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">🗓️</span>
              View Schedule
            </h2>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">How to Access Your Schedule</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</span>
                  <div>
                    <p className="font-medium">Go to the "Schedule" section in the sidebar menu.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</span>
                  <div>
                    <p className="font-medium">Toggle between day view or week view using the buttons at the top.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</span>
                  <div>
                    <p className="font-medium">View your assigned subjects, time slots, and classroom locations.</p>
                    <p className="text-gray-600 text-sm mt-1">Classes are color-coded by subject for easy identification.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-400">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">Important Notes</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Your schedule is updated by the coordinator and syncs with the master timetable</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Use the calendar integration to sync with Google Calendar or Outlook</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>You'll receive notifications for any schedule changes</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${activeTab === "post-notices" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">📢</span>
              Post Notices
            </h2>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">Creating and Posting Notices</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</span>
                  <div>
                    <p className="font-medium">Open the "Notices" tab from the sidebar menu.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</span>
                  <div>
                    <p className="font-medium">Click the <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">New Notice</span> button.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</span>
                  <div>
                    <p className="font-medium">Fill in the required information:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
                      <li>Notice title</li>
                      <li>Detailed content</li>
                      <li>Select target audience (specific class, multiple classes, or all students)</li>
                      <li>Set priority level (normal, important, urgent)</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</span>
                  <div>
                    <p className="font-medium">Click <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Post</span> to publish immediately.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-400">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Use the formatting tools to make important information stand out</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>Notices marked as "Urgent" will trigger push notifications to the students' app</p>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <p>You can attach PDFs or images to your notices when needed</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${activeTab === "faqs" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">❓</span>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-purple-200 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 transition-colors flex justify-between items-center font-medium"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-purple-700">
                      {expandedFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="p-4 bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`${activeTab === "contact" ? "block" : "hidden"}`}>
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3">📬</span>
              Need Help?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">Contact Support</h3>
                <p className="mb-4">Our support team is available Monday-Friday, 8AM-6PM</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-purple-600 mr-2">📧</span>
                    <span>Email: </span>
                    <a className="text-pink-600 underline ml-1" href="mailto:support@edukita.app">support@edukita.app</a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-600 mr-2">📞</span>
                    <span>Phone: </span>
                    <a className="text-pink-600 underline ml-1" href="tel:+1234567890">123-456-7890</a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-pink-700 mb-4">Get Immediate Help</h3>
                <p className="mb-4">Use these options for faster assistance:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 mt-1">🔍</span>
                    <div>
                      <p>Check our <a className="text-pink-600 underline" href="#">Knowledge Base</a> for tutorials and guides</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 mt-1">💬</span>
                    <div>
                      <p>Use the live chat feature in the bottom right corner of any page</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 mt-1">🎫</span>
                    <div>
                      <p>Click the "Help" button in the sidebar to raise a support ticket</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-purple-50 p-6 text-center">
          <p className="text-purple-700">EduKita Faculty Portal © 2025 - Version 2.4.1</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a className="text-pink-600 hover:text-pink-800" href="#">Terms of Use</a>
            <a className="text-pink-600 hover:text-pink-800" href="#">Privacy Policy</a>
            <a className="text-pink-600 hover:text-pink-800" href="#">Training Videos</a>
          </div>
        </div>
      </div>
    </div>
  );
}