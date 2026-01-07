import { UserPlus, Users, Clock, CheckCircle, LogOut, Activity, Search, Check, X, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import VolunteerPopupForm from '../../components/VolunteerPopupForm';
import { api } from '../../utils/api';
import { Volunteer as VolunteerType } from '../../types';

const Volunteers = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [volunteers, setVolunteers] = useState<VolunteerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<number | ''>('');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  
  // Admin-specific states
  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch volunteers from backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await api.getVolunteers();
        // Ensure the data is properly formatted
        const data = Array.isArray(response) ? response : response.data || [];
        // Convert string IDs to numbers if needed
        const formattedVolunteers = data.map((vol: VolunteerType) => ({
          ...vol,
          id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
        }));
        setVolunteers(formattedVolunteers);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch volunteers');
        console.error('Error fetching volunteers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const handleAddVolunteer = async (volunteerData: any) => {
    try {
      const response = await api.createVolunteer(volunteerData);
      // Add the new volunteer to the list, ensuring id type consistency
      const newVolunteer = {
        ...response.volunteer,
        id: typeof response.volunteer.id === 'string' ? parseInt(response.volunteer.id, 10) : response.volunteer.id
      };
      setVolunteers([...volunteers, newVolunteer]);
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to add volunteer');
      console.error('Error adding volunteer:', err);
    }
  };

  const handleCheckIn = async (id: number, assignment: string) => {
    try {
      const response = await api.checkInVolunteer(id.toString(), assignment);
      // Update the volunteer with the response data, converting string IDs back to numbers if needed
      setVolunteers(volunteers.map(vol => {
        if (vol.id === id) {
          return { 
            ...vol, 
            ...response.volunteer,
            id: vol.id // Preserve original id type
          };
        }
        return vol;
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to check in volunteer');
      console.error('Error checking in volunteer:', err);
    }
  };

  const handleCheckOut = async (id: number) => {
    try {
      const response = await api.checkOutVolunteer(id.toString());
      // Update the volunteer with the response data, converting string IDs back to numbers if needed
      setVolunteers(volunteers.map(vol => {
        if (vol.id === id) {
          return { 
            ...vol, 
            ...response.volunteer,
            id: vol.id // Preserve original id type
          };
        }
        return vol;
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to check out volunteer');
      console.error('Error checking out volunteer:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium">Error: {error}</p>
        </div>
      )}

      {/* Add Volunteer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50">
          <VolunteerPopupForm 
            onClose={() => setShowAddForm(false)} 
            onSubmit={handleAddVolunteer}
          />
          <div 
            className="absolute inset-0 bg-black/40 cursor-pointer"
            onClick={() => setShowAddForm(false)}
          ></div>
        </div>
      )}

      {/* Volunteer Management Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Volunteer Management Hub</h2>
            <p className="text-teal-100 text-lg">Track, manage, and coordinate volunteer activities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-white text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-50 transition-all shadow-xl font-bold flex items-center gap-2 hover:scale-105"
            >
              <UserPlus className="h-5 w-5" />
              Add New Volunteer
            </button>
            <button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl font-bold flex items-center gap-2 hover:scale-105"
            >
              <FileText className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-teal-100 rounded-xl">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <span className="text-sm font-semibold text-teal-600">↑ +2</span>
            </div>
            <p className="text-3xl font-bold text-teal-700 mb-1">{volunteers.filter(v => v.status === 'active').length}</p>
            <p className="text-sm text-teal-600 font-medium">Active Volunteers</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
            </div>
            <p className="text-3xl font-bold text-blue-700 mb-1">{volunteers.filter(v => v.status === 'active' && v.isCheckedIn).length}</p>
            <p className="text-sm text-blue-600 font-medium">Currently On Site</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-purple-600">This month</span>
            </div>
            <p className="text-3xl font-bold text-purple-700 mb-1">
              {volunteers
                .filter(v => v.status === 'active')
                .reduce((sum, v) => sum + (v.hoursThisMonth || 0), 0)}
            </p>
            <p className="text-sm text-purple-600 font-medium">Total Hours</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <UserPlus className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-yellow-600">New</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700 mb-1">{volunteers.filter(v => v.status === 'pending_approval').length}</p>
            <p className="text-sm text-yellow-600 font-medium">Pending Applications</p>
          </div>
        </div>
      </div>

      {/* Volunteer Check-in/out Interface */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Activity className="h-6 w-6 text-teal-600" />
          </div>
          Volunteer Check-In/Out Station
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Check-in Form */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-gray-700">Quick Check-In</h4>
            <div className="space-y-5">
              <select 
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                value={selectedVolunteer}
                onChange={(e) => setSelectedVolunteer(e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Select Volunteer</option>
                {volunteers
                  .filter(vol => vol.status === 'active' && !vol.isCheckedIn)
                  .map(vol => (
                    <option key={vol.id} value={vol.id}>{vol.name} - {vol.role}</option>
                  ))}
              </select>
              
              <select 
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
              >
                <option value="">Select Assignment</option>
                <option value="Library Assistant">Library Assistant</option>
                <option value="Office Helper">Office Helper</option>
                <option value="Playground Monitor">Playground Monitor</option>
                <option value="Reading Tutor">Reading Tutor</option>
              </select>
              
              <button 
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (selectedVolunteer !== '' && selectedAssignment) {
                    handleCheckIn(selectedVolunteer, selectedAssignment);
                    // Reset selections after check-in
                    setSelectedVolunteer('');
                    setSelectedAssignment('');
                  }
                }}
                disabled={selectedVolunteer === '' || !selectedAssignment}
              >
                <CheckCircle className="h-5 w-5" />
                Check In Volunteer
              </button>
            </div>
          </div>

          {/* Currently Checked In */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-gray-700">Currently Checked In ({volunteers.filter(v => v.status === 'active' && v.isCheckedIn).length})</h4>
            <div className="space-y-3">
              {volunteers
                .filter(v => v.status === 'active' && v.isCheckedIn)
                .map((volunteer) => (
                <div key={volunteer.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-md" />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{volunteer.name}</p>
                      <p className="text-xs text-gray-600">{volunteer.role}</p>
                      <p className="text-xs text-teal-600 font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Since {volunteer.checkInTime ? new Date(volunteer.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCheckOut(volunteer.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1"
                  >
                    <LogOut className="h-3 w-3" />
                    Check Out
                  </button>
                </div>
              ))}
              
              {volunteers.filter(v => v.isCheckedIn).length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="font-medium">No volunteers currently checked in</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            Volunteer Directory
          </h3>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search volunteers..."
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedVolunteers.length > 0 && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl flex flex-wrap items-center gap-3">
            <span className="font-bold text-purple-700">{selectedVolunteers.length} selected</span>
            <div className="flex flex-wrap gap-2">
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                onClick={async () => {
                  try {
                    // Approve all selected volunteers
                    for (const volunteerId of selectedVolunteers) {
                      await api.approveVolunteer(volunteerId.toString(), true);
                    }
                    // Refresh the volunteer list
                    const response = await api.getVolunteers();
                    // Ensure the data is properly formatted
                    const data = Array.isArray(response) ? response : response.data || [];
                    // Convert string IDs to numbers if needed
                    const formattedVolunteers = data.map((vol: VolunteerType) => ({
                      ...vol,
                      id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                    }));
                    setVolunteers(formattedVolunteers);
                    setSelectedVolunteers([]);
                    alert(`Successfully approved ${selectedVolunteers.length} volunteers`);
                  } catch (err: any) {
                    setError(err.message || 'Failed to approve selected volunteers');
                    console.error('Error approving selected volunteers:', err);
                  }
                }}
              >
                Approve Selected
              </button>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
                Send Reminder
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                onClick={async () => {
                  try {
                    // Reject all selected volunteers
                    for (const volunteerId of selectedVolunteers) {
                      await api.approveVolunteer(volunteerId.toString(), false);
                    }
                    // Refresh the volunteer list
                    const response = await api.getVolunteers();
                    // Ensure the data is properly formatted
                    const data = Array.isArray(response) ? response : response.data || [];
                    // Convert string IDs to numbers if needed
                    const formattedVolunteers = data.map((vol: VolunteerType) => ({
                      ...vol,
                      id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                    }));
                    setVolunteers(formattedVolunteers);
                    setSelectedVolunteers([]);
                    alert(`Successfully rejected ${selectedVolunteers.length} volunteers`);
                  } catch (err: any) {
                    setError(err.message || 'Failed to reject selected volunteers');
                    console.error('Error rejecting selected volunteers:', err);
                  }
                }}
              >
                Reject Selected
              </button>
            </div>
            <button 
              onClick={() => setSelectedVolunteers([])}
              className="ml-auto text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
      
      {/* Pending Approvals */}
      {volunteers.some(v => v.status === 'pending_approval') && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 border-2">
          <h3 className="text-2xl font-bold mb-6 text-amber-800 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <UserPlus className="h-6 w-6 text-amber-600" />
            </div>
            Pending Volunteer Approvals
            <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full ml-2">
              {volunteers.filter(v => v.status === 'pending_approval').length}
            </span>
          </h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-amber-200 bg-amber-50">
                  <th className="text-left p-4 font-bold text-amber-700">Name</th>
                  <th className="text-left p-4 font-bold text-amber-700">Role</th>
                  <th className="text-left p-4 font-bold text-amber-700">Registration Date</th>
                  <th className="text-left p-4 font-bold text-amber-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers
                  .filter(volunteer => volunteer.status === 'pending_approval')
                  .map(volunteer => (
                    <tr key={volunteer.id} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-amber-800">{volunteer.name}</p>
                          <p className="text-sm text-amber-600">{volunteer.email}</p>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-amber-700">{volunteer.role}</td>
                      <td className="p-4 text-amber-700">
                        {new Date(volunteer.joinDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                            onClick={async () => {
                              try {
                                const response = await api.approveVolunteer(volunteer.id.toString(), true);
                                // Update the volunteer status in the state
                                setVolunteers(volunteers.map(v => {
                                  if (v.id === volunteer.id) {
                                    return { ...v, status: 'active' };
                                  }
                                  return v;
                                }));
                                alert(response.message);
                                // Refresh the list to ensure consistency
                                const updatedResponse = await api.getVolunteers();
                                const updatedData = Array.isArray(updatedResponse) ? updatedResponse : updatedResponse.data || [];
                                const updatedVolunteers = updatedData.map((vol: VolunteerType) => ({
                                  ...vol,
                                  id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                                }));
                                setVolunteers(updatedVolunteers);
                              } catch (err: any) {
                                setError(err.message || 'Failed to approve volunteer');
                              }
                            }}
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </button>
                          <button 
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                            onClick={async () => {
                              try {
                                const response = await api.approveVolunteer(volunteer.id.toString(), false);
                                // Update the volunteer status in the state
                                setVolunteers(volunteers.map(v => {
                                  if (v.id === volunteer.id) {
                                    return { ...v, status: 'inactive' };
                                  }
                                  return v;
                                }));
                                alert(response.message);
                                // Refresh the list to ensure consistency
                                const updatedResponse = await api.getVolunteers();
                                const updatedData = Array.isArray(updatedResponse) ? updatedResponse : updatedResponse.data || [];
                                const updatedVolunteers = updatedData.map((vol: VolunteerType) => ({
                                  ...vol,
                                  id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                                }));
                                setVolunteers(updatedVolunteers);
                              } catch (err: any) {
                                setError(err.message || 'Failed to reject volunteer');
                              }
                            }}
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Volunteer Directory */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          Volunteer Directory
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-bold text-gray-700 w-12">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVolunteers(volunteers.map(v => v.id));
                      } else {
                        setSelectedVolunteers([]);
                      }
                    }}
                    checked={selectedVolunteers.length === volunteers.length && volunteers.length > 0}
                  />
                </th>
                <th className="text-left p-4 font-bold text-gray-700">Name</th>
                <th className="text-left p-4 font-bold text-gray-700">Role</th>
                <th className="text-left p-4 font-bold text-gray-700">Status</th>
                <th className="text-left p-4 font-bold text-gray-700">Background Check</th>
                <th className="text-left p-4 font-bold text-gray-700">Hours (Month)</th>
                <th className="text-left p-4 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers
                .filter(volunteer => volunteer.status !== 'pending_approval')
                .map(volunteer => (
                <tr key={volunteer.id} className="border-b border-gray-100 hover:bg-teal-50 transition-colors">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVolunteers([...selectedVolunteers, volunteer.id]);
                        } else {
                          setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteer.id));
                        }
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-bold text-gray-800">{volunteer.name}</p>
                      <p className="text-sm text-gray-600">{volunteer.email}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{volunteer.role}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-md">
                        {volunteer.status}
                      </span>
                      {volunteer.isCheckedIn && (
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500 text-white shadow-md flex items-center gap-1">
                          <Activity className="h-3 w-3 animate-pulse" />
                          Checked In
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md ${volunteer.backgroundCheck === 'completed' ? 'bg-green-500' : volunteer.backgroundCheck === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}>
                        {volunteer.backgroundCheck.replace('_', ' ')}
                      </span>
                      {volunteer.backgroundCheckDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(volunteer.backgroundCheckDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="font-bold text-lg text-gray-800">{volunteer.hoursThisMonth || 0}h</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {volunteer.status === 'pending_approval' ? (
                        <>
                          <button 
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                            onClick={async () => {
                              try {
                                const response = await api.approveVolunteer(volunteer.id.toString(), true);
                                // Update the volunteer status in the state
                                setVolunteers(volunteers.map(v => {
                                  if (v.id === volunteer.id) {
                                    return { ...v, status: 'active' };
                                  }
                                  return v;
                                }));
                                alert(response.message);
                                // Refresh the list to ensure consistency
                                const updatedResponse = await api.getVolunteers();
                                const updatedData = Array.isArray(updatedResponse) ? updatedResponse : updatedResponse.data || [];
                                const updatedVolunteers = updatedData.map((vol: VolunteerType) => ({
                                  ...vol,
                                  id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                                }));
                                setVolunteers(updatedVolunteers);
                              } catch (err: any) {
                                setError(err.message || 'Failed to approve volunteer');
                              }
                            }}
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </button>
                          <button 
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                            onClick={async () => {
                              try {
                                const response = await api.approveVolunteer(volunteer.id.toString(), false);
                                // Update the volunteer status in the state
                                setVolunteers(volunteers.map(v => {
                                  if (v.id === volunteer.id) {
                                    return { ...v, status: 'inactive' };
                                  }
                                  return v;
                                }));
                                alert(response.message);
                                // Refresh the list to ensure consistency
                                const updatedResponse = await api.getVolunteers();
                                const updatedData = Array.isArray(updatedResponse) ? updatedResponse : updatedResponse.data || [];
                                const updatedVolunteers = updatedData.map((vol: VolunteerType) => ({
                                  ...vol,
                                  id: typeof vol.id === 'string' ? parseInt(vol.id, 10) : vol.id
                                }));
                                setVolunteers(updatedVolunteers);
                              } catch (err: any) {
                                setError(err.message || 'Failed to reject volunteer');
                              }
                            }}
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all">
                            View Profile
                          </button>
                          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
                            Admin Actions
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;