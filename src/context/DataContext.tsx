import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AttendanceSession,
  Assignment,
  Submission,
  CampusEvent,
  EventRegistration,
  Club,
  ClubMembership,
  Placement,
  PlacementApplication,
  Announcement,
  AppNotification,
  ActivityLog,
  Department,
  Course,
  UserProfile
} from '../types';

import {
  INITIAL_ATTENDANCE,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_EVENTS,
  INITIAL_EVENT_REGISTRATIONS,
  INITIAL_CLUBS,
  INITIAL_CLUB_MEMBERSHIPS,
  INITIAL_PLACEMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_USERS
} from '../data/initialData';

interface DataContextType {
  // State Collections
  attendanceSessions: AttendanceSession[];
  assignments: Assignment[];
  submissions: Submission[];
  events: CampusEvent[];
  eventRegistrations: EventRegistration[];
  clubs: Club[];
  clubMemberships: ClubMembership[];
  placements: Placement[];
  applications: PlacementApplication[];
  announcements: Announcement[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];
  departments: Department[];
  courses: Course[];
  allUsers: UserProfile[];

  // Helper Functions
  createAttendanceSession: (session: Omit<AttendanceSession, 'id'>) => void;
  updateAttendanceSession: (id: string, updated: Partial<AttendanceSession>) => void;
  deleteAttendanceSession: (id: string) => void;

  createAssignment: (asg: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, updated: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;

  submitAssignmentSolution: (submission: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;

  createEvent: (evt: Omit<CampusEvent, 'id' | 'registeredCount'>) => void;
  updateEvent: (id: string, updated: Partial<CampusEvent>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string, studentId: string, studentName: string, studentEmail: string) => boolean;
  cancelEventRegistration: (registrationId: string) => void;

  createClub: (club: Omit<Club, 'id' | 'membersCount'>) => void;
  updateClub: (id: string, updated: Partial<Club>) => void;
  applyClubMembership: (clubId: string, studentId: string, studentName: string, studentEmail: string) => void;
  updateClubMembershipStatus: (membershipId: string, status: 'approved' | 'rejected') => void;

  createPlacement: (placement: Omit<Placement, 'id' | 'postedAt' | 'status'>) => void;
  updatePlacement: (id: string, updated: Partial<Placement>) => void;
  applyPlacement: (placementId: string, studentId: string, studentName: string, studentRoll: string, studentCgpa: number) => void;
  updateApplicationStatus: (appId: string, status: PlacementApplication['status']) => void;

  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;

  addDepartment: (dept: Omit<Department, 'id'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;

  logActivity: (userName: string, userRole: any, action: string, details: string) => void;
  resetToDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Utility for local storage fallback / initial state
  const loadState = <T,>(key: string, defaultVal: T): T => {
    const saved = localStorage.getItem(`cc_data_${key}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Error loading ${key}:`, e);
      }
    }
    return defaultVal;
  };

  const saveState = (key: string, val: any) => {
    localStorage.setItem(`cc_data_${key}`, JSON.stringify(val));
  };

  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => loadState('attendance', INITIAL_ATTENDANCE));
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadState('assignments', INITIAL_ASSIGNMENTS));
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadState('submissions', INITIAL_SUBMISSIONS));
  const [events, setEvents] = useState<CampusEvent[]>(() => loadState('events', INITIAL_EVENTS));
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => loadState('registrations', INITIAL_EVENT_REGISTRATIONS));
  const [clubs, setClubs] = useState<Club[]>(() => loadState('clubs', INITIAL_CLUBS));
  const [clubMemberships, setClubMemberships] = useState<ClubMembership[]>(() => loadState('memberships', INITIAL_CLUB_MEMBERSHIPS));
  const [placements, setPlacements] = useState<Placement[]>(() => loadState('placements', INITIAL_PLACEMENTS));
  const [applications, setApplications] = useState<PlacementApplication[]>(() => loadState('applications', INITIAL_APPLICATIONS));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadState('announcements', INITIAL_ANNOUNCEMENTS));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadState('notifications', INITIAL_NOTIFICATIONS));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => loadState('activityLogs', INITIAL_ACTIVITY_LOGS));
  const [departments, setDepartments] = useState<Department[]>(() => loadState('departments', INITIAL_DEPARTMENTS));
  const [courses, setCourses] = useState<Course[]>(() => loadState('courses', INITIAL_COURSES));
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => loadState('allUsers', INITIAL_USERS));

  // Auto-persist on state change
  useEffect(() => saveState('attendance', attendanceSessions), [attendanceSessions]);
  useEffect(() => saveState('assignments', assignments), [assignments]);
  useEffect(() => saveState('submissions', submissions), [submissions]);
  useEffect(() => saveState('events', events), [events]);
  useEffect(() => saveState('registrations', eventRegistrations), [eventRegistrations]);
  useEffect(() => saveState('clubs', clubs), [clubs]);
  useEffect(() => saveState('memberships', clubMemberships), [clubMemberships]);
  useEffect(() => saveState('placements', placements), [placements]);
  useEffect(() => saveState('applications', applications), [applications]);
  useEffect(() => saveState('announcements', announcements), [announcements]);
  useEffect(() => saveState('notifications', notifications), [notifications]);
  useEffect(() => saveState('activityLogs', activityLogs), [activityLogs]);
  useEffect(() => saveState('departments', departments), [departments]);
  useEffect(() => saveState('courses', courses), [courses]);
  useEffect(() => saveState('allUsers', allUsers), [allUsers]);

  const logActivity = (userName: string, userRole: any, action: string, details: string) => {
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      userName,
      userRole,
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif-' + Date.now() + Math.random().toString(36).substring(2, 5),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Attendance Handlers
  const createAttendanceSession = (session: Omit<AttendanceSession, 'id'>) => {
    const newSession: AttendanceSession = {
      ...session,
      id: 'att-' + Date.now()
    };
    setAttendanceSessions(prev => [newSession, ...prev]);
    logActivity(session.facultyName, 'faculty', 'Marked Attendance', `Recorded attendance for ${session.subject}`);
    
    // Notify present/absent students
    session.records.forEach(r => {
      addNotification({
        userId: r.studentId,
        title: 'Attendance Marked',
        message: `You were marked ${r.status.toUpperCase()} in ${session.subject} on ${session.date}.`,
        type: 'attendance'
      });
    });
  };

  const updateAttendanceSession = (id: string, updated: Partial<AttendanceSession>) => {
    setAttendanceSessions(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteAttendanceSession = (id: string) => {
    setAttendanceSessions(prev => prev.filter(s => s.id !== id));
  };

  // Assignment Handlers
  const createAssignment = (asg: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: 'asg-' + Date.now(),
      createdAt: new Date().toISOString().substring(0, 10)
    };
    setAssignments(prev => [newAsg, ...prev]);
    logActivity(asg.facultyName, 'faculty', 'Created Assignment', `Published ${asg.title} for ${asg.subject}`);

    // Notify all students in that department/course
    allUsers.filter(u => u.role === 'student').forEach(st => {
      addNotification({
        userId: st.uid,
        title: 'New Assignment Posted',
        message: `${asg.facultyName} posted ${asg.title} (${asg.subject}). Due: ${asg.deadline}.`,
        type: 'assignment'
      });
    });
  };

  const updateAssignment = (id: string, updated: Partial<Assignment>) => {
    setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const submitAssignmentSolution = (sub: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: Submission = {
      ...sub,
      id: 'sub-' + Date.now(),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'submitted'
    };
    setSubmissions(prev => [newSub, ...prev.filter(s => !(s.assignmentId === sub.assignmentId && s.studentId === sub.studentId))]);
    logActivity(sub.studentName, 'student', 'Submitted Assignment', `Submitted work for assignment ID ${sub.assignmentId}`);

    addNotification({
      userId: sub.studentId,
      title: 'Assignment Submitted',
      message: `Your assignment solution has been received successfully.`,
      type: 'assignment'
    });
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        addNotification({
          userId: s.studentId,
          title: 'Assignment Reviewed',
          message: `Your submission for assignment was graded: ${marks} marks. Feedback: "${feedback}".`,
          type: 'assignment'
        });
        return { ...s, marks, feedback, status: 'reviewed' };
      }
      return s;
    }));
  };

  // Event Handlers
  const createEvent = (evt: Omit<CampusEvent, 'id' | 'registeredCount'>) => {
    const newEvt: CampusEvent = {
      ...evt,
      id: 'evt-' + Date.now(),
      registeredCount: 0
    };
    setEvents(prev => [newEvt, ...prev]);
    logActivity(evt.organizerName, 'coordinator', 'Created Event', `Published campus event: ${evt.title}`);
  };

  const updateEvent = (id: string, updated: Partial<CampusEvent>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const registerForEvent = (eventId: string, studentId: string, studentName: string, studentEmail: string) => {
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) return false;
    if (targetEvent.registeredCount >= targetEvent.seats) return false;

    const existing = eventRegistrations.find(r => r.eventId === eventId && r.studentId === studentId);
    if (existing) return true;

    const ticketCode = `CC-${targetEvent.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`;
    const newReg: EventRegistration = {
      id: 'reg-' + Date.now(),
      eventId,
      eventTitle: targetEvent.title,
      studentId,
      studentName,
      studentEmail,
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ticketCode
    };

    setEventRegistrations(prev => [newReg, ...prev]);
    setEvents(prev => prev.map(e => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e)));

    logActivity(studentName, 'student', 'Event Registration', `Registered for ${targetEvent.title}`);
    addNotification({
      userId: studentId,
      title: 'Event Ticket Confirmed',
      message: `Registered for ${targetEvent.title}. Your pass code: ${ticketCode}`,
      type: 'event'
    });

    return true;
  };

  const cancelEventRegistration = (registrationId: string) => {
    const reg = eventRegistrations.find(r => r.id === registrationId);
    if (reg) {
      setEvents(prev => prev.map(e => (e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e)));
      setEventRegistrations(prev => prev.filter(r => r.id !== registrationId));
    }
  };

  // Club Handlers
  const createClub = (club: Omit<Club, 'id' | 'membersCount'>) => {
    const newClub: Club = {
      ...club,
      id: 'club-' + Date.now(),
      membersCount: 1
    };
    setClubs(prev => [newClub, ...prev]);
    logActivity(club.leadName, 'coordinator', 'Created Club', `Formed campus club: ${club.name}`);
  };

  const updateClub = (id: string, updated: Partial<Club>) => {
    setClubs(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const applyClubMembership = (clubId: string, studentId: string, studentName: string, studentEmail: string) => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return;

    const existing = clubMemberships.find(m => m.clubId === clubId && m.studentId === studentId);
    if (existing) return;

    const newMem: ClubMembership = {
      id: 'mem-' + Date.now(),
      clubId,
      clubName: club.name,
      studentId,
      studentName,
      studentEmail,
      status: 'pending',
      appliedAt: new Date().toISOString().substring(0, 10)
    };
    setClubMemberships(prev => [newMem, ...prev]);
    logActivity(studentName, 'student', 'Applied to Club', `Requested membership for ${club.name}`);
  };

  const updateClubMembershipStatus = (membershipId: string, status: 'approved' | 'rejected') => {
    setClubMemberships(prev => prev.map(m => {
      if (m.id === membershipId) {
        if (status === 'approved') {
          setClubs(cList => cList.map(c => (c.id === m.clubId ? { ...c, membersCount: c.membersCount + 1 } : c)));
        }
        addNotification({
          userId: m.studentId,
          title: `Club Membership ${status.toUpperCase()}`,
          message: `Your membership request for ${m.clubName} was ${status}.`,
          type: 'announcement'
        });
        return { ...m, status };
      }
      return m;
    }));
  };

  // Placement Handlers
  const createPlacement = (placement: Omit<Placement, 'id' | 'postedAt' | 'status'>) => {
    const newPlc: Placement = {
      ...placement,
      id: 'plc-' + Date.now(),
      postedAt: new Date().toISOString().substring(0, 10),
      status: 'open'
    };
    setPlacements(prev => [newPlc, ...prev]);
    logActivity('Training & Placement Cell', 'admin', 'Posted Placement', `Added drive for ${placement.company} - ${placement.role}`);

    allUsers.filter(u => u.role === 'student').forEach(st => {
      addNotification({
        userId: st.uid,
        title: `Placement Drive: ${placement.company}`,
        message: `${placement.company} is hiring for ${placement.role} (${placement.ctc}). Deadline: ${placement.deadline}`,
        type: 'placement'
      });
    });
  };

  const updatePlacement = (id: string, updated: Partial<Placement>) => {
    setPlacements(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const applyPlacement = (placementId: string, studentId: string, studentName: string, studentRoll: string, studentCgpa: number) => {
    const plc = placements.find(p => p.id === placementId);
    if (!plc) return;

    const existing = applications.find(a => a.placementId === placementId && a.studentId === studentId);
    if (existing) return;

    const newApp: PlacementApplication = {
      id: 'app-' + Date.now(),
      placementId,
      company: plc.company,
      role: plc.role,
      studentId,
      studentName,
      studentRoll,
      studentCgpa,
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Applied'
    };

    setApplications(prev => [newApp, ...prev]);
    logActivity(studentName, 'student', 'Applied for Placement', `Applied to ${plc.company} (${plc.role})`);
    addNotification({
      userId: studentId,
      title: 'Application Submitted',
      message: `Your application for ${plc.company} (${plc.role}) was submitted successfully.`,
      type: 'placement'
    });
  };

  const updateApplicationStatus = (appId: string, status: PlacementApplication['status']) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        addNotification({
          userId: a.studentId,
          title: `Placement Update: ${a.company}`,
          message: `Your application status for ${a.company} (${a.role}) has been updated to ${status}.`,
          type: 'placement'
        });
        return { ...a, status };
      }
      return a;
    }));
  };

  // Announcements
  const createAnnouncement = (anc: Omit<Announcement, 'id' | 'date'>) => {
    const newAnc: Announcement = {
      ...anc,
      id: 'anc-' + Date.now(),
      date: new Date().toISOString().substring(0, 10)
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    logActivity(anc.authorName, 'admin', 'Published Announcement', `Notice: ${anc.title}`);

    allUsers.forEach(u => {
      addNotification({
        userId: u.uid,
        title: `Announcement: ${anc.title}`,
        message: anc.description,
        type: 'announcement'
      });
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications(prev => prev.map(n => (n.userId === userId ? { ...n, read: true } : n)));
  };

  // Admin Entities
  const addDepartment = (dept: Omit<Department, 'id'>) => {
    setDepartments(prev => [...prev, { ...dept, id: 'dept-' + Date.now() }]);
  };

  const addCourse = (crs: Omit<Course, 'id'>) => {
    setCourses(prev => [...prev, { ...crs, id: 'crs-' + Date.now() }]);
  };

  const resetToDemoData = () => {
    setAttendanceSessions(INITIAL_ATTENDANCE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setEvents(INITIAL_EVENTS);
    setEventRegistrations(INITIAL_EVENT_REGISTRATIONS);
    setClubs(INITIAL_CLUBS);
    setClubMemberships(INITIAL_CLUB_MEMBERSHIPS);
    setPlacements(INITIAL_PLACEMENTS);
    setApplications(INITIAL_APPLICATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setDepartments(INITIAL_DEPARTMENTS);
    setCourses(INITIAL_COURSES);
    setAllUsers(INITIAL_USERS);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      attendanceSessions,
      assignments,
      submissions,
      events,
      eventRegistrations,
      clubs,
      clubMemberships,
      placements,
      applications,
      announcements,
      notifications,
      activityLogs,
      departments,
      courses,
      allUsers,

      createAttendanceSession,
      updateAttendanceSession,
      deleteAttendanceSession,

      createAssignment,
      updateAssignment,
      deleteAssignment,

      submitAssignmentSolution,
      gradeSubmission,

      createEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      cancelEventRegistration,

      createClub,
      updateClub,
      applyClubMembership,
      updateClubMembershipStatus,

      createPlacement,
      updatePlacement,
      applyPlacement,
      updateApplicationStatus,

      createAnnouncement,
      deleteAnnouncement,

      markNotificationRead,
      markAllNotificationsRead,
      addNotification,

      addDepartment,
      addCourse,

      logActivity,
      resetToDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
