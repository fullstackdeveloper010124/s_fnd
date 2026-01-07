// Debug API utility to help troubleshoot connection issues
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeTerms: boolean;
}

export const debugApi = {
  // Test direct fetch to signup endpoint
  async testDirectSignup(data: SignupData) {
    console.log('Testing direct fetch to:', `${API_BASE_URL}/api/auth/signup`);
    console.log('Sending data:', data);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
      const text = await response.text();
      console.log('Raw response text:', text);
      
      // Try to parse as JSON
      try {
        const json = JSON.parse(text);
        console.log('Parsed JSON response:', json);
        return { status: response.status, data: json };
      } catch (parseError) {
        console.log('Could not parse response as JSON');
        return { status: response.status, data: text };
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return { status: 0, error: error.message };
    }
  },
  
  // Test health endpoint
  async testHealth() {
    console.log('Testing health endpoint:', `${API_BASE_URL}/health`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('Health check result:', data);
      return { status: response.status, data };
    } catch (error) {
      console.error('Health check error:', error);
      return { status: 0, error: error.message };
    }
  }
};