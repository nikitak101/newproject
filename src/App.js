import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Assignments from './components/Assignments';
import UploadAssignment from './components/UploadAssignment';
import AddNotice from './components/AddNotice'; // ✅ Import AddNotice component
import Notices from './components/Notices'; // ✅ Import Notices component
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
      
      {/* ✅ Add Notice Routes */}
      <Route path="/upload-notice" element={<AddNotice />} />
      <Route path="/notices" element={<Notices />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
