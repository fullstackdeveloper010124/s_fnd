# API Integration Guide

This document explains how the frontend connects to the backend API and how to troubleshoot any issues.

## API Endpoints

The backend API runs on `http://localhost:3001` by default and provides the following endpoints:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Incidents
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create new incident

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers/:id` - Get volunteer by ID
- `POST /api/volunteers` - Create new volunteer
- `PUT /api/volunteers/:id` - Update volunteer
- `DELETE /api/volunteers/:id` - Delete volunteer
- `PUT /api/volunteers/:id/checkin` - Check-in volunteer
- `PUT /api/volunteers/:id/checkout` - Check-out volunteer

## Setup Instructions

1. Make sure the backend server is running on port 3001
2. Make sure the frontend is configured to connect to the correct API URL
3. Check that CORS is properly configured (should be enabled in the backend)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend has CORS enabled (it should be already configured)

2. **Network Errors**: 
   - Verify the backend server is running
   - Check that the API_BASE_URL in the frontend matches the backend URL
   - Ensure there are no firewall or network restrictions

3. **400 Bad Request Errors**:
   - Check that all required fields are being sent
   - Verify that passwords match (for signup)
   - Ensure email format is valid

4. **500 Server Errors**:
   - Check the backend logs for detailed error information
   - Verify that the database connection is working
   - Ensure all required environment variables are set

### Testing the Connection

You can use the DebugApiTest component to test the API connection:

1. Import it in your App.tsx:
   ```tsx
   import DebugApiTest from './components/DebugApiTest';
   ```

2. Add it to your JSX:
   ```tsx
   <DebugApiTest />
   ```

3. Open the browser console to see detailed logs
4. Click the test buttons to verify connectivity

### Environment Variables

The frontend uses the following environment variable:
- `REACT_APP_API_BASE_URL` - The base URL for the API (defaults to http://localhost:3001)

Make sure to create a `.env` file in the frontend root with:
```
REACT_APP_API_BASE_URL=http://localhost:3001
```

## API Response Formats

### Successful Signup Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "fullName": "User Name",
    "email": "user@example.com",
    "phone": "1234567890",
    "role": "visitor"
  },
  "token": "jwt_token"
}
```

### Successful Login Response
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "fullName": "User Name",
    "email": "user@example.com",
    "phone": "1234567890",
    "role": "visitor"
  },
  "token": "jwt_token"
}
```

## Error Handling

All API errors should be handled gracefully in the frontend. The API utility throws errors with descriptive messages that can be caught and displayed to the user.