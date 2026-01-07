import React, { useState } from 'react';
import { Shield, LogOut, Bell, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isAdmin = false }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Call the logout function passed from Layout component
    if (onLogout) {
      onLogout();
    } else {
      // Fallback to just navigating to login
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-gray-100 shadow-md">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-2 md:space-x-4 cursor-pointer" onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/dashboard')}>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">SchoolGuard Pro</h1>
            </div>
            <span className="hidden md:inline text-xs md:text-sm text-gray-500">Comprehensive School Safety System</span>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notification Icon */}
            <div className="relative">
              <button className="p-1 md:p-2 rounded-full hover:bg-gray-200 transition-colors relative">
                <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            {/* Profile Photo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="h-3 w-3 md:h-5 md:w-5 text-white" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Admin User</span>
            </div>
            
            {/* Hamburger Menu for Mobile */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-1 md:p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 md:h-6 md:w-6 text-gray-700" /> : <Menu className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />}
            </button>
            
            <button 
              onClick={handleLogout}
              className="hidden lg:flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 p-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;