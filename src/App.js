import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Assignments from './components/Assignments';
import UploadAssignment from './components/UploadAssignment';
import PostNotice from './components/PostNotice'; // ✅ Faculty posts notice
import ViewNotices from './components/ViewNotices'; // ✅ Students view notices
import UploadAttendance from './components/UploadAttendance'; // ✅ Faculty uploads attendance
import ViewAttendance from './components/ViewAttendance'; // ✅ Students view attendance
import LeaveForm from './components/LeaveForm'; // ✅ Student submits leave form
import LeaveApproval from './components/LeaveApproval'; // ✅ Student views leave status
import CoordinatorDashboard from './components/CoordinatorDashboard'; // ✅ Class Coordinator manages leave
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/upload-assignments" element={<UploadAssignment />} />

      {/* ✅ Notice Routes */}
      <Route path="/post-notice" element={<PostNotice />} />
      <Route path="/view-notices" element={<ViewNotices />} />

      {/* ✅ Attendance Routes */}
      <Route path="/upload-attendance" element={<UploadAttendance />} />
      <Route path="/view-attendance" element={<ViewAttendance />} />

      {/* ✅ Leave Management Routes */}
      <Route path="/leave-form" element={<LeaveForm />} /> 
      <Route path="/leave-approval" element={<LeaveApproval />} /> 
      <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
