import React from 'react';
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

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  color: string;
}

interface SidebarProps {
  onNavigate: (view: string) => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isAdmin = false }) => {
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'bg-blue-500' },
    { id: 'school-management', label: 'School Management', icon: School, color: 'bg-indigo-500' },
    { id: 'visitor-checkin', label: 'Visitor Check-In', icon: UserPlus, color: 'bg-green-500' },
    { id: 'security', label: 'Security Screening', icon: Shield, color: 'bg-red-500' },
    { id: 'events', label: 'Event Management', icon: Calendar, color: 'bg-purple-500' },
    { id: 'emergency', label: 'Emergency Center', icon: AlertTriangle, color: 'bg-orange-500' },
    { id: 'volunteers', label: 'Volunteer Hub', icon: Users, color: 'bg-teal-500' },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText, color: 'bg-indigo-500' }
  ];
  return (
    <aside className="w-64 bg-gray-100 shadow-sm h-screen sticky top-0 hidden lg:block">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50`}
          >
            <div className="p-2 rounded-lg bg-gray-100">
              <item.icon className="h-5 w-5 text-gray-600" />
            </div>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
