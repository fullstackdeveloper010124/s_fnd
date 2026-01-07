import React, { useState } from 'react';
import { debugApi } from '../utils/debug-api';

const DebugApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addResult = (title: string, result: any) => {
    setTestResults(prev => [...prev, { title, result, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testHealth = async () => {
    setIsLoading(true);
    try {
      const result = await debugApi.testHealth();
      addResult('Health Check', result);
    } catch (error) {
      addResult('Health Check Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testSignup = async () => {
    setIsLoading(true);
    try {
      const testData = {
        fullName: 'Debug Test User',
        email: `debug${Date.now()}@example.com`,
        phone: '1234567890',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'visitor',
        agreeTerms: true
      };
      
      const result = await debugApi.testDirectSignup(testData);
      addResult('Signup Test', result);
    } catch (error) {
      addResult('Signup Test Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ff6b6b', margin: '20px', backgroundColor: '#fff3f3' }}>
      <h2>Debug API Test Component</h2>
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={testHealth} 
          disabled={isLoading}
          style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {isLoading ? 'Testing...' : 'Test Health Endpoint'}
        </button>
        <button 
          onClick={testSignup} 
          disabled={isLoading}
          style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {isLoading ? 'Testing...' : 'Test Signup Endpoint'}
        </button>
        <button 
          onClick={clearResults}
          style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear Results
        </button>
      </div>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>No test results yet. Click a test button above.</p>
        ) : (
          testResults.map((test, index) => (
            <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
              <strong>{test.title} ({test.timestamp})</strong>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '12px' }}>
                {JSON.stringify(test.result, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DebugApiTest;