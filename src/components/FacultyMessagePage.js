import React, { useState, useEffect } from "react";

export default function FacultyMessagePage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("direct");
  const [isImportant, setIsImportant] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: "Assignment Reminder", subject: "Reminder: Assignment Due Soon", body: "Dear student,\n\nThis is a friendly reminder that your assignment is due on [DATE].\n\nRegards,\nProfessor [YOUR NAME]" },
    { id: 2, name: "Absence Notification", subject: "Regarding Your Recent Absence", body: "Dear student,\n\nI noticed you've been absent from several recent classes. Is everything alright?\n\nRegards,\nProfessor [YOUR NAME]" },
    { id: 3, name: "Office Hours", subject: "Office Hours This Week", body: "Dear students,\n\nMy office hours this week will be on [DAY] from [TIME] to [TIME] in [LOCATION].\n\nRegards,\nProfessor [YOUR NAME]" }
  ]);
  const [activeTab, setActiveTab] = useState("compose");

  useEffect(() => {
    // Simulated data - in a real app, this would come from an API
    setRecentContacts([
      { id: 1, name: "Alice Johnson", email: "alice.j@student.edu", type: "Student" },
      { id: 2, name: "Bob Smith", email: "bsmith@student.edu", type: "Student" },
      { id: 3, name: "Finance Department", email: "finance@university.edu", type: "Department" },
      { id: 4, name: "CS101 Class", email: "cs101@lists.university.edu", type: "Class" }
    ]);
  }, []);

  const handleSend = () => {
    if (to && subject && message) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessMessage(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setTo("");
          setSubject("");
          setMessage("");
          setIsImportant(false);
          setAttachments([]);
          setShowSuccessMessage(false);
        }, 2000);
      }, 1000);
    } else {
      // Show error for missing fields
      if (!to) document.getElementById("to-field").focus();
      else if (!subject) document.getElementById("subject-field").focus();
      else document.getElementById("message-field").focus();
    }
  };

  const handleSaveDraft = () => {
    if (to || subject || message) {
      setIsDraft(true);
      setTimeout(() => {
        setIsDraft(false);
      }, 2000);
    }
  };

  const handleAttachment = (e) => {
    if (e.target.files[0]) {
      setAttachments([...attachments, e.target.files[0].name]);
    }
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const applyTemplate = (template) => {
    setSubject(template.subject);
    setMessage(template.body);
  };

  const selectContact = (contact) => {
    setTo(contact.email);
  };

  return (
    <div className="bg-gradient-to-br from-purple-200 to-pink-100 min-h-screen p-4 md:p-8 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Faculty Message Center</h1>
          <p className="text-center opacity-90">Communicate effectively with students and staff</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-purple-50">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === "compose" ? "bg-white border-t-2 border-purple-600" : "text-gray-600 hover:bg-purple-100"}`}
            onClick={() => setActiveTab("compose")}
          >
            ✉️ Compose
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === "templates" ? "bg-white border-t-2 border-purple-600" : "text-gray-600 hover:bg-purple-100"}`}
            onClick={() => setActiveTab("templates")}
          >
            📋 Templates
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === "contacts" ? "bg-white border-t-2 border-purple-600" : "text-gray-600 hover:bg-purple-100"}`}
            onClick={() => setActiveTab("contacts")}
          >
            👥 Contacts
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-10">
          {/* Compose Tab */}
          {activeTab === "compose" && (
            <div className="space-y-6">
              {/* Message Type Selector */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${messageType === "direct" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"}`}
                  onClick={() => setMessageType("direct")}
                >
                  <span className="mr-2">👤</span> Direct Message
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${messageType === "class" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"}`}
                  onClick={() => setMessageType("class")}
                >
                  <span className="mr-2">👨‍👩‍👧‍👦</span> Class Message
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${messageType === "department" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"}`}
                  onClick={() => setMessageType("department")}
                >
                  <span className="mr-2">🏢</span> Department
                </button>
              </div>

              {/* To Field */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">To {messageType === "direct" ? "(Email or Name)" : messageType === "class" ? "(Select Class)" : "(Select Department)"}</label>
                <div className="relative">
                  <input
                    id="to-field"
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={messageType === "direct" ? "student@example.com" : messageType === "class" ? "e.g. Computer Science 101" : "e.g. Academic Affairs"}
                  />
                  {messageType !== "direct" && (
                    <div className="absolute right-2 top-3">
                      <button className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                        Browse...
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Subject</label>
                <div className="flex gap-2">
                  <input
                    id="subject-field"
                    type="text"
                    className="flex-grow p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Project Update"
                  />
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="important" 
                      className="w-4 h-4 text-purple-600"
                      checked={isImportant}
                      onChange={(e) => setIsImportant(e.target.checked)}
                    />
                    <label htmlFor="important" className="ml-2 text-sm font-medium text-gray-700">Mark as Important</label>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Message</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Simple formatting toolbar */}
                  <div className="flex gap-2 p-2 bg-gray-50 border-b border-gray-300">
                    <button className="p-1 hover:bg-gray-200 rounded" title="Bold">
                      <strong>B</strong>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded" title="Italic">
                      <em>I</em>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded" title="Underline">
                      <u>U</u>
                    </button>
                    <span className="border-r border-gray-300 mx-1"></span>
                    <button className="p-1 hover:bg-gray-200 rounded" title="Bullet List">
                      •
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded" title="Numbered List">
                      1.
                    </button>
                  </div>
                  <textarea
                    id="message-field"
                    className="w-full p-3 border-none focus:ring-0"
                    rows="8"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Attachments</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="attachment"
                    className="hidden"
                    onChange={handleAttachment}
                  />
                  <label
                    htmlFor="attachment"
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-200"
                  >
                    📎 Add Attachment
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {attachments.length > 0 ? `${attachments.length} file(s) attached` : "No files attached"}
                  </span>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                        <span className="text-sm">{file}</span>
                        <button
                          className="ml-2 text-gray-500 hover:text-red-500"
                          onClick={() => removeAttachment(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition flex-grow md:flex-grow-0 font-medium flex items-center justify-center"
                  onClick={handleSend}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span className="mr-2">📤</span> Send Message
                    </>
                  )}
                </button>
                <button
                  className="border border-purple-400 text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-50 transition"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </button>
              </div>

              {/* Success Message */}
              {showSuccessMessage && (
                <div className="mt-4 bg-green-100 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-green-500">✅</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-green-700">
                        Message sent successfully!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Draft Message */}
              {isDraft && (
                <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-blue-500">📋</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-blue-700">
                        Draft saved successfully!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Message Templates</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    <p className="text-gray-500 mb-2">Subject: {template.subject}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.body}</p>
                    <button 
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200"
                      onClick={() => {
                        applyTemplate(template);
                        setActiveTab("compose");
                      }}
                    >
                      Use Template
                    </button>
                  </div>
                ))}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center hover:border-purple-400 transition cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl text-purple-400 mb-2">+</div>
                    <p className="text-purple-600">Create New Template</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Contacts</h2>
              
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300"
                  placeholder="Search contacts..."
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600">Recent Contacts</h3>
                  <div className="space-y-2">
                    {recentContacts.map(contact => (
                      <div 
                        key={contact.id} 
                        className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition"
                        onClick={() => {
                          selectContact(contact);
                          setActiveTab("compose");
                        }}
                      >
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                        <div className="text-xs mt-1 inline-block bg-gray-100 px-2 py-1 rounded-full">{contact.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600">Classes</h3>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Computer Science 101</div>
                      <div className="text-sm text-gray-500">34 students</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Data Structures</div>
                      <div className="text-sm text-gray-500">28 students</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Software Engineering</div>
                      <div className="text-sm text-gray-500">42 students</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600">Departments</h3>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Computer Science Department</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Finance Office</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition">
                      <div className="font-medium">Student Affairs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-purple-50 p-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Messages sent through this system are logged for administrative purposes.
            <a href="#" className="text-purple-600 ml-1 hover:underline">View message policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}