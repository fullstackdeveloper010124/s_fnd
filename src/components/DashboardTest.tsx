import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const DashboardTest: React.FC = () => {
  const { visitorCount, locationData, securityData, loading, error, refreshData } = useDashboardData();

  if (loading) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800">Dashboard API Test</h3>
        <p className="text-yellow-700">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">Dashboard API Test</h3>
        <p className="text-red-700">Error: {error}</p>
        <button 
          onClick={refreshData}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800">Dashboard API Test - Success!</h3>
      <div className="mt-4 space-y-2">
        <p className="text-green-700">
          <strong>Visitor Count:</strong> {visitorCount}
        </p>
        <p className="text-green-700">
          <strong>Locations:</strong> {locationData.length} locations loaded
        </p>
        <p className="text-green-700">
          <strong>Security Data:</strong> {securityData.length} categories loaded
        </p>
      </div>
      <button 
        onClick={refreshData}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default DashboardTest;