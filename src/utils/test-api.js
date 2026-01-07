// Simple test to verify API connectivity
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

async function testApiConnection() {
  try {
    console.log('Testing API connection to:', `${API_BASE_URL}/health`);
    
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    
    console.log('API Connection Test Result:', data);
    
    if (response.ok) {
      console.log('✅ API connection successful!');
      return true;
    } else {
      console.log('❌ API connection failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ API connection error:', error.message);
    return false;
  }
}

// Run the test
testApiConnection();