import { useState, useEffect } from 'react';
import { 
  Users, 
  Shield,Bell,Calendar,Clock,Activity,UserCheck,AlertTriangle,MapPin,Zap,UserPlus,FileText,TrendingUp,BarChart3} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { api } from '../../utils/api';

interface DashboardProps {
  currentTime: Date;
  emergencyStatus: { active: boolean; type: string | null };
  visitorCount: number;
  onNavigate?: (view: string) => void;
}

interface ActivityItem {
  id: string;
  type: 'checkin' | 'checkout' | 'screening' | 'event' | 'volunteer' | 'incident';
  name: string;
  action: string;
  time: string;
  status: 'approved' | 'completed' | 'flagged' | 'info' | 'pending';
  icon: any;
  color: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down';
}

const Dashboard = ({ currentTime, emergencyStatus, visitorCount, onNavigate }: DashboardProps) => {
  // Dashboard state
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Load dashboard data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load notifications
        const notificationData = await api.getNotifications();
        setNotifications(notificationData);
        
        const unread = await api.getUnreadNotificationCount();
        setUnreadCount(unread);
        
        // Load dashboard statistics
        const stats = await api.getDashboardStats();
        setDashboardStats(stats.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(async () => {
      try {
        const notificationData = await api.getNotifications();
        setNotifications(notificationData);
        
        const unread = await api.getUnreadNotificationCount();
        setUnreadCount(unread);
      } catch (error) {
        console.error('Failed to refresh notifications:', error);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  // Chart data - use real data when available, fallback to mock data
  const visitorTrendData = dashboardStats?.recentVisitors || [
    { time: '8:00', visitors: 12, volunteers: 8, staff: 15 },
    { time: '9:00', visitors: 28, volunteers: 12, staff: 20 },
    { time: '10:00', visitors: 45, volunteers: 15, staff: 22 },
    { time: '11:00', visitors: 58, volunteers: 18, staff: 25 },
    { time: '12:00', visitors: 72, volunteers: 20, staff: 28 },
    { time: '1:00', visitors: 65, volunteers: 22, staff: 26 },
    { time: '2:00', visitors: 52, volunteers: 19, staff: 24 },
    { time: '3:00', visitors: 48, volunteers: 17, staff: 22 },
    { time: '4:00', visitors: 35, volunteers: 14, staff: 18 },
    { time: 'Now', visitors: visitorCount, volunteers: 16, staff: 23 }
  ];

  const securityData = dashboardStats?.securityStats || [
    { name: 'Approved', value: 847, color: '#10b981' },
    { name: 'Pending', value: 23, color: '#f59e0b' },
    { name: 'Flagged', value: 8, color: '#ef4444' },
    { name: 'Reviewed', value: 156, color: '#3b82f6' }
  ];

  const locationData = dashboardStats?.incidentsByLocation?.map((loc: any) => ({
    location: loc._id,
    count: loc.count
  })) || [
    { location: 'Main Entrance', count: 42 },
    { location: 'Gymnasium', count: 18 },
    { location: 'Library', count: 25 },
    { location: 'Cafeteria', count: 31 },
    { location: 'Auditorium', count: 12 },
    { location: 'Admin Wing', count: 8 },
    { location: 'Science Labs', count: 15 }
  ];

  const weeklyData = dashboardStats?.weeklyData || [
    { day: 'Mon', visitors: 234, events: 2, incidents: 1 },
    { day: 'Tue', visitors: 189, events: 1, incidents: 0 },
    { day: 'Wed', visitors: 312, events: 4, incidents: 2 },
    { day: 'Thu', visitors: 267, events: 2, incidents: 1 },
    { day: 'Fri', visitors: 298, events: 3, incidents: 0 },
    { day: 'Sat', visitors: 145, events: 1, incidents: 0 },
    { day: 'Today', visitors: visitorCount, events: 3, incidents: 0 }
  ];

  const recentActivities: ActivityItem[] = [
    { id: '1', type: 'checkin', name: 'Sarah Johnson', action: 'checked in as Parent Volunteer', time: '2 min ago', status: 'approved', icon: UserCheck, color: 'green' },
    { id: '2', type: 'incident', name: 'Fire Alarm', action: 'activated in Science Wing', time: '5 min ago', status: 'flagged', icon: AlertTriangle, color: 'red' },
    { id: '3', type: 'checkout', name: 'Mike Davis', action: 'checked out', time: '8 min ago', status: 'completed', icon: Users, color: 'blue' },
    { id: '4', type: 'screening', name: 'Unknown Visitor', action: 'flagged by security screening', time: '12 min ago', status: 'flagged', icon: AlertTriangle, color: 'red' },
    { id: '5', type: 'event', name: 'Science Fair Setup', action: 'pre-registration opened', time: '18 min ago', status: 'info', icon: Calendar, color: 'purple' },
    { id: '6', type: 'volunteer', name: 'Lisa Chen', action: 'logged 3 hours of volunteer time', time: '25 min ago', status: 'completed', icon: Clock, color: 'teal' },
    { id: '7', type: 'screening', name: 'David Wilson', action: 'passed security screening', time: '32 min ago', status: 'approved', icon: Shield, color: 'emerald' }
  ];

  // Admin-specific stats - use real data when available
  const adminStats = [
    { title: 'System Health', value: dashboardStats?.systemHealth || '98%', change: dashboardStats?.systemHealthChange || '+2%', icon: Activity, color: 'from-green-500 to-emerald-600', trend: 'up' },
    { title: 'Active Sessions', value: dashboardStats?.activeSessions || '42', change: `+${dashboardStats?.activeSessionsChange || 5}`, icon: Users, color: 'from-blue-500 to-indigo-600', trend: 'up' },
    { title: 'Pending Approvals', value: dashboardStats?.pendingApprovals?.toString() || unreadCount.toString(), change: `${dashboardStats?.pendingApprovals || unreadCount} new`, icon: UserCheck, color: 'from-amber-500 to-orange-600', trend: 'down' },
    { title: 'System Alerts', value: dashboardStats?.systemAlerts || '2', change: dashboardStats?.systemAlertsChange || '0', icon: Bell, color: 'from-red-500 to-rose-600', trend: 'neutral' }
  ];

  const StatCard = ({ title, value, change, icon, color, trend }: StatCardProps) => (
  <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-gray-300 hover:scale-105 transform">
    <div className={`bg-gradient-to-br ${color} p-6 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl -mr-20 -mt-20 group-hover:animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white bg-opacity-30 rounded-2xl p-3 backdrop-blur-sm">
            {icon}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-white text-xs bg-green-500 px-3 py-1 rounded-full font-semibold shadow-lg">Live</span>
          </div>
        </div>
        <p className="text-white text-sm font-semibold tracking-wide">{title}</p>
        <p className="text-5xl font-black text-white mt-3 mb-1">{value}</p>
        <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-300' : 'text-red-300'}`}>
          <span className="text-xl">{trend === 'up' ? '↑' : '↓'}</span>
          <p className="text-sm font-semibold">{change}</p>
        </div>
      </div>
    </div>
    <div className="p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">Updated just now</span>
        <span className="font-bold text-gray-700">Real-time</span>
      </div>
    </div>
  </div>
);

  // Notification Panel Component
  const NotificationPanel = () => {
    if (notifications.length === 0) return null;
    
    const unreadNotifications = notifications.filter(n => !n.read);
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            Recent Notifications
          </h3>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadNotifications.length} new
          </span>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {notifications.slice(0, 5).map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl border-l-4 ${notification.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'} transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-medium ${notification.read ? 'text-gray-700' : 'text-blue-700'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <button 
                    onClick={async () => {
                      try {
                        await api.markNotificationAsRead(notification.id);
                        // Update local state
                        setNotifications(notifications.map(n => 
                          n.id === notification.id ? {...n, read: true} : n
                        ));
                        setUnreadCount(unreadCount - 1);
                      } catch (error) {
                        console.error('Failed to mark notification as read:', error);
                      }
                    }}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Mark Read
                  </button>
                )}
              </div>
              {notification.volunteer && (
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded-lg">
                  <p className="font-semibold">Volunteer Details:</p>
                  <p>Name: {notification.volunteer.name}</p>
                  <p>Email: {notification.volunteer.email}</p>
                  <p>Role: {notification.volunteer.role}</p>
                  <div className="mt-2 flex gap-2">
                    <button 
                      onClick={async () => {
                        try {
                          const response = await api.approveVolunteer(notification.volunteer.id.toString(), true);
                          // Mark notification as read
                          await api.markNotificationAsRead(notification.id);
                          // Update local state
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? {...n, read: true} : n
                          ));
                          setUnreadCount(unreadCount - 1);
                          alert(response.message);
                        } catch (error) {
                          console.error('Failed to approve volunteer:', error);
                        }
                      }}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await api.approveVolunteer(notification.volunteer.id.toString(), false);
                          // Mark notification as read
                          await api.markNotificationAsRead(notification.id);
                          // Update local state
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? {...n, read: true} : n
                          ));
                          setUnreadCount(unreadCount - 1);
                          alert(response.message);
                        } catch (error) {
                          console.error('Failed to reject volunteer:', error);
                        }
                      }}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {notifications.length > 5 && (
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    );
  };

return (
    <div className="space-y-6">
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg font-medium text-gray-700">Loading dashboard data...</span>
        </div>
      )}
      
      {!loading && (
        <div className="space-y-6">
          {/* Admin Welcome Banner - Enhanced with gradient animation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20 -ml-32 -mb-32"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight">Administrator Dashboard</h2>
                  {unreadCount > 0 && (
                    <div className="relative">
                      <Bell className="h-8 w-8 text-yellow-300 animate-pulse" />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xl mb-6 max-w-2xl">Welcome back, Administrator. You have full access to all system controls and monitoring capabilities.</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <UserCheck className="h-4 w-4" />
                    <span className="text-sm font-semibold">42 Active Users</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm font-semibold">{unreadCount} Unread Notifications</span>
                  </div>
                </div>
                <p className="text-lg text-blue-100 mb-4 font-medium">🎯 Real-time Security & Visitor Management</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400"></div>
                    <span className="text-sm font-semibold">All Systems Operational</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-semibold">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-semibold">{visitorCount} Active Visitors</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Generate System Report
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 shadow-2xl">
                  <p className="text-sm mb-2 font-semibold text-blue-100">Campus Status</p>
                  <div className="text-6xl mb-2">{emergencyStatus.active ? '⚠️' : '✓'}</div>
                  <p className="text-lg font-bold">{emergencyStatus.active ? 'Alert Active' : '🔒 Secure'}</p>
                  <p className="text-xs mt-2 text-blue-200">{emergencyStatus.active ? 'Immediate attention required' : 'All systems nominal'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, index: number) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={<stat.icon className="h-8 w-8 text-white" />}
                color={stat.color}
                trend={stat.trend as 'up' | 'down'}
              />
            ))}
          </div>

      {/* Enhanced Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Visitors On Campus" 
          value={visitorCount} 
          change="8% from yesterday" 
          icon={<Users className="h-8 w-8 text-white" />} 
          color="from-blue-500 via-blue-600 to-cyan-500" 
          trend="up" 
        />
        
        <StatCard 
          title="Security Status" 
          value="✓ All Clear" 
          change="98.5% screening success" 
          icon={<Shield className="h-8 w-8 text-white" />} 
          color="from-green-500 via-emerald-600 to-teal-500" 
          trend="up" 
        />

        <StatCard 
          title="Active Alerts" 
          value={emergencyStatus.active ? 1 : 0} 
          change="System monitoring" 
          icon={<Bell className="h-8 w-8 text-white" />} 
          color="from-orange-500 via-amber-500 to-yellow-500" 
          trend={emergencyStatus.active ? "up" : "down"} 
        />

        <StatCard 
          title="Today's Events" 
          value="3" 
          change="124 pre-registered" 
          icon={<Calendar className="h-8 w-8 text-white" />} 
          color="from-purple-600 via-fuchsia-600 to-pink-500" 
          trend="up" 
        />
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-6 border-2 border-blue-200">
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
                <linearGradient id="colorStaff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
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
              <Area type="monotone" dataKey="staff" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorStaff)" name="Staff" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Security Screening Stats */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center text-gray-800">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              Security Screenings
            </h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">This Week</span>
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
                    border: '2px solid #f59e0b',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center text-gray-800">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl mr-3">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              Visitors by Location
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">Real-time</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="location" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #6366f1',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} name="Visitors">
                {locationData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${240 + index * 10}, 70%, 60%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Comparison */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-rose-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center text-gray-800">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl mr-3">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Weekly Overview
            </h3>
            <span className="text-xs bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-semibold">Last 7 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #ec4899',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="visitors" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Visitors" />
              <Line type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Events" />
              <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl border-2 border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold">Total Visitors Today</p>
              <p className="text-3xl font-bold mt-2">{dashboardStats?.totalVisitors || visitorCount + 142}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <p className="text-blue-100 text-xs mt-4 flex items-center">
            <span className="flex items-center">
              <span className="mr-1">↑</span>
              <span>{dashboardStats?.visitorsChange || '12%'} from yesterday</span>
            </span>
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl border-2 border-green-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold">Screenings Completed</p>
              <p className="text-3xl font-bold mt-2">{dashboardStats?.completedScreenings || visitorCount + 847}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <p className="text-green-100 text-xs mt-4 flex items-center">
            <span className="flex items-center">
              <span className="mr-1">↑</span>
              <span>{dashboardStats?.screeningSuccessRate || '8.3%'} success rate</span>
            </span>
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl border-2 border-amber-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-semibold">Active Incidents</p>
              <p className="text-3xl font-bold mt-2">{dashboardStats?.activeIncidents || (emergencyStatus.active ? '1' : '0')}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
          <p className="text-amber-100 text-xs mt-4 flex items-center">
            <span className="flex items-center">
              <span className="mr-1">{dashboardStats?.activeIncidents ? '⚠️' : (emergencyStatus.active ? '⚠️' : '✓')}</span>
              <span>{dashboardStats?.activeIncidents ? 'Requires attention' : (emergencyStatus.active ? 'Requires attention' : 'All clear')}</span>
            </span>
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl p-6 text-white shadow-xl border-2 border-purple-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold">Volunteer Hours</p>
              <p className="text-3xl font-bold mt-2">{dashboardStats?.volunteerHours || Math.floor(visitorCount * 2.5)}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Clock className="h-8 w-8" />
            </div>
          </div>
          <p className="text-purple-100 text-xs mt-4 flex items-center">
            <span className="flex items-center">
              <span className="mr-1">↑</span>
              <span>{dashboardStats?.volunteerHoursChange || '18%'} from last week</span>
            </span>
          </p>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel />

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
              <div key={index} className="group hover:shadow-xl p-5 rounded-2xl transition-all duration-300 border-2 hover:scale-102 transform bg-gradient-to-r from-white to-gray-50 ${
                activity.color === 'green' ? 'border-green-200 hover:border-green-400' :
                activity.color === 'red' ? 'border-red-200 hover:border-red-400' :
                activity.color === 'blue' ? 'border-blue-200 hover:border-blue-400' :
                activity.color === 'purple' ? 'border-purple-200 hover:border-purple-400' :
                activity.color === 'teal' ? 'border-teal-200 hover:border-teal-400' :
                'border-emerald-200 hover:border-emerald-400'
              }">
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
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 rounded-3xl shadow-2xl p-8 text-white border-2 border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-24 -mt-24 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 flex items-center">
              <div className="p-2 bg-white bg-opacity-10 rounded-xl mr-3 backdrop-blur-sm">
                <MapPin className="h-6 w-6" />
              </div>
              🏫 Campus Overview
            </h3>
            <div className="space-y-5">
              <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-20 shadow-2xl hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-blue-200">Main Building</span>
                  <span className="text-3xl font-black">{Math.floor(visitorCount * 0.6)}</span>
                </div>
                <div className="w-full bg-slate-700 bg-opacity-50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full shadow-lg" style={{width: '60%'}}></div>
                </div>
                <div className="flex items-center mt-2 text-xs text-blue-300">
                  <span>Security: ✓ Normal</span>
                  <span className="mx-2">•</span>
                  <span>Capacity: 60%</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-20 shadow-2xl hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-green-200">Gymnasium</span>
                  <span className="text-3xl font-black">{Math.floor(visitorCount * 0.25)}</span>
                </div>
                <div className="w-full bg-slate-700 bg-opacity-50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full shadow-lg" style={{width: '25%'}}></div>
                </div>
                <div className="flex items-center mt-2 text-xs text-green-300">
                  <span>Security: ✓ Normal</span>
                  <span className="mx-2">•</span>
                  <span>Capacity: 25%</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-5 border-2 border-white border-opacity-20 shadow-2xl hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-purple-200">Auditorium</span>
                  <span className="text-3xl font-black">{Math.floor(visitorCount * 0.15)}</span>
                </div>
                <div className="w-full bg-slate-700 bg-opacity-50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 h-3 rounded-full shadow-lg" style={{width: '15%'}}></div>
                </div>
                <div className="flex items-center mt-2 text-xs text-purple-300">
                  <span>Security: ✓ Normal</span>
                  <span className="mx-2">•</span>
                  <span>Capacity: 15%</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t-2 border-white border-opacity-30">
                <p className="text-sm font-semibold text-gray-300 mb-3">Total On Campus</p>
                <p className="text-6xl font-black mb-2">{visitorCount}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400"></div>
                  <p className="text-sm font-bold">All zones monitored • Last update: Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default Dashboard;
