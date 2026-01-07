import { Users, Shield, AlertTriangle, Calendar, UserCheck, BarChart3, FileText, Download, Mail, TrendingUp, Activity, Clock, CheckCircle } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-3 text-white">Reports & Analytics Dashboard</h2>
          <p className="text-indigo-100 text-lg">Comprehensive insights and data-driven decisions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Key Metrics */}
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h4 className="text-blue-600 text-sm mb-1 font-semibold">Daily Visitors</h4>
            <p className="text-3xl font-bold mb-1">127</p>
            <p className="text-green-600 text-xs font-semibold">↑ +12% from yesterday</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <h4 className="text-green-600 text-sm mb-1 font-semibold">Security Screenings</h4>
            <p className="text-3xl font-bold mb-1">98.2%</p>
            <p className="text-green-600 text-xs font-semibold">Pass rate</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <h4 className="text-purple-600 text-sm mb-1 font-semibold">Volunteer Hours</h4>
            <p className="text-3xl font-bold mb-1">1,247</p>
            <p className="text-purple-600 text-xs font-semibold">This month</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h4 className="text-orange-600 text-sm mb-1 font-semibold">Emergency Drills</h4>
            <p className="text-3xl font-bold mb-1">4</p>
            <p className="text-orange-600 text-xs font-semibold">This quarter</p>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: 'Visitor Analytics',
              icon: Users,
              color: 'blue',
              bgColor: 'blue-50',
              reports: ['Daily Visitor Log', 'Peak Hours Analysis', 'Visitor Type Breakdown', 'Check-in/out Times']
            },
            {
              title: 'Security Reports',
              icon: Shield,
              color: 'red',
              bgColor: 'red-50',
              reports: ['Screening Results', 'Watchlist Matches', 'Denied Entry Log', 'Security Incidents']
            },
            {
              title: 'Emergency Preparedness',
              icon: AlertTriangle,
              color: 'orange',
              bgColor: 'orange-50',
              reports: ['Drill Performance', 'Response Times', 'Evacuation Routes', 'Communication Logs']
            },
            {
              title: 'Event Management',
              icon: Calendar,
              color: 'purple',
              bgColor: 'purple-50',
              reports: ['Event Attendance', 'Pre-registration Stats', 'Badge Printing Logs', 'Guest Lists']
            },
            {
              title: 'Volunteer Tracking',
              icon: UserCheck,
              color: 'teal',
              bgColor: 'teal-50',
              reports: ['Volunteer Hours', 'Background Checks', 'Schedule Compliance', 'Performance Metrics']
            },
            {
              title: 'System Analytics',
              icon: BarChart3,
              color: 'indigo',
              bgColor: 'indigo-50',
              reports: ['System Usage', 'API Response Times', 'Device Status', 'Integration Health']
            }
          ].map((category, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-${category.color}-300 hover:shadow-xl transition-all">
              <div className="flex items-center mb-5">
                <div className={`p-3 bg-${category.bgColor} rounded-xl mr-3`}>
                  <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                </div>
                <h3 className="font-bold text-lg text-gray-800">{category.title}</h3>
              </div>
              
              <div className="space-y-2 mb-5">
                {category.reports.map((report, reportIndex) => (
                  <button 
                    key={reportIndex}
                    className="w-full text-left p-3 text-sm rounded-lg hover:bg-gray-50 transition-all flex items-center justify-between font-medium text-gray-700 border border-gray-100 hover:border-${category.color}-200"
                  >
                    <span>{report}</span>
                    <Download className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
              
              <button className={`w-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white p-3 rounded-xl hover:from-${category.color}-600 hover:to-${category.color}-700 transition-all text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
                <FileText className="h-4 w-4" />
                Generate Custom Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          Quick Report Generator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-gray-700 flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-500" />
              Report Type
            </label>
            <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
              <option>Visitor Summary</option>
              <option>Security Screening</option>
              <option>Emergency Drill</option>
              <option>Volunteer Hours</option>
              <option>Event Attendance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-3 text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              Date Range
            </label>
            <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-3 text-gray-700 flex items-center gap-2">
              <Download className="h-4 w-4 text-indigo-500" />
              Format
            </label>
            <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
              <option>PDF Report</option>
              <option>Excel Spreadsheet</option>
              <option>CSV Data</option>
              <option>Email Summary</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-xl">
            <FileText className="h-5 w-5" />
            Generate Report
          </button>
          
          <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-xl">
            <Calendar className="h-5 w-5" />
            Schedule Report
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-xl">
            <Mail className="h-5 w-5" />
            Email Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          Recent Reports
        </h3>
        
        <div className="space-y-4">
          {[
            { name: 'Weekly Visitor Summary', date: '2024-07-22', type: 'PDF', size: '2.3 MB', status: 'completed' },
            { name: 'Security Screening Report', date: '2024-07-21', type: 'Excel', size: '1.8 MB', status: 'completed' },
            { name: 'Emergency Drill Analysis', date: '2024-07-20', type: 'PDF', size: '4.1 MB', status: 'completed' },
            { name: 'Volunteer Hours Report', date: '2024-07-19', type: 'CSV', size: '892 KB', status: 'completed' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{report.name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3" />
                    {report.date} • {report.type} • {report.size}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-green-500 text-white shadow-md">
                  {report.status}
                </span>
                
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm hover:from-blue-600 hover:to-blue-700 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
