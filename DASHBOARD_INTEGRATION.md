# Dashboard API Integration Guide

This document explains how the dashboard connects to the backend API and displays real-time data.

## Overview

The dashboard now fetches real data from the backend API instead of using static data. This includes:
- Visitor count (based on checked-in volunteers)
- Incident statistics
- Location distribution
- Security screening data

## Implementation Details

### 1. API Utility (`src/utils/api.ts`)

The API utility has been enhanced with new methods:
- `getVolunteers()` - Fetches all volunteers
- `getIncidents()` - Fetches all incidents
- `getIncidentsByStatus(status)` - Filters incidents by status
- `getIncidentsCountByLocation()` - Groups incidents by location
- `getCheckedInVolunteersCount()` - Counts checked-in volunteers

### 2. Custom Hook (`src/hooks/useDashboardData.ts`)

A custom React hook `useDashboardData` manages all data fetching logic:
- Fetches volunteers and incidents from the backend
- Processes data for charts and statistics
- Handles loading and error states
- Automatically refreshes data every 30 seconds
- Provides manual refresh capability

### 3. Dashboard Component (`src/pages/Dashboard.tsx`)

The dashboard component now:
- Uses the `useDashboardData` hook to fetch real data
- Displays loading indicators while data is being fetched
- Shows error messages if data fetching fails
- Includes a refresh button to manually update data
- Uses real visitor counts instead of static values
- Dynamically updates charts with backend data

## Data Mapping

### Visitor Count
- **Source**: Volunteers API
- **Calculation**: Count of volunteers where `isCheckedIn = true`

### Security Data (Pie Chart)
- **Source**: Incidents API
- **Mapping**:
  - Approved = Incidents with status "Completed"
  - Pending = Incidents with status "In Progress"
  - Flagged = Incidents with status "Reported"

### Location Data (Bar Chart)
- **Source**: Incidents API
- **Processing**: Group incidents by location field

## Error Handling

The dashboard includes comprehensive error handling:
- Loading states show a spinner while data is being fetched
- Error messages display if API calls fail
- Retry button allows users to manually refresh data
- Fallback to static data if API is unavailable

## Manual Refresh

Users can manually refresh dashboard data by clicking the "Refresh" button in the header. This is useful when:
- New incidents or volunteers have been added
- Network issues prevented automatic updates
- Users want the most current data

## Automatic Refresh

The dashboard automatically refreshes data every 30 seconds to ensure:
- Real-time updates of visitor counts
- Current incident statistics
- Up-to-date location distribution

## Testing

A test component (`src/components/DashboardTest.tsx`) is included to verify the API integration is working correctly.

## Future Enhancements

Potential improvements that could be made:
1. Add WebSocket support for real-time updates
2. Implement caching to reduce API calls
3. Add more detailed filtering options
4. Include historical data comparisons
5. Add export functionality for reports

## Troubleshooting

Common issues and solutions:

### No Data Displayed
- Check that the backend server is running
- Verify API endpoints are accessible
- Check browser console for network errors

### Incorrect Visitor Count
- Verify volunteers have `isCheckedIn = true` in the database
- Check that the volunteers API is returning data

### Charts Not Updating
- Ensure automatic refresh is working
- Try manual refresh
- Check that incident data includes required fields

## API Endpoints Used

- `GET /api/volunteers` - Get all volunteers
- `GET /api/incidents` - Get all incidents

These endpoints are defined in the backend routes:
- `src/routes/volunteerRoutes.ts`
- `src/routes/safetyRoutes.ts`