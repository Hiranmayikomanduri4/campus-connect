export type UserRole = 'student' | 'faculty' | 'coordinator' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  rollNumber?: string;
  phone?: string;
  avatar?: string;
  semester?: string;
  skills?: string[];
  linkedin?: string;
  github?: string;
  resumeUrl?: string;
  bio?: string;
  cgpa?: number;
  joinedYear?: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceSession {
  id: string;
  subject: string;
  courseCode: string;
  facultyId: string;
  facultyName: string;
  department: string;
  date: string;
  records: AttendanceRecord[];
  totalStudents: number;
  presentCount: number;
}

export interface StudentSubjectAttendance {
  subject: string;
  code: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  courseCode: string;
  department: string;
  deadline: string;
  maxMarks: number;
  facultyId: string;
  facultyName: string;
  attachmentUrl?: string;
  rubric?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  solutionText?: string;
  fileUrl?: string;
  githubUrl?: string;
  submittedAt: string;
  status: 'pending' | 'submitted' | 'late' | 'reviewed';
  marks?: number;
  feedback?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  category: 'Tech' | 'Cultural' | 'Sports' | 'Workshop' | 'Seminar' | 'Hackathon';
  deadline: string;
  seats: number;
  registeredCount: number;
  speakers: string[];
  banner: string;
  organizerId: string;
  organizerName: string;
  isRegistrationOpen: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  registeredAt: string;
  ticketCode: string;
  attended?: boolean;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  leadName: string;
  leadId: string;
  banner: string;
  membersCount: number;
  foundedYear: string;
  announcements?: string[];
}

export interface ClubMembership {
  id: string;
  clubId: string;
  clubName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface Placement {
  id: string;
  company: string;
  logo: string;
  role: string;
  description: string;
  eligibility: string;
  minCgpa: number;
  skills: string[];
  ctc: string;
  location: string;
  deadline: string;
  applicationLink?: string;
  status: 'open' | 'closed';
  postedAt: string;
}

export interface PlacementApplication {
  id: string;
  placementId: string;
  company: string;
  role: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  studentCgpa: number;
  resumeUrl?: string;
  appliedAt: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
}

export type AnnouncementCategory = 'Academic' | 'Event' | 'Placement' | 'General' | 'Urgent';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: AnnouncementCategory;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  audience: 'all' | 'students' | 'faculty' | 'coordinators';
  authorName: string;
  authorRole: string;
  date: string;
  department?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'assignment' | 'attendance' | 'event' | 'placement' | 'announcement' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  totalStudents: number;
  totalFaculty: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  facultyName: string;
  semester: string;
}

export interface DemoAccount {
  email: string;
  role: UserRole;
  name: string;
  password?: string;
  description: string;
  avatar: string;
}
