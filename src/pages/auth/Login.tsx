import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ChevronDown, Users, GraduationCap, BookOpen, UserCircle, Shield } from 'lucide-react';
import { api } from '../../utils/api';

type UserRole = 'visitor' | 'student' | 'teacher' | 'parent' | 'admin';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
  setAuth: (authenticated: boolean) => void;
}

const Login = ({ onLogin, setAuth }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('visitor');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  
  // Login attempt tracking for security
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  
  // Timeout reference for clearing errors
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is an admin login (accessed via /admin/login)
  const isAdminLogin = location.pathname === '/admin/login';
  
  // For admin login, set the role to admin by default
  useEffect(() => {
    if (isAdminLogin && selectedRole !== 'admin') {
      setSelectedRole('admin');
    }
  }, [isAdminLogin, selectedRole]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const roles = [
    { id: 'visitor' as UserRole, name: 'Visitor' },
    { id: 'student' as UserRole, name: 'Student' },
    { id: 'teacher' as UserRole, name: 'Teacher' },
    { id: 'parent' as UserRole, name: 'Parent' }
  ];
  
  // Function to calculate password strength
  const updatePasswordStrength = (password: string) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength++; // Uppercase
    if (/[a-z]/.test(password)) strength++; // Lowercase
    if (/[0-9]/.test(password)) strength++; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Special characters
    
    // Cap at 5
    setPasswordStrength(Math.min(strength, 5));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is locked out
    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
      setError(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
      return;
    }
    
    // Reset caps lock warning on submit
    setCapsLockWarning(false);
    
    // Reset errors
    setError(null);
    setEmailError('');
    setPasswordError('');
    
    // Basic validation
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      let response;
      
      // For admin login route, always use admin login endpoint
      if (isAdminLogin) {
        response = await api.adminLogin({ email, password });
      } 
      // For regular login, use different endpoints based on selected role
      else if (selectedRole === 'teacher' || selectedRole === 'admin') {
        // Use admin login endpoint for teacher and admin roles
        response = await api.adminLogin({ email, password });
      } else {
        // Use general login endpoint for other roles
        response = await api.login({ email, password });
      }
      
      console.log('Login successful:', response);
      
      // Store token in localStorage if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Call parent component handler
      onLogin(email, password);
      
      // Set authentication state directly
      setAuth(true);
      
      // Navigate to appropriate dashboard
      if (isAdminLogin || selectedRole === 'admin' || selectedRole === 'teacher') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
      
      // Reset login attempts after successful login
      setLoginAttempts(0);
      setLockoutTime(null);
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Increment login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      // Lock user out after 5 failed attempts
      if (newAttempts >= 5) {
        const lockoutPeriod = 15 * 60 * 1000; // 15 minutes
        const lockoutUntil = Date.now() + lockoutPeriod;
        setLockoutTime(lockoutUntil);
        setError('Too many failed attempts. Please try again in 15 minutes.');
      } else {
        // More specific error handling
        if (err.status === 401) {
          setError('Invalid email or password');
        } else if (err.status === 403) {
          setError('Access denied. Please contact an administrator.');
        } else if (err.status === 404) {
          setError('Account not found. Please check your credentials.');
        } else {
          setError(err.message || 'An error occurred during login. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h1 className="text-5xl font-bold mb-6">School Safety System</h1>
            <p className="text-xl text-indigo-100 mb-8">Secure access for everyone in our community</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visitor Management</h3>
                  <p className="text-indigo-100 text-sm">Track and manage all campus visitors securely</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Student Portal</h3>
                  <p className="text-indigo-100 text-sm">Access your schedule, grades, and resources</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Teacher Dashboard</h3>
                  <p className="text-indigo-100 text-sm">Manage classes, attendance, and grades</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <UserCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Parent Access</h3>
                  <p className="text-indigo-100 text-sm">Monitor your child's progress and attendance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              {isAdminLogin ? 'Administrator Access' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isAdminLogin ? 'Sign in to access the administrative dashboard' : 'Sign in to access your account'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
                        
          {/* Login attempts counter */}
          {loginAttempts > 0 && loginAttempts < 5 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-yellow-700 font-medium">
                {5 - loginAttempts} login attempts remaining before account lockout
              </p>
            </div>
          )}
                        
          {/* Security tip */}
          {loginAttempts === 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-700 text-sm">
                <Shield className="inline h-4 w-4 mr-1" /> Secure login: Always check the URL before entering your credentials
              </p>
            </div>
          )}
                        
          {/* Password security tips */}
          {!password && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-2">Password Security Tips:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2"></div>
                  <span>Use at least 8 characters</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2"></div>
                  <span>Include uppercase and lowercase letters</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2"></div>
                  <span>Add numbers and special characters</span>
                </li>
              </ul>
            </div>
          )}

          {/* Conditional Sections - Role Selection or Admin Header */}
          <div>
            {/* Role Selection Dropdown - only shown for non-admin logins */}
            {!isAdminLogin && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Your Role</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all flex items-center justify-between bg-white"
                  >
                    <span className="font-medium text-gray-800">
                      {roles.find(role => role.id === selectedRole)?.name}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isRoleDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden">
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.id);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedRole === role.id ? 'bg-indigo-50' : ''}`}
                        >
                          <span className="font-medium text-gray-800">{role.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin Login Header - only shown for admin logins */}
            {isAdminLogin && (
              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold text-lg">Administrator Login</h3>
                    <p className="text-indigo-100 text-sm">Access the administrative dashboard</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all ${
                    emailError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    if (passwordError) setPasswordError('');
                    
                    // Update password strength
                    updatePasswordStrength(newPassword);
                  }}
                  onKeyDown={(e) => {
                    // Detect caps lock
                    if (e.getModifierState && e.getModifierState('CapsLock')) {
                      setCapsLockWarning(true);
                    } else {
                      setCapsLockWarning(false);
                    }
                  }}
                  onKeyUp={() => {
                    // Reset caps lock warning when key is released
                    if (capsLockWarning) {
                      setCapsLockWarning(false);
                    }
                  }}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 transition-all ${
                    passwordError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {passwordError}
                </p>
              )}
              
              {capsLockWarning && (
                <p className="mt-2 text-sm text-yellow-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0v-1a1 1 0 112 0v1zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Caps Lock is ON
                </p>
              )}
              
              {!passwordError && password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        passwordStrength < 3 ? 'bg-red-500' : 
                        passwordStrength < 5 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password strength: {
                      passwordStrength < 3 ? 'Weak' : 
                      passwordStrength < 5 ? 'Medium' : 
                      'Strong'
                    }
                  </p>
                </div>
              )}
              
              {!passwordError && password && passwordStrength < 3 && (
                <p className="mt-2 text-xs text-red-500">
                  For better security, use a stronger password with uppercase, lowercase, numbers and special characters
                </p>
              )}
              
              {!passwordError && password && passwordStrength >= 3 && passwordStrength < 5 && (
                <p className="mt-2 text-xs text-yellow-500">
                  Consider adding more character variety for a stronger password
                </p>
              )}
              
              {!passwordError && password && passwordStrength >= 5 && (
                <p className="mt-2 text-xs text-green-500">
                  Great! Your password is strong.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              
              <button 
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => navigate('/signup')}
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;