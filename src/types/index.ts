// Type definitions for the School Safety System

export interface WatchlistEntry {
  id: number;
  name: string;
  reason: string;
  category: 'banned' | 'restraining' | 'flagged';
  dateAdded: string;
}

export interface ScannedData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseNumber: string;
  state: string;
  address: string;
  photoUrl: string;
  expirationDate: string;
}

export interface ScreeningResults {
  sexOffenderRegistry: string;
  criminalBackground: string;
  watchlistCheck: string;
  federalDatabase: string;
  overallStatus: 'APPROVED' | 'FLAGGED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: string;
}

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'pending_approval' | 'inactive';
  backgroundCheck: 'completed' | 'pending' | 'expired';
  backgroundCheckDate: string | null;
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
}

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  type: string;
  description: string;
  maxCapacity: number;
  status: string;
  preRegistrations: number;
  checkedIn: number;
  requiresScreening: boolean;
  allowWalkIns: boolean;
  registrationDeadline: string;
  createdDate: string;
  organizer: string;
  registrationLink: string;
  attendees: EventAttendee[];
}

export interface EventAttendee {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'screened' | 'flagged';
  registeredDate: string;
  checkedIn: boolean;
  checkInTime?: string;
}

export interface EmergencyStatus {
  active: boolean;
  type: string | null;
  startTime: string | null;
  description: string;
  responseLevel: 'normal' | 'low' | 'medium' | 'high';
}

export interface EmergencyProtocol {
  id: number;
  type: string;
  icon: string;
  color: string;
  description: string;
  steps: string[];
  active: boolean;
  lastActivated: string | null;
}

export interface StudentAccountability {
  totalStudents: number;
  accountedFor: number;
  pending: number;
  missing: number;
  offCampus: number;
  classrooms: Classroom[];
}

export interface Classroom {
  id: number;
  room: string;
  teacher: string;
  total: number;
  accounted: number;
  status: 'complete' | 'pending';
  lastUpdate: string;
}

// Visitor Check-In System Interfaces
export interface Visitor {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  organization?: string;
  purpose: string;
  personToVisit: string;
  expectedDuration: string;
  visitorType: 'first_time' | 'frequent' | 'pre_registered';
  checkInTime: string;
  checkOutTime?: string;
  badgeId: string;
  status: 'checked_in' | 'checked_out' | 'pending';
  screeningStatus: 'approved' | 'flagged' | 'pending';
  photoUrl?: string;
  idDocument?: ScannedData;
  screeningResults?: ScreeningResults;
  notes?: string;
}

export interface VisitorStats {
  totalVisitors: number;
  checkedIn: number;
  checkedOut: number;
  pending: number;
  flagged: number;
  approved: number;
}
