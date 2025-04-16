import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

export default function FacultySchedulePage() {
  const scheduleData = [
    { id: 1, day: "Monday", subject: "Computer Networks", time: "9:00 AM - 10:30 AM", division: "SE-A", room: "204", status: "upcoming" },
    { id: 2, day: "Monday", subject: "Data Structures", time: "11:00 AM - 12:30 PM", division: "FE-B", room: "301", status: "upcoming" },
    { id: 3, day: "Tuesday", subject: "Database Management Systems", time: "10:00 AM - 11:30 AM", division: "SE-B", room: "105", status: "upcoming" },
    { id: 4, day: "Tuesday", subject: "Advanced Algorithms", time: "2:00 PM - 3:30 PM", division: "TE-A", room: "207", status: "upcoming" },
    { id: 5, day: "Wednesday", subject: "Computer Networks Lab", time: "9:00 AM - 11:00 AM", division: "SE-A", room: "Lab 3", status: "upcoming" },
    { id: 6, day: "Wednesday", subject: "Project Guidance", time: "1:00 PM - 3:00 PM", division: "BE-C", room: "402", status: "cancelled" },
    { id: 7, day: "Thursday", subject: "Data Structures Tutorial", time: "11:00 AM - 12:00 PM", division: "FE-B", room: "301", status: "upcoming" },
    { id: 8, day: "Friday", subject: "Research Mentoring", time: "3:00 PM - 4:30 PM", division: "ME Students", room: "Research Lab", status: "upcoming" },
  ];

  const [activeDay, setActiveDay] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("week");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Get current date info
  const today = new Date();
  const currentDay = days[today.getDay() === 0 ? 6 : today.getDay() - 1];

  useEffect(() => {
    // Set current day as active on initial load
    setActiveDay(currentDay);
  }, []);

  const filteredSchedule = scheduleData.filter(entry => {
    const matchesDay = activeDay === "all" || entry.day === activeDay;
    const matchesSearch = entry.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    return matchesDay && matchesSearch && matchesStatus;
  });

  // Sort function
  const sortedData = [...filteredSchedule].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Day", "Subject", "Time", "Division", "Room", "Status"];
    const tableRows = sortedData.map(item => [
      item.day, item.subject, item.time, item.division, item.room, 
      item.status.charAt(0).toUpperCase() + item.status.slice(1)
    ]);
    
    doc.setTextColor(128, 0, 128); // Purple color for title
    doc.setFontSize(18);
    doc.text("Faculty Schedule", 14, 15);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    if (activeDay !== "all") {
      doc.text(`Day: ${activeDay}`, 14, 22);
    }
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: activeDay !== "all" ? 25 : 20,
      styles: { fillColor: [245, 240, 250] },
      headStyles: { fillColor: [128, 0, 128] },
      alternateRowStyles: { fillColor: [252, 240, 252] },
      rowStyles: tableRows.map((_, i) => 
        sortedData[i].status === "cancelled" ? { fillColor: [255, 200, 200] } : {}
      )
    });
    
    doc.save("faculty_schedule.pdf");
  };

  const csvData = sortedData.map(item => ({
    Day: item.day,
    Subject: item.subject,
    Time: item.time,
    Division: item.division,
    Room: item.room,
    Status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
  }));

  const viewDetails = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSchedule(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderViewToggle = () => (
    <div className="mb-4">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          onClick={() => setViewMode("day")}
          className={`px-4 py-2 border ${viewMode === "day" ? "bg-purple-500 text-white" : "bg-white text-purple-500"} border-purple-500 rounded-l-md hover:bg-purple-100`}
        >
          Day
        </button>
        <button
          onClick={() => setViewMode("week")}
          className={`px-4 py-2 border ${viewMode === "week" ? "bg-purple-500 text-white" : "bg-white text-purple-500"} border-purple-500 hover:bg-purple-100`}
        >
          Week
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 border ${viewMode === "list" ? "bg-purple-500 text-white" : "bg-white text-purple-500"} border-purple-500 rounded-r-md hover:bg-purple-100`}
        >
          List
        </button>
      </div>
    </div>
  );
  
  const renderDaySelector = () => (
    <div className="mb-4 overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        <button
          onClick={() => setActiveDay("all")}
          className={`px-4 py-2 rounded ${activeDay === "all" ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-800"} hover:bg-purple-300`}
        >
          All Days
        </button>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded ${activeDay === day ? "bg-purple-500 text-white" : day === currentDay ? "bg-pink-200 text-purple-800" : "bg-purple-100 text-purple-800"} hover:bg-purple-300`}
          >
            {day}
            {day === currentDay && <span className="ml-1 text-xs">• Today</span>}
          </button>
        ))}
      </div>
    </div>
  );

  const renderScheduleTable = () => (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('day')}>
              Day {getSortIndicator('day')}
            </th>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('subject')}>
              Subject {getSortIndicator('subject')}
            </th>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('time')}>
              Time {getSortIndicator('time')}
            </th>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('division')}>
              Division {getSortIndicator('division')}
            </th>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('room')}>
              Room {getSortIndicator('room')}
            </th>
            <th className="px-4 py-3 cursor-pointer hover:bg-purple-700" onClick={() => requestSort('status')}>
              Status {getSortIndicator('status')}
            </th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((entry) => (
              <tr key={entry.id} className={`border-b hover:bg-purple-50 ${entry.status === "cancelled" ? "bg-red-50" : ""}`}>
                <td className="px-4 py-3">{entry.day}</td>
                <td className="px-4 py-3 font-medium">{entry.subject}</td>
                <td className="px-4 py-3">{entry.time}</td>
                <td className="px-4 py-3">{entry.division}</td>
                <td className="px-4 py-3">{entry.room}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => viewDetails(entry)}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                No schedule entries found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderCalendarView = () => {
    if (viewMode === "day") {
      return (
        <div className="grid grid-cols-1 gap-4">
          {sortedData.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg shadow ${entry.status === "cancelled" ? "bg-red-50 border-l-4 border-red-400" : "bg-white border-l-4 border-purple-400"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-purple-800">{entry.subject}</h3>
                  <p className="text-gray-600">{entry.time}</p>
                  <div className="mt-2">
                    <span className="mr-4"><span className="font-medium">Division:</span> {entry.division}</span>
                    <span><span className="font-medium">Room:</span> {entry.room}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => viewDetails(entry)}
                className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      );
    }

    return renderScheduleTable();
  };

  // Detail Modal
  const renderModal = () => {
    if (!showModal || !selectedSchedule) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-purple-800">{selectedSchedule.subject}</h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">Day & Time</p>
              <p className="font-medium">{selectedSchedule.day}, {selectedSchedule.time}</p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">Room {selectedSchedule.room}</p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">Student Group</p>
              <p className="font-medium">{selectedSchedule.division}</p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`font-medium ${selectedSchedule.status === "cancelled" ? "text-red-600" : "text-green-600"}`}>
                {selectedSchedule.status.charAt(0).toUpperCase() + selectedSchedule.status.slice(1)}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
            >
              Close
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Edit Schedule
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-800">Faculty Teaching Schedule</h1>
          <p className="text-gray-600">Manage your weekly teaching commitments</p>
        </div>
  
        {/* Filters and Actions */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search subjects, divisions or rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-purple-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-purple-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
  
            <div className="flex gap-2">
              {/* PDF Download Button */}
              <button 
                onClick={downloadPDF} 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
  
              {/* CSV Download Button */}
              <CSVLink
                data={filteredSchedule}
                filename={"faculty_schedule.csv"}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                CSV
              </CSVLink>
  
              {/* Add Button */}
              <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add
              </button>
            </div>
          </div>
  
          {/* View Toggle and Day Selector */}
          {renderViewToggle()}
          {renderDaySelector()}
        </div>
  
        {/* Schedule Content */}
        <div className="bg-white p-4 rounded-lg shadow">
          {renderCalendarView()}
  
          {/* Summary */}
          <div className="mt-6 flex flex-wrap gap-4">
            {/* Total Classes */}
            <div className="bg-purple-50 p-3 rounded flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                {sortedData.length}
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Classes</p>
                <p className="font-medium text-purple-800">This {viewMode}</p>
              </div>
            </div>
  
            {/* Cancelled */}
            <div className="bg-red-50 p-3 rounded flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                {sortedData.filter(item => item.status === "cancelled").length}
              </div>
              <div>
                <p className="text-xs text-gray-500">Cancelled</p>
                <p className="font-medium text-red-800">Classes</p>
              </div>
            </div>
  
            {/* Upcoming */}
            <div className="bg-green-50 p-3 rounded flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                {sortedData.filter(item => item.status === "upcoming").length}
              </div>
              <div>
                <p className="text-xs text-gray-500">Upcoming</p>
                <p className="font-medium text-green-800">Classes</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal */}
        {renderModal()}
      </div>
    </div>
    
  );
}
  