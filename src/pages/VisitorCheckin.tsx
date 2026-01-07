import { useState } from 'react';
import { CheckCircle, Scan, Zap, Clock, User, MapPin, FileText, Printer, Search, Download, Edit, Trash2, Eye, Bell, AlertTriangle, Info, X } from 'lucide-react';
import { Visitor, VisitorStats } from '../types';

interface VisitorNotification {
  id: number;
  type: 'info' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const VisitorCheckin = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      organization: 'ABC Company',
      purpose: 'Parent Meeting',
      personToVisit: 'Mrs. Wilson (3rd Grade)',
      expectedDuration: '1 hour',
      visitorType: 'frequent',
      checkInTime: '2024-07-29T09:30:00',
      badgeId: 'V001',
      status: 'checked_in',
      screeningStatus: 'approved'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Brown',
      email: 'mike.brown@email.com',
      phone: '(555) 234-5678',
      organization: 'XYZ Delivery',
      purpose: 'Delivery',
      personToVisit: 'Loading Dock',
      expectedDuration: '30 minutes',
      visitorType: 'first_time',
      checkInTime: '2024-07-29T10:15:00',
      badgeId: 'V002',
      status: 'checked_in',
      screeningStatus: 'approved'
    },
    {
      id: 3,
      firstName: 'Lisa',
      lastName: 'Chen',
      email: 'lisa.chen@email.com',
      phone: '(555) 345-6789',
      organization: 'Community College',
      purpose: 'Guest Speaker',
      personToVisit: 'Mr. Davis (Science Dept)',
      expectedDuration: '2 hours',
      visitorType: 'pre_registered',
      checkInTime: '2024-07-29T08:45:00',
      badgeId: 'V003',
      status: 'checked_in',
      screeningStatus: 'approved'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      phone: '(555) 456-7890',
      organization: 'Facilities Inc',
      purpose: 'Maintenance',
      personToVisit: 'Head of Facilities',
      expectedDuration: 'Half day',
      visitorType: 'frequent',
      checkInTime: '2024-07-29T11:00:00',
      badgeId: 'V004',
      status: 'checked_in',
      screeningStatus: 'approved'
    }
  ]);

  const [visitorStats] = useState<VisitorStats>({
    totalVisitors: 127,
    checkedIn: 4,
    checkedOut: 120,
    pending: 0,
    flagged: 1,
    approved: 126
  });

  const [activeTab, setActiveTab] = useState<'checkin' | 'history' | 'analytics'>('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'checked_in' | 'checked_out' | 'pending'>('all');
  const [filterType, setFilterType] = useState<'all' | 'first_time' | 'frequent' | 'pre_registered'>('all');
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState<{start: string | null, end: string | null}>({start: null, end: null});
  const [showScanner, setShowScanner] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [notifications, setNotifications] = useState<VisitorNotification[]>([
    {
      id: 1,
      type: 'alert',
      title: 'Flagged Visitor',
      message: 'Visitor Sarah Johnson has been flagged in the system',
      timestamp: '2024-07-29T09:30:00',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pending Approval',
      message: 'Visitor Mike Brown requires approval',
      timestamp: '2024-07-29T10:15:00',
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Simulate ID scanning
  const handleScanId = () => {
    setShowScanner(true);
    // In a real app, this would connect to an ID scanner
    setTimeout(() => {
      setShowScanner(false);
      // Auto-fill form with scanned data
      alert('ID scanned successfully! Form auto-filled.');
    }, 2000);
  };

  // Handle check-in submission
  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Visitor checked in successfully!');
    
    // Add notification for new check-in
    const newNotification: VisitorNotification = {
      id: notifications.length + 1,
      type: 'info',
      title: 'New Visitor Check-In',
      message: 'A new visitor has been checked in',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications([newNotification, ...notifications]);
    
    // In a real app, this would save to database
  };

  // Handle check-out
  const handleCheckOut = (id: number) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id 
        ? { ...visitor, status: 'checked_out', checkOutTime: new Date().toISOString() } 
        : visitor
    ));
    
    // Add notification for check-out
    const visitor = visitors.find(v => v.id === id);
    if (visitor) {
      const newNotification: VisitorNotification = {
        id: notifications.length + 1,
        type: 'info',
        title: 'Visitor Check-Out',
        message: `${visitor.firstName} ${visitor.lastName} has checked out`,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setNotifications([newNotification, ...notifications]);
    }
    
    alert('Visitor checked out successfully!');
  };

  // Generate and show visitor badge
  const generateBadge = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setShowBadge(true);
  };

  // Print visitor badge
  const printBadge = () => {
    window.print();
  };

  // Close badge modal
  const closeBadge = () => {
    setShowBadge(false);
    setSelectedVisitor(null);
  };

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
  };

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter visitors based on search and filter criteria
  const filteredVisitors = visitors.filter(visitor => {
    // Search term filter
    const matchesSearch = visitor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         visitor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.badgeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (visitor.email && visitor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (visitor.phone && visitor.phone.includes(searchTerm)) ||
                         (visitor.organization && visitor.organization.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || visitor.status === filterStatus;
    
    // Visitor type filter
    const matchesType = filterType === 'all' || visitor.visitorType === filterType;
    
    // Purpose filter
    const matchesPurpose = filterPurpose === 'all' || visitor.purpose === filterPurpose;
    
    // Date range filter
    let matchesDateRange = true;
    if (filterDateRange.start && filterDateRange.end) {
      const visitDate = new Date(visitor.checkInTime);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      matchesDateRange = visitDate >= startDate && visitDate <= endDate;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesPurpose && matchesDateRange;
  });

  // Get unique purposes for the filter dropdown
  const getPurposeOptions = () => {
    const purposes = visitors.map(v => v.purpose);
    return [...new Set(purposes)];
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterType('all');
    setFilterPurpose('all');
    setFilterDateRange({start: null, end: null});
  };

  return (
    <div className="space-y-6">
      {/* Header with Notifications */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Visitor Management</h1>
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all relative"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          {notification.type === 'alert' && (
                            <div className="mt-1 p-1 bg-red-100 rounded-full">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          )}
                          {notification.type === 'warning' && (
                            <div className="mt-1 p-1 bg-yellow-100 rounded-full">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </div>
                          )}
                          {notification.type === 'info' && (
                            <div className="mt-1 p-1 bg-blue-100 rounded-full">
                              <Info className="h-4 w-4 text-blue-500" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-500 hover:text-blue-700"
                            >
                              Mark as read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'checkin' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Check-In Station
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Visitor History
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'analytics' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Check-In Station Tab */}
      {activeTab === 'checkin' && (
        <>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Visitor Check-In Station</h2>
              <p className="text-blue-100 text-lg">Secure, fast, and integrated visitor management</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* ID Scanning Section */}
              <div className="space-y-6">
                <div className="border-4 border-dashed border-white/30 rounded-2xl p-10 text-center bg-white/10 backdrop-blur-md relative">
                  {showScanner ? (
                    <>
                      <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
                          <p className="font-bold text-lg">Scanning ID...</p>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <Scan className="h-20 w-20 text-white mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-3 text-white">Scan ID Document</h3>
                  <p className="text-blue-100 mb-6 text-lg">Place driver's license, passport, or military ID on scanner</p>
                  <button 
                    onClick={handleScanId}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-2xl font-bold text-lg hover:scale-105"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <Scan className="h-5 w-5" />
                      Start Scan & Security Check
                    </div>
                  </button>
                </div>
              </div>

              {/* Visitor Information Form */}
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 mb-4 shadow-lg">
                  <p className="text-white font-bold text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Complete security screening first, then fill out visitor information
                  </p>
                </div>
                
                <form onSubmit={handleCheckIn} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-white flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                        placeholder="First Name"
                      />
                      <input 
                        type="text" 
                        className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                        placeholder="visitor@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-white flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Purpose of Visit
                    </label>
                    <select className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all">
                      <option className="text-gray-800">Select purpose</option>
                      <option className="text-gray-800">Parent Meeting</option>
                      <option className="text-gray-800">Volunteer Work</option>
                      <option className="text-gray-800">Delivery/Service</option>
                      <option className="text-gray-800">Guest Speaker</option>
                      <option className="text-gray-800">Student Pickup</option>
                      <option className="text-gray-800">Job Interview</option>
                      <option className="text-gray-800">Conference/Workshop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Person/Department to Visit
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                      placeholder="Teacher name or department"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Expected Duration
                      </label>
                      <select className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl">
                        <option className="text-gray-800">30 minutes</option>
                        <option className="text-gray-800">1 hour</option>
                        <option className="text-gray-800">2 hours</option>
                        <option className="text-gray-800">Half day</option>
                        <option className="text-gray-800">Full day</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white">Visitor Type</label>
                      <select className="w-full p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl">
                        <option className="text-gray-800">First Time</option>
                        <option className="text-gray-800">Frequent Visitor</option>
                        <option className="text-gray-800">Pre-Registered</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-white text-blue-600 py-5 rounded-xl text-lg font-bold hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Complete Check-In & Print Badge
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Check-In for Frequent Visitors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 gap-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <span>Quick Re-Entry (Frequent Visitors)</span>
                <p className="text-sm text-gray-500 font-normal mt-1">Express check-in for recognized visitors</p>
              </div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-5 font-medium">Recognized visitors can use express check-in</p>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                      placeholder="Search by name or scan QR code"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Check-In
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-gray-700">Recent Frequent Visitors</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Johnson', role: 'Parent Volunteer', lastVisit: 'Yesterday' },
                    { name: 'Mike Davis', role: 'Maintenance', lastVisit: '2 days ago' },
                    { name: 'Lisa Chen', role: 'Guest Speaker', lastVisit: '1 week ago' }
                  ].map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-100 hover:border-yellow-300 hover:shadow-md transition-all">
                      <div>
                        <p className="font-bold text-sm text-gray-800">{visitor.name}</p>
                        <p className="text-xs text-gray-600">{visitor.role} • {visitor.lastVisit}</p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all">
                        Quick Check-In
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Visitors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Currently On Campus</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                    placeholder="Search visitors..."
                  />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="checked_in">Checked In</option>
                  <option value="checked_out">Checked Out</option>
                  <option value="pending">Pending</option>
                </select>
                <button 
                  onClick={() => {
                    const purpose = prompt('Enter purpose to filter by:');
                    if (purpose !== null) setFilterPurpose(purpose || 'all');
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-gray-50 hover:bg-gray-100"
                >
                  Filter by Purpose
                </button>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-gray-50 hover:bg-gray-100"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredVisitors
                .filter(v => v.status === 'checked_in')
                .map((visitor) => (
                  <div key={visitor.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:border-green-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-800">{visitor.firstName} {visitor.lastName}</h4>
                      <span className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md">
                        {visitor.badgeId}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 font-medium">{visitor.purpose}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        {visitor.personToVisit}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Since {new Date(visitor.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleCheckOut(visitor.id)}
                      className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Print Badge
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </>
      )}

      {/* Visitor History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Visitor History</h3>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  placeholder="Search visitors..."
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              >
                <option value="all">All Status</option>
                <option value="checked_in">Checked In</option>
                <option value="checked_out">Checked Out</option>
                <option value="pending">Pending</option>
              </select>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              >
                <option value="all">All Types</option>
                <option value="first_time">First Time</option>
                <option value="frequent">Frequent</option>
                <option value="pre_registered">Pre-Registered</option>
              </select>
              <select 
                value={filterPurpose}
                onChange={(e) => setFilterPurpose(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              >
                <option value="all">All Purposes</option>
                {getPurposeOptions().map((purpose, index) => (
                  <option key={index} value={purpose}>{purpose}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={filterDateRange.start || ''}
                  onChange={(e) => setFilterDateRange({...filterDateRange, start: e.target.value})}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
                <span className="text-gray-500">to</span>
                <input 
                  type="date" 
                  value={filterDateRange.end || ''}
                  onChange={(e) => setFilterDateRange({...filterDateRange, end: e.target.value})}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
              </div>
              <button 
                onClick={resetFilters}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-gray-50 hover:bg-gray-100"
              >
                Reset
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left p-4 font-bold text-gray-700">Visitor</th>
                  <th className="text-left p-4 font-bold text-gray-700">Purpose</th>
                  <th className="text-left p-4 font-bold text-gray-700">Person Visiting</th>
                  <th className="text-left p-4 font-bold text-gray-700">Check-In</th>
                  <th className="text-left p-4 font-bold text-gray-700">Check-Out</th>
                  <th className="text-left p-4 font-bold text-gray-700">Badge ID</th>
                  <th className="text-left p-4 font-bold text-gray-700">Status</th>
                  <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-gray-800">{visitor.firstName} {visitor.lastName}</p>
                        <p className="text-sm text-gray-600">{visitor.organization}</p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">{visitor.purpose}</td>
                    <td className="p-4 text-gray-600">{visitor.personToVisit}</td>
                    <td className="p-4 text-gray-600">{new Date(visitor.checkInTime).toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{visitor.checkOutTime ? new Date(visitor.checkOutTime).toLocaleString() : '-'}</td>
                    <td className="p-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500 text-white shadow-md">
                        {visitor.badgeId}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${visitor.status === 'checked_in' ? 'bg-green-500 text-white' : visitor.status === 'checked_out' ? 'bg-gray-500 text-white' : 'bg-yellow-500 text-white'}`}>
                        {visitor.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const visitorData = visitors.find(v => v.id === visitor.id);
                            if (visitorData) generateBadge(visitorData);
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-500 hover:bg-green-100 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600 text-sm">Showing {filteredVisitors.length} of {visitors.length} visitors</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Visitor Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Total Visitors</p>
                <p className="text-3xl font-bold">{visitorStats.totalVisitors}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Currently On Campus</p>
                <p className="text-3xl font-bold">{visitorStats.checkedIn}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Checked Out</p>
                <p className="text-3xl font-bold">{visitorStats.checkedOut}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Pending Approval</p>
                <p className="text-3xl font-bold">{visitorStats.pending}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Flagged Visitors</p>
                <p className="text-3xl font-bold">{visitorStats.flagged}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <p className="text-indigo-100 text-sm mb-1">Approved Today</p>
                <p className="text-3xl font-bold">{visitorStats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                Visitor Types
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'First Time', count: 42, percentage: 33 },
                  { type: 'Frequent', count: 58, percentage: 46 },
                  { type: 'Pre-Registered', count: 27, percentage: 21 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{item.type}</span>
                      <span className="text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" 
                        style={{ width: item.percentage + '%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                Visit Purposes
              </h3>
              <div className="space-y-4">
                {[
                  { purpose: 'Parent Meetings', count: 35, percentage: 28 },
                  { purpose: 'Volunteer Work', count: 28, percentage: 22 },
                  { purpose: 'Deliveries', count: 22, percentage: 17 },
                  { purpose: 'Guest Speakers', count: 18, percentage: 14 },
                  { purpose: 'Other', count: 24, percentage: 19 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{item.purpose}</span>
                      <span className="text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full" 
                        style={{ width: item.percentage + '%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Printer className="h-5 w-5 text-purple-600" />
                </div>
                Recent Check-Ins
              </h3>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print Report
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left p-4 font-bold text-gray-700">Time</th>
                    <th className="text-left p-4 font-bold text-gray-700">Visitor</th>
                    <th className="text-left p-4 font-bold text-gray-700">Purpose</th>
                    <th className="text-left p-4 font-bold text-gray-700">Person Visiting</th>
                    <th className="text-left p-4 font-bold text-gray-700">Badge ID</th>
                    <th className="text-left p-4 font-bold text-gray-700">Screening</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors
                    .filter(v => v.status === 'checked_in')
                    .map((visitor) => (
                      <tr key={visitor.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                        <td className="p-4 text-gray-600">{new Date(visitor.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-gray-800">{visitor.firstName} {visitor.lastName}</p>
                            <p className="text-sm text-gray-600">{visitor.organization}</p>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-700">{visitor.purpose}</td>
                        <td className="p-4 text-gray-600">{visitor.personToVisit}</td>
                        <td className="p-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500 text-white shadow-md">
                            {visitor.badgeId}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${visitor.screeningStatus === 'approved' ? 'bg-green-500 text-white' : visitor.screeningStatus === 'flagged' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {visitor.screeningStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Visitor Badge Modal */}
      {showBadge && selectedVisitor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Visitor Badge</h3>
                  <p className="text-blue-100">Valid for today only</p>
                </div>
                <button 
                  onClick={closeBadge}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  {selectedVisitor.photoUrl ? (
                    <img 
                      src={selectedVisitor.photoUrl} 
                      alt={`${selectedVisitor.firstName} ${selectedVisitor.lastName}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedVisitor.firstName} {selectedVisitor.lastName}
                </h2>
                <p className="text-gray-600">{selectedVisitor.organization || 'Visitor'}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Badge ID:</span>
                  <span className="font-bold text-lg">{selectedVisitor.badgeId}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium">{selectedVisitor.purpose}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Visiting:</span>
                  <span className="font-medium">{selectedVisitor.personToVisit}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Check-In Time:</span>
                  <span className="font-medium">
                    {new Date(selectedVisitor.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Expected Duration:</span>
                  <span className="font-medium">{selectedVisitor.expectedDuration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedVisitor.status === 'checked_in' ? 'bg-green-500 text-white' : 
                    selectedVisitor.status === 'checked_out' ? 'bg-gray-500 text-white' : 
                    'bg-yellow-500 text-white'
                  }`}>
                    {selectedVisitor.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={printBadge}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Printer className="h-5 w-5" />
                  Print Badge
                </button>
                <button
                  onClick={closeBadge}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorCheckin;