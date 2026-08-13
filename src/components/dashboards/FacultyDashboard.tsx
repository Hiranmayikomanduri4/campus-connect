import React from 'react';
import { 
  Users, 
  CheckCheck, 
  BookOpen, 
  PlusCircle, 
  FileText, 
  Award, 
  TrendingUp, 
  Megaphone,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface FacultyDashboardProps {
  onNavigate: (module: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    attendanceSessions, 
    assignments, 
    submissions, 
    announcements, 
    allUsers 
  } = useData();

  if (!currentUser) return null;

  const myAssignments = assignments.filter(a => a.facultyId === currentUser.uid || true);
  const mySubmissions = submissions;
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
              Faculty Portal • {currentUser.department}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome, {currentUser.name}! 🎓
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100">
              Manage classes, record attendance, publish assignments, and review student submissions.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs font-bold shadow-md transition"
            >
              + Take Attendance
            </button>
            <button
              onClick={() => onNavigate('assignments')}
              className="px-4 py-2.5 bg-indigo-500/40 border border-white/20 text-white hover:bg-indigo-500/60 rounded-xl text-xs font-bold transition"
            >
              + New Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 rounded-2xl w-fit">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">180</p>
            <p className="text-xs text-slate-500">Assigned Students</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl w-fit">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{attendanceSessions.length}</p>
            <p className="text-xs text-slate-500">Attendance Sessions</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 rounded-2xl w-fit">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{myAssignments.length}</p>
            <p className="text-xs text-slate-500">Active Assignments</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-2xl w-fit">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{pendingSubmissions.length}</p>
            <p className="text-xs text-slate-500">Submissions to Grade</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Needing Review */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Student Submissions</h3>
            </div>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>Grade Submissions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {mySubmissions.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No submissions received yet.</p>
            ) : (
              mySubmissions.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => onNavigate('assignments')}
                  className="p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl border border-slate-200/80 dark:border-slate-600 flex items-center justify-between cursor-pointer transition"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{sub.studentName} ({sub.studentRoll})</p>
                    <p className="text-[11px] text-slate-500">{sub.solutionText || 'Solution attached'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                      sub.status === 'reviewed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                    }`}>
                      {sub.status === 'reviewed' ? `Graded: ${sub.marks} pts` : 'Needs Grading'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Department Notices */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Faculty Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('attendance')}
                className="w-full py-2.5 px-4 bg-indigo-50 dark:bg-slate-700 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-200 font-bold rounded-xl text-xs transition text-left flex items-center space-x-2"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark Today's Attendance</span>
              </button>
              <button
                onClick={() => onNavigate('assignments')}
                className="w-full py-2.5 px-4 bg-purple-50 dark:bg-slate-700 hover:bg-purple-100 text-purple-700 dark:text-purple-200 font-bold rounded-xl text-xs transition text-left flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Create New Assignment</span>
              </button>
              <button
                onClick={() => onNavigate('announcements')}
                className="w-full py-2.5 px-4 bg-amber-50 dark:bg-slate-700 hover:bg-amber-100 text-amber-700 dark:text-amber-200 font-bold rounded-xl text-xs transition text-left flex items-center space-x-2"
              >
                <Megaphone className="w-4 h-4" />
                <span>Publish Class Notice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
