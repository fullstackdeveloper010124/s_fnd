import { X } from 'lucide-react';
import { useState } from 'react';
import { api } from '../utils/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  experience: string;
  skills: string[];
  availability: string[];
  backgroundCheck: boolean;
  contactReferences: boolean;
  termsAgreed: boolean;
}

interface VolunteerPopupFormProps {
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export default function VolunteerPopupForm({ onClose, onSubmit }: VolunteerPopupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    experience: '',
    skills: [],
    availability: [],
    backgroundCheck: false,
    contactReferences: false,
    termsAgreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'skills' || name === 'availability') {
        setFormData(prev => {
          const currentArray = [...prev[name as keyof FormData] as string[]];
          if (checked) {
            return { ...prev, [name]: [...currentArray, value] };
          } else {
            return { ...prev, [name]: currentArray.filter(item => item !== value) };
          }
        });
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (loading) return;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.position) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (!formData.backgroundCheck || !formData.termsAgreed) {
      setError('Please check the required consent boxes: Background Check and Terms & Conditions.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare data for submission
      const volunteerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.position,
        status: 'pending_approval',
        backgroundCheck: formData.backgroundCheck ? 'pending' : 'expired',
        backgroundCheckDate: null,
        hoursThisMonth: 0,
        totalHours: 0,
        joinDate: new Date(),
        lastVisit: null,
        schedule: formData.availability.join(', '),
        emergencyContact: formData.phone,
        skills: formData.skills,
        isCheckedIn: false,
        checkInTime: null,
        currentAssignment: null
      };
      
      // Log the data being sent for debugging
      console.log('Sending volunteer data:', volunteerData);
      
      // Submit to backend API
      const response = await api.createVolunteer(volunteerData);
      console.log('API Response:', response);
      
      if (onSubmit) {
        onSubmit(response.volunteer || response.data || volunteerData);
      }
      
      // Close the form on successful submission
      alert('Volunteer application submitted successfully!');
      onClose();
    } catch (err: unknown) {
      console.error('Error submitting volunteer form:', err);
      const errorMessage = err && typeof err === 'object' && 'message' in err ? (err as Error).message : 'Failed to submit volunteer application. Please try again.';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const skillsList = ['Teaching', 'Organizing', 'Communication', 'Childcare', 'Mentoring', 'Technology', 'Leadership', 'Tutoring'];
  const availabilityOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend', 'Flexible'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">Volunteer Registration</h2>
          <p className="text-blue-100 mt-1">Join our team and make a difference in students' lives</p>
        </div>

        {/* Form Content - Scrollable */}
        <div className="overflow-y-auto flex-grow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>

            {/* Volunteer Position */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                Volunteer Position
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Role *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select a position</option>
                  <option value="Classroom Support">Classroom Support</option>
                  <option value="Student Mentor">Student Mentor</option>
                  <option value="Event Coordinator">Event Coordinator</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Library Assistant">Library Assistant</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                Experience & Skills
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows={3}
                  placeholder="Describe any relevant experience, skills, or qualifications..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (Check all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {skillsList.map((skill) => (
                    <label key={skill} className="flex items-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                Availability
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days Available (Check all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availabilityOptions.map((day) => (
                    <label key={day} className="flex items-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="availability"
                        value={day}
                        checked={formData.availability.includes(day)}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal & Consent */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">5</span>
                Legal & Consent
              </h3>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  <strong>Error:</strong> {error}
                </div>
              )}
              
              <div className="space-y-3">
                <label className="flex items-start p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="backgroundCheck"
                    checked={formData.backgroundCheck}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <span className="font-medium">Background Check Consent *</span> - I authorize a background check as part of the volunteer screening process.
                  </span>
                </label>
                <label className="flex items-start p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactReferences"
                    checked={formData.contactReferences}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <span className="font-medium">Contact References</span> - I permit contacting my references for verification purposes.
                  </span>
                </label>
                <label className="flex items-start p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <span className="font-medium">Terms & Conditions *</span> - I agree to abide by the school's volunteer policies and code of conduct.
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Buttons */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                position: '',
                experience: '',
                skills: [],
                availability: [],
                backgroundCheck: false,
                contactReferences: false,
                termsAgreed: false,
              });
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium shadow-md transition-all ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </div>
    </div>
  );
}