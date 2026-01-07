import {Shield, Scan, XCircle, AlertTriangle, Activity, Clock} from 'lucide-react';

const Security = () => {
  return (
    <div className="space-y-6">
      {/* Live Security Screening Station */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center text-white gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <span>Live Security Screening Station</span>
              <p className="text-sm text-red-100 font-normal mt-1">Real-time background check & threat detection</p>
            </div>
          </h2>
          <button className="bg-white text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition-all shadow-lg font-semibold">
            Reset Station
          </button>
        </div>

        {/* Screening Workflow */}
        <div className="text-center py-16">
          <div className="border-4 border-dashed border-white/30 rounded-2xl p-16 bg-white/10 backdrop-blur-md">
            <Scan className="h-28 w-28 text-white mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4 text-white">ID Scanner Ready</h3>
            <p className="text-red-100 mb-8 text-lg">Place driver's license, passport, or military ID on the scanner</p>
            <button className="bg-white text-red-600 px-10 py-5 rounded-xl hover:bg-red-50 transition-all text-xl font-bold shadow-2xl hover:scale-105">
              <div className="flex items-center gap-3">
                <Scan className="h-6 w-6" />
                Start ID Scan
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Watchlist */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            Custom Watchlist
          </h3>
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Add Entry
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { id: 1, name: 'John Doe', reason: 'Banned - Disruptive Behavior', category: 'banned', dateAdded: '2024-01-15' },
            { id: 2, name: 'Jane Smith', reason: 'Restraining Order', category: 'restraining', dateAdded: '2024-02-08' },
            { id: 3, name: 'Mike Johnson', reason: 'Flagged Guardian - Custody Issues', category: 'flagged', dateAdded: '2024-03-12' }
          ].map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="font-bold text-red-900">{entry.name}</p>
                  <p className="text-sm text-red-700">{entry.reason}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    Added: {entry.dateAdded}
                  </p>
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 shadow-md hover:shadow-lg transition-all">
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 text-center shadow-lg">
              <p className="font-bold text-3xl mb-1">1</p>
              <p className="text-sm text-red-100">Banned</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 text-center shadow-lg">
              <p className="font-bold text-3xl mb-1">1</p>
              <p className="text-sm text-orange-100">Restraining Orders</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-4 text-center shadow-lg">
              <p className="font-bold text-3xl mb-1">1</p>
              <p className="text-sm text-yellow-100">Flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
          Security Activity & Alerts
        </h3>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-4">Recent Screening Activity</h4>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', status: 'approved', time: '2 min ago', type: 'Parent Visit', riskLevel: 'low' },
                { name: 'Michael Brown', status: 'approved', time: '8 min ago', type: 'Delivery', riskLevel: 'low' },
                { name: 'Unknown Individual', status: 'flagged', time: '15 min ago', type: 'Unauthorized', riskLevel: 'high' },
                { name: 'Lisa Chen', status: 'approved', time: '23 min ago', type: 'Volunteer', riskLevel: 'low' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full shadow-md ${
                      activity.status === 'approved' ? 'bg-green-500' : 'bg-red-500 animate-pulse'
                    }`} />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{activity.name}</p>
                      <p className="text-xs text-gray-600">{activity.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">{activity.time}</p>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm ${
                      activity.riskLevel === 'low' ? 'bg-green-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {activity.riskLevel} risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;