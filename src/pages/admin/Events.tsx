import { Calendar, Users, Download, Clock, MapPin, UserPlus, Mail, FileText, CheckCircle, BarChart } from 'lucide-react';

const Events = () => {
  const events = [
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
      organizer: 'Mrs. Johnson',
      attendees: []
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
      organizer: 'Principal Davis',
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
      organizer: 'Music Department',
      attendees: []
    }
  ];

  return (
    <div className="space-y-6">
      {/* EventSafe Management Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">EventSafe Management</h2>
            <p className="text-purple-100">Manage and monitor all school events with integrated security</p>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Create New Event
          </button>
        </div>

        {/* Event Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600">+2 this week</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{events.length}</p>
            <p className="text-sm text-gray-600 font-medium">Active Events</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">85% capacity</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">
              {events.reduce((sum, event) => sum + event.preRegistrations, 0)}
            </p>
            <p className="text-sm text-gray-600 font-medium">Total Pre-Registered</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">Real-time</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-sm text-gray-600 font-medium">Checked In Today</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-amber-600">Auto-screen</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-sm text-gray-600 font-medium">Pending Screening</p>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Upcoming Events</h3>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">All</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Upcoming</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">Past</button>
              </div>
            </div>
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-xl text-gray-800">{event.name}</h4>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                          event.status === 'Active Registration' ? 'bg-green-500 text-white' :
                          event.status === 'Screening Complete' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{event.time} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-5">
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                      <p className="text-xs text-purple-600 font-medium mb-1">Pre-Registered</p>
                      <p className="font-bold text-2xl text-purple-700">{event.preRegistrations}<span className="text-sm text-gray-500">/{event.maxCapacity}</span></p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-xs text-green-600 font-medium mb-1">Checked In</p>
                      <p className="font-bold text-2xl text-green-700">{event.checkedIn}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-xs text-blue-600 font-medium mb-1">Event Type</p>
                      <p className="font-semibold text-sm text-blue-800">{event.type}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-xs text-amber-600 font-medium mb-1">Organizer</p>
                      <p className="font-semibold text-sm text-amber-800">{event.organizer}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Manage Event
                    </button>
                    <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Print Badges
                    </button>
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send Reminders
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Registration
                    </button>
                  </div>
                  
                  {/* Registration Progress Bar */}
                  <div className="mt-5 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-purple-500" />
                        Registration Progress
                      </span>
                      <span className="text-purple-600">{Math.round((event.preRegistrations / event.maxCapacity) * 100)}% Filled</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${Math.min((event.preRegistrations / event.maxCapacity) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3.5 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                Manual Registration
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                Bulk Badge Print
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Export Guest Lists
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <BarChart className="h-4 w-4" />
                Generate QR Codes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              Registration Statistics
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-sm font-medium text-gray-700">Today's RSVPs</span>
                <span className="font-bold text-lg text-blue-600">15</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <span className="text-sm font-medium text-gray-700">Screening Pending</span>
                <span className="font-bold text-lg text-yellow-600">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-sm font-medium text-gray-700">Approved Visitors</span>
                <span className="font-bold text-lg text-green-600">261</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="text-sm font-medium text-gray-700">Flagged/Denied</span>
                <span className="font-bold text-lg text-red-600">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
