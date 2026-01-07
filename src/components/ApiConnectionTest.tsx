import React, { useState, useEffect } from 'react';

const ApiConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:3001');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/volunteers`, {
          method: 'OPTIONS'
        });
        
        if (response.ok) {
          setConnectionStatus('✅ Connected successfully');
        } else {
          setConnectionStatus(`⚠️ Server responded with status: ${response.status}`);
        }
      } catch (error) {
        setConnectionStatus(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testConnection();
  }, [apiUrl]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter API base URL"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Connection Status:</h3>
          <div className={`p-3 rounded ${connectionStatus.includes('✅') ? 'bg-green-100 text-green-800' : connectionStatus.includes('⚠️') ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {connectionStatus}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium mb-2">Expected API Endpoints:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>POST /api/volunteers - Create new volunteer</li>
            <li>GET /api/volunteers - Get all volunteers</li>
            <li>GET /api/volunteers/:id - Get volunteer by ID</li>
            <li>PUT /api/volunteers/:id - Update volunteer</li>
            <li>DELETE /api/volunteers/:id - Delete volunteer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiConnectionTest;