import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Phone, CheckCircle, ChevronDown } from 'lucide-react';
import { api } from '../../utils/api';

type UserRole = 'visitor' | 'student' | 'teacher' | 'parent';

interface SignupProps {
  onSignup: (userData: any) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>('visitor');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form validation errors
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  const navigate = useNavigate();

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
  
  // Function to validate form
  const validateForm = () => {
    let isValid = true;
    
    // Full name validation
    if (!formData.fullName.trim()) {
      setFullNameError('Full name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }
    
    // Email validation
    if (!formData.email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Phone validation
    if (!formData.phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/[^\d+]/g, ''))) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    // Password validation
    if (!formData.password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (name === 'fullName' && fullNameError) setFullNameError('');
    if (name === 'email' && emailError) setEmailError('');
    if (name === 'phone' && phoneError) setPhoneError('');
    if (name === 'password') {
      if (passwordError) setPasswordError('');
      if (confirmPasswordError) setConfirmPasswordError('');
      
      // Update password strength
      updatePasswordStrength(value);
    }
    if (name === 'confirmPassword' && confirmPasswordError) setConfirmPasswordError('');
  };
  
  // Handle password field changes with strength and caps lock
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setFormData({
      ...formData,
      password: value
    });
    
    if (passwordError) setPasswordError('');
    if (confirmPasswordError) setConfirmPasswordError('');
    
    // Update password strength
    updatePasswordStrength(value);
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setFormData({
      ...formData,
      confirmPassword: value
    });
    
    if (confirmPasswordError) setConfirmPasswordError('');
  };
  
  // Handle caps lock detection
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockWarning(true);
    } else {
      setCapsLockWarning(false);
    }
  };
  
  const handlePasswordKeyUp = () => {
    if (capsLockWarning) {
      setCapsLockWarning(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset caps lock warning on submit
    setCapsLockWarning(false);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check if terms are agreed
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Send data to backend API
      const response = await api.signup({
        ...formData,
        role: selectedRole,
        agreeTerms: true
      });
      
      console.log('Signup successful:', response);
      
      // Call parent component handler
      onSignup(response.user);
      
      // Show success message and redirect to login
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
            <h1 className="text-5xl font-bold mb-6">Join Our Community</h1>
            <p className="text-xl text-purple-100 mb-8">Create your account and get started today</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Secure Access</h3>
                  <p className="text-purple-100 text-sm">Enterprise-level security for your data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Easy Registration</h3>
                  <p className="text-purple-100 text-sm">Get started in less than 2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Role-Based Access</h3>
                  <p className="text-purple-100 text-sm">Customized features for your role</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">24/7 Support</h3>
                  <p className="text-purple-100 text-sm">We're here to help anytime you need</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Create Account</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          {/* Password security tips */}
          {!formData.password && (
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

          {/* Role Selection Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">I am a</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all flex items-center justify-between bg-white"
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
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedRole === role.id ? 'bg-purple-50' : ''}`}
                    >
                      <span className="font-medium text-gray-800">{role.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all ${
                    fullNameError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {fullNameError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {fullNameError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all ${
                    emailError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {phoneError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  onKeyDown={handlePasswordKeyDown}
                  onKeyUp={handlePasswordKeyUp}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 transition-all ${
                    passwordError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                  placeholder="Create a password"
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
              
              {!passwordError && formData.password && (
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
              
              {!passwordError && formData.password && passwordStrength < 3 && (
                <p className="mt-2 text-xs text-red-500">
                  For better security, use a stronger password with uppercase, lowercase, numbers and special characters
                </p>
              )}
              
              {!passwordError && formData.password && passwordStrength >= 3 && passwordStrength < 5 && (
                <p className="mt-2 text-xs text-yellow-500">
                  Consider adding more character variety for a stronger password
                </p>
              )}
              
              {!passwordError && formData.password && passwordStrength >= 5 && (
                <p className="mt-2 text-xs text-green-500">
                  Great! Your password is strong.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 transition-all ${
                    confirmPasswordError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                required
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="font-semibold text-purple-600 hover:text-purple-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="font-bold text-purple-600 hover:text-purple-700"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;