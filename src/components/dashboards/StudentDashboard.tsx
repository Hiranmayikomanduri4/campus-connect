import React from 'react';
import { 
  CheckCheck, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  Award, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface StudentDashboardProps {
  onNavigate: (module: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    attendanceSessions, 
    assignments, 
    submissions, 
    events, 
    eventRegistrations, 
    placements, 
    applications,
    notifications,
    announcements
  } = useData();

  if (!currentUser) return null;

  // Compute student metrics
  const mySubmissions = submissions.filter(s => s.studentId === currentUser.uid);
  const pendingAssignments = assignments.filter(a => !mySubmissions.some(s => s.assignmentId === a.id));
  
  // Calculate attendance % for student
  let totalAttSessions = 0;
  let attendedCount = 0;
  attendanceSessions.forEach(session => {
    const record = session.records.find(r => r.studentId === currentUser.uid);
    if (record) {
      totalAttSessions++;
      if (record.status === 'present') attendedCount++;
    }
  });

  const overallAttPercentage = totalAttSessions > 0 ? Math.round((attendedCount / totalAttSessions) * 100) : 88;

  // Status color badge logic
  const attStatus =
    overallAttPercentage >= 75
      ? { label: 'Good Standing', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300' }
      : overallAttPercentage >= 60
      ? { label: 'Warning Threshold', color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 border-amber-300' }
      : { label: 'Critical Attendance', color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 border-rose-300' };

  const myEventRegs = eventRegistrations.filter(r => r.studentId === currentUser.uid);
  const myApplications = applications.filter(a => a.studentId === currentUser.uid);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentUser.semester || '6th Semester'} • {currentUser.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              Roll No: <span className="font-mono font-bold text-white">{currentUser.rollNumber || 'CS2022042'}</span> | CGPA: <span className="font-bold text-white">{currentUser.cgpa || 8.85}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">Overall Attendance</p>
              <p className="text-2xl font-black">{overallAttPercentage}%</p>
            </div>
            <div className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${attStatus.color}`}>
              {attStatus.label}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('attendance')}
          className="p-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3 transition group text-left"
        >
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">View Attendance</p>
            <p className="text-[10px] text-slate-500">Subject records</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('assignments')}
          className="p-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3 transition group text-left"
        >
          <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">Submit Assignment</p>
            <p className="text-[10px] text-slate-500">{pendingAssignments.length} pending</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('events')}
          className="p-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3 transition group text-left"
        >
          <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">Browse Events</p>
            <p className="text-[10px] text-slate-500">{myEventRegs.length} passes</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('placements')}
          className="p-4 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3 transition group text-left"
        >
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">Placement Cell</p>
            <p className="text-[10px] text-slate-500">{myApplications.length} applications</p>
          </div>
        </button>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pending Tasks, Events & Placements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Assignments Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Pending Assignments</h3>
              </div>
              <button
                onClick={() => onNavigate('assignments')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingAssignments.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">🎉 Great job! No pending assignments.</p>
            ) : (
              <div className="space-y-3">
                {pendingAssignments.slice(0, 3).map(a => (
                  <div
                    key={a.id}
                    onClick={() => onNavigate('assignments')}
                    className="p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl border border-slate-200/80 dark:border-slate-600 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                      <p className="text-[11px] text-slate-500">{a.subject} • Max Marks: {a.maxMarks}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold rounded-lg">
                        Due: {a.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Campus Events</h3>
              </div>
              <button
                onClick={() => onNavigate('events')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
              >
                <span>Browse Events</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.slice(0, 2).map(evt => (
                <div
                  key={evt.id}
                  onClick={() => onNavigate('events')}
                  className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200/80 dark:border-slate-600 space-y-2 cursor-pointer hover:shadow-md transition"
                >
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-bold rounded-md">
                    {evt.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500">{evt.date} • {evt.venue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Placement Status + Announcements + Activity */}
        <div className="space-y-6">
          {/* Active Placement Applications */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Placement Applications</h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {myApplications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-2">No applications yet. Check Placement Cell!</p>
              ) : (
                myApplications.map(app => (
                  <div
                    key={app.id}
                    className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200/80 dark:border-slate-600 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{app.company}</p>
                      <p className="text-[10px] text-slate-500">{app.role}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded-lg">
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Announcements Noticeboard */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Campus Noticeboard</span>
            </h3>

            <div className="space-y-2.5">
              {announcements.slice(0, 2).map(anc => (
                <div key={anc.id} className="p-3 bg-amber-50/50 dark:bg-slate-700/40 rounded-2xl border border-amber-100 dark:border-slate-600 space-y-1">
                  <span className="text-[9px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">{anc.category}</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{anc.title}</p>
                  <p className="text-[10px] text-slate-500">{anc.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
