import React, { useState } from "react";

export default function FacultySettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen p-8 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with subtle animation */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
          <h1 className="text-4xl font-bold text-center">⚙️ Faculty Settings</h1>
          <p className="text-center mt-2 opacity-90">Personalize your teaching experience</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {["profile", "notifications", "theme", "security", "support"].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "text-purple-700 border-b-2 border-purple-700 bg-white"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile" && "👤 Profile"}
              {tab === "notifications" && "🔔 Notifications"}
              {tab === "theme" && "🎨 Theme"}
              {tab === "security" && "🔒 Security"}
              {tab === "support" && "📬 Support"}
            </button>
          ))}
        </div>
        
        <div className="p-10">
          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="flex items-start gap-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 relative group">
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
                    <span className="text-white opacity-0 group-hover:opacity-100">Change Photo</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-6">Profile Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="Dr. Jane Smith" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="Computer Science" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="j.smith@university.edu" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab Content */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Assignment Submissions</h3>
                    <p className="text-sm text-gray-600">Receive notifications when students submit assignments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Student Messages</h3>
                    <p className="text-sm text-gray-600">Get notified when students send you direct messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Attendance Updates</h3>
                    <p className="text-sm text-gray-600">Notifications regarding attendance irregularities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">System Announcements</h3>
                    <p className="text-sm text-gray-600">Important updates about the platform</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Save Preferences</button>
              </div>
            </div>
          )}
          
          {/* Theme Tab Content */}
          {activeTab === "theme" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Theme & Appearance</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Color Mode</h3>
                  <div className="flex gap-4">
                    <div className="border-2 border-purple-500 p-4 rounded-lg flex flex-col items-center">
                      <div className="h-16 w-24 bg-white border border-gray-200 mb-2 rounded"></div>
                      <p className="font-medium">Light Mode</p>
                    </div>
                    <div className="border-2 border-gray-200 p-4 rounded-lg flex flex-col items-center">
                      <div className="h-16 w-24 bg-gray-800 border border-gray-700 mb-2 rounded"></div>
                      <p className="font-medium">Dark Mode</p>
                    </div>
                    <div className="border-2 border-gray-200 p-4 rounded-lg flex flex-col items-center">
                      <div className="h-16 w-24 bg-gradient-to-r from-gray-100 to-gray-800 mb-2 rounded"></div>
                      <p className="font-medium">System Default</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Font Size</h3>
                  <div className="w-full max-w-md">
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      defaultValue="3" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Layout Density</h3>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Compact</button>
                    <button className="px-4 py-2 border border-purple-500 bg-purple-50 text-purple-700 rounded-lg">Standard</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Comfortable</button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Apply Changes</button>
              </div>
            </div>
          )}
          
          {/* Security Tab Content */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Update Password</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Not Enabled</span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Set Up 2FA</button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Recent Login Activity</h3>
                  <p className="text-gray-600 mb-4">Monitor recent access to your account</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <p className="font-medium">Today, 9:45 AM</p>
                        <p className="text-sm text-gray-600">Chrome • Windows • New York, USA</p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <p className="font-medium">Yesterday, 4:30 PM</p>
                        <p className="text-sm text-gray-600">Safari • MacOS • Chicago, USA</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">April 7, 2025, 10:15 AM</p>
                        <p className="text-sm text-gray-600">Edge • Windows • Boston, USA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Support Tab Content */}
          {activeTab === "support" && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Support & Help</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                  <p className="mb-4">Need assistance? Our support team is ready to help.</p>
                  <a href="mailto:support@edukita.app" className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">Email Support</a>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Knowledge Base</h3>
                  <p className="mb-4">Browse our collection of guides and tutorials.</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors duration-200">View Articles</button>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium mb-2">How do I reset my password?</h4>
                    <p className="text-gray-600">Go to the login page and click "Forgot Password". Follow the instructions sent to your email.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium mb-2">Can I change my email address?</h4>
                    <p className="text-gray-600">Yes, you can update your email in the Profile section. Verification may be required.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">How do I manage course materials?</h4>
                    <p className="text-gray-600">Navigate to the Courses section, select your course, and use the Materials tab to upload and organize content.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t border-gray-200">
          <p>© 2025 EduKita • Version 2.3.0</p>
        </div>
      </div>
    </div>
  );
}