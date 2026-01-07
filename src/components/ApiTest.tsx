import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

const ApiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const testSignup = async () => {
    setIsLoading(true);
    setTestResult('Testing signup...');
    
    try {
      // Test data - this is just for testing purposes
      const testData = {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'visitor',
        agreeTerms: true
      };
      
      const response = await api.signup(testData);
      setTestResult(`Success! User ID: ${response.user.id}`);
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>API Test Component</h2>
      <button 
        onClick={testSignup} 
        disabled={isLoading}
        style={{ padding: '10px 20px', marginRight: '10px' }}
      >
        {isLoading ? 'Testing...' : 'Test Signup API'}
      </button>
      <div style={{ marginTop: '10px' }}>
        <strong>Result:</strong> {testResult}
      </div>
    </div>
  );
};

export default ApiTest;