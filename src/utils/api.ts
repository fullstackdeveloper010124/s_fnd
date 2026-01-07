// API utility functions for the School Safety System frontend

// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: check current host
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
      return 'http://localhost:3001/api';
    }
  }
  // Default to production API
  return 'https://school-backend-wzms.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Mock data for development
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'teacher@example.com', password: 'teacher123', role: 'teacher' },
  { email: 'user@example.com', password: 'user123', role: 'visitor' }
];

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  agreeTerms: boolean;
}

interface AdminLoginCredentials {
  email: string;
  password: string;
}

export const api = {
  // User login
  login: async (credentials: LoginCredentials) => {
    // Mock login implementation for development
    if (process.env.NODE_ENV === 'development' || API_BASE_URL.includes('localhost')) {
      const user = mockUsers.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password
      );
      
      if (user) {
        return {
          token: 'mock-jwt-token',
          user: {
            email: user.email,
            role: user.role
          }
        };
      } else {
        throw new Error('Invalid email or password');
      }
    }
    
    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  },

  // Admin login
  adminLogin: async (credentials: AdminLoginCredentials) => {
    // Mock admin login implementation for development
    if (process.env.NODE_ENV === 'development' || API_BASE_URL.includes('localhost')) {
      const user = mockUsers.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password
      );
      
      if (user) {
        return {
          token: 'mock-jwt-token',
          user: {
            email: user.email,
            role: user.role
          }
        };
      } else {
        throw new Error('Invalid email or password');
      }
    }
    
    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  },

  // User signup
  signup: async (userData: SignupData) => {
    // Mock signup implementation for development
    if (process.env.NODE_ENV === 'development' || API_BASE_URL.includes('localhost')) {
      // Add the new user to mockUsers
      mockUsers.push({
        email: userData.email,
        password: userData.password,
        role: userData.role
      });
      
      return {
        message: 'Account created successfully',
        token: 'mock-jwt-token',
        user: {
          email: userData.email,
          role: userData.role
        }
      };
    }
    
    const response = await fetch(API_BASE_URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  },

  // Get notifications (for admin dashboard)
  getNotifications: async () => {
    // This would require authentication in a real implementation
    return [
      { id: '1', message: 'New volunteer registration pending approval', timestamp: new Date().toISOString(), read: false },
      { id: '2', message: 'Security incident reported in Main Building', timestamp: new Date(Date.now() - 3600000).toISOString(), read: true },
    ];
  },

  // Get unread notification count
  getUnreadNotificationCount: async () => {
    return 1; // Placeholder
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    return {
      data: {
        totalVisitors: 125,
        completedScreenings: 118,
        activeIncidents: 0,
        systemHealth: '98%',
        activeSessions: 42,
        pendingApprovals: 3,
        systemAlerts: 2,
      }
    };
  },

  // Mark notification as read
  markNotificationAsRead: async (id: string) => {
    // Placeholder implementation
    return { success: true };
  },

  // Approve volunteer
  approveVolunteer: async (id: string, approved: boolean) => {
    // Placeholder implementation
    return { message: approved ? 'Volunteer approved successfully' : 'Volunteer rejected' };
  },

  // Get volunteers
  getVolunteers: async () => {
    const response = await fetch(API_BASE_URL + '/volunteers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, you would include the auth token here
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  },

  // Create a new volunteer
  createVolunteer: async (volunteerData: any) => {
    console.log('Creating volunteer with data:', volunteerData);
    const response = await fetch(API_BASE_URL + '/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, you would include the auth token here
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(volunteerData),
    });

    console.log('Response status:', response.status);
    const responseData = await response.json().catch(() => {
      console.log('Failed to parse response JSON');
      return {};
    });
    
    console.log('Response data:', responseData);

    if (!response.ok) {
      console.error('API call failed with status:', response.status);
      console.error('Error response:', responseData);
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }

    return responseData;
  },

  // Check in a volunteer
  checkInVolunteer: async (id: string, assignment: string) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, you would include the auth token here
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ assignment }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  },

  // Check out a volunteer
  checkOutVolunteer: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, you would include the auth token here
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
    }

    return await response.json();
  }
};
