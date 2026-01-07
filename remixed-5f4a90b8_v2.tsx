import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Camera, 
  Calendar, 
  ClipboardCheck, 
  Bell, 
  Settings, 
  Search, 
  UserCheck, 
  Clock, 
  MapPin, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Mail,
  Badge,
  Scan,
  UserPlus,
  Activity,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';

const SchoolSafetySystem = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [visitorCount, setVisitorCount] = useState(42);
  const [activeAlerts, setActiveAlerts] = useState(0);
  
  // Security Screening States
  const [screeningActive, setScreeningActive] = useState(false);
  const [screeningStep, setScreeningStep] = useState('scan');
  const [scannedData, setScannedData] = useState(null);
  const [screeningResults, setScreeningResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watchlistEntries, setWatchlistEntries] = useState([
    { id: 1, name: 'John Doe', reason: 'Banned - Disruptive Behavior', category: 'banned', dateAdded: '2024-01-15' },
    { id: 2, name: 'Jane Smith', reason: 'Restraining Order', category: 'restraining', dateAdded: '2024-02-08' },
    { id: 3, name: 'Mike Johnson', reason: 'Flagged Guardian - Custody Issues', category: 'flagged', dateAdded: '2024-03-12' }
  ]);
  const [newWatchlistEntry, setNewWatchlistEntry] = useState({ name: '', reason: '', category: 'banned' });
  const [showWatchlistForm, setShowWatchlistForm] = useState(false);

  // Volunteer Management States
  const [volunteers, setVolunteers] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      role: 'Library Assistant', 
      status: 'active', 
      backgroundCheck: 'completed',
      backgroundCheckDate: '2024-01-15',
      hoursThisMonth: 42,
      totalHours: 278,
      joinDate: '2023-09-01',
      lastVisit: '2024-07-27',
      schedule: 'Mon/Wed/Fri 9-12',
      emergencyContact: 'John Johnson (555) 123-4568',
      skills: ['Reading Tutoring', 'Computer Help', 'Event Setup'],
      isCheckedIn: true,
      checkInTime: '9:00 AM',
      currentAssignment: 'Library Assistant'
    },
    { 
      id: 2, 
      name: 'Michael Brown', 
      email: 'mbrown@email.com',
      phone: '(555) 234-5678',
      role: 'Playground Monitor', 
      status: 'active', 
      backgroundCheck: 'completed',
      backgroundCheckDate: '2024-02-20',
      hoursThisMonth: 38,
      totalHours: 156,
      joinDate: '2024-01-15',
      lastVisit: '2024-07-26',
      schedule: 'Tue/Thu 11-2',
      emergencyContact: 'Lisa Brown (555) 234-5679',
      skills: ['Child Supervision', 'First Aid', 'Sports'],
      isCheckedIn: false,
      checkInTime: null,
      currentAssignment: null
    },
    { 
      id: 3, 
      name: 'Lisa Chen', 
      email: 'lchen@email.com',
      phone: '(555) 345-6789',
      role: 'Office Helper', 
      status: 'active', 
      backgroundCheck: 'completed',
      backgroundCheckDate: '2024-03-10',
      hoursThisMonth: 35,
      totalHours: 89,
      joinDate: '2024-03-01',
      lastVisit: '2024-07-27',
      schedule: 'Mon-Fri 1-4',
      emergencyContact: 'David Chen (555) 345-6790',
      skills: ['Admin Support', 'Data Entry', 'Phone Support'],
      isCheckedIn: true,
      checkInTime: '1:00 PM',
      currentAssignment: 'Office Helper'
    },
    { 
      id: 4, 
      name: 'David Wilson', 
      email: 'dwilson@email.com',
      phone: '(555) 456-7890',
      role: 'Reading Tutor', 
      status: 'pending_approval', 
      backgroundCheck: 'pending',
      backgroundCheckDate: null,
      hoursThisMonth: 0,
      totalHours: 0,
      joinDate: '2024-07-20',
      lastVisit: null,
      schedule: 'TBD',
      emergencyContact: 'Mary Wilson (555) 456-7891',
      skills: ['Reading Instruction', 'Math Tutoring'],
      isCheckedIn: false,
      checkInTime: null,
      currentAssignment: null
    }
  ]);

  const [volunteerApplications, setVolunteerApplications] = useState([
    {
      id: 1,
      name: 'Jennifer Adams',
      email: 'jadams@email.com',
      phone: '(555) 567-8901',
      appliedDate: '2024-07-25',
      status: 'new',
      interestedRoles: ['Library Assistant', 'Event Helper'],
      availability: 'Weekday mornings',
      experience: '5 years volunteering at community center',
      references: 'Available upon request'
    },
    {
      id: 2,
      name: 'Robert Taylor',
      email: 'rtaylor@email.com',
      phone: '(555) 678-9012',
      appliedDate: '2024-07-23',
      status: 'background_check',
      interestedRoles: ['Maintenance Helper'],
      availability: 'Weekends',
      experience: 'Retired contractor',
      references: 'John Smith (555) 111-2222'
    },
    {
      id: 3,
      name: 'Amanda White',
      email: 'awhite@email.com',
      phone: '(555) 789-0123',
      appliedDate: '2024-07-20',
      status: 'orientation_pending',
      interestedRoles: ['Reading Tutor', 'After School Program'],
      availability: 'Afternoons',
      experience: 'Former teacher',
      references: 'Principal Davis (555) 222-3333'
    }
  ]);

  const [newVolunteerForm, setNewVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    schedule: '',
    emergencyContact: '',
    skills: '',
    experience: ''
  });

  const [showNewVolunteerForm, setShowNewVolunteerForm] = useState(false);
  const [volunteerCheckInForm, setVolunteerCheckInForm] = useState({
    volunteerId: '',
    assignment: ''
  });
  const [showVolunteerDetails, setShowVolunteerDetails] = useState(null);

  // Event Management States
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Science Fair',
      date: '2024-07-29',
      time: '9:00 AM',
      endTime: '3:00 PM',
      location: 'Main Gymnasium',
      type: 'School Event',
      description: 'Annual student science fair with parent judging',
      maxCapacity: 200,
      status: 'Active Registration',
      preRegistrations: 45,
      checkedIn: 0,
      requiresScreening: true,
      allowWalkIns: true,
      registrationDeadline: '2024-07-28',
      createdDate: '2024-07-15',
      organizer: 'Mrs. Johnson',
      registrationLink: 'https://school.edu/register/science-fair-2024',
      attendees: [
        { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '555-0101', status: 'screened', registeredDate: '2024-07-20', checkedIn: false },
        { id: 2, name: 'Mike Davis', email: 'mike@email.com', phone: '555-0102', status: 'pending', registeredDate: '2024-07-22', checkedIn: false },
        { id: 3, name: 'Lisa Chen', email: 'lisa@email.com', phone: '555-0103', status: 'screened', registeredDate: '2024-07-18', checkedIn: false }
      ]
    },
    {
      id: 2,
      name: 'Parent-Teacher Conferences',
      date: '2024-08-15',
      time: '2:00 PM',
      endTime: '8:00 PM',
      location: 'Classrooms A-F',
      type: 'Academic',
      description: 'Quarterly parent-teacher conferences',
      maxCapacity: 150,
      status: 'Screening Complete',
      preRegistrations: 127,
      checkedIn: 0,
      requiresScreening: true,
      allowWalkIns: false,
      registrationDeadline: '2024-08-10',
      createdDate: '2024-07-01',
      organizer: 'Principal Davis',
      registrationLink: 'https://school.edu/register/parent-conferences-q2',
      attendees: []
    },
    {
      id: 3,
      name: 'Spring Concert',
      date: '2024-09-22',
      time: '7:00 PM',
      endTime: '9:00 PM',
      location: 'Auditorium',
      type: 'Performance',
      description: 'Annual spring music concert featuring all grade levels',
      maxCapacity: 300,
      status: 'Active Registration',
      preRegistrations: 89,
      checkedIn: 0,
      requiresScreening: true,
      allowWalkIns: true,
      registrationDeadline: '2024-09-20',
      createdDate: '2024-07-10',
      organizer: 'Music Department',
      registrationLink: 'https://school.edu/register/spring-concert-2024',
      attendees: []
    }
  ]);

  const [newEventForm, setNewEventForm] = useState({
    name: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    type: 'School Event',
    description: '',
    maxCapacity: 100,
    requiresScreening: true,
    allowWalkIns: true,
    organizer: ''
  });

  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [eventRegistrationForm, setEventRegistrationForm] = useState({
    eventId: '',
    name: '',
    email: '',
    phone: '',
    guests: 1
  });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [bulkBadgeQueue, setBulkBadgeQueue] = useState([]);
  const [showBadgePreview, setShowBadgePreview] = useState(null);

  // Emergency Management States
  const [emergencyStatus, setEmergencyStatus] = useState({
    active: false,
    type: null,
    startTime: null,
    description: '',
    responseLevel: 'normal'
  });

  const [studentAccountability, setStudentAccountability] = useState({
    totalStudents: 527,
    accountedFor: 487,
    pending: 23,
    missing: 2,
    offCampus: 15,
    classrooms: [
      { id: 1, room: 'Room 101', teacher: 'Mrs. Johnson', total: 24, accounted: 24, status: 'complete', lastUpdate: '2:45 PM' },
      { id: 2, room: 'Room 102', teacher: 'Mr. Davis', total: 23, accounted: 22, status: 'pending', lastUpdate: '2:43 PM' },
      { id: 3, room: 'Room 103', teacher: 'Ms. Wilson', total: 25, accounted: 25, status: 'complete', lastUpdate: '2:44 PM' },
      { id: 4, room: 'Room 104', teacher: 'Mr. Brown', total: 22, accounted: 21, status: 'pending', lastUpdate: '2:42 PM' },
      { id: 5, room: 'Gymnasium', teacher: 'Coach Smith', total: 20, accounted: 18, status: 'pending', lastUpdate: '2:41 PM' },
      { id: 6, room: 'Library', teacher: 'Ms. Chen', total: 15, accounted: 15, status: 'complete', lastUpdate: '2:45 PM' },
      { id: 7, room: 'Art Room', teacher: 'Mr. Taylor', total: 18, accounted: 18, status: 'complete', lastUpdate: '2:44 PM' },
      { id: 8, room: 'Music Room', teacher: 'Mrs. Garcia', total: 19, accounted: 19, status: 'complete', lastUpdate: '2:45 PM' }
    ]
  });

  const [emergencyProtocols, setEmergencyProtocols] = useState([
    {
      id: 1,
      type: 'Lockdown',
      icon: 'Shield',
      color: 'red',
      description: 'Secure all areas immediately',
      steps: [
        'Lock all classroom doors',
        'Turn off lights',
        'Move away from windows',
        'Remain silent',
        'Wait for all-clear signal'
      ],
      active: false,
      lastActivated: null
    },
    {
      id: 2,
      type: 'Evacuation',
      icon: 'Users',
      color: 'orange',
      description: 'Exit building using designated routes',
      steps: [
        'Exit via nearest safe route',
        'Move to designated assembly area',
        'Take attendance',
        'Report missing students',
        'Await further instructions'
      ],
      active: false,
      lastActivated: null
    },
    {
      id: 3,
      type: 'Shelter-in-Place',
      icon: 'MapPin',
      color: 'yellow',
      description: 'Remain in current location',
      steps: [
        'Close all windows and doors',
        'Turn off ventilation systems',
        'Seal gaps with tape if available',
        'Monitor emergency communications',
        'Wait for all-clear'
      ],
      active: false,
      lastActivated: null
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '911 Emergency', number: '911', type: 'emergency', lastCalled: null },
    { name: 'District Office', number: '(555) 123-4567', type: 'district', lastCalled: null },
    { name: 'Local Police', number: '(555) 234-5678', type: 'police', lastCalled: null },
    { name: 'Fire Department', number: '(555) 345-6789', type: 'fire', lastCalled: null },
    { name: 'Hospital', number: '(555) 456-7890', type: 'medical', lastCalled: null }
  ]);

  const [reunificationCenter, setReunificationCenter] = useState({
    location: 'Main Gymnasium',
    active: false,
    studentsReleased: [
      { id: 1, studentName: 'Emma Johnson', parentName: 'Sarah Johnson', releaseTime: '2:15 PM', verificationMethod: 'Photo ID' },
      { id: 2, studentName: 'Michael Chen', parentName: 'Lisa Chen', releaseTime: '2:12 PM', verificationMethod: 'Photo ID + Emergency Contact' },
      { id: 3, studentName: 'Alex Davis', parentName: 'Mark Davis', releaseTime: '2:08 PM', verificationMethod: 'Photo ID' }
    ],
    waitingParents: [
      { parentName: 'Jennifer Wilson', studentName: 'Tyler Wilson', arrivalTime: '2:20 PM', status: 'waiting_verification' },
      { parentName: 'Robert Garcia', studentName: 'Sofia Garcia', arrivalTime: '2:18 PM', status: 'verifying_identity' }
    ]
  });

  const [emergencyDrills, setEmergencyDrills] = useState([
    {
      id: 1,
      type: 'Fire Drill',
      date: '2024-07-15',
      duration: '4:32',
      status: 'completed',
      participation: '98%',
      notes: 'Evacuation completed successfully. Minor delay in east wing.'
    },
    {
      id: 2,
      type: 'Lockdown Drill',
      date: '2024-06-20',
      duration: '8:15',
      status: 'completed',
      participation: '100%',
      notes: 'All procedures followed correctly. Response time improved.'
    },
    {
      id: 3,
      type: 'Severe Weather',
      date: '2024-05-18',
      duration: '12:45',
      status: 'completed',
      participation: '97%',
      notes: 'Some confusion in hallway procedures. Additional training needed.'
    }
  ]);

  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [newEmergencyForm, setNewEmergencyForm] = useState({
    type: '',
    description: '',
    responseLevel: 'medium'
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'bg-blue-500' },
    { id: 'visitor-checkin', label: 'Visitor Check-In', icon: UserPlus, color: 'bg-green-500' },
    { id: 'security', label: 'Security Screening', icon: Shield, color: 'bg-red-500' },
    { id: 'events', label: 'Event Management', icon: Calendar, color: 'bg-purple-500' },
    { id: 'emergency', label: 'Emergency Center', icon: AlertTriangle, color: 'bg-orange-500' },
    { id: 'volunteers', label: 'Volunteer Hub', icon: Users, color: 'bg-teal-500' },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText, color: 'bg-indigo-500' }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to SchoolGuard Pro</h2>
            <p className="text-indigo-100 text-lg">Real-time security monitoring and visitor management</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-center">
              <p className="text-sm mb-1">Campus Status</p>
              <p className="text-4xl font-bold">{emergencyStatus.active ? '⚠️' : '✓'}</p>
              <p className="text-xs mt-1">{emergencyStatus.active ? 'Alert Active' : 'Secure'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Status Cards with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white bg-opacity-30 rounded-xl p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <span className="text-white text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Live</span>
              </div>
              <p className="text-blue-100 text-sm font-medium">Visitors On Campus</p>
              <p className="text-4xl font-bold text-white mt-2">{visitorCount}</p>
              <p className="text-blue-100 text-xs mt-2">↑ 8% from yesterday</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Checked in</span>
              <span className="font-semibold text-blue-600">{visitorCount - 5} active</span>
            </div>
          </div>
        </div>
        
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-green-500 to-emerald-400 p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white bg-opacity-30 rounded-xl p-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              </div>
              <p className="text-green-100 text-sm font-medium">Security Status</p>
              <p className="text-2xl font-bold text-white mt-2">All Clear</p>
              <p className="text-green-100 text-xs mt-2">98.5% screening success</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Last scan</span>
              <span className="font-semibold text-green-600">2 min ago</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white bg-opacity-30 rounded-xl p-3">
                  <Bell className="h-8 w-8 text-white" />
                </div>
                {emergencyStatus.active && <span className="text-white text-xs bg-red-500 px-2 py-1 rounded-full animate-pulse">Active</span>}
              </div>
              <p className="text-orange-100 text-sm font-medium">Active Alerts</p>
              <p className="text-4xl font-bold text-white mt-2">{emergencyStatus.active ? 1 : 0}</p>
              <p className="text-orange-100 text-xs mt-2">System monitoring active</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Priority level</span>
              <span className="font-semibold text-orange-600">{emergencyStatus.active ? 'HIGH' : 'Normal'}</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-purple-500 to-pink-400 p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white bg-opacity-30 rounded-xl p-3">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <span className="text-white text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Today</span>
              </div>
              <p className="text-purple-100 text-sm font-medium">Today's Events</p>
              <p className="text-4xl font-bold text-white mt-2">3</p>
              <p className="text-purple-100 text-xs mt-2">124 pre-registered guests</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Next event</span>
              <span className="font-semibold text-purple-600">9:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveView('visitor-checkin')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <UserPlus className="h-6 w-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">Check-In Visitor</p>
          </button>
          <button 
            onClick={() => setActiveView('security')}
            className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Shield className="h-6 w-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">Run Screening</p>
          </button>
          <button 
            onClick={() => setActiveView('emergency')}
            className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">Emergency</p>
          </button>
          <button 
            onClick={() => setActiveView('reports')}
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FileText className="h-6 w-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">View Reports</p>
          </button>
        </div>
      </div>

      {/* Live Activity & Campus Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Live Activity Feed
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[
              { type: 'checkin', name: 'Sarah Johnson', action: 'checked in as Parent Volunteer', time: '2 min ago', status: 'approved', icon: UserCheck },
              { type: 'checkout', name: 'Mike Davis', action: 'checked out', time: '5 min ago', status: 'completed', icon: Users },
              { type: 'screening', name: 'Unknown Visitor', action: 'flagged by security screening', time: '8 min ago', status: 'flagged', icon: AlertTriangle },
              { type: 'event', name: 'Science Fair Setup', action: 'pre-registration opened', time: '15 min ago', status: 'info', icon: Calendar },
              { type: 'volunteer', name: 'Lisa Chen', action: 'logged 3 hours of volunteer time', time: '22 min ago', status: 'completed', icon: Clock },
              { type: 'screening', name: 'David Wilson', action: 'passed security screening', time: '28 min ago', status: 'approved', icon: Shield }
            ].map((activity, index) => (
              <div key={index} className="group hover:bg-gray-50 p-4 rounded-xl transition-all duration-200 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activity.status === 'approved' ? 'bg-green-100' :
                      activity.status === 'flagged' ? 'bg-red-100' :
                      activity.status === 'completed' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <activity.icon className={`h-5 w-5 ${
                        activity.status === 'approved' ? 'text-green-600' :
                        activity.status === 'flagged' ? 'text-red-600' :
                        activity.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{activity.name}</p>
                      <p className="text-gray-600 text-xs">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'approved' ? 'bg-green-100 text-green-700' :
                      activity.status === 'flagged' ? 'bg-red-100 text-red-700' :
                      activity.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Campus Overview
          </h3>
          <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl h-64 flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="text-center relative z-10">
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                <p className="text-gray-800 font-semibold">Interactive Campus Map</p>
                <p className="text-xs text-gray-500 mt-1">Real-time visitor tracking</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-700 font-medium">{visitorCount} Visitors Active</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Main Building</span>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded-full">12 visitors</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Gymnasium</span>
              <span className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded-full">8 visitors</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-900">Library</span>
              <span className="text-xs bg-purple-200 text-purple-900 px-2 py-1 rounded-full">5 visitors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisitorCheckin = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Visitor Check-In Station</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ID Scanning Section */}
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Scan className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scan ID Document</h3>
              <p className="text-gray-600 mb-4">Place driver's license, passport, or military ID on scanner</p>
              <button 
                onClick={() => {
                  setActiveView('security');
                  simulateIDScan();
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Scan & Security Check
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Integrated Security Features
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>📄 2D Barcode & MRZ Scanning</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>🔍 Sex Offender Registry (50 States)</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>⚠️ Custom Watchlist Matching</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>📸 Auto Photo Capture</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>🏷️ Instant Badge Printing</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700 font-medium">⚡ Quick Re-Entry Available</p>
                <p className="text-xs text-blue-600">Frequent visitors automatically recognized</p>
              </div>
            </div>
          </div>

          {/* Visitor Information Form */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-700 font-medium text-sm">
                ℹ️ Complete security screening first, then fill out visitor information
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Auto-filled after ID scan"
                disabled={!scannedData}
                value={scannedData ? `${scannedData.firstName} ${scannedData.lastName}` : ''}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Purpose of Visit</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select purpose</option>
                <option>Parent Meeting</option>
                <option>Volunteer Work</option>
                <option>Delivery/Service</option>
                <option>Guest Speaker</option>
                <option>Student Pickup</option>
                <option>Contractor</option>
                <option>Emergency Contact</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Person/Department to Visit</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Teacher name or department"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expected Duration</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Half day</option>
                  <option>Full day</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Visitor Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>First Time</option>
                  <option>Frequent Visitor</option>
                  <option>Pre-Registered</option>
                  <option>Emergency</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Vehicle Information (Optional)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="License plate number"
                />
              </div>
              
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium mb-2">Photo Capture</label>
                <button className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </button>
              </div>
            </div>

            {/* Badge Preview */}
            {scannedData && screeningResults?.overallStatus === 'APPROVED' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Badge Preview</h4>
                <div className="bg-white border-2 border-green-300 rounded-lg p-4 max-w-xs">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-bold text-lg">{scannedData.firstName} {scannedData.lastName}</p>
                    <p className="text-sm text-gray-600">VISITOR</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</p>
                    <div className="mt-2">
                      <div className="bg-gray-200 h-8 w-full rounded flex items-center justify-center">
                        <span className="text-xs">QR CODE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button 
              className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
                scannedData && screeningResults?.overallStatus === 'APPROVED'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!scannedData || screeningResults?.overallStatus !== 'APPROVED'}
            >
              {!scannedData 
                ? 'Complete Security Screening First'
                : screeningResults?.overallStatus === 'APPROVED'
                ? 'Complete Check-In & Print Badge'
                : 'Security Review Required'
              }
            </button>
          </div>
        </div>
      </div>

      {/* Quick Check-In for Frequent Visitors */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Quick Re-Entry (Frequent Visitors)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">Recognized visitors can use express check-in</p>
            <div className="space-y-3">
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Search by name or scan QR code"
              />
              <button className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition-colors">
                Quick Check-In
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Recent Frequent Visitors</h4>
            <div className="space-y-2">
              {[
                { name: 'Sarah Johnson', role: 'Parent Volunteer', lastVisit: 'Yesterday' },
                { name: 'Mike Davis', role: 'Maintenance', lastVisit: '2 days ago' },
                { name: 'Lisa Chen', role: 'Guest Speaker', lastVisit: '1 week ago' }
              ].map((visitor, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{visitor.name}</p>
                    <p className="text-xs text-gray-600">{visitor.role} • {visitor.lastVisit}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                    Quick Check-In
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Visitors */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Currently On Campus</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Sarah Johnson', purpose: 'Parent Meeting', checkedIn: '9:30 AM', location: 'Main Office', badge: 'V001' },
            { name: 'Mike Brown', purpose: 'Delivery', checkedIn: '10:15 AM', location: 'Loading Dock', badge: 'V002' },
            { name: 'Lisa Chen', purpose: 'Volunteer', checkedIn: '8:45 AM', location: 'Library', badge: 'V003' },
            { name: 'David Wilson', purpose: 'Maintenance', checkedIn: '11:00 AM', location: 'Gymnasium', badge: 'V004' }
          ].map((visitor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{visitor.name}</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {visitor.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{visitor.purpose}</p>
              <p className="text-xs text-gray-500">📍 {visitor.location}</p>
              <p className="text-xs text-gray-500">⏰ Since {visitor.checkedIn}</p>
              <button className="w-full mt-3 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors">
                Check Out
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Security Screening Functions
  const simulateIDScan = () => {
    setIsProcessing(true);
    setScreeningStep('processing');
    
    // Simulate ID scanning process
    setTimeout(() => {
      const mockScannedData = {
        firstName: 'John',
        lastName: 'Smith',
        dateOfBirth: '1985-03-15',
        licenseNumber: 'D123456789',
        state: 'NY',
        address: '123 Main St, Buffalo, NY 14201',
        photoUrl: '/placeholder-photo.jpg',
        expirationDate: '2028-03-15'
      };
      setScannedData(mockScannedData);
      setScreeningStep('verification');
      setIsProcessing(false);
      
      // Start background checks
      setTimeout(() => runSecurityScreening(mockScannedData), 1000);
    }, 2000);
  };

  const runSecurityScreening = (data) => {
    setIsProcessing(true);
    
    // Simulate database checks
    setTimeout(() => {
      const isOnWatchlist = watchlistEntries.some(entry => 
        entry.name.toLowerCase().includes(data.firstName.toLowerCase()) && 
        entry.name.toLowerCase().includes(data.lastName.toLowerCase())
      );
      
      // Random chance for other alerts (for demo purposes)
      const sexOffenderMatch = Math.random() < 0.05; // 5% chance
      const criminalRecord = Math.random() < 0.1; // 10% chance
      
      const results = {
        sexOffenderRegistry: sexOffenderMatch ? 'MATCH FOUND' : 'CLEAR',
        criminalBackground: criminalRecord ? 'RECORD FOUND' : 'CLEAR',
        watchlistCheck: isOnWatchlist ? 'MATCH FOUND' : 'CLEAR',
        federalDatabase: 'CLEAR',
        overallStatus: (sexOffenderMatch || isOnWatchlist) ? 'FLAGGED' : 'APPROVED',
        riskLevel: (sexOffenderMatch || isOnWatchlist) ? 'HIGH' : 'LOW',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setScreeningResults(results);
      setScreeningStep('results');
      setIsProcessing(false);
      
      if (results.overallStatus === 'FLAGGED') {
        setActiveAlerts(prev => prev + 1);
      }
    }, 3000);
  };

  const resetScreening = () => {
    setScreeningActive(false);
    setScreeningStep('scan');
    setScannedData(null);
    setScreeningResults(null);
    setIsProcessing(false);
  };

  const addToWatchlist = () => {
    if (newWatchlistEntry.name && newWatchlistEntry.reason) {
      const newEntry = {
        id: Date.now(),
        ...newWatchlistEntry,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setWatchlistEntries([...watchlistEntries, newEntry]);
      setNewWatchlistEntry({ name: '', reason: '', category: 'banned' });
      setShowWatchlistForm(false);
    }
  };

  // Volunteer Management Functions
  const checkInVolunteer = (volunteerId, assignment) => {
    setVolunteers(volunteers.map(vol => 
      vol.id === parseInt(volunteerId) 
        ? { 
            ...vol, 
            isCheckedIn: true, 
            checkInTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            currentAssignment: assignment 
          }
        : vol
    ));
    setVolunteerCheckInForm({ volunteerId: '', assignment: '' });
  };

  const checkOutVolunteer = (volunteerId) => {
    const volunteer = volunteers.find(vol => vol.id === volunteerId);
    if (volunteer && volunteer.isCheckedIn) {
      const checkInTime = new Date(`2024-07-28 ${volunteer.checkInTime}`);
      const checkOutTime = new Date();
      const hoursWorked = Math.round(((checkOutTime - checkInTime) / (1000 * 60 * 60)) * 10) / 10;
      
      setVolunteers(volunteers.map(vol => 
        vol.id === volunteerId 
          ? { 
              ...vol, 
              isCheckedIn: false, 
              checkInTime: null,
              currentAssignment: null,
              hoursThisMonth: vol.hoursThisMonth + hoursWorked,
              totalHours: vol.totalHours + hoursWorked,
              lastVisit: new Date().toISOString().split('T')[0]
            }
          : vol
      ));
    }
  };

  const addNewVolunteer = () => {
    if (newVolunteerForm.name && newVolunteerForm.email && newVolunteerForm.role) {
      const newVolunteer = {
        id: Date.now(),
        ...newVolunteerForm,
        status: 'pending_approval',
        backgroundCheck: 'pending',
        backgroundCheckDate: null,
        hoursThisMonth: 0,
        totalHours: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastVisit: null,
        skills: newVolunteerForm.skills.split(',').map(s => s.trim()),
        isCheckedIn: false,
        checkInTime: null,
        currentAssignment: null
      };
      
      setVolunteers([...volunteers, newVolunteer]);
      setNewVolunteerForm({
        name: '',
        email: '',
        phone: '',
        role: '',
        schedule: '',
        emergencyContact: '',
        skills: '',
        experience: ''
      });
      setShowNewVolunteerForm(false);
    }
  };

  const processApplication = (applicationId, action) => {
    const application = volunteerApplications.find(app => app.id === applicationId);
    
    if (action === 'approve') {
      // Move to background check
      setVolunteerApplications(volunteerApplications.map(app =>
        app.id === applicationId ? { ...app, status: 'background_check' } : app
      ));
    } else if (action === 'background_complete') {
      // Move to orientation
      setVolunteerApplications(volunteerApplications.map(app =>
        app.id === applicationId ? { ...app, status: 'orientation_pending' } : app
      ));
    } else if (action === 'orientation_complete') {
      // Convert to active volunteer
      const newVolunteer = {
        id: Date.now(),
        name: application.name,
        email: application.email,
        phone: application.phone,
        role: application.interestedRoles[0],
        status: 'active',
        backgroundCheck: 'completed',
        backgroundCheckDate: new Date().toISOString().split('T')[0],
        hoursThisMonth: 0,
        totalHours: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastVisit: null,
        schedule: application.availability,
        emergencyContact: application.references,
        skills: application.interestedRoles,
        isCheckedIn: false,
        checkInTime: null,
        currentAssignment: null
      };
      
      setVolunteers([...volunteers, newVolunteer]);
      setVolunteerApplications(volunteerApplications.filter(app => app.id !== applicationId));
    } else if (action === 'reject') {
      setVolunteerApplications(volunteerApplications.filter(app => app.id !== applicationId));
    }
  };

  const updateVolunteerStatus = (volunteerId, newStatus) => {
    setVolunteers(volunteers.map(vol => 
      vol.id === volunteerId ? { ...vol, status: newStatus } : vol
    ));
  };

  const removeFromWatchlist = (id) => {
    setWatchlistEntries(watchlistEntries.filter(entry => entry.id !== id));
  };

  const completeBackgroundCheck = (volunteerId) => {
    setVolunteers(volunteers.map(vol => 
      vol.id === volunteerId 
        ? { 
            ...vol, 
            backgroundCheck: 'completed',
            backgroundCheckDate: new Date().toISOString().split('T')[0],
            status: 'active'
          }
        : vol
    ));
  };

  // Event Management Functions
  const createNewEvent = () => {
    if (newEventForm.name && newEventForm.date && newEventForm.time) {
      const newEvent = {
        id: Date.now(),
        ...newEventForm,
        status: 'Active Registration',
        preRegistrations: 0,
        checkedIn: 0,
        registrationDeadline: newEventForm.date,
        createdDate: new Date().toISOString().split('T')[0],
        registrationLink: `https://school.edu/register/${newEventForm.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        attendees: []
      };
      
      setEvents([...events, newEvent]);
      setNewEventForm({
        name: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        type: 'School Event',
        description: '',
        maxCapacity: 100,
        requiresScreening: true,
        allowWalkIns: true,
        organizer: ''
      });
      setShowNewEventForm(false);
    }
  };

  const registerForEvent = () => {
    if (eventRegistrationForm.eventId && eventRegistrationForm.name && eventRegistrationForm.email) {
      const eventId = parseInt(eventRegistrationForm.eventId);
      const newAttendee = {
        id: Date.now(),
        name: eventRegistrationForm.name,
        email: eventRegistrationForm.email,
        phone: eventRegistrationForm.phone,
        guests: eventRegistrationForm.guests,
        status: 'pending',
        registeredDate: new Date().toISOString().split('T')[0],
        checkedIn: false
      };

      setEvents(events.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              attendees: [...event.attendees, newAttendee],
              preRegistrations: event.preRegistrations + parseInt(eventRegistrationForm.guests)
            }
          : event
      ));

      setEventRegistrationForm({
        eventId: '',
        name: '',
        email: '',
        phone: '',
        guests: 1
      });
      setShowRegistrationForm(false);
      
      // Simulate background screening
      setTimeout(() => {
        runEventScreening(eventId, newAttendee.id);
      }, 2000);
    }
  };

  const runEventScreening = (eventId, attendeeId) => {
    // Simulate screening process
    const approved = Math.random() > 0.1; // 90% approval rate
    
    setEvents(events.map(event => 
      event.id === eventId 
        ? {
            ...event,
            attendees: event.attendees.map(attendee =>
              attendee.id === attendeeId
                ? { ...attendee, status: approved ? 'screened' : 'flagged' }
                : attendee
            )
          }
        : event
    ));
  };

  const checkInEventAttendee = (eventId, attendeeId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? {
            ...event,
            attendees: event.attendees.map(attendee =>
              attendee.id === attendeeId
                ? { ...attendee, checkedIn: true, checkInTime: new Date().toLocaleTimeString() }
                : attendee
            ),
            checkedIn: event.checkedIn + 1
          }
        : event
    ));
  };

  const generateBadgesForEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const approvedAttendees = event.attendees.filter(a => a.status === 'screened' && !a.checkedIn);
      setBulkBadgeQueue(approvedAttendees.map(attendee => ({
        ...attendee,
        eventName: event.name,
        eventDate: event.date,
        eventTime: event.time,
        badgeId: `${event.name.substring(0,3).toUpperCase()}${attendee.id}`
      })));
      setShowBadgePreview(event);
    }
  };

  const sendEventReminders = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      // Simulate sending reminders
      alert(`Reminders sent to ${event.attendees.length} registered attendees for "${event.name}"`);
    }
  };

  const updateEventStatus = (eventId, newStatus) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  // Emergency Management Functions
  const activateEmergency = (type, description = '') => {
    const newEmergency = {
      active: true,
      type: type,
      startTime: new Date().toLocaleTimeString(),
      description: description,
      responseLevel: type === 'Lockdown' ? 'high' : type === 'Evacuation' ? 'high' : 'medium'
    };
    
    setEmergencyStatus(newEmergency);
    setEmergencyActive(true);
    setActiveAlerts(prev => prev + 1);
    
    // Activate corresponding protocol
    setEmergencyProtocols(protocols => 
      protocols.map(protocol => 
        protocol.type === type 
          ? { ...protocol, active: true, lastActivated: new Date().toLocaleTimeString() }
          : { ...protocol, active: false }
      )
    );

    // Add to emergency alerts
    const newAlert = {
      id: Date.now(),
      type: 'emergency_activated',
      message: `${type} emergency activated`,
      timestamp: new Date().toLocaleTimeString(),
      level: newEmergency.responseLevel
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);

    // Auto-activate reunification center for certain emergencies
    if (type === 'Evacuation' || type === 'Lockdown') {
      setReunificationCenter(prev => ({ ...prev, active: true }));
    }
  };

  const deactivateEmergency = () => {
    setEmergencyStatus({
      active: false,
      type: null,
      startTime: null,
      description: '',
      responseLevel: 'normal'
    });
    setEmergencyActive(false);
    setActiveAlerts(0);
    
    // Deactivate all protocols
    setEmergencyProtocols(protocols => 
      protocols.map(protocol => ({ ...protocol, active: false }))
    );

    const newAlert = {
      id: Date.now(),
      type: 'emergency_ended',
      message: 'Emergency situation resolved - All clear issued',
      timestamp: new Date().toLocaleTimeString(),
      level: 'normal'
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const updateStudentAccountability = (classroomId, accountedCount) => {
    setStudentAccountability(prev => {
      const updatedClassrooms = prev.classrooms.map(classroom => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            accounted: accountedCount,
            status: accountedCount === classroom.total ? 'complete' : 'pending',
            lastUpdate: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
        }
        return classroom;
      });

      const totalAccounted = updatedClassrooms.reduce((sum, room) => sum + room.accounted, 0);
      const totalPending = updatedClassrooms.reduce((sum, room) => sum + (room.total - room.accounted), 0);

      return {
        ...prev,
        classrooms: updatedClassrooms,
        accountedFor: totalAccounted,
        pending: totalPending,
        missing: Math.max(0, prev.totalStudents - totalAccounted - prev.offCampus)
      };
    });
  };

  const callEmergencyContact = (contactIndex) => {
    const contact = emergencyContacts[contactIndex];
    setEmergencyContacts(contacts => 
      contacts.map((c, index) => 
        index === contactIndex 
          ? { ...c, lastCalled: new Date().toLocaleTimeString() }
          : c
      )
    );

    const newAlert = {
      id: Date.now(),
      type: 'contact_called',
      message: `Called ${contact.name} (${contact.number})`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info'
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const sendEmergencyAlert = (alertType) => {
    const alertMessages = {
      staff: 'Emergency alert sent to all staff members',
      parents: 'Parent notification system activated',
      district: 'District office emergency notification sent',
      public: 'Public safety alert issued'
    };

    const newAlert = {
      id: Date.now(),
      type: 'alert_sent',
      message: alertMessages[alertType] || 'Emergency alert sent',
      timestamp: new Date().toLocaleTimeString(),
      level: 'info'
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const releaseStudentToParent = (studentName, parentName, verificationMethod) => {
    const newRelease = {
      id: Date.now(),
      studentName,
      parentName,
      releaseTime: new Date().toLocaleTimeString(),
      verificationMethod
    };

    setReunificationCenter(prev => ({
      ...prev,
      studentsReleased: [newRelease, ...prev.studentsReleased],
      waitingParents: prev.waitingParents.filter(parent => parent.studentName !== studentName)
    }));

    const newAlert = {
      id: Date.now(),
      type: 'student_released',
      message: `${studentName} released to ${parentName}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info'
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const addWaitingParent = (parentName, studentName) => {
    const newParent = {
      parentName,
      studentName,
      arrivalTime: new Date().toLocaleTimeString(),
      status: 'waiting_verification'
    };

    setReunificationCenter(prev => ({
      ...prev,
      waitingParents: [...prev.waitingParents, newParent]
    }));
  };

  const conductEmergencyDrill = (drillType) => {
    const newDrill = {
      id: Date.now(),
      type: drillType,
      date: new Date().toISOString().split('T')[0],
      duration: 'In Progress',
      status: 'active',
      participation: '0%',
      notes: 'Drill in progress...'
    };

    setEmergencyDrills(prev => [newDrill, ...prev]);
    
    // Simulate drill completion
    setTimeout(() => {
      const completionTime = `${Math.floor(Math.random() * 10) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
      const participation = `${Math.floor(Math.random() * 5) + 95}%`;
      
      setEmergencyDrills(prev => 
        prev.map(drill => 
          drill.id === newDrill.id 
            ? { 
                ...drill, 
                duration: completionTime, 
                status: 'completed', 
                participation: participation,
                notes: 'Drill completed successfully. All procedures followed.'
              }
            : drill
        )
      );
    }, 5000);

    const newAlert = {
      id: Date.now(),
      type: 'drill_started',
      message: `${drillType} drill initiated`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info'
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Live Security Screening Station */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Shield className="h-6 w-6 mr-2 text-red-500" />
            Live Security Screening Station
          </h2>
          <button 
            onClick={resetScreening}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Station
          </button>
        </div>

        {/* Screening Workflow */}
        {screeningStep === 'scan' && (
          <div className="text-center py-12">
            <div className="border-4 border-dashed border-blue-300 rounded-xl p-12 bg-blue-50">
              <Scan className="h-24 w-24 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">ID Scanner Ready</h3>
              <p className="text-gray-600 mb-6">Place driver's license, passport, or military ID on the scanner</p>
              <button 
                onClick={simulateIDScan}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
              >
                <Camera className="h-5 w-5 mr-2 inline" />
                Start ID Scan
              </button>
            </div>
          </div>
        )}

        {screeningStep === 'processing' && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-12">
              <div className="animate-spin h-16 w-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Processing ID Document</h3>
              <p className="text-gray-600">Extracting information and verifying authenticity...</p>
            </div>
          </div>
        )}

        {screeningStep === 'verification' && scannedData && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">ID Information Extracted</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg font-semibold">{scannedData.firstName} {scannedData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-lg">{scannedData.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">License Number</label>
                    <p className="text-lg font-mono">{scannedData.licenseNumber}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">State</label>
                    <p className="text-lg">{scannedData.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-lg">{scannedData.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Expiration</label>
                    <p className="text-lg">{scannedData.expirationDate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-2 border-yellow-400 border-t-transparent rounded-full mr-3"></div>
                <span className="text-lg font-semibold">Running Security Screening...</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Sex Offender Registry Check</span>
                  <div className="animate-pulse w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>National Criminal Database</span>
                  <div className="animate-pulse w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Custom Watchlist Check</span>
                  <div className="animate-pulse w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Federal Database Lookup</span>
                  <div className="animate-pulse w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screeningStep === 'results' && screeningResults && (
          <div className="space-y-6">
            <div className={`rounded-xl p-6 border-2 ${
              screeningResults.overallStatus === 'APPROVED' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Screening Results</h3>
                <div className="flex items-center space-x-2">
                  {screeningResults.overallStatus === 'APPROVED' ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                  <span className={`text-2xl font-bold ${
                    screeningResults.overallStatus === 'APPROVED' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {screeningResults.overallStatus}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Sex Offender Registry</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      screeningResults.sexOffenderRegistry === 'CLEAR' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {screeningResults.sexOffenderRegistry}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Criminal Background</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      screeningResults.criminalBackground === 'CLEAR' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {screeningResults.criminalBackground}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Watchlist Check</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      screeningResults.watchlistCheck === 'CLEAR' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {screeningResults.watchlistCheck}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Federal Database</span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {screeningResults.federalDatabase}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Risk Level: 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                        screeningResults.riskLevel === 'LOW' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {screeningResults.riskLevel}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">Completed: {screeningResults.timestamp}</p>
                  </div>
                  
                  <div className="space-x-3">
                    {screeningResults.overallStatus === 'APPROVED' ? (
                      <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                        Approve & Print Badge
                      </button>
                    ) : (
                      <div className="space-x-2">
                        <button className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors">
                          Deny Entry
                        </button>
                        <button className="bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                          Manual Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Watchlist Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Custom Watchlist</h3>
            <button 
              onClick={() => setShowWatchlistForm(!showWatchlistForm)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Add Entry
            </button>
          </div>
          
          {showWatchlistForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newWatchlistEntry.name}
                  onChange={(e) => setNewWatchlistEntry({...newWatchlistEntry, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Reason for watchlist"
                  value={newWatchlistEntry.reason}
                  onChange={(e) => setNewWatchlistEntry({...newWatchlistEntry, reason: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <select
                  value={newWatchlistEntry.category}
                  onChange={(e) => setNewWatchlistEntry({...newWatchlistEntry, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="banned">Banned Individual</option>
                  <option value="restraining">Restraining Order</option>
                  <option value="flagged">Flagged Guardian</option>
                </select>
                <div className="flex space-x-2">
                  <button 
                    onClick={addToWatchlist}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Add to Watchlist
                  </button>
                  <button 
                    onClick={() => setShowWatchlistForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {watchlistEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">{entry.name}</p>
                  <p className="text-sm text-red-600">{entry.reason}</p>
                  <p className="text-xs text-gray-500">Added: {entry.dateAdded}</p>
                </div>
                <button 
                  onClick={() => removeFromWatchlist(entry.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-red-600 font-bold text-lg">{watchlistEntries.filter(e => e.category === 'banned').length}</p>
                <p className="text-gray-600">Banned</p>
              </div>
              <div className="text-center">
                <p className="text-orange-600 font-bold text-lg">{watchlistEntries.filter(e => e.category === 'restraining').length}</p>
                <p className="text-gray-600">Restraining Orders</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-600 font-bold text-lg">{watchlistEntries.filter(e => e.category === 'flagged').length}</p>
                <p className="text-gray-600">Flagged</p>
              </div>
            </div>
          </div>
        </div>

        {/* Database Integration Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Database Integration Status</h3>
          
          <div className="space-y-4">
            {[
              { name: 'National Sex Offender Registry', status: 'connected', lastSync: '2 min ago', records: '890,234' },
              { name: 'FBI National Crime Database', status: 'connected', lastSync: '5 min ago', records: '12.4M' },
              { name: 'State Criminal Records (NY)', status: 'connected', lastSync: '1 min ago', records: '2.1M' },
              { name: 'Local Police Database', status: 'pending', lastSync: '30 min ago', records: '45,678' },
              { name: 'Federal Watch Lists', status: 'connected', lastSync: '3 min ago', records: 'Classified' }
            ].map((db, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">{db.name}</p>
                  <p className="text-sm text-gray-600">Records: {db.records} • Last sync: {db.lastSync}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    db.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    db.status === 'connected' ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {db.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold mb-2">Screening Statistics (Today)</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Screenings</p>
                <p className="text-2xl font-bold text-blue-600">127</p>
              </div>
              <div>
                <p className="text-gray-600">Average Response Time</p>
                <p className="text-2xl font-bold text-blue-600">2.3s</p>
              </div>
              <div>
                <p className="text-gray-600">Approved</p>
                <p className="text-xl font-bold text-green-600">124</p>
              </div>
              <div>
                <p className="text-gray-600">Flagged/Denied</p>
                <p className="text-xl font-bold text-red-600">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Security Activity & Alerts</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Recent Screening Activity</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { name: 'Sarah Johnson', status: 'approved', time: '2 min ago', type: 'Parent Visit', riskLevel: 'low' },
                { name: 'Michael Brown', status: 'approved', time: '8 min ago', type: 'Delivery', riskLevel: 'low' },
                { name: 'Unknown Individual', status: 'flagged', time: '15 min ago', type: 'Unauthorized', riskLevel: 'high' },
                { name: 'Lisa Chen', status: 'approved', time: '23 min ago', type: 'Volunteer', riskLevel: 'low' },
                { name: 'David Wilson', status: 'manual_review', time: '35 min ago', type: 'Contractor', riskLevel: 'medium' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'approved' ? 'bg-green-500' :
                      activity.status === 'flagged' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{activity.name}</p>
                      <p className="text-xs text-gray-600">{activity.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      activity.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.riskLevel} risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Security Alerts</h4>
            <div className="space-y-3">
              {activeAlerts > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <p className="font-semibold text-red-800">High Priority Alert</p>
                  </div>
                  <p className="text-sm text-red-600 mt-1">Individual flagged during screening - Manual review required</p>
                  <p className="text-xs text-gray-500 mt-2">Active for {Math.floor(Math.random() * 10) + 1} minutes</p>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  <p className="font-semibold text-blue-800">System Status</p>
                </div>
                <p className="text-sm text-blue-600 mt-1">All screening databases operational</p>
                <p className="text-xs text-gray-500 mt-2">Last system check: 30 seconds ago</p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <p className="font-semibold text-yellow-800">Maintenance Scheduled</p>
                </div>
                <p className="text-sm text-yellow-600 mt-1">Database maintenance tonight 11 PM - 1 AM</p>
                <p className="text-xs text-gray-500 mt-2">Estimated downtime: 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => {
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
    const totalRegistrations = events.reduce((sum, event) => sum + event.preRegistrations, 0);
    const totalCheckedIn = events.reduce((sum, event) => sum + event.checkedIn, 0);
    const pendingScreening = events.reduce((sum, event) => 
      sum + event.attendees.filter(a => a.status === 'pending').length, 0);

    return (
      <div className="space-y-6">
        {/* EventSafe Management Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">EventSafe Management</h2>
            <button 
              onClick={() => setShowNewEventForm(!showNewEventForm)}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Create New Event
            </button>
          </div>

          {/* Event Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">{upcomingEvents.length}</p>
              <p className="text-sm text-purple-600">Active Events</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{totalRegistrations}</p>
              <p className="text-sm text-blue-600">Total Pre-Registered</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{totalCheckedIn}</p>
              <p className="text-sm text-green-600">Checked In Today</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendingScreening}</p>
              <p className="text-sm text-yellow-600">Pending Screening</p>
            </div>
          </div>

          {/* New Event Form */}
          {showNewEventForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Name"
                  value={newEventForm.name}
                  onChange={(e) => setNewEventForm({...newEventForm, name: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <select
                  value={newEventForm.type}
                  onChange={(e) => setNewEventForm({...newEventForm, type: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="School Event">School Event</option>
                  <option value="Academic">Academic</option>
                  <option value="Performance">Performance</option>
                  <option value="Sports">Sports</option>
                  <option value="Community">Community</option>
                </select>
                <input
                  type="date"
                  value={newEventForm.date}
                  onChange={(e) => setNewEventForm({...newEventForm, date: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="time"
                  placeholder="Start Time"
                  value={newEventForm.time}
                  onChange={(e) => setNewEventForm({...newEventForm, time: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="time"
                  placeholder="End Time"
                  value={newEventForm.endTime}
                  onChange={(e) => setNewEventForm({...newEventForm, endTime: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newEventForm.location}
                  onChange={(e) => setNewEventForm({...newEventForm, location: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max Capacity"
                  value={newEventForm.maxCapacity}
                  onChange={(e) => setNewEventForm({...newEventForm, maxCapacity: parseInt(e.target.value)})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Organizer"
                  value={newEventForm.organizer}
                  onChange={(e) => setNewEventForm({...newEventForm, organizer: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Event Description"
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({...newEventForm, description: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg md:col-span-2"
                  rows="3"
                />
                <div className="md:col-span-2 flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newEventForm.requiresScreening}
                      onChange={(e) => setNewEventForm({...newEventForm, requiresScreening: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm">Requires Security Screening</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newEventForm.allowWalkIns}
                      onChange={(e) => setNewEventForm({...newEventForm, allowWalkIns: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm">Allow Walk-ins</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={createNewEvent}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Create Event
                </button>
                <button 
                  onClick={() => setShowNewEventForm(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Event List & Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{event.name}</h4>
                        <p className="text-sm text-gray-600">{event.date} at {event.time} - {event.location}</p>
                        <p className="text-xs text-gray-500">{event.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Active Registration' ? 'bg-green-100 text-green-800' :
                        event.status === 'Screening Complete' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Pre-Registered</p>
                        <p className="font-bold text-lg">{event.preRegistrations}/{event.maxCapacity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Checked In</p>
                        <p className="font-bold text-lg text-green-600">{event.checkedIn}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Screening Status</p>
                        <p className="font-medium">
                          {event.attendees.filter(a => a.status === 'screened').length} Approved
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Organizer</p>
                        <p className="font-medium">{event.organizer}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventDetails(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Manage Event
                      </button>
                      <button 
                        onClick={() => generateBadgesForEvent(event.id)}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                      >
                        Print Badges
                      </button>
                      <button 
                        onClick={() => sendEventReminders(event.id)}
                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                      >
                        Send Reminders
                      </button>
                      <button 
                        onClick={() => {
                          setEventRegistrationForm({...eventRegistrationForm, eventId: event.id.toString()});
                          setShowRegistrationForm(true);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        Add Registration
                      </button>
                    </div>
                    
                    {/* Registration Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.preRegistrations / event.maxCapacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((event.preRegistrations / event.maxCapacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Tools */}
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowRegistrationForm(true)}
                  className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors text-sm"
                >
                  Manual Registration
                </button>
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors text-sm">
                  Bulk Badge Print
                </button>
                <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors text-sm">
                  Export Guest Lists
                </button>
                <button className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-colors text-sm">
                  Generate QR Codes
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Registration Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Today's RSVPs</span>
                  <span className="font-medium">{Math.floor(Math.random() * 20) + 10}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Screening Pending</span>
                  <span className="font-medium text-yellow-600">{pendingScreening}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Approved Visitors</span>
                  <span className="font-medium text-green-600">
                    {events.reduce((sum, event) => 
                      sum + event.attendees.filter(a => a.status === 'screened').length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Flagged/Denied</span>
                  <span className="font-medium text-red-600">
                    {events.reduce((sum, event) => 
                      sum + event.attendees.filter(a => a.status === 'flagged').length, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                {events.flatMap(event => 
                  event.attendees.slice(0, 3).map(attendee => (
                    <div key={`${event.id}-${attendee.id}`} className="flex justify-between">
                      <span className="truncate">{attendee.name}</span>
                      <span className={`px-1 rounded text-xs ${
                        attendee.status === 'screened' ? 'bg-green-100 text-green-800' :
                        attendee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {attendee.status}
                      </span>
                    </div>
                  ))
                ).slice(0, 5)}
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Registration Portal */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Pre-Registration Portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Registration Link Generator</h4>
              <div className="space-y-4">
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Select Event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                </select>
                <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Generated Link:</p>
                  <p className="text-sm font-mono bg-white p-2 rounded border">
                    {events[0]?.registrationLink}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex-1">
                    Copy Link
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-1">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Recent Registrations</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {events.flatMap(event => 
                  event.attendees.map(attendee => (
                    <div key={`${event.id}-${attendee.id}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{attendee.name}</p>
                        <p className="text-xs text-gray-600">{event.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{attendee.registeredDate}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          attendee.status === 'screened' ? 'bg-green-100 text-green-800' :
                          attendee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {attendee.status}
                        </span>
                      </div>
                    </div>
                  ))
                ).slice(0, 6)}
              </div>
            </div>
          </div>
        </div>

        {/* Event Registration Form Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full m-4">
              <h3 className="text-xl font-bold mb-4">Event Registration</h3>
              <div className="space-y-4">
                <select
                  value={eventRegistrationForm.eventId}
                  onChange={(e) => setEventRegistrationForm({...eventRegistrationForm, eventId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Event</option>
                  {upcomingEvents.map(event => (
                    <option key={event.id} value={event.id}>{event.name} - {event.date}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={eventRegistrationForm.name}
                  onChange={(e) => setEventRegistrationForm({...eventRegistrationForm, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={eventRegistrationForm.email}
                  onChange={(e) => setEventRegistrationForm({...eventRegistrationForm, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={eventRegistrationForm.phone}
                  onChange={(e) => setEventRegistrationForm({...eventRegistrationForm, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Number of Guests"
                  min="1"
                  max="10"
                  value={eventRegistrationForm.guests}
                  onChange={(e) => setEventRegistrationForm({...eventRegistrationForm, guests: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={registerForEvent}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex-1"
                >
                  Register
                </button>
                <button 
                  onClick={() => setShowRegistrationForm(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {showEventDetails && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full m-4 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedEvent.name} - Management</h3>
                <button 
                  onClick={() => setShowEventDetails(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                    <p><strong>Time:</strong> {selectedEvent.time} - {selectedEvent.endTime}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>
                    <p><strong>Capacity:</strong> {selectedEvent.preRegistrations}/{selectedEvent.maxCapacity}</p>
                    <p><strong>Type:</strong> {selectedEvent.type}</p>
                    <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Quick Actions</h5>
                    <div className="space-y-2">
                      <button 
                        onClick={() => generateBadgesForEvent(selectedEvent.id)}
                        className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 text-sm"
                      >
                        Generate All Badges
                      </button>
                      <button 
                        onClick={() => updateEventStatus(selectedEvent.id, 'Check-in Active')}
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 text-sm"
                      >
                        Activate Check-in
                      </button>
                      <button 
                        onClick={() => sendEventReminders(selectedEvent.id)}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm"
                      >
                        Send Reminder Emails
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Attendee List ({selectedEvent.attendees.length})</h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {selectedEvent.attendees.map(attendee => (
                      <div key={attendee.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{attendee.name}</p>
                          <p className="text-xs text-gray-600">{attendee.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            attendee.status === 'screened' ? 'bg-green-100 text-green-800' :
                            attendee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {attendee.status}
                          </span>
                          {attendee.status === 'screened' && !attendee.checkedIn && (
                            <button 
                              onClick={() => checkInEventAttendee(selectedEvent.id, attendee.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                            >
                              Check In
                            </button>
                          )}
                          {attendee.checkedIn && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Checked In
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Badge Preview Modal */}
        {showBadgePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full m-4">
              <h3 className="text-xl font-bold mb-4">Badge Preview - {showBadgePreview.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {bulkBadgeQueue.slice(0, 4).map((badge, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Badge className="h-6 w-6" />
                      </div>
                      <p className="font-bold">{badge.name}</p>
                      <p className="text-sm opacity-90">EVENT ATTENDEE</p>
                      <p className="text-xs opacity-75">{badge.eventName}</p>
                      <p className="text-xs opacity-75">{badge.eventDate} • {badge.eventTime}</p>
                      <div className="mt-2 bg-white bg-opacity-20 p-1 rounded">
                        <p className="text-xs font-mono">{badge.badgeId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    alert(`Printing ${bulkBadgeQueue.length} badges for ${showBadgePreview.name}`);
                    setShowBadgePreview(null);
                    setBulkBadgeQueue([]);
                  }}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex-1"
                >
                  Print All {bulkBadgeQueue.length} Badges
                </button>
                <button 
                  onClick={() => setShowBadgePreview(null)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEmergency = () => (
    <div className="space-y-6">
      {/* Emergency Status Header */}
      <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
        emergencyStatus.active ? 'bg-red-500 text-white animate-pulse' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <AlertTriangle className={`h-8 w-8 ${emergencyStatus.active ? 'text-white' : 'text-orange-500'}`} />
            <div>
              <h2 className="text-2xl font-bold">Emergency Response Center</h2>
              <p className={`${emergencyStatus.active ? 'text-red-100' : 'text-gray-600'}`}>
                Status: {emergencyStatus.active ? `ACTIVE ${emergencyStatus.type?.toUpperCase()} EMERGENCY` : 'Normal Operations'}
              </p>
              {emergencyStatus.active && (
                <p className="text-red-100 text-sm">
                  Started: {emergencyStatus.startTime} | Level: {emergencyStatus.responseLevel?.toUpperCase()}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            {!emergencyStatus.active ? (
              <button 
                onClick={() => setShowEmergencyForm(true)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors hover:bg-red-600"
              >
                ACTIVATE EMERGENCY
              </button>
            ) : (
              <button 
                onClick={deactivateEmergency}
                className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold text-lg transition-colors hover:bg-gray-100 border-2 border-white"
              >
                END EMERGENCY
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Activation Form */}
      {showEmergencyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full m-4">
            <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ Activate Emergency</h3>
            <div className="space-y-4">
              <select 
                value={newEmergencyForm.type}
                onChange={(e) => setNewEmergencyForm({...newEmergencyForm, type: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Emergency Type</option>
                <option value="Lockdown">🔒 Lockdown</option>
                <option value="Evacuation">🚨 Evacuation</option>
                <option value="Shelter-in-Place">🏠 Shelter-in-Place</option>
                <option value="Medical Emergency">🏥 Medical Emergency</option>
                <option value="Severe Weather">⛈️ Severe Weather</option>
                <option value="Other">❗ Other</option>
              </select>
              
              <textarea
                placeholder="Brief description of emergency situation"
                value={newEmergencyForm.description}
                onChange={(e) => setNewEmergencyForm({...newEmergencyForm, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
              />
              
              <select
                value={newEmergencyForm.responseLevel}
                onChange={(e) => setNewEmergencyForm({...newEmergencyForm, responseLevel: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => {
                  if (newEmergencyForm.type) {
                    activateEmergency(newEmergencyForm.type, newEmergencyForm.description);
                    setShowEmergencyForm(false);
                    setNewEmergencyForm({ type: '', description: '', responseLevel: 'medium' });
                  }
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex-1 font-semibold"
              >
                ACTIVATE EMERGENCY
              </button>
              <button 
                onClick={() => setShowEmergencyForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Protocols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Emergency Protocols</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyProtocols.map((protocol) => (
                <div key={protocol.id} className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                  protocol.active 
                    ? `border-${protocol.color}-500 bg-${protocol.color}-50 ring-2 ring-${protocol.color}-200` 
                    : `border-${protocol.color}-200 bg-${protocol.color}-50 hover:bg-${protocol.color}-100`
                }`}>
                  <button 
                    onClick={() => activateEmergency(protocol.type)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      {protocol.type === 'Lockdown' && <Shield className={`h-8 w-8 text-${protocol.color}-500`} />}
                      {protocol.type === 'Evacuation' && <Users className={`h-8 w-8 text-${protocol.color}-500`} />}
                      {protocol.type === 'Shelter-in-Place' && <MapPin className={`h-8 w-8 text-${protocol.color}-500`} />}
                      {protocol.active && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">ACTIVE</span>}
                    </div>
                    <h4 className="font-semibold text-lg">{protocol.type}</h4>
                    <p className="text-sm text-gray-600 mb-3">{protocol.description}</p>
                    
                    {protocol.active && (
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs font-medium text-gray-700 mb-1">Protocol Steps:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {protocol.steps.slice(0, 3).map((step, index) => (
                            <li key={index}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Student Accountability</h3>
              <button 
                onClick={() => {
                  const randomRoom = Math.floor(Math.random() * studentAccountability.classrooms.length);
                  const classroom = studentAccountability.classrooms[randomRoom];
                  updateStudentAccountability(classroom.id, classroom.total);
                }}
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              >
                Refresh All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-700">{studentAccountability.accountedFor}</p>
                <p className="text-sm text-green-600">Accounted For</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-yellow-700">{studentAccountability.pending}</p>
                <p className="text-sm text-yellow-600">Pending</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-700">{studentAccountability.missing}</p>
                <p className="text-sm text-red-600">Missing</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-700">{studentAccountability.offCampus}</p>
                <p className="text-sm text-blue-600">Off Campus</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Classroom Status</h4>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {studentAccountability.classrooms.map((classroom) => (
                  <div key={classroom.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        classroom.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{classroom.room} - {classroom.teacher}</p>
                        <p className="text-xs text-gray-600">Last update: {classroom.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{classroom.accounted}/{classroom.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          classroom.status === 'complete' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {classroom.status}
                        </span>
                      </div>
                      
                      {classroom.status === 'pending' && (
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => updateStudentAccountability(classroom.id, Math.max(0, classroom.accounted - 1))}
                            className="bg-red-500 text-white w-6 h-6 rounded text-xs hover:bg-red-600"
                          >
                            -
                          </button>
                          <button 
                            onClick={() => updateStudentAccountability(classroom.id, Math.min(classroom.total, classroom.accounted + 1))}
                            className="bg-green-500 text-white w-6 h-6 rounded text-xs hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Communications & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Emergency Communications</h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <button 
                  key={index}
                  onClick={() => callEmergencyContact(index)}
                  className={`w-full p-3 rounded-lg transition-colors text-left flex items-center justify-between ${
                    contact.type === 'emergency' ? 'bg-red-500 text-white hover:bg-red-600' :
                    contact.type === 'police' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                    contact.type === 'fire' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                    contact.type === 'medical' ? 'bg-green-500 text-white hover:bg-green-600' :
                    'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm opacity-90">{contact.number}</p>
                    </div>
                  </div>
                  {contact.lastCalled && (
                    <span className="text-xs opacity-75">Called: {contact.lastCalled}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Alert Systems</h3>
            <div className="space-y-3">
              <button 
                onClick={() => sendEmergencyAlert('staff')}
                className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <Bell className="h-4 w-4 mr-2" />
                Alert All Staff
              </button>
              
              <button 
                onClick={() => sendEmergencyAlert('parents')}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Notify Parents
              </button>
              
              <button 
                onClick={() => sendEmergencyAlert('district')}
                className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
              >
                <Zap className="h-4 w-4 mr-2" />
                District Alert
              </button>

              <button 
                onClick={() => sendEmergencyAlert('public')}
                className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Public Safety Alert
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Emergency Drills</h3>
            <div className="space-y-3">
              <button 
                onClick={() => conductEmergencyDrill('Fire Drill')}
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-colors text-sm"
              >
                Conduct Fire Drill
              </button>
              <button 
                onClick={() => conductEmergencyDrill('Lockdown Drill')}
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Conduct Lockdown Drill
              </button>
              <button 
                onClick={() => conductEmergencyDrill('Evacuation Drill')}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Conduct Evacuation Drill
              </button>
              <button 
                onClick={() => conductEmergencyDrill('Severe Weather Drill')}
                className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors text-sm"
              >
                Conduct Weather Drill
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="font-medium mb-2 text-sm">Recent Drills</h5>
              <div className="space-y-2">
                {emergencyDrills.slice(0, 3).map((drill) => (
                  <div key={drill.id} className="text-xs bg-gray-50 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{drill.type}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        drill.status === 'completed' ? 'bg-green-100 text-green-800' :
                        drill.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {drill.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{drill.date} • {drill.duration} • {drill.participation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reunification Center */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Reunification Center</h3>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              reunificationCenter.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {reunificationCenter.active ? 'Active' : 'Inactive'}
            </span>
            <button 
              onClick={() => setReunificationCenter(prev => ({ ...prev, active: !prev.active }))}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                reunificationCenter.active 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {reunificationCenter.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Location</h4>
            <p className="font-medium">{reunificationCenter.location}</p>
            <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
              Change Location
            </button>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Students Released ({reunificationCenter.studentsReleased.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {reunificationCenter.studentsReleased.slice(0, 3).map((release) => (
                <div key={release.id} className="text-xs bg-white p-2 rounded border">
                  <p className="font-medium">{release.studentName}</p>
                  <p className="text-gray-600">To: {release.parentName} at {release.releaseTime}</p>
                  <p className="text-gray-500">ID: {release.verificationMethod}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Waiting Parents ({reunificationCenter.waitingParents.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {reunificationCenter.waitingParents.map((parent, index) => (
                <div key={index} className="text-xs bg-white p-2 rounded border">
                  <p className="font-medium">{parent.parentName}</p>
                  <p className="text-gray-600">For: {parent.studentName}</p>
                  <p className="text-gray-500">Since: {parent.arrivalTime}</p>
                  <button 
                    onClick={() => releaseStudentToParent(parent.studentName, parent.parentName, 'Photo ID Verified')}
                    className="mt-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Release Student
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => addWaitingParent(`Parent ${Date.now()}`, `Student ${Date.now()}`)}
              className="mt-3 w-full bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600"
            >
              Add Waiting Parent
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Activity Log */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Activity Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {emergencyAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg ${
              alert.level === 'high' ? 'bg-red-50 border border-red-200' :
              alert.level === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
              alert.level === 'emergency_activated' ? 'bg-red-100 border border-red-300' :
              alert.level === 'emergency_ended' ? 'bg-green-100 border border-green-300' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  alert.level === 'high' ? 'bg-red-500' :
                  alert.level === 'medium' ? 'bg-yellow-500' :
                  alert.type === 'emergency_activated' ? 'bg-red-500' :
                  alert.type === 'emergency_ended' ? 'bg-green-500' :
                  'bg-blue-500'
                }`} />
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
              <span className="text-xs text-gray-500">{alert.timestamp}</span>
            </div>
          ))}
          
          {emergencyAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No emergency activity today
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderVolunteers = () => {
    const activeVolunteers = volunteers.filter(vol => vol.status === 'active');
    const checkedInVolunteers = volunteers.filter(vol => vol.isCheckedIn);
    const pendingApplications = volunteerApplications.filter(app => app.status === 'new');
    const backgroundCheckPending = volunteers.filter(vol => vol.backgroundCheck === 'pending');
    const totalHoursThisMonth = volunteers.reduce((sum, vol) => sum + vol.hoursThisMonth, 0);

    return (
      <div className="space-y-6">
        {/* Volunteer Management Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Volunteer Management Hub</h2>
            <button 
              onClick={() => setShowNewVolunteerForm(!showNewVolunteerForm)}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Add New Volunteer
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-teal-700">{activeVolunteers.length}</p>
              <p className="text-sm text-teal-600">Active Volunteers</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{checkedInVolunteers.length}</p>
              <p className="text-sm text-blue-600">Currently On Site</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">{totalHoursThisMonth}</p>
              <p className="text-sm text-purple-600">Hours This Month</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendingApplications.length}</p>
              <p className="text-sm text-yellow-600">Pending Applications</p>
            </div>
          </div>

          {/* New Volunteer Form */}
          {showNewVolunteerForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Add New Volunteer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newVolunteerForm.name}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, name: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newVolunteerForm.email}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, email: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newVolunteerForm.phone}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, phone: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <select
                  value={newVolunteerForm.role}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, role: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="Library Assistant">Library Assistant</option>
                  <option value="Office Helper">Office Helper</option>
                  <option value="Playground Monitor">Playground Monitor</option>
                  <option value="Reading Tutor">Reading Tutor</option>
                  <option value="Event Helper">Event Helper</option>
                  <option value="Maintenance Helper">Maintenance Helper</option>
                </select>
                <input
                  type="text"
                  placeholder="Schedule (e.g., Mon/Wed/Fri 9-12)"
                  value={newVolunteerForm.schedule}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, schedule: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Emergency Contact"
                  value={newVolunteerForm.emergencyContact}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, emergencyContact: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={newVolunteerForm.skills}
                  onChange={(e) => setNewVolunteerForm({...newVolunteerForm, skills: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg md:col-span-2"
                />
              </div>
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={addNewVolunteer}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Add Volunteer
                </button>
                <button 
                  onClick={() => setShowNewVolunteerForm(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Volunteer Check-in/out Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Volunteer Check-In/Out Station</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Check-in Form */}
            <div>
              <h4 className="font-medium mb-3">Quick Check-In</h4>
              <div className="space-y-4">
                <select
                  value={volunteerCheckInForm.volunteerId}
                  onChange={(e) => setVolunteerCheckInForm({...volunteerCheckInForm, volunteerId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Volunteer</option>
                  {volunteers.filter(vol => !vol.isCheckedIn && vol.status === 'active').map(vol => (
                    <option key={vol.id} value={vol.id}>{vol.name} - {vol.role}</option>
                  ))}
                </select>
                
                <select
                  value={volunteerCheckInForm.assignment}
                  onChange={(e) => setVolunteerCheckInForm({...volunteerCheckInForm, assignment: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Assignment</option>
                  <option value="Library Assistant">Library Assistant</option>
                  <option value="Office Helper">Office Helper</option>
                  <option value="Playground Monitor">Playground Monitor</option>
                  <option value="Reading Tutor">Reading Tutor</option>
                  <option value="Event Setup">Event Setup</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                
                <button 
                  onClick={() => checkInVolunteer(volunteerCheckInForm.volunteerId, volunteerCheckInForm.assignment)}
                  disabled={!volunteerCheckInForm.volunteerId || !volunteerCheckInForm.assignment}
                  className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Check In Volunteer
                </button>
              </div>
            </div>

            {/* Currently Checked In */}
            <div>
              <h4 className="font-medium mb-3">Currently Checked In ({checkedInVolunteers.length})</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {checkedInVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <div>
                      <p className="font-medium text-sm">{volunteer.name}</p>
                      <p className="text-xs text-gray-600">{volunteer.currentAssignment}</p>
                      <p className="text-xs text-teal-600">Since {volunteer.checkInTime}</p>
                    </div>
                    <button 
                      onClick={() => checkOutVolunteer(volunteer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                    >
                      Check Out
                    </button>
                  </div>
                ))}
                
                {checkedInVolunteers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No volunteers currently checked in
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Pipeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Application Pipeline</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* New Applications */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">New Applications ({pendingApplications.length})</h4>
              <div className="space-y-3">
                {volunteerApplications.filter(app => app.status === 'new').map(app => (
                  <div key={app.id} className="bg-white border border-blue-200 rounded p-3">
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-gray-600">{app.interestedRoles.join(', ')}</p>
                    <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                    <div className="flex space-x-1 mt-2">
                      <button 
                        onClick={() => processApplication(app.id, 'approve')}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => processApplication(app.id, 'reject')}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Check */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-3">Background Check</h4>
              <div className="space-y-3">
                {volunteerApplications.filter(app => app.status === 'background_check').map(app => (
                  <div key={app.id} className="bg-white border border-yellow-200 rounded p-3">
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-gray-600">In Progress...</p>
                    <button 
                      onClick={() => processApplication(app.id, 'background_complete')}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 mt-2"
                    >
                      Mark Complete
                    </button>
                  </div>
                ))}
                
                {volunteers.filter(vol => vol.backgroundCheck === 'pending').map(vol => (
                  <div key={vol.id} className="bg-white border border-yellow-200 rounded p-3">
                    <p className="font-medium text-sm">{vol.name}</p>
                    <p className="text-xs text-gray-600">Background Check Pending</p>
                    <button 
                      onClick={() => completeBackgroundCheck(vol.id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 mt-2"
                    >
                      Complete Check
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Orientation Pending */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-3">Orientation Pending</h4>
              <div className="space-y-3">
                {volunteerApplications.filter(app => app.status === 'orientation_pending').map(app => (
                  <div key={app.id} className="bg-white border border-purple-200 rounded p-3">
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-gray-600">Awaiting Orientation</p>
                    <button 
                      onClick={() => processApplication(app.id, 'orientation_complete')}
                      className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 mt-2"
                    >
                      Complete Orientation
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Volunteers */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">Active Volunteers ({activeVolunteers.length})</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeVolunteers.slice(0, 5).map(vol => (
                  <div key={vol.id} className="bg-white border border-green-200 rounded p-2">
                    <p className="font-medium text-xs">{vol.name}</p>
                    <p className="text-xs text-gray-600">{vol.role}</p>
                    <p className="text-xs text-green-600">{vol.hoursThisMonth}h this month</p>
                  </div>
                ))}
                {activeVolunteers.length > 5 && (
                  <p className="text-xs text-gray-500 text-center">+{activeVolunteers.length - 5} more...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Directory */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Volunteer Directory</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Hours (Month)</th>
                  <th className="text-left p-3">Background Check</th>
                  <th className="text-left p-3">Last Visit</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map(volunteer => (
                  <tr key={volunteer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{volunteer.name}</p>
                        <p className="text-xs text-gray-600">{volunteer.email}</p>
                      </div>
                    </td>
                    <td className="p-3">{volunteer.role}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        volunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                        volunteer.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {volunteer.status.replace('_', ' ')}
                      </span>
                      {volunteer.isCheckedIn && (
                        <span className="ml-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Checked In
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono">{volunteer.hoursThisMonth}h</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        volunteer.backgroundCheck === 'completed' ? 'bg-green-100 text-green-800' :
                        volunteer.backgroundCheck === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {volunteer.backgroundCheck}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-gray-600">{volunteer.lastVisit || 'Never'}</td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setShowVolunteerDetails(volunteer)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          View
                        </button>
                        {volunteer.status === 'pending_approval' && (
                          <button 
                            onClick={() => updateVolunteerStatus(volunteer.id, 'active')}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volunteer Details Modal */}
        {showVolunteerDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Volunteer Details</h3>
                <button 
                  onClick={() => setShowVolunteerDetails(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="font-semibold">{showVolunteerDetails.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p>{showVolunteerDetails.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p>{showVolunteerDetails.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <p>{showVolunteerDetails.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Schedule</label>
                    <p>{showVolunteerDetails.schedule}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <p className="capitalize">{showVolunteerDetails.status.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Join Date</label>
                    <p>{showVolunteerDetails.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Total Hours</label>
                    <p className="font-bold text-lg">{showVolunteerDetails.totalHours} hours</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">This Month</label>
                    <p className="font-bold">{showVolunteerDetails.hoursThisMonth} hours</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Skills</label>
                    <div className="flex flex-wrap gap-1">
                      {showVolunteerDetails.skills?.map((skill, index) => (
                        <span key={index} className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  {!showVolunteerDetails.isCheckedIn ? (
                    <button 
                      onClick={() => {
                        checkInVolunteer(showVolunteerDetails.id, showVolunteerDetails.role);
                        setShowVolunteerDetails(null);
                      }}
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                    >
                      Check In
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        checkOutVolunteer(showVolunteerDetails.id);
                        setShowVolunteerDetails(null);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Check Out
                    </button>
                  )}
                  
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit Volunteer
                  </button>
                  
                  <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    View Hour History
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Reports & Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Key Metrics */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <h4 className="text-blue-100 text-sm mb-1">Daily Visitors</h4>
            <p className="text-2xl font-bold">127</p>
            <p className="text-blue-100 text-xs">+12% from yesterday</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
            <h4 className="text-green-100 text-sm mb-1">Security Screenings</h4>
            <p className="text-2xl font-bold">98.2%</p>
            <p className="text-green-100 text-xs">Pass rate</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <h4 className="text-purple-100 text-sm mb-1">Volunteer Hours</h4>
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-purple-100 text-xs">This month</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
            <h4 className="text-orange-100 text-sm mb-1">Emergency Drills</h4>
            <p className="text-2xl font-bold">4</p>
            <p className="text-orange-100 text-xs">This quarter</p>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Visitor Analytics',
              icon: Users,
              color: 'blue',
              reports: ['Daily Visitor Log', 'Peak Hours Analysis', 'Visitor Type Breakdown', 'Check-in/out Times']
            },
            {
              title: 'Security Reports',
              icon: Shield,
              color: 'red',
              reports: ['Screening Results', 'Watchlist Matches', 'Denied Entry Log', 'Security Incidents']
            },
            {
              title: 'Emergency Preparedness',
              icon: AlertTriangle,
              color: 'orange',
              reports: ['Drill Performance', 'Response Times', 'Evacuation Routes', 'Communication Logs']
            },
            {
              title: 'Event Management',
              icon: Calendar,
              color: 'purple',
              reports: ['Event Attendance', 'Pre-registration Stats', 'Badge Printing Logs', 'Guest Lists']
            },
            {
              title: 'Volunteer Tracking',
              icon: UserCheck,
              color: 'teal',
              reports: ['Volunteer Hours', 'Background Checks', 'Schedule Compliance', 'Performance Metrics']
            },
            {
              title: 'System Analytics',
              icon: BarChart3,
              color: 'indigo',
              reports: ['System Usage', 'API Response Times', 'Device Status', 'Integration Health']
            }
          ].map((category, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <category.icon className={`h-6 w-6 text-${category.color}-500 mr-3`} />
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-2">
                {category.reports.map((report, reportIndex) => (
                  <button 
                    key={reportIndex}
                    className={`w-full text-left p-2 text-sm rounded hover:bg-${category.color}-50 transition-colors flex items-center justify-between`}
                  >
                    <span>{report}</span>
                    <Download className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
              
              <button className={`w-full mt-4 bg-${category.color}-500 text-white p-2 rounded hover:bg-${category.color}-600 transition-colors text-sm`}>
                Generate Custom Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Report Generator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Visitor Summary</option>
              <option>Security Screening</option>
              <option>Emergency Drill</option>
              <option>Volunteer Hours</option>
              <option>Event Attendance</option>
              <option>System Usage</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>PDF Report</option>
              <option>Excel Spreadsheet</option>
              <option>CSV Data</option>
              <option>Email Summary</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </button>
          
          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </button>
          
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Weekly Visitor Summary', date: '2024-07-22', type: 'PDF', size: '2.3 MB', status: 'completed' },
            { name: 'Security Screening Report', date: '2024-07-21', type: 'Excel', size: '1.8 MB', status: 'completed' },
            { name: 'Emergency Drill Analysis', date: '2024-07-20', type: 'PDF', size: '4.1 MB', status: 'completed' },
            { name: 'Volunteer Hours Report', date: '2024-07-19', type: 'CSV', size: '892 KB', status: 'completed' },
            { name: 'Monthly Event Summary', date: '2024-07-18', type: 'PDF', size: '3.2 MB', status: 'generating' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.date} • {report.type} • {report.size}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  report.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
                
                {report.status === 'completed' && (
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">SchoolGuard Pro</h1>
              </div>
              <span className="text-sm text-gray-500">Comprehensive School Safety System</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${emergencyStatus.active ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm font-medium">
                  {emergencyStatus.active ? `${emergencyStatus.type?.toUpperCase()} ACTIVE` : 'System Normal'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeView === item.id ? item.color : 'bg-gray-100'
                }`}>
                  <item.icon className={`h-5 w-5 ${
                    activeView === item.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'visitor-checkin' && renderVisitorCheckin()}
          {activeView === 'security' && renderSecurity()}
          {activeView === 'events' && renderEvents()}
          {activeView === 'emergency' && renderEmergency()}
          {activeView === 'volunteers' && renderVolunteers()}
          {activeView === 'reports' && renderReports()}
        </main>
      </div>
    </div>
  );
};

export default SchoolSafetySystem;