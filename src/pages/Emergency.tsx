import { AlertTriangle, Shield, Users, MapPin, Phone, Bell, Mail, Activity, Radio, CheckCircle2 } from 'lucide-react';
import { EmergencyStatus } from '../types';

interface EmergencyProps {
  emergencyStatus: EmergencyStatus;
  setEmergencyStatus: (status: EmergencyStatus) => void;
}

const Emergency = ({ emergencyStatus, setEmergencyStatus }: EmergencyProps) => {
  const studentAccountability = {
    totalStudents: 527,
    accountedFor: 487,
    pending: 23,
    missing: 2,
    offCampus: 15,
    classrooms: [
      { id: 1, room: 'Room 101', teacher: 'Mrs. Johnson', total: 24, accounted: 24, status: 'complete', lastUpdate: '2:45 PM' },
      { id: 2, room: 'Room 102', teacher: 'Mr. Davis', total: 23, accounted: 22, status: 'pending', lastUpdate: '2:43 PM' },
      { id: 3, room: 'Room 103', teacher: 'Ms. Wilson', total: 25, accounted: 25, status: 'complete', lastUpdate: '2:44 PM' },
      { id: 4, room: 'Room 104', teacher: 'Mr. Brown', total: 22, accounted: 21, status: 'pending', lastUpdate: '2:42 PM' }
    ]
  };

  const emergencyContacts = [
    { name: '911 Emergency', number: '911', type: 'emergency' },
    { name: 'District Office', number: '(555) 123-4567', type: 'district' },
    { name: 'Local Police', number: '(555) 234-5678', type: 'police' },
    { name: 'Fire Department', number: '(555) 345-6789', type: 'fire' },
    { name: 'Hospital', number: '(555) 456-7890', type: 'medical' }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Status Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Emergency Response Center</h2>
              <div className="flex items-center gap-3">
                <p className="text-red-100 font-medium">Status: {emergencyStatus.active ? `ACTIVE - ${emergencyStatus.type?.toUpperCase()}` : 'Normal Operations'}</p>
                {emergencyStatus.active && (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Activity className="h-4 w-4 text-white animate-pulse" />
                    <span className="text-white text-sm font-semibold">Live</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setEmergencyStatus({
              active: !emergencyStatus.active,
              type: emergencyStatus.active ? null : 'lockdown',
              startTime: emergencyStatus.active ? null : new Date().toISOString(),
              description: emergencyStatus.active ? '' : 'Emergency activated',
              responseLevel: emergencyStatus.active ? 'normal' : 'high'
            })}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl hover:scale-105 ${
              emergencyStatus.active 
                ? 'bg-white text-red-600 hover:bg-red-50' 
                : 'bg-white text-red-600 hover:bg-red-50 pulse-animation'
            }`}
          >
            {emergencyStatus.active ? '✓ DEACTIVATE EMERGENCY' : '⚠ ACTIVATE EMERGENCY'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Protocols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              Emergency Protocols
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: 'Lockdown', icon: Shield, color: 'red', bgColor: 'red-50', borderColor: 'red-200', description: 'Secure all areas immediately', iconBg: 'red-100' },
                { type: 'Evacuation', icon: Users, color: 'orange', bgColor: 'orange-50', borderColor: 'orange-200', description: 'Exit building using designated routes', iconBg: 'orange-100' },
                { type: 'Shelter-in-Place', icon: MapPin, color: 'yellow', bgColor: 'yellow-50', borderColor: 'yellow-200', description: 'Remain in current location', iconBg: 'yellow-100' }
              ].map((protocol, index) => (
                <div key={index} className={`border-2 border-${protocol.borderColor} bg-${protocol.bgColor} rounded-2xl p-6 hover:shadow-lg cursor-pointer transition-all group`}>
                  <div className={`p-4 bg-${protocol.iconBg} rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <protocol.icon className={`h-8 w-8 text-${protocol.color}-600`} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">{protocol.type}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{protocol.description}</p>
                  <button className={`mt-4 w-full bg-${protocol.color}-500 text-white py-2 rounded-lg font-semibold hover:bg-${protocol.color}-600 transition-colors text-sm`}>
                    Activate Protocol
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                Live Student Accountability
              </h3>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Refresh All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">92%</span>
                </div>
                <p className="text-3xl font-bold mb-1">{studentAccountability.accountedFor}</p>
                <p className="text-sm text-green-100 font-medium">Accounted For</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="h-8 w-8 animate-pulse" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">4%</span>
                </div>
                <p className="text-3xl font-bold mb-1">{studentAccountability.pending}</p>
                <p className="text-sm text-yellow-100 font-medium">Pending</p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-8 w-8" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">0.4%</span>
                </div>
                <p className="text-3xl font-bold mb-1">{studentAccountability.missing}</p>
                <p className="text-sm text-red-100 font-medium">Missing</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-8 w-8" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">3%</span>
                </div>
                <p className="text-3xl font-bold mb-1">{studentAccountability.offCampus}</p>
                <p className="text-sm text-blue-100 font-medium">Off Campus</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-gray-700">Classroom Status</h4>
              {studentAccountability.classrooms.map((classroom) => (
                <div key={classroom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full shadow-md ${
                      classroom.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                    }`} />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{classroom.room} - {classroom.teacher}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        Last update: {classroom.lastUpdate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{classroom.accounted}<span className="text-gray-400">/{classroom.total}</span></p>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm ${
                      classroom.status === 'complete' ? 'bg-green-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {classroom.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Communications & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              Emergency Communications
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <button 
                  key={index}
                  className={`w-full p-4 rounded-xl transition-all text-left flex items-center justify-between shadow-md hover:shadow-lg font-semibold ${
                    contact.type === 'emergency' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700' :
                    contact.type === 'police' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700' :
                    contact.type === 'fire' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700' :
                    contact.type === 'medical' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' :
                    'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-sm opacity-90">{contact.number}</p>
                    </div>
                  </div>
                  <Radio className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="h-5 w-5 text-red-600" />
              </div>
              Alert Systems
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-3 shadow-md hover:shadow-lg font-semibold">
                <Bell className="h-5 w-5" />
                <span>Alert All Staff</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-3 shadow-md hover:shadow-lg font-semibold">
                <Mail className="h-5 w-5" />
                <span>Notify Parents</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all flex items-center gap-3 shadow-md hover:shadow-lg font-semibold">
                <AlertTriangle className="h-5 w-5" />
                <span>District Alert</span>
              </button>

              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-3 shadow-md hover:shadow-lg font-semibold">
                <AlertTriangle className="h-5 w-5" />
                <span>Public Safety Alert</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              Emergency Drills
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Conduct Fire Drill
              </button>
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                Conduct Lockdown Drill
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                Conduct Evacuation Drill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
