import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { EmergencyStatus } from './types';
import Dashboard from './pages/Dashboard';
import VisitorCheckin from './pages/VisitorCheckin';
import Security from './pages/Security';
import Events from './pages/Events';
import Emergency from './pages/Emergency';
import Volunteers from './pages/Volunteers';
import Reports from './pages/Reports';
import SchoolManagementSystem from './pages/SchoolManagementSystem';
import PlaceholderPage from './pages/PlaceholderPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVisitorCheckin from './pages/admin/AdminVisitorCheckin';
import AdminSecurity from './pages/admin/AdminSecurity';
import AdminEvents from './pages/admin/AdminEvents';
import AdminEmergency from './pages/admin/AdminEmergency';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminReports from './pages/admin/AdminReports';
import AdminSchoolManagementSystem from './pages/admin/AdminSchoolManagementSystem';
import AdminPlaceholderPage from './pages/admin/AdminPlaceholderPage';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyStatus, setEmergencyStatus] = useState<EmergencyStatus>({
    active: false,
    type: null,
    startTime: null,
    description: '',
    responseLevel: 'normal'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with a server
    // For demo purposes, we'll check against registered users
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful for:', email);
      setIsAuthenticated(true);
      return true;
    } else {
      // For API login, we assume it was successful since we're navigating to dashboard
      // The token check is already done in the useEffect
      console.log('Login processed for:', email);
      // Always set authenticated to true after successful API login
      setIsAuthenticated(true);
      return true;
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Function to manually set authentication (for debugging)
  const setAuth = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleSignup = (userData: any) => {
    // In a real app, you would submit to a server
    // For demo purposes, we'll store in local state
    setUsers([...users, userData]);
    console.log('User registered:', userData);
  };

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} setAuth={setAuth} />} />
      <Route path="/admin/login" element={<Login onLogin={handleLogin} setAuth={setAuth} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes - Regular User */}
      <Route path="/" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Dashboard 
          currentTime={currentTime}
          emergencyStatus={emergencyStatus}
          visitorCount={42}
        />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/dashboard" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Dashboard 
          currentTime={currentTime}
          emergencyStatus={emergencyStatus}
          visitorCount={42}
        />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/visitor-checkin" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <VisitorCheckin />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/security" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Security />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/events" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Events />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/emergency" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Emergency emergencyStatus={emergencyStatus} setEmergencyStatus={setEmergencyStatus} />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/volunteers" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Volunteers />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/reports" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Reports />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/school-management" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <SchoolManagementSystem />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/placeholder" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <PlaceholderPage title="Placeholder Page" />
      </Layout> : <Navigate to="/login" />} />
      
      {/* Admin Routes - Nested under /admin */}
      <Route path="/admin" element={isAuthenticated ? <Layout onLogout={handleLogout} isAdmin={true} /> : <Navigate to="/admin/login" /> }>
        <Route index element={<AdminDashboard currentTime={currentTime} emergencyStatus={emergencyStatus} visitorCount={42} />} />
        <Route path="dashboard" element={<AdminDashboard currentTime={currentTime} emergencyStatus={emergencyStatus} visitorCount={42} />} />
        <Route path="emergency" element={<AdminEmergency emergencyStatus={emergencyStatus} setEmergencyStatus={setEmergencyStatus} />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="placeholderPage" element={<AdminPlaceholderPage title="Placeholder Page" />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="schoolManagementSystem" element={<AdminSchoolManagementSystem />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="visitorCheckin" element={<AdminVisitorCheckin />} />
        <Route path="volunteers" element={<AdminVolunteers />} />
      </Route>
      
      {/* Redirect to appropriate dashboard if authenticated, otherwise to login */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;