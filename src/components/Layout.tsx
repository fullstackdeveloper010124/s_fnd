import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import { 
  BarChart3, 
  UserPlus, 
  Shield, 
  Calendar, 
  AlertTriangle, 
  Users, 
  FileText,
  School
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children,
  onLogout,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Call the logout function passed from App component
    if (onLogout) {
      onLogout();
    }
    // Navigate to login page
    navigate('/login');
  };

  const handleNavigate = (view: string) => {
    // Map view names to routes
    const routeMap: Record<string, string> = isAdmin ? {
      'dashboard': '/admin/dashboard',
      'school-management': '/admin/schoolManagementSystem',
      'visitor-checkin': '/admin/visitorCheckin',
      'security': '/admin/security',
      'events': '/admin/events',
      'emergency': '/admin/emergency',
      'volunteers': '/admin/volunteers',
      'reports': '/admin/reports',
      'placeholderPage': '/admin/placeholderPage'
    } : {
      'dashboard': '/dashboard',
      'school-management': '/school-management',
      'visitor-checkin': '/visitor-checkin',
      'security': '/security',
      'events': '/events',
      'emergency': '/emergency',
      'volunteers': '/volunteers',
      'reports': '/reports'
    };
    
    const route = routeMap[view] || (isAdmin ? '/admin/dashboard' : '/dashboard');
    navigate(route);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} isAdmin={isAdmin} />
      
      <div className="flex">
        <Sidebar onNavigate={handleNavigate} isAdmin={isAdmin} />
        
        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Slide-out menu */}
            <div 
              className={`fixed left-0 top-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Navigation</h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'school-management', label: 'School Management', icon: School },
                  { id: 'visitor-checkin', label: 'Visitor Check-In', icon: UserPlus },
                  { id: 'security', label: 'Security Screening', icon: Shield },
                  { id: 'events', label: 'Event Management', icon: Calendar },
                  { id: 'emergency', label: 'Emergency Center', icon: AlertTriangle },
                  { id: 'volunteers', label: 'Volunteer Hub', icon: Users },
                  { id: 'reports', label: 'Reports & Analytics', icon: FileText }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavigate(item.id);
                      setIsMobileMenuOpen(false); // Close menu after navigation
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                  >
                    <div className="p-2 rounded-lg bg-gray-100">
                      <item.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
        
        {/* Floating menu button for mobile */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg z-30"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;