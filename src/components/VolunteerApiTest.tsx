import React, { useState } from 'react';
import { api } from '../utils/api';

const VolunteerApiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const testCreateVolunteer = async () => {
    setIsLoading(true);
    setTestResult('Testing volunteer creation...');
    
    try {
      // Test data
      const testData = {
        name: 'Test Volunteer',
        email: 'test.volunteer@example.com',
        phone: '123-456-7890',
        role: 'Classroom Support',
        status: 'pending_approval',
        backgroundCheck: 'pending',
        backgroundCheckDate: null,
        hoursThisMonth: 0,
        totalHours: 0,
        joinDate: new Date(),
        lastVisit: null,
        schedule: 'Monday, Wednesday',
        emergencyContact: '123-456-7890',
        skills: ['Teaching', 'Communication'],
        isCheckedIn: false,
        checkInTime: null,
        currentAssignment: null
      };
      
      const response = await api.createVolunteer(testData);
      setTestResult(`Success! Volunteer created with ID: ${response.volunteer?._id || response.data?._id}`);
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetVolunteers = async () => {
    setIsLoading(true);
    setTestResult('Fetching volunteers...');
    
    try {
      const response = await api.getVolunteers();
      setTestResult(`Success! Found ${response.data?.length || 0} volunteers`);
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Volunteer API Test</h2>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={testCreateVolunteer}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Testing...' : 'Test Create Volunteer'}
          </button>
        </div>
        
        <div>
          <button
            onClick={testGetVolunteers}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Testing...' : 'Test Get Volunteers'}
          </button>
        </div>
        
        {testResult && (
          <div className="p-3 bg-gray-100 rounded">
            <p className="font-medium">Result:</p>
            <p>{testResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerApiTest;