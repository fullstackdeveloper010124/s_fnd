import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield,Clock,RefreshCw,Users,Bell,Calendar,Zap,UserPlus,AlertTriangle,FileText,TrendingUp,BarChart3,Activity, 
  MapPin,UserCheck } from 'lucide-react';
import { 
  AreaChart,Area,PieChart,Pie,Cell,BarChart,Bar,LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts';

import { EmergencyStatus } from '../types';

interface DashboardProps {
  currentTime: Date;
  emergencyStatus: EmergencyStatus;
  visitorCount: number;
  onNavigate?: (section: string) => void;
}



interface ActivityItem {
  type: string;
  name: string;
  action: string;
  time: string;
  status: string;
  icon: React.ElementType;
  color: string;
}

const Dashboard: React.FC<DashboardProps> = ({ currentTime, emergencyStatus, visitorCount, onNavigate }) => {
  const navigate = useNavigate();

  // Check if user is an admin and redirect to admin dashboard if so
  useEffect(() => {
    // In a real app, you would check user role from context or auth state
    // For now, we'll check if a specific item exists in localStorage that indicates admin role
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'admin' || userData.role === 'teacher') {
          navigate('/admin/dashboard');
        }
      } catch (e) {
        console.log('Could not parse user data');
      }
    }
  }, [navigate]);
  // State declarations
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorTrendData, setVisitorTrendData] = useState<any[]>([]);
  const [securityData, setSecurityData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  // Mock data initialization
  useEffect(() => {
    // Initialize mock data
    setVisitorTrendData([
      { time: '9 AM', visitors: 5, volunteers: 2 },
      { time: '11 AM', visitors: 12, volunteers: 3 },
      { time: '1 PM', visitors: 20, volunteers: 5 },
      { time: '3 PM', visitors: 18, volunteers: 4 },
      { time: '5 PM', visitors: 10, volunteers: 2 }
    ]);

    setSecurityData([
      { name: 'Passed', value: 85, color: '#10b981' },
      { name: 'Flagged', value: 10, color: '#f59e0b' },
      { name: 'Denied', value: 5, color: '#ef4444' }
    ]);

    setLocationData([
      { location: 'Main Building', count: 25 },
      { location: 'Gymnasium', count: 10 },
      { location: 'Auditorium', count: 7 }
    ]);

    setWeeklyData([
      { day: 'Mon', visitors: 32, events: 2 },
      { day: 'Tue', visitors: 45, events: 3 },
      { day: 'Wed', visitors: 38, events: 1 },
      { day: 'Thu', visitors: 52, events: 4 },
      { day: 'Fri', visitors: 48, events: 2 }
    ]);

    // Simulate loading completion
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Simulate auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const refreshData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Update mock data with new values
      // Note: visitorCount is now passed as a prop
    }, 800);
  };

  return (
    <div className="space-y-6">
      {loading && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg font-medium text-gray-700">Loading dashboard data...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
          <p className="font-bold">Error Loading Dashboard Data</p>
          <p>{error}</p>
          <button 
            onClick={refreshData}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      )}
      
      {!loading && !error && (
        <>
          {/* Welcome Banner - Enhanced with gradient animation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20 -ml-32 -mb-32"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight">SchoolGuard Pro</h2>
                </div>
                <p className="text-lg text-blue-100 mb-4 font-medium">🎯 Real-time Security & Visitor Management</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400"></div>
                    <span className="text-sm font-semibold">All Systems Operational</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-semibold">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <button 
                    onClick={refreshData}
                    disabled={loading}
                    className="flex items-center space-x-1 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-semibold">{loading ? 'Refreshing...' : 'Refresh'}</span>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 shadow-2xl">
                  <p className="text-sm mb-2 font-semibold text-blue-100">Campus Status</p>
                  <div className="text-6xl mb-2">{emergencyStatus.active ? '⚠️' : '✓'}</div>
                  <p className="text-lg font-bold">{emergencyStatus.active ? 'Alert Active' : '🔒 Secure'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-blue-100 hover:border-blue-300 hover:scale-105 transform">
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl -mr-20 -mt-20 group-hover:animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-30 rounded-2xl p-3 backdrop-blur-sm">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      <span className="text-white text-xs bg-green-500 px-3 py-1 rounded-full font-semibold shadow-lg">Live</span>
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm font-semibold tracking-wide">Visitors On Campus</p>
                  <p className="text-5xl font-black text-white mt-3 mb-1">{visitorCount}</p>
                  <div className="flex items-center space-x-1 text-green-300">
                    <span className="text-xl">↑</span>
                    <p className="text-sm font-semibold">8% from yesterday</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Currently Active</span>
                  <span className="font-bold text-blue-700 text-lg">{visitorCount - 5}</span>
                </div>
              </div>
            </div>
            
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-green-100 hover:border-green-300 hover:scale-105 transform">
              <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-lime-300 opacity-20 rounded-full blur-2xl -mr-20 -mt-20 group-hover:animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-30 rounded-2xl p-3 backdrop-blur-sm">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse absolute"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <p className="text-green-100 text-sm font-semibold tracking-wide">Security Status</p>
                  <p className="text-4xl font-black text-white mt-3 mb-1">✓ All Clear</p>
                  <p className="text-green-200 text-sm font-semibold">🎯 98.5% screening success</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-green-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Last Scan</span>
                  <span className="font-bold text-green-700">2 min ago</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-orange-100 hover:border-orange-300 hover:scale-105 transform">
              <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-300 opacity-20 rounded-full blur-2xl -mr-20 -mt-20 group-hover:animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-30 rounded-2xl p-3 backdrop-blur-sm">
                      <Bell className="h-8 w-8 text-white" />
                    </div>
                    {emergencyStatus.active ? (
                      <span className="text-white text-xs bg-red-600 px-3 py-1 rounded-full animate-pulse font-semibold shadow-lg">Active</span>
                    ) : (
                      <span className="text-white text-xs bg-green-500 px-3 py-1 rounded-full font-semibold">Clear</span>
                    )}
                  </div>
                  <p className="text-orange-100 text-sm font-semibold tracking-wide">Active Alerts</p>
                  <p className="text-5xl font-black text-white mt-3 mb-1">{emergencyStatus.active ? 1 : 0}</p>
                  <p className="text-orange-200 text-sm font-semibold">📡 System monitoring</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Priority Level</span>
                  <span className="font-bold text-orange-700 text-lg">{emergencyStatus.active ? 'HIGH' : 'Normal'}</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-100 hover:border-purple-300 hover:scale-105 transform">
              <div className="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 opacity-20 rounded-full blur-2xl -mr-20 -mt-20 group-hover:animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-30 rounded-2xl p-3 backdrop-blur-sm">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-white text-xs bg-white bg-opacity-30 px-3 py-1 rounded-full font-semibold backdrop-blur-sm">Today</span>
                  </div>
                  <p className="text-purple-100 text-sm font-semibold tracking-wide">Today's Events</p>
                  <p className="text-5xl font-black text-white mt-3 mb-1">3</p>
                  <p className="text-purple-200 text-sm font-semibold">🎉 124 pre-registered</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Next Event</span>
                  <span className="font-bold text-purple-700 text-lg">9:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar - More Vibrant */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
            <h3 className="text-2xl font-black mb-6 flex items-center text-gray-800">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mr-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              ⚡ Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <button 
                onClick={() => onNavigate?.('visitor-checkin')}
                className="group relative bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 border-2 border-blue-300"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                <UserPlus className="h-8 w-8 mx-auto mb-3 group-hover:scale-125 transition-transform" />
                <p className="font-bold text-sm">Check-In Visitor</p>
              </button>
              <button 
                onClick={() => onNavigate?.('security')}
                className="group relative bg-gradient-to-br from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:via-rose-600 hover:to-red-700 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-red-500/50 border-2 border-red-300"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                <Shield className="h-8 w-8 mx-auto mb-3 group-hover:scale-125 transition-transform" />
                <p className="font-bold text-sm">Run Screening</p>
              </button>
              <button 
                onClick={() => onNavigate?.('emergency')}
                className="group relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-orange-500/50 border-2 border-orange-300"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                <AlertTriangle className="h-8 w-8 mx-auto mb-3 group-hover:scale-125 transition-transform" />
                <p className="font-bold text-sm">Emergency</p>
              </button>
              <button 
                onClick={() => onNavigate?.('reports')}
                className="group relative bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-indigo-500/50 border-2 border-indigo-300"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                <FileText className="h-8 w-8 mx-auto mb-3 group-hover:scale-125 transition-transform" />
                <p className="font-bold text-sm">View Reports</p>
              </button>
            </div>
          </div>

          {/* Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitor Trends Chart */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mr-3">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Today's Visitor Flow
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Live Data</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={visitorTrendData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #3b82f6',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" name="Visitors" />
                  <Area type="monotone" dataKey="volunteers" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVolunteers)" name="Volunteers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Security Screening Stats */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mr-3">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  Security Screenings
                </h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">This Week</span>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={securityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${percent ? (percent * 100).toFixed(0) : 0}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {securityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #10b981',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Location Distribution */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Visitors by Location
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Real-time</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="location" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #a855f7',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} name="Visitors">
                    {locationData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${270 + index * 15}, 70%, 60%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Comparison */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl mr-3">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Weekly Overview
                </h3>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Last 7 Days</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #f97316',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  <Line type="monotone" dataKey="visitors" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Visitors" />
                  <Line type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Events" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Activity & Campus Map - Enhanced */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mr-3">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  📊 Live Activity Feed
                </h3>
                <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-300">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-400"></div>
                  <span className="text-sm font-bold text-green-700">Live</span>
                </div>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {[
                  { type: 'checkin', name: 'Sarah Johnson', action: 'checked in as Parent Volunteer', time: '2 min ago', status: 'approved', icon: UserCheck, color: 'green' },
                  { type: 'checkout', name: 'Mike Davis', action: 'checked out', time: '5 min ago', status: 'completed', icon: Users, color: 'blue' },
                  { type: 'screening', name: 'Unknown Visitor', action: 'flagged by security screening', time: '8 min ago', status: 'flagged', icon: AlertTriangle, color: 'red' },
                  { type: 'event', name: 'Science Fair Setup', action: 'pre-registration opened', time: '15 min ago', status: 'info', icon: Calendar, color: 'purple' },
                  { type: 'volunteer', name: 'Lisa Chen', action: 'logged 3 hours of volunteer time', time: '22 min ago', status: 'completed', icon: Clock, color: 'teal' },
                  { type: 'screening', name: 'David Wilson', action: 'passed security screening', time: '28 min ago', status: 'approved', icon: Shield, color: 'emerald' }
                ].map((activity, index) => (
                  <div key={index} className={`group hover:shadow-xl p-5 rounded-2xl transition-all duration-300 border-2 hover:scale-102 transform bg-gradient-to-r from-white to-gray-50 ${
                    activity.color === 'green' ? 'border-green-200 hover:border-green-400' :
                    activity.color === 'red' ? 'border-red-200 hover:border-red-400' :
                    activity.color === 'blue' ? 'border-blue-200 hover:border-blue-400' :
                    activity.color === 'purple' ? 'border-purple-200 hover:border-purple-400' :
                    activity.color === 'teal' ? 'border-teal-200 hover:border-teal-400' :
                    'border-emerald-200 hover:border-emerald-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-2xl shadow-lg ${
                          activity.color === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                          activity.color === 'red' ? 'bg-gradient-to-br from-red-400 to-rose-500' :
                          activity.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                          activity.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-fuchsia-500' :
                          activity.color === 'teal' ? 'bg-gradient-to-br from-teal-400 to-cyan-500' :
                          'bg-gradient-to-br from-emerald-400 to-green-500'
                        }`}>
                          <activity.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800">{activity.name}</p>
                          <p className="text-gray-600 text-sm">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 font-medium block mb-2">{activity.time}</span>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                          activity.color === 'green' ? 'bg-green-500 text-white' :
                          activity.color === 'red' ? 'bg-red-500 text-white' :
                          activity.color === 'blue' ? 'bg-blue-500 text-white' :
                          activity.color === 'purple' ? 'bg-purple-500 text-white' :
                          activity.color === 'teal' ? 'bg-teal-500 text-white' :
                          'bg-emerald-500 text-white'
                        }`}>
                          {activity.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Overview - Enhanced */}
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white border-2 border-purple-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-300 opacity-20 rounded-full blur-3xl -mr-24 -mt-24 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-300 opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 flex items-center">
                  <div className="p-2 bg-white bg-opacity-30 rounded-xl mr-3 backdrop-blur-sm">
                    <MapPin className="h-6 w-6" />
                  </div>
                  🏫 Campus Overview
                </h3>
                <div className="space-y-5">
                  <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-30 shadow-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-100">Main Building</span>
                      <span className="text-3xl font-black">{Math.floor(visitorCount * 0.6)}</span>
                    </div>
                    <div className="w-full bg-purple-900 bg-opacity-30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full shadow-lg" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-30 shadow-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-100">Gymnasium</span>
                      <span className="text-3xl font-black">{Math.floor(visitorCount * 0.25)}</span>
                    </div>
                    <div className="w-full bg-purple-900 bg-opacity-30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full shadow-lg" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-30 shadow-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-100">Auditorium</span>
                      <span className="text-3xl font-black">{Math.floor(visitorCount * 0.15)}</span>
                    </div>
                    <div className="w-full bg-purple-900 bg-opacity-30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full shadow-lg" style={{width: '15%'}}></div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t-2 border-white border-opacity-30">
                    <p className="text-sm font-semibold text-purple-100 mb-3">Total On Campus</p>
                    <p className="text-6xl font-black mb-2">{visitorCount}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400"></div>
                      <p className="text-sm font-bold">All zones monitored</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;