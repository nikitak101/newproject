import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages & Components
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Assignments from './components/Assignments';
import UploadAssignment from './components/UploadAssignment';
import PostNotice from './components/PostNotice';
import ViewNotices from './components/ViewNotices';
import UploadAttendance from './components/UploadAttendance';
import ViewAttendance from './components/ViewAttendance';
import LeaveApplication from './components/LeaveApplication';
import LeaveApproval from './components/LeaveApproval';
import CoordinatorDashboard from './components/CoordinatorDashboard';
import LeaveStatus from './components/LeaveStatus';
import NotFound from './pages/NotFound';
import FeedbackForm from './components/FeedbackForm'; // ✅ Newly added
import CoordinatorBoard from './components/CoordinatorBoard'; // ✅ Import it
import FeedbackList from "./components/FeedbackList"; // adjust path as needed
import FeedbackAnalysis from "./components/FeedbackAnalysis"; // adjust path as needed
import LeaveAnalytics from "./components/LeaveAnalytics";
import FacultyHelpPage from './components/FacultyHelpPage'; // Adjust path as needed
import FacultySettingsPage from "./components/FacultySettingsPage";
import FacultyMessagePage from "./components/FacultyMessagePage"; // adjust path if needed
import FacultySchedulePage from "./components/FacultySchedulePage"; // update the path
import FacultyPerformanceReport from "./components/FacultyPerformanceReport";




function App() {
  return (
    <div className="min-h-screen bg-light font-poppins text-gray-800">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🎓 Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/view-notices" element={<ViewNotices />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/leave-status" element={<LeaveStatus />} />
       
        {/* ✅ Feedback Route */}
        <Route path="/feedback" element={<FeedbackForm />} />

        {/* 👨‍🏫 Faculty Routes */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/upload-assignments" element={<UploadAssignment />} />
        <Route path="/post-notice" element={<PostNotice />} />
        <Route path="/upload-attendance" element={<UploadAttendance />} />
        <Route path="/faculty-help" element={<FacultyHelpPage />} /> 
        <Route path="/faculty-message" element={<FacultyMessagePage />} />
        <Route path="/faculty-settings" element={<FacultySettingsPage />} />
        <Route path="/faculty-schedule" element={<FacultySchedulePage />} />
        <Route path="/faculty-performance" element={<FacultyPerformanceReport/>}/>



        {/* 📋 Coordinator Routes */}
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/coordinator-board" element={<CoordinatorBoard />} /> // ✅ Add this line
        <Route path="/view-feedback" element={<FeedbackList />} />
        <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />
        <Route path="/leave-approval" element={<LeaveApproval />} />
        <Route path="/analytics" element={<LeaveAnalytics />} />


        {/* ❌ Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
