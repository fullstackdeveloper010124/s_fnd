import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle, Users, GraduationCap, BookOpen, UserCircle } from 'lucide-react';
import { api } from '../../utils/api';

type UserRole = 'visitor' | 'student' | 'teacher' | 'parent';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('visitor');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'visitor' as UserRole, name: 'Visitor', icon: Users, color: 'blue', description: 'Campus guests & volunteers' },
    { id: 'student' as UserRole, name: 'Student', icon: GraduationCap, color: 'green', description: 'Enrolled students' },
    { id: 'teacher' as UserRole, name: 'Teacher', icon: BookOpen, color: 'purple', description: 'Faculty & staff' },
    { id: 'parent' as UserRole, name: 'Parent', icon: UserCircle, color: 'orange', description: 'Parents & guardians' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send password reset request to backend API
      await api.forgotPassword(email, selectedRole);
      
      // Show success message
      setSubmitted(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      alert(err.message || 'Failed to request password reset. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
            <h1 className="text-5xl font-bold mb-6">Password Recovery</h1>
            <p className="text-xl text-blue-100 mb-8">Reset your password in simple steps</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Select Your Role</h3>
                  <p className="text-blue-100 text-sm">Choose your account type to help us locate your account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Enter Your Email</h3>
                  <p className="text-blue-100 text-sm">Provide the email address associated with your account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Your Email</h3>
                  <p className="text-blue-100 text-sm">We'll send you a secure link to reset your password</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Create New Password</h3>
                  <p className="text-blue-100 text-sm">Follow the link and set a new secure password</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-sm text-blue-100">
                <strong className="text-white">Security Note:</strong> The password reset link will expire in 1 hour for your security. If you didn't request this, please contact support immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                  <Mail className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-3">Forgot Password?</h2>
                <p className="text-gray-600">No worries! We'll send you reset instructions</p>
              </div>

              {/* Role Selection */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-4">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedRole === role.id
                          ? `border-${role.color}-500 bg-${role.color}-50 shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-xl ${
                          selectedRole === role.id ? `bg-${role.color}-100` : 'bg-gray-100'
                        }`}>
                          <role.icon className={`h-6 w-6 ${
                            selectedRole === role.id ? `text-${role.color}-600` : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="text-center">
                          <p className={`font-bold text-sm ${
                            selectedRole === role.id ? `text-${role.color}-700` : 'text-gray-700'
                          }`}>
                            {role.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Enter the email address associated with your account
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Reset Link
                </button>
              </form>

              <div className="mt-8">
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h2>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 mb-3">
                  We've sent a password reset link to:
                </p>
                <p className="font-bold text-blue-600 text-lg mb-3">{email}</p>
                <p className="text-sm text-gray-600">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or
                </p>
                
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Resend Email
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {!submitted && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                  Contact Support
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
