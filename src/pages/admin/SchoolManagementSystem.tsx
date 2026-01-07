import React, { useState } from 'react';
import { School, Users, BookOpen, Calendar, FileText, Settings, X, Mail, Phone } from 'lucide-react';

interface PopupContent {
  name: string;
  id?: string;
  grade?: string;
  subject?: string;
  relation?: string;
  email: string;
  phone: string;
}

interface PopupData {
  title: string;
  content: PopupContent[];
}

const SchoolManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData] = useState<PopupData>({ title: '', content: [] });
  const [showStudentList, setShowStudentList] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(false);
  const [showParentList, setShowParentList] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);
  const [showParentDetails, setShowParentDetails] = useState(false);

  const handleTabClick = (tab: string) => {
    console.log('Tab clicked:', tab);
    setActiveTab(tab);
    
    // Reset all views when switching tabs
    setShowStudentDetails(false);
    setShowTeacherDetails(false);
    setShowParentDetails(false);
    setSelectedStudent(null);
    setSelectedTeacher(null);
    setSelectedParent(null);
    
    // For students tab, show student list directly instead of popup
    if (tab === 'students') {
      setShowStudentList(true);
      setShowTeacherList(false);
      setShowParentList(false);
      setShowPopup(false);
    } 
    // For teachers tab, show teacher list directly instead of popup
    else if (tab === 'teachers') {
      setShowTeacherList(true);
      setShowStudentList(false);
      setShowParentList(false);
      setShowPopup(false);
    } 
    // For parents tab, show parent list directly instead of popup
    else if (tab === 'parents') {
      setShowParentList(true);
      setShowStudentList(false);
      setShowTeacherList(false);
      setShowPopup(false);
    } 
    // For other tabs, hide all lists
    else {
      setShowStudentList(false);
      setShowTeacherList(false);
      setShowParentList(false);
      setShowPopup(false);
    }
  };


  const viewStudentDetails = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const viewTeacherDetails = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowTeacherDetails(true);
  };

  const viewParentDetails = (parent: any) => {
    setSelectedParent(parent);
    setShowParentDetails(true);
  };

  const closeStudentDetails = () => {
    setShowStudentDetails(false);
    setSelectedStudent(null);
  };

  const closeTeacherDetails = () => {
    setShowTeacherDetails(false);
    setSelectedTeacher(null);
  };

  const closeParentDetails = () => {
    setShowParentDetails(false);
    setSelectedParent(null);
  };

  // Force re-render when popup state changes
  React.useEffect(() => {
    console.log('Popup state changed:', showPopup);
  }, [showPopup]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-3">School Management System</h2>
          <p className="text-indigo-100 text-lg">Comprehensive platform for managing all aspects of your educational institution</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h4 className="text-blue-600 text-sm mb-1 font-semibold">Students Enrolled</h4>
            <p className="text-3xl font-bold mb-1">1,250+</p>
            <p className="text-green-600 text-xs font-semibold">↑ +12% from last year</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h4 className="text-green-600 text-sm mb-1 font-semibold">Teaching Staff</h4>
            <p className="text-3xl font-bold mb-1">85</p>
            <p className="text-green-600 text-xs font-semibold">Active faculty</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h4 className="text-purple-600 text-sm mb-1 font-semibold">Academic Programs</h4>
            <p className="text-3xl font-bold mb-1">24</p>
            <p className="text-purple-600 text-xs font-semibold">Active programs</p>
          </div>
        </div>
        
        {/* Tabs for Students, Teachers, Parents/Guardians */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => handleTabClick('students')}
            className={`px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
              activeTab === 'students' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-indigo-600'
            }`}
          >
            Students
          </button>
          <button 
            onClick={() => handleTabClick('teachers')}
            className={`px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
              activeTab === 'teachers' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-indigo-600'
            }`}
          >
            Teachers
          </button>
          <button 
            onClick={() => handleTabClick('parents')}
            className={`px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
              activeTab === 'parents' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-indigo-600'
            }`}
          >
            Parents/Guardians
          </button>
        </div>
      </div>

      {/* Parent Details Popup */}
      {showParentDetails && selectedParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ zIndex: 10000 }}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Parent/Guardian Details</h3>
              <button 
                onClick={closeParentDetails}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{selectedParent.name}</h4>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Relationship Information</h5>
                  <div className="space-y-2">
                    <p><span className="font-medium">Relation:</span> {selectedParent.relation}</p>
                    <p><span className="font-medium">Student:</span> {selectedParent.studentName || 'John Smith'}</p>
                    <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> {selectedParent.email}</p>
                    <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> {selectedParent.phone}</p>
                    <p><span className="font-medium">Address:</span> 123 Main St, City, State 12345</p>
                  </div>
                </div>
              </div>
              
              {/* Permissions & Access Section */}
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Permissions & Access</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>View Student Academic Records</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>View Grades & Assignments</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Attendance Tracking</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Communication with Teachers</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>School Event Notifications</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Early Pickup</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Student Information</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>John Smith - 10th Grade</span>
                    <span className="text-sm text-gray-500">Mathematics: A-, Science: B+</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Recent Attendance</span>
                    <span className="text-sm text-gray-500">98% (2 days absent)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Upcoming Conferences</span>
                    <span className="text-sm text-gray-500">Parent-Teacher: Nov 15</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={closeParentDetails}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 shadow-md"
                >
                  Edit Parent Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parent List - Shown directly when Parents tab is clicked */}
      {showParentList && !showParentDetails && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Parents/Guardians Directory</h3>
            <button 
              onClick={() => {
                setShowParentList(false);
                setActiveTab('dashboard');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left p-4 font-bold text-gray-700">Name</th>
                  <th className="text-left p-4 font-bold text-gray-700">Relation</th>
                  <th className="text-left p-4 font-bold text-gray-700">Student</th>
                  <th className="text-left p-4 font-bold text-gray-700">Email</th>
                  <th className="text-left p-4 font-bold text-gray-700">Phone</th>
                  <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Robert Smith', relation: 'Father', studentName: 'John Smith', email: 'robert.smith@email.com', phone: '(555) 789-0123' },
                  { name: 'Jennifer Johnson', relation: 'Mother', studentName: 'Emma Johnson', email: 'jennifer.johnson@email.com', phone: '(555) 890-1234' },
                  { name: 'David Brown', relation: 'Father', studentName: 'Michael Brown', email: 'david.brown@email.com', phone: '(555) 901-2345' },
                  { name: 'Sarah Wilson', relation: 'Mother', studentName: 'Sophia Williams', email: 'sarah.wilson@email.com', phone: '(555) 012-3456' },
                  { name: 'Michael Davis', relation: 'Guardian', studentName: 'Daniel Wilson', email: 'michael.davis@email.com', phone: '(555) 123-4567' }
                ].map((parent, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-bold text-gray-800">{parent.name}</td>
                    <td className="p-4 text-gray-600">{parent.relation}</td>
                    <td className="p-4 text-gray-600">{parent.studentName}</td>
                    <td className="p-4 text-gray-600">{parent.email}</td>
                    <td className="p-4 text-gray-600">{parent.phone}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => viewParentDetails(parent)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-600">Showing 5 parents/guardians</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Details Popup */}
      {showTeacherDetails && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ zIndex: 10000 }}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Teacher Details</h3>
              <button 
                onClick={closeTeacherDetails}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{selectedTeacher.name}</h4>
                  <p className="text-gray-600">Teacher ID: {selectedTeacher.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Professional Information</h5>
                  <div className="space-y-2">
                    <p><span className="font-medium">Subject:</span> {selectedTeacher.subject}</p>
                    <p><span className="font-medium">Department:</span> Academic</p>
                    <p><span className="font-medium">Years of Experience:</span> 8</p>
                    <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> {selectedTeacher.email}</p>
                    <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> {selectedTeacher.phone}</p>
                    <p><span className="font-medium">Office:</span> Room 205, Building B</p>
                  </div>
                </div>
              </div>
              
              {/* Permissions & Access Section */}
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Permissions & Access</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Access to Student Records</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Grade Entry & Management</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Attendance Tracking</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Communication with Parents</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Curriculum Planning</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Classes Taught</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Mathematics 101 - Period 1</span>
                    <span className="text-sm text-gray-500">Room 205</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Advanced Calculus - Period 3</span>
                    <span className="text-sm text-gray-500">Room 205</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Mathematics 102 - Period 5</span>
                    <span className="text-sm text-gray-500">Room 205</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={closeTeacherDetails}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 shadow-md"
                >
                  Edit Teacher Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher List - Shown directly when Teachers tab is clicked */}
      {showTeacherList && !showTeacherDetails && !showParentList && !showParentDetails && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Teacher Directory</h3>
            <button 
              onClick={() => {
                setShowTeacherList(false);
                setActiveTab('dashboard');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left p-4 font-bold text-gray-700">Name</th>
                  <th className="text-left p-4 font-bold text-gray-700">Teacher ID</th>
                  <th className="text-left p-4 font-bold text-gray-700">Subject</th>
                  <th className="text-left p-4 font-bold text-gray-700">Email</th>
                  <th className="text-left p-4 font-bold text-gray-700">Phone</th>
                  <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Dr. Sarah Wilson', id: 'T001', subject: 'Mathematics', email: 's.wilson@school.edu', phone: '(555) 456-7890' },
                  { name: 'Mr. James Davis', id: 'T002', subject: 'Science', email: 'j.davis@school.edu', phone: '(555) 567-8901' },
                  { name: 'Ms. Lisa Chen', id: 'T003', subject: 'English', email: 'l.chen@school.edu', phone: '(555) 678-9012' },
                  { name: 'Mr. Robert Johnson', id: 'T004', subject: 'History', email: 'r.johnson@school.edu', phone: '(555) 789-0123' },
                  { name: 'Dr. Emily Parker', id: 'T005', subject: 'Art', email: 'e.parker@school.edu', phone: '(555) 890-1234' }
                ].map((teacher, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-bold text-gray-800">{teacher.name}</td>
                    <td className="p-4 text-gray-600">{teacher.id}</td>
                    <td className="p-4 text-gray-600">{teacher.subject}</td>
                    <td className="p-4 text-gray-600">{teacher.email}</td>
                    <td className="p-4 text-gray-600">{teacher.phone}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => viewTeacherDetails(teacher)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-600">Showing 5 teachers</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Popup */}
      {showStudentDetails && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ zIndex: 10000 }}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Student Details</h3>
              <button 
                onClick={closeStudentDetails}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{selectedStudent.name}</h4>
                  <p className="text-gray-600">Student ID: {selectedStudent.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Academic Information</h5>
                  <div className="space-y-2">
                    <p><span className="font-medium">Grade:</span> {selectedStudent.grade}</p>
                    <p><span className="font-medium">Advisor:</span> Dr. Sarah Wilson</p>
                    <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="font-bold text-lg text-gray-800 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> {selectedStudent.email}</p>
                    <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> {selectedStudent.phone}</p>
                    <p><span className="font-medium">Address:</span> 123 Main St, City, State 12345</p>
                  </div>
                </div>
              </div>
              
              {/* Emergency Contacts Section */}
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Emergency Contacts</h5>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="font-medium">Primary Contact</p>
                    <p className="flex items-center"><Users className="h-4 w-4 mr-2 text-gray-400" /> Robert Smith (Father)</p>
                    <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> (555) 789-0123</p>
                    <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> robert.smith@email.com</p>
                    <p><span className="font-medium">Relationship:</span> Parent</p>
                  </div>
                  <div>
                    <p className="font-medium">Secondary Contact</p>
                    <p className="flex items-center"><Users className="h-4 w-4 mr-2 text-gray-400" /> Jennifer Smith (Mother)</p>
                    <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> (555) 890-1234</p>
                    <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> jennifer.smith@email.com</p>
                    <p><span className="font-medium">Relationship:</span> Parent</p>
                  </div>
                </div>
              </div>
              
              {/* Permissions & Access Section */}
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Permissions & Access</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Access to Academic Records</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>View Grades & Assignments</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Attendance Tracking</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Communication with Teachers</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>School Event Notifications</span>
                    <span className="text-sm text-green-600 font-medium">Full Access</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border border-gray-200 rounded-xl p-4">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Recent Activity</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Mathematics Assignment Submitted</span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Science Quiz Score: 92%</span>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span>Parent-Teacher Conference</span>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={closeStudentDetails}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 shadow-md"
                >
                  Edit Student Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student List - Shown directly when Students tab is clicked */}
      {showStudentList && !showStudentDetails && !showTeacherList && !showTeacherDetails && !showParentList && !showParentDetails && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Student Directory</h3>
            <button 
              onClick={() => {
                setShowStudentList(false);
                setActiveTab('dashboard');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left p-4 font-bold text-gray-700">Name</th>
                  <th className="text-left p-4 font-bold text-gray-700">Student ID</th>
                  <th className="text-left p-4 font-bold text-gray-700">Grade</th>
                  <th className="text-left p-4 font-bold text-gray-700">Email</th>
                  <th className="text-left p-4 font-bold text-gray-700">Phone</th>
                  <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Smith', id: 'S001', grade: '10th Grade', email: 'john.smith@school.edu', phone: '(555) 123-4567' },
                  { name: 'Emma Johnson', id: 'S002', grade: '9th Grade', email: 'emma.johnson@school.edu', phone: '(555) 234-5678' },
                  { name: 'Michael Brown', id: 'S003', grade: '11th Grade', email: 'michael.brown@school.edu', phone: '(555) 345-6789' },
                  { name: 'Sophia Williams', id: 'S004', grade: '12th Grade', email: 'sophia.williams@school.edu', phone: '(555) 456-7890' },
                  { name: 'Daniel Wilson', id: 'S005', grade: '9th Grade', email: 'daniel.wilson@school.edu', phone: '(555) 567-8901' }
                ].map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-bold text-gray-800">{student.name}</td>
                    <td className="p-4 text-gray-600">{student.id}</td>
                    <td className="p-4 text-gray-600">{student.grade}</td>
                    <td className="p-4 text-gray-600">{student.email}</td>
                    <td className="p-4 text-gray-600">{student.phone}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => viewStudentDetails(student)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-600">Showing 5 students</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Management Modules - Only shown when not viewing any list */}
      {!showStudentList && !showTeacherList && !showParentList && !showStudentDetails && !showTeacherDetails && !showParentDetails && (
        <>
          {/* Management Modules */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <School className="h-6 w-6 text-indigo-600" />
              </div>
              Management Modules
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Academic Management Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Academic Programs</h2>
                </div>
                <p className="text-gray-600 mb-4">Manage courses, curriculum, and academic standards.</p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  Manage Programs
                </button>
              </div>

              {/* Student Management Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-xl mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Student Records</h2>
                </div>
                <p className="text-gray-600 mb-4">View and manage student information and enrollment.</p>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  View Students
                </button>
              </div>

              {/* Staff Management Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Staff Directory</h2>
                </div>
                <p className="text-gray-600 mb-4">Manage faculty and staff information and assignments.</p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  View Staff
                </button>
              </div>

              {/* Schedule Management Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-xl mr-4">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Class Schedules</h2>
                </div>
                <p className="text-gray-600 mb-4">Create and manage class schedules and room assignments.</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  Manage Schedules
                </button>
              </div>

              {/* Reporting Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Reports</h2>
                </div>
                <p className="text-gray-600 mb-4">Generate academic and administrative reports.</p>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  View Reports
                </button>
              </div>

              {/* System Settings Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl mr-4">
                    <Settings className="h-6 w-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">System Settings</h2>
                </div>
                <p className="text-gray-600 mb-4">Configure system preferences and user permissions.</p>
                <button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white p-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all text-sm font-bold shadow-md hover:shadow-lg">
                  Configure
                </button>
              </div>
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">System Overview</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  The School Management System provides a comprehensive platform for managing all aspects of your educational institution. 
                  From student records to academic programs, our system streamlines administrative tasks and improves operational efficiency.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                    <div className="p-2 bg-blue-500 text-white rounded-lg mr-4">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Academic Excellence</h4>
                      <p className="text-sm text-gray-600">Streamlined curriculum management and assessment tools</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-xl border-2 border-green-100">
                    <div className="p-2 bg-green-500 text-white rounded-lg mr-4">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Student Success</h4>
                      <p className="text-sm text-gray-600">Comprehensive student tracking and support systems</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                    <div className="p-2 bg-purple-500 text-white rounded-lg mr-4">
                      <Settings className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Efficient Operations</h4>
                      <p className="text-sm text-gray-600">Automated administrative workflows and reporting</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100">
                <h4 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white text-indigo-600 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all font-medium text-sm">
                    Add New Student
                  </button>
                  <button className="bg-white text-indigo-600 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all font-medium text-sm">
                    Create Class
                  </button>
                  <button className="bg-white text-indigo-600 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all font-medium text-sm">
                    Generate Report
                  </button>
                  <button className="bg-white text-indigo-600 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all font-medium text-sm">
                    System Settings
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-xl border-2 border-green-200">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-bold text-green-700 text-sm">System Status: Operational</span>
                  </div>
                  <p className="text-xs text-gray-600">All systems are running normally. Last backup: Today at 2:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Popup Modal - No longer used for any tab but keeping for backward compatibility */}
      {showPopup && !showStudentList && !showTeacherList && !showParentList && !showStudentDetails && !showTeacherDetails && !showParentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ zIndex: 10000 }}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">{popupData.title}</h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {popupData.content.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                    <div className="mt-2 space-y-1">
                      {item.id && <p className="text-gray-600"><span className="font-medium">ID:</span> {item.id}</p>}
                      {item.grade && <p className="text-gray-600"><span className="font-medium">Grade:</span> {item.grade}</p>}
                      {item.subject && <p className="text-gray-600"><span className="font-medium">Subject:</span> {item.subject}</p>}
                      {item.relation && <p className="text-gray-600"><span className="font-medium">Relation:</span> {item.relation}</p>}
                      <p className="text-gray-600 flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-400" /> {item.email}</p>
                      <p className="text-gray-600 flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400" /> {item.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 shadow-md"
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagementSystem;