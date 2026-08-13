import {
  UserProfile,
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
  DemoAccount
} from '../types';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'student@campusconnect.edu',
    role: 'student',
    name: 'Aarav Sharma',
    password: 'password123',
    description: 'B.Tech CSE, 6th Semester (Roll: CS2022042)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    email: 'faculty@campusconnect.edu',
    role: 'faculty',
    name: 'Dr. Priya Ananya',
    password: 'password123',
    description: 'Associate Professor, CSE Dept.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    email: 'coordinator@campusconnect.edu',
    role: 'coordinator',
    name: 'Rohan Mehta',
    password: 'password123',
    description: 'Student Affairs & Cultural Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    email: 'admin@campusconnect.edu',
    role: 'admin',
    name: 'Dr. Vikramaditya Rao',
    password: 'password123',
    description: 'Dean of Academic Operations & Admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'demo-student-1',
    email: 'student@campusconnect.edu',
    name: 'Aarav Sharma',
    role: 'student',
    department: 'Computer Science & Engineering',
    rollNumber: 'CS2022042',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    semester: '6th Semester',
    skills: ['React', 'TypeScript', 'Python', 'Machine Learning', 'Tailwind CSS'],
    linkedin: 'https://linkedin.com/in/aarav-sharma-demo',
    github: 'https://github.com/aarav-sharma-demo',
    bio: 'Passionate computer science student specializing in AI and full-stack cloud applications.',
    cgpa: 8.85,
    joinedYear: '2022'
  },
  {
    uid: 'demo-student-2',
    email: 'ananya.k@campusconnect.edu',
    name: 'Ananya Kapoor',
    role: 'student',
    department: 'Computer Science & Engineering',
    rollNumber: 'CS2022018',
    phone: '+91 98123 45678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    semester: '6th Semester',
    skills: ['Java', 'Spring Boot', 'SQL', 'Flutter'],
    cgpa: 9.1,
    joinedYear: '2022'
  },
  {
    uid: 'demo-student-3',
    email: 'siddharth.v@campusconnect.edu',
    name: 'Siddharth Verma',
    role: 'student',
    department: 'Electronics & Communication',
    rollNumber: 'EC2022099',
    phone: '+91 97654 32109',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    semester: '6th Semester',
    skills: ['Embedded Systems', 'IoT', 'C++', 'MATLAB'],
    cgpa: 7.9,
    joinedYear: '2022'
  },
  {
    uid: 'demo-faculty-1',
    email: 'faculty@campusconnect.edu',
    name: 'Dr. Priya Ananya',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    phone: '+91 94321 87654',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Senior Associate Professor in Distributed Systems & AI. 12+ years of teaching experience.',
    joinedYear: '2014'
  },
  {
    uid: 'demo-coordinator-1',
    email: 'coordinator@campusconnect.edu',
    name: 'Rohan Mehta',
    role: 'coordinator',
    department: 'Student Affairs',
    phone: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Campus Events Head and Student Club Mentor.',
    joinedYear: '2019'
  },
  {
    uid: 'demo-admin-1',
    email: 'admin@campusconnect.edu',
    name: 'Dr. Vikramaditya Rao',
    role: 'admin',
    department: 'Administration',
    phone: '+91 90000 11122',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Chief Administrative Officer overseeing university digital operations and academics.',
    joinedYear: '2010'
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Computer Science & Engineering', code: 'CSE', headName: 'Dr. Ramesh Nair', totalStudents: 480, totalFaculty: 28 },
  { id: 'dept-2', name: 'Information Technology', code: 'IT', headName: 'Dr. Meera Nambiar', totalStudents: 360, totalFaculty: 20 },
  { id: 'dept-3', name: 'Electronics & Communication', code: 'ECE', headName: 'Dr. S. K. Gupta', totalStudents: 420, totalFaculty: 24 },
  { id: 'dept-4', name: 'Mechanical Engineering', code: 'ME', headName: 'Prof. Anil Deshmukh', totalStudents: 320, totalFaculty: 18 },
  { id: 'dept-5', name: 'Management Studies', code: 'MBA', headName: 'Dr. Sunita Kulkarni', totalStudents: 220, totalFaculty: 14 }
];

export const INITIAL_COURSES: Course[] = [
  { id: 'crs-1', name: 'Data Structures & Algorithms', code: 'CS301', department: 'Computer Science & Engineering', credits: 4, facultyName: 'Dr. Priya Ananya', semester: 'Sem 3' },
  { id: 'crs-2', name: 'Artificial Intelligence & Machine Learning', code: 'CS602', department: 'Computer Science & Engineering', credits: 4, facultyName: 'Dr. Priya Ananya', semester: 'Sem 6' },
  { id: 'crs-3', name: 'Web Application Development', code: 'CS605', department: 'Computer Science & Engineering', credits: 3, facultyName: 'Prof. Rajesh Kumar', semester: 'Sem 6' },
  { id: 'crs-4', name: 'Digital Signal Processing', code: 'EC501', department: 'Electronics & Communication', credits: 4, facultyName: 'Dr. S. K. Gupta', semester: 'Sem 5' },
  { id: 'crs-5', name: 'Cloud Computing & DevOps', code: 'IT603', department: 'Information Technology', credits: 3, facultyName: 'Dr. Meera Nambiar', semester: 'Sem 6' }
];

export const INITIAL_ATTENDANCE: AttendanceSession[] = [
  {
    id: 'att-101',
    subject: 'Artificial Intelligence & Machine Learning',
    courseCode: 'CS602',
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    department: 'Computer Science & Engineering',
    date: '2026-08-12',
    totalStudents: 60,
    presentCount: 54,
    records: [
      { studentId: 'demo-student-1', studentName: 'Aarav Sharma', rollNumber: 'CS2022042', status: 'present' },
      { studentId: 'demo-student-2', studentName: 'Ananya Kapoor', rollNumber: 'CS2022018', status: 'present' },
      { studentId: 'demo-student-3', studentName: 'Siddharth Verma', rollNumber: 'EC2022099', status: 'absent' }
    ]
  },
  {
    id: 'att-102',
    subject: 'Data Structures & Algorithms',
    courseCode: 'CS301',
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    department: 'Computer Science & Engineering',
    date: '2026-08-11',
    totalStudents: 60,
    presentCount: 52,
    records: [
      { studentId: 'demo-student-1', studentName: 'Aarav Sharma', rollNumber: 'CS2022042', status: 'present' },
      { studentId: 'demo-student-2', studentName: 'Ananya Kapoor', rollNumber: 'CS2022018', status: 'present' }
    ]
  },
  {
    id: 'att-103',
    subject: 'Web Application Development',
    courseCode: 'CS605',
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    department: 'Computer Science & Engineering',
    date: '2026-08-10',
    totalStudents: 58,
    presentCount: 48,
    records: [
      { studentId: 'demo-student-1', studentName: 'Aarav Sharma', rollNumber: 'CS2022042', status: 'absent' }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Neural Network Architecture Design',
    description: 'Implement a Multi-Layer Perceptron using PyTorch/TensorFlow to classify MNIST handwritten digits. Include training loss curves and evaluation metrics.',
    subject: 'Artificial Intelligence & Machine Learning',
    courseCode: 'CS602',
    department: 'Computer Science & Engineering',
    deadline: '2026-08-20',
    maxMarks: 100,
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    attachmentUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
    rubric: 'Accuracy (>95% = 40 pts), Code Cleanliness (20 pts), Report (20 pts), Loss Curves (20 pts)',
    createdAt: '2026-08-05'
  },
  {
    id: 'asg-2',
    title: 'Full-Stack RESTful API with React & Express',
    description: 'Develop a modern SaaS web app back-end and front-end connection with authentication and CRUD endpoints.',
    subject: 'Web Application Development',
    courseCode: 'CS605',
    department: 'Computer Science & Engineering',
    deadline: '2026-08-18',
    maxMarks: 50,
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    rubric: 'API Endpoint design (20 pts), UI Components (20 pts), State handling (10 pts)',
    createdAt: '2026-08-08'
  },
  {
    id: 'asg-3',
    title: 'Red-Black Tree Balance Factor Verification',
    description: 'Write C++ functions to verify the 5 fundamental properties of a Red-Black Tree after inserting 1,000 random nodes.',
    subject: 'Data Structures & Algorithms',
    courseCode: 'CS301',
    department: 'Computer Science & Engineering',
    deadline: '2026-08-15',
    maxMarks: 50,
    facultyId: 'demo-faculty-1',
    facultyName: 'Dr. Priya Ananya',
    createdAt: '2026-08-01'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-1',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentRoll: 'CS2022042',
    solutionText: 'Implemented MLP using PyTorch with Adam optimizer. Reached 98.2% test accuracy.',
    githubUrl: 'https://github.com/aarav-sharma-demo/mnist-pytorch-mlp',
    fileUrl: 'https://campusconnect.edu/docs/submissions/cs2022042_mnist.pdf',
    submittedAt: '2026-08-12 14:30',
    status: 'submitted'
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-3',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentRoll: 'CS2022042',
    solutionText: 'C++ code with custom RB-Tree iterator and property validation routine attached.',
    githubUrl: 'https://github.com/aarav-sharma-demo/red-black-tree-validation',
    submittedAt: '2026-08-10 11:15',
    status: 'reviewed',
    marks: 48,
    feedback: 'Excellent code structure and clear validation output. Great job!'
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-1',
    studentId: 'demo-student-2',
    studentName: 'Ananya Kapoor',
    studentRoll: 'CS2022018',
    solutionText: 'CNN implementation for MNIST classification using Keras.',
    submittedAt: '2026-08-11 18:00',
    status: 'reviewed',
    marks: 95,
    feedback: 'Very thorough report and hyperparameter tuning analysis.'
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'HackCampus 2026: 36-Hour National Hackathon',
    description: 'Join over 500+ student developers, designers, and innovators nationwide. Build cutting-edge solutions in AI, FinTech, Smart Campus, and Sustainable Tech.',
    venue: 'Main Auditorium & Innovation Lab',
    date: '2026-08-28',
    time: '09:00 AM',
    category: 'Hackathon',
    deadline: '2026-08-25',
    seats: 300,
    registeredCount: 214,
    speakers: ['Dr. Vikramaditya Rao (Dean)', 'Sonia Kapoor (Tech Lead at Google)', 'Karan Verma (Founder at TechPulse)'],
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    organizerId: 'demo-coordinator-1',
    organizerName: 'Rohan Mehta (Student Affairs)',
    isRegistrationOpen: true
  },
  {
    id: 'evt-2',
    title: 'Generative AI & LLM Deployment Workshop',
    description: 'Hands-on masterclass on fine-tuning Gemini 1.5, RAG architectures, Vector DBs, and deploying production AI agents.',
    venue: 'CSE Seminar Hall 3',
    date: '2026-08-22',
    time: '02:00 PM',
    category: 'Workshop',
    deadline: '2026-08-21',
    seats: 80,
    registeredCount: 78,
    speakers: ['Dr. Priya Ananya (CSE Dept)', 'Rohan Mehta (AI Research Lab)'],
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    organizerId: 'demo-coordinator-1',
    organizerName: 'AI & Data Science Club',
    isRegistrationOpen: true
  },
  {
    id: 'evt-3',
    title: 'Annual Cultural Fest: Tarang 2026',
    description: '3 Days of music, dance, drama, battle of the bands, celebrity night, and food stalls.',
    venue: 'Open Air Theatre (OAT)',
    date: '2026-09-10',
    time: '05:00 PM',
    category: 'Cultural',
    deadline: '2026-09-08',
    seats: 2000,
    registeredCount: 1420,
    speakers: ['Sunidhi Chauhan (Guest Singer)'],
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    organizerId: 'demo-coordinator-1',
    organizerName: 'Cultural Committee',
    isRegistrationOpen: true
  }
];

export const INITIAL_EVENT_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg-1',
    eventId: 'evt-1',
    eventTitle: 'HackCampus 2026: 36-Hour National Hackathon',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'student@campusconnect.edu',
    registeredAt: '2026-08-10 10:12',
    ticketCode: 'CC-HACK-2026-42991'
  },
  {
    id: 'reg-2',
    eventId: 'evt-2',
    eventTitle: 'Generative AI & LLM Deployment Workshop',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'student@campusconnect.edu',
    registeredAt: '2026-08-11 15:45',
    ticketCode: 'CC-GENAI-2026-88120'
  }
];

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'club-1',
    name: 'CodeX – Google Developer Student Club',
    description: 'The premier competitive programming, open source, and mobile/web development club on campus.',
    category: 'Technical',
    leadName: 'Aarav Sharma',
    leadId: 'demo-student-1',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    membersCount: 142,
    foundedYear: '2020',
    announcements: ['Weekly LeetCode contest every Saturday at 8 PM.', 'Web3 Workshop submission deadline extended.']
  },
  {
    id: 'club-2',
    name: 'RoboVanguard – Robotics & Automation Club',
    description: 'Building autonomous drones, combat bots, and IoT systems. Winners of National Robowars 2025.',
    category: 'Technical',
    leadName: 'Siddharth Verma',
    leadId: 'demo-student-3',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
    membersCount: 88,
    foundedYear: '2018'
  },
  {
    id: 'club-3',
    name: 'The Dramatic Society – Natraj',
    description: 'Expressing social themes and creative storytelling through street plays, stage dramas, and mime.',
    category: 'Cultural',
    leadName: 'Ananya Kapoor',
    leadId: 'demo-student-2',
    banner: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1000',
    membersCount: 65,
    foundedYear: '2016'
  }
];

export const INITIAL_CLUB_MEMBERSHIPS: ClubMembership[] = [
  {
    id: 'mem-1',
    clubId: 'club-1',
    clubName: 'CodeX – Google Developer Student Club',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'student@campusconnect.edu',
    status: 'approved',
    appliedAt: '2026-01-15'
  },
  {
    id: 'mem-2',
    clubId: 'club-2',
    clubName: 'RoboVanguard – Robotics & Automation Club',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'student@campusconnect.edu',
    status: 'pending',
    appliedAt: '2026-08-01'
  }
];

export const INITIAL_PLACEMENTS: Placement[] = [
  {
    id: 'plc-1',
    company: 'Microsoft Corporation',
    logo: 'https://images.unsplash.com/photo-1642132652075-2b87453401f8?auto=format&fit=crop&q=80&w=200',
    role: 'Software Development Engineer (SDE-1)',
    description: 'Hiring full-time SDEs for Azure Cloud & AI infrastructure teams. Work on high-scale distributed backend systems.',
    eligibility: 'B.Tech CSE / IT / ECE with CGPA >= 8.0',
    minCgpa: 8.0,
    skills: ['Data Structures', 'C++', 'Java', 'Distributed Systems', 'System Design'],
    ctc: '₹28,50,000 PA + ESOPs',
    location: 'Bengaluru / Hyderabad',
    deadline: '2026-08-30',
    applicationLink: 'https://careers.microsoft.com',
    status: 'open',
    postedAt: '2026-08-01'
  },
  {
    id: 'plc-2',
    company: 'Google India',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=200',
    role: 'Associate Cloud Engineer',
    description: 'Build and deploy customer cloud solutions on Google Cloud Platform (GCP). Internship-to-FTE conversion path.',
    eligibility: 'All Engineering Branches with CGPA >= 7.5',
    minCgpa: 7.5,
    skills: ['Python', 'Networking', 'Kubernetes', 'GCP', 'Linux'],
    ctc: '₹22,00,000 PA',
    location: 'Gurugram / Bengaluru',
    deadline: '2026-08-28',
    status: 'open',
    postedAt: '2026-08-05'
  },
  {
    id: 'plc-3',
    company: 'Atlassian',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    role: 'Frontend Software Engineer',
    description: 'Shape the next generation of Jira, Confluence, and Trello products with modern React and TypeScript.',
    eligibility: 'B.Tech / M.Tech CSE & IT, CGPA >= 7.0',
    minCgpa: 7.0,
    skills: ['React', 'TypeScript', 'CSS/Tailwind', 'REST APIs', 'Jest'],
    ctc: '₹24,00,000 PA',
    location: 'Bengaluru (Hybrid)',
    deadline: '2026-09-05',
    status: 'open',
    postedAt: '2026-08-09'
  }
];

export const INITIAL_APPLICATIONS: PlacementApplication[] = [
  {
    id: 'app-1',
    placementId: 'plc-1',
    company: 'Microsoft Corporation',
    role: 'Software Development Engineer (SDE-1)',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentRoll: 'CS2022042',
    studentCgpa: 8.85,
    resumeUrl: 'https://campusconnect.edu/resumes/CS2022042_Aarav_Sharma.pdf',
    appliedAt: '2026-08-04 11:20',
    status: 'Shortlisted'
  },
  {
    id: 'app-2',
    placementId: 'plc-2',
    company: 'Google India',
    role: 'Associate Cloud Engineer',
    studentId: 'demo-student-1',
    studentName: 'Aarav Sharma',
    studentRoll: 'CS2022042',
    studentCgpa: 8.85,
    appliedAt: '2026-08-06 09:15',
    status: 'Applied'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Mid-Semester Examinations Schedule Released',
    description: 'The timetable for Spring 2026 Mid-Semester Examinations is published. Exams begin September 1st. Attendance criteria of 75% applies.',
    category: 'Academic',
    priority: 'high',
    audience: 'all',
    authorName: 'Dr. Vikramaditya Rao',
    authorRole: 'Dean of Academic Operations',
    date: '2026-08-12',
    department: 'All Departments'
  },
  {
    id: 'anc-2',
    title: 'Microsoft SDE Campus Recruitment Registration Open',
    description: 'Microsoft SDE-1 applications are live on CampusConnect. Eligible students must apply before August 30th with updated resumes.',
    category: 'Placement',
    priority: 'urgent',
    audience: 'students',
    authorName: 'Rohan Mehta',
    authorRole: 'Training & Placement Officer',
    date: '2026-08-10'
  },
  {
    id: 'anc-3',
    title: 'HackCampus 2026 Hackathon Registration Extended',
    description: 'Due to huge demand, registrations for HackCampus 2026 have been extended to August 25th. Win prizes worth ₹3,00,000!',
    category: 'Event',
    priority: 'medium',
    audience: 'all',
    authorName: 'Rohan Mehta',
    authorRole: 'Student Affairs',
    date: '2026-08-08'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'demo-student-1',
    title: 'Shortlisted for Microsoft SDE-1',
    message: 'Congratulations! Your profile has been shortlisted for Microsoft Online Assessment. Check Placement tab.',
    type: 'placement',
    read: false,
    createdAt: '2026-08-12 16:00'
  },
  {
    id: 'notif-2',
    userId: 'demo-student-1',
    title: 'New Assignment Posted',
    message: 'Dr. Priya Ananya assigned Neural Network Architecture Design in CS602. Due Aug 20.',
    type: 'assignment',
    read: false,
    createdAt: '2026-08-11 09:30'
  },
  {
    id: 'notif-3',
    userId: 'demo-student-1',
    title: 'Event Ticket Generated',
    message: 'You are registered for HackCampus 2026! View your QR pass under Events.',
    type: 'event',
    read: true,
    createdAt: '2026-08-10 10:15'
  },
  {
    id: 'notif-4',
    userId: 'demo-student-1',
    title: 'Attendance Marked',
    message: 'You were marked PRESENT in AI & Machine Learning (CS602) on Aug 12.',
    type: 'attendance',
    read: true,
    createdAt: '2026-08-12 11:00'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    userName: 'Dr. Priya Ananya',
    userRole: 'faculty',
    action: 'Created Assignment',
    details: 'Posted CS602 Assignment 1: Neural Network Architecture',
    timestamp: '2026-08-12 10:30'
  },
  {
    id: 'act-2',
    userName: 'Aarav Sharma',
    userRole: 'student',
    action: 'Submitted Assignment',
    details: 'Submitted solution for Neural Network Architecture Design',
    timestamp: '2026-08-12 14:30'
  },
  {
    id: 'act-3',
    userName: 'Rohan Mehta',
    userRole: 'coordinator',
    action: 'Created Event',
    details: 'Published HackCampus 2026 Hackathon event',
    timestamp: '2026-08-10 09:12'
  },
  {
    id: 'act-4',
    userName: 'Dr. Vikramaditya Rao',
    userRole: 'admin',
    action: 'Updated Settings',
    details: 'Configured Fall 2026 Academic Calendar & Attendance Thresholds',
    timestamp: '2026-08-09 16:45'
  }
];
