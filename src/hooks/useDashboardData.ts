import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'pending_approval' | 'inactive';
  backgroundCheck: 'completed' | 'pending' | 'expired';
  hoursThisMonth: number;
  totalHours: number;
  joinDate: string;
  lastVisit: string | null;
  schedule: string;
  emergencyContact: string;
  skills: string[];
  isCheckedIn: boolean;
  checkInTime: string | null;
  currentAssignment: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Incident {
  _id: string;
  type: string;
  location: string;
  timestamp: string;
  status: string;
  reportedBy?: string;
  createdAt: string;
  updatedAt: string;
}

interface LocationCount {
  location: string;
  count: number;
}

interface SecurityData {
  name: string;
  value: number;
  color: string;
}

export const useDashboardData = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [locationData, setLocationData] = useState<LocationCount[]>([]);
  const [securityData, setSecurityData] = useState<SecurityData[]>([
    { name: 'Approved', value: 0, color: '#10b981' },
    { name: 'Pending', value: 0, color: '#f59e0b' },
    { name: 'Flagged', value: 0, color: '#ef4444' }
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch volunteers data
      const volunteersResponse = await api.getVolunteers();
      const volunteersData = volunteersResponse.data || [];
      setVolunteers(volunteersData);

      // Calculate visitor count (checked-in volunteers)
      const checkedInCount = volunteersData.filter((volunteer: Volunteer) => volunteer.isCheckedIn).length;
      setVisitorCount(checkedInCount);

      // Fetch incidents data
      const incidentsResponse = await api.getIncidents();
      const incidentsData = incidentsResponse.data || [];
      setIncidents(incidentsData);

      // Update security data based on incidents
      const approvedCount = incidentsData.filter((incident: Incident) => incident.status === 'Completed').length;
      const pendingCount = incidentsData.filter((incident: Incident) => incident.status === 'In Progress').length;
      const flaggedCount = incidentsData.filter((incident: Incident) => incident.status === 'Reported').length;
      
      setSecurityData([
        { name: 'Approved', value: approvedCount, color: '#10b981' },
        { name: 'Pending', value: pendingCount, color: '#f59e0b' },
        { name: 'Flagged', value: flaggedCount, color: '#ef4444' }
      ]);

      // Fetch location data
      const locationCounts = await api.getIncidentsCountByLocation();
      setLocationData(locationCounts.length > 0 ? locationCounts : [
        { location: 'Main', count: 42 },
        { location: 'Gym', count: 18 },
        { location: 'Library', count: 25 },
        { location: 'Cafeteria', count: 31 },
        { location: 'Auditorium', count: 12 }
      ]);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    visitorCount,
    incidents,
    volunteers,
    locationData,
    securityData,
    loading,
    error,
    refreshData: fetchDashboardData
  };
};