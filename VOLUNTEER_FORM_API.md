# Volunteer Form API Integration Guide

This document explains how the VolunteerPopupForm component connects to the backend API and submits volunteer data.

## Overview

The VolunteerPopupForm component integrates with the backend API to submit volunteer registration data. The form collects user input, validates it, and sends it to the backend via the `/api/volunteers` endpoint.

## Implementation Details

### 1. API Utility (`src/utils/api.ts`)

The API utility contains the `createVolunteer` method which handles the POST request to the backend:

```typescript
async createVolunteer(volunteerData: any): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/api/volunteers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(volunteerData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create volunteer');
  }

  return result;
}
```

### 2. Form Submission Process (`src/components/VolunteerPopupForm.tsx`)

The form submission process includes:

1. **Data Validation**: Checks that required fields are filled and consents are given
2. **Data Preparation**: Formats the form data to match the backend Volunteer model
3. **API Call**: Uses the `api.createVolunteer()` method to send data to the backend
4. **Response Handling**: Processes the response and provides user feedback

#### Data Mapping

The form maps frontend fields to backend model fields:

| Frontend Field | Backend Model Field | Value |
|----------------|---------------------|-------|
| firstName + lastName | name | Combined string |
| email | email | Direct mapping |
| phone | phone | Direct mapping |
| position | role | Direct mapping |
| - | status | 'pending_approval' (default) |
| backgroundCheck | backgroundCheck | 'pending' or 'expired' |
| availability | schedule | Comma-separated string |
| skills | skills | Array of strings |

### 3. Backend Endpoint

The backend exposes a RESTful API endpoint for volunteers:

- **POST** `/api/volunteers` - Creates a new volunteer record

The backend uses the Mongoose Volunteer model with the following schema:

```typescript
{
  name: String,
  email: String,
  phone: String,
  role: String,
  status: { type: String, enum: ['active', 'pending_approval', 'inactive'], default: 'pending_approval' },
  backgroundCheck: { type: String, enum: ['completed', 'pending', 'expired'], default: 'pending' },
  backgroundCheckDate: Date,
  hoursThisMonth: Number,
  totalHours: Number,
  joinDate: Date,
  lastVisit: Date,
  schedule: String,
  emergencyContact: String,
  skills: [String],
  isCheckedIn: Boolean,
  checkInTime: Date,
  currentAssignment: String
}
```

## Error Handling

The form includes comprehensive error handling:

1. **Frontend Validation**: Validates required fields before submission
2. **Backend Errors**: Catches and displays API errors
3. **Network Issues**: Handles connection problems gracefully
4. **User Feedback**: Provides clear error messages to users

## Testing

A test component (`src/components/VolunteerApiTest.tsx`) is included to verify the API integration works correctly. This component allows you to:

1. Test creating a volunteer record
2. Test fetching all volunteers
3. View results and error messages

## Troubleshooting

Common issues and solutions:

1. **CORS Errors**: Ensure the backend server is running and CORS is properly configured
2. **Network Errors**: Check that the API base URL is correctly configured in environment variables
3. **Validation Errors**: Ensure all required fields are filled and data formats are correct
4. **Server Errors**: Check the backend logs for detailed error information

## Environment Configuration

The API base URL is configured through environment variables:

```
REACT_APP_API_BASE_URL=http://localhost:3001
```

Ensure this is set correctly in your `.env` file to match your backend server address.